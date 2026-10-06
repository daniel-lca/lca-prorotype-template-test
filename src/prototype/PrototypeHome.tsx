import { Link } from 'react-router-dom';
import { Note } from '../components/Note';
import { Placeholder } from '../components/Placeholder';
import {
  flowScreens,
  flowStartRoute,
  flowsFor,
  shortcuts,
  standaloneScreens,
  userTypes,
  variantsOf,
} from './derive';
import { registry } from './registry';
import type { Flow, Screen, Status } from './types';
import { validateRegistry } from './validate';

// Prototype Home: Prototype Flows, All Prototype Screens, Developer shortcuts.
// Everything here is derived from src/prototype/registry.ts. Do not hardcode flows or screens in this file.

const linkClass =
  'rounded-sm underline underline-offset-2 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900';
const secondaryButtonClass =
  'inline-flex min-h-10 items-center rounded-sm border border-neutral-900 px-3 text-sm font-semibold hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900';
const buttonClass =
  'inline-flex min-h-10 items-center rounded-sm border border-neutral-900 bg-neutral-900 px-3 text-sm font-semibold text-white hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900';

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

function StatusTag({ status }: { status?: Status }) {
  if (!status) return null;
  return <span className="rounded-sm border border-neutral-300 px-1.5 text-xs text-neutral-600">{status.replace(/-/g, ' ')}</span>;
}

function OpenFlow({ flow, secondary = false }: { flow: Flow; secondary?: boolean }) {
  const route = flowStartRoute(flow);
  if (!route) return null;
  return (
    <Link to={route} className={secondary ? secondaryButtonClass : buttonClass}>
      Open flow
    </Link>
  );
}

function ScreenRow({ screen, step }: { screen: Screen; step?: number }) {
  const variants = variantsOf(screen.id);
  return (
    <li className="py-2">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {step !== undefined && <span className="w-6 shrink-0 text-sm tabular-nums text-neutral-500">{step}.</span>}
        <Link to={screen.route} className={`${linkClass} font-medium`}>
          {screen.name}
        </Link>
        <StatusTag status={screen.status} />
        {screen.shared && <span className="text-xs text-neutral-500">shared</span>}
        <code className="text-xs text-neutral-500 [overflow-wrap:anywhere]">{screen.route}</code>
      </div>
      {screen.description && <p className={`text-sm text-neutral-600 ${step !== undefined ? 'pl-9' : ''}`}>{screen.description}</p>}
      {variants.length > 0 && (
        <ul className={`mt-1 space-y-1 text-sm ${step !== undefined ? 'pl-9' : ''}`}>
          {variants.map((v) => (
            <li key={v.id} className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-neutral-500">State:</span>
              <Link to={v.route} className={linkClass}>
                {v.variant ?? v.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function PrototypeHome() {
  const issues = validateRegistry();
  const types = userTypes();
  const standalone = standaloneScreens();
  const devShortcuts = shortcuts();
  const shortcutGroups = [...new Set(devShortcuts.map((s) => s.group ?? 'General'))];
  const screenById = new Map(registry.screens.map((s) => [s.id, s]));
  const isEmpty = registry.flows.length === 0 && registry.screens.length === 0;

  if (issues.length > 0) console.error('Prototype registry issues:\n' + issues.join('\n'));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-10">
        <p className="text-sm text-neutral-500">Prototype home</p>
        <h1 className="text-3xl font-semibold">{registry.name}</h1>
        {!isEmpty && (
          <p className="mt-2 text-neutral-600">
            {plural(types.length, 'user type')} · {plural(registry.flows.length, 'flow')} · {plural(registry.screens.length, 'screen')}
          </p>
        )}
      </header>

      {issues.length > 0 && (
        <section aria-labelledby="issues" className="mb-10 border-2 border-neutral-900 p-4">
          <h2 id="issues" className="font-semibold">
            Registry issues ({issues.length})
          </h2>
          <p className="text-sm text-neutral-600">Fix these in src/prototype/registry.ts before calling the task done.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm [overflow-wrap:anywhere]">
            {issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </section>
      )}

      {isEmpty ? (
        <section className="flex flex-col gap-6">
          <p className="text-neutral-600">
            Nothing is built yet. Start the intake in AI Studio with the prompt in{' '}
            <code className="rounded-sm bg-neutral-200 px-1">KICKOFF_PROMPT.md</code>.
          </p>
          <Placeholder label="Flows and screens appear here" className="h-48" />
          <Note>This page is generated from src/prototype/registry.ts. Register every screen there.</Note>
        </section>
      ) : (
        <>
          <section aria-labelledby="flows" className="mb-14">
            <h2 id="flows" className="mb-6 text-2xl font-semibold">
              Prototype flows
            </h2>
            {types.map((type) => (
              <div key={type.id} className="mb-8">
                <h3 className="text-lg font-semibold">{type.name}</h3>
                <p className="mb-3 text-sm text-neutral-600">{type.description}</p>
                <ul className="grid gap-4 md:grid-cols-2">
                  {flowsFor(type.id).map((flow) => {
                    const steps = flowScreens(flow);
                    return (
                      <li key={flow.id} className="flex flex-col gap-3 border border-neutral-300 bg-white p-4">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h4 className="font-semibold">{flow.name}</h4>
                          <span className="text-sm text-neutral-500">{plural(steps.length, 'step')}</span>
                          <StatusTag status={flow.status} />
                        </div>
                        <p className="text-sm text-neutral-600">{flow.description}</p>
                        <p className="text-sm text-neutral-500">{steps.map((s) => s.name).join(' → ')}</p>
                        <div>
                          <OpenFlow flow={flow} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </section>

          <section aria-labelledby="screens" className="mb-14">
            <h2 id="screens" className="mb-6 text-2xl font-semibold">
              All prototype screens
            </h2>
            {types.map((type) => (
              <div key={type.id} className="mb-8">
                <h3 className="mb-3 text-lg font-semibold">{type.name}</h3>
                {flowsFor(type.id).map((flow) => (
                  <div key={flow.id} className="mb-6 border-l-2 border-neutral-300 pl-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold">{flow.name}</h4>
                      <OpenFlow flow={flow} secondary />
                    </div>
                    <p className="text-sm text-neutral-600">{flow.description}</p>
                    <ol className="mt-2 divide-y divide-neutral-200">
                      {flowScreens(flow).map((screen, i) => (
                        <ScreenRow key={screen.id} screen={screen} step={i + 1} />
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            ))}
            {standalone.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold">Standalone screens</h3>
                <p className="mb-2 text-sm text-neutral-600">Utility screens that are not part of a user journey.</p>
                <ul className="divide-y divide-neutral-200">
                  {standalone.map((screen) => (
                    <ScreenRow key={screen.id} screen={screen} />
                  ))}
                </ul>
              </div>
            )}
          </section>

          {devShortcuts.length > 0 && (
            <section aria-labelledby="shortcuts">
              <h2 id="shortcuts" className="mb-6 text-2xl font-semibold">
                Developer shortcuts
              </h2>
              {shortcutGroups.map((group) => (
                <div key={group} className="mb-6">
                  <h3 className="mb-2 font-semibold">{group}</h3>
                  <ul className="space-y-2">
                    {devShortcuts
                      .filter((s) => (s.group ?? 'General') === group)
                      .map((shortcut) => {
                        const screen = screenById.get(shortcut.screenId);
                        if (!screen) return null;
                        return (
                          <li key={shortcut.id} className="flex flex-wrap items-baseline gap-x-3">
                            <Link to={screen.route} className={`${linkClass} font-medium`}>
                              {shortcut.label}
                            </Link>
                            {shortcut.description && <span className="text-sm text-neutral-600">{shortcut.description}</span>}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}
