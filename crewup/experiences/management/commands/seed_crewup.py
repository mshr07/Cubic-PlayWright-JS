from datetime import timedelta
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from experiences.models import Category, Experience, Venue

User = get_user_model()


class Command(BaseCommand):
    help = "Seed CrewUp with demo users, categories, venues, and experiences."

    def handle(self, *args, **options):
        host, _ = User.objects.get_or_create(
            username="hostarya",
            defaults={
                "email": "hostarya@example.com",
                "full_name": "Arya Kapoor",
                "profession": "Product Designer",
                "city": "Bengaluru",
                "is_creator": True,
            },
        )
        host.set_password("demo12345")
        host.save()

        guest, _ = User.objects.get_or_create(
            username="weekendrahul",
            defaults={
                "email": "rahul@example.com",
                "full_name": "Rahul Verma",
                "profession": "Software Engineer",
                "city": "Hyderabad",
            },
        )
        guest.set_password("demo12345")
        guest.save()

        categories = [
            ("Open Mic", "#ff6b35"),
            ("Fitness", "#0f766e"),
            ("Workshops", "#7c3aed"),
            ("Game Night", "#d97706"),
        ]
        category_map = {}
        for name, color in categories:
            category_map[name], _ = Category.objects.get_or_create(name=name, defaults={"theme_color": color})

        venue1, _ = Venue.objects.get_or_create(
            name="Third Wave Commons",
            city="Bengaluru",
            neighborhood="Koramangala",
            defaults={"address": "17 Residency Road"},
        )
        venue2, _ = Venue.objects.get_or_create(
            name="Harbor Studio",
            city="Hyderabad",
            neighborhood="Madhapur",
            defaults={"address": "82 Inorbit Lane"},
        )

        now = timezone.now()
        samples = [
            {
                "title": "Friday Open Mic for Overworked Creatives",
                "category": category_map["Open Mic"],
                "venue": venue1,
                "summary": "Stand-up, poetry, and acoustic sets for people who need a better Friday than doomscrolling.",
                "description": "A high-energy open mic curated for designers, developers, and creators who want to perform or just hang out.",
                "event_type": Experience.EventType.IN_PERSON,
                "start_at": now + timedelta(days=3),
                "end_at": now + timedelta(days=3, hours=3),
                "capacity": 60,
                "price": Decimal("299.00"),
                "status": Experience.Status.PUBLISHED,
                "is_featured": True,
                "tags": "music,comedy,networking",
            },
            {
                "title": "Sunday Run Club and Breakfast Crawl",
                "category": category_map["Fitness"],
                "venue": venue2,
                "summary": "Easy-paced run followed by a local breakfast trail.",
                "description": "Made for beginners and regular runners who want a social start to Sunday.",
                "event_type": Experience.EventType.IN_PERSON,
                "start_at": now + timedelta(days=5),
                "end_at": now + timedelta(days=5, hours=2),
                "capacity": 40,
                "price": Decimal("149.00"),
                "status": Experience.Status.PUBLISHED,
                "is_featured": True,
                "tags": "fitness,community,breakfast",
            },
            {
                "title": "Build Your First Personal Brand Site",
                "category": category_map["Workshops"],
                "venue": None,
                "summary": "A virtual workshop on portfolios, LinkedIn polish, and personal websites.",
                "description": "Perfect for people in the first few years of their careers who want a stronger online presence.",
                "event_type": Experience.EventType.VIRTUAL,
                "start_at": now + timedelta(days=7),
                "end_at": now + timedelta(days=7, hours=2),
                "capacity": 120,
                "price": Decimal("499.00"),
                "status": Experience.Status.PUBLISHED,
                "is_featured": True,
                "tags": "career,portfolio,branding",
            },
        ]

        for payload in samples:
            Experience.objects.get_or_create(title=payload["title"], host=host, defaults=payload)

        self.stdout.write(self.style.SUCCESS("CrewUp demo data created."))
