# Experiment 01: Git, GitHub Version Control & Static Hosting

**Course:** Web Designing Lab  
**Subject Code:** JCS 308/408 (LTP: 0-1-2)  
**Student:** Dev Kumar Tiwari ([@http-d3v](https://github.com/http-d3v) &bull; [Vercel @httpd3v](https://vercel.com/httpd3v))  
**Academic Year:** 2nd Year B.Tech Computer Science & Engineering (Data Science)  
**Institution:** JSS University, Noida  

---

## 1. Aim

To set up a local Git repository for a web project, connect it to GitHub, implement feature branch workflows, resolve and merge code updates into the main production branch, and configure automated static site hosting using GitHub Pages.

---

## 2. Theory & Core Concepts

### What is Git?
Git is a distributed version control system (DVCS) designed to track file revisions through directed acyclic graphs (DAGs) of immutable snapshots. Unlike centralized VCS tools that store diff deltas, Git captures the entire state of the project tree in SHA-1 content-addressable objects (`blobs`, `trees`, `commits`).

### Key Architecture Components
1. **Working Directory:** The actual local filesystem directory containing project files.
2. **Staging Area (Index):** An intermediate holding buffer (`.git/index`) where changes are prepared and organized before creating a commit.
3. **Local Repository:** The collection of committed snapshots stored inside the hidden `.git/` folder.
4. **Remote Repository (GitHub):** The hosted cloud repository that facilitates backup, synchronization, and team collaboration.

### Branching & Merging
- **Branch:** A lightweight movable pointer to a specific commit hash. Creating a branch takes $O(1)$ constant time (writing a 41-byte SHA hash into `.git/refs/heads/<branch>`).
- **HEAD:** A reference pointer inside `.git/HEAD` indicating the currently active branch or commit.
- **Fast-Forward Merge:** Occurs when the target branch has no new commits since the feature branch diverged; Git simply advances the target branch pointer to the feature commit.
- **Three-Way Merge:** Used when both the main branch and the feature branch have diverged with independent commits. Git finds the common ancestor and produces a new merge commit with two parents.

### GitHub Pages Static Hosting
GitHub Pages turns a repository branch or `/docs` directory into a globally distributed static web server with automatic SSL certificate provisioning, CDN caching, and custom domain support.

---

## 3. Step-by-Step Procedure & Commands Executed

### Step 3.1: Repository Initialization
```bash
# Initialize git repository with main as default branch
git init -b main

# Configure local user credentials
git config user.name "Dev Kumar Tiwari"
git config user.email "devkumartiwari563@gmail.com"

# Create .gitignore for web projects
cat <<EOF > .gitignore
node_modules/
.DS_Store
*.log
.env
.vercel
EOF
```

### Step 3.2: Staging & Initial Commit
```bash
# Stage all files
git add .

# Create the initial commit
git commit -m "feat: initial project structure with HTML5, CSS3, and JS"
```

### Step 3.3: Connecting to GitHub Remote
```bash
# Add GitHub remote repository URL
git remote add origin https://github.com/http-d3v/Web_Development_Lab.git

# Verify remote configuration
git remote -v

# Push local main branch and set upstream tracking
git push -u origin main
```

### Step 3.4: Creating & Developing on a Feature Branch
```bash
# Create and switch to an isolated feature branch
git checkout -b feature/navigation-bar

# Verify active branch
git branch

# Edit navigation files, stage, and commit
git add index.html style.css
git commit -m "feat(nav): add responsive header and navigation links"
```

### Step 3.5: Merging Changes into Main
```bash
# Switch back to main branch
git checkout main

# Merge feature branch into main
git merge feature/navigation-bar

# Push updated main branch to GitHub
git push origin main

# Clean up merged local branch
git branch -d feature/navigation-bar
```

### Step 3.6: Configuring GitHub Pages
1. Open the repository on GitHub: `https://github.com/http-d3v/Web_Development_Lab`.
2. Go to **Settings** &rarr; **Pages** (under the "Code and automation" section).
3. Under **Build and deployment &gt; Source**, choose **Deploy from a branch**.
4. Select branch **`main`** and directory **`/ (root)`**.
5. Click **Save**.
6. The site is built and published automatically by GitHub Actions.

---

## 4. Verification & Output

| Action | Command | Verified Outcome |
| :--- | :--- | :--- |
| **Branch Check** | `git branch` | Displayed `* main` as current active branch |
| **Log History** | `git log --oneline --graph` | Clean linear commit history showing merges |
| **Remote Status** | `git status` | `Your branch is up to date with 'origin/main'. Nothing to commit.` |
| **GitHub Pages** | Browser check | Live at `https://http-d3v.github.io/Web_Development_Lab/` |
| **Vercel Mirror** | Browser check | Live at `https://exp-01-git-github.vercel.app` |

---

## 5. Learning Outcomes

1. Gained hands-on experience initializing Git repositories, inspecting file status, and maintaining clean commit histories.
2. Learned how isolated feature branches protect production codebases from broken commits during active development.
3. Successfully practiced merging strategies and resolving potential merge conflicts.
4. Understood the automated CI/CD pipeline powering GitHub Pages for static site deployment.
