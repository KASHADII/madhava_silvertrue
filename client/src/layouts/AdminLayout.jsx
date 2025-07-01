import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/AppSidebar";

const AdminLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="md:hidden" />
            <div className="h-4 w-px bg-sidebar-border md:block" />
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <SidebarTrigger className="hidden md:flex" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
