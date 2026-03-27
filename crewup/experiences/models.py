from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    theme_color = models.CharField(max_length=7, default="#ff6b35")
    icon = models.CharField(max_length=50, default="spark")

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Venue(TimeStampedModel):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True, blank=True)
    city = models.CharField(max_length=120)
    neighborhood = models.CharField(max_length=120)
    address = models.CharField(max_length=255)

    class Meta:
        ordering = ["city", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.name}-{self.city}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}, {self.city}"


class PublishedExperienceQuerySet(models.QuerySet):
    def published(self):
        return self.filter(status=Experience.Status.PUBLISHED).select_related("host", "category", "venue")


class Experience(TimeStampedModel):
    class EventType(models.TextChoices):
        IN_PERSON = "in_person", "In person"
        VIRTUAL = "virtual", "Virtual"
        HYBRID = "hybrid", "Hybrid"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        CANCELLED = "cancelled", "Cancelled"
        COMPLETED = "completed", "Completed"

    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="hosted_experiences")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="experiences")
    venue = models.ForeignKey(Venue, on_delete=models.SET_NULL, null=True, blank=True, related_name="experiences")
    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    summary = models.CharField(max_length=255)
    description = models.TextField()
    event_type = models.CharField(max_length=20, choices=EventType.choices, default=EventType.IN_PERSON)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    capacity = models.PositiveIntegerField(default=25)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    cover_image = models.ImageField(upload_to="experience_covers/", blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated tags for discoverability.")
    is_featured = models.BooleanField(default=False)

    objects = PublishedExperienceQuerySet.as_manager()

    class Meta:
        ordering = ["start_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.title}-{self.host_id or 'host'}")
        super().save(*args, **kwargs)

    @property
    def confirmed_bookings(self):
        return self.bookings.filter(status=Booking.Status.CONFIRMED).count()

    @property
    def seats_left(self):
        return max(self.capacity - self.confirmed_bookings, 0)

    def get_absolute_url(self):
        return reverse("experiences:detail", kwargs={"slug": self.slug})

    def __str__(self):
        return self.title


class Booking(TimeStampedModel):
    class Status(models.TextChoices):
        CONFIRMED = "confirmed", "Confirmed"
        CANCELLED = "cancelled", "Cancelled"
        WAITLISTED = "waitlisted", "Waitlisted"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookings")
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, related_name="bookings")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.CONFIRMED)
    note = models.CharField(max_length=255, blank=True)

    class Meta:
        unique_together = ("user", "experience")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} -> {self.experience}"


class Favorite(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="favorites")
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, related_name="favorites")

    class Meta:
        unique_together = ("user", "experience")

    def __str__(self):
        return f"{self.user} saved {self.experience}"


class Review(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews")
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    headline = models.CharField(max_length=120)
    comment = models.TextField()

    class Meta:
        unique_together = ("user", "experience")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.experience} review by {self.user}"
