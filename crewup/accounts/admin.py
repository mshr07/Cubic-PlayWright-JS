from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CrewUpUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            "CrewUp Profile",
            {
                "fields": (
                    "full_name",
                    "profession",
                    "city",
                    "bio",
                    "interests",
                    "avatar",
                    "is_creator",
                )
            },
        ),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "CrewUp Profile",
            {
                "fields": ("email", "full_name", "profession", "city", "is_creator"),
            },
        ),
    )
    list_display = ("username", "email", "full_name", "city", "is_creator", "is_staff")
    search_fields = ("username", "email", "full_name", "city")

# Register your models here.
