# Mandatory Git Push and Deployment Safety Rule

The live website is: **https://maint-dept.github.io/ERP/**

## 1. Single Authoritative Source of Truth: `public/`
- **`public/` is the ONLY canonical source of truth** for all frontend assets (`public/index.html`, `public/js/`, `public/css/`, `public/lib/`, `public/data/`).
- GitHub Actions deployment (`.github/workflows/deploy.yml`) builds and deploys `./public`.
- The local server (`server.js`) serves directly from `./public`.
- **Absolute Rule**: All feature additions, bug fixes, UI updates, and permission changes MUST be made directly in `public/`.
- Root directory files are never to be edited directly and MUST NEVER be copied into `public/`.

## 2. Strict Incremental Evolution Only
- Always build strictly upon the current/latest codebase (`HEAD` on `main`).
- NEVER replace, re-import, reset, or overwrite the existing project with an older copy, backup ZIP, or external export.
- NEVER revert Git history to an older commit to implement changes.
- Always preserve existing features, bug fixes, configurations, Firebase sync settings, authentication logic, roles, permissions, and user data.

## 3. Strict Pre-Push Protocol
1. Check diffs with `git diff` before every commit to ensure no regressions, accidental deletions, or reverts.
2. Run script syntax checks (`node --check public/js/...`).
3. Commit with a clear, descriptive message and push to `origin/main`.
4. Verify live deployment on GitHub Pages.

---
**Core Rule (Strict & Immutable)**:  
`Current Latest Code in public/ → New Change in public/ → Preserve All Previous Changes → Test → Git Diff Check → Commit → Push → Live Verify`
