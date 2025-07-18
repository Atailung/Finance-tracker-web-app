"use client";
import * as React from "react";


import {
  BarChart3,
  CreditCard,
  GalleryVerticalEnd,
  PieChart,
  Receipt,
  Settings2,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,

} from "@/components/ui/sidebar";



// Enhanced sample data with better structure
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Fintack",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "/transaction/create",
      icon: CreditCard,
    },
    {
      title: "Budgets",
      url: "/budgets",
      icon: PieChart,
    },
    {
      title: "Accounts",
      url: "/account",
      icon: BarChart3,
    },
    {
      title: "Receipts",
      url: "/receipts",
      icon: Receipt,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Team",
          url: "/settings/team",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "Limits",
          url: "/settings/limits",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";







  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out"
      {...props}
    >
      <SidebarHeader className="border-b border-border/40 bg-background/50 backdrop-blur-sm">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-border/40 scrollbar-track-transparent hover:scrollbar-thumb-border/60">
        <NavMain items={data.navMain} />
      </SidebarContent>















      <SidebarFooter className="border-t border-border/40 bg-background/50 backdrop-blur-sm p-2 space-y-2">
        <div className="flex justify-center">
          <button
            onClick={toggleSidebar}
            className="group relative h-8 w-8 rounded-md border border-border/40 bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <div className="relative overflow-hidden">
              <ChevronLeft
                className={`h-4 w-4 transition-all duration-300 ${
                  isCollapsed
                    ? "translate-x-full opacity-0 rotate-180"
                    : "translate-x-0 opacity-100 rotate-0"
                }`}
              />
              <ChevronRight
                className={`h-4 w-4 absolute top-0 left-0 transition-all duration-300 ${
                  isCollapsed
                    ? "translate-x-0 opacity-100 rotate-0"
                    : "-translate-x-full opacity-0 rotate-180"
                }`}
              />
            </div>

            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        <div className="pt-2">
          <NavUser />
        </div>
      </SidebarFooter>


      <SidebarRail className="bg-gradient-to-b from-transparent via-border/20 to-transparent hover:via-border/40 transition-colors duration-200" />
    </Sidebar>
  )
}

























































