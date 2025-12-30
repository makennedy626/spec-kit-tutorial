# Spec-Kit Development Workflow

## Architecture Overview
This project implements a spec-kit system for structured feature development using AI agents. Features follow a numbered branch workflow (e.g., `001-user-auth`) with specifications stored in `specs/[###-feature-name]/` directories. The system enforces a constitution-based approach with phases: specify → clarify → plan → tasks → implement.

## Critical Workflows

### Feature Development Cycle
1. **Specify**: Run `/speckit.specify "feature description"` to create spec.md from natural language
2. **Clarify**: Use `/speckit.clarify` to resolve [NEEDS CLARIFICATION] markers in specs
3. **Plan**: Execute `/speckit.plan` to generate technical implementation plans
4. **Tasks**: Run `/speckit.tasks` to break plans into actionable development tasks
5. **Implement**: Use `/speckit.implement` to generate code for individual tasks

### Branch Management
- Create feature branches as `###-short-name` (e.g., `001-user-auth`, `002-fix-bug`)
- Use `.specify/scripts/bash/create-new-feature.sh --json "description"` for setup
- Branches map to `specs/###-short-name/` directories automatically

### Quality Gates
- **Constitution Check**: All plans must pass constitution validation in `.specify/memory/constitution.md`
- **Checklist Validation**: Features require completion checklists in `FEATURE_DIR/checklists/`
- **Template Compliance**: Use provided templates from `.specify/templates/` for all documentation

## Project Conventions

### File Structure
```
specs/[###-feature-name]/
├── spec.md           # Feature specification (user stories, requirements, success criteria)
├── plan.md           # Technical implementation plan
├── tasks.md          # Development tasks breakdown
├── research.md       # Technical research and decisions
├── data-model.md     # Data structures and relationships
├── quickstart.md     # Implementation quickstart guide
├── contracts/        # API/service contracts
└── checklists/       # Quality validation checklists
```

### Specification Patterns
- **User Stories**: Prioritized as P1/P2/P3 with independent testability
- **Requirements**: Numbered as FR-001, FR-002 with testable acceptance criteria
- **Success Criteria**: Measurable, technology-agnostic outcomes (e.g., "Users complete task in <2 minutes")
- **Edge Cases**: Document boundary conditions and error scenarios

### Code Generation
- Focus on library-first architecture with CLI interfaces
- Implement test-first (TDD) with red-green-refactor cycles
- Generate integration tests for contracts and inter-service communication
- Use stdin/stdout for CLI tools with JSON + human-readable output formats

## Integration Points

### Agent System
- Agents defined in `.github/agents/` with corresponding prompts in `.github/prompts/`
- Auto-approved terminal commands for `.specify/scripts/bash/` operations
- Constitution enforcement across all development phases

### Template System
- All documentation uses templates from `.specify/templates/`
- Scripts in `.specify/scripts/bash/` handle path resolution and setup
- Common functions in `common.sh` provide branch-to-directory mapping

## Development Commands
- Setup plan: `.specify/scripts/bash/setup-plan.sh [--json]`
- Create feature: `.specify/scripts/bash/create-new-feature.sh --json "description"`
- Update context: `.specify/scripts/bash/update-agent-context.sh`

## Key Files
- Constitution: `.specify/memory/constitution.md` (project principles)
- Agent configs: `.github/agents/speckit.*.agent.md`
- Templates: `.specify/templates/spec-template.md`, `plan-template.md`, etc.