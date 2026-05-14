import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CalculatorInputs,
  calculateExpenses,
  CITY_AREAS,
  AREA_TIERS,
  AreaTier,
} from "@/lib/calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { AlertCircle, Info, Building2, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
];

const TIER_BADGE: Record<AreaTier, { label: string; cls: string }> = {
  "Premium":              { label: "Premium",          cls: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
  "Mid-range / Family":  { label: "Mid-range",         cls: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  "Affordable / Value":  { label: "Affordable",        cls: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
  "Budget / Farther Out":{ label: "Budget",            cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
};

export default function CalculatorPage() {
  const form = useForm<CalculatorInputs>({
    defaultValues: {
      city: "Dubai",
      areaTier: "Mid-range / Family",
      community: CITY_AREAS["Dubai"]["Mid-range / Family"][0],
      salary: 20000,
      familySize: "Solo",
      rentPreference: "1BR",
      carOwnership: "No car (public transport)",
      schooling: "None",
      lifestyle: "Moderate",
    },
  });

  const { watch, setValue } = form;
  const formData = watch();

  // When city changes → reset areaTier to "Mid-range / Family" and reset community
  useEffect(() => {
    const defaultTier: AreaTier = "Mid-range / Family";
    setValue("areaTier", defaultTier);
    setValue("community", CITY_AREAS[formData.city][defaultTier][0]);
  }, [formData.city]);

  // When areaTier changes → reset community to first in list (for the current city)
  useEffect(() => {
    const communities = CITY_AREAS[formData.city][formData.areaTier];
    if (communities && !communities.includes(formData.community)) {
      setValue("community", communities[0]);
    }
  }, [formData.areaTier]);

  const results = useMemo(() => {
    try {
      return calculateExpenses(formData);
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [
    formData.city,
    formData.areaTier,
    formData.community,
    formData.salary,
    formData.familySize,
    formData.rentPreference,
    formData.carOwnership,
    formData.schooling,
    formData.lifestyle,
  ]);

  if (!results) return null;

  const communities = CITY_AREAS[formData.city][formData.areaTier] ?? [];
  const tierBadge = TIER_BADGE[formData.areaTier];

  const getScoreColor = (score: number) => {
    if (score <= 20) return "bg-red-500";
    if (score <= 40) return "bg-orange-500";
    if (score <= 60) return "bg-yellow-500";
    if (score <= 80) return "bg-green-500";
    return "bg-emerald-500";
  };

  const getScoreTextClass = (score: number) => {
    if (score <= 20) return "text-red-500";
    if (score <= 40) return "text-orange-500";
    if (score <= 60) return "text-yellow-600";
    if (score <= 80) return "text-green-500";
    return "text-emerald-500";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Salary Sufficiency Calculator</h1>
        <p className="text-muted-foreground">Adjust the parameters to see a real-time breakdown of your potential expenses and savings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-5">

                  {/* ── City ── */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger data-testid="select-city">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Dubai">Dubai</SelectItem>
                            <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* ── Area Tier ── */}
                  <FormField
                    control={form.control}
                    name="areaTier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                          Area Type
                        </FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger data-testid="select-area-tier">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AREA_TIERS.map((tier) => (
                              <SelectItem key={tier} value={tier}>
                                {tier}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${tierBadge.cls}`}>
                          {tierBadge.label} area — rent adjusted accordingly
                        </span>
                      </FormItem>
                    )}
                  />

                  {/* ── Community ── */}
                  <FormField
                    control={form.control}
                    name="community"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          Community
                        </FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger data-testid="select-community">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {communities.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <Separator />

                  {/* ── Salary ── */}
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Salary — {field.value.toLocaleString()} AED</FormLabel>
                        <FormControl>
                          <Slider
                            min={3000}
                            max={100000}
                            step={1000}
                            value={[field.value]}
                            onValueChange={(val) => field.onChange(val[0])}
                            data-testid="slider-salary"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* ── Family Size ── */}
                  <FormField
                    control={form.control}
                    name="familySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Family Size</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger data-testid="select-family-size">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Solo">Solo</SelectItem>
                            <SelectItem value="Couple">Couple</SelectItem>
                            <SelectItem value="Family with 1 kid">Family with 1 kid</SelectItem>
                            <SelectItem value="Family with 2 kids">Family with 2 kids</SelectItem>
                            <SelectItem value="Family with 3 kids">Family with 3 kids</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* ── Rent Preference ── */}
                  <FormField
                    control={form.control}
                    name="rentPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apartment Size</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger data-testid="select-rent">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Shared room">Shared room</SelectItem>
                            <SelectItem value="Studio">Studio</SelectItem>
                            <SelectItem value="1BR">1 Bedroom</SelectItem>
                            <SelectItem value="2BR">2 Bedrooms</SelectItem>
                            <SelectItem value="3BR">3 Bedrooms</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* ── Transport ── */}
                  <FormField
                    control={form.control}
                    name="carOwnership"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transport</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger data-testid="select-transport">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="No car (public transport)">Public Transport</SelectItem>
                            <SelectItem value="Own a car">Own a Car</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* ── Schooling (conditional) ── */}
                  {formData.familySize !== "Solo" && formData.familySize !== "Couple" && (
                    <FormField
                      control={form.control}
                      name="schooling"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Schooling</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger data-testid="select-schooling">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="None">None / Public school</SelectItem>
                              <SelectItem value="Private school 1 kid">Private school (1 kid)</SelectItem>
                              <SelectItem value="Private school 2 kids">Private school (2 kids)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  )}

                  {/* ── Lifestyle ── */}
                  <FormField
                    control={form.control}
                    name="lifestyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lifestyle Level</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger data-testid="select-lifestyle">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Budget">Budget</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Comfortable">Comfortable</SelectItem>
                            <SelectItem value="Luxury">Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground mb-1">Monthly Savings</div>
                <div className={`text-3xl font-bold ${results.netSavings >= 0 ? "text-emerald-500" : "text-red-500"}`} data-testid="text-monthly-savings">
                  {results.netSavings >= 0 ? "+" : ""}{results.netSavings.toLocaleString()} AED
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {results.savingsRate.toFixed(1)}% savings rate
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground mb-1">Total Expenses</div>
                <div className="text-3xl font-bold text-primary" data-testid="text-total-expenses">
                  {results.totalExpenses.toLocaleString()} AED
                </div>
                <div className="text-sm text-muted-foreground mt-1">Per month</div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground mb-1">Affordability Score</div>
                <div className={`text-3xl font-bold ${getScoreTextClass(results.affordabilityScore)}`} data-testid="text-affordability-score">
                  {results.affordabilityScore}/100
                </div>
                <Progress
                  value={results.affordabilityScore}
                  className="mt-3 h-2"
                  indicatorClassName={getScoreColor(results.affordabilityScore)}
                />
                <div className="text-xs font-medium mt-2 text-right">
                  Status: <span className={getScoreTextClass(results.affordabilityScore)}>{results.lifestyleCategory}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {results.tips.length > 0 && (
            <div className="grid grid-cols-1 gap-3">
              {results.tips.map((tip, i) => {
                const isWarning = tip.includes("exceed") || tip.includes("downgrade") || tip.includes("very low");
                return (
                  <Alert
                    key={i}
                    variant={isWarning ? "destructive" : "default"}
                    className={!isWarning ? "border-primary bg-primary/5 text-primary" : ""}
                  >
                    {isWarning ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                    <AlertTitle>{isWarning ? "Warning" : "Tip"}</AlertTitle>
                    <AlertDescription>{tip}</AlertDescription>
                  </Alert>
                );
              })}
            </div>
          )}

          <Card className="shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.breakdown.filter(d => d.amount > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="amount"
                      >
                        {results.breakdown.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value.toLocaleString()} AED`, "Amount"]}
                        contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {results.breakdown
                      .filter(d => d.amount > 0)
                      .sort((a, b) => b.amount - a.amount)
                      .map((item) => {
                        const originalIndex = results.breakdown.indexOf(item);
                        return (
                          <div key={item.category} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: COLORS[originalIndex % COLORS.length] }}
                              />
                              <span className="text-sm font-medium">{item.category}</span>
                            </div>
                            <span className="text-sm font-bold">{item.amount.toLocaleString()} AED</span>
                          </div>
                        );
                      })}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Total Expected</span>
                      <span className="font-bold text-primary">{results.totalExpenses.toLocaleString()} AED</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
