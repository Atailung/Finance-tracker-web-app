"use client";
import * as React from "react";
import Link from "next/link";
import { ChevronRight, type LucideIcon, Dot } from "lucide-react";
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
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider px-2 py-2 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none">
        Menu
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
                    className="group relative flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:shadow-sm"
                  >
                    {/* Active indicator */}
                    <div className="absolute left-0 top-1/2 h-4 w-0.5 bg-primary rounded-full transition-all duration-200 -translate-y-1/2 opacity-0 data-[active=true]:opacity-100" />
                    
                    {/* Icon with enhanced styling */}
                    {item.icon && (
                      <item.icon className="h-4 w-4 mr-3 transition-colors duration-200 group-hover:text-primary" />
                    )}
                    
                    <span className="flex-1 text-left group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none">
                      {item.title}
                    </span>

                    {/* Badge */}
                    {item.badge && (
                      <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full mr-2 group-data-[collapsible=icon]:opacity-0">
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Enhanced chevron with smooth rotation */}
                    <ChevronRight className="ml-auto h-4 w-4 transition-all duration-300 text-muted-foreground group-hover:text-primary group-data-[state=open]/collapsible:rotate-90 group-data-[state=open]/collapsible:text-primary group-data-[collapsible=icon]:opacity-0" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <SidebarMenuSub className="mt-2 ml-6 border-l border-border/40 pl-4 space-y-1 group-data-[collapsible=icon]:hidden">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                          asChild 
                          isActive={subItem.isActive}
                          className="group relative flex items-center w-full rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-accent/30 hover:text-accent-foreground data-[active=true]:bg-primary/5 data-[active=true]:text-primary"
                        >
                          <Link href={subItem.url} className="flex items-center w-full">
                            {/* Sub-item indicator */}
                            <Dot className="h-3 w-3 mr-2 text-muted-foreground group-hover:text-primary data-[active=true]:text-primary transition-colors duration-200" />
                            
                            <span className="flex-1">{subItem.title}</span>
                            
                            {/* Sub-item badge */}
                            {subItem.badge && (
                              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-full">
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
                className="group relative flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground data-[active=true]:bg-primary data-[active=true]:text-primary data-[active=true]:shadow-sm"
              >
                <Link href={item.url} className="flex items-center w-full">
                  {/* Active indicator */}
                  <div className="absolute left-0 top-1/2 h-4 w-0.5 bg-primary rounded-full transition-all duration-200 -translate-y-1/2 opacity-0 data-[active=true]:opacity-100" />
                  
                  {/* Icon with enhanced styling */}
                  {item.icon && (
                    <item.icon className="h-4 w-4 mr-3 transition-colors duration-200 group-hover:text-primary" />
                  )}
                  
                  <span className="flex-1 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none">
                    {item.title}
                  </span>

                  {/* Badge */}
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full group-data-[collapsible=icon]:opacity-0">
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