from django.contrib.auth.models import AbstractUser
from django.db import models
from django.templatetags.static import static


class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    profession = models.CharField(max_length=120, blank=True)
    city = models.CharField(max_length=120, blank=True)
    bio = models.TextField(blank=True)
    interests = models.CharField(max_length=255, blank=True, help_text="Comma-separated interests.")
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    is_creator = models.BooleanField(default=False)

    REQUIRED_FIELDS = ["email", "full_name"]

    def save(self, *args, **kwargs):
        if not self.full_name:
            self.full_name = self.username
        super().save(*args, **kwargs)

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        return static("img/default-avatar.svg")

    def __str__(self):
        return self.full_name or self.username

# Create your models here.
