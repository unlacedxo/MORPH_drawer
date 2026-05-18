import { Link, useLocation } from "wouter";
import { PenTool, Bookmark, Dumbbell, Lightbulb, Settings } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const navItems = [
  { href: "/", label: "Create", icon: PenTool },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/practice", label: "Practice", icon: Dumbbell },
  { href: "/tips", label: "Tips", icon: Lightbulb },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Nav() {
  const [location] = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar h-full py-8 px-4 shrink-0">
        <div className="mb-10 px-4">
          <h1 className="font-display text-2xl font-bold tracking-tight text-sidebar-foreground">
            MORPHDRAWER
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-mono">pocket creature workshop</p>
        </div>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className="outline-none">
                <div
                  className={twMerge(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground font-medium sketchy-border shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground tactile-hover"
                  )}
                >
                  <item.icon className={clsx("w-5 h-5", isActive ? "opacity-100" : "opacity-70")} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-sidebar pb-safe z-40">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className="outline-none flex-1">
                <div
                  className={twMerge(
                    "flex flex-col items-center justify-center py-2 gap-1 rounded-xl transition-all duration-200 cursor-pointer",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className={clsx("w-6 h-6 transition-transform", isActive && "scale-110")} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
