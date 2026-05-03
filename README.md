# 🌐 WHEREAMI — Know What Every Website Knows About You

> *An open-source digital privacy awareness project.*
> *Built with pure HTML, CSS, and JavaScript. No backend. No tracking. No data stored.*

---

![WHEREAMI Banner](https://img.shields.io/badge/WHEREAMI-Privacy%20Awareness-70798c?style=for-the-badge&labelColor=252323)
![License](https://img.shields.io/badge/License-MIT-dad2bc?style=for-the-badge&labelColor=252323)
![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-a99985?style=for-the-badge&labelColor=252323)
![No Backend](https://img.shields.io/badge/Backend-None-f5f1ed?style=for-the-badge&labelColor=252323)

---

## 📖 What Is WHEREAMI?

**WHEREAMI** is a free, open-source, educational web project that demonstrates — in real time — exactly how much information any website can collect about you the moment you visit it, **without asking for a single permission**.

The goal is not to scare you. The goal is to **educate you**.

Most people believe they are anonymous when browsing the web, especially in "incognito" mode. WHEREAMI exists to gently shatter that illusion and arm you with the knowledge to actually protect yourself.

Every piece of data displayed on this site — your IP address, your city, your ISP, your browser, your operating system, your screen resolution, your timezone, your language — is collected **automatically and silently** by virtually every website you visit. Malicious actors do this too, and they use it against you.

---

## 🎯 Project Goals

- **Raise awareness** of passive data collection on the modern web
- **Educate** users about browser fingerprinting, IP geolocation, and ISP tracking
- **Demonstrate** how easy it is for a simple static website to collect detailed visitor data with zero permissions
- **Empower** people with actionable steps to protect their digital privacy
- **Inspire** developers to build with privacy in mind

---

## 🔍 What Data Does WHEREAMI Collect & Display?

| Category | Data Points |
|---|---|
| **Network** | Public IP address, IP version (IPv4/IPv6), ISP/Organization, ASN number |
| **Location** | City, Region/State, Country, Postal Code, Latitude & Longitude, Map view |
| **Time** | Timezone (IANA), Local date & time at your location |
| **Browser** | Browser name & version, Rendering engine |
| **Operating System** | OS name & version (Windows, macOS, Linux, Android, iOS) |
| **Device** | Device type (Desktop, Mobile, Tablet), Platform string |
| **Screen** | Screen resolution, Viewport size, Device pixel ratio |
| **Language** | Primary language, All accepted languages |
| **Connection** | Connection type (WiFi/4G/etc.), Download speed, Proxy/VPN detection |
| **Privacy Flags** | Cookies enabled status, Do Not Track header value, Touch support |

All of this is collected using **only standard browser APIs and a free public IP geolocation API** — no special libraries, no hacks, no permissions.

---

## ⚠️ Why Should You Care?

### 1. Geographically Targeted Phishing
Attackers who capture your IP can craft phishing emails and fake bank login pages that mention your **exact city and ISP by name** — making them far more convincing and dangerous.

### 2. Browser Fingerprinting
Your combination of browser version, OS, screen resolution, timezone, and language forms a near-unique **digital fingerprint** that can track you across thousands of websites — even in private/incognito mode — without any cookies.

### 3. DDoS & Direct Attacks
Your public IP address can be used to flood your connection with traffic (Distributed Denial of Service attack), disrupting your internet or even your router.

### 4. ISP Surveillance & Data Sales
Your Internet Service Provider sees every domain you visit. In many countries, ISPs are legally required to log and retain this data for months or years, and in others they sell anonymized versions of it to advertisers.

### 5. Social Engineering
Hackers use geolocation data in phone calls, pretending to be from your ISP, bank, or local government. Knowing your city, region, and provider makes these calls sound legitimate.

---

## 🛡️ How To Actually Protect Yourself

### Use a Trusted VPN
A Virtual Private Network routes your traffic through an encrypted server, masking your real IP address and location. Choose providers with **verified no-log policies** and independent audits.

**Recommended:** [Mullvad VPN](https://mullvad.net) · [ProtonVPN](https://protonvpn.com) · [IVPN](https://www.ivpn.net)

> ⚠️ Free VPNs are often worse than no VPN — many log and sell your traffic data.

### Use Tor Browser
[The Tor Browser](https://www.torproject.org) routes your traffic through multiple encrypted relays worldwide, making it extremely difficult to trace your IP or identity. Best for maximum anonymity.

### Use a Privacy-Focused Browser
- **[Firefox](https://www.mozilla.org/en-US/firefox/)** with [uBlock Origin](https://ublockorigin.com/) extension
- **[Brave Browser](https://brave.com/)** — built-in ad/tracker blocking
- **[LibreWolf](https://librewolf.net/)** — hardened Firefox fork

### Use Private Search Engines
Switch from Google or Bing to:
- **[DuckDuckGo](https://duckduckgo.com)** — no search tracking
- **[Startpage](https://www.startpage.com)** — Google results, private
- **[SearXNG](https://searx.space)** — self-hostable, open source

### Enable DNS-over-HTTPS
Encrypted DNS prevents your ISP from seeing what domains you look up.
- **Cloudflare:** `1.1.1.1`
- **NextDNS:** [nextdns.io](https://nextdns.io)
- Configure in Firefox: Settings → Network → DNS over HTTPS

### Be Suspicious of Links
A single visit to a malicious website is all it takes to capture your full device profile. Always:
- Check URLs carefully before clicking
- Avoid shortened links from unknown sources
- Never open email attachments from strangers
- Look for HTTPS and verify the domain spelling

---

## 🏗️ Technical Architecture

WHEREAMI is a **purely static project** — it runs entirely in the visitor's browser with zero server-side code.

```
WHEREAMI/
├── index.html        ← Page structure & layout
├── style.css         ← All styles (color palette, responsive design)
├── script.js         ← Data collection & display logic
└── README.md         ← This file
```

### APIs Used

| API | Purpose | Key Required | Cost |
|---|---|---|---|
| [ipapi.co](https://ipapi.co) | IP geolocation (primary) | No | Free (1,000/day) |
| [geo.kamero.ai](https://geo.kamero.ai) | IP geolocation (fallback) | No | Free, unlimited |
| [OpenStreetMap](https://www.openstreetmap.org) | Map embed | No | Free |
| Browser APIs | Browser, OS, screen, language, connection | N/A | Built-in |

### Browser APIs Used (No Permissions Required)
- `navigator.userAgent` — Browser and OS detection
- `navigator.language` / `navigator.languages` — Language preferences
- `navigator.platform` — System platform string
- `navigator.cookieEnabled` — Cookie status
- `navigator.doNotTrack` — DNT header
- `navigator.connection` — Network connection type
- `navigator.maxTouchPoints` — Touch capability
- `window.screen` — Screen resolution and color depth
- `window.devicePixelRatio` — Display density
- `Intl.DateTimeFormat` — Timezone-aware local time

### Color Palette

| Color | Hex | Role |
|---|---|---|
| **Charcoal** | `#252323` | Page background, primary dark |
| **Slate** | `#70798c` | Accents, links, terminal prompts |
| **Cream** | `#f5f1ed` | Primary text, headings |
| **Sand** | `#dad2bc` | Secondary text, card headers |
| **Taupe** | `#a99985` | Muted text, borders, metadata |

---

## 🚀 Deployment

WHEREAMI is designed for **GitHub Pages** — no build process, no dependencies, no configuration needed.

### Deploy Your Own Copy

1. **Fork this repository**
   ```
   Click "Fork" on the GitHub repository page
   ```

2. **Enable GitHub Pages**
   ```
   Repository Settings → Pages → Source: main branch / root
   ```

3. **Your site will be live at:**
   ```
   https://yourusername.github.io/whereami/
   ```

4. **That's it.** No npm, no build tools, no servers.

---

## 🧠 Educational Use Cases

- **Cybersecurity classes** — demonstrate passive data collection to students
- **Digital literacy workshops** — show non-technical users what websites know
- **Privacy advocacy** — a shareable link to raise awareness
- **Developer education** — understand what browser APIs expose
- **Personal VPN testing** — verify your VPN is masking your real IP/location

---

## 🤝 Contributing

Contributions are warmly welcome! Here's how you can help:

1. **Fork** the repository
2. **Create a feature branch:** `git checkout -b feature/my-improvement`
3. **Make your changes** (keep it pure HTML/CSS/JS — no frameworks, no build tools)
4. **Commit:** `git commit -m "Add: my improvement"`
5. **Push:** `git push origin feature/my-improvement`
6. **Open a Pull Request**

### Ideas for Contributions
- Add more languages / translations
- Improve browser fingerprint detection accuracy
- Add WebRTC local IP detection (with explanation)
- Add Canvas fingerprinting demonstration
- Add more privacy tips and resources
- Improve mobile UX

---

## ⚖️ Legal & Ethical Notice

WHEREAMI **does not store, transmit, sell, or share any visitor data**. It is a fully client-side static site with no backend, no analytics, no cookies, and no tracking of any kind.

All data displayed on the page is fetched from a public third-party IP geolocation API (ipapi.co / geo.kamero.ai) solely for display purposes and is not retained anywhere.

This project is built for **educational and awareness purposes only**. It demonstrates techniques that are already in widespread use across the internet — the goal is transparency and empowerment, not exploitation.

**Please use this knowledge responsibly and ethically.**

---

## 📜 License

```
MIT License

Copyright (c) 2025 WHEREAMI Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🔗 Resources & Further Reading

- [EFF — Surveillance Self-Defense](https://ssd.eff.org)
- [EFF — Cover Your Tracks (Fingerprinting Demo)](https://coveryourtracks.eff.org)
- [Privacy Guides](https://www.privacyguides.org)
- [The Tor Project](https://www.torproject.org)
- [Mullvad VPN](https://mullvad.net)
- [Have I Been Pwned](https://haveibeenpwned.com)
- [BrowserLeaks — Fingerprinting Tests](https://browserleaks.com)
- [IPLeak — VPN/DNS Leak Test](https://ipleak.net)

---

<div align="center">

**Made with ❤️ for digital privacy education.**

*If this project helped you understand your digital footprint — share it with someone who needs to know.*

`[WHEREAMI]` — *Because awareness is the first step to protection.*

</div>
