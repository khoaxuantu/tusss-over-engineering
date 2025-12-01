"use client";

import { usePathname } from "next/navigation";
import { createContext, PropsWithChildren } from "react";

interface SidebarContextProps {
  pathName: string;
}

export const SidebarContext = createContext<SidebarContextProps>({
  pathName: "",
});

export default function SidebarRoot({ children }: PropsWithChildren) {
  const pathName = usePathname();

  return (
    <SidebarContext.Provider
      value={{
        pathName,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
