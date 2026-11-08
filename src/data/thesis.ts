// One place to record the thesis as it is documented. Anything not yet
// verified stays empty rather than being filled with a placeholder number:
// `results` empty renders the "documentation in progress" block.

export type ThesisResult = {
  model: string;
  /** Reported test accuracy, e.g. "94.12%". */
  accuracy: string;
  /** Optional macro-averaged F1, e.g. "0.938". */
  macroF1?: string;
  note?: string;
};

export type ThesisPhase = {
  title: string;
  body: string;
};

export const thesis = {
  title: "Corn Leaf Disease Detection Using Deep Learning",
  kind: "Undergraduate thesis",
  institution: "Daffodil International University",
  period: "2026",
  repo: "https://github.com/SaminSadaf22/diu-thesis",

  summary:
    "A controlled comparison of two convolutional backbones, DenseNet121 and EfficientNet-B0, for classifying corn leaf disease from images. The study was built around a question the accuracy headline usually hides: does an architecture comparison still hold once the split, the augmentation and the training budget are held fixed for both models?",

  /** What the comparison isolates — all verifiable from the study's premise. */
  variables: [
    {
      title: "DenseNet121",
      body: "A densely connected backbone, where each layer receives the feature maps of every earlier layer. Included for its strong performance on small, fine-grained image datasets.",
    },
    {
      title: "EfficientNet-B0",
      body: "A compound-scaled backbone that balances depth, width and resolution. Included as the more parameter-efficient alternative to test whether fewer parameters cost anything in accuracy.",
    },
    {
      title: "Transfer learning from ImageNet",
      body: "Both models start from ImageNet weights rather than random initialisation, which is the realistic setting when labelled agricultural imagery is scarce.",
    },
  ] as ThesisPhase[],

  /** Filled in from the final thesis document. Empty until then, on purpose. */
  results: [] as ThesisResult[],

  statusNote:
    "The dataset card, per-class metrics and the DenseNet121 / EfficientNet-B0 comparison table are published together with the thesis document, so the numbers here stay traceable to the report rather than being quoted from memory. The LaTeX source and figures live in the public repository.",

  limitations: [
    "Corn leaf disease is a narrow slice of agricultural vision: results here should not be read as evidence about field conditions, occlusion or other crops.",
    "A two-model comparison is a starting point, not a survey — the honest conclusion is about these two backbones under one fixed protocol.",
    "Reported accuracy is only meaningful alongside the split it was measured on, which is why the protocol is documented before the number.",
  ],
};
