import { registry } from './registry';
import type { Flow, Screen, UserType } from './types';

// Read-only views over the registry. Counts, step numbers, and grouping are always computed, never stored.

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export const screenById = (id: string) => registry.screens.find((s) => s.id === id);
export const flowById = (id: string) => registry.flows.find((f) => f.id === id);

export function userTypes(): UserType[] {
  return [...registry.userTypes].sort(byOrder);
}

export function flowsFor(userTypeId: string): Flow[] {
  return registry.flows.filter((f) => f.userTypeId === userTypeId).sort(byOrder);
}

export function flowScreens(flow: Flow): Screen[] {
  return flow.screenIds.map(screenById).filter((s): s is Screen => Boolean(s));
}

export function variantsOf(screenId: string): Screen[] {
  return registry.screens.filter((s) => s.parentScreenId === screenId);
}

export function standaloneScreens(): Screen[] {
  return registry.screens.filter((s) => s.standalone);
}

export function shortcuts() {
  return [...registry.shortcuts].sort(byOrder);
}

export function flowStartRoute(flow: Flow): string | undefined {
  return screenById(flow.startScreenId)?.route;
}

/** Where a screen sits in its own flow. Variants report their parent's step. */
export function stepInfo(screen: Screen) {
  const flow = screen.flowId ? flowById(screen.flowId) : undefined;
  if (!flow) return undefined;
  const anchorId = screen.parentScreenId ?? screen.id;
  const index = flow.screenIds.indexOf(anchorId);
  const prev = index > 0 ? screenById(flow.screenIds[index - 1]) : undefined;
  const next = index >= 0 && index < flow.screenIds.length - 1 ? screenById(flow.screenIds[index + 1]) : undefined;
  return { flow, step: index + 1, total: flow.screenIds.length, prev, next };
}
