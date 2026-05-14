import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { calculateExpenses, CalculatorInputs, City, FamilySize } from "@/lib/calculator";

type Goal = "Budget survival" | "Comfortable living" | "Save 20%" | "Save 30%" | "Luxury";

export default function MinimumSalaryPage() {
  const [city, setCity] = useState<City>("Dubai");
  const [familySize, setFamilySize] = useState<FamilySize>("Solo");
  const [goal, setGoal] = useState<Goal>("Comfortable living");

  const results = useMemo(() => {
    // Map goals to calculator inputs
    const lifestyleMap = {
      "Budget survival": "Budget",
      "Comfortable living": "Moderate",
      "Save 20%": "Comfortable",
      "Save 30%": "Comfortable",
      "Luxury": "Luxury"
    } as const;

    const rentMap = {
      "Solo": {
        "Budget survival": "Shared room",
        "Comfortable living": "Studio",
        "Save 20%": "1BR",
        "Save 30%": "1BR",
        "Luxury": "2BR"
      },
      "Couple": {
        "Budget survival": "Studio",
        "Comfortable living": "1BR",
        "Save 20%": "1BR",
        "Save 30%": "1BR",
        "Luxury": "2BR"
      },
      "Family with 1 kid": {
        "Budget survival": "1BR",
        "Comfortable living": "2BR",
        "Save 20%": "2BR",
        "Save 30%": "2BR",
        "Luxury": "3BR"
      },
      "Family with 2 kids": {
        "Budget survival": "2BR",
        "Comfortable living": "2BR",
        "Save 20%": "3BR",
        "Save 30%": "3BR",
        "Luxury": "3BR"
      },
      "Family with 3 kids": {
        "Budget survival": "2BR",
        "Comfortable living": "3BR",
        "Save 20%": "3BR",
        "Save 30%": "3BR",
        "Luxury": "3BR"
      }
    } as const;

    const inputs: CalculatorInputs = {
      city,
      salary: 0, // Ignored for base calculation
      familySize,
      rentPreference: rentMap[familySize][goal] as any,
      carOwnership: goal === "Budget survival" ? "No car (public transport)" : "Own a car",
      schooling: familySize.includes("kid") && goal !== "Budget survival" ? "Private school 1 kid" : "None",
      lifestyle: lifestyleMap[goal]
    };

    // calculate base expenses
    const baseCalc = calculateExpenses({ ...inputs, salary: 100000 }); // High salary to avoid negative checks

    let targetSalary = baseCalc.totalExpenses;

    if (goal === "Save 20%") {
      targetSalary = Math.round(baseCalc.totalExpenses / 0.8);
    } else if (goal === "Save 30%") {
      targetSalary = Math.round(baseCalc.totalExpenses / 0.7);
    } else if (goal === "Luxury") {
      targetSalary = Math.round(baseCalc.totalExpenses / 0.6); // Assume 40% savings in luxury
    }

    return {
      targetSalary,
      expenses: baseCalc.totalExpenses,
      breakdown: baseCalc.breakdown.filter(b => b.amount > 0).sort((a,b) => b.amount - a.amount),
      inputs
    };

  }, [city, familySize, goal]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Minimum Target Salary</h1>
        <p className="text-muted-foreground text-lg">Tell us your lifestyle goals, and we'll calculate what you need to earn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <Card className="md:col-span-5 shadow-md">
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>City</Label>
              <Select value={city} onValueChange={(v: City) => setCity(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dubai">Dubai</SelectItem>
                  <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Family Size</Label>
              <Select value={familySize} onValueChange={(v: FamilySize) => setFamilySize(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solo">Solo</SelectItem>
                  <SelectItem value="Couple">Couple</SelectItem>
                  <SelectItem value="Family with 1 kid">Family with 1 kid</SelectItem>
                  <SelectItem value="Family with 2 kids">Family with 2 kids</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Lifestyle Goal</Label>
              <Select value={goal} onValueChange={(v: Goal) => setGoal(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Budget survival">Budget survival</SelectItem>
                  <SelectItem value="Comfortable living">Comfortable living</SelectItem>
                  <SelectItem value="Save 20%">Save 20% of income</SelectItem>
                  <SelectItem value="Save 30%">Save 30% of income</SelectItem>
                  <SelectItem value="Luxury">Luxury living</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <Card className="bg-primary text-primary-foreground shadow-lg border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <CardHeader>
              <CardTitle className="text-primary-foreground/80 font-normal">Minimum Recommended Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl md:text-6xl font-bold tracking-tight mb-2">
                {results.targetSalary.toLocaleString()} <span className="text-2xl font-normal opacity-80">AED/mo</span>
              </div>
              <p className="text-primary-foreground/70">
                To achieve your goal in {city} for a {familySize.toLowerCase()}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Assumed Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">{results.expenses.toLocaleString()} AED total</div>
              <div className="space-y-3">
                {results.breakdown.map(item => (
                  <div key={item.category} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{item.category}</span>
                    <span className="font-medium">{item.amount.toLocaleString()} AED</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="text-sm text-muted-foreground">
                <p><strong>Assumptions made:</strong> {results.inputs.rentPreference} apartment, {results.inputs.carOwnership.toLowerCase()}, {results.inputs.schooling.toLowerCase().replace("none", "no private schooling")}.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
