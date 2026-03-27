# Hindi ASR Assignment Toolkit

This folder contains a small, reproducible Python toolkit for the Josh Talks Speech & Audio assignment.

Detailed usage instructions are in `/Users/srihemanthreddy/Documents/Ajay LLM/Playwright/asr_assignment/RUNBOOK.md`.

What is implemented:

- Dataset URL repair and manifest preparation
- Hindi text cleanup utilities
  - number normalization
  - English word tagging in Hindi transcripts
- ASR error analysis helpers
  - pure-Python WER
  - systematic error sampling
  - lightweight taxonomy
- Lattice-based evaluation utilities for multi-ASR comparisons
- Optional Whisper training/evaluation entrypoints that activate when ML dependencies are installed

What is not bundled:

- The assignment dataset itself
- Heavy ML dependencies like `torch`, `transformers`, and `datasets`

Quick start:

```bash
cd /Users/srihemanthreddy/Documents/Ajay\ LLM/Playwright/asr_assignment
python3 -m unittest discover -s tests -v
python3 -m asr_assignment.cli normalize-text "मेरे पास तीन सौ चौवन रुपये हैं"
python3 -m asr_assignment.cli tag-english "मेरा इंटरव्यू बहुत अच्छा गया और मुझे जॉब मिल गई"
python3 -m asr_assignment.cli lattice-demo
```

If you want to run Whisper training later:

1. Create a Python environment with the packages listed in `requirements-optional.txt`
2. Prepare a manifest JSONL using the dataset utilities in this package
3. Use `python3 -m asr_assignment.cli whisper-help`
