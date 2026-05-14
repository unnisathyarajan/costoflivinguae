import { Link } from "wouter";
import { Calculator, Map, DollarSign, BookOpen, ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-accent text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Updated for 2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Is your UAE salary <span className="text-accent">actually enough?</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Don't guess your way into a new life. Get a realistic breakdown of rent, schooling, groceries, and savings based on actual expat data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/calculator">
                <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 w-full sm:w-auto text-lg h-14 px-8 font-semibold shadow-lg">
                  Start Calculator <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-6 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> 100% Client-side</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> No Signup</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> Real Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Four tools to plan your move</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to evaluate an offer, choose a city, and set realistic expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Salary Sufficiency Calculator</h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                Input your offer, family size, and lifestyle preferences. Instantly see a detailed breakdown of your monthly expenses and savings potential.
              </p>
              <Link href="/calculator">
                <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground">
                  Try Calculator <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dubai vs Abu Dhabi</h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                Compare rent, lifestyle, and commuting stress between the two major emirates to find the right fit for your family.
              </p>
              <Link href="/compare">
                <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground">
                  Compare Cities <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Minimum Salary Target</h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                Work backwards. Tell us the lifestyle you want, and we'll tell you the minimum AED salary you need to negotiate for.
              </p>
              <Link href="/minimum-salary">
                <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground">
                  Find Target Salary <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expat Reality Stories</h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                Read real-world profiles of people living in the UAE right now. See exactly how a 12k vs 45k salary feels on the ground.
              </p>
              <Link href="/stories">
                <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground">
                  Read Stories <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
