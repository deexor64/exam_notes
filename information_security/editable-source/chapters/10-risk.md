# Information security risk management

> **Core idea** · You cannot remove every risk. Risk management helps a team decide **what matters most**, **what might go wrong**, and **which actions are worth taking**.

## Threat, vulnerability, consequence and risk

The lecture offers this simplified model:

<div class="formula">Risk ≈ Threat × Vulnerability × Consequence</div>

- **Threat**: possible source of harm, such as a criminal targeting accounts.
- **Vulnerability**: weakness that could allow harm, such as weak passwords.
- **Consequence / impact**: harm if it happens, such as downtime or data exposure.
- **Risk**: possibility and significance of that harmful outcome.

> **Formula explanation** · The slide's multiplication is a **teaching model**, not a universal exact equation. Organizations often use **likelihood × impact** on a defined scoring scale. You cannot multiply the words “hacker” and “weak password” to get a numeric risk without first assigning meaningful values.

**IT risks** in the slides are grouped into **security**, **availability**, **performance**, and **compliance**. The course also mentions **GDPR** (EU General Data Protection Regulation), which concerns personal data, lawful processing, data minimization, transparency, security, and individual rights.

**Source:** Risk management, slides 2–10.

## Four treatments for risk

<div class="four-grid"><div class="mini-tile"><strong>Avoid</strong><span>Stop the risky activity.</span></div><div class="mini-tile"><strong>Mitigate</strong><span>Reduce likelihood or impact.</span></div><div class="mini-tile"><strong>Transfer / share</strong><span>Shift some financial effect or responsibility.</span></div><div class="mini-tile"><strong>Accept</strong><span>Keep the risk knowingly.</span></div></div>

| Treatment | Example | What it actually changes |
|---|---|---|
| **Avoid** | Stop using an unsafe service. | Removes the exposure from that activity. |
| **Mitigate** | Add MFA, backups, access rules. | Lowers chance or impact. |
| **Transfer / share** | Buy cyber insurance or outsource a service with contracts. | Shifts **some** costs; organization still has responsibilities. |
| **Accept** | Management signs off on a low-severity risk. | Leaves known **residual risk**. |

**Residual risk** is what remains after controls. Even with MFA, account compromise is still possible through other routes. **Inherent risk** is assessed before adding the selected controls.

**Source:** Risk management, slides 11–14.

## Risk-management cycle

<div class="step-stack"><div><em>1</em><span>**Identify assets:** what data, systems and business processes matter?</span></div><div><em>2</em><span>**Find threats and weaknesses:** what could go wrong?</span></div><div><em>3</em><span>**Assess and prioritize:** how likely and how harmful?</span></div><div><em>4</em><span>**Choose treatment:** avoid, mitigate, transfer/share, or accept.</span></div><div><em>5</em><span>**Implement controls:** assign owner, budget and deadline.</span></div><div><em>6</em><span>**Monitor residual risk and review:** is the plan working?</span></div></div>

**University example from the slides:** protect the student database. Identify unauthorized access as a risk, prioritize it because of sensitive student records, choose MFA and access rules, implement controls for database administrators, then continue monitoring.

**Risk assessment is not the whole of risk management.** Assessment identifies and analyzes risk; management includes deciding, treating, communicating, tracking and reviewing it. Reassess periodically and when major changes occur; the lecture emphasizes that assessment is ongoing rather than one-off.

**Source:** Risk management, slides 13–14, 21–27.

## Identifying information assets

An **information asset** is a meaningful collection that needs protection. A **contacts database** may be treated as one asset rather than one asset per contact row. Documents, emails and files related to one project may also form one asset. But a large content-management system containing many unrelated information sets should not automatically be treated as one asset just because they share a platform.

Typical risk assessment scope from the governance slides: **facilities and backup power**, **network inventory and scanning**, **server OS and backups**, **sensitive data classification**, **access control**, **policy and continuity plans**, and **application inventory / security review**.

**Source:** Risk management, slide 19; organizational security, slides 9–11.

## Risk assessments: benefits and limitations

A security risk assessment helps describe threats, weaknesses, impact and control choices. It gives decision-makers a reason to prioritize investment.

**Benefits** from the slides: understand the organization's risk profile, find weaknesses, inventory IT/data assets, support legal or regulatory requirements, and prioritize security spending.

**Costs / limitations:** skilled people are needed, monitoring continues after assessment, and the assessment itself uses time and money. It can also become outdated if systems change.

**Source:** Risk management, slides 21–27.

## Seven ISO 27001 assessment steps — as taught

1. Define the **risk assessment method** (scope, scoring, thresholds).
2. Compile an inventory of **information assets**.
3. Identify **threats and vulnerabilities**.
4. **Evaluate risks** and choose priorities.
5. **Mitigate / treat** selected risks.
6. Compile **risk reports** and decisions.
7. **Review, monitor and audit**.

> **Useful distinction** · **ISO 31000** gives general risk-management guidance. **ISO/IEC 27005** focuses on information-security risk within an ISMS. **ISO/IEC 27001** gives requirements for an information security management system (ISMS). **NIST SP 800-30** is risk assessment guidance. **OCTAVE** and **FAIR** are risk-analysis methods. These are related but not interchangeable.

**Source:** Risk management, slides 15–18, 28.

## Data protection and resilience controls

| Control | Purpose | Caution |
|---|---|---|
| **Encryption** | Make data unreadable without appropriate key access. | Needs key management and suitable authentication. |
| **Secure erasure** | Make deleted data difficult to recover. | SSDs may require special secure-erase or cryptographic-erase methods. |
| **Data masking** | Replace sensitive data with realistic-looking values for training/tests. | Masks must not leak original identifiers. |
| **Backup** | Recover after deletion, corruption or outage. | Test restoration and separate backup privileges. |
| **RAID** | Tolerate some storage-device failures. | **RAID is not a backup**; it cannot undo accidental deletion or ransomware. |
| **Standby servers, redundancy, UPS** | Reduce outage impact. | Need planned failover and testing. |
| **IDS / IPS** | Detect / possibly block network threats. | Needs tuning, updates and monitoring. |

**Source:** Risk management, slides 29–30; introductory availability controls.
