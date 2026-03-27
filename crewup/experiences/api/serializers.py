from django.contrib.auth import get_user_model
from rest_framework import serializers

from experiences.models import Booking, Category, Experience, Venue

User = get_user_model()


class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "full_name", "city", "profession", "is_creator")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug", "theme_color", "icon")


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ("id", "name", "slug", "city", "neighborhood", "address")


class ExperienceSerializer(serializers.ModelSerializer):
    host = HostSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    venue = VenueSerializer(read_only=True)
    seats_left = serializers.IntegerField(read_only=True)

    class Meta:
        model = Experience
        fields = (
            "id",
            "title",
            "slug",
            "summary",
            "description",
            "event_type",
            "start_at",
            "end_at",
            "capacity",
            "price",
            "status",
            "tags",
            "is_featured",
            "host",
            "category",
            "venue",
            "seats_left",
        )


class BookingSerializer(serializers.ModelSerializer):
    experience = ExperienceSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ("id", "experience", "status", "note", "created_at")
