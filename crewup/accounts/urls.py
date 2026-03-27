from django.contrib.auth.views import LogoutView
from django.urls import path

from .views import AccountLoginView, ProfileUpdateView, SignUpView

app_name = "accounts"

urlpatterns = [
    path("login/", AccountLoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("signup/", SignUpView.as_view(), name="signup"),
    path("profile/", ProfileUpdateView.as_view(), name="profile"),
]
