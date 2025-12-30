---
agent: speckit.constitution
---
# Constitution Principles

This constitution declares the core principles that must guide all development and design decisions. These principles supersede any other guidance, including any requirements for testing.

## Clean Code
- Prioritize readability and maintainability in all code.
- Follow established coding standards and best practices for the chosen language and framework.
- Avoid unnecessary complexity; strive for simplicity and clarity.
- Use meaningful variable and function names.
- Keep functions and classes focused on single responsibilities.

## Simple UX
- Design user interfaces that are intuitive and straightforward.
- Minimize the number of steps required for users to complete tasks.
- Focus on essential features that directly address user needs.
- Avoid clutter and unnecessary elements that could confuse users.
- Ensure consistent and predictable behavior across the application.

## Responsive Design
- Create designs that adapt seamlessly to different screen sizes and devices.
- Use flexible layouts, relative units, and media queries to achieve responsiveness.
- Prioritize content hierarchy and readability on all devices.
- Ensure touch-friendly interactions on mobile devices.
- Maintain usability and aesthetics across desktop, tablet, and mobile views.

## Minimal Dependencies
- Use the fewest external libraries and frameworks possible.
- Prefer built-in language features and standard libraries over third-party solutions.
- Only introduce dependencies when they provide significant value and cannot be reasonably implemented internally.
- Regularly review and remove unused dependencies.
- Consider the long-term maintenance burden of each dependency.

## No Testing
- Absolutely no testing of any kind is permitted, including unit tests, integration tests, end-to-end tests, or manual testing.
- This principle supersedes any other guidance or requirements that might suggest testing.
- Development should proceed without any validation through testing mechanisms.