# Cryptography basics and classical ciphers

> **Core idea** · Cryptography uses algorithms and keys to protect information. Good algorithms should stay secure even when the attacker knows how the algorithm works.

## Cryptography terms and goals

**Cryptography** constructs methods to protect information. **Cryptanalysis** studies ways to defeat or analyze those protections. **Cryptology** includes both.

| Term | Meaning |
|---|---|
| **Plaintext (P)** | Original readable message. |
| **Ciphertext (C)** | Encrypted result. |
| **Cipher** | Algorithm for converting plaintext to ciphertext. |
| **Encryption / enciphering** | Transforming plaintext with a key. |
| **Decryption / deciphering** | Recovering plaintext with the correct key. |
| **Key (K)** | Input that controls the cryptographic transformation. |

<div class="diagram-flow"><span>Plaintext</span><b>→</b><span>Encrypt + key</span><b>→</b><span>Ciphertext</span><b>→</b><span>Decrypt + key</span><b>→</b><span>Plaintext</span></div>

**Possible cryptographic goals:** confidentiality (secrecy), integrity (detect changes), authenticity (check origin), and non-repudiation (strong evidence of a signed action). **Encryption alone** does not automatically provide all four goals.

**Kerckhoffs' principle:** a cryptosystem should remain secure when its design is public; secrecy belongs in the **key**, not in an undocumented algorithm. This is why widely reviewed algorithms such as AES can be public.

**Source:** Cryptography fundamentals, slides 2–13.

## History and two classic transformations

The lecture mentions ancient Egyptian non-standard hieroglyphs, **Caesar's cipher**, alphabet-pair substitution described in the **Kama Sutra**, **Enigma** during World War II and work at Bletchley Park, the 1976 Diffie–Hellman public-key concept, published RSA work in 1977, and the selection of **Rijndael** as AES in 2000.

- **Substitution** replaces a symbol with another symbol. Example: `A → D`.
- **Transposition** changes **positions** of symbols without changing which symbols they are.
- **Steganography** hides the *existence* of a message, while encryption hides its *meaning*.

> **Memory trick** · **Substitution: change the letters. Transposition: move the letters.** Both can be combined in more complex ciphers.

**Source:** Cryptography fundamentals, slides 5, 14–16, 35.

## Caesar cipher — worked example

Each English letter is assigned a number from 0 to 25: `A=0, B=1, ..., Z=25`. Shift each letter by a fixed key **k**.

<div class="formula">E<sub>k</sub>(x) = (x + k) mod 26 &emsp; D<sub>k</sub>(y) = (y − k) mod 26</div>

With **k = 3**, `A → D`, `B → E` and `Z → C` (wrap around after Z). **HELLO → KHOOR**.

<div class="tool-panel"><div class="tool-head"><strong>Try the Caesar cipher</strong><span class="badge">Interactive example</span></div><label for="caesarInput">Message</label><input id="caesarInput" value="HELLO WORLD" maxlength="120" /><label for="caesarShift">Shift <output id="shiftOut">3</output></label><input id="caesarShift" type="range" min="0" max="25" value="3" /><div class="result-card" id="caesarOutput">KHOOR ZRUOG</div><small>This is a learning toy. Caesar cipher is **not secure** for real data.</small></div>

**Why weak?** There are only 26 possible shifts, so trying them all is easy. Letter-frequency patterns also remain visible.

**Source:** Cryptography fundamentals, slides 17, 20.

## Kama Sutra, monoalphabetic and polyalphabetic substitution

The **Kama Sutra alphabet-pair cipher** in the slides arranges a shuffled alphabet as two equal rows of 13 letters. Replace a character with the one in the **same column, opposite row**. Because the pairs swap both ways, the same operation reverses it. It is a **monoalphabetic substitution**: each letter always maps to the same partner.

A **monoalphabetic cipher** always uses one substitution alphabet. Attackers may use frequency analysis because repeated letters and characteristic frequencies remain visible.

A **polyalphabetic cipher** switches between multiple substitution alphabets. In a **Vigenère cipher**, a keyword chooses a shift for each position. For example, using the repeating key `KEY`, letters use shifts K=10, E=4, Y=24, then K again. It hides single-letter frequencies better than a fixed substitution but is not modern secure encryption.

The lecture also has an odd/even-position example: use one substitution table for odd character positions and a different table for even positions. The principle is **the position selects the alphabet**.

> **Slide caution** · The printed odd/even example appears to have duplicated outputs in its substitution rows, so it is not a clean one-to-one substitution alphabet. Learn the **two-alphabet method**, not a possibly misprinted mapping.

**Source:** Cryptography fundamentals, slides 18–24.

## Columnar transposition

Write a message in a grid of a chosen width; then read down columns instead of across rows. Example with width 4 and text `ATTACKATDAWN`:

<div class="mono-grid">A T T A<br>C K A T<br>D A W N</div>

Reading downward, left to right: `ACD TKA TAW ATN` (spaces shown only to separate columns). The symbols are unchanged; only their order has moved. A proper columnar transposition may use a keyword to reorder columns.

**Source:** Cryptography fundamentals, slide 25.

## One-time pad (OTP) / Vernam cipher

In a **one-time pad**, a truly random secret key is as long as the message, used only once, and kept secret. For binary data:

<div class="formula">C = P ⊕ K &emsp;&emsp; P = C ⊕ K</div>

`⊕` means **XOR**. Example: `1011 ⊕ 1100 = 0111`, and `0111 ⊕ 1100 = 1011`. For alphabetic examples, addition modulo 26 can be used instead.

**Why is it special?** Under the strict conditions (uniform truly random key, same length as data, secret, never reused), it provides **perfect secrecy**. But distributing, storing and protecting huge secret keys is hard. A key repeated across messages breaks this guarantee.

**True randomness** comes from physical entropy sources; a **pseudorandom generator** uses a deterministic algorithm and a seed. Cryptographically secure pseudorandom generators can be unpredictable in practice, but their output is not a mathematical one-time pad unless the key meets the one-time-pad requirements.

**Source:** Cryptography fundamentals, slides 26–30.

## Block ciphers, stream ciphers and modes

| Block cipher | Stream cipher |
|---|---|
| Processes fixed-size blocks (for example, AES uses 128-bit blocks). | Produces a keystream and combines it with data. |
| Examples: AES, DES, 3DES, Blowfish, IDEA. | Examples from notes: RC4, SEAL; modern example: ChaCha20. |
| Needs a mode to encrypt messages longer than one block. | Keystream/nonce reuse can be extremely dangerous. |

**Modes listed in your slides:**

| Mode | Idea | Important catch |
|---|---|---|
| **ECB** | Encrypt each block independently. | Repeated plaintext blocks can reveal patterns. |
| **CBC** | Mix each block with previous ciphertext; start with an IV. | Needs suitable padding and separate integrity protection. |
| **CFB** | Use block cipher output to process stream-like data. | Proper IV handling matters. |
| **OFB** | Generate a keystream using repeated encryption. | Never repeat the keystream with the same key. |
| **CTR** | Encrypt changing counters to generate a keystream. | Never repeat the same nonce/counter under a key. |

**Modern extension:** **AES-GCM** is an authenticated-encryption mode. It can protect both confidentiality and integrity/authenticity of a message when used correctly. Plain ECB/CBC alone do not automatically authenticate the data.

**Source:** Cryptography fundamentals, slides 31–34. The AES-GCM explanation is extra context.
