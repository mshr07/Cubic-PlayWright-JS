from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

User = get_user_model()


class BaseStyledFormMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs.setdefault("class", "form-control")


class SignUpForm(BaseStyledFormMixin, UserCreationForm):
    class Meta:
        model = User
        fields = (
            "username",
            "full_name",
            "email",
            "profession",
            "city",
            "interests",
            "is_creator",
        )


class ProfileForm(BaseStyledFormMixin, forms.ModelForm):
    class Meta:
        model = User
        fields = ("full_name", "profession", "city", "bio", "interests", "avatar", "is_creator")
        widgets = {"bio": forms.Textarea(attrs={"rows": 4, "class": "form-control"})}


class StyledAuthenticationForm(BaseStyledFormMixin, AuthenticationForm):
    pass
