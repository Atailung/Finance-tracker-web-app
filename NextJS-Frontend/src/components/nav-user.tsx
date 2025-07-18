"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useUser, SignOutButton } from "@clerk/nextjs";

export function NavUser() {
  const { user } = useUser();
  const { isMobile } = useSidebar();

  if (!user) return null; // 👈 Prevent errors if user isn't loaded yet

  const name = user.fullName || "Anonymous";
  const email = user.emailAddresses?.[0]?.emailAddress || "No email";
  const avatar = user.imageUrl || "/default-avatar.png";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Avatar className="h-8 w-8 rounded-lg ring-2 ring-border/40 transition-all duration-200 group-hover:ring-primary/20">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold group-hover:text-primary transition-colors duration-200">
                  {name}
                </span>
                <span className="truncate text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-200">
                  {email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-hover:text-primary transition-colors duration-200 group-hover:scale-110" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg border-border/40 bg-background/95 backdrop-blur-sm"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg ring-2 ring-border/40">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                    {name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs text-muted-foreground">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-border/40" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 hover:bg-accent/50 hover:text-accent-foreground transition-colors duration-200">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border/40" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 hover:bg-accent/50 hover:text-accent-foreground transition-colors duration-200">
                <BadgeCheck className="h-4 w-4 text-primary" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 hover:bg-accent/50 hover:text-accent-foreground transition-colors duration-200">
                <CreditCard className="h-4 w-4 text-primary" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 hover:bg-accent/50 hover:text-accent-foreground transition-colors duration-200">
                <Bell className="h-4 w-4 text-primary" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border/40" />

            {/* ✅ Log out using Clerk */}
            <SignOutButton>
              <DropdownMenuItem className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors duration-200">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
