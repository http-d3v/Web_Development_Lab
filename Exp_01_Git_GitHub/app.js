/**
 * ============================================================================
 * EXPERIMENT 01: GIT & GITHUB WORKFLOW SIMULATOR
 * Student: Dev Kumar Tiwari (GitHub: @http-d3v | Vercel: @httpd3v)
 * Academic: 2nd Year B.Tech CSE (Data Science)
 * Course: Web Designing Lab (JCS 308/408)
 * ============================================================================
 */

(function () {
  'use strict';

  // State
  const state = {
    currentBranch: 'main',
    branches: ['main'],
    commits: [
      { id: 'c1', hash: 'e4f1a20', message: 'Initial commit (README & index.html)', branch: 'main', x: 70, y: 50 },
      { id: 'c2', hash: '8b3c9d1', message: 'Add basic HTML structure & CSS', branch: 'main', x: 190, y: 50 }
    ],
    nextHashIndex: 3,
    pagesDeployed: false
  };

  const HASHES = ['3d4f8e2', 'a91b2c4', 'f7c5e19', '5e2a8d3', '9c0b1f4', 'b2a7e61'];

  // DOM Elements
  const svg = document.getElementById('gitGraphSvg');
  const term = document.getElementById('terminalLog');
  const branchPills = document.getElementById('branchPills');

  // Terminal logging
  function logTerm(text, type = 'cmd') {
    if (!term) return;
    const div = document.createElement('div');
    div.className = `terminal-line ${type}`;
    div.textContent = text;
    term.appendChild(div);
    term.scrollTop = term.scrollHeight;
  }

  // Render branch pills
  function renderBranchPills() {
    if (!branchPills) return;
    branchPills.innerHTML = '';
    state.branches.forEach((b) => {
      const span = document.createElement('span');
      span.className = `branch-pill ${b === state.currentBranch ? 'current' : ''}`;
      span.textContent = (b === state.currentBranch ? 'HEAD -> ' : '') + b;
      branchPills.appendChild(span);
    });
  }

  // Render SVG Graph
  function renderGraph() {
    if (!svg) return;
    svg.innerHTML = '';

    // Defs for arrows / markers
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#8F827A"/>
      </marker>
    `;
    svg.appendChild(defs);

    // Draw branch baseline guide lines
    const mainLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    mainLine.setAttribute('x1', '30');
    mainLine.setAttribute('y1', '50');
    mainLine.setAttribute('x2', '580');
    mainLine.setAttribute('y2', '50');
    mainLine.setAttribute('stroke', '#E7DECF');
    mainLine.setAttribute('stroke-dasharray', '4 4');
    mainLine.setAttribute('stroke-width', '1.5');
    svg.appendChild(mainLine);

    if (state.branches.includes('feature/navbar')) {
      const featLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      featLine.setAttribute('x1', '190');
      featLine.setAttribute('y1', '110');
      featLine.setAttribute('x2', '580');
      featLine.setAttribute('y2', '110');
      featLine.setAttribute('stroke', '#E7DECF');
      featLine.setAttribute('stroke-dasharray', '4 4');
      featLine.setAttribute('stroke-width', '1.5');
      svg.appendChild(featLine);
    }

    // Connect commits with lines
    for (let i = 1; i < state.commits.length; i++) {
      const prev = state.commits[i - 1];
      const curr = state.commits[i];

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let d = '';

      if (prev.y === curr.y) {
        d = `M ${prev.x} ${prev.y} L ${curr.x} ${curr.y}`;
      } else {
        // Curve between branches
        const midX = (prev.x + curr.x) / 2;
        d = `M ${prev.x} ${prev.y} C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
      }

      line.setAttribute('d', d);
      line.setAttribute('stroke', curr.branch === 'main' ? '#A25E3E' : '#48604F');
      line.setAttribute('stroke-width', '2.5');
      line.setAttribute('fill', 'none');
      svg.appendChild(line);
    }

    // Render commit circles and labels
    state.commits.forEach((c, idx) => {
      const isHead = idx === state.commits.length - 1;
      const isMain = c.branch === 'main';

      // Outer glow for HEAD
      if (isHead) {
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', c.x);
        glow.setAttribute('cy', c.y);
        glow.setAttribute('r', '13');
        glow.setAttribute('fill', isMain ? 'rgba(162, 94, 62, 0.2)' : 'rgba(72, 96, 79, 0.2)');
        svg.appendChild(glow);
      }

      // Commit Circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', c.x);
      circle.setAttribute('cy', c.y);
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', isMain ? '#A25E3E' : '#48604F');
      circle.setAttribute('stroke', '#FFFFFF');
      circle.setAttribute('stroke-width', '2');
      circle.style.cursor = 'pointer';

      // Tooltip title
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = `[${c.hash}] ${c.message} (${c.branch})`;
      circle.appendChild(title);
      svg.appendChild(circle);

      // Hash Label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', c.x);
      text.setAttribute('y', c.y - 12);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.setAttribute('font-size', '10');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', '#2C2522');
      text.textContent = c.hash;
      svg.appendChild(text);

      // Branch Label on HEAD
      if (isHead) {
        const headBadge = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        headBadge.setAttribute('x', c.x);
        headBadge.setAttribute('y', c.y + 24);
        headBadge.setAttribute('text-anchor', 'middle');
        headBadge.setAttribute('font-family', 'Plus Jakarta Sans, sans-serif');
        headBadge.setAttribute('font-size', '10');
        headBadge.setAttribute('font-weight', '700');
        headBadge.setAttribute('fill', isMain ? '#A25E3E' : '#48604F');
        headBadge.textContent = `HEAD (${state.currentBranch})`;
        svg.appendChild(headBadge);
      }
    });

    renderBranchPills();
  }

  // Setup Actions
  window.gitAction = function (action) {
    switch (action) {
      case 'branch': {
        if (!state.branches.includes('feature/navbar')) {
          state.branches.push('feature/navbar');
        }
        state.currentBranch = 'feature/navbar';
        logTerm('$ git checkout -b feature/navbar');
        logTerm("Switched to a new branch 'feature/navbar'", 'info');
        renderGraph();
        break;
      }

      case 'commit': {
        const lastCommit = state.commits[state.commits.length - 1];
        const nextX = Math.min(lastCommit.x + 95, 540);
        const y = state.currentBranch === 'main' ? 50 : 110;
        const hash = HASHES[(state.nextHashIndex++) % HASHES.length];

        const msg = state.currentBranch === 'feature/navbar' 
          ? 'Add responsive navigation component & styles'
          : 'Update documentation & fix mobile styling';

        state.commits.push({
          id: 'c' + Date.now(),
          hash,
          message: msg,
          branch: state.currentBranch,
          x: nextX,
          y
        });

        logTerm(`$ git add . && git commit -m "${msg}"`);
        logTerm(`[${state.currentBranch} ${hash}] ${msg}`, 'success');
        logTerm(' 2 files changed, 48 insertions(+), 6 deletions(-)', 'info');
        renderGraph();
        break;
      }

      case 'checkout_main': {
        state.currentBranch = 'main';
        logTerm('$ git checkout main');
        logTerm("Switched to branch 'main'", 'info');
        logTerm("Your branch is up to date with 'origin/main'.", 'info');
        renderGraph();
        break;
      }

      case 'merge': {
        if (!state.branches.includes('feature/navbar')) {
          logTerm('$ git merge feature/navbar');
          logTerm("fatal: 'feature/navbar' - not something we can merge", 'cmd');
          return;
        }

        state.currentBranch = 'main';
        const lastCommit = state.commits[state.commits.length - 1];
        const nextX = Math.min(lastCommit.x + 95, 560);
        const hash = HASHES[(state.nextHashIndex++) % HASHES.length];

        state.commits.push({
          id: 'c' + Date.now(),
          hash,
          message: "Merge branch 'feature/navbar' into main",
          branch: 'main',
          x: nextX,
          y: 50
        });

        logTerm('$ git merge feature/navbar');
        logTerm("Updating 8b3c9d1.." + hash, 'info');
        logTerm('Fast-forward (or 3-way merge commit created)', 'success');
        logTerm(' navbar.html | 32 ++++++++++++++++++++++++++++++++', 'info');
        logTerm(' navbar.css  | 45 +++++++++++++++++++++++++++++++++++++++++++++', 'info');
        logTerm(' 2 files changed, 77 insertions(+)', 'info');
        renderGraph();
        break;
      }

      case 'push': {
        logTerm('$ git push -u origin main');
        logTerm('Enumerating objects: 15, done.', 'info');
        logTerm('Counting objects: 100% (15/15), done.', 'info');
        logTerm('Compressing objects: 100% (11/11), done.', 'info');
        logTerm('Writing objects: 100% (15/15), 3.42 KiB | 3.42 MiB/s, done.', 'info');
        logTerm('Total 15 (delta 4), reused 0 (delta 0)', 'info');
        logTerm('To https://github.com/http-d3v/Web_Development_Lab.git', 'success');
        logTerm(' * [new branch]      main -> main', 'success');
        logTerm("Branch 'main' set up to track remote branch 'main' from 'origin'.", 'success');
        break;
      }

      case 'pages': {
        state.pagesDeployed = true;
        logTerm('[GitHub Actions] Build & Deployment Started...');
        logTerm('Artifact uploaded: static HTML, CSS, JavaScript (Exp 01 bundle)', 'info');
        logTerm('Pages deployment complete!', 'success');
        logTerm('Live URL: https://http-d3v.github.io/Web_Development_Lab/', 'success');
        alert('GitHub Pages publication simulated successfully!\nLive endpoint: https://http-d3v.github.io/Web_Development_Lab/');
        break;
      }

      case 'reset': {
        state.currentBranch = 'main';
        state.branches = ['main'];
        state.commits = [
          { id: 'c1', hash: 'e4f1a20', message: 'Initial commit (README & index.html)', branch: 'main', x: 70, y: 50 },
          { id: 'c2', hash: '8b3c9d1', message: 'Add basic HTML structure & CSS', branch: 'main', x: 190, y: 50 }
        ];
        state.nextHashIndex = 3;
        term.innerHTML = '';
        logTerm('# Repository reset to clean initial state.');
        logTerm('$ git status');
        logTerm("On branch main. Nothing to commit, working tree clean.", 'info');
        renderGraph();
        break;
      }
    }
  };

  // Copy code snippet helper
  window.copySnippet = function (btn, elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText || el.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = orig;
      }, 1500);
    });
  };

  // Initial draw on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    logTerm('# Terminal session started. Workspace: ~/Web_Development_Lab');
    logTerm('$ git status');
    logTerm("On branch main. Nothing to commit, working tree clean.", 'info');
    renderGraph();
  });
})();
