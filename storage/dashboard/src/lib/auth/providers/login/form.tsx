"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@lib/auth/actions/login";
import { LoginFormData, LoginSchema } from "@lib/auth/schemas/login";
import { useToast } from "@lib/shared/components/toast/hooks";
import { FormContextProps } from "@lib/shared/interfaces/form";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const LoginContext = createContext<FormContextProps>({
  onSubmit: () => {},
});

export function LoginFormProvider(props: PropsWithChildren) {
  const router = useRouter();
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const toast = useToast();

  const submit = async (data: LoginFormData) => {
    const res = await login(data.email, data.password);

    if (res.error || !res.data) {
      toast({
        title: res.error?.code,
        description: res.error?.message,
        variant: "error",
      });
      return;
    }

    router.replace("/");
  };

  return (
    <FormProvider {...methods}>
      <LoginContext.Provider
        value={{
          onSubmit: methods.handleSubmit(submit),
        }}
      >
        {props.children}
      </LoginContext.Provider>
    </FormProvider>
  );
}
