# 🌾 NEXGEN AGRI — Smart Farm Command & Edge Node Gateway

[![Netlify Status](https://api.netlify.com/api/v1/badges/netlify-badge.svg)](https://www.netlify.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **NEXGEN AGRI** is an advanced, offline-first smart agriculture operations platform and IoT edge gateway. Built for precision farming, it integrates real-time LoRa mesh telemetry, AI-powered plant pathology diagnostics, automated smart pump motor controls, and multilingual voice-assisted alerts.

---

## 🚀 Live Demo & Deployment

- **GitHub Repository**: [https://github.com/arvindpeddagolla-cloud/Nexgen-Agri](https://github.com/arvindpeddagolla-cloud/Nexgen-Agri)
- **Deployment Platform**: [Netlify](https://www.netlify.com)

---

## ✨ Key Features

### 🌿 1. AI Edge Vision & Plant Pathology Diagnostics
* **Live Camera & Deep Leaf Scan**: On-device neural processing engine (NPU) simulation for crop disease detection.
* **Instant Disease Classification**: Identifies conditions like *Early Blight (Alternaria solani)*, *Leaf Curl Virus (Begomovirus)*, and healthy canopies with confidence ratings and severity stage grading.
* **Actionable Treatment Plans**: Recommends organic and chemical interventions (e.g. Copper Oxychloride, Neem spray, biopesticides).

### 📡 2. Multi-Zone LoRa Mesh Telemetry
* **Real-time Zone Matrix**: Live data streaming from field nodes across 4 agricultural zones:
  * **Zone A (North Field)**: Wheat & Tomato
  * **Zone B (East Plot)**: Bt Cotton (Hybrid)
  * **Zone C (South Acres)**: G4 Chillies & Mustard
  * **Zone D (West Canal Edge)**: Sugarcane Co-0238
* **Sensor Metrics**: Soil moisture %, ambient temperature, relative humidity %, heat index, solar illuminance (kLux), and node battery levels with sub-15ms mesh latency.

### 💧 3. Smart Irrigation & Actuator Control
* **Direct Pump Actuation**: Remote toggle and scheduling for Canal Pump #1 and Borewell #2 with live pressure (PSI) gauges.
* **Conservation Analytics**: Tracks cumulative water savings (Liters saved daily, weekly, and monthly).
* **Automated Threshold Triggers**: Intelligent alert system for low soil moisture with 1-click irrigation dispatch.

### 🌐 4. Full Trilingual Localization (i18n)
* Complete seamless switching between **English**, **Hindi (हिंदी)**, and **Telugu (తెలుగు)**.
* Localized telemetry terminology, sensor alerts, recommendations, and control menus.

### 🔊 5. Web Audio Voice Assistant & Interactive Alerts
* Synthesized speech feedback for critical farm alerts and diagnostic results.
* Auditory confirmations for motor switching, scanning cycles, and alarm states using the Web Audio API.

### 🔒 6. Zero-Internet Edge Authentication
* Offline-first design allowing terminal login even when remote internet connection is unavailable.
* Multi-factor verification supporting Farmer ID, Farm Edge Device PIN, and quick biometric authentication.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Vanilla JavaScript (ES Modules), HTML5 |
| **Styling & Design System** | Tailwind CSS, Google Fonts (*Plus Jakarta Sans*, *Inter*, *JetBrains Mono*) |
| **Icons & Visuals** | Google Material Symbols Outlined |
| **Audio Engine** | Web Audio API + Web SpeechSynthesis |
| **Build Tool & Bundler** | [Vite 5](https://vitejs.dev/) |
| **Hosting & CI/CD** | [Netlify](https://netlify.com/) |

---

## 📁 Project Structure

```text
Nexgen-Agri/
├── index.html          # Main application entry point & UI shell
├── netlify.toml        # Netlify build and routing configuration
├── package.json        # NPM dependencies and scripts
├── vite.config.js      # Vite build tool configuration
├── public/             # Static assets
│   ├── farmer.jpg      # Profile avatar
│   ├── leaf_sample.jpg # Sample leaf image for diagnostics
│   └── logo.png        # Nexgen Agri brand logo
└── src/                # Application source code
    ├── audio.js        # Sound effects and speech synthesis engine
    ├── data.js         # Reactive farm state, telemetry data, and zones
    ├── i18n.js         # Multilingual translation dictionary (EN/HI/TE)
    ├── main.js         # Core application logic, event listeners, and UI rendering
    └── style.css       # Custom styles, animations, and typography tokens
```

---

## 💻 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18.x or later)
* [npm](https://www.npmjs.com/) (version 9.x or later) or `yarn` / `pnpm`

### 1. Clone the Repository
```bash
git clone https://github.com/arvindpeddagolla-cloud/Nexgen-Agri.git
cd Nexgen-Agri
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to interact with the application.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deploying to Netlify

This project is pre-configured with a `netlify.toml` file for zero-configuration Netlify deployment.

### Option 1: Continuous Deployment via GitHub (Recommended)

1. Log in to [Netlify](https://app.netlify.com/).
2. Click on **"Add new site"** > **"Import an existing project"**.
3. Select **GitHub** as your Git provider and authorize Netlify.
4. Choose the repository: `arvindpeddagolla-cloud/Nexgen-Agri`.
5. Netlify will auto-detect settings from `netlify.toml`:
   * **Build Command**: `npm run build`
   * **Publish directory**: `dist`
6. Click **"Deploy Nexgen-Agri"**.
7. Every subsequent push to `main` branch will automatically trigger a new deployment.

---

### Option 2: Deploy Using Netlify CLI

If you prefer command-line deployment:

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```
2. Authenticate your Netlify account:
   ```bash
   netlify login
   ```
3. Initialize and link the site:
   ```bash
   netlify init
   ```
4. Deploy to production:
   ```bash
   netlify deploy --prod --dir=dist
   ```

---

### Option 3: Manual Drag-and-Drop Deploy

1. Run `npm run build` locally.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder directly onto the page.

---

## ⚙️ Netlify Configuration (`netlify.toml`)

The included `netlify.toml` ensures proper routing and security headers:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 📡 IoT Hardware & Protocol Compatibility

NEXGEN AGRI is engineered to interface with standard agricultural edge computing hardware:
- **Edge Microcontrollers**: ESP32, Raspberry Pi 4 / Compute Module 4, STM32 LoRa nodes.
- **Wireless Protocols**: LoRaWAN (868 MHz / 915 MHz / 865 MHz IN865), Zigbee 3.0, and 4G/LTE Cat-M1 fallback.
- **Standards Compliance**: ICAR (Indian Council of Agricultural Research) protocol v3 and KVK node specifications.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍🌾 Author & Maintainer

* **Repository Owner**: [arvindpeddagolla-cloud](https://github.com/arvindpeddagolla-cloud)
* **Project**: NEXGEN AGRI Smart Farm Command System
