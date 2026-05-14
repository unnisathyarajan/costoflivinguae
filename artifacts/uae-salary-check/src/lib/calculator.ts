export type City = "Dubai" | "Abu Dhabi";
export type FamilySize = "Solo" | "Couple" | "Family with 1 kid" | "Family with 2 kids" | "Family with 3 kids";
export type RentPreference = "Shared room" | "Studio" | "1BR" | "2BR" | "3BR";
export type CarOwnership = "No car (public transport)" | "Own a car";
export type Schooling = "None" | "Private school 1 kid" | "Private school 2 kids";
export type LifestyleLevel = "Budget" | "Moderate" | "Comfortable" | "Luxury";

export interface CalculatorInputs {
  city: City;
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

const RENT_DUBAI = {
  "Shared room": 1500,
  "Studio": 4500,
  "1BR": 7000,
  "2BR": 10500,
  "3BR": 15000,
};

const RENT_AD = {
  "Shared room": 1200,
  "Studio": 3500,
  "1BR": 5500,
  "2BR": 8500,
  "3BR": 12000,
};

const GROCERIES_PER_PERSON = {
  Budget: 500,
  Moderate: 800,
  Comfortable: 1200,
  Luxury: 2000,
};

const DINING = {
  Budget: 200,
  Moderate: 500,
  Comfortable: 1000,
  Luxury: 2500,
};

const ENTERTAINMENT = {
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
  const { city, salary, familySize, rentPreference, carOwnership, schooling, lifestyle } = inputs;
  
  // 1. Rent
  const rentDict = city === "Dubai" ? RENT_DUBAI : RENT_AD;
  const rent = rentDict[rentPreference];

  // 2. Groceries
  const peopleCount = getFamilyMultiplier(familySize);
  const groceries = GROCERIES_PER_PERSON[lifestyle] * peopleCount;

  // 3. Dining
  // Assuming dining scales partially with family size but we'll scale it for the whole unit for simplicity, or just use base
  const diningBase = DINING[lifestyle];
  const dining = peopleCount === 1 ? diningBase : diningBase * (peopleCount * 0.7);

  // 4. Transport
  const transport = carOwnership === "Own a car" ? 900 : 200 * peopleCount;

  // 5. Utilities
  const utilities = peopleCount === 1 ? 600 : 1000;

  // 6. School Fees
  let schoolFees = 0;
  if (schooling === "Private school 1 kid") {
    schoolFees = city === "Dubai" ? 2500 : 2000;
  } else if (schooling === "Private school 2 kids") {
    schoolFees = (city === "Dubai" ? 2500 : 2000) * 2;
  }

  // 7. Entertainment
  const entertainment = ENTERTAINMENT[lifestyle] * (peopleCount === 1 ? 1 : peopleCount * 0.6);

  // 8. Healthcare
  const healthcare = peopleCount === 1 ? 200 : 600;

  // 9. Miscellaneous
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
    tips.push("Your rent is more than 40% of your income. Consider a smaller place or a different area to reduce financial stress.");
  }
  if (carOwnership === "Own a car" && salary < 8000) {
    tips.push("Owning a car on a salary below 8,000 AED can be tight. Consider the Metro to save up to 700 AED monthly.");
  }
  if (netSavings < 0) {
    tips.push("Your expected expenses exceed your salary. You will need to downgrade your lifestyle or negotiate a higher offer.");
  } else if (savingsRate < 10) {
    tips.push("Your savings rate is very low. Aim to save at least 20% by cutting back on dining or entertainment.");
  } else {
    tips.push(`Great job! You're projected to save ${savingsRate.toFixed(1)}% of your income.`);
  }

  return {
    breakdown,
    totalExpenses,
    netSavings,
    savingsRate,
    affordabilityScore,
    lifestyleCategory,
    estimatedAnnualSavings,
    tips
  };
}
