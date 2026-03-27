from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookingListCreateAPIView, CategoryListAPIView, CurrentUserAPIView, CustomAuthToken, ExperienceViewSet

router = DefaultRouter()
router.register("experiences", ExperienceViewSet, basename="api-experiences")

urlpatterns = [
    path("", include(router.urls)),
    path("categories/", CategoryListAPIView.as_view(), name="api-categories"),
    path("bookings/", BookingListCreateAPIView.as_view(), name="api-bookings"),
    path("me/", CurrentUserAPIView.as_view(), name="api-me"),
    path("auth/token/", CustomAuthToken.as_view(), name="api-token"),
]
