import unittest

from asr_assignment.error_analysis import ErrorTaxonomyBuilder, systematic_sample, wer


class ErrorAnalysisTests(unittest.TestCase):
    def test_wer(self):
        score = wer("उसने चौदह किताबें खरीदीं", "उसने 14 किताबें खरीदीं")
        self.assertGreater(score, 0.0)

    def test_taxonomy_detects_number_format(self):
        builder = ErrorTaxonomyBuilder()
        label = builder.classify("उसने चौदह किताबें खरीदीं", "उसने 14 किताबें खरीदीं")
        self.assertEqual(label, "number-format")

    def test_systematic_sampling(self):
        builder = ErrorTaxonomyBuilder()
        rows = [{"sample_id": str(i), "reference": "यह सही है", "hypothesis": "यह गलत है"} for i in range(40)]
        cases = builder.build_cases(rows)
        sampled = systematic_sample(cases, sample_size=10)
        self.assertEqual(len(sampled), 10)
        self.assertEqual(sampled[0].sample_id, "0")


if __name__ == "__main__":
    unittest.main()

