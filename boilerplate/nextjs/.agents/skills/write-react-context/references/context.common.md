---
name: context.common
description: A common context that can be used in any features.
---

# Context common variant guide

## Snippet

```tsx
"use client";

import { createContext, PropsWithChildren } from "react";

interface NameContextProps {}

export const NameContext = createContext<NameContextProps>({});

export function NameProvider(props: PropsWithChildren) {
  return <NameContext.Provider value={{}}>{props.children}</NameContext.Provider>;
}
```

- The `Name` is the placeholder, change it to the appropriate context name depending on the logic.
  It must not contain keywords such as `Context` or `Provider`.

## Step by step guide

1. Read the snippet to know how to setup a context provider.
2. Add demand logic to the newly context provider.
