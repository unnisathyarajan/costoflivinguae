export type City = "Dubai" | "Abu Dhabi";
export type AreaTier = "Premium" | "Mid-range / Family" | "Affordable / Value" | "Budget / Farther Out";
export type FamilySize = "Solo" | "Couple" | "Family with 1 kid" | "Family with 2 kids" | "Family with 3 kids";
export type RentPreference = "Shared room" | "Studio" | "1BR" | "2BR" | "3BR";
export type CarOwnership = "No car (public transport)" | "Own a car";
export type Schooling = "None" | "Private school 1 kid" | "Private school 2 kids";
export type LifestyleLevel = "Budget" | "Moderate" | "Comfortable" | "Luxury";

export interface CalculatorInputs {
  city: City;
  areaTier: AreaTier;
  community: string;
  salary: number;
  familySize: FamilySize;
  rentPreference: RentPreference;
  carOwnership: CarOwnership;
  schooling: Schooling;
  lifestyle: LifestyleLevel;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
}

export interface CalculatorResults {
  breakdown: ExpenseBreakdown[];
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
  affordabilityScore: number;
  lifestyleCategory: string;
  estimatedAnnualSavings: number;
  tips: string[];
}

export const CITY_AREAS: Record<City, Record<AreaTier, string[]>> = {
  Dubai: {
    "Premium": [
      "Palm Jumeirah",
      "Dubai Marina",
      "Downtown Dubai",
      "DIFC",
    ],
    "Mid-range / Family": [
      "JVC",
      "Al Barsha",
      "Mirdif",
      "Arabian Ranches",
    ],
    "Affordable / Value": [
      "Discovery Gardens",
      "International City",
      "Deira",
      "Bur Dubai",
    ],
    "Budget / Farther Out": [
      "Dubai South",
      "Jebel Ali",
      "Al Quoz",
      "Sharjah Border",
    ],
  },
  "Abu Dhabi": {
    "Premium": [
      "Al Reem Island",
      "Saadiyat Island",
      "Yas Island",
      "Corniche",
    ],
    "Mid-range / Family": [
      "Khalifa City",
      "Al Raha",
      "Al Reef",
      "Tourist Club Area",
    ],
    "Affordable / Value": [
      "MBZ City",
      "Mussafah / Shabiya",
      "Baniyas",
      "Al Shamkha",
    ],
    "Budget / Farther Out": [
      "Shahama",
      "Al Wathba",
      "Mafraq",
    ],
  },
};

export const AREA_TIERS: AreaTier[] = [
  "Premium",
  "Mid-range / Family",
  "Affordable / Value",
  "Budget / Farther Out",
];

const AREA_RENT_MULTIPLIER: Record<AreaTier, number> = {
  "Premium": 1.45,
  "Mid-range / Family": 1.0,
  "Affordable / Value": 0.78,
  "Budget / Farther Out": 0.60,
};

const RENT_DUBAI: Record<RentPreference, number> = {
  "Shared room": 1500,
  "Studio": 4500,
  "1BR": 7000,
  "2BR": 10500,
  "3BR": 15000,
};

const RENT_AD: Record<RentPreference, number> = {
  "Shared room": 1200,
  "Studio": 3500,
  "1BR": 5500,
  "2BR": 8500,
  "3BR": 12000,
};

const GROCERIES_PER_PERSON: Record<LifestyleLevel, number> = {
  Budget: 500,
  Moderate: 800,
  Comfortable: 1200,
  Luxury: 2000,
};

const DINING: Record<LifestyleLevel, number> = {
  Budget: 200,
  Moderate: 500,
  Comfortable: 1000,
  Luxury: 2500,
};

const ENTERTAINMENT: Record<LifestyleLevel, number> = {
  Budget: 200,
  Moderate: 500,
  Comfortable: 1000,
  Luxury: 2000,
};

export function getFamilyMultiplier(size: FamilySize): number {
  switch (size) {
    case "Solo": return 1;
    case "Couple": return 2;
    case "Family with 1 kid": return 3;
    case "Family with 2 kids": return 4;
    case "Family with 3 kids": return 5;
  }
}

export function calculateExpenses(inputs: CalculatorInputs): CalculatorResults {
  const { city, areaTier, salary, familySize, rentPreference, carOwnership, schooling, lifestyle } = inputs;

  const baseRentDict = city === "Dubai" ? RENT_DUBAI : RENT_AD;
  const baseRent = baseRentDict[rentPreference];
  const rent = Math.round(baseRent * AREA_RENT_MULTIPLIER[areaTier]);

  const peopleCount = getFamilyMultiplier(familySize);
  const groceries = GROCERIES_PER_PERSON[lifestyle] * peopleCount;

  const diningBase = DINING[lifestyle];
  const dining = peopleCount === 1 ? diningBase : diningBase * (peopleCount * 0.7);

  const transport = carOwnership === "Own a car" ? 900 : 200 * peopleCount;

  const utilities = peopleCount === 1 ? 600 : 1000;

  let schoolFees = 0;
  if (schooling === "Private school 1 kid") {
    schoolFees = city === "Dubai" ? 2500 : 2000;
  } else if (schooling === "Private school 2 kids") {
    schoolFees = (city === "Dubai" ? 2500 : 2000) * 2;
  }

  const entertainment = ENTERTAINMENT[lifestyle] * (peopleCount === 1 ? 1 : peopleCount * 0.6);

  const healthcare = peopleCount === 1 ? 200 : 600;

  const miscellaneous = peopleCount === 1 ? 300 : 600;

  const breakdown: ExpenseBreakdown[] = [
    { category: "Rent", amount: rent },
    { category: "Groceries", amount: Math.round(groceries) },
    { category: "Dining", amount: Math.round(dining) },
    { category: "Transport", amount: Math.round(transport) },
    { category: "Utilities", amount: utilities },
    { category: "School Fees", amount: schoolFees },
    { category: "Entertainment", amount: Math.round(entertainment) },
    { category: "Healthcare", amount: healthcare },
    { category: "Miscellaneous", amount: miscellaneous },
  ];

  const totalExpenses = breakdown.reduce((acc, curr) => acc + curr.amount, 0);
  const netSavings = salary - totalExpenses;
  const savingsRate = salary > 0 ? Math.max(0, (netSavings / salary) * 100) : 0;

  let affordabilityScore = Math.round((salary / totalExpenses) * 50);
  if (affordabilityScore > 100) affordabilityScore = 100;
  if (affordabilityScore < 0) affordabilityScore = 0;

  let lifestyleCategory = "";
  if (affordabilityScore <= 20) lifestyleCategory = "Critical";
  else if (affordabilityScore <= 40) lifestyleCategory = "Surviving";
  else if (affordabilityScore <= 60) lifestyleCategory = "Comfortable";
  else if (affordabilityScore <= 80) lifestyleCategory = "Thriving";
  else lifestyleCategory = "Excellent";

  const estimatedAnnualSavings = netSavings * 12;

  const tips: string[] = [];
  if (rent / salary > 0.4) {
    tips.push("Your rent is more than 40% of your income. Consider a more affordable area or smaller apartment to reduce financial stress.");
  }
  if (carOwnership === "Own a car" && salary < 8000) {
    tips.push("Owning a car on a salary below 8,000 AED can be tight. Consider public transport to save up to 700 AED monthly.");
  }
  if (netSavings < 0) {
    tips.push("Your expected expenses exceed your salary. Consider a different area tier, smaller apartment, or negotiate a higher offer.");
  } else if (savingsRate < 10) {
    tips.push("Your savings rate is very low. Aim for at least 20% by adjusting your area, dining, or entertainment spend.");
  } else {
    tips.push(`You are projected to save ${savingsRate.toFixed(1)}% of your income — a solid position.`);
  }

  return {
    breakdown,
    totalExpenses,
    netSavings,
    savingsRate,
    affordabilityScore,
    lifestyleCategory,
    estimatedAnnualSavings,
    tips,
  };
}
