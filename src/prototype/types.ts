import type { ComponentType } from 'react';

// Data model for the prototype registry. See guidelines/05-prototype-schema.md.

export type Status = 'planned' | 'draft' | 'in-progress' | 'ready-for-review' | 'approved' | 'deprecated';

export interface UserType {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface Flow {
  id: string;
  userTypeId: string;
  name: string;
  description: string;
  /** The single source of screen order. Step numbers are derived from this array. */
  screenIds: string[];
  startScreenId: string;
  status?: Status;
  order: number;
}

export interface Screen {
  id: string;
  name: string;
  description?: string;
  /** Stable direct route, e.g. /prototype/customer/onboarding/create-account */
  route: string;
  component: ComponentType;
  /** Required for every screen except standalone ones. */
  userTypeId?: string;
  /** The flow that owns this screen. Omit only for standalone screens. */
  flowId?: string;
  /** Design-system playground, global error reference, etc. Must be explicit. */
  standalone?: boolean;
  /** Set when this screen also appears in other flows' screenIds on purpose. */
  shared?: boolean;
  /** Directly openable state of another screen (validation-error, empty, …). Not listed in screenIds. */
  parentScreenId?: string;
  variant?: string;
  status?: Status;
  tags?: string[];
}

export interface Shortcut {
  id: string;
  label: string;
  screenId: string;
  description?: string;
  group?: string;
  order: number;
}

export interface Registry {
  /** Product name shown on Prototype Home. */
  name: string;
  userTypes: UserType[];
  flows: Flow[];
  screens: Screen[];
  shortcuts: Shortcut[];
}
