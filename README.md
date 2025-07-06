# Project Chimera

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![Status](https://img.shields.io/badge/status-pre--alpha-red.svg)](https://github.com/GizzZmo/project-chimera)
[![Build Status](https://github.com/GizzZmo/project-chimera/actions/workflows/build-windows.yml/badge.svg)](https://github.com/GizzZmo/project-chimera/actions/workflows/build-windows.yml)

> A self-explaining, Cypherpunk-inspired web browser for the sovereign individual.

Project Chimera is a manifesto in code. It is a response to the modern browser landscape—an opaque black box operating within a technological monoculture. Our mission is to build a browser that is not just a window to the web, but a control panel for one's digital self; an instrument for seeing, understanding, and shaping one's place in the electronic age.

This project is forked from **Mozilla Firefox ESR** for its architectural malleability, open-source community, and philosophical alignment with the cause of a diverse and open web.

---

### 🏛️ Core Philosophy

Chimera is built on a foundation of Cypherpunk principles, translating ideology directly into functionality.

*   **Radical Transparency (The Self-Explaining Paradigm):** The browser must explain its own operations in real-time. Invisible processes like network traffic, data provenance, and browser fingerprinting are made visible and understandable.
*   **User Sovereignty & Privacy:** Privacy is not a setting; it is the default state. The user has absolute control over their data and digital footprint. All telemetry is removed.
*   **Decentralization by Default:** The browser is a first-class citizen of the decentralized web, with native support for peer-to-peer protocols and censorship-resistant technologies.
*   **Functional Cyberpunk Aesthetic:** The UI is diegetic, functional, and immersive. Style serves substance, transforming the browser into a powerful, high-tech tool that feels alive.

### ✨ Key Features (The Blueprint)

| Feature                                    | Description                                                                                                                                     |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 👁️ **The Self-Explaining Dashboard**       | A dynamic visualization hub to make the invisible visible: Network Traffic, your "Digital Ghost" (fingerprint), and cryptographic operations.     |
| 🛡️ **The Cypherpunk Core**                  | Native **IPFS** support, integrated **Tor Mode** for anonymity, and a built-in non-custodial **Crypto Wallet** for Web3 interaction.              |
| 🚀 **Modern Productivity Suite**           | Advanced tab and **Workspace Management** (vertical tabs, tab tiling), privacy-first **Local AI** assistance, and deep UI **Customization**.          |
| 🎮 **The Diegetic UI**                      | A functional Cyberpunk aesthetic with a dark-mode core, neon accents, and responsive animations that reflect the browser's internal state. |

### 🧭 Project Roadmap

Project Chimera is currently in the conceptual and foundational phase. Development will proceed in stages:

-   [x] **Phase 0: The Blueprint** - Complete foundational report and strategic analysis.
-   [ ] **Phase 1: The Cypherpunk Core (MVP)**
    -   [x] Fork Firefox ESR (`mozilla-esr140` branch).
    -   [ ] Complete removal of all Mozilla telemetry and data collection.
    -   [ ] Integrate a best-in-class ad/tracker blocking engine.
    -   [ ] Initial UI/UX scaffolding with Cyberpunk theming.
-   [ ] **Phase 2: The Self-Explaining Paradigm**
    -   [ ] Develop the Network Traffic and Data Provenance visualizer.
    -   [ ] Implement the "Digital Ghost" fingerprinting visualizer.
    -   [ ] Build the "Crypto-Anarchist's Toolkit" for explaining transactions.
-   [ ] **Phase 3: The Modern & Decentralized Web**
    -   [ ] Integrate native IPFS and Tor mode.
    -   [ ] Build the native, non-custodial crypto wallet.
    -   [ ] Implement the "Spaces" workspace management system.

### 🛠️ Building Project Chimera (for Windows)

As a fork of Firefox, Chimera uses the Mozilla build system.

**1. Prerequisites:**
   - Install [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) with the "Desktop development with C++" workload.
   - Install [Python 3](https://www.python.org/).
   - Install [Mercurial (hg)](https://www.mercurial-scm.org/).

**2. Clone the Repository:**
   ```bash
   git clone https://github.com/GizzZmo/project-chimera.git
   cd project-chimera
