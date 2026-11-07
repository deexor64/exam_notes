# Exam revision and worked comparisons

> **Study route** · First understand definitions → then compare related concepts → then do a short worked calculation → finally answer a scenario question. The module document weights the end-semester exam at **70%** of the total module assessment.

## The most important comparisons

| A | B | One-line difference |
|---|---|---|
| **InfoSec** | Cybersecurity | All forms of information vs digital systems. |
| **Authentication** | Authorization | Who are you? vs What can you do? |
| **Threat** | Vulnerability | Potential danger vs weakness. |
| **Risk** | Impact | Possibility of harmful outcome vs amount of harm. |
| **Human error** | Violation | Accidental vs intentional rule-breaking. |
| **IDS / HIDS** | IPS / HIPS | Detect/alert vs attempt to stop. |
| **Symmetric** | Asymmetric | Shared key vs public/private pair. |
| **Encryption** | Hashing | Reversible with key vs one-way digest. |
| **Hash** | HMAC | Data digest vs keyed authentication tag. |
| **Encryption** | Digital signature | Keep message secret vs prove signed integrity/origin. |
| **Containment** | Eradication | Limit damage now vs remove cause. |
| **IR** | BC | Resolve security incident vs maintain operations. |
| **BC** | DR | Keep business running vs restore IT systems. |
| **Policy** | Procedure | Rule/expectation vs how to perform it. |

## Memorize these numbers and formulas

| Topic | Remember |
|---|---|
| **CIA** | Confidentiality, Integrity, Availability |
| **PPT** | People, Process, Technology |
| **Caesar** | `C = (P+k) mod 26` |
| **DES** | 64-bit block; 56 effective key bits; 8 parity bits |
| **3DES** | EDE; 3 × DES, legacy; 168 nominal key bits for three-key variant, ~112 effective strength |
| **AES** | 128-bit block; 128/192/256-bit keys; 10/12/14 rounds |
| **RSA** | `n=pq`, `φ(n)=(p−1)(q−1)`, `ed ≡ 1 mod φ(n)` |
| **RSA encrypt/decrypt** | `C=M^e mod n`, `M=C^d mod n` |
| **Hash** | MD5=128; SHA-1=160; SHA-256=256 bits |
| **Fermat** | `a^(p−1) ≡ 1 mod p` when p prime and `p∤a` |
| **Euler** | `a^φ(n) ≡ 1 mod n` when `gcd(a,n)=1` |
| **SANS IR** | Preparation → Identification → Containment → Eradication → Recovery → Lessons learned |
| **RACI** | Responsible, Accountable, Consulted, Informed |

> **Exam caution** · A few slides contain older or simplified statements. This site calls them out next to the relevant topic, especially **AES block length, 3DES, RC4, hash collisions, and NIST's older IR phases**. For an exam question that explicitly asks *what the lecture says*, be aware of the distinction.

## Active recall: test yourself

Select an answer, then check the explanation. Your score is saved only in this browser. Questions use the concepts and worked examples in the uploaded lectures.

<div id="quizRoot" class="quiz-root"></div>

## Five high-value scenarios

<details><summary>1. A university's exam portal is offline during results day. Which CIA goal is affected?</summary><p><strong>Availability.</strong> Authorized users cannot access the portal when needed. Resilience controls include tested backups, failover, monitoring and adequate capacity.</p></details>

<details><summary>2. A staff member unknowingly sends a sensitive file to the wrong email address. What type of insider issue?</summary><p><strong>Negligent / unintentional human error.</strong> It is not automatically a malicious insider. Good controls can include clear recipient warnings, permissions and awareness training.</p></details>

<details><summary>3. A hacker knows an RSA user's public exponent e and modulus n. Why is the private exponent not easy to recover?</summary><p>The private exponent d depends on number-theory information connected to the factors of n. For correctly generated, sufficiently large RSA keys, recovering that private information from public information is computationally difficult using known classical techniques.</p></details>

<details><summary>4. A file's downloaded SHA-256 matches a digest shown on the same compromised page. Is its origin proven?</summary><p><strong>No.</strong> The attacker may have replaced the file and hash together. A trusted digest, an HMAC or a verified signature is needed to support origin/integrity claims.</p></details>

<details><summary>5. An organization isolates an infected laptop, removes malware and restores it from backup. Which SANS steps happened?</summary><p><strong>Containment</strong> (isolate), <strong>eradication</strong> (remove malware/cause), then <strong>recovery</strong> (restore and verify). Preparation and later lessons learned also matter.</p></details>

## What your module expects

The course document (CS32042) lists learning outcomes covering **foundations**, **threats and controls**, **incidents and countermeasures**, **incident response**, **private/public-key cryptography**, and **confidentiality and data completeness**. It lists practical topics: **OpenSSL/Python encryption**, **Wireshark packet analysis**, and a **risk assessment exercise**.

**Coverage note:** the module syllabus names a separate **Server & Network Security** lecture. The supplied PDFs include endpoint/network controls, but do **not** include a dedicated lecture PDF for that topic. The website covers network-defense concepts present in the provided files rather than pretending a missing lecture was supplied.

**Source:** Module description, pages 2–5; all supplied lectures.
