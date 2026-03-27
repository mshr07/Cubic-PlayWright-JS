import unittest

from asr_assignment.urls import infer_companion_urls, normalize_storage_url


class UrlTests(unittest.TestCase):
    def test_url_cleanup(self):
        broken = "https://storage.googleapis.com/upload\n_goai/967179/825780\n_\ntranscription.json"
        fixed = normalize_storage_url(broken)
        self.assertEqual(
            fixed,
            "https://storage.googleapis.com/upload_goai/967179/825780_transcription.json",
        )

    def test_companion_urls(self):
        inferred = infer_companion_urls("https://storage.googleapis.com/upload_goai/967179/825780_transcription.json")
        self.assertTrue(inferred["recording"].endswith("825780.wav"))
        self.assertTrue(inferred["metadata"].endswith("825780_metadata.json"))


if __name__ == "__main__":
    unittest.main()

