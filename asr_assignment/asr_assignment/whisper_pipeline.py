from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any


OPTIONAL_IMPORT_ERROR = (
    "Whisper training/evaluation requires optional dependencies. "
    "Install packages from requirements-optional.txt first."
)


def _lazy_imports() -> dict[str, Any]:
    try:
        import datasets
        import evaluate
        import torch
        from transformers import (
            Seq2SeqTrainer,
            Seq2SeqTrainingArguments,
            WhisperFeatureExtractor,
            WhisperForConditionalGeneration,
            WhisperProcessor,
            WhisperTokenizer,
        )
    except Exception as exc:  # pragma: no cover
        raise RuntimeError(OPTIONAL_IMPORT_ERROR) from exc

    return {
        "datasets": datasets,
        "evaluate": evaluate,
        "torch": torch,
        "Seq2SeqTrainer": Seq2SeqTrainer,
        "Seq2SeqTrainingArguments": Seq2SeqTrainingArguments,
        "WhisperFeatureExtractor": WhisperFeatureExtractor,
        "WhisperForConditionalGeneration": WhisperForConditionalGeneration,
        "WhisperProcessor": WhisperProcessor,
        "WhisperTokenizer": WhisperTokenizer,
    }


@dataclass
class WhisperRunConfig:
    model_name: str = "openai/whisper-small"
    language: str = "Hindi"
    task: str = "transcribe"
    train_batch_size: int = 8
    eval_batch_size: int = 8
    learning_rate: float = 1e-5
    max_steps: int = 1000
    output_dir: str = "output/whisper-small-hi"


def print_whisper_help() -> str:
    return (
        "Expected workflow:\n"
        "1. Prepare a manifest JSONL with audio_path and transcription text.\n"
        "2. Load the Hindi split of google/fleurs for evaluation.\n"
        "3. Run baseline generation with openai/whisper-small.\n"
        "4. Fine-tune with Seq2SeqTrainer.\n"
        "5. Compare baseline vs fine-tuned WER and export error cases.\n"
    )


def save_run_config(config: WhisperRunConfig, output_path: str) -> None:
    with open(output_path, "w", encoding="utf-8") as handle:
        json.dump(config.__dict__, handle, indent=2, ensure_ascii=False)


def build_training_stub(config: WhisperRunConfig) -> dict[str, Any]:
    """
    Returns a serializable summary of the intended training configuration.
    This is safe to call without GPU work and helps document the experiment.
    """
    return {
        "model_name": config.model_name,
        "language": config.language,
        "task": config.task,
        "train_batch_size": config.train_batch_size,
        "eval_batch_size": config.eval_batch_size,
        "learning_rate": config.learning_rate,
        "max_steps": config.max_steps,
        "output_dir": config.output_dir,
        "notes": [
            "Freeze nothing initially; fine-tune full whisper-small for the assignment baseline.",
            "Use Hindi forced decoder prompts through WhisperProcessor.",
            "Evaluate on the Hindi portion of FLEURS test after both baseline and fine-tuned runs.",
        ],
    }

