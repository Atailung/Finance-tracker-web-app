import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar/>
        <main className="flex-1 p-4">
          <SidebarTrigger />

          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
