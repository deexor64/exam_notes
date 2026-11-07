# Cryptographic hashes and HMAC

> **Core idea** · Hashing compresses an arbitrarily long input into a fixed-size digest. It helps detect changes, but **a plain hash cannot by itself prove who sent a message**.

## Hashing is not encryption

A hash function maps data `x` to a fixed-length value `h`:

<div class="formula">h = H(x)</div>

<div class="diagram-flow"><span>Document / message</span><b>→</b><span>Cryptographic hash</span><b>→</b><span>Fixed-size digest</span></div>

**Unlike encryption**, hashing has no decryption key and no intended inverse operation. Two files of completely different length can both produce 256-bit SHA-256 digests. A **digest** is also called a hash value or digital fingerprint.

**Source:** Hash functions, slides 2–4, 7–8.

## What makes a good cryptographic hash?

| Property | Meaning |
|---|---|
| **Deterministic** | Same input always gives the same output. |
| **Fixed-size output** | Digest length is fixed for a selected algorithm. |
| **Preimage resistance** | Given digest h, it is hard to find an input x with H(x)=h. |
| **Second-preimage resistance** | Given one input x, hard to find a different y with the same digest. |
| **Collision resistance** | Hard to find **any two** different inputs with the same digest. |
| **Avalanche effect** | Small input changes usually produce very different outputs. |

> **Important mathematical correction** · Two different inputs **can** have the same hash. In fact, collisions must exist because infinitely many possible inputs map to finitely many digest values. Good cryptographic hashes make it **computationally hard to find collisions**; they cannot make collisions impossible.

**Hash vs checksum:** simple checksums and CRCs detect many accidental errors, but attackers can deliberately create matching checksums. Cryptographic hashes are designed to resist adversarial manipulation.

**Source:** Hash functions, slides 5–7. Collision distinction is added clarification.

## MD5, SHA-1 and SHA-2

| Function | Output size | Security status for new designs |
|---|---:|---|
| **MD5** | 128 bits | Broken for collision resistance; legacy only. |
| **SHA-1** | 160 bits | Collision attacks demonstrated; legacy. |
| **SHA-224** | 224 bits | Member of SHA-2 family. |
| **SHA-256** | 256 bits | Widely used SHA-2 variant. |
| **SHA-384** | 384 bits | SHA-2 variant. |
| **SHA-512** | 512 bits | SHA-2 variant. |

**Why stronger than a basic checksum?** A deliberately altered message can often be designed to keep a simple checksum unchanged. Cryptographic hashes are built to make such targeted matching difficult.

**Birthday effect:** for an ideal n-bit hash, a collision can typically be found with about **2<sup>n/2</sup>** trials, not 2<sup>n</sup>. For SHA-256, that's roughly 2<sup>128</sup> work for generic collisions. This explains why output length matters.

**Source:** Hash functions, slides 9–12. Birthday reasoning is extra explanation.

## What plain hashing does and does not prove

Suppose someone publishes a file and a SHA-256 digest on the **same attacker-controlled site**. An attacker could replace **both** file and digest. A matching digest then does not prove the file came from the claimed owner.

A hash is useful when the *expected* digest is obtained from a **trusted source**. For authenticating a sender, use a **MAC** or a **digital signature**.

**Source:** Hash functions, slides 2–7, 13–14. Trust interpretation is extra explanation.

## HMAC — keyed message authentication code

**HMAC** combines a cryptographic hash with a secret key and message. Only someone holding that secret can calculate the correct tag for a new message, assuming a secure scheme and protected key.

<div class="diagram-flow"><span>Message + shared secret</span><b>→</b><span>HMAC algorithm</span><b>→</b><span>Authentication tag</span></div>

| Mechanism | Integrity | Sender authentication | Secrecy |
|---|---|---|---|
| **Plain hash** | Detects differences **if trusted expected hash exists** | No | No |
| **HMAC** | Yes, when verified correctly | **Shared-key** authentication | No |
| **Digital signature** | Yes, when verified correctly | Public-key signature authentication | No |
| **Authenticated encryption** | Yes | Key-holder authentication | **Yes** |

**HMAC vs signature:** HMAC uses a **shared secret**; either party could create the same tag. A digital signature uses a **private signing key** and can be checked using the corresponding public key.

> **Practical detail** · For passwords, use a **purpose-built password hashing/KDF scheme** such as Argon2id, scrypt, or bcrypt with salts and appropriate settings. Fast SHA-256 alone is not a good password-storage design.

**Source:** Hash functions, slides 13–14; password storage detail is extra context.
