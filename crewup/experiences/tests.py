from datetime import timedelta

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import Booking, Category, Experience, Venue

User = get_user_model()


class ExperienceFlowTests(TestCase):
    def setUp(self):
        self.host = User.objects.create_user(
            username="host",
            email="host@example.com",
            password="strong-password-123",
            full_name="Host User",
            is_creator=True,
        )
        self.guest = User.objects.create_user(
            username="guest",
            email="guest@example.com",
            password="strong-password-123",
            full_name="Guest User",
        )
        self.category = Category.objects.create(name="Workshops")
        self.venue = Venue.objects.create(
            name="City Studio",
            city="Hyderabad",
            neighborhood="Hitech City",
            address="Road 12",
        )
        self.experience = Experience.objects.create(
            host=self.host,
            category=self.category,
            venue=self.venue,
            title="Django in the Wild",
            summary="Production patterns explained",
            description="A full walkthrough",
            start_at=timezone.now() + timedelta(days=2),
            end_at=timezone.now() + timedelta(days=2, hours=2),
            capacity=5,
            price=499,
            status=Experience.Status.PUBLISHED,
        )

    def test_experience_list_view_renders(self):
        response = self.client.get(reverse("experiences:list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Django in the Wild")

    def test_booking_service_creates_confirmed_booking(self):
        self.client.login(username="guest", password="strong-password-123")
        response = self.client.post(reverse("experiences:book", kwargs={"slug": self.experience.slug}))
        self.assertRedirects(response, self.experience.get_absolute_url())
        self.assertTrue(Booking.objects.filter(user=self.guest, experience=self.experience).exists())

    def test_api_returns_token_and_supports_booking_creation(self):
        token = Token.objects.create(user=self.guest)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
        response = client.post(reverse("api-bookings"), {"slug": self.experience.slug}, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["status"], Booking.Status.CONFIRMED)
