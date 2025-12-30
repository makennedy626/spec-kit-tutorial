# Data Model: DoIt Goal Tracking

**Date**: December 30, 2025
**Feature**: specs/001-doit-goal-tracker/spec.md

## Overview

The application uses a simple data model stored in browser localStorage. All data is client-side with no server persistence.

## Entities

### Goal
Represents a user's objective with deadline tracking.

**Attributes:**
- `id`: string (UUID or timestamp-based, unique identifier)
- `title`: string (goal description, max 100 characters, required)
- `endDate`: string (ISO date string YYYY-MM-DD, required)
- `completed`: boolean (completion status, default false)

**Validation Rules:**
- `title`: Required, non-empty, ≤100 characters
- `endDate`: Required, valid date, not in past (at creation)
- `id`: Auto-generated, unique across all goals
- `completed`: Boolean, defaults to false

**State Transitions:**
- Created: `completed = false`
- Completed: `completed = true` (moves to completed column)
- Uncompleted: `completed = false` (moves back to current)
- Deleted: Removed from storage

**Relationships:**
- None (standalone entities)

## Storage Schema

**Storage Key:** `"doit-goals"`

**Format:** JSON array of Goal objects
```json
[
  {
    "id": "1735526400000",
    "title": "Complete project proposal",
    "endDate": "2025-12-30",
    "completed": false
  },
  {
    "id": "1735612800000", 
    "title": "Review quarterly reports",
    "endDate": "2025-12-31",
    "completed": true
  }
]
```

## Data Operations

### Create Goal
- Generate unique ID (timestamp-based)
- Validate title and endDate
- Add to goals array
- Persist to localStorage

### Read Goals
- Load from localStorage
- Parse JSON
- Handle corrupted data gracefully
- Return array of Goal objects

### Update Goal
- Find goal by ID
- Apply changes (completion status)
- Validate updated data
- Persist to localStorage

### Delete Goal
- Find goal by ID
- Remove from array
- Persist to localStorage

## Data Integrity

### Validation
- Schema validation on load
- Type checking for all attributes
- Date format validation
- Length limits enforcement

### Error Handling
- localStorage unavailable → fallback to sessionStorage
- Quota exceeded → show user warning
- Corrupted data → reset to empty array
- Invalid dates → use current date as fallback

## Migration Strategy

**Version 1.0:** Initial schema as defined above.

**Future Migrations:** 
- Add version field to storage
- Implement migration functions for schema changes
- Backward compatibility for old data formats

## Performance Considerations

- **Storage Size:** Limit total goals to reasonable number (<1000)
- **Load Performance:** Parse JSON once on app start
- **Save Performance:** Debounce saves to avoid excessive I/O
- **Memory Usage:** Keep all goals in memory for fast access