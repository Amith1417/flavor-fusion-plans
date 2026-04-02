import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomTabBar } from "@/components/BottomTabBar";
import { UtensilsCrossed, Menu } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header - hidden on mobile */}
          <header className="hidden md:flex h-14 items-center border-b border-border px-4 bg-card sticky top-0 z-30">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="ml-3 flex items-center gap-2">
              <div className="h-7 w-7 rounded-xl gradient-mint flex items-center justify-center">
                <UtensilsCrossed className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground font-display">SmartPlate AI</span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
            {children}
          </main>
        </div>
        {/* Bottom tab bar - mobile only */}
        <BottomTabBar />
      </div>
    </SidebarProvider>
  );
}
