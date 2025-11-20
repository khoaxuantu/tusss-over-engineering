"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@lib/auth/actions/login";
import { LoginFormData, LoginSchema } from "@lib/auth/schemas/login";
import { FormContextProps } from "@lib/shared/interfaces/form";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const SigninContext = createContext<FormContextProps>({
  onSubmit: () => {},
});

export function SigninFormProvider(props: PropsWithChildren) {
  const router = useRouter();
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const submit = async (data: LoginFormData) => {
    console.log(data);
    const res = await login(data.email, data.password);

    if (res.error || !res.data) {
      alert(res.error);
      return;
    }

    router.replace("/");
  };

  return (
    <FormProvider {...methods}>
      <SigninContext.Provider
        value={{
          onSubmit: methods.handleSubmit(submit),
        }}
      >
        {props.children}
      </SigninContext.Provider>
    </FormProvider>
  );
}
