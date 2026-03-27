import unittest

from asr_assignment.cleanup import EnglishWordTagger, HindiNumberNormalizer


class CleanupTests(unittest.TestCase):
    def test_simple_number_normalization(self):
        result = HindiNumberNormalizer().normalize("मेरे पास पच्चीस रुपये हैं")
        self.assertEqual(result.normalized, "मेरे पास 25 रुपये हैं")

    def test_compound_number_normalization(self):
        result = HindiNumberNormalizer().normalize("मेरे पास तीन सौ चौवन रुपये हैं")
        self.assertEqual(result.normalized, "मेरे पास 354 रुपये हैं")

    def test_idiom_is_preserved(self):
        result = HindiNumberNormalizer().normalize("हमने दो-चार बातें कीं")
        self.assertEqual(result.normalized, "हमने दो-चार बातें कीं")

    def test_english_word_tagging(self):
        tagged = EnglishWordTagger().tag("मेरा इंटरव्यू बहुत अच्छा गया और मुझे जॉब मिल गई")
        self.assertEqual(tagged, "मेरा [EN]इंटरव्यू[/EN] बहुत अच्छा गया और मुझे [EN]जॉब[/EN] मिल गई")

    def test_roman_word_tagging(self):
        tagged = EnglishWordTagger().tag("ये problem solve नहीं हो रहा")
        self.assertEqual(tagged, "ये [EN]problem[/EN] [EN]solve[/EN] नहीं हो रहा")


if __name__ == "__main__":
    unittest.main()

