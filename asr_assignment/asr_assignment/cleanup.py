from __future__ import annotations

import re
from dataclasses import dataclass


TOKEN_RE = re.compile(r"\d+|[A-Za-z]+|[\u0900-\u097F]+(?:-[\u0900-\u097F]+)?|[^\w\s]", re.UNICODE)


NUMBER_WORDS = {
    "शून्य": 0,
    "एक": 1,
    "दो": 2,
    "तीन": 3,
    "चार": 4,
    "पांच": 5,
    "पाँच": 5,
    "छह": 6,
    "सात": 7,
    "आठ": 8,
    "नौ": 9,
    "दस": 10,
    "ग्यारह": 11,
    "बारह": 12,
    "तेरह": 13,
    "चौदह": 14,
    "पंद्रह": 15,
    "पन्द्रह": 15,
    "सोलह": 16,
    "सत्रह": 17,
    "अठारह": 18,
    "उन्नीस": 19,
    "बीस": 20,
    "इक्कीस": 21,
    "बाईस": 22,
    "तेईस": 23,
    "चौबीस": 24,
    "पच्चीस": 25,
    "छब्बीस": 26,
    "सत्ताईस": 27,
    "अट्ठाईस": 28,
    "उनतीस": 29,
    "तीस": 30,
    "इकतीस": 31,
    "बत्तीस": 32,
    "तैंतीस": 33,
    "चौंतीस": 34,
    "पैंतीस": 35,
    "छत्तीस": 36,
    "सैंतीस": 37,
    "अड़तीस": 38,
    "उनतालीस": 39,
    "चालीस": 40,
    "इकतालीस": 41,
    "बयालीस": 42,
    "तैंतालीस": 43,
    "चवालीस": 44,
    "पैंतालीस": 45,
    "छियालीस": 46,
    "सैंतालीस": 47,
    "अड़तालीस": 48,
    "उनचास": 49,
    "पचास": 50,
    "इक्यावन": 51,
    "बावन": 52,
    "तिरेपन": 53,
    "चौवन": 54,
    "पचपन": 55,
    "छप्पन": 56,
    "सत्तावन": 57,
    "अट्ठावन": 58,
    "उनसठ": 59,
    "साठ": 60,
    "इकसठ": 61,
    "बासठ": 62,
    "तिरसठ": 63,
    "चौंसठ": 64,
    "पैंसठ": 65,
    "छियासठ": 66,
    "सड़सठ": 67,
    "अड़सठ": 68,
    "उनहत्तर": 69,
    "सत्तर": 70,
    "इकहत्तर": 71,
    "बहत्तर": 72,
    "तिहत्तर": 73,
    "चौहत्तर": 74,
    "पचहत्तर": 75,
    "छिहत्तर": 76,
    "सतहत्तर": 77,
    "अठहत्तर": 78,
    "उन्नासी": 79,
    "अस्सी": 80,
    "इक्यासी": 81,
    "बयासी": 82,
    "तिरासी": 83,
    "चौरासी": 84,
    "पचासी": 85,
    "छियासी": 86,
    "सत्तासी": 87,
    "अट्ठासी": 88,
    "नवासी": 89,
    "नब्बे": 90,
    "इक्यानवे": 91,
    "बानवे": 92,
    "तिरानवे": 93,
    "चौरानवे": 94,
    "पचानवे": 95,
    "छियानवे": 96,
    "सत्तानवे": 97,
    "अट्ठानवे": 98,
    "निन्यानवे": 99,
}

SCALES = {"सौ": 100, "हज़ार": 1000, "हजार": 1000, "लाख": 100000, "करोड़": 10000000}
IDIOMATIC_PATTERNS = {
    "दो-चार",
    "चार-पांच",
    "पांच-सात",
    "एक-दो",
    "दो-दो",
    "तीन-चार",
}

ENGLISH_HINTS = {
    "कंप्यूटर",
    "इंटरव्यू",
    "जॉब",
    "प्रॉब्लम",
    "प्रॉब्लेम",
    "सॉल्व",
    "मीटिंग",
    "प्रोजेक्ट",
    "ऑफिस",
    "मैनेजर",
    "सिस्टम",
    "मोबाइल",
    "लैपटॉप",
    "ट्रेनिंग",
    "फ़ाइल",
    "फाइल",
    "डॉक्यूमेंट",
}

ROMAN_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_-]*$")


def tokenize(text: str) -> list[str]:
    return TOKEN_RE.findall(text or "")


def detokenize(tokens: list[str]) -> str:
    output: list[str] = []
    for token in tokens:
        if not output:
            output.append(token)
            continue
        if re.match(r"[,.!?;:)\]}%]", token):
            output[-1] += token
        elif output[-1] in "([{":
            output[-1] += token
        else:
            output.append(token)
    return " ".join(output)


def _parse_number_tokens(tokens: list[str]) -> int | None:
    if not tokens:
        return None
    total = 0
    current = 0
    used = False

    for token in tokens:
        if token in NUMBER_WORDS:
            current += NUMBER_WORDS[token]
            used = True
            continue
        if token == "सौ":
            current = (current or 1) * 100
            used = True
            continue
        scale = SCALES.get(token)
        if scale is None:
            return None
        current = (current or 1) * scale
        total += current
        current = 0
        used = True

    return total + current if used else None


@dataclass
class NumberNormalizationResult:
    original: str
    normalized: str
    conversions: list[tuple[str, str]]


class HindiNumberNormalizer:
    def normalize(self, text: str) -> NumberNormalizationResult:
        tokens = tokenize(text)
        output: list[str] = []
        conversions: list[tuple[str, str]] = []
        i = 0

        while i < len(tokens):
            token = tokens[i]
            if token in IDIOMATIC_PATTERNS:
                output.append(token)
                i += 1
                continue

            best_span = None
            best_value = None
            max_j = min(len(tokens), i + 6)
            for j in range(i + 1, max_j + 1):
                span = tokens[i:j]
                if any(t in IDIOMATIC_PATTERNS or "-" in t for t in span):
                    break
                if not all(t in NUMBER_WORDS or t in SCALES for t in span):
                    break
                value = _parse_number_tokens(span)
                if value is not None:
                    best_span = span
                    best_value = value

            if best_span is not None and best_value is not None:
                span_text = " ".join(best_span)
                output.append(str(best_value))
                conversions.append((span_text, str(best_value)))
                i += len(best_span)
            else:
                output.append(token)
                i += 1

        return NumberNormalizationResult(text, detokenize(output), conversions)


class EnglishWordTagger:
    def __init__(self, lexicon: set[str] | None = None) -> None:
        self.lexicon = set(lexicon or ENGLISH_HINTS)

    def is_english_word(self, token: str) -> bool:
        if ROMAN_RE.match(token):
            return True
        return token in self.lexicon

    def tag(self, text: str) -> str:
        tagged: list[str] = []
        for token in tokenize(text):
            if self.is_english_word(token):
                tagged.append(f"[EN]{token}[/EN]")
            else:
                tagged.append(token)
        return detokenize(tagged)

