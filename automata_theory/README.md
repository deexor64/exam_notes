# Automata Atlas · CS32022

A local-first, self-contained course website built from 11 uploaded lecture decks on Automata Theory. Includes 11 guided lessons, expanded deduplicated page-level notes, 11 original PDFs, searchable content, a DFA parity simulator, practice questions, quick reference, focus mode, theme switching, and per-chapter completion tracking via localStorage.

## Open
Open `index.html` directly in a modern browser. The course data is included as a JavaScript file so no local server or internet connection is required. Optional web fonts may fall back to system fonts while offline.

For a local web server, run `python3 -m http.server 8000` inside the folder and open `http://localhost:8000`.

## Content provenance
Original slides: CS32022 Automata Theory, Thisara Watawana (2026). Source slide page numbers and PDFs are accessible within chapters. The rewritten concept guides and study tools are supplementary. Automated extraction of lecture slide text may lose positional details of graphics; inspect original PDFs for state diagrams, transition-table formatting, and formula typography. Certain slide claims are simplified or imprecise; the guided explanations clarify core definitions.

## Structure
- `index.html`, `styles.css`, `app.js` — interface and interactions
- `data/chapters.js`, `data/chapters.json` — structured curriculum and original slide text
- `assets/lecture-XX.pdf` — original course lecture files
