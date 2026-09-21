# Mandatory Git Push and Deployment Safety Rule

The live website is: **https://maint-dept.github.io/ERP/**

## Core Requirement: Incremental Evolution Only
- Always build strictly upon the current/latest codebase.
- NEVER replace, re-import, reset, or overwrite the existing project with an older copy, backup ZIP, or external export.
- NEVER revert Git history to an older commit to implement changes.
- Always preserve existing features, bug fixes, configurations, Firebase sync settings, authentication logic, roles, permissions, and user data.
- Dual-directory policy: Changes made in `public/` must remain mirrored with root files so root files never hold stale copies.
- Check diffs with `git diff` before every commit to ensure no regressions or deletions.
