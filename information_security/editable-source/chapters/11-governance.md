# Organizational security and governance

> **Core idea** · Security governance means **who makes security decisions, what rules exist, who carries them out, and how the organization knows they work**.

## Governance vs operations

**Information security governance** is a framework of policies, practices and strategies that aligns resources with protecting information. The lecture names four **priorities**: resource allocation, compliance, accountability and implementation.

It also defines four **components**:

| Component | Plain meaning | Example |
|---|---|---|
| **Strategy** | Set goals and direction. | Decide sensitive records need strict control. |
| **Implementation** | Put requirements and controls into place. | Enable MFA and access policies. |
| **Operation** | Keep the measures working day-to-day. | Review new accounts and security events. |
| **Monitoring** | Measure and report performance. | Audit permissions and track incidents. |

> **Why governance is not only IT** · Management sets priorities and budgets. Security teams design controls. Employees follow policies. Auditors and owners check results. If nobody owns a control, installing software is not enough.

**Source:** Organizational security, slides 2–4.

## Four major areas of security policy

The slides group organizational policies into **organizational security measures**, **incident response and business continuity**, **human resources**, and **technical security measures**.

Organizational measures cover **security management**, roles/responsibilities, access-control policies, asset management, change management and external data processors.

Technical measures cover **physical and logical access**, logging/monitoring, data-at-rest protection, server/database security, endpoint/workstation security and network/communications protection.

**Third-party access** should use approved accounts, well-defined boundaries, least privilege and clear contracts/policies. Outsourcing a function does not remove the organization's obligation to manage supplier risk.

**Source:** Organizational security, slides 5–8.

## Policy, standard, procedure and guideline

| Document | Meaning | Example |
|---|---|---|
| **Policy** | A high-level rule stating what must happen and why. | All staff accounts must use MFA. |
| **Standard** | A specific mandatory requirement supporting policy. | Approved authenticator types and configuration criteria. |
| **Procedure** | Step-by-step instructions to carry out a task. | How the IT team registers a new MFA method. |
| **Guideline** | Recommended, not always mandatory, good practice. | Prefer passkeys where supported. |

The lecture describes **security standards** as shared, precise specifications that support consistent design, procurement, and protection. Bodies listed: **ISO**, **NIST**, **BSI**, **IETF**, and **PCI SSC**.

**Source:** Organizational security, slides 12–15. Policy/standard/procedure distinctions are added explanation.

## ISO/IEC 17799:2005 domains from the slides

The historical lecture framework lists control areas:

1. Security policy; organization of information security; asset management.
2. Human resources security; physical and environmental security.
3. Communications and operations management; access control.
4. Information-system acquisition, development and maintenance.
5. Information-security incident management; business continuity; compliance.

> **Modern context** · ISO/IEC **17799:2005** is an **older** reference used in your lecture. It was superseded by later ISO/IEC 27002 guidance. For exam questions about the slide, learn the listed domains; for a new real-world project, check the current ISO/IEC 27001/27002 editions.

**Source:** Organizational security, slides 16–18.

## Example policies for common exam questions

The lecture asks students to design rules for five areas. Here are **short sample policies** that demonstrate the expected structure:

| Area | Four example rules |
|---|---|
| **Password management** | Use unique secrets; use an approved password manager; require MFA where supported; report suspected exposure immediately. |
| **System access** | Give least privilege; require individual accounts; review rights regularly; remove accounts when no longer needed. |
| **Physical areas** | Require entry authorization; issue visitor badges; escort visitors in restricted rooms; maintain access logs. |
| **Remote access** | Use approved secure remote tools; require MFA; keep devices updated; report lost devices. |
| **Internet and email** | Do not share sensitive data through unapproved channels; verify unusual requests; report suspicious emails; only install approved software. |

**Exam technique:** Name a clear rule, who it applies to, and what the organization should do. Rules should be specific enough to assess, not just “make security better.”

**Source:** Organizational security, slides 19–20. Table examples are newly drafted study examples.
