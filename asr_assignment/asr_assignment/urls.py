from __future__ import annotations

import re


_ZERO_WIDTH_RE = re.compile(r"[\u200b-\u200f\u2060\ufeff]")
_WHITESPACE_RE = re.compile(r"\s+")


def normalize_storage_url(url: str) -> str:
    """Repair broken GCS URLs that contain embedded whitespace/newlines."""
    cleaned = _ZERO_WIDTH_RE.sub("", url or "").strip()
    cleaned = _WHITESPACE_RE.sub("", cleaned)
    cleaned = cleaned.replace("upload_goai//", "upload_goai/")
    cleaned = cleaned.replace("storage.googleapis.com//", "storage.googleapis.com/")
    return cleaned


def infer_companion_urls(base_url: str) -> dict[str, str]:
    """
    Given any one of the assignment URLs, infer companion recording/transcription/metadata URLs.
    """
    normalized = normalize_storage_url(base_url)
    if not normalized:
        return {"recording": "", "transcription": "", "metadata": ""}

    if normalized.endswith("_transcription.json"):
        stem = normalized[: -len("_transcription.json")]
    elif normalized.endswith("_metadata.json"):
        stem = normalized[: -len("_metadata.json")]
    else:
        stem = re.sub(r"\.(wav|mp3|flac|m4a)$", "", normalized, flags=re.IGNORECASE)

    return {
        "recording": stem + ".wav",
        "transcription": stem + "_transcription.json",
        "metadata": stem + "_metadata.json",
    }

