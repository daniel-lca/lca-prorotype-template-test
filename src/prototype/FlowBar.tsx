import { useState } from 'react';
import { Link } from 'react-router-dom';
import { stepInfo } from './derive';
import { registry } from './registry';
import type { Screen } from './types';

// Thin prototype-tooling bar above every registered screen: where am I, previous/next step, back to home.
// It is tooling, not product UI, so it stays grayscale at every fidelity and can be collapsed for demos.

const STORAGE_KEY = 'prototype-flowbar-hidden';
const linkClass =
  'rounded-sm px-1 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white';

function readHidden() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function FlowBar({ screen }: { screen: Screen }) {
  const [hidden, setHidden] = useState(readHidden);
  const info = stepInfo(screen);
  const userType = registry.userTypes.find((u) => u.id === screen.userTypeId);

  const toggle = () => {
    setHidden(!hidden);
    try {
      localStorage.setItem(STORAGE_KEY, hidden ? '0' : '1');
    } catch {
      // Storage unavailable: the toggle still works for this page view.
    }
  };

  if (hidden) {
    return (
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-3 left-3 z-50 rounded-sm bg-neutral-900 px-3 py-2 text-xs text-white opacity-60 hover:opacity-100 focus-visible:opacity-100 print:hidden"
      >
        Show prototype bar
      </button>
    );
  }

  return (
    <nav
      aria-label="Prototype navigation"
      className="sticky top-0 z-50 flex flex-wrap items-center gap-x-4 gap-y-1 bg-neutral-900 px-3 py-1.5 text-xs text-white print:hidden"
    >
      <Link to="/" className={linkClass}>
        ← Prototype home
      </Link>
      <span className="text-neutral-400">
        {[userType?.name, info?.flow.name ?? (screen.standalone ? 'Standalone' : undefined)].filter(Boolean).join(' · ')}
      </span>
      <span aria-current="page" className="font-semibold">
        {info && info.step > 0 && `Step ${info.step} of ${info.total}: `}
        {screen.parentScreenId ? `${screen.name} (${screen.variant ?? 'state'})` : screen.name}
      </span>
      <span className="ml-auto flex items-center gap-2">
        {info?.prev && (
          <Link to={info.prev.route} className={linkClass}>
            ‹ {info.prev.name}
          </Link>
        )}
        {info?.next && (
          <Link to={info.next.route} className={linkClass}>
            {info.next.name} ›
          </Link>
        )}
        <button type="button" onClick={toggle} className={`${linkClass} text-neutral-400`}>
          Hide
        </button>
      </span>
    </nav>
  );
}
