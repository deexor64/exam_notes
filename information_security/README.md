# Information Security — Exam Companion

A complete offline-friendly study site built from 13 uploaded course PDFs for CS32042 Information Security.

## Run locally

Open `index.html` in your browser. No dependencies, server, account, internet or build step needed.

## GitHub Pages

1. Create a GitHub repository.
2. Upload **index.html** to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, your main branch, and **/(root)**.
5. Save. GitHub Pages will publish the site under your repository URL.

## Features

- 13 chapters arranged by concept, not original slide order
- Search with Ctrl+K or /
- Dark/light mode; reading progress stored in the local browser
- Interactive Caesar, Euclidean algorithm/GCD, and toy RSA exercises
- 22-question practice quiz; five scenario questions and memory tables
- Mobile navigation and a print-friendly chapter view
- Modern corrections are explicitly marked; original lecture content is identified by slide/page source

## How to edit the site

`index.html` is fully self-contained. For easier editing, the optional `editable-source` folder contains markdown chapters, a stylesheet, JavaScript and a Python build script. Edit a chapter `.md` file and run `python build.py` after installing `markdown-it-py`. The new `index.html` will be generated in the editable-source folder.

## Source coverage

Module description; Introduction to Information Security; Human Aspects and Human Factors; Fundamentals of Cryptography; Properties of Arithmetic Operations; Symmetric Encryption; Public Key Encryption; Public Key Infrastructure; Hash Functions; Endpoint Threats; Information Security Risk Management; Organizational Security Management; Security Incident Response.

The module's outlined Server & Network Security lecture was not separately supplied. Other provided notes contain relevant network-security material.
