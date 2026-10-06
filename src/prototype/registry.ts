import type { Registry } from './types';

// THE single source of truth for user types, flows, screens, order, routes, and shortcuts.
// Prototype Home, All Prototype Screens, flow navigation, and routing are all derived from this file.
// Never list screens or flows anywhere else. See guidelines/04-prototype-system.md.
//
// Example (delete once real entries exist):
//
//   import { WelcomeScreen } from '../screens/WelcomeScreen';
//
//   userTypes: [{ id: 'customer', name: 'Customer', description: 'Books appointments', order: 1 }],
//   flows: [{
//     id: 'customer-onboarding', userTypeId: 'customer', name: 'Account creation',
//     description: 'Create and configure a new customer account.',
//     screenIds: ['customer-onboarding-welcome', 'customer-onboarding-create-account'],
//     startScreenId: 'customer-onboarding-welcome', status: 'draft', order: 1,
//   }],
//   screens: [{
//     id: 'customer-onboarding-welcome', userTypeId: 'customer', flowId: 'customer-onboarding',
//     name: 'Welcome', route: '/prototype/customer/onboarding/welcome', component: WelcomeScreen,
//   }, …],
//   shortcuts: [{ id: 'empty-dashboard', label: 'Empty dashboard', screenId: '…', order: 1 }],

export const registry: Registry = {
  name: 'Untitled prototype',
  userTypes: [],
  flows: [],
  screens: [],
  shortcuts: [],
};
