import os

environment = os.getenv("DJANGO_ENV", "development").lower()

if environment == "production":
    from .production import *  # noqa: F403
else:
    from .development import *  # noqa: F403
