# Runbook

This document explains how to run the toolkit, what outputs to expect, and where API keys would be used if you add optional integrations.

## 1. What this toolkit does

The toolkit in `/Users/srihemanthreddy/Documents/Ajay LLM/Playwright/asr_assignment` supports these assignment tasks:

- Repair broken dataset URLs
- Prepare/download dataset manifests
- Normalize Hindi number words into digits
- Tag English words inside Hindi transcripts
- Compute WER and build a lightweight error taxonomy
- Build and score a lattice for fairer ASR evaluation
- Prepare a Whisper fine-tuning configuration stub

## 2. What is required before running

Minimum requirement for the tested parts:

- `python3`

Optional requirement for Whisper fine-tuning and FLEURS evaluation:

- Install packages from `/Users/srihemanthreddy/Documents/Ajay LLM/Playwright/asr_assignment/requirements-optional.txt`
- Access to the Josh Talks dataset
- Enough CPU/GPU memory for `openai/whisper-small`

## 3. Where to run from

Run all commands from:

```bash
cd /Users/srihemanthreddy/Documents/Ajay\ LLM/Playwright/asr_assignment
```

## 4. Tested commands

### Run unit tests

```bash
python3 -m unittest discover -s tests -v
```

Expected output:

- 12 tests run
- final status `OK`

This validates:

- URL repair
- companion URL inference
- number normalization
- English word tagging
- WER helper
- taxonomy helper
- lattice scoring behavior

### Repair a broken storage URL

```bash
python3 -m asr_assignment.cli fix-url "https://storage.googleapis.com/upload
_goai/967179/825780
_
transcription.json"
```

Expected output:

```text
https://storage.googleapis.com/upload_goai/967179/825780_transcription.json
```

### Infer audio/transcription/metadata URLs

```bash
python3 -m asr_assignment.cli infer-urls "https://storage.googleapis.com/upload_goai/967179/825780_transcription.json"
```

Expected output:

```json
{
  "recording": "https://storage.googleapis.com/upload_goai/967179/825780.wav",
  "transcription": "https://storage.googleapis.com/upload_goai/967179/825780_transcription.json",
  "metadata": "https://storage.googleapis.com/upload_goai/967179/825780_metadata.json"
}
```

### Normalize Hindi numbers

```bash
python3 -m asr_assignment.cli normalize-text "मेरे पास तीन सौ चौवन रुपये हैं"
```

Expected output:

```json
{
  "original": "मेरे पास तीन सौ चौवन रुपये हैं",
  "normalized": "मेरे पास 354 रुपये हैं",
  "conversions": [
    [
      "तीन सौ चौवन",
      "354"
    ]
  ]
}
```

### Tag English words in Hindi transcripts

```bash
python3 -m asr_assignment.cli tag-english "मेरा इंटरव्यू बहुत अच्छा गया और मुझे जॉब मिल गई"
```

Expected output:

```text
मेरा [EN]इंटरव्यू[/EN] बहुत अच्छा गया और मुझे [EN]जॉब[/EN] मिल गई
```

### Run lattice demo

```bash
python3 -m asr_assignment.cli lattice-demo
```

Expected output shape:

- one line per model output
- a relaxed lattice-WER score next to each output

Example:

```text
उसने 14 किताबें खरीदीं => 0.0
उसने चौदह पुस्तकें खरीदी => 0.5
उसने चौदह किताबे खरीदीं => 0.25
उसने चौदह किताबें खरीदीं => 0.0
```

### Show Whisper fine-tuning plan

```bash
python3 -m asr_assignment.cli whisper-help --config-json
```

Expected output:

- a short 5-step workflow
- a JSON configuration stub for the Whisper experiment

## 5. Dataset preparation flow

The Python helpers for dataset prep live in:

- `/Users/srihemanthreddy/Documents/Ajay LLM/Playwright/asr_assignment/asr_assignment/dataset.py`
- `/Users/srihemanthreddy/Documents/Ajay LLM/Playwright/asr_assignment/asr_assignment/urls.py`

Typical flow:

1. Load your source metadata rows.
2. Run `prepare_manifest(...)`.
3. Optionally run `download_record_assets(...)`.
4. Save the final manifest with `write_manifest_jsonl(...)`.

Expected manifest fields:

- `user_id`
- `recording_id`
- `language`
- `duration`
- `audio_url`
- `transcription_url`
- `metadata_url`
- `audio_path`
- `transcription_path`
- `metadata_path`

Expected output format:

- JSONL
- one record per utterance

## 6. API keys and environment variables

### What is needed right now

For the currently tested local utilities:

- No API key is required

### Optional keys you may need later

If you extend this into a full training/evaluation pipeline, these are the only likely credentials:

- `HF_TOKEN`
  - Use this only if Hugging Face model or dataset access requires authentication.
  - Example use: downloading `openai/whisper-small` or gated resources through `transformers` / `datasets`.

- Google Cloud credentials
  - Only needed if the dataset URLs stop being public and require authenticated GCS access.
  - Prefer standard Google credentials rather than hardcoding keys in the code.

### Where to put them

Do not hardcode keys inside Python files.

Use shell environment variables instead:

```bash
export HF_TOKEN="your_token_here"
```

If Google Cloud authentication is needed:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/service-account.json"
```

Then run your Python commands in the same terminal session.

### Where in the code they matter

Right now, no file in this toolkit directly reads API keys.

If you later add authenticated model loading or protected dataset downloads, the best place to read environment variables would be:

- `/Users/srihemanthreddy/Documents/Ajay LLM/Playwright/asr_assignment/asr_assignment/whisper_pipeline.py`
- `/Users/srihemanthreddy/Documents/Ajay LLM/Playwright/asr_assignment/asr_assignment/dataset.py`

## 7. What is not automated yet

These assignment parts still require real data plus optional ML dependencies:

- Running pretrained Whisper-small on the Josh Talks audio
- Fine-tuning Whisper-small
- Evaluating on the Hindi split of FLEURS
- Producing final WER tables from actual runs
- Sampling 25 real failed utterances from model output
- Word-level spelling classification over the full 1.75 lakh unique-word list

## 8. Common issues

### `ModuleNotFoundError`

Cause:

- optional ML packages are not installed

Fix:

```bash
python3 -m pip install -r requirements-optional.txt
```

### Broken Google Storage URLs

Cause:

- copied URLs contain line breaks or hidden spaces

Fix:

- run `fix-url`
- or pass the raw string through `normalize_storage_url(...)`

### Fine-tuning does not start

Cause:

- `torch`, `transformers`, or `datasets` is missing
- dataset manifest is incomplete
- machine does not have enough memory

Fix:

- install optional dependencies
- verify manifest paths
- reduce batch size in the Whisper config stub

## 9. Recommended next step

Once the real dataset is available in the workspace, the next practical step is:

1. Build a manifest JSONL from the Josh Talks metadata.
2. Download a small subset first.
3. Run baseline Whisper inference.
4. Export predictions and references.
5. Use the cleanup, taxonomy, and lattice modules on those outputs.

