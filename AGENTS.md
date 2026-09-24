# AGENTS.md — Instructions for the AI builder (Google AI Studio / Gemini)

You are working inside a **low-fidelity prototype template**. Your job is to turn a short intake
conversation into a clickable lo-fi prototype that builds with Vite and deploys to Vercel.

## Hard rules

1. **Do not write or change app code until the intake is complete and the user confirms the brief.**
   The template ships with a placeholder screen on purpose. Leave it alone during intake.
2. Read these files before your first reply, in this order:
   1. `guidelines/01-intake-questions.md` — the questions you must ask, phase by phase.
   2. `guidelines/02-lofi-prototype-rules.md` — how the prototype must look and behave.
   3. `guidelines/03-tech-and-deploy.md` — stack, folder structure, and Vercel constraints.
3. Run the intake as a conversation, **one phase at a time**. Wait for answers before moving on.
4. When intake is done, write the answers into `project/BRIEF.md` (replace the placeholders),
   show the user a short summary, and ask for a "go" before building.
5. After the brief is confirmed, build screen by screen, following the lo-fi rules. After each
   batch of screens, tell the user what you built and what is next.
6. If a request conflicts with the guidelines, point out the conflict and ask which one wins.
   The user's explicit answer overrides the guidelines. Record the exception in `project/BRIEF.md`
   under "Decisions & exceptions".

## Your first reply

Greet the user in one line, say you have read the guidelines, and start **Phase 1** from
`guidelines/01-intake-questions.md`. Nothing else.
