"use client";
import * as React from "react";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    badge?: string | number;
    items?: {
      title: string;
      url: string;
      isActive?: boolean;
      badge?: string | number;
    }[];
  }[];
}) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (title: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(title)) {
      newOpenItems.delete(title);
    } else {
      newOpenItems.add(title);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:px-0">
      <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 mb-2 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none border-b border-slate-100">
        Navigation
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-1 px-2 group-data-[collapsible=icon]:px-0">
        {items.map((item) => (
          <SidebarMenuItem key={item.title} className="relative">
            {item.items?.length ? (
              <Collapsible
                open={openItems.has(item.title) || item.isActive}
                onOpenChange={() => toggleItem(item.title)}
                className="group/collapsible"
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.isActive}
                    className="group relative flex items-center w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-slate-900 hover:shadow-sm data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-indigo-600 data-[active=true]:text-white data-[active=true]:shadow-lg hover:translate-x-1 active:scale-[0.98] border border-transparent hover:border-blue-100 data-[active=true]:border-blue-300"
                  >
                    {/* Active indicator bar */}
                    <div className="absolute -left-2 top-1/2 h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full transition-all duration-300 -translate-y-1/2 opacity-0 scale-y-0 data-[active=true]:opacity-100 data-[active=true]:scale-y-100" />

                    {item.icon && (
                      <div className="relative mr-3">
                        <item.icon className="h-5 w-5 transition-all duration-300 text-slate-600 group-hover:text-blue-600 data-[active=true]:text-white group-hover:scale-110 group-hover:rotate-3" />
                        {/* Icon background glow for active state */}
                        <div className="absolute inset-0 bg-white/20 rounded-full scale-0 transition-transform duration-300 data-[active=true]:scale-150 opacity-0 data-[active=true]:opacity-100" />
                      </div>
                    )}

                    <span className="flex-1 text-left text-slate-700 group-hover:text-slate-900 data-[active=true]:text-white font-medium group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none transition-colors duration-300">
                      {item.title}
                    </span>

                    {item.badge && (
                      <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full mr-2 group-data-[collapsible=icon]:opacity-0 transition-all duration-300 group-hover:from-blue-200 group-hover:to-indigo-200 data-[active=true]:bg-white/20 data-[active=true]:text-white shadow-sm">
                        {item.badge}
                      </span>
                    )}

                    <ChevronRight className="ml-auto h-4 w-4 transition-all duration-300 text-slate-500 group-hover:text-blue-600 data-[active=true]:text-white group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:opacity-0 group-hover:scale-110" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent className="transition-all duration-300 ease-out">
                  <SidebarMenuSub className="mt-2 ml-8 relative space-y-1 group-data-[collapsible=icon]:hidden">
                    {/* Decorative line */}
                    <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-transparent" />

                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                          className="group relative flex items-center w-full rounded-lg px-4 py-2.5 text-sm transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 hover:text-slate-900 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-100 data-[active=true]:to-indigo-100 data-[active=true]:text-blue-900 hover:translate-x-1 active:scale-[0.98] border border-transparent hover:border-slate-100 data-[active=true]:border-blue-200 hover:shadow-sm"
                        >
                          <Link href={subItem.url} className="flex items-center w-full">
                            {/* Connection dot */}
                            <div className="relative mr-3 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-slate-300 transition-all duration-300 group-hover:bg-blue-500 data-[active=true]:bg-blue-600 group-hover:scale-125 data-[active=true]:scale-125" />
                              <div className="absolute inset-0 h-2 w-2 rounded-full bg-blue-400 opacity-0 animate-pulse transition-opacity duration-300 data-[active=true]:opacity-50" />
                            </div>

                            <span className="flex-1 text-slate-600 group-hover:text-slate-900 data-[active=true]:text-blue-900 font-medium transition-colors duration-300">
                              {subItem.title}
                            </span>

                            {subItem.badge && (
                              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md transition-all duration-300 group-hover:bg-blue-100 group-hover:text-blue-700 data-[active=true]:bg-blue-200 data-[active=true]:text-blue-800 shadow-sm">
                                {subItem.badge}
                              </span>
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                tooltip={item.title}
                className="group relative flex items-center w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-slate-900 hover:shadow-sm data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-indigo-600 data-[active=true]:text-white data-[active=true]:shadow-lg hover:translate-x-1 active:scale-[0.98] border border-transparent hover:border-blue-100 data-[active=true]:border-blue-300"
              >
                <Link href={item.url} className="flex items-center w-full">
                  {/* Active indicator bar */}
                  <div className="absolute -left-2 top-1/2 h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full transition-all duration-300 -translate-y-1/2 opacity-0 scale-y-0 data-[active=true]:opacity-100 data-[active=true]:scale-y-100" />

                  {item.icon && (
                    <div className="relative mr-3">
                      <item.icon className="h-5 w-5 transition-all duration-300 text-slate-600 group-hover:text-blue-600 data-[active=true]:text-white group-hover:scale-110 group-hover:rotate-3" />
                      {/* Icon background glow for active state */}
                      <div className="absolute inset-0 bg-white/20 rounded-full scale-0 transition-transform duration-300 data-[active=true]:scale-150 opacity-0 data-[active=true]:opacity-100" />
                    </div>
                  )}

                  <span className="flex-1 text-slate-700 group-hover:text-slate-900 data-[active=true]:text-white font-medium group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none transition-colors duration-300">
                    {item.title}
                  </span>

                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full group-data-[collapsible=icon]:opacity-0 transition-all duration-300 group-hover:from-blue-200 group-hover:to-indigo-200 data-[active=true]:bg-white/20 data-[active=true]:text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}