from __future__ import annotations

import json
import os
import pathlib
import urllib.request
from dataclasses import dataclass
from typing import Any, Iterable

from .urls import normalize_storage_url


@dataclass
class ManifestRecord:
    user_id: str
    recording_id: str
    language: str
    duration: float
    audio_url: str
    transcription_url: str
    metadata_url: str
    audio_path: str = ""
    transcription_path: str = ""
    metadata_path: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "user_id": self.user_id,
            "recording_id": self.recording_id,
            "language": self.language,
            "duration": self.duration,
            "audio_url": self.audio_url,
            "transcription_url": self.transcription_url,
            "metadata_url": self.metadata_url,
            "audio_path": self.audio_path,
            "transcription_path": self.transcription_path,
            "metadata_path": self.metadata_path,
        }


def _safe_name(url: str) -> str:
    return normalize_storage_url(url).rsplit("/", 1)[-1] or "artifact"


def prepare_manifest(records: Iterable[dict[str, Any]]) -> list[ManifestRecord]:
    manifest: list[ManifestRecord] = []
    for record in records:
        manifest.append(
            ManifestRecord(
                user_id=str(record.get("user_id", "")),
                recording_id=str(record.get("recording_id", "")),
                language=str(record.get("language", "")),
                duration=float(record.get("duration", 0.0) or 0.0),
                audio_url=normalize_storage_url(record.get("rec_url_gcp", "")),
                transcription_url=normalize_storage_url(record.get("transcription_url", "")),
                metadata_url=normalize_storage_url(record.get("metadata_url", "")),
            )
        )
    return manifest


def write_manifest_jsonl(records: Iterable[ManifestRecord], output_path: str) -> None:
    path = pathlib.Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        for record in records:
            handle.write(json.dumps(record.to_dict(), ensure_ascii=False) + "\n")


def download_record_assets(records: list[ManifestRecord], output_dir: str) -> list[ManifestRecord]:
    root = pathlib.Path(output_dir)
    root.mkdir(parents=True, exist_ok=True)

    for record in records:
        record_dir = root / record.recording_id
        record_dir.mkdir(parents=True, exist_ok=True)

        for key, url in (
            ("audio_path", record.audio_url),
            ("transcription_path", record.transcription_url),
            ("metadata_path", record.metadata_url),
        ):
            if not url:
                continue
            destination = record_dir / _safe_name(url)
            if not destination.exists():
                urllib.request.urlretrieve(url, destination)
            setattr(record, key, os.fspath(destination))
    return records


def read_jsonl(path: str) -> list[dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as handle:
        return [json.loads(line) for line in handle if line.strip()]

