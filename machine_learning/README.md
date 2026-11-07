# Machine Learning Atlas

A self-contained, interactive study website built around the provided machine-learning lectures, supplementary workflow note, lab sheet, and three tutorials.

## Fastest way to open

Use **Machine_Learning_Atlas.html** (supplied separately). It is a standalone file with all CSS, JavaScript, and written content embedded. Open it directly in a modern browser. No server, package installation, API key, internet connection, or login is required.

## Edit and develop the website

This folder contains:

- `index.html` — semantic HTML entry point and layout.
- `styles.css` — responsive layout, light/dark themes, typography, cards and teaching widgets.
- `content.js` — the chapter curriculum, detailed lessons, original source-page references, and practice questions.
- `visuals.js` — 100 original diagram and graph generators, matched to the 42 lessons and rendered as resolution-independent inline SVG.
- `app.js` — routing, reading mode, progress, bookmarks, search, scratchpad, tests, and interactive demos.

Open `index.html` directly. You can also preview with:

```bash
cd ml-study-atlas
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. To deploy it, upload these five files to any **static** site host (for example, a GitHub Pages repository). No compilation step is needed.

## What's included

- 42 topic-focused lessons in 8 modules
- **100 section-embedded explanatory diagrams and charts covering all 42 lessons**, with concise captions; tap “Expand” to see a larger version.
- Diagrams cover the real numerical tutorial examples when applicable; illustrative curves and probabilities are labeled.
- 37 self-check exercises with explanatory feedback
- Interactive demos: ML pipeline, fit patterns, precision/recall calculator, vector distances, linear regression fit, gradient descent, k-NN, SVM margin, neuron, activation functions, MLP network, pixel channels, convolution filter, convolution output shapes, and k-means
- Search with `/` or `Ctrl+K` / `Cmd+K`
- Progress marking, bookmarks, dark mode, a per-lesson scratchpad, and `.txt` note export
- A source library preserving the original document filenames and page-level references
- A separate label for explanatory elaboration, technical clarifications, and exam-focused advice

## Study and source fidelity

The notes are restructured for learning rather than reproduced slide-by-slide. The website paraphrases the uploaded lectures while preserving the formulas, method comparisons, examples, and numerical exercises. Redundant transitions and slide decorations are omitted. Source citations display *the PDF page number*, not a presentation's printed slide number if those differ.

The website does **not** embed copies of the original copyrighted PDFs; it identifies their titles and the relevant page ranges. Keep your originals alongside your studies when you want to check a slide's exact wording or image.

Some slide text is incomplete or ambiguous. Specific reconciliation notes are clearly marked **Clarification** (for example, the SVM C parameter convention and the metric used by the clustering worksheet). Independently written explanatory material is flagged **Explain** where it deepens or reconciles lecture content. These are editorial additions, not claims of direct quotation.

## Saving your progress

Progress, bookmarks, theme settings, and scratchpad notes are saved using the browser's `localStorage` when it is available. They stay on the device/browser profile where you study; they are not synced across devices. Clearing browser site data or using private browsing may remove them. Export important notes using the `Export as .txt` button in each lesson.

## Offline and privacy

The visualizations are generated locally with SVG; no diagram libraries or network requests are necessary. The site has no external frameworks, font dependencies, analytics, backend, network fetches or login. The website doesn't transmit notes to any server. If you choose to host it online, the host itself may have its own logging policies.
