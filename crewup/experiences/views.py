from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Count, Q
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView, TemplateView, UpdateView

from .forms import ExperienceForm, ReviewForm
from .models import Booking, Category, Experience, Review
from .services import reserve_seat, toggle_favorite


class ExperienceListView(ListView):
    model = Experience
    template_name = "experiences/experience_list.html"
    context_object_name = "experiences"
    paginate_by = 6

    def get_queryset(self):
        queryset = (
            Experience.objects.published()
            .annotate(bookings_count=Count("bookings"))
            .order_by("start_at")
        )
        query = self.request.GET.get("q")
        category = self.request.GET.get("category")
        city = self.request.GET.get("city")
        event_type = self.request.GET.get("type")

        if query:
            queryset = queryset.filter(
                Q(title__icontains=query)
                | Q(summary__icontains=query)
                | Q(tags__icontains=query)
                | Q(venue__city__icontains=query)
            )
        if category:
            queryset = queryset.filter(category__slug=category)
        if city:
            queryset = queryset.filter(venue__city__icontains=city)
        if event_type:
            queryset = queryset.filter(event_type=event_type)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = Category.objects.all()
        context["filters"] = {
            "q": self.request.GET.get("q", ""),
            "category": self.request.GET.get("category", ""),
            "city": self.request.GET.get("city", ""),
            "type": self.request.GET.get("type", ""),
        }
        return context


class ExperienceDetailView(DetailView):
    model = Experience
    template_name = "experiences/experience_detail.html"
    slug_field = "slug"
    slug_url_kwarg = "slug"

    def get_queryset(self):
        return Experience.objects.published().prefetch_related("reviews__user", "favorites", "bookings")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        experience = self.object
        context["review_form"] = ReviewForm()
        context["has_favorited"] = user.is_authenticated and experience.favorites.filter(user=user).exists()
        context["has_booking"] = user.is_authenticated and experience.bookings.filter(user=user).exists()
        return context


class ExperienceCreateView(LoginRequiredMixin, CreateView):
    form_class = ExperienceForm
    template_name = "experiences/experience_form.html"

    def form_valid(self, form):
        form.instance.host = self.request.user
        messages.success(self.request, "Experience created successfully.")
        return super().form_valid(form)


class ExperienceUpdateView(LoginRequiredMixin, UpdateView):
    model = Experience
    form_class = ExperienceForm
    template_name = "experiences/experience_form.html"
    slug_field = "slug"
    slug_url_kwarg = "slug"

    def get_queryset(self):
        return Experience.objects.filter(host=self.request.user)

    def form_valid(self, form):
        messages.success(self.request, "Experience updated successfully.")
        return super().form_valid(form)


class BookingCreateView(LoginRequiredMixin, CreateView):
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        experience = get_object_or_404(Experience, slug=kwargs["slug"], status=Experience.Status.PUBLISHED)
        booking = reserve_seat(user=request.user, experience=experience)
        message = "Seat reserved successfully." if booking.status == Booking.Status.CONFIRMED else "You were added to the waitlist."
        messages.success(request, message)
        return redirect(experience.get_absolute_url())


class BookingCancelView(LoginRequiredMixin, CreateView):
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        booking = get_object_or_404(Booking, user=request.user, experience__slug=kwargs["slug"])
        booking.status = Booking.Status.CANCELLED
        booking.save(update_fields=["status", "updated_at"])
        messages.info(request, "Your booking has been cancelled.")
        return redirect("core:dashboard")


class FavoriteToggleView(LoginRequiredMixin, CreateView):
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        experience = get_object_or_404(Experience, slug=kwargs["slug"], status=Experience.Status.PUBLISHED)
        saved = toggle_favorite(user=request.user, experience=experience)
        messages.success(request, "Saved to your list." if saved else "Removed from saved experiences.")
        return HttpResponseRedirect(request.META.get("HTTP_REFERER", experience.get_absolute_url()))


class ReviewCreateView(LoginRequiredMixin, CreateView):
    form_class = ReviewForm
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        experience = get_object_or_404(Experience, slug=kwargs["slug"], status=Experience.Status.PUBLISHED)
        form = ReviewForm(request.POST)
        if form.is_valid():
            Review.objects.update_or_create(
                user=request.user,
                experience=experience,
                defaults=form.cleaned_data,
            )
            messages.success(request, "Thanks for sharing your review.")
        else:
            messages.error(request, "Please fix the review form errors.")
        return redirect(experience.get_absolute_url())


class HostDashboardView(LoginRequiredMixin, TemplateView):
    template_name = "experiences/host_dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        hosted = Experience.objects.filter(host=self.request.user).select_related("category", "venue")
        context["hosted_experiences"] = hosted
        context["published_count"] = hosted.filter(status=Experience.Status.PUBLISHED).count()
        context["total_bookings"] = Booking.objects.filter(experience__host=self.request.user).exclude(
            status=Booking.Status.CANCELLED
        ).count()
        return context
