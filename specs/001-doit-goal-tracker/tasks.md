---

description: "Task list template for feature implementation"
---

# Tasks: DoIt Goal Tracking Web App

**Input**: Design documents from `/specs/001-doit-goal-tracker/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test tasks included (per user requirements)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `doit-app/` at repository root (per plan.md structure)

## Overview

This task breakdown implements the DoIt goal tracking web app using React, Tailwind CSS, shadcn/ui, and localStorage. Tasks are organized by user story to enable independent implementation and testing.

**Total Tasks**: 36
**User Stories**: 6 (P1: 3 stories, P2: 2 stories, P3: 1 story)
**Parallel Opportunities**: 12 tasks marked with [P]
**MVP Scope**: User Stories 1-3 (core goal CRUD functionality)

## Dependencies

User stories can be implemented in parallel within the same priority level, but P1 stories should be completed before starting P2, and P2 before P3.

```
P1 Stories (Core Functionality)
├── US1: Add New Goals
├── US2: View Current Goals  
└── US3: Mark Goals as Completed

P2 Stories (Enhanced UX)
├── US4: Delete Goals Permanently
└── US5: Highlight Urgent Goals

P3 Stories (Polish)
└── US6: Modern Light Theme
```

## Implementation Strategy

1. **MVP First**: Complete US1-US3 for basic goal tracking functionality
2. **Incremental Delivery**: Add enhanced features (US4-US5) progressively  
3. **Polish Last**: Apply theming and final UX improvements (US6)
4. **Parallel Execution**: Within each story, parallelizable tasks are marked [P]

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js project with TypeScript and Tailwind in doit-app/
- [ ] T002 Configure Tailwind theme with custom pastel colors in doit-app/tailwind.config.js
- [ ] T003 Install and configure shadcn/ui components in doit-app/
- [ ] T004 Install date-fns library for date handling
- [ ] T005 Create basic project structure (app/, components/, lib/ directories)
- [ ] T006 Set up TypeScript interfaces in doit-app/lib/types.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 [P] Implement localStorage utilities with sessionStorage fallback in doit-app/lib/storage.ts
- [ ] T008 [P] Create date formatting and calculation utilities using date-fns in doit-app/lib/dates.ts
- [ ] T009 [P] Set up root layout with theme provider in doit-app/app/layout.tsx
- [ ] T010 [P] Configure global CSS with Tailwind imports in doit-app/app/globals.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add New Goals (Priority: P1) 🎯 MVP

**Goal**: Users can add new goals to track their objectives with titles and end dates

**Independent Test**: Can add goals via modal form and see them appear in current goals list

- [ ] T011 Create AddGoalDialog component with form validation in doit-app/components/AddGoalDialog.tsx
- [ ] T012 Integrate dialog into main page with open/close state management in doit-app/app/page.tsx
- [ ] T013 Implement goal creation logic with ID generation and storage in doit-app/app/page.tsx
- [ ] T014 Add form validation for required fields and title length limit in doit-app/components/AddGoalDialog.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently ([spec.md#user-story-1---add-new-goals](specs/001-doit-goal-tracker/spec.md#user-story-1---add-new-goals))

---

## Phase 4: User Story 2 - View Current Goals (Priority: P1) 🎯 MVP

**Goal**: Users can see their active goals with countdown of days remaining until deadline

**Independent Test**: Goals display with accurate days-left calculations and proper formatting

- [ ] T015 Create GoalList component structure in doit-app/components/GoalList.tsx
- [ ] T016 Implement goal display with title and days-left formatting in doit-app/components/GoalList.tsx
- [ ] T017 Add goal loading from storage on app initialization in doit-app/app/page.tsx
- [ ] T018 Implement responsive two-column layout (current/completed) in doit-app/app/page.tsx

**Checkpoint**: At this point, User Story 2 should be fully functional and testable independently ([spec.md#user-story-2---view-current-goals-with-time-remaining](specs/001-doit-goal-tracker/spec.md#user-story-2---view-current-goals-with-time-remaining))

---

## Phase 5: User Story 3 - Mark Goals as Completed (Priority: P1) 🎯 MVP

**Goal**: Users can check off completed goals, moving them to a separate completed column

**Independent Test**: Checking goal moves it between columns with updated status display

- [ ] T019 Add checkbox to GoalList component for completion toggle in doit-app/components/GoalList.tsx
- [ ] T020 Implement goal completion logic with column movement in doit-app/app/page.tsx
- [ ] T021 Update goal display to show "Completed" text for finished goals in doit-app/components/GoalList.tsx
- [ ] T022 Add visual distinction between current and completed goal lists in doit-app/app/page.tsx

**Checkpoint**: At this point, User Story 3 should be fully functional and testable independently ([spec.md#user-story-3---mark-goals-as-completed](specs/001-doit-goal-tracker/spec.md#user-story-3---mark-goals-as-completed))

---

## Phase 6: User Story 4 - Delete Goals Permanently (Priority: P2)

**Goal**: Users can permanently remove goals they no longer want to track

**Independent Test**: Delete button removes goal from both columns permanently

- [ ] T023 Add delete button to GoalList component in doit-app/components/GoalList.tsx
- [ ] T024 Implement goal deletion logic with confirmation in doit-app/app/page.tsx
- [ ] T025 Add delete button styling with destructive color scheme in doit-app/components/GoalList.tsx

**Checkpoint**: At this point, User Story 4 should be fully functional and testable independently ([spec.md#user-story-4---delete-goals-permanently](specs/001-doit-goal-tracker/spec.md#user-story-4---delete-goals-permanently))

## Phase 7: User Story 5 - Highlight Urgent Goals (Priority: P2)

**Goal**: Goals approaching their deadline (within 3 days) are visually highlighted

**Independent Test**: Goals due within 3 days show orange accent styling

- [ ] T026 Add urgent goal detection logic using date calculations in doit-app/lib/dates.ts
- [ ] T027 Implement highlighting styles for urgent goals in doit-app/components/GoalList.tsx
- [ ] T028 Apply conditional styling based on urgency in GoalList component rendering

**Checkpoint**: At this point, User Story 5 should be fully functional and testable independently ([spec.md#user-story-5---highlight-urgent-goals](specs/001-doit-goal-tracker/spec.md#user-story-5---highlight-urgent-goals))

## Phase 8: User Story 6 - Modern Light Theme (Priority: P3)

**Goal**: App uses modern light theme with fun pastel colors for appealing UX

**Independent Test**: Visual inspection confirms pastel color scheme and modern design

- [ ] T029 Fine-tune Tailwind color palette for exact pastel specifications in doit-app/tailwind.config.js
- [ ] T030 Apply consistent color theming across all components in doit-app/components/
- [ ] T031 Ensure responsive design works on mobile devices with proper breakpoints
- [ ] T032 Add final typography and spacing refinements for modern appearance

**Checkpoint**: At this point, User Story 6 should be fully functional and testable independently ([spec.md#user-story-6---modern-light-theme](specs/001-doit-goal-tracker/spec.md#user-story-6---modern-light-theme))

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements that span multiple user stories

- [ ] T033 Add loading states and error handling for storage operations
- [ ] T034 Implement accessibility features (ARIA labels, keyboard navigation)
- [ ] T035 Add performance optimizations (memoization, efficient re-renders)
- [ ] T036 Final testing and bug fixes across all user stories

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories  
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P2)**: Can start after P1 stories complete - May integrate with US1-US3
- **User Story 5 (P2)**: Can start after P1 stories complete - May integrate with US1-US3
- **User Story 6 (P3)**: Can start after P2 stories complete - May integrate with all previous stories

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
