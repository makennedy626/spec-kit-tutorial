# Technical Research: DoIt Goal Tracking Web App

**Date**: December 30, 2025
**Feature**: specs/001-doit-goal-tracker/spec.md
**Planning Input**: Use Tailwind @theme for theme colours, localStorage for goals, shadcn for UI components, date-fns for date formatting. No unit tests, integration tests or e2e tests needed.

## Research Findings

### Decision: Use Tailwind CSS with @theme for theming
**Rationale**: Tailwind provides utility-first CSS framework with excellent responsive design support. The @theme configuration allows custom color palette definition matching the spec's pastel colors requirement.
**Alternatives considered**: 
- Vanilla CSS with CSS variables (rejected: more verbose, less maintainable)
- Styled Components (rejected: adds runtime overhead for simple theming)
- CSS Modules (rejected: overkill for component-level styling)
**Best practices**: Define color palette in tailwind.config.js, use semantic color names (primary, secondary), leverage Tailwind's responsive utilities for mobile adaptation.

### Decision: Use localStorage for data persistence
**Rationale**: Meets spec requirement for browser-based persistence with sessionStorage fallback. Simple key-value storage sufficient for goal data structure.
**Alternatives considered**:
- IndexedDB (rejected: overkill for simple JSON data)
- WebSQL (rejected: deprecated, limited browser support)
- Server-side storage (rejected: increases complexity, not required for spec)
**Best practices**: Implement storage abstraction layer, handle quota exceeded errors, provide migration path for data structure changes.

### Decision: Use shadcn/ui for UI components
**Rationale**: Provides high-quality, accessible React components built on Radix UI primitives. Matches modern design requirements with customizable theming.
**Alternatives considered**:
- Material-UI (rejected: heavier bundle, less customizable)
- Ant Design (rejected: opinionated design system)
- Custom components (rejected: time-consuming, harder to maintain accessibility)
**Best practices**: Use component composition, customize via CSS variables, ensure proper ARIA attributes for screen readers.

### Decision: Use date-fns for date formatting and calculations
**Rationale**: Lightweight, modular date utility library. Provides reliable date parsing, formatting, and calculations needed for days-left functionality.
**Alternatives considered**:
- Moment.js (rejected: large bundle size, deprecated)
- Day.js (rejected: less comprehensive API)
- Native Date (rejected: inconsistent browser support, complex calculations)
**Best practices**: Import only needed functions for tree-shaking, handle timezone considerations, use consistent date formats.

### Decision: No testing required
**Rationale**: User explicitly requested no unit, integration, or e2e tests. This violates constitution's Test-First principle but is justified by user's requirements for this simple prototype.
**Justification**: Simple UI-only application with minimal business logic. Manual testing sufficient for proof-of-concept. Constitution override approved for rapid prototyping.
**Risks noted**: Potential regressions in date calculations or storage logic without automated tests.

## Technical Architecture

### Frontend Stack
- **Framework**: React 18+ with hooks
- **Styling**: Tailwind CSS with custom @theme
- **Components**: shadcn/ui component library
- **State Management**: React useState/useEffect (sufficient for localStorage)
- **Date Handling**: date-fns for formatting and calculations

### Data Layer
- **Storage**: Browser localStorage with sessionStorage fallback
- **Data Structure**: JSON array of goal objects
- **Persistence**: Automatic save on state changes

### Build & Development
- **Build Tool**: Vite (fast development, optimized production builds)
- **Package Manager**: npm or yarn
- **Deployment**: Static hosting (Netlify, Vercel, or similar)

## Integration Points

### Component Integration
- shadcn components styled with Tailwind classes
- Custom theme colors applied via Tailwind config
- Date formatting integrated into goal display components

### Storage Integration
- localStorage operations wrapped in utility functions
- Error handling for storage failures
- Data serialization/deserialization with JSON

## Performance Considerations

- **Bundle Size**: Optimize with tree-shaking (date-fns, Tailwind purging)
- **Load Time**: Target <500ms as per spec
- **Runtime**: Efficient re-renders with React.memo where needed
- **Storage**: Minimal data structure to reduce localStorage I/O

## Security Considerations

- **Data Privacy**: Local storage only, no server transmission
- **Input Validation**: Client-side validation for goal data
- **XSS Prevention**: Proper escaping in React components

## Browser Compatibility

- **Target**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Fallbacks**: Graceful degradation for older browsers
- **Mobile**: Responsive design with touch interactions