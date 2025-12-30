# Feature Specification: DoIt Goal Tracking Web App

**Feature Branch**: `001-doit-goal-tracker`  
**Created**: December 30, 2025  
**Status**: Draft  
**Input**: User description: "initial page setup - this application should be a goal tracking web app called 'doit'. There should be two columns - a left one where current goals are show, along with how many days left the user has to achieve the goal, and a right one where completed goals are. Each goal can be 'checked' using a checkbox, and then either moved to the completed column or permanently deleted. To add new goals, a user can click on a button to open a new goal form in a modal (title and end date fields). Goals reaching their end date (within 3 days) are highlighted. Let's use a modern light theme with fun pastel colors."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add New Goals (Priority: P1)

Users can add new goals to track their objectives with titles and end dates.

**Why this priority**: Core functionality required for any goal tracking app - without adding goals, the app has no purpose.

**Independent Test**: Can be fully tested by opening the modal, entering title and date, and verifying the goal appears in the current goals column.

**Acceptance Scenarios**:

1. **Given** the user clicks the "Add New Goal" button, **When** they fill in title and end date and submit, **Then** a new goal appears in the current goals column with calculated days left.
2. **Given** the user tries to submit without title or date, **When** they attempt to submit, **Then** the form prevents submission and shows validation errors.
3. **Given** the user enters an end date in the past, **When** they submit, **Then** the goal is created but shows negative days left.

---

### User Story 2 - View Current Goals with Time Remaining (Priority: P1)

Users can see their active goals with a countdown of days remaining until the deadline.

**Why this priority**: Essential for goal tracking - users need visibility into their progress and deadlines.

**Independent Test**: Can be fully tested by adding goals and verifying the days left calculation and display.

**Acceptance Scenarios**:

1. **Given** a goal with end date 5 days from now, **When** the page loads, **Then** it shows "5 days left".
2. **Given** a goal with end date today, **When** the page loads, **Then** it shows "0 days left".
3. **Given** a goal with end date yesterday, **When** the page loads, **Then** it shows "-1 days left".

---

### User Story 3 - Mark Goals as Completed (Priority: P1)

Users can check off completed goals, moving them to a separate completed column.

**Why this priority**: Core completion workflow - users need to mark achievements and see completed items separately.

**Independent Test**: Can be fully tested by checking a goal's checkbox and verifying it moves to completed column.

**Acceptance Scenarios**:

1. **Given** a goal in current goals, **When** the user checks the checkbox, **Then** the goal moves to completed column and shows "Completed".
2. **Given** a completed goal, **When** the user unchecks the checkbox, **Then** the goal moves back to current goals with updated days left.

---

### User Story 4 - Delete Goals Permanently (Priority: P2)

Users can permanently remove goals they no longer want to track.

**Why this priority**: Cleanup functionality important for long-term use, but not essential for initial goal tracking.

**Independent Test**: Can be fully tested by clicking delete on a goal and verifying it disappears from both columns.

**Acceptance Scenarios**:

1. **Given** a goal in current goals, **When** the user clicks delete, **Then** the goal is removed and no longer appears anywhere.
2. **Given** a goal in completed goals, **When** the user clicks delete, **Then** the goal is removed and no longer appears anywhere.

---

### User Story 5 - Highlight Urgent Goals (Priority: P2)

Goals approaching their deadline (within 3 days) are visually highlighted to draw attention.

**Why this priority**: Helps users prioritize urgent tasks, but the app functions without highlighting.

**Independent Test**: Can be fully tested by setting goal end dates and verifying highlighting appears/disappears at 3-day threshold.

**Acceptance Scenarios**:

1. **Given** a goal with 3 days left, **When** the page loads, **Then** the goal is highlighted with orange accent.
2. **Given** a goal with 4 days left, **When** the page loads, **Then** the goal is not highlighted.
3. **Given** a highlighted goal that gets 4 days left, **When** the page reloads, **Then** the highlighting is removed.

---

### User Story 6 - Modern Light Theme (Priority: P3)

The app uses a modern light theme with fun pastel colors for an appealing user experience.

**Why this priority**: Visual design enhances usability but is not core functionality.

**Independent Test**: Can be fully tested by visual inspection of colors, fonts, and layout.

**Acceptance Scenarios**:

1. **Given** the app loads, **When** the user views the page, **Then** it uses light background with pastel blue, green, and orange accents.
2. **Given** the app loads, **When** the user views the page, **Then** it uses modern fonts and clean layout with two columns.

### Edge Cases

- What happens when the user enters an invalid date format? → Use HTML5 date input validation (browser default behavior)
- How does the app handle goals with very long titles? → Limit to 100 characters maximum
- What happens if the user has many goals (scrolling behavior)? → Use infinite scroll
- How does the app behave on mobile devices with small screens? → Use responsive grid layout that reflows
- What happens if localStorage is full or unavailable? → Fall back to sessionStorage if available

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display goals in two columns: current (left) and completed (right)
- **FR-002**: System MUST show days remaining for current goals using format "X days left"
- **FR-003**: System MUST allow adding new goals via modal with title and end date fields
- **FR-004**: System MUST validate that title and end date are provided before creating goals, using HTML5 date input validation for date format handling
- **FR-005**: System MUST move checked goals to completed column and show "Completed" text
- **FR-006**: System MUST allow permanent deletion of goals via delete button
- **FR-007**: System MUST highlight goals with ≤3 days remaining using orange accent
- **FR-008**: System MUST persist goals using browser localStorage, falling back to sessionStorage if localStorage is unavailable
- **FR-009**: System MUST use modern light theme with pastel colors (blue, green, orange)
- **FR-010**: System MUST be responsive for mobile devices using a grid layout that reflows based on screen size
- **FR-011**: System MUST limit goal titles to maximum 100 characters
- **FR-012**: System MUST handle long goal lists using infinite scroll behavior

### Key Entities *(include if feature involves data)*

- **Goal**: Represents a user's objective
  - id: Unique identifier (timestamp-based)
  - title: Goal description (string, required)
  - endDate: Deadline date (date, required)
  - completed: Completion status (boolean, default false)
  - Relationships: None (standalone entities)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add a new goal in under 30 seconds from clicking "Add New Goal" to seeing it in the list
- **SC-002**: 95% of users successfully complete goal addition on first attempt without errors
- **SC-003**: Goals display accurate days remaining calculations (within 1 day accuracy)
- **SC-004**: Completed goals move to right column within 100ms of checkbox click
- **SC-005**: Urgent goals (≤3 days) are visually distinct with 90% user recognition rate
- **SC-006**: App loads and displays existing goals within 500ms on modern devices
- **SC-007**: App functions correctly on screens as small as 320px width

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]  
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]
