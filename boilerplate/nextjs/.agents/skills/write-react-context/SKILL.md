---
name: write-react-context
description: The guideline to define a complete usable React context
---

# Write React context

This skill defines how to write a complete usable React context, including the context provider, custom hooks, and usage examples.

## Name conventions

Given a context called `ExampleA`, the name conventions are as follows:

- Context file: `example-a.provider.tsx`
- Context properties: `ExampleAContextProps`
- Context name = `ExampleAContext`
- Context provider: `ExampleAProvider`
- Custom hook: `useExampleA`

## Snippet variants

### Common contexts

Refers to [./references/context.common.md](./references/context.common.md) file.

### Form contexts

Refers to [./references/context.form.md](./references/context.form.md) file.

## Step by step guide

1. Ask the user about the context name.
2. Ask the user about the context type (common, form, or other types that we may define in the future, depending on the [Snippet variants](#snippet-variants) section).
3. Follow the guidelines of the chosen snippet variant to write the context code.
