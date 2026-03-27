from __future__ import annotations

import argparse
import json

from .cleanup import EnglishWordTagger, HindiNumberNormalizer
from .lattice import build_lattice, lattice_wer
from .urls import infer_companion_urls, normalize_storage_url
from .whisper_pipeline import WhisperRunConfig, build_training_stub, print_whisper_help


def main() -> None:
    parser = argparse.ArgumentParser(description="Hindi ASR assignment toolkit")
    subparsers = parser.add_subparsers(dest="command", required=True)

    fix_urls = subparsers.add_parser("fix-url", help="Repair a broken GCS URL")
    fix_urls.add_argument("url")

    companions = subparsers.add_parser("infer-urls", help="Infer recording/transcription/metadata URLs")
    companions.add_argument("url")

    normalize = subparsers.add_parser("normalize-text", help="Normalize Hindi number words")
    normalize.add_argument("text")

    tag_english = subparsers.add_parser("tag-english", help="Tag English words in Hindi text")
    tag_english.add_argument("text")

    lattice_demo = subparsers.add_parser("lattice-demo", help="Run a small lattice scoring demo")

    whisper_help = subparsers.add_parser("whisper-help", help="Show Whisper fine-tuning guidance")
    whisper_help.add_argument("--config-json", action="store_true")

    args = parser.parse_args()

    if args.command == "fix-url":
        print(normalize_storage_url(args.url))
        return

    if args.command == "infer-urls":
        print(json.dumps(infer_companion_urls(args.url), ensure_ascii=False, indent=2))
        return

    if args.command == "normalize-text":
        result = HindiNumberNormalizer().normalize(args.text)
        print(json.dumps(result.__dict__, ensure_ascii=False, indent=2))
        return

    if args.command == "tag-english":
        print(EnglishWordTagger().tag(args.text))
        return

    if args.command == "lattice-demo":
        reference = "उसने चौदह किताबें खरीदीं"
        models = [
            "उसने 14 किताबें खरीदीं",
            "उसने चौदह पुस्तकें खरीदी",
            "उसने चौदह किताबे खरीदीं",
            "उसने चौदह किताबें खरीदीं",
        ]
        lattice = build_lattice(reference, models)
        for output in models:
            print(output, "=>", round(lattice_wer(lattice, output), 4))
        return

    if args.command == "whisper-help":
        print(print_whisper_help())
        if args.config_json:
            config = WhisperRunConfig()
            print(json.dumps(build_training_stub(config), ensure_ascii=False, indent=2))
        return


if __name__ == "__main__":
    main()
