# Security incident response

> **Core idea** · Incident response is an organized process for identifying, containing, resolving and learning from security incidents so that damage is limited and operations can recover.

## Event, alert or incident?

| Term | Meaning | Example |
|---|---|---|
| **Event** | Something happens in a system. | A login, file deletion, server setting change. |
| **Alert** | A notification raised because of a condition/event. | Several failed logins trigger a warning. |
| **Incident** | A confirmed or strongly suspected security event requiring response under the organization's criteria. | Stolen credentials used to access records. |

Not every **event** is an incident. Not every **alert** means an attack occurred. Analysts investigate to decide whether activity is normal or dangerous.

**Source:** Incident response, slides 2, 8.

## NIST four stages — lecture model

<div class="step-stack"><div><em>1</em><span><strong>Preparation</strong> — plans, training, monitoring, backups, contact lists.</span></div><div><em>2</em><span><strong>Detection & analysis</strong> — notice suspicious activity, investigate, confirm and assess.</span></div><div><em>3</em><span><strong>Containment, eradication & recovery</strong> — limit spread, remove cause, restore and verify operations.</span></div><div><em>4</em><span><strong>Post-incident activity</strong> — document, review and improve defenses.</span></div></div>

> **Source-vs-current note** · This is the **older four-phase NIST model used in your slides**. NIST released **SP 800-61 Rev. 3 in April 2025**, aligned with **CSF 2.0** and a revised incident-response lifecycle. For the exam, learn the four lecture phases; for current professional guidance, see <a href="https://csrc.nist.gov/pubs/sp/800/61/r3/final" target="_blank" rel="noopener">NIST SP 800-61 Rev. 3 ↗</a>.

**Source:** Incident response, slide 3.

## SANS six stages — know P I C E R L

<div class="diagram-flow"><span>Preparation</span><b>→</b><span>Identification</span><b>→</b><span>Containment</span><b>→</b><span>Eradication</span><b>→</b><span>Recovery</span><b>→</b><span>Lessons learned</span></div>

| Stage | Main question | Example |
|---|---|---|
| **Preparation** | Are we ready? | Plans, tools, backups, response training. |
| **Identification** | Is this a real incident? | Examine unusual logins and alerts. |
| **Containment** | How do we stop it spreading now? | Restrict affected account or network access. |
| **Eradication** | How do we remove the root cause? | Remove malicious software, patch the issue. |
| **Recovery** | How do we safely resume service? | Restore from trusted backups; monitor. |
| **Lessons learned** | What should we change? | Improve playbooks and controls. |

**Containment ≠ eradication:** containment limits immediate harm; eradication removes the underlying problem. **Recovery** comes after sufficient confidence that systems are safe to restore.

**Source:** Incident response, slides 4–5.

## Incident Response Plan (IRP) and example

An **IRP** is the documented playbook explaining **what to do, who does it, how to communicate, and how to recover**. It includes reporting routes, incident categories, escalation, roles, evidence handling, communications, and review.

**Example: a staff email account is compromised after phishing.**

1. **Report:** employee tells security/IT through approved channels.
2. **Identify:** analyze unusual login or message activity and determine scope.
3. **Contain:** restrict the affected account/session and block related malicious messages.
4. **Eradicate:** reset compromised credentials, close unauthorized sessions, and fix the entry point.
5. **Recover:** restore access safely, check mail rules and related accounts, monitor.
6. **Communicate and learn:** notify relevant people based on impact, update training and controls.

The plan should also tell staff how to preserve logs and evidence and when to involve legal or compliance teams.

**Source:** Incident response, slides 6–7, 14–15.

## Who does what? Incident response team

| Role | Main responsibility |
|---|---|
| **Incident coordinator** | Lead response and decisions; communicate with management. |
| **Security analyst / investigator** | Review logs, alerts, scope and cause. |
| **Forensic specialist** | Preserve and analyze evidence. |
| **System/network administrator** | Isolate, patch, restore and reconfigure systems. |
| **Communications / PR** | Internal/external messaging and updates. |
| **Legal/compliance officer** | Legal duties, reporting and policy requirements. |

The lecture also lists broader day-to-day roles: **CISO** (strategy), **security engineer** (builds controls), **SOC analyst** (monitors), and **helpdesk** (initial reports). These may overlap in smaller organizations.

**Source:** Incident response, slides 10, 13.

## Business continuity vs disaster recovery vs incident response

| Activity | Primary goal | Example during ransomware |
|---|---|---|
| **Incident response (IR)** | Handle the security incident. | Analyze compromise and contain affected systems. |
| **Business continuity (BC)** | Keep essential business services going. | Use an alternate manual workflow while primary systems are down. |
| **Disaster recovery (DR)** | Restore IT systems and data after disruption. | Recover servers/databases from verified backups. |

BC teams may include a **continuity manager**, **DR lead**, application/database owners, facilities manager and HR/staff liaison. BCP is the **business continuity plan**; DRP is the **disaster recovery plan**.

**Source:** Incident response, slides 9–11.

## RACI responsibility matrix

**RACI** defines the relationship between a task and the people involved:

- **R — Responsible:** does the work.
- **A — Accountable:** ultimately owns the result/decision.
- **C — Consulted:** gives input before or during the work.
- **I — Informed:** receives updates.

**Example:** During recovery, a system administrator may be **R**, the incident coordinator **A**, an application owner **C**, and department managers **I**. Many organizations prefer **one accountable owner** for each important task to avoid confusion.

**Source:** Incident response, slide 12.
