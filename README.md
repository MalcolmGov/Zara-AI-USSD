# Zara AI — USSD AI Agent Marketplace Prototype

> **"If you can dial a number, you can access AI."**

[![Prototype Status](https://img.shields.io/badge/Prototype-Production_Ready-10b981.svg)]()
[![Platform](https://img.shields.io/badge/Platform-React_19_|_Vite_8_|_TypeScript-3b82f6.svg)]()
[![Channel](https://img.shields.io/badge/Channel-GSM_USSD_*120*9272%23-eab308.svg)]()
[![Repository](https://img.shields.io/badge/GitHub-MalcolmGov%2FZara--AI--USSD-purple.svg)](https://github.com/MalcolmGov/Zara-AI-USSD)

An interactive, high-fidelity browser prototype demonstrating how **Zara AI** provides ubiquitous access to an **AI Agent Marketplace** via GSM USSD on any mobile phone — requiring zero data, no smartphone, no app installation, and no understanding of AI.

---

## 🌟 The Core Proposition

Over **400 million people** across Africa navigate daily transactions using basic feature phones (2G/3G) via USSD. Traditional USSD systems trap users in frustrating, multi-level numerical menu trees that break when users make a mistake.

**Zara AI** changes this paradigm:
1. The user dials a single USSD service code: `*120*9272#`.
2. The user speaks or types in natural language (e.g., *"I need electricity"*, *"Find me a job"*, *"My maize leaves are yellow"*, or in isiZulu: *"Ngifuna ukuthenga ugesi"*).
3. The **Zara AI Router** detects the intent, extracts parameters (amount, meter, crop symptom, location), and dispatches the user directly to a specialized agent in the marketplace.
4. The agent executes a deterministic, secure transaction workflow with real-world enterprise APIs (Utility Vending, SASSA Government Grants, Job Networks, Agronomy Knowledgebases).
5. Complex results and documents are seamlessly handed off cross-channel to **SMS**, **WhatsApp**, or **Voice callback**.

---

## 📱 Prototype Experience

The application is structured into two complementary sections:

### 1. Left Side: Feature Phone Simulator
- **Hardware Simulation**: Realistic Nokia/KaiOS-style feature phone casing with speaker slit, screen bezel, metallic 4-way D-pad, and tactile 3D numeric keypad.
- **Full Keyboard Support**: Type digits `0`-`9`, `*`, `#`, or natural language directly on your physical keyboard. `Enter` sends replies; `Esc` cancels or exits.
- **Authentic USSD Dialog**: Monospace retro LCD screen with scanline effects, GSM 182-character wrapping, active character counter, and network banners (`"USSD code running..."`).
- **Simulated Incoming Device Notifications**: In-app popups displaying SMS and WhatsApp messages delivered to the user's phone.

### 2. Right Side: Zara AI Engine Telemetry & Architecture
- **Session Card**: Live session duration, session ID, masked MSISDN (`+27 82 *** 1234`), cellular operator, and language pack.
- **AI Intent Router Telemetry**: Displays raw user input, classified intent, confidence score bar, selected agent, and extracted entity tags in real time.
- **Agent Execution**: Active agent name, current workflow, step count, and execution status.
- **API Execution & Latency**: Live latency measurement, endpoint invoked, and HTTP response codes.
- **AI Credit Ledger**: Starting balance, transaction cost, and persistent remaining credits.
- **Interactive Architecture Pipeline**: Glowing pipeline showing real-time pulse as packets travel:  
  `Feature Phone ➔ USSD Gateway ➔ Zara Adapter ➔ AI Router ➔ Agent Marketplace ➔ Specialized Agent ➔ Enterprise API ➔ SMS/WhatsApp`
- **Developer Event Log**: Timestamped, color-coded stream of system events (`INTENT_DETECTED`, `WORKFLOW_STEP`, `API_CALLED`, `CROSS_CHANNEL_DISPATCH`).

---

## 🤖 8 Marketplace Agents Included

| Agent | Category | Key Capabilities | Sample Natural Language Query |
|---|---|---|---|
| **Electricity Agent** | Utilities & VAS | Prepaid meter validation, STS 16-digit token generation, Eskom/City Power API, SMS token delivery. | *"Buy R100 electricity"* |
| **Government Services** | Public Sector | SASSA SRD R370 grant verification, Home Affairs ID tracker, Driver licence status (clearly marked demo data). | *"Check my grant"* |
| **Jobs & Livelihoods** | Employment | Hyperlocal job discovery (Tech, Retail, Admin, Security), salary display, CV delivery via SMS. | *"Find me a job in technology"* |
| **Agriculture & Agronomy** | Agritech & GenAI | 2-step crop symptom triage, local weather leaching analysis, multi-cause reasoning, WhatsApp advisory report. | *"My maize leaves are yellow"* |
| **Financial Services** | Fintech | Instant cash vouchers (ATM & retail redeemable), account balance queries, micro-loan pre-approval. | *"Send money voucher"* |
| **Healthcare & Wellness** | Health | Primary symptom triage, 24h clinic locator, professional nurse voice escalation (non-diagnostic). | *"I need a doctor / clinic near me"* |
| **SME & Business** | Enterprise | CIPC company registration guide, SEFA funding directory, SARS tax compliance checklist. | *"Help with my business registration"* |
| **General AI Assistant** | Universal | General conversational intelligence, summaries, calculations, and cross-channel routing. | *"What will the weather be tomorrow?"* |

---

## 🎬 Executive Presentation Features

- **14-Step Guided Executive Tour**: Click **"Run Guided Demo"** to watch a fully automated, step-by-step presentation of the entire electricity purchase flow, intent classification, token generation, and SMS handoff. Includes **Pause**, **Resume**, and **Restart** controls.
- **1-Click Scenario Selector**: Instantly launch scenarios:
  - *Buy Electricity*
  - *Find a Job*
  - *Check Grant*
  - *Crop Assistance (GenAI)*
  - *Buy AI Credits*
  - *isiZulu Natural Language Routing*
- **Network Condition Simulation**: Demonstrate behavior under varying real-world African telecommunications environments:
  - *Normal* (&lt;500ms)
  - *Slow* (1.4s)
  - *Very slow* (3.2s)
  - *SS7 Network Timeout* (with retry prompt)
- **Multilingual Support**: Switch seamlessly between **English**, **isiZulu**, **Sesotho**, and **Afrikaans**.

---

## 🛠️ Technical Stack & Architecture

```
/ussd-prototype
  /src
    /components
      /PhoneSimulator     # Realistic feature phone casing, screen, D-pad, keypad
      /Engine             # AI Engine panel, Architecture Flow, Event Log
      /Controls           # Header, Guided Demo dock, SMS/WhatsApp toast
    /ussd
      sessionManager.ts   # Session state machine, 180s timeout, credit ledger
      channelAdapter.ts   # GSM USSD protocol, 182-character wrapping, latency sim
      menuRenderer.ts     # Standard USSD menus & screens
    /ai
      intentRouter.ts     # Pattern & fuzzy NLP router (extensible to LLM/OpenAI)
      entityExtractor.ts  # Extracts amounts, meter numbers, RSA ID, crop symptoms
      languageDetector.ts # Detects en-ZA, zu-ZA, st-ZA, af-ZA
    /agents
      ZaraAgent.ts        # Common agent interface
      electricityAgent.ts # Prepaid electricity vending
      governmentAgent.ts  # SASSA grant verification
      jobsAgent.ts        # Job discovery & SMS specs
      agricultureAgent.ts # Generative AI crop disease triage
      financialAgent.ts   # Cash vouchers & balance checks
      healthcareAgent.ts  # Triage intake & clinic locator
      smeAgent.ts         # CIPC business tools
      generalAgent.ts     # Universal assistant
    /services
      mockElectricityAPI.ts
      mockGovernmentAPI.ts
      mockJobsAPI.ts
      mockWeatherAPI.ts
      mockPaymentAPI.ts
      mockSMSAPI.ts
    /data
      agentsData.ts
      jobsData.ts
      cropKnowledgeData.ts
      languagesData.ts
```

---

## 🚀 Quickstart

### Prerequisites
- Node.js `v18+` (v20+ or v26 tested)
- npm `v9+`

### Installation & Run

```bash
cd ussd-prototype
npm install
npm run dev
```

Open your browser to: **http://localhost:5180**

### Run Automated Test Suite

```bash
npx tsx src/tests/integration.test.ts
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔒 Security & Demo Data Disclosure

- All identity numbers, payments, tokens, government records, and job listings in this prototype are **fictional demonstration data**.
- Sensitive information is masked (e.g., `Meter: ****6789`, `ID: ******1234`, `MSISDN: +27 82 *** 1234`).
- No external third-party API credentials are required to run the prototype.

---

## 📄 License & Attribution

Designed and developed for **Zara AI** by Malcolm Govender.  
Repository: [https://github.com/MalcolmGov/Zara-AI-USSD](https://github.com/MalcolmGov/Zara-AI-USSD)
