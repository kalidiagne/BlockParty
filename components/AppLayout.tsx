import React, { ReactNode } from "react";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children?: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <AppHeader />
      <div className="container mx-auto">
        <div className="mt-20">{children}</div>
      </div>
    </div>
  );
};
