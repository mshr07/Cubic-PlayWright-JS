from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path

from .forms import SwiggyAuthenticationForm
from .views import DashboardView, HomeView, RestaurantDetailApiView, RestaurantListApiView, SignUpView


urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path(
        "login/",
        LoginView.as_view(
            template_name="registration/login.html",
            authentication_form=SwiggyAuthenticationForm,
            redirect_authenticated_user=True,
        ),
        name="login",
    ),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("signup/", SignUpView.as_view(), name="signup"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("api/restaurants/", RestaurantListApiView.as_view(), name="restaurant-list-api"),
    path(
        "api/restaurants/<int:restaurant_id>/",
        RestaurantDetailApiView.as_view(),
        name="restaurant-detail-api",
    ),
]
