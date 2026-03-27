from __future__ import annotations

from collections import Counter
from dataclasses import dataclass, field

from .cleanup import HindiNumberNormalizer, tokenize
from .error_analysis import _levenshtein_alignment


EPSILON = "<eps>"


@dataclass
class LatticeBin:
    variants: set[str] = field(default_factory=set)

    def add(self, token: str) -> None:
        if token:
            self.variants.add(token)


def _normalize_variant(token: str) -> str:
    return HindiNumberNormalizer().normalize(token).normalized


def align_to_reference(reference_tokens: list[str], hypothesis_tokens: list[str]) -> list[tuple[str | None, str | None]]:
    _, ops = _levenshtein_alignment(reference_tokens, hypothesis_tokens)
    aligned: list[tuple[str | None, str | None]] = []
    for op, ref, hyp in ops:
        if op == "match":
            aligned.append((ref, hyp))
        elif op == "substitute":
            aligned.append((ref, hyp))
        elif op == "delete":
            aligned.append((ref, None))
        elif op == "insert":
            aligned.append((None, hyp))
    return aligned


def build_lattice(reference: str, model_outputs: list[str], trust_agreement_threshold: int = 2) -> list[LatticeBin]:
    ref_tokens = tokenize(reference)
    lattice = [LatticeBin({token}) for token in ref_tokens]
    insertion_bins: list[LatticeBin] = []

    per_position_alternatives: list[Counter[str]] = [Counter() for _ in ref_tokens]
    insertion_counter: Counter[str] = Counter()

    for output in model_outputs:
        for idx, (ref, hyp) in enumerate(align_to_reference(ref_tokens, tokenize(output))):
            if ref is None and hyp is not None:
                insertion_counter[hyp] += 1
                continue
            if ref is None:
                continue
            ref_index = min(idx, len(ref_tokens) - 1)
            if hyp is not None:
                per_position_alternatives[ref_index][hyp] += 1

    for idx, bin_obj in enumerate(lattice):
        for variant, count in per_position_alternatives[idx].items():
            if count >= trust_agreement_threshold:
                bin_obj.add(variant)

    for variant, count in insertion_counter.items():
        if count >= trust_agreement_threshold:
            insertion_bins.append(LatticeBin({EPSILON, variant}))

    return lattice + insertion_bins


def lattice_wer(lattice: list[LatticeBin], hypothesis: str) -> float:
    hyp_tokens = tokenize(hypothesis)
    rows = len(lattice) + 1
    cols = len(hyp_tokens) + 1
    dp = [[0] * cols for _ in range(rows)]

    for i in range(1, rows):
        dp[i][0] = i
    for j in range(1, cols):
        dp[0][j] = j

    for i in range(1, rows):
        variants = lattice[i - 1].variants
        normalized_variants = {_normalize_variant(token) for token in variants if token != EPSILON}
        allows_epsilon = EPSILON in variants

        for j in range(1, cols):
            hyp = hyp_tokens[j - 1]
            normalized_hyp = _normalize_variant(hyp)
            match_cost = 0 if hyp in variants or normalized_hyp in normalized_variants else 1
            delete_cost = 0 if allows_epsilon else 1
            dp[i][j] = min(
                dp[i - 1][j] + delete_cost,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + match_cost,
            )

    denominator = max(1, len([bin_obj for bin_obj in lattice if EPSILON not in bin_obj.variants]))
    return dp[-1][-1] / denominator

