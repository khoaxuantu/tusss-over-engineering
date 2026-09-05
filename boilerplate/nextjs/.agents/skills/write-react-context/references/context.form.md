---
name: context.form
description: A form context that can be used in any features that have forms. It provides the wrapper for `react-hook-form` and the form state management.
---

# Context common variant guide

## Snippet

```tsx
"use client";

import { FormSubmitContextProps } from "@/lib/contexts/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

interface NameContextProps extends FormSubmitContextProps {}

export const NameContext = createContext<NameContextProps>({
  onSubmit: () => {},
});

export function NameProvider(props: PropsWithChildren) {
  const methods = useForm<DataName>({
    resolver: zodResolver(SchemaName),
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <Context>{props.children}</Context>
    </FormProvider>
  );
}

function Context(props: PropsWithChildren) {
  const { handleSubmit } = useNameForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return <NameContext.Provider value={{ onSubmit }}>{props.children}</NameContext.Provider>;
}

export function useNameForm() {
  return useFormContext<DataName>();
}
```

- The `Name` is the placeholder, change it to the appropriate context name depending on the logic.
  It must not contain keywords such as `Context` or `Provider`.
- The `SchemaName` is the naming placholder of the schema that will be used in the form.
- The `DataName` is the type naming placeholder that reflects the type from the `SchemaName` object.

## Step by step guide

1. Read the snippet to know how to setup a form provider.
2. Define the corresponding form schema, fill the `SchemaName` and `DataName` snippet placeholder.
   Refer to `write-schema` skill to know how to write proper schemas.
3. Add demand logic to your form provider.
