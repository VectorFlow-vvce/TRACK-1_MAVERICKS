# TRACK-1_MAVERICKS

## 🚀 Overview
TRACK-1_MAVERICKS is a TypeScript-based project built with [Vite](https://vitejs.dev/), [Supabase](https://supabase.com/), and modern tooling for rapid development.  
This repository is part of the **VectorFlow-vvce** initiative and is designed to provide a scalable foundation for building web applications.

---
# 🌾 Benefit_Bridge: AI-Powered Financial Inclusion Engine

> **Eliminating the information gap between Indian farmers and ₹1.5 Lakh Crore in unclaimed welfare subsidies.**

---

## 🎯 The Vision
Indian farmers lose thousands of crores annually to **information asymmetry** and **middlemen exploitation**. **Kisan Saathi** is a personalized "Welfare Intelligence Engine" that uses local AI and voice-recognition to match farmers directly to their eligible government subsidies—removing corruption and friction from the application process.

---

## 🔥 Key Innovations (Track 1 Highlights)

* **🗣️ Voice-First Vernacular Interface:** Farmers can describe their situation in **Kannada, Hindi, or Tamil**. Powered by **OpenAI Whisper**, ensuring accessibility for users with limited digital literacy.
* **🛠️ Kiro-Driven Spec Architecture:** Designed using **Spec-Driven Development** in Kiro to ensure mathematically accurate matching logic for complex eligibility criteria.
* **🧠 Edge-AI Intelligence:** Runs a local **Ollama + Mistral 7B** model. This provides expert financial advice **completely offline**, ensuring privacy and reliability in rural low-connectivity zones.
* **🛡️ Anti-Bribe Roadmap:** Generates a personalized "Document Checklist" and "Transparency Pipeline" so farmers know exactly what they need and where their application stands.

---

## 🏗️ System Architecture Workflow

The system utilizes a **RAG (Retrieval-Augmented Generation)** pipeline to ensure all advice is grounded in current government law.

1.  **Ingestion:** User inputs land size, crop type, and location via voice or text.
2.  **Kiro Engine:** Processes input into vector embeddings for precise matching.
3.  **Knowledge Retrieval:** Queries a verified database of 1500+ government scheme JSON files.
4.  **Local LLM Analysis:** Mistral 7B predicts eligibility and calculates the "Financial Opportunity" for the user.
5.  **Multilingual Output:** Results translated and displayed on a clean, high-fidelity Streamlit dashboard.

---

## 📂 Project Structure
- **src/** → Main application source code
- **supabase/** → Supabase configuration and migrations
- **.env** → Environment variables (not committed)
- **package.json** → Dependencies and scripts
- **vite.config.ts** → Vite configuration
- **tsconfig.json** → TypeScript configuration
- **eslint.config.js** → Linting rules
- **wrangler.jsonc** → Cloudflare Workers configuration
- **bun.lockb / bunfig.toml** → Bun runtime configuration

---

## 🛠️ Tech Stack
- **TypeScript** (98%)
- **CSS** (1.7%)
- **JavaScript** (0.3%)
- **Supabase** for backend services
- **Vite** for fast bundling
- **Bun** as runtime and package manager
- **Cloudflare Workers** for deployment

---

## ⚙️ Setup Instructions
1. **Clone the repository**
   ```bash
# Clone the repository
git clone [https://github.com/VectorFlow-vvce/TRACK-1_MAVERICKS.git](https://github.com/VectorFlow-vvce/TRACK-1_MAVERICKS.git)
cd TRACK-1_MAVERICKS

# Install dependencies
pip install -r requirements.txt

# Run the platform
streamlit run app.py
