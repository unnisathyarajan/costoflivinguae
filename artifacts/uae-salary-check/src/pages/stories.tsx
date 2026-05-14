import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";

const stories = [
  {
    id: 1,
    name: "Priya",
    age: 28,
    role: "IT Engineer",
    city: "Dubai",
    status: "Solo",
    income: 18000,
    savings: 4500,
    lifestyle: "Comfortable",
    rent: "Studio in JVC (4,500)",
    transport: "Owns car (1,200)",
    groceries: "Waitrose/Carrefour (1,500)",
    fun: "Brunches & dining out (2,500)",
    insight: "I live comfortably and go out every weekend, but I wish I saved more. Cars are cheap to buy but insurance and Salik (tolls) add up fast."
  },
  {
    id: 2,
    name: "Mohammed",
    age: 35,
    role: "Finance Executive",
    city: "Dubai",
    status: "Family of 4",
    income: 45000,
    savings: 8000,
    lifestyle: "Thriving",
    rent: "3BR Villa in Springs (14,000)",
    transport: "Two cars (3,500)",
    groceries: "Family groceries (4,000)",
    fun: "Kids activities & dining (4,500)",
    insight: "School fees (8k/month) take a massive chunk of our income. 45k sounds like a lot, but with two kids in private British schools, you budget carefully."
  },
  {
    id: 3,
    name: "Ananya",
    age: 30,
    role: "Nurse",
    city: "Abu Dhabi",
    status: "Solo",
    income: 12000,
    savings: 3000,
    lifestyle: "Moderate",
    rent: "Shared flat master bedroom (2,500)",
    transport: "Bus & Taxi (400)",
    groceries: "Lulu / local markets (1,000)",
    fun: "Occasional dining (1,000)",
    insight: "Housing in Abu Dhabi can be tricky. I share an apartment to save money so I can send remittances home. It's a quiet life but safe."
  },
  {
    id: 4,
    name: "Raj & Deepa",
    age: "38/36",
    role: "Marketing / HR",
    city: "Abu Dhabi",
    status: "Couple, 1 kid",
    income: 30000,
    savings: 6000,
    lifestyle: "Comfortable",
    rent: "2BR Apartment (7,500)",
    transport: "One SUV (1,800)",
    groceries: "Supermarket runs (2,500)",
    fun: "Weekend trips, parks (2,000)",
    insight: "Combined income makes living here great. Abu Dhabi is very family friendly. We use the Entertainer app for 2-for-1 deals to save on dining."
  },
  {
    id: 5,
    name: "Karthik",
    age: 25,
    role: "Logistics",
    city: "Sharjah",
    status: "Solo",
    income: 4500,
    savings: 1000,
    lifestyle: "Surviving",
    rent: "Bedspace (800)",
    transport: "Company provided (0)",
    groceries: "Cooking at home (600)",
    fun: "Minimal (200)",
    insight: "I live in Sharjah to save on rent, but the commute to Dubai is 2 hours each way. It's hard work, but I save enough to build a house back home."
  },
  {
    id: 6,
    name: "Sarah",
    age: 32,
    role: "Remote Freelancer",
    city: "Dubai",
    status: "Solo",
    income: 18350, // $5000 USD
    savings: 2500,
    lifestyle: "Moderate",
    rent: "1BR in Sports City (6,500)",
    transport: "Metro & Uber (800)",
    groceries: "Delivery apps (1,800)",
    fun: "Co-working spaces, cafes (3,000)",
    insight: "Dubai is incredible for remote work, but the lifestyle inflation is real. You constantly want to eat out or order Deliveroo."
  }
];

function StoryCard({ story }: { story: typeof stories[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  const savingsRate = Math.round((story.savings / story.income) * 100);

  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <CardTitle className="text-xl">{story.name}, {story.age}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1 text-primary font-medium">
              <Briefcase className="w-3 h-3" /> {story.role}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
            {story.lifestyle}
          </Badge>
        </div>
        <div className="flex gap-3 text-sm text-muted-foreground mt-2">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {story.city}</span>
          <span>•</span>
          <span>{story.status}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-medium">Monthly Income</span>
            <span className="font-bold">{story.income.toLocaleString()} AED</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-emerald-600">Savings</span>
            <span className="font-bold text-emerald-600">+{story.savings.toLocaleString()} AED ({savingsRate}%)</span>
          </div>
        </div>

        <p className="text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-3 my-4">
          "{story.insight}"
        </p>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full flex justify-between">
              See breakdown
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Housing:</span> <span>{story.rent}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Transport:</span> <span>{story.transport}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Food:</span> <span>{story.groceries}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Lifestyle:</span> <span>{story.fun}</span></div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

export default function StoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Expat Reality Stories</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Numbers are helpful, but real life is messy. Here is how people with different salaries actually live and spend in the UAE.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
