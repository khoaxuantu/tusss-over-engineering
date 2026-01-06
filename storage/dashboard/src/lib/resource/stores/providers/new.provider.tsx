"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceId } from "@lib/resource/constants";
import { useToast } from "@lib/shared/components/toast/hooks";
import { FormContextProps } from "@lib/shared/interfaces/form";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { postStore } from "../actions/post";
import { StoreNewFormData, StoreNewSchema } from "../schemas";

interface StoreNewContextProps extends FormContextProps {
  isDirty: boolean;
}

export const StoreNewContext = createContext<StoreNewContextProps>({
  onSubmit: () => {},
  isDirty: false,
});

export function StoreNewProvider(props: PropsWithChildren) {
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<StoreNewFormData>({
    resolver: zodResolver(StoreNewSchema),
    defaultValues: {
      name: "",
      type: "AUTH",
      city_id: "",
      district_id: "",
    },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = async (data: StoreNewFormData) => {
    const res = await postStore(data);

    if (!res.data || res.error) {
      toast({ title: res.error?.code, description: res.error?.message, variant: "error" });
      return;
    }

    toast({
      variant: "success",
      title: "Success",
      description: `Store created successfully. New id: ${res.data.new_id.as_num}`,
    });

    router.replace(`/${ResourceId.store}/${res.data.new_id.as_num}`);
  };

  return (
    <FormProvider {...methods}>
      <StoreNewContext.Provider value={{ onSubmit: handleSubmit(onSubmit), isDirty }}>
        {props.children}
      </StoreNewContext.Provider>
    </FormProvider>
  );
}
