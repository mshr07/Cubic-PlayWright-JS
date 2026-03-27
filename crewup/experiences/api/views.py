from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from experiences.models import Booking, Category, Experience
from experiences.services import reserve_seat

from .serializers import BookingSerializer, CategorySerializer, ExperienceSerializer, HostSerializer

User = get_user_model()


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.published()
    serializer_class = ExperienceSerializer
    filterset_fields = ("category__slug", "event_type", "venue__city")
    search_fields = ("title", "summary", "tags", "venue__city")
    ordering_fields = ("start_at", "price", "created_at")


class CurrentUserAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = HostSerializer

    def get_object(self):
        return self.request.user


class BookingListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).select_related(
            "experience", "experience__category", "experience__venue", "experience__host"
        )

    def create(self, request, *args, **kwargs):
        experience = generics.get_object_or_404(Experience, slug=request.data.get("slug"), status=Experience.Status.PUBLISHED)
        booking = reserve_seat(user=request.user, experience=experience, note=request.data.get("note", ""))
        return Response(BookingSerializer(booking, context={"request": request}).data, status=201)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.select_related("user").get(key=response.data["token"])
        return Response(
            {
                "token": token.key,
                "user": HostSerializer(token.user).data,
            }
        )
