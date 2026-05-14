import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";

export default function ComparePage() {
  const comparisonData = [
    { label: "Overall Cost Index", dubai: 85, ad: 70, higherIsBetter: false },
    { label: "Savings Potential", dubai: 60, ad: 80, higherIsBetter: true },
    { label: "Traffic & Commute", dubai: 40, ad: 85, higherIsBetter: true }, // lower stress = higher score
    { label: "Family Friendliness", dubai: 75, ad: 90, higherIsBetter: true },
    { label: "Nightlife & Social", dubai: 95, ad: 65, higherIsBetter: true },
    { label: "Public Transport", dubai: 90, ad: 50, higherIsBetter: true },
    { label: "Safety", dubai: 95, ad: 98, higherIsBetter: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Dubai vs Abu Dhabi</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choosing between the two major emirates involves more than just salary. Here is how they stack up.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="border-t-4 border-t-primary shadow-md">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Dubai</CardTitle>
            <CardDescription>The bustling, glamorous hub</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Endless entertainment and dining options</span></li>
              <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Excellent Metro and public transport</span></li>
              <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> <span>More job opportunities and networking</span></li>
              <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-500 shrink-0" /> <span>Higher rent and schooling costs</span></li>
              <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-500 shrink-0" /> <span>Heavy traffic during peak hours</span></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-accent shadow-md">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Abu Dhabi</CardTitle>
            <CardDescription>The calmer, family-focused capital</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Generally lower rent for more space</span></li>
              <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Calmer pace of life, great for families</span></li>
              <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Less traffic congestion</span></li>
              <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-500 shrink-0" /> <span>Limited public transport (mainly buses)</span></li>
              <li className="flex items-start gap-2"><X className="w-5 h-5 text-red-500 shrink-0" /> <span>Quieter nightlife and social scene</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md mb-12">
        <CardHeader>
          <CardTitle>Lifestyle Comparison Index</CardTitle>
          <CardDescription>Scores out of 100 based on expat feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8 mt-4">
            {comparisonData.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 md:col-span-3 text-sm font-medium text-right md:text-left mb-1 md:mb-0">
                  {item.label}
                </div>
                <div className="col-span-5 md:col-span-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 text-xs text-right text-muted-foreground">DBX</span>
                    <Progress value={item.dubai} className="h-2 flex-1" indicatorClassName="bg-primary" />
                    <span className="w-8 text-xs font-bold">{item.dubai}</span>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 text-center text-muted-foreground text-xs font-medium px-2">
                  vs
                </div>
                <div className="col-span-5 md:col-span-4">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <span className="w-8 text-xs text-left text-muted-foreground">AUH</span>
                    <Progress value={item.ad} className="h-2 flex-1 rotate-180" indicatorClassName="bg-accent" />
                    <span className="w-8 text-xs font-bold text-right">{item.ad}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">The Verdict</h3>
        <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
          Choose <strong>Dubai</strong> if you are young, single, highly social, or prioritizing career networking. Choose <strong>Abu Dhabi</strong> if you are moving with a family, prioritize saving money, and prefer a calmer, more predictable lifestyle.
        </p>
      </div>
    </div>
  );
}
