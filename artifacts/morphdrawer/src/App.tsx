import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Nav } from "@/components/Nav";
import { useTheme } from "@/lib/storage";

import Create from "@/pages/Create";
import Saved from "@/pages/Saved";
import Practice from "@/pages/Practice";
import Tips from "@/pages/Tips";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Create} />
      <Route path="/saved" component={Saved} />
      <Route path="/practice" component={Practice} />
      <Route path="/tips" component={Tips} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize theme
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background text-foreground relative overflow-hidden">
            {/* Global Noise Overlay */}
            <div className="noise-overlay" />
            
            <Nav />
            
            <main className="flex-1 h-[100dvh] overflow-y-auto pb-24 md:pb-0 relative z-10">
              <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-full">
                <Router />
              </div>
            </main>
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
