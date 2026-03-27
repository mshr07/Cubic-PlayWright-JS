# CrewUp

CrewUp is a production-style Django teaching project for explaining how real applications are built with:

- Django templates for the server-rendered frontend
- Django REST Framework for React-ready APIs
- Custom user model and authentication
- CRUD, search, filtering, pagination, bookings, favorites, reviews, and dashboards
- Environment-based settings, WhiteNoise static handling, admin, seed data, and tests

## Project idea

CrewUp is a weekend experiences platform for young professionals. Users can discover and host open mics, workshops,
fitness meetups, game nights, and other city-based plans.

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py seed_crewup
python manage.py createsuperuser
python manage.py runserver
```

## API examples

```bash
curl http://127.0.0.1:8000/api/experiences/
curl -X POST http://127.0.0.1:8000/api/auth/token/ -d "username=weekendrahul&password=demo12345"
```
