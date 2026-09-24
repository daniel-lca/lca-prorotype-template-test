import { Note } from './components/Note';
import { Placeholder } from './components/Placeholder';

// Placeholder screen. The AI builder replaces this after the brief in project/BRIEF.md is confirmed.
export default function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 p-6">
      <h1 className="text-2xl font-semibold">Lo-fi prototype template</h1>
      <p className="text-neutral-600">
        Nothing is built yet. Start the intake in AI Studio with the prompt in{' '}
        <code className="rounded bg-neutral-200 px-1">KICKOFF_PROMPT.md</code>.
      </p>
      <Placeholder label="Your first screen goes here" className="h-48" />
      <Note>This screen is replaced once the brief is confirmed.</Note>
    </main>
  );
}
