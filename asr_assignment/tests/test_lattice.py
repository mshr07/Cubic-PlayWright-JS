import unittest

from asr_assignment.error_analysis import wer
from asr_assignment.lattice import build_lattice, lattice_wer


class LatticeTests(unittest.TestCase):
    def test_lattice_does_not_penalize_number_variant(self):
        reference = "उसने चौदह किताबें खरीदीं"
        outputs = [
            "उसने 14 किताबें खरीदीं",
            "उसने 14 किताबें खरीदीं",
            "उसने चौदह किताबें खरीदीं",
        ]
        lattice = build_lattice(reference, outputs, trust_agreement_threshold=2)
        rigid = wer(reference, "उसने 14 किताबें खरीदीं")
        relaxed = lattice_wer(lattice, "उसने 14 किताबें खरीदीं")
        self.assertLess(relaxed, rigid)

    def test_lattice_keeps_unrelated_errors(self):
        reference = "मुझे आज दिल्ली जाना है"
        outputs = [
            "मुझे आज दिल्ली जाना है",
            "मुझे आज दिल्ली जाना है",
            "मुझे आज मुंबई जाना है",
        ]
        lattice = build_lattice(reference, outputs, trust_agreement_threshold=2)
        rigid = wer(reference, "मुझे आज मुंबई जाना है")
        relaxed = lattice_wer(lattice, "मुझे आज मुंबई जाना है")
        self.assertEqual(relaxed, rigid)


if __name__ == "__main__":
    unittest.main()

