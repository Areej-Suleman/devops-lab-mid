# DevOps Lab Midterm - Assignment Submission Portal

This repository contains a React-based assignment submission portal, automated tests via Vitest, a GitHub Actions CI/CD pipeline, and a local FastAPI webhook receiver. This project fulfills all functional requirements and bonus tasks.

## 🚀 Setup & Execution Instructions

### 1. Running the React Application
The frontend is built with React and Vite. To run the portal locally on your machine:

```bash
cd portal
npm install
npm run dev
```

*The application will launch and be accessible at `http://localhost:5173/`.*

### 2. Executing the Automated Tests
The project uses Vitest for testing validation logic and component rendering (including validation for missing registration numbers and invalid URLs). To execute the test suite:

```bash
cd portal
npm run test
```

*Tests are also configured to run automatically in the CI pipeline on every push.*

### 3. Starting the Local Receiver
The FastAPI receiver is designed to catch the continuous integration test report webhook and save it locally as `test-report.json`.

**Step A: Start the FastAPI server**
Open a terminal in the root directory and run:

```bash
uvicorn receiver:app --reload --port 8000
```

**Step B: Start LocalTunnel to expose the server**
In a separate, new terminal, run LocalTunnel to allow GitHub Actions to reach your local server:

```bash
npx localtunnel --port 8000 --subdomain clear-moose-matter
```

*Keep both terminals running during the demonstration. Ensure the LocalTunnel URL matches the `RECEIVER_URL` secret configured in the GitHub repository.*

## 🌐 Deployment & CI/CD
- **Continuous Integration:** The pipeline (`.github/workflows/ci.yml`) automatically triggers on push, runs the Vitest suite, sends an email notification, and POSTs the JSON test report to the local receiver.
- **Conditional Deployment (Bonus Tasks):** If all tests pass, the static frontend is automatically built and deployed to GitHub Pages via the `gh-pages` branch. Test reports are also automatically emailed to the configured address.
