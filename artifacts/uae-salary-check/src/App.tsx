import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Calculator, Map, DollarSign, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

// Placeholder for components until they are written
import Home from "./pages/home";
import CalculatorPage from "./pages/calculator";
import ComparePage from "./pages/compare";
import MinimumSalaryPage from "./pages/minimum-salary";
import StoriesPage from "./pages/stories";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/calculator", label: "Calculator", icon: Calculator },
    { href: "/compare", label: "Compare Cities", icon: Map },
    { href: "/minimum-salary", label: "Min Salary", icon: DollarSign },
    { href: "/stories", label: "Real Stories", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AE
            </div>
            <span className="font-bold text-lg hidden sm:block">Can I Afford Dubai?</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location === link.href;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 text-sm font-medium p-2 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      <footer className="border-t border-border py-8 mt-auto bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">Can I Afford Dubai? &copy; {new Date().getFullYear()}</p>
          <p>A practical guide for expats and professionals relocating to the UAE.</p>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/calculator" component={CalculatorPage} />
        <Route path="/compare" component={ComparePage} />
        <Route path="/minimum-salary" component={MinimumSalaryPage} />
        <Route path="/stories" component={StoriesPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
