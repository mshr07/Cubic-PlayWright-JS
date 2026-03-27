from django.urls import path

from .views import (
    BookingCancelView,
    BookingCreateView,
    ExperienceCreateView,
    ExperienceDetailView,
    ExperienceListView,
    ExperienceUpdateView,
    FavoriteToggleView,
    HostDashboardView,
    ReviewCreateView,
)

app_name = "experiences"

urlpatterns = [
    path("", ExperienceListView.as_view(), name="list"),
    path("host/", HostDashboardView.as_view(), name="host-dashboard"),
    path("create/", ExperienceCreateView.as_view(), name="create"),
    path("<slug:slug>/", ExperienceDetailView.as_view(), name="detail"),
    path("<slug:slug>/edit/", ExperienceUpdateView.as_view(), name="edit"),
    path("<slug:slug>/book/", BookingCreateView.as_view(), name="book"),
    path("<slug:slug>/cancel-booking/", BookingCancelView.as_view(), name="cancel-booking"),
    path("<slug:slug>/favorite/", FavoriteToggleView.as_view(), name="favorite"),
    path("<slug:slug>/review/", ReviewCreateView.as_view(), name="review"),
]
