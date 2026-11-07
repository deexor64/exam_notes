# Security foundations

> **Core idea** · Information security protects valuable information, regardless of whether it is stored on a computer, written on paper, or spoken aloud. Cybersecurity focuses on the digital part of that problem.

## What are we protecting?

**Information security (InfoSec)** is the practice of protecting information and information systems from unauthorized access, disclosure, change, destruction, or disruption throughout their life cycle. It includes **information, hardware, software, networks, processes, people, and facilities**. A good security program combines technology with policies, procedures, training, and risk management.

| Information security | Cybersecurity |
|---|---|
| Protects **all forms** of information: digital, paper, verbal, physical records. | Protects **digital systems**, networks, devices, applications, and data against cyber threats. |
| Example: locking a filing cabinet containing medical records. | Example: securing the database holding those records. |

**Why does it matter?** It helps protect sensitive data, stop unauthorized access, keep services running, meet legal requirements, reduce financial damage, and maintain trust. Common targets include banking information, medical records, research data, student results, and government databases.

**Source:** Introduction, slides 2–6.

## The CIA triad

<div class="triad-wrap"><svg viewBox="0 0 640 275" role="img" aria-label="Confidentiality, Integrity and Availability form the CIA triad"><path d="M320 36L102 232h436Z" fill="none" stroke="currentColor" stroke-width="2" opacity=".25"/><circle cx="320" cy="43" r="41" fill="#6572e8"/><circle cx="108" cy="226" r="41" fill="#20b8a7"/><circle cx="530" cy="226" r="41" fill="#f0aa60"/><text x="320" y="49" text-anchor="middle" fill="white" font-size="18" font-weight="700">C</text><text x="108" y="232" text-anchor="middle" fill="white" font-size="18" font-weight="700">I</text><text x="530" y="232" text-anchor="middle" fill="white" font-size="18" font-weight="700">A</text><text x="320" y="150" fill="currentColor" font-size="20" font-weight="700" text-anchor="middle">Information</text><text x="320" y="173" fill="currentColor" font-size="13" text-anchor="middle">Security</text><text x="320" y="106" fill="currentColor" font-size="13" text-anchor="middle">Confidentiality</text><text x="108" y="170" fill="currentColor" font-size="13" text-anchor="middle">Integrity</text><text x="530" y="170" fill="currentColor" font-size="13" text-anchor="middle">Availability</text></svg></div>

| Goal | Simple meaning | Example | Typical controls |
|---|---|---|---|
| **Confidentiality** | Only authorized people can see information. | Only the correct student can see their exam results. | Access control, encryption, MFA. |
| **Integrity** | Information stays correct and complete; unauthorized changes can be detected or stopped. | Grades cannot be secretly changed. | Hashes, digital signatures, permissions, audit trails. |
| **Availability** | Authorized users can reach services when needed. | The LMS works during an exam. | Backups, redundancy, UPS, disaster recovery. |

> **Don't mix these up** · Encrypting a file primarily provides **confidentiality**. A plain hash can help check **integrity**, but only when you have a trustworthy expected hash. Keeping a backup primarily helps **availability** and recovery. A single control can help several goals.

**Source:** Introduction, slides 7–9.

## Security goals beyond CIA

| Goal | What question does it answer? | Example |
|---|---|---|
| **Authentication** | *Who are you?* | Checking a password or passkey. |
| **Authorization** | *What may you do?* | Student can view grades; lecturer can edit them. |
| **Accountability** | *Who did what?* | Audit log shows who changed a record. |
| **Non-repudiation** | *Can there be convincing proof of an action's origin?* | A valid digital signature helps show a message was signed by a specific key. |
| **Privacy** | *How may personal information be collected and used?* | Only using student data for an agreed purpose. |

**Authentication is not authorization.** Logging in identifies an account; the system must still check whether that account has permission for a particular action. **Accountability is not the same as non-repudiation**: a log supports investigation, but may be editable; a digital signature provides stronger cryptographic evidence of origin and integrity when keys and identities are properly managed.

> **Extra explanation** · A digital signature does **not** prove by itself that a particular human physically clicked a button. It proves that a signature matches a cryptographic key. Identity checks, key protection, and procedures are still necessary.

**Source:** Introduction, slides 10–15.

## Security vocabulary — follow the chain

<div class="diagram-flow"><span>Asset</span><b>→</b><span>Threat</span><b>+</b><span>Vulnerability</span><b>→</b><span>Risk</span><b>→</b><span>Possible loss</span></div>

| Term | Meaning | Example |
|---|---|---|
| **Asset** | Anything of value worth protecting. | Student database, laptop, paper file. |
| **Subject** | An active entity requesting access. | A user, process, or app. |
| **Object** | The resource being accessed. | A file, database table, device. |
| **Access** | Ability to read, use, change, or manage a resource. | Viewing a document. |
| **Threat** | Something that could cause harm. | A criminal trying to steal records. |
| **Vulnerability** | A weakness that may be exploited. | Weak password, unpatched server. |
| **Exploit** | A method that uses a vulnerability. | A malicious request abusing a software flaw. |
| **Exposure** | A situation where an asset is reachable or at risk. | Unprotected database visible online. |
| **Attack** | An attempt to compromise CIA. | Malware infection. |
| **Control / safeguard** | A measure that reduces risk. | MFA, firewall, backups. |
| **Risk** | The possibility of loss due to uncertainty and harmful events. | Unauthorized access to the database. |
| **Loss / impact** | Harm that occurs when a bad event happens. | Costs, downtime, stolen data. |

**Scenario:** A **customer database (asset)** is available on the internet (**exposure**). Its admin account has a weak password (**vulnerability**). Someone attempts account takeover (**threat/attack**). The **risk** is a breach; **loss** could include leaked records and costs. **MFA, stronger credentials, and access rules** are safeguards.

> **Exam distinction** · A threat is *potential danger*. A vulnerability is *a weakness*. Risk is *the possibility of harm when danger meets a weakness*. An attack is an actual attempt; an exploit is how a weakness is used.

**Source:** Introduction, slides 16–23.

## Common threats and incidents

**Malware** is malicious software. **Phishing** uses deceptive messages or sites to trick people. **Social engineering** is broader manipulation of human behavior. **Insider threats** come from trusted accounts or people. **Ransomware** typically blocks access to data or systems and demands payment. **Denial of service (DoS)** disrupts service availability. A **data breach** exposes information to unauthorized parties.

The lecture uses **WannaCry (2017)** and the **Colonial Pipeline ransomware incident (2021)** as real-world examples. Think of them as illustrations of the combined impact on systems, business continuity, and public services.

**Source:** Introduction, slides 25–28.
