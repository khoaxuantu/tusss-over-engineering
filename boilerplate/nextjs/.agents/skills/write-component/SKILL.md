---
name: write-component
description: A guideline to write complete reusable component
---

# Write component

This skill defines the procedure to write a complete reusable component.

## Mindset

- Composition is a must: A component must be designed as composition pattern to be fully compatible
  with Next.js server & client component architecture.

## Example

Refers to the `src/lib/components/cropper/` directory for a complete reusable component example.

## Snippet

For a single component file:

```tsx
interface ComponentNameProps {}

export default function ComponentName(props: ComponentNameProps) {
  return <></>;
}
```

- The `ComponentName` should be replaced with the actual name of the component, following PascalCase
  convention.

## Step by step guide

1. **Define purpose**: Clearly understand what the component is supposed to do and how it will be
   used in the application.
2. **Design anatomy**: Plan the internal structure of the component, including its state management,
   lifecycle methods, and how it will handle events.
3. **Design API**: Decide on the props that the component will accept and how it will be structured,
   based on the anatomy and the expected usage.
4. **Implement component**: Write the actual code for the component, ensuring that it follows best
   practices for React and Next.js, such as using hooks for state management and effects, and
   ensuring that it is compatible with both server and client rendering.
