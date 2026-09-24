# LCA lo-fi prototype template

Starting point for low-fidelity clickable prototypes built in **Google AI Studio (Build mode)**,
kept in GitHub and deployed to **Vercel**.

## How to start a new prototype

1. **Create the repo** from this template (GitHub → *Use this template*, or copy the files into a new repo).
2. **Import it in AI Studio**: Build → `+` in the prompt box → *Import from GitHub* → pick the repo.
3. **Paste the kickoff prompt** from [`KICKOFF_PROMPT.md`](KICKOFF_PROMPT.md) as your first message.
   AI Studio reads the guidelines and runs the intake in three phases:
   1. Project type & setup (category, breakpoints, fidelity, navigation, language)
   2. The product (users, core flows, screens, content, interactions)
   3. Scope & references
4. **Confirm the brief** that AI Studio writes to [`project/BRIEF.md`](project/BRIEF.md). It builds after you say "go".
5. **Sync to GitHub** from AI Studio (Settings → GitHub → push).
6. **Deploy on Vercel**: import the repo, preset *Vite*. Every push redeploys.

## What's in here

| Path | Purpose |
|---|---|
| `AGENTS.md` | Entry point for the AI: rules and reading order |
| `KICKOFF_PROMPT.md` | First message to paste in AI Studio |
| `guidelines/` | Intake questions, lo-fi visual rules, tech & deploy rules |
| `project/BRIEF.md` | The brief, filled in during intake |
| `src/components/` | `Placeholder`, `Note`, `PhoneFrame` lo-fi building blocks |

## Local dev

```bash
npm install
npm run dev
```
