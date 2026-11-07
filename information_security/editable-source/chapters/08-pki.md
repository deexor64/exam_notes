# Public Key Infrastructure (PKI)

> **Core idea** · A public key is useful only if you know **whose key it is**. PKI uses certificates and trusted authorities to bind identities to public keys.

## What PKI provides

**Public Key Infrastructure (PKI)** is the set of services, roles, policies, certificates, keys, and procedures used to manage public-key trust at scale. The slides list these functions: **create**, **issue/distribute**, **sign**, **validate**, and **revoke** digital certificates.

| Component | Job |
|---|---|
| **Public/private key pair** | Enables public-key encryption or signatures. |
| **Digital certificate** | Links an identity or name to a public key. |
| **Certificate Authority (CA)** | Signs certificates after the required verification. |
| **Trust store / root CA** | A set of trusted root certificates held by a browser or operating system. |
| **Certificate status** | Indicates expiration or whether a certificate was revoked. |

**Source:** PKI, slides 2–3, 6–10.

## Certificate contents and trust chain

A typical certificate can include **subject/hostname**, **issuer/CA**, **serial number**, **public key**, **validity dates**, **allowed key usages**, **signature algorithm** and **CA signature**. Today's web certificates commonly follow the **X.509** format.

<div class="trust-tree"><div class="trust-root">Trusted root CA</div><div class="trust-line"></div><div class="trust-mid">Intermediate CA</div><div class="trust-line"></div><div class="trust-leaf">Website certificate · example.org</div></div>

**How trust works:** the website shows its certificate and usually intermediate certificates. The browser verifies signatures, checks the hostname and dates, considers revocation/status as applicable, and links the chain to a root it already trusts. The **CA's private key** signs the certificate; the CA's **public key** verifies it.

> **Tricky point** · A certificate is **not a private key**. It contains a **public key**, claims about the subject, and a CA signature. The website must separately protect the matching private key.

**Source:** PKI, slides 8–10.

## PKI topologies

| Topology | Structure | Trade-off |
|---|---|---|
| **Single-root** | One root CA issues directly or anchors trust. | Simple, root is very important. |
| **Hierarchical** | Root CA signs subordinate/intermediate CAs; they sign leaf certificates. | Delegation and scalability. |
| **Cross-certified** | Different CAs create a trust link by certifying each other. | Trust can connect independent hierarchies, but is more complex. |

**Single-root**, **cross-certified**, and **hierarchical** topologies are shown in the lecture diagram (PKI slide 4).

**Source:** PKI, slide 4.

## Certificate lifecycle and revocation

<div class="diagram-flow"><span>Generate keys</span><b>→</b><span>Request + verify identity</span><b>→</b><span>CA signs certificate</span><b>→</b><span>Use / validate</span><b>→</b><span>Renew or revoke</span></div>

**Revocation** means declaring a previously issued certificate no longer trusted before its normal expiry, for example if the private key is stolen. You may encounter **CRLs** (Certificate Revocation Lists) and **OCSP** (Online Certificate Status Protocol) in wider PKI discussions.

**TLS vs SSL:** the lecture uses the older term SSL. Modern web secure connections use **TLS**. A certificate helps authenticate the endpoint, while TLS negotiates keys and protects traffic.

**Source:** PKI, slides 2, 6, 12. CRL/OCSP and TLS terminology are extra context.

## Advantages, limitations and legacy certificate classes

**Advantages:** standardized technology, scalable trust delegation, choice of trust provider, and the ability to authenticate to a server without having a pre-established shared secret with it. A CA does **not** have to participate in every completed TLS connection.

**Limitations:** certificate/key handling can fail, a trusted CA can make mistakes, names and trust stores need checking, and expired or revoked certificates can interrupt service.

**Legacy detail from the slides:** PKI slide 11 lists certificate "classes" 0–5, ranging from test certificates to higher-assurance business/government uses. **These classes are a historical classification, not a universal classification of modern browser TLS certificates.** For current web certificates, focus on issuer validation and certificate policy rather than assuming class numbers are universal.

**Source:** PKI, slides 7, 11–12.
