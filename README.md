# Community Support Desk

Community Support Desk is a React + TypeScript group project for managing community needs, available resources, and volunteer responses in one simple interface.

The app is designed for a local community, school, church, or neighborhood where a coordinator needs to quickly see:

- who needs help
- what kind of help is needed
- how urgent the request is
- what resources are available
- who is responding
- which requests are open, in progress, resolved, or rejected

## Project Goal

Build a useful, typed, frontend-only application that demonstrates TypeScript learning up to abstract classes while solving a real coordination problem.

This project must use:

- React
- TypeScript
- `useState`
- typed props
- helper functions outside JSX
- `localStorage` persistence
- classes, inheritance, method overriding, and an abstract class

This project must not use:

- a backend
- a database
- authentication
- Redux or another external state library
- a routing library unless the team later agrees it is truly needed

## Core Features

The app should allow users to:

1. Create a support request.
2. View all support requests.
3. Filter requests by category, urgency, and status.
4. Search requests by requester name, title, or description.
5. Update a request status.
6. Delete a request.
7. Add a resource offer.
8. View available resource offers.
9. Add a volunteer action linked to a support request.
10. See summary counts such as total requests, open requests, critical requests, and resolved requests.

All important data must persist in `localStorage`.

## Shared Taxonomy

This section is the agreed project taxonomy. Every group must use these exact names consistently in code, forms, filters, validation, and documentation.

### Support Categories

```ts
type SupportCategory =
  | "food"
  | "health"
  | "education"
  | "transport"
  | "employment"
  | "emergency"
  | "shelter"
  | "clothing"
  | "other";
```

### Urgency Levels

```ts
type UrgencyLevel = "low" | "medium" | "high" | "critical";
```

### Request Statuses

```ts
type RequestStatus = "open" | "in-progress" | "resolved" | "rejected";
```

### Resource Types

```ts
type ResourceType =
  | "food-item"
  | "medicine"
  | "clothing"
  | "book"
  | "equipment"
  | "money"
  | "service"
  | "other";
```

### Volunteer Roles

```ts
type VolunteerRole =
  | "coordinator"
  | "driver"
  | "tutor"
  | "medic"
  | "counselor"
  | "donor"
  | "general";
```

### Contact Methods

```ts
type ContactMethod = "phone" | "whatsapp" | "email" | "in-person";
```

## Shared Data Structures

### Support Request

```ts
interface SupportRequest {
  id: string;
  title: string;
  description: string;
  category: SupportCategory;
  urgency: UrgencyLevel;
  status: RequestStatus;
  requesterName: string;
  contactMethod: ContactMethod;
  contactValue: string;
  createdAt: string;
  updatedAt: string;
}
```

Fields:

- `id`: unique identifier
- `title`: short summary of the request
- `description`: full details of the support needed
- `category`: support category
- `urgency`: priority level
- `status`: current request state
- `requesterName`: name of the person asking for support
- `contactMethod`: preferred contact channel
- `contactValue`: actual contact detail
- `createdAt`: ISO timestamp when created
- `updatedAt`: ISO timestamp when last updated

### Resource Offer

```ts
interface ResourceOffer {
  id: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  offeredBy: string;
  contactMethod: ContactMethod;
  contactValue: string;
  isAvailable: boolean;
  createdAt: string;
}
```

Fields:

- `id`: unique identifier
- `title`: short name of the offered resource
- `description`: details about the resource
- `resourceType`: kind of resource being offered
- `offeredBy`: name of the provider
- `contactMethod`: preferred contact channel
- `contactValue`: actual contact detail
- `isAvailable`: whether the resource is still available
- `createdAt`: ISO timestamp when created

### Volunteer Action

```ts
interface VolunteerAction {
  id: string;
  requestId: string;
  volunteerName: string;
  role: VolunteerRole;
  note: string;
  createdAt: string;
}
```

Fields:

- `id`: unique identifier
- `requestId`: related support request ID
- `volunteerName`: volunteer's name
- `role`: volunteer role
- `note`: action details or remarks
- `status`: current action state
- `createdAt`: ISO timestamp when created

## Naming Conventions

### Files

- Component files: `PascalCase`
- Helper and utility files: `camelCase`
- Type files: `camelCase`
- Test files: same name plus `.test`

Examples:

- `RequestCard.tsx`
- `filterRequests.ts`
- `taxonomy.ts`
- `filterRequests.test.ts`

### Components

Always use `PascalCase` and name components after what they do.

Examples:

- `RequestForm`
- `RequestCard`
- `RequestList`
- `RequestFilters`
- `ResourceForm`
- `ResourceList`
- `VolunteerActionForm`
- `DashboardSummary`

### Types and Interfaces

- Type aliases: `PascalCase`
- Interfaces: `PascalCase`
- Enums: `PascalCase` name with `UPPER_CASE` values

Examples:

```ts
type SupportCategory = "food" | "health" | "education";

interface SupportRequest {
  id: string;
  title: string;
}

enum UrgencyLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}
```

## Branch Naming

Pattern:

```txt
type/short-description
```

Examples:

- `setup/repository-taxonomy`
- `feature/request-form`
- `fix/localstorage-crash`
- `fix/filter-bug`

Rules:

- all lowercase
- hyphens only
- no underscores
- no spaces
- keep it short and descriptive

## Commit Naming

Pattern:

```txt
type: short description
```

Allowed types:

- `feat`: new feature
- `fix`: bug fix
- `chore`: setup, config, or admin task
- `refactor`: restructuring code without changing behavior
- `docs`: README or comments only

Examples:

- `feat: add request form with validation`
- `feat: build request card component`
- `fix: handle empty localstorage on load`
- `fix: correct urgency filter logic`
- `chore: set up project folder structure`
- `chore: add taxonomy to readme`
- `refactor: move filter logic to utils`

Rules:

- use lowercase after the colon
- no full stop at the end
- keep it under 60 characters
- describe what it does, not what you did

## TypeScript Expectations

The project must include and correctly use:

- `interface` for shared object structures
- `type` aliases for unions and literal types
- `enum` or literal unions for fixed options
- typed React props
- typed `useState`
- arrays of typed objects
- functions with parameter and return types
- at least one generic helper function
- at least one type guard
- at least one class with access modifiers
- at least one child class using `extends`
- at least one method override
- at least one abstract class

Suggested abstract-class direction:

```ts
abstract class CommunityRecord {
  constructor(
    public id: string,
    public createdAt: string,
  ) {}

  abstract getSummary(): string;
}
```

Child classes such as `SupportRequestRecord` and `ResourceOfferRecord` can extend it and implement `getSummary()` differently.

## React Expectations

The app should be component-based.

Expected components:

- `App`
- `Header`
- `DashboardSummary`
- `RequestForm`
- `RequestList`
- `RequestCard`
- `RequestFilters`
- `ResourceForm`
- `ResourceList`
- `VolunteerActionForm`

Teams may add more components if needed, but props must be typed wherever props are used.

## Helper Logic Expectations

Business logic should live outside JSX where appropriate.

Examples:

- generating IDs
- validating form data
- filtering requests
- searching requests
- calculating summary counts
- saving to `localStorage`
- loading from `localStorage`
- checking whether loaded data is valid

## Persistence Rules

Use `localStorage` for:

- support requests
- resource offers
- volunteer actions
- the taxonomy only if the team later decides to make it editable

Use `JSON.stringify` when saving and `JSON.parse` when loading.

The app must handle:

- empty `localStorage`
- missing keys
- invalid JSON
- wrong data shapes

## Team Workstreams

### Group 1: Repository, Taxonomy, App Shell, And Integration

Members:

1. Chidi Aguwa
2. Favour Bright
3. Udeh Praise-God Chidiebere

Responsibilities:

- initialize the GitHub repository
- create the React + TypeScript project
- add the agreed taxonomy to `README.md`
- define the first shared folder structure
- create the base `App` layout
- create shared TypeScript types
- review integration from all groups
- keep the app compiling after merges

### Group 2: Support Request Creation And Validation

Members:

1. Adenubi Jethro Opeyemi
2. Christian Onoh

Responsibilities:

- build the support request form
- validate required fields
- create typed request objects
- implement typed form state with `useState`
- implement request creation
- pass new request data back to the parent component
- use the shared taxonomy options only

### Group 3: Request List, Filters, Search, And Status Updates

Members:

1. Kenechukwu Emmanuel Onyia
2. Ochu Chidiebere Ebubedike
3. Chinenye Orakwue

Responsibilities:

- display all requests
- build request cards
- filter by category, urgency, and status
- search by name, title, and description
- update request status
- delete requests
- calculate visible request counts

### Group 4: Resources, Volunteer Actions, LocalStorage, And Dashboard

Members:

1. Eric Chidera Godswill
2. Sarah Nnanyelugo
3. Amah Ifeanyi Sunday

Responsibilities:

- build resource offer form
- display resource offers
- build volunteer action form
- connect volunteer actions to support requests
- implement `localStorage` save/load helpers
- build dashboard summary counts
- handle invalid or empty stored data safely

## Suggested Branches

- `setup/repository-taxonomy`
- `feature/request-form`
- `feature/request-list-filters`
- `feature/resources-volunteers-storage`

## Pull Request Checklist

Every pull request should include:

- what was built
- what files changed
- what TypeScript concepts were used
- how the feature was tested
- any known issues


## Suggested File Structure

```text
src/
  components/
  data/
  types/
  utils/
  App.tsx
  main.tsx
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build For Production

```bash
npm run build
```

### Run Linting

```bash
npm run lint
```

## Current Repository Status

This repository is currently set up with:

- React
- TypeScript
- Vite
- ESLint

The app shell is still in starter-template form and will be replaced as feature work progresses.

## Assessment Checklist

### Functionality

- users can create support requests
- users can view support requests
- users can filter requests
- users can search requests
- users can update request status
- users can delete requests
- users can add resource offers
- users can add volunteer actions
- dashboard summary counts are correct
- data persists after refresh

### React

- components are clear and reusable
- props are typed
- `useState` is used correctly
- form inputs are controlled
- state is updated without mutation
- UI updates after user actions

### TypeScript

- no careless `any`
- interfaces and type aliases are used properly
- functions have clear parameter and return types
- unions or enums are used for fixed choices
- type guards are used where data needs checking
- classes are used where they make sense
- inheritance and method overriding are demonstrated
- abstract class is used meaningfully

### Vanilla Logic

- filtering logic is separated from JSX
- search logic is separated from JSX
- validation logic is separated from JSX
- storage logic is separated from JSX
- helper functions are readable and testable

### Collaboration

- repository was initialized correctly
- taxonomy was agreed before feature work
- commits are meaningful
- branches are named clearly
- pull requests explain the work
- all team members contributed

## Final Deliverables

Submit:

1. GitHub repository link.
2. Final `README.md`.
3. Short demo video or live presentation.
4. Group members and contributions.
5. One TypeScript concept explained by each student.

## Presentation Questions

Each student should be ready to answer:

1. What type or interface did you define?
2. Where did you use `useState`?
3. Where did you pass props between components?
4. Where did you use a union type, enum, or literal type?
5. Where did you validate data?
6. Where did you use `localStorage`?
7. What class did your team create?
8. What child class extended another class?
9. What method was overridden?
10. Why did the project need an abstract class?
