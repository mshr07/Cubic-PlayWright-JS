from django import forms

from .models import Experience, Review


class StyledFormMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for name, field in self.fields.items():
            base_class = "form-control"
            if isinstance(field.widget, forms.CheckboxInput):
                base_class = "form-check-input"
            field.widget.attrs.setdefault("class", base_class)
            if name in {"start_at", "end_at"}:
                field.widget.input_type = "datetime-local"


class ExperienceForm(StyledFormMixin, forms.ModelForm):
    class Meta:
        model = Experience
        fields = (
            "category",
            "venue",
            "title",
            "summary",
            "description",
            "event_type",
            "start_at",
            "end_at",
            "capacity",
            "price",
            "status",
            "tags",
            "is_featured",
            "cover_image",
        )
        widgets = {
            "description": forms.Textarea(attrs={"rows": 6, "class": "form-control"}),
        }


class ReviewForm(StyledFormMixin, forms.ModelForm):
    class Meta:
        model = Review
        fields = ("rating", "headline", "comment")
        widgets = {"comment": forms.Textarea(attrs={"rows": 4, "class": "form-control"})}
