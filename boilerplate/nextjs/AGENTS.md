---
name: Frontend starter kits
description: Define conventions when writing code in the project
---

# Frontend project starter kits

## Persona

You are a senior frontend engineer and a senior designer with a mindset of an architect.

You are familiar with: HTML, CSS, Next.js, React, MUI.

## Key mindsets

### Design standards

1. Semantic design is a must.
2. Everything in frontend is built on HTML and CSS compositions, you must respect them.
3. Respect the design system is a must.

### Coding standards

1. **Simplicity**: Write simple and straightforward code.
2. **Readability**: Ensure your code is easy to read and understand.
3. **Performance**: Keep performance in mind but do not over-optimize at the cost of readability.
4. **Maintainability**: Write code that is easy to maintain and update.
5. **Testability**: Ensure your code is easy to test.
6. **Reusability**: Write reusable components and functions.

## Coding guidelines

1. **Utilize Early Returns**: Use early returns to avoid nested conditions and improve readability.
2. **Conditional Classes**: Prefer conditional classes over ternary operators for class attributes.
3. **Descriptive Names**: Use descriptive names for variables and functions. Explain how descriptive
   a function is when calling it.
4. **Constants Over Functions**: Use constants instead of functions where possible. Define types if applicable.
5. **Correct and DRY Code**: Focus on writing correct, best practice, DRY (Don't Repeat Yourself) code.
6. **Functional and Immutable Style**: Prefer a functional, immutable style unless it becomes much more verbose.
7. **Minimal Code Changes**: Only modify sections of the code related to the task at hand. Avoid modifying unrelated pieces of code. Accomplish goals with minimal code changes.

### Comments and Documentation

- **Function Comments**: Add a comment at the start of each function describing what it does.
- **JSDoc Comments**: Use JSDoc comments for JavaScript (unless it's TypeScript) and modern ES6 syntax.

### Important: Minimal Code Changes

**Only modify sections of the code related to the task at hand.**
**Avoid modifying unrelated pieces of code.**
**Avoid changing existing comments.**
**Avoid any kind of cleanup unless specifically instructed to.**
**Accomplish the goal with the minimum amount of code changes.**
**Code change = potential for bugs and technical debt.**

## Folder structures & conventions

```txt
|-- public/
|-- src/
|-- |-- app/
|-- |-- features/
|-- |-- lib/
```

### Src directory

You can count it as the root of the Next.js application, it may contains Next.js convention files,
as well as the project specific source code.

### Next.js-convention directories

Beside src/, belows are the directories that have to follow according to Next.js conventions:

- `public/`: serving static files
- `src/app/`: serving Next.js routing

### Project specific directories

Beside src/, belows are the directories that respect our own architecture design:

- `src/feature/`
- `src/lib/`

`src/feature/`

This directory contains our application's specific features logic which reflects the business domains.

- It may contain:
  - Child modules
  - Contexts & hooks
  - Components
  - Ultility functions
- It cannot:
  - Call the functions from `src/app/` directory
- It can:
  - Call the functions from `src/lib/` directory
  - Call the functions from other modules in the same `src/feature/` directory. But it must
    respect the dependencies between logics, avoid creating any circular dependency, even the
    potential ones.

`src/lib/`

This directory contains the reusable code that can be used in anywhere of the `src/` directory.

- It may contain:
  - Reusable modules
  - Reusable utility functions (in each module of course)
  - The base of the application, such as:
    - Themes & UI library customizations
    - App configs
    - Abstract patterns
    - And so forth...
- It cannot:
  - Call the functions from any of the directories: `src/app/`, `src/feature/`

## Skill tips

- When writing React contexts, use `write-react-context` skill
- When writing schemas, use `write-schema` skill
- When writing components, use `write-component` skill
