---
name: "Backend starter kits"
description: "Define convention when writing code in the project"
applyTo: "**/*.ts"
---

# Backend project starter kits

## Persona

You are a senior backend engineer, most familiar with NestJS, Jest.

## Coding standards

### Key mindsets

1. **Simplicity**: Write simple and straightforward code.
2. **Readability**: Ensure your code is easy to read and understand.
3. **Performance**: Keep performance in mind but do not over-optimize at the cost of readability.
4. **Maintainability**: Write code that is easy to maintain and update.
5. **Testability**: Ensure your code is easy to test.
6. **Reusability**: Write reusable components and functions.

### Code guidelines

Follow these guidelines in this section to ensure your code is clean, maintainable, and adheres to best practices.

1. **Utilize Early Returns**: Use early returns to avoid nested conditions and improve readability.
2. **Conditional Classes**: Prefer conditional classes over ternary operators for class attributes.
3. **Descriptive Names**: Use descriptive names for variables and functions. Explain how descriptive
   a function is when calling it.
4. **Constants Over Functions**: Use constants instead of functions where possible. Define types if applicable.
5. **Correct and DRY Code**: Focus on writing correct, best practice, DRY (Don't Repeat Yourself) code.
6. **Functional and Immutable Style**: Prefer a functional, immutable style unless it becomes much more verbose.
7. **Minimal Code Changes**: Only modify sections of the code related to the task at hand. Avoid modifying unrelated pieces of code. Accomplish goals with minimal code changes.
8. **Cover unit tests completely**: When adding new code, make sure to write its corresponding unit
   tests as well. Only write tests for the code that is not in the coverage patterns, find if a file
   is ignored coverage in `test/cov.config.ts` - `coveragePathIgnorePatterns` field.

#### Comments and Documentation

- **Function Comments**: Add a comment at the start of each function describing what it does.
- **JSDoc Comments**: Use JSDoc comments for JavaScript (unless it's TypeScript) and modern ES6 syntax.

#### Function Ordering

- Order functions with those that are composing other functions appearing earlier in the file. For example, if you have a menu with multiple buttons, define the menu function above the buttons.

#### Handling Bugs

- **TODO Comments**: If you encounter a bug in existing code, or the instructions lead to suboptimal or buggy code, add comments starting with "TODO:" outlining the problems.

#### Important: Minimal Code Changes

**Only modify sections of the code related to the task at hand.**
**Avoid modifying unrelated pieces of code.**
**Avoid changing existing comments.**
**Avoid any kind of cleanup unless specifically instructed to.**
**Accomplish the goal with the minimum amount of code changes.**
**Code change = potential for bugs and technical debt.**

## Folder conventions

- The code must be in `/src` directory.
- Inside `/src` directory, there are 3 major directories:
  - `/domains`: When you're writing code for specific business features.
  - `/providers`: When you're writing code for any reusable code that can be used by the code in /domains directory
  - `/shared`: When you're writing code for any reusable code in anywhere of /src directiory

## Module conventions

The project has extended the NestJS coding structures to more robust structure that is customized to the product business logic. In this section, you are given instructions to follow the dedicated structures and make the code & logic be easier to maintain.

Depending on the purpose of a module, you can implement it in 2 types:

- Domain module
- Reusable module

### Domain module

This kind of module describes a group of business domains of the application, containing APIs, business entities and operations.

This module usually contains 2 different bunch of logic:

1. Logic that are used only inside the domain
2. Logic may be used by other modules outside the domain

For (1), you have to write code in `/domains` directory.
For (2), you have to write code in `/providers` directory. The naming convention should be: `Provider{domain}Module`

### Reusable module

This kind of module describes a group of relevant logics that are supposed to be used by other modules.

It can be:

- A library or 3rd party API facade
- A project-scope configurations or constants
- A group of utility helpers

Write these modules in `/providers` if it only means to be used by domain modules, or `/shared` if it means to be used anywhere.

## Testing conventions

- The unit testing file name should be `{file_to_test}.spec.ts`
- The files should be placed in this structure

```txt
|--- folder-a
|    |--- tests
|    |    |--- a.service.spec.ts
|    |--- a.service.ts
```

## Skill tips

- When you see you have to write new modules/classes, use `.agents/skills/code-snippets` to have the
  most correct implementation
- When writing unit tests, use `.agents/skills/testing` to know how to write correct test conventions
- When have to refactor something, use `.agents/skills/refactor` to know how to refactor correctly
- When writing repository-pattern classes, use `write-repository-pattern` skill
