# Symmetric encryption algorithms

> **Core idea** · Symmetric encryption uses **the same shared secret key** for encryption and decryption. It is efficient for large amounts of data, but safely sharing and managing keys is a major challenge.

## How symmetric encryption works

<div class="diagram-flow"><span>Plaintext X</span><b>+</b><span>Secret key K</span><b>→</b><span>E<sub>K</sub>(X) = Y</span><b>→</b><span>D<sub>K</sub>(Y) = X</span></div>

The lecture calls it **secret-key** or sometimes **private-key** cryptography. Be careful: "private key" is also the name of one half of an **asymmetric** key pair. **Shared secret key** is clearer here.

**Two basic requirements:** use a strong algorithm and keep the key secret from outsiders. The algorithm may be publicly known (Kerckhoffs' principle).

| Strengths | Challenges |
|---|---|
| Fast and efficient for bulk data. | Secret key must reach both parties securely. |
| Long secure keys resist brute force. | Many communicating groups need careful key management. |
| Works well for file/storage/stream protection. | Shared keys do not provide strong individual non-repudiation. |

> **Important nuance** · The slides say symmetric encryption only provides confidentiality. **Encryption alone** generally does; however, symmetric-key **MACs and authenticated encryption** can also provide integrity and shared-key authentication. They still cannot establish individual non-repudiation between two parties that share the same secret.

**Source:** Symmetric encryption, slides 2–4.

## DES — Data Encryption Standard

**DES** is a symmetric **64-bit block cipher**. It uses a 64-bit key representation, but **8 bits are parity bits**, leaving **56 effective key bits**. It uses multiple rounds of substitutions and permutations.

Why is DES no longer suitable? Its 56-bit key is short enough for brute-force search using specialized hardware. The lecture also discusses a restricted 40-bit-security variant with known key bits, which is weaker still. DES is important historically, **not** a good new-system choice.

**CBC** is the chaining mode mentioned in the slides: encryption of a block depends on the previous ciphertext block and an initial IV. CBC does not by itself prevent malicious modification, so modern use requires correct integrity protection.

**Source:** Symmetric encryption, slides 5–8.

## Triple DES / 3DES / TDEA

**3DES** applies DES three times to each block. Common **EDE** construction:

<div class="diagram-flow"><span>Plaintext</span><b>→</b><span>DES encrypt K₁</span><b>→</b><span>DES decrypt K₂</span><b>→</b><span>DES encrypt K₃</span><b>→</b><span>Ciphertext</span></div>

Three independent 56-bit key components give **168 bits of nominal key material**, but the effective general attack security is around **112 bits**, not 168. With **K₁ = K₃** (two-key 3DES), the key material is 112 bits and effective security is lower than the three-key form. EDE also supports backward compatibility with single DES when all three keys match.

> **Modern correction** · The lecture describes 3DES as trustworthy and describes 168-bit "effective" strength. NIST withdrew its TDEA specification on **1 January 2024**, and new encryption with 3DES is not NIST-approved. Learn EDE for the **exam**, but choose modern authenticated encryption for new applications. <a href="https://csrc.nist.gov/pubs/sp/800/67/r2/final" target="_blank" rel="noopener">NIST TDEA status ↗</a>

**Source:** Symmetric encryption, slides 9–11.

## AES — Advanced Encryption Standard

**AES** was selected from the **Rijndael** family after a public competition to replace DES. It was developed by **Joan Daemen** and **Vincent Rijmen**. AES repeatedly transforms a 128-bit block using a key and several rounds.

| Algorithm | Key length | Block length | Rounds |
|---|---:|---:|---:|
| AES-128 | 128 bits | 128 bits | 10 |
| AES-192 | 192 bits | 128 bits | 12 |
| AES-256 | 256 bits | 128 bits | 14 |

**Why AES replaced DES/3DES:** much larger keys, efficient software and hardware implementations, and good performance for data at rest and in transit. AES alone is a **block primitive**; a secure application also needs the correct **mode**, key handling, and nonce/IV rules. AES-GCM is a common authenticated mode.

> **Slide correction** · The slides say AES can have 128/192/256-bit **blocks**. That describes the broader Rijndael design, **not the AES standard**. **All standardized AES variants have 128-bit blocks.** <a href="https://www.nist.gov/publications/advanced-encryption-standard-aes-0" target="_blank" rel="noopener">NIST FIPS 197 (2023 update) ↗</a>

**Source:** Symmetric encryption, slides 12–16.

## SEAL and RC families

The lecture includes older algorithms mainly for comparison and history:

| Algorithm | Class | Lecture fact | Current study note |
|---|---|---|---|
| **SEAL** | Stream cipher | Rogaway and Coppersmith, 1993; 160-bit key. | Historical algorithm; learn type and purpose. |
| **RC2** | Block cipher | Variable key size; DES alternative. | Legacy. |
| **RC4** | Stream cipher | Variable key; formerly used in WEP and SSL/TLS. | **Insecure for modern use**; biases and practical weaknesses. |
| **RC5** | Block cipher | Variable block and key sizes. | Historical design. |
| **RC6** | Block cipher | Built on RC5; finalist in AES competition. | Study as an AES finalist, not AES itself. |

**RC** refers to a family associated with **Ron Rivest**. The name doesn't tell you whether the algorithm is a block or stream cipher: RC4 is a stream cipher, while RC2, RC5 and RC6 are block ciphers.

> **Exam table to memorize** · DES = **64-bit block / 56-bit effective key**. AES = **128-bit block / 128, 192 or 256-bit key**. 3DES = **DES three times, EDE**, slower and legacy. RC4 = **legacy stream cipher**.

**Source:** Symmetric encryption, slides 17–22.
