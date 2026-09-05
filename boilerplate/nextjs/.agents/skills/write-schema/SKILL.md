---
name: write-schema
description: The guideline to define a complete usable schema for the project
---

# Write schema

This skill defines how to write a complete usable schema for the project, including the schema definition, validation, and usage examples.

It utilizes the Zod library to define the schema constraints.

## Naming conventions

Given the namespace of the schema called `ExampleA`, the naming conventions are as follows:

- Schema file: `example-a.schema.ts`
- Schema name: `ExampleASchema`
- Data type name: `ExampleAData`

## Snippet

```ts
import { z } from "zod";

export type SchemaData = z.infer<typeof SchemaName>;

export const SchemaName = z.object({
  // Fill in the schema definition here
});
```
