from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Count
from django.views.generic import TemplateView

from experiences.models import Booking, Category, Experience


class HomeView(TemplateView):
    template_name = "core/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["featured_experiences"] = Experience.objects.published().filter(is_featured=True)[:3]
        context["categories"] = Category.objects.annotate(total=Count("experiences"))[:6]
        context["cities"] = (
            Experience.objects.published()
            .exclude(venue__city="")
            .values_list("venue__city", flat=True)
            .distinct()[:5]
        )
        return context


class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = "core/dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        context["upcoming_bookings"] = (
            Booking.objects.filter(user=user)
            .exclude(status=Booking.Status.CANCELLED)
            .select_related("experience", "experience__venue")
        )
        context["saved_experiences"] = Experience.objects.published().filter(favorites__user=user)[:4]
        context["hosted_experiences"] = Experience.objects.filter(host=user)[:4]
        return context

# Create your views here.
