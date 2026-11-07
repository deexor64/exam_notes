# Endpoint and network defenses

> **Core idea** · An endpoint is any network-connected host: laptop, server, printer, phone, IP camera, controller, smart appliance, or IoT device. Every endpoint increases the area that needs protection.

## Perimeter and internal network

A **network perimeter** separates a managed network from external networks. Controls may include routers, VPN gateways, firewalls, **IPS** (intrusion prevention), and **AAA** services (**authentication, authorization, accounting**). The lecture introduces **Cisco ASA** (Adaptive Security Appliance) as an example of a security appliance combining several network-defense features.

<div class="diagram-flow"><span>Internet</span><b>→</b><span>VPN / Firewall</span><b>→</b><span>IPS / Switches</span><b>→</b><span>Internal devices</span></div>

**Why protect the LAN too?** An attacker who compromises one internal laptop might try to reach servers or other systems. Network infrastructure such as switches, wireless devices and IP phones also needs protection. The slides mention MAC-table overflow, spoofing, DHCP-related threats, LAN storms, STP manipulation and VLAN attacks.

> **Extra explanation** · A **VPN** creates an encrypted tunnel over another network. A **firewall** decides which network traffic is allowed. An **IDS** detects suspicious activity; an **IPS** may actively block it. **AAA** combines identity checking, permission checks and activity accounting.

**Source:** Endpoint threats, slides 2–7.

## Host-based protection

**Antivirus / antimalware** runs on an endpoint and looks for malicious software using three broad methods:

| Method | How it works | Limitation |
|---|---|---|
| **Signature-based** | Compare against known malicious patterns. | New or changed malware may not match. |
| **Heuristic-based** | Look for suspicious general features. | May produce false alarms. |
| **Behavior-based** | Observe suspicious actions and patterns. | Needs good context to distinguish normal use. |

**Host-based firewalls** apply network connection rules on a device. Windows Firewall has profiles such as Public, Private, and Domain. In Linux, **iptables** configures rules through Netfilter; **nftables** is the newer framework and management tool. **TCP Wrapper** is a historical service-level access-control mechanism.

**Host security suites** may bundle antimalware, anti-phishing, web protection, host intrusion prevention, firewalls, and centralized logs. Logs can be forwarded to security monitoring teams.

**Source:** Endpoint threats, slides 8–13.

## Network-level protection and NAC

**Network-based defense** filters threats before they reach an endpoint or before endpoints can reach unsafe destinations. Lecture examples include:

- **AMP**: advanced malware protection across endpoints or services.
- **ESA**: email security appliance; filters spam and risky messages.
- **WSA**: web security appliance; controls access to unsafe sites or disallowed services.
- **NAC (Network Admission Control)**: checks whether a device or user is allowed and meets network access requirements.

**NAC example:** A device without required security updates may be placed in a restricted network rather than receiving full access.

**Source:** Endpoint threats, slides 14–15.

## HIDS, HIPS and detection styles

**HIDS** = Host-based Intrusion Detection System. It may monitor logs, application activity, system configuration, file integrity, rootkit indicators, or suspicious events. **HIPS** adds prevention actions. Some products provide both, which is why the labels can overlap.

| Technique | What it compares | Common problem |
|---|---|---|
| **Signature** | Activity against known bad patterns. | Zero-day and changing malware. |
| **Anomaly-based** | Behavior against a normal baseline. | False positives when normal usage changes. |
| **Policy-based** | Behavior against predefined permitted/forbidden rules. | Poor rules can be too strict or too loose. |

**Polymorphic malware** changes parts of its code or representation so that a simple signature is less reliable. **Zero-day** means a previously unknown or unpatched vulnerability is being exploited, not necessarily that malware appeared literally today.

> **Key comparison** · **Detection** raises an alert. **Prevention** attempts to block an action. A system can do both, but detection does not automatically imply successful blocking.

**Source:** Endpoint threats, slides 16–20.

## Attack surface, BYOD and application control

An **attack surface** is the collection of possible entry points exposed to an attacker. The slides divide it into:

- **Network attack surface**: exposed network services, protocols, ports, wired and wireless connectivity.
- **Software attack surface**: vulnerable apps, browser services, cloud apps, and installed software.
- **Human attack surface**: insecure habits, errors, and social engineering opportunities.

**BYOD** means *Bring Your Own Device*: workers use personal laptops, tablets, or phones for work. Benefits include convenience; risks include unpatched devices, mixing personal and work data, and weaker organization control.

**Blacklisting / denylisting** blocks named prohibited apps. **Whitelisting / allowlisting** permits only approved apps. Allowlisting can reduce risk, but needs careful management.

**Sandboxing** runs or observes suspicious software in an isolated environment to learn its behavior and limit damage. **Isolation is not a guarantee**; badly configured sandboxes can be escaped, and unknown files should only be handled in a controlled environment.

**Source:** Endpoint threats, slides 21–25.
