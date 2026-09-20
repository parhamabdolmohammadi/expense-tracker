---
name: deploy
description: Runs this project's deploy procedure — lint (the correctness gate, since this repo has no test suite yet), production build, then publish dist/ to a local staging folder. Use whenever the user says "deploy", "ship this", "push to staging", "cut a build for staging", or asks to get the current code into the staging area, even if they don't name these exact steps.
---

# Deploy

Deploys the expense-tracker-starter app to the local staging area. Three steps,
run strictly in order — each one gates the next, so a failure at any step stops
the deploy instead of pushing broken or unbuilt code to staging.

## Steps

### 1. Run the correctness gate

```
npm run lint
```

This repo has no test suite configured yet (see CLAUDE.md), so lint is standing
in for "run all tests" until a real test runner is added. If lint fails, **stop
here** — report the lint errors to the user and do not proceed to the build.
Don't try to auto-fix the errors yourself unless the user asks; just report them.

### 2. Build the production bundle

```
npm run build
```

This writes the production bundle to `dist/`. If the build fails, **stop
here** — report the build error. Do not touch the staging folder if the build
didn't succeed, since there'd be nothing valid to publish.

### 3. Publish to the staging folder

Default destination: `../expense-tracker-staging` (a sibling directory to the
project root, i.e. `expense-tracker-starter/../expense-tracker-staging`).

If the user gives you a different destination (an argument, or they just say
"deploy to X"), use that path instead of the default for this run only — it
doesn't change the default for next time unless they ask you to update this
file.

Before copying, check what's already at the destination:

- **Doesn't exist yet** — create it, then copy `dist/`'s contents in. No
  confirmation needed.
- **Exists and looks like a previous build output** (e.g. it contains
  `index.html` plus an `assets/` folder, and nothing that looks like unrelated
  personal or project files) — clear it out and copy the fresh `dist/`
  contents in. This is the normal, expected case for a repeat deploy and
  doesn't need confirmation.
- **Exists but doesn't look like a previous build** (unexpected file types,
  looks like someone's working directory, has content you can't confidently
  identify as old build output) — stop and ask the user to confirm before
  deleting anything there. Show them what's currently in the folder so they
  can decide.

Copy every file from `dist/` into the destination (mirror it — the
destination should end up matching `dist/` exactly, with nothing stale left
over from a previous build).

## Reporting back

After a successful deploy, tell the user the staging path and roughly what
was published (e.g. file count, or just confirm `index.html` + `assets/` are
there). If any step failed, name the exact step that failed and show the
relevant error output — don't guess at a fix unless asked.
