from django.contrib.auth import login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.views.generic import FormView, TemplateView

from .forms import SwiggySignUpForm

RESTAURANTS = [
    {
        "id": 1,
        "name": "Biryani Junction",
        "cuisine": "Hyderabadi, North Indian",
        "rating": 4.7,
        "delivery_time": "28 mins",
        "location": "Madhapur",
        "offer": "40% OFF up to Rs. 120",
        "description": "Slow-cooked biryanis, kebabs, and rich curries for hearty weekend cravings.",
        "menu": [
            {"id": 101, "item": "Chicken Dum Biryani", "price": 299, "category": "Biryani", "is_veg": False},
            {"id": 102, "item": "Paneer Biryani", "price": 249, "category": "Biryani", "is_veg": True},
            {"id": 103, "item": "Apollo Fish", "price": 269, "category": "Starters", "is_veg": False},
            {"id": 104, "item": "Double Ka Meetha", "price": 119, "category": "Dessert", "is_veg": True},
        ],
    },
    {
        "id": 2,
        "name": "Dosa Stories",
        "cuisine": "South Indian",
        "rating": 4.5,
        "delivery_time": "22 mins",
        "location": "Kondapur",
        "offer": "Free chutney combo",
        "description": "Crisp dosas, fluffy idlis, and comforting tiffins made fresh through the day.",
        "menu": [
            {"id": 201, "item": "Masala Dosa", "price": 120, "category": "Dosa", "is_veg": True},
            {"id": 202, "item": "Ghee Podi Idli", "price": 140, "category": "Tiffins", "is_veg": True},
            {"id": 203, "item": "Mysore Bonda", "price": 99, "category": "Snacks", "is_veg": True},
            {"id": 204, "item": "Filter Coffee", "price": 65, "category": "Beverages", "is_veg": True},
        ],
    },
    {
        "id": 3,
        "name": "Burger District",
        "cuisine": "American, Fast Food",
        "rating": 4.4,
        "delivery_time": "18 mins",
        "location": "Gachibowli",
        "offer": "Buy 1 burger, get fries at Rs. 49",
        "description": "Smash burgers, loaded fries, wraps, and shakes for quick late-night ordering.",
        "menu": [
            {"id": 301, "item": "Classic Veg Burger", "price": 179, "category": "Burger", "is_veg": True},
            {"id": 302, "item": "Loaded Chicken Burger", "price": 229, "category": "Burger", "is_veg": False},
            {"id": 303, "item": "Peri Peri Fries", "price": 149, "category": "Sides", "is_veg": True},
            {"id": 304, "item": "Chocolate Thick Shake", "price": 159, "category": "Beverages", "is_veg": True},
        ],
    },
    {
        "id": 4,
        "name": "Wok Express",
        "cuisine": "Chinese, Asian",
        "rating": 4.6,
        "delivery_time": "25 mins",
        "location": "Hitech City",
        "offer": "Flat Rs. 100 OFF above Rs. 499",
        "description": "Hot wok bowls, momos, noodles, and gravies with a street-food style kick.",
        "menu": [
            {"id": 401, "item": "Veg Hakka Noodles", "price": 189, "category": "Noodles", "is_veg": True},
            {"id": 402, "item": "Chicken Fried Rice", "price": 209, "category": "Rice", "is_veg": False},
            {"id": 403, "item": "Paneer Chilli", "price": 199, "category": "Starters", "is_veg": True},
            {"id": 404, "item": "Chicken Momos", "price": 179, "category": "Momos", "is_veg": False},
        ],
    },
]


class HomeView(TemplateView):
    template_name = "myapp/home.html"


class SignUpView(FormView):
    template_name = "registration/signup.html"
    form_class = SwiggySignUpForm

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("dashboard")
        return super().dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect("dashboard")


class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = "myapp/dashboard.html"
    login_url = "login"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["restaurants"] = RESTAURANTS
        menu_count = sum(len(restaurant["menu"]) for restaurant in RESTAURANTS)
        context["stats"] = {
            "restaurant_count": len(RESTAURANTS),
            "menu_count": menu_count,
            "delivery_cities": len({restaurant["location"] for restaurant in RESTAURANTS}),
            "average_rating": round(
                sum(restaurant["rating"] for restaurant in RESTAURANTS) / len(RESTAURANTS), 1
            ),
        }
        return context


class RestaurantListApiView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({"restaurants": RESTAURANTS})


class RestaurantDetailApiView(View):
    def get(self, request, restaurant_id, *args, **kwargs):
        restaurant = next(
            (restaurant for restaurant in RESTAURANTS if restaurant["id"] == restaurant_id),
            None,
        )
        if restaurant is None:
            return JsonResponse({"error": "Restaurant not found"}, status=404)
        return JsonResponse(restaurant)
