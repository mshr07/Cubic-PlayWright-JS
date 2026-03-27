from django.contrib import admin

from .models import Booking, Category, Experience, Favorite, Review, Venue


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "theme_color")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "neighborhood")
    search_fields = ("name", "city", "neighborhood")
    prepopulated_fields = {"slug": ("name", "city")}


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "host", "category", "start_at", "status", "is_featured")
    list_filter = ("status", "category", "event_type", "is_featured")
    search_fields = ("title", "summary", "tags", "host__username")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("user", "experience", "status", "created_at")
    list_filter = ("status",)


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ("user", "experience", "created_at")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("experience", "user", "rating", "created_at")

# Register your models here.
