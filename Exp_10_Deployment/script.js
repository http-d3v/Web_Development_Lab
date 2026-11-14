/**
 * Experiment 10: Full-Stack Deployment Interactive Scripts
 * Student: Dev Kumar Tiwari (http-d3v | httpd3v)
 * 2nd Year B.Tech CSE (Data Science)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. CI/CD Pipeline Step Inspector
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  const stepDetailBox = document.getElementById('stepDetailBox');

  const stepDetails = {
    '1': {
      title: 'Stage 1: Version Control Commit & Push',
      body: 'Developer commits code changes cleanly with descriptive message format (e.g. feat(exp-10): ...). Executing "git push origin main" uploads the change to GitHub repository https://github.com/http-d3v/Web_Development_Lab.'
    },
    '2': {
      title: 'Stage 2: Webhook Handshake & Ingestion',
      body: 'GitHub issues a secure HTTPS POST webhook to Vercel with the commit SHA and author identity. Vercel automatically matches the repository to the corresponding project (@httpd3v) and allocates an isolated container sandbox.'
    },
    '3': {
      title: 'Stage 3: Automated Dependency & Build Execution',
      body: 'Vercel installs project dependencies (npm install) and runs the framework build script (e.g. "vite build" or "tsc"). Static assets are compiled into the dist/ or public/ output bundle.'
    },
    '4': {
      title: 'Stage 4: Cryptographic Environment Variable Injection',
      body: 'Production secrets (e.g., JWT_SECRET, PORT, API keys) configured in the Vercel Dashboard or .env are injected into runtime containers. Sensitive credentials are never committed into public git trees.'
    },
    '5': {
      title: 'Stage 5: Global Anycast CDN & Atomic Rollout',
      body: 'Compiled assets are distributed atomically to edge nodes worldwide. The production domain (exp-XX.vercel.app) is instantly aliased to the fresh deployment ID with zero downtime.'
    }
  };

  pipelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      pipelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const id = step.dataset.step;
      const data = stepDetails[id];
      if (data) {
        stepDetailBox.innerHTML = `
          <h4>${data.title}</h4>
          <p>${data.body}</p>
        `;
      }
    });
  });

  // 2. Interactive Persistent Checklist
  const STORAGE_KEY = 'btech_deployment_checklist_exp10';
  const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');

  // Load saved states
  let savedChecks = {};
  try {
    savedChecks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    savedChecks = {};
  }

  checkboxes.forEach(cb => {
    const id = cb.dataset.id;
    if (savedChecks[id]) {
      cb.checked = true;
    }

    cb.addEventListener('change', () => {
      savedChecks[id] = cb.checked;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedChecks));
      } catch (e) {
        console.error(e);
      }
    });
  });
});
