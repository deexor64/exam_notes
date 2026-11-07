# Public-key cryptography, RSA and signatures

> **Core idea** · Public-key systems use **two mathematically related keys**. The public key can be shared; the private key stays secret. Different operations use the pair in different ways.

## Why asymmetric cryptography exists

In symmetric cryptography, two users must already share a secret. If the shared key leaks, anyone holding it can impersonate either party. Public-key cryptography helps solve **key distribution** and enables **digital signatures**.

| Operation | Who uses which key? | Why? |
|---|---|---|
| **Public-key encryption** | Sender encrypts using **recipient's public key**; recipient decrypts with **recipient's private key**. | Confidentiality to recipient. |
| **Digital signature** | Sender signs using **sender's private key**; verifier checks using **sender's public key**. | Authenticity and integrity. |
| **Key agreement / exchange** | Two parties combine public/private operations to establish a shared session key. | Efficient symmetric protection after setup. |

<div class="diagram-flow"><span>Alice's message</span><b>→</b><span>Bob's public key</span><b>→</b><span>Encrypted message</span><b>→</b><span>Bob's private key</span><b>→</b><span>Readable message</span></div>

**Common confusion:** signing is **not just encrypting with a private key**. Secure digital-signature schemes have specific signing and verification rules. Anyone with the public key should be able to verify, not secretly read confidential content.

**Source:** Public-key encryption, slides 2–8.

## One-way and trapdoor functions

A **one-way function** is easy to compute in the forward direction but hard to reverse. A **trapdoor one-way function** becomes easier to reverse if you know special hidden information (the *trapdoor*).

An analogy: multiply two huge primes to get a large integer (**easy**), then try to recover the prime factors from the product (**hard** for sufficiently well-chosen large numbers using known classical methods). Knowing the factors helps construct the RSA private key.

**A public-key system should make it practical** to create a key pair, encrypt/verify using the public key, and decrypt/sign with the private key, but impractical to recover private information from the public data.

**Source:** Public-key encryption, slides 9–12.

## RSA key generation — understand every symbol

RSA is named after **Rivest, Shamir and Adleman**. In a simplified textbook version:

<div class="step-stack"><div><em>1</em><span>Choose two **different primes** p and q.</span></div><div><em>2</em><span>Compute **n = p × q**.</span></div><div><em>3</em><span>Compute **φ(n) = (p − 1)(q − 1)**.</span></div><div><em>4</em><span>Choose public exponent **e** with **gcd(e,φ(n)) = 1**.</span></div><div><em>5</em><span>Find private exponent **d** such that **e × d ≡ 1 (mod φ(n))**.</span></div></div>

<div class="formula">Public key = (e, n) &emsp;&emsp; Private key = (d, n)</div>
<div class="formula">Encryption: C = M<sup>e</sup> mod n &emsp; Decryption: M = C<sup>d</sup> mod n</div>

**What is n?** The modulus: calculations wrap around at n. **What is e?** The public exponent. **What is d?** The matching private exponent. **What is φ(n)?** The number of positive integers less than n that are coprime with n.

> **Exam reminder** · A valid exponent **e does not need to be prime or larger than p and q**. The actual requirement here is `1 < e < φ(n)` and `gcd(e,φ(n)) = 1`. Choose an inverse d that makes the modular equation true.

**Source:** Public-key encryption, slides 19–21; arithmetic properties, slide 12.

## RSA worked example from the lecture

The notes choose **p = 11**, **q = 17**, and **e = 7**:

1. `n = 11 × 17 = 187`.
2. `φ(n) = 10 × 16 = 160`.
3. Check `gcd(7,160) = 1`.
4. Choose `d = 23`, because `7 × 23 = 161 ≡ 1 (mod 160)`.
5. Thus public key **(7,187)** and private key **(23,187)**.

Encrypt the lecture message `M = 88`:

<div class="formula">C = 88<sup>7</sup> mod 187 = <strong>11</strong></div>

One way to avoid enormous numbers is **repeated squaring**: `88² mod 187 = 77`, `88⁴ mod 187 = 132`, and `88⁷ = 88⁴ × 88² × 88`, so `88⁷ mod 187 = (132 × 77 × 88) mod 187 = 11`. Decrypting `11²³ mod 187` returns **88**.

<div class="tool-panel"><div class="tool-head"><strong>Small RSA calculator</strong><span class="badge">Textbook mathematics</span></div><div class="input-row"><label>Prime p <input id="rsaP" type="number" value="11" min="2" max="500"></label><label>Prime q <input id="rsaQ" type="number" value="17" min="2" max="500"></label><label>Public e <input id="rsaE" type="number" value="7" min="2" max="10000"></label><label>Message M <input id="rsaM" type="number" value="88" min="0" max="999999"></label></div><button id="rsaRun" type="button" class="tool-button">Calculate key pair and encrypt</button><pre class="tool-result" id="rsaResult"></pre><small>Uses intentionally tiny numbers for understanding. It is not secure or production RSA. Real RSA encryption requires safe padding such as OAEP.</small></div>

**Source:** Public-key encryption, slides 21–24.

## Merkle–Hellman knapsack (historical)

The lecture introduces a public-key idea based on **subset sums**. Given numbers `1, 6, 8, 15, 24` and a bit vector `11110`, choose numbers whose bits are 1: `1 + 6 + 8 + 15 = 30`. In general:

<div class="formula">Target sum T = b₁w₁ + b₂w₂ + ... + bₙwₙ &emsp; where each bᵢ ∈ {0,1}</div>

The **knapsack optimization problem** in general asks for a best selection under a limit, while the **subset-sum version** asks which numbers make a particular total. Merkle–Hellman uses a specially structured easy-to-solve private sequence, transformed into a public harder-looking one. The original scheme was broken and is **historical**, not recommended modern cryptography.

**Source:** Public-key encryption, slides 13–17.

## Elliptic curve cryptography (ECC)

ECC builds public-key systems from mathematical operations on points of a special curve. A common equation shape is:

<div class="formula">y² = x³ + ax + b</div>

In cryptography these calculations are usually performed over a **finite field**, not ordinary floating-point graph coordinates. The difficult problem is recovering a secret scalar from the public point created by repeating a point operation.

**Why study ECC?** It can provide comparable security to classical RSA with much smaller keys, useful for mobile devices and networks. Common uses include **ECDH** for key agreement and **ECDSA/EdDSA** for signatures. ECC is not simply "encrypt and decrypt faster" in every use case; performance depends on the operation and implementation.

**Source:** Public-key encryption, slides 29–31. Finite-field details are extra explanation.

## Digital signatures: sign vs verify

<div class="diagram-flow"><span>Message</span><b>→</b><span>Hash</span><b>→</b><span>Sign with private key</span><b>→</b><span>Signature</span></div>

A verifier calculates the message digest and checks the **signature with the signer's public key**. If verification succeeds, the message matches the signature and the signing key was used (subject to the key and algorithm being trustworthy).

**Digital signatures are different from encryption:** signatures usually **do not hide** the message. They mainly provide integrity and authentication evidence. Certificates/PKI connect public keys to identities.

**Source:** Public-key encryption, slides 6–8 and 28; PKI lecture.

## Quantum cryptography — scope of the lecture

The slides introduce using **quantum properties of photons** to support secure key distribution. A common example is **quantum key distribution (QKD)**, where measurement can disturb transmitted quantum states and help detect eavesdropping under the protocol assumptions.

> **Extra clarification** · Quantum cryptography is **not automatically hack-proof**. QKD has practical device, authentication and implementation limitations. It is different from **post-quantum cryptography**, which uses mathematical algorithms designed to resist attacks by quantum computers on ordinary classical devices.

**Source:** Public-key encryption, slides 32–34.
