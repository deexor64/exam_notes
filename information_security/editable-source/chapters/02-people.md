# People and social engineering

> **Core idea** · A security system is more than software. People make decisions, processes define safe behavior, and technology supports both.

## Human aspects vs human factors

| Human aspects | Human factors |
|---|---|
| **What people do**: actions, habits, awareness, training, culture and policies. | **Why people do it**: attention, stress, cognitive bias, mental workload, usability and decision-making. |
| Example: staff often reuse passwords. | Explanation: remembering many passwords is difficult, and convenience wins. |

The **People–Process–Technology (PPT)** model connects employees, managers, students, contractors, customers and admins (**people**) with policies, incident plans, access procedures and risk processes (**process**) and firewalls, encryption, MFA, antivirus, IDS and monitoring (**technology**).

<div class="three-grid"><div class="mini-tile"><strong>People</strong><span>Learn • decide • report</span></div><div class="mini-tile"><strong>Process</strong><span>Rules • responsibilities • review</span></div><div class="mini-tile"><strong>Technology</strong><span>Detect • enforce • protect</span></div></div>

> **Why PPT matters** · An employee might see a phishing email (**people**), follow the reporting guide (**process**), and rely on email filtering plus MFA (**technology**). One pillar alone is weaker than the three working together.

**Source:** Human factors, slides 2–5.

## Why people become security risks

Common causes from the lecture: **lack of awareness**, **negligence**, **convenience**, **curiosity**, **trust**, and **stress/time pressure**. Examples: ignoring updates, sharing passwords, installing unknown software, or approving a suspicious request in a hurry.

Attackers often appeal to:

| Psychological trigger | Simple example |
|---|---|
| **Authority** | “I am your IT administrator.” |
| **Urgency** | “Respond within 10 minutes.” |
| **Fear** | “Your account will be closed.” |
| **Curiosity** | “Open this unusual attachment.” |
| **Greed / reward** | “You won a prize.” |
| **Sympathy** | A fabricated emergency requesting help. |

> **Tricky point** · These are not six technical vulnerabilities. They are **persuasion triggers**. An attacker may combine several in one message. For example, fake authority + fear + urgency.

**Source:** Human factors, slides 6–8.

## Human error, violation and insider threat

- **Error** = unintentional mistake: wrong email recipient, deleted file, misconfigured cloud folder, lost device.
- **Violation** = intentional failure to follow a rule: knowingly sharing passwords, bypassing a restriction, installing prohibited software.
- **Malicious insider** = deliberately causes harm using trusted access.
- **Negligent insider** = accidentally exposes information or ignores safe practices.
- **Compromised insider** = an outside attacker uses the insider's stolen credentials.

> **Extra explanation** · Intent is the deciding factor between an **error** and a **violation**. A compromised account may act like an insider even though the real employee did not approve those actions.

**Source:** Human factors, slides 9–11.

## Social engineering methods

| Method | What happens | Defensive habit |
|---|---|---|
| **Phishing** | Fake email, message, or site requests data or action. | Verify through a trusted channel. |
| **Baiting** | Tempting free download or unknown USB device. | Do not use untrusted files or devices. |
| **Tailgating / piggybacking** | Someone follows authorized staff into a restricted area. | Follow visitor and access rules. |
| **Shoulder surfing** | Someone watches sensitive information being entered. | Shield screens and input. |
| **Dumpster diving** | Sensitive discarded material is collected. | Secure disposal and shredding. |
| **Deepfake impersonation** | Synthetic voice, video or image imitates someone trusted. | Verify unexpected requests independently. |

**Social engineering** means manipulating people into disclosing data or doing an unsafe action. It can happen online, over the phone, or in physical places.

**Source:** Human factors, slides 16–17.

## Awareness, hygiene and security culture

**Security awareness** teaches people to recognize risk, make safer choices, and report concerns. **Security hygiene** means daily habits that reduce risk: strong unique passwords, MFA, timely updates, locking devices, verifying senders, backing up data, avoiding untrusted networks for sensitive work without appropriate protection, and reporting suspicious activity.

**Security culture** is the shared attitude toward security. Good culture makes reporting easy, does not punish honest early reporting, and assigns responsibility across the organization.

**Human Risk Management (HRM)** identifies and measures human-related risks using signals such as phishing susceptibility, password practices, access privileges, awareness assessments, insider indicators, and behavior analytics. Such monitoring must also respect privacy and fairness.

**Human-centered security design** makes the safe action the easy action: clear warnings, sensible defaults, usable MFA, simple reporting, and not overwhelming users with alerts.

**Source:** Human factors, slides 12–19.
