from __future__ import annotations

from collections import Counter
from dataclasses import dataclass

from .cleanup import EnglishWordTagger, HindiNumberNormalizer, tokenize


def _levenshtein_alignment(reference: list[str], hypothesis: list[str]) -> tuple[int, list[tuple[str, str | None, str | None]]]:
    rows = len(reference) + 1
    cols = len(hypothesis) + 1
    dp = [[0] * cols for _ in range(rows)]
    back: list[list[tuple[int, int, str] | None]] = [[None] * cols for _ in range(rows)]

    for i in range(1, rows):
        dp[i][0] = i
        back[i][0] = (i - 1, 0, "delete")
    for j in range(1, cols):
        dp[0][j] = j
        back[0][j] = (0, j - 1, "insert")

    for i in range(1, rows):
        for j in range(1, cols):
            if reference[i - 1] == hypothesis[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
                back[i][j] = (i - 1, j - 1, "match")
                continue
            candidates = [
                (dp[i - 1][j] + 1, (i - 1, j, "delete")),
                (dp[i][j - 1] + 1, (i, j - 1, "insert")),
                (dp[i - 1][j - 1] + 1, (i - 1, j - 1, "substitute")),
            ]
            best_cost, best_back = min(candidates, key=lambda item: item[0])
            dp[i][j] = best_cost
            back[i][j] = best_back

    ops: list[tuple[str, str | None, str | None]] = []
    i, j = len(reference), len(hypothesis)
    while i > 0 or j > 0:
        prev_i, prev_j, op = back[i][j]  # type: ignore[misc]
        ref_token = reference[i - 1] if i > 0 and op in {"delete", "substitute", "match"} else None
        hyp_token = hypothesis[j - 1] if j > 0 and op in {"insert", "substitute", "match"} else None
        ops.append((op, ref_token, hyp_token))
        i, j = prev_i, prev_j
    ops.reverse()
    return dp[-1][-1], ops


def wer(reference: str, hypothesis: str) -> float:
    ref_tokens = tokenize(reference)
    hyp_tokens = tokenize(hypothesis)
    if not ref_tokens:
        return 0.0 if not hyp_tokens else 1.0
    distance, _ = _levenshtein_alignment(ref_tokens, hyp_tokens)
    return distance / len(ref_tokens)


@dataclass
class ErrorCase:
    sample_id: str
    reference: str
    hypothesis: str
    error_type: str
    wer: float


class ErrorTaxonomyBuilder:
    def __init__(self) -> None:
        self.number_normalizer = HindiNumberNormalizer()
        self.english_tagger = EnglishWordTagger()

    def classify(self, reference: str, hypothesis: str) -> str:
        ref_tokens = tokenize(reference)
        hyp_tokens = tokenize(hypothesis)
        _, ops = _levenshtein_alignment(ref_tokens, hyp_tokens)

        if any(
            self.number_normalizer.normalize(ref).normalized == hyp
            or self.number_normalizer.normalize(hyp).normalized == ref
            for ref, hyp in ((reference, hypothesis),)
        ):
            return "number-format"

        if any(
            ref and hyp and (
                self.english_tagger.is_english_word(ref) or self.english_tagger.is_english_word(hyp)
            )
            for op, ref, hyp in ops
            if op == "substitute"
        ):
            return "english-borrowing"

        if any(op == "delete" for op, _, _ in ops):
            return "deletion"
        if any(op == "insert" for op, _, _ in ops):
            return "insertion"
        if any(op == "substitute" for op, _, _ in ops):
            return "substitution"
        return "correct"

    def build_cases(self, rows: list[dict[str, str]]) -> list[ErrorCase]:
        cases: list[ErrorCase] = []
        for index, row in enumerate(rows):
            reference = row["reference"]
            hypothesis = row["hypothesis"]
            sample_wer = wer(reference, hypothesis)
            if sample_wer == 0:
                continue
            cases.append(
                ErrorCase(
                    sample_id=str(row.get("sample_id", index)),
                    reference=reference,
                    hypothesis=hypothesis,
                    error_type=self.classify(reference, hypothesis),
                    wer=sample_wer,
                )
            )
        return cases


def systematic_sample(cases: list[ErrorCase], sample_size: int = 25) -> list[ErrorCase]:
    if len(cases) <= sample_size:
        return cases
    step = max(1, len(cases) // sample_size)
    sampled = cases[::step]
    return sampled[:sample_size]


def summarize_taxonomy(cases: list[ErrorCase]) -> dict[str, int]:
    counts = Counter(case.error_type for case in cases)
    return dict(counts)

