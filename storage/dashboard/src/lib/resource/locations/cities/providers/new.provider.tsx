"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@lib/shared/components/toast/hooks";
import { FormContextProps } from "@lib/shared/interfaces/form";
import { createContext, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { postCity } from "../actions/post";
import { CityNewFormData, CityNewSchema } from "../schemas";

interface CityNewContextProps extends FormContextProps {}

export const CityNewContext = createContext<CityNewContextProps>({
  onSubmit: () => {},
});

export function CityNewProvider(props: PropsWithChildren) {
  const toast = useToast();
  const methods = useForm<CityNewFormData>({
    resolver: zodResolver(CityNewSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  const onSubmit = async (data: CityNewFormData) => {
    const res = await postCity(data);

    if (res.error) {
      toast({
        title: res.error.code,
        description: res.error.message,
        variant: "error",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Location created",
      variant: "success",
    });
  };

  return (
    <FormProvider {...methods}>
      <CityNewContext.Provider value={{ onSubmit: methods.handleSubmit(onSubmit) }}>
        {props.children}
      </CityNewContext.Provider>
    </FormProvider>
  );
}
