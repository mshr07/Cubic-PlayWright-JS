from django.db import transaction

from .models import Booking, Favorite


@transaction.atomic
def reserve_seat(*, user, experience, note=""):
    booking, created = Booking.objects.get_or_create(
        user=user,
        experience=experience,
        defaults={
            "status": Booking.Status.CONFIRMED if experience.seats_left > 0 else Booking.Status.WAITLISTED,
            "note": note,
        },
    )
    if not created and booking.status == Booking.Status.CANCELLED:
        booking.status = Booking.Status.CONFIRMED if experience.seats_left > 0 else Booking.Status.WAITLISTED
        booking.note = note
        booking.save(update_fields=["status", "note", "updated_at"])
    return booking


def toggle_favorite(*, user, experience):
    favorite, created = Favorite.objects.get_or_create(user=user, experience=experience)
    if not created:
        favorite.delete()
        return False
    return True
