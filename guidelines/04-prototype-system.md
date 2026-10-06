# 04 — Prototype system

> **In this template:** the registry, Prototype Home, and flow navigation already exist in `src/prototype/`.
> Prototype Home lives at `/`. See the "In this template" table in `05-prototype-schema.md`.

## 1. Purpose

Every prototype project must provide a navigable overview of the work that has been created.

The system has three goals:

1. Make it easy for stakeholders to understand the available user journeys.
2. Make it easy for designers and developers to find every prototype screen.
3. Make it difficult for AI-generated work to become disconnected, duplicated, or forgotten.

The prototype is therefore both:

- an interactive product prototype
- a structured documentation layer for the prototype itself

---

## 2. Required Prototype Home

Every project must have a Prototype Home page.

The exact visual design may adapt to the project's design language, but the information architecture must contain the following areas.

### A. Prototype Flows

A high-level view of complete user journeys.

Flows must be grouped by **user type**.

Each flow entry should show enough information to understand what it contains without opening it.

Recommended content:

- flow name
- short description
- user type
- number of steps/screens
- ordered step names or a concise flow preview
- status when useful
- `Open Flow` action

`Open Flow` must open the defined first screen of that flow.

A flow must never point to an arbitrary screen simply because that route currently exists.

### B. All Prototype Screens

A complete index of prototype screens.

Hierarchy:

`User Type → Flow → Screen`

Each flow group should include:

- flow title
- short explanation
- ordered screens
- step numbers when the flow is sequential
- direct link to each screen
- direct `Open Flow` action when useful

This section is the exhaustive prototype inventory.

If a screen exists in the prototype and belongs to a flow, it must appear here.

### C. Developer Shortcuts

Optional but recommended for larger prototypes.

Shortcuts may include:

- direct links to frequently tested screens
- edge cases
- alternate states
- error states
- empty states
- loading states
- modal/drawer examples
- role-specific entry points

Developer shortcuts must reference the same registered screens. They must not create a second screen catalog.

---

## 3. One Source of Truth

Prototype Flows and All Prototype Screens are two views of the same underlying prototype structure.

They must never be authored as separate manual datasets.

A central prototype registry must define the prototype structure.

Conceptually:

```text
Prototype Registry
│
├── User Types
│
├── Flows
│   ├── Flow metadata
│   └── Ordered screen references
│
└── Screens
    ├── Screen metadata
    ├── Route
    └── Flow relationship
        │
        ├──────────────► Prototype Flows
        ├──────────────► All Prototype Screens
        ├──────────────► Dev Shortcuts
        └──────────────► Prototype Navigation
```

The implementation technology is flexible.

The architecture is not.

---

## 4. Required Relationships

Every normal prototype screen must know:

- which user type it belongs to
- which flow it belongs to
- its unique identifier
- its route
- its display name
- its position in the flow

Every flow must know:

- its unique identifier
- its user type
- its display name
- its description
- its ordered screens
- its starting screen

A screen should not independently store an order that conflicts with the order defined by its flow.

Choose one authoritative ordering mechanism and use it consistently.

---

## 5. Flow Behavior

A flow represents a meaningful user journey, not merely a visual category.

Good examples:

- Account Creation
- Create Project
- Submit Application
- Compare Offers
- Complete Purchase
- Review Request
- Manage Subscription

Poor examples:

- Forms
- Cards
- Random Screens
- New Screens
- Miscellaneous

Screens should be grouped by what the user is trying to accomplish.

---

## 6. Flow Entry and Navigation

Every flow must have an explicit starting screen.

When `Open Flow` is triggered:

1. open the defined start screen
2. preserve the correct user context
3. allow the prototype to continue through the intended sequence

When a screen is opened directly from All Prototype Screens:

- open exactly that screen
- do not force the user back to the beginning of the flow

Direct links must be stable whenever possible.

---

## 7. Screen States

A screen may have multiple important states.

Examples:

- default
- empty
- loading
- success
- validation error
- permission denied
- locked
- disabled
- completed
- canceled

Not every state needs to become a separate top-level screen.

Use this rule:

Create a separate registered screen/state when the state is important enough that a stakeholder or developer should be able to open it directly.

Minor interaction states can remain inside the main screen implementation.

---

## 8. Status

Prototype metadata may optionally support status values such as:

- planned
- draft
- in progress
- ready for review
- approved
- deprecated

Status should support understanding, not add maintenance overhead.

Do not create complex status systems unless the project needs them.

---

## 9. Scalability

The structure must continue to work when a project grows from:

- 5 screens to 100+ screens
- 1 user type to several user types
- a few flows to many flows

Do not design Prototype Home as a hardcoded showcase page that becomes unmanageable later.

Use reusable grouping, filtering, searching, or collapsing when scale requires it.

---

## 10. Principle of Completion

Creating the visual screen is only one part of creating a prototype screen.

A prototype task is complete only when:

- the screen exists
- the route works
- the registry is correct
- the flow is correct
- Prototype Flows is correct
- All Prototype Screens is correct
- navigation is correct
- related prototype metadata is correct
