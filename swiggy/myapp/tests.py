from django.contrib.auth.models import User
from django.test import Client, TestCase
from django.urls import reverse


class SwiggyAppTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_home_page_loads(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Swiggy")

    def test_signup_creates_user_and_redirects_to_dashboard(self):
        response = self.client.post(
            reverse("signup"),
            {
                "username": "ajay",
                "email": "ajay@example.com",
                "password1": "StrongPass123",
                "password2": "StrongPass123",
            },
        )
        self.assertRedirects(response, reverse("dashboard"))
        self.assertTrue(User.objects.filter(username="ajay").exists())

    def test_restaurant_list_api_returns_json(self):
        response = self.client.get(reverse("restaurant-list-api"))
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("restaurants", payload)
        self.assertGreaterEqual(len(payload["restaurants"]), 4)
        self.assertGreaterEqual(len(payload["restaurants"][0]["menu"]), 4)

    def test_dashboard_requires_authentication(self):
        response = self.client.get(reverse("dashboard"))
        self.assertEqual(response.status_code, 302)
        self.assertIn(reverse("login"), response.url)
