import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChefHat, PlusCircle, Sparkles, UtensilsCrossed } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { to: "/", label: "Recepti", icon: UtensilsCrossed, ocid: "nav-recepti" },
  {
    to: "/novi-recept",
    label: "Dodaj Recept",
    icon: PlusCircle,
    ocid: "nav-dodaj",
  },
  {
    to: "/ai-sugestije",
    label: "AI Sugestije",
    icon: Sparkles,
    ocid: "nav-ai",
  },
];

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              data-ocid="nav-logo"
            >
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:opacity-90 transition-smooth">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-foreground text-lg tracking-tight">
                  KuhajZajedno
                </span>
                <span className="text-muted-foreground text-xs hidden sm:block">
                  Suradnički razvoj recepata
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Glavna navigacija"
            >
              {navLinks.map(({ to, label, icon: Icon, ocid }) => {
                const isActive =
                  to === "/" ? currentPath === "/" : currentPath.startsWith(to);
                return (
                  <Link key={to} to={to} data-ocid={ocid}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="gap-2 font-medium transition-smooth"
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Nav */}
            <nav
              className="flex md:hidden items-center gap-1"
              aria-label="Mobilna navigacija"
            >
              {navLinks.map(({ to, label, icon: Icon, ocid }) => {
                const isActive =
                  to === "/" ? currentPath === "/" : currentPath.startsWith(to);
                return (
                  <Link key={to} to={to} data-ocid={`${ocid}-mobile`}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="icon"
                      className="transition-smooth"
                      aria-label={label}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <ChefHat className="w-4 h-4" />
              <span>KuhajZajedno — Suradnički razvoj recepata</span>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()}. Napravljeno s ljubavlju koristeći{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
