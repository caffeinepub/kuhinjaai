export type RecipeId = bigint;
export type NoteId = bigint;
export type FlagId = bigint;

export type Category =
  | { predjela: null }
  | { glavnaJela: null }
  | { deserti: null }
  | { pica: null };

export type Cuisine =
  | { hrvatska: null }
  | { talijanska: null }
  | { francuska: null }
  | { azijska: null }
  | { ostalo: null };

export type DietaryTag =
  | { vegetarijansko: null }
  | { veganski: null }
  | { bezGlutena: null };

export type FlagStatus = { otvoreno: null } | { rijeseno: null };

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: RecipeId;
  title: string;
  category: Category;
  cuisine: Cuisine;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: bigint;
  cookTime: bigint;
  servings: bigint;
  dietaryTags: DietaryTag[];
  createdAt: bigint;
  updatedAt: bigint;
}

export interface RecipeInput {
  title: string;
  category: Category;
  cuisine: Cuisine;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: bigint;
  cookTime: bigint;
  servings: bigint;
  dietaryTags: DietaryTag[];
}

export interface CollabNote {
  id: NoteId;
  recipeId: RecipeId;
  text: string;
  createdAt: bigint;
}

export interface ImprovementFlag {
  id: FlagId;
  recipeId: RecipeId;
  description: string;
  status: FlagStatus;
  createdAt: bigint;
}

// Helper to safely get the key from a variant that may be an object or a plain string
function variantKey(v: unknown): string {
  if (typeof v === "object" && v !== null) return Object.keys(v)[0] ?? "";
  return String(v);
}

// Helper functions for variant types
export function getCategoryLabel(category: Category): string {
  const key = variantKey(category);
  if (key === "predjela") return "Predjela";
  if (key === "glavnaJela") return "Glavna jela";
  if (key === "deserti") return "Deserti";
  if (key === "pica") return "Pića";
  return "Ostalo";
}

export function getCuisineLabel(cuisine: Cuisine): string {
  const key = variantKey(cuisine);
  if (key === "hrvatska") return "Hrvatska";
  if (key === "talijanska") return "Talijanska";
  if (key === "francuska") return "Francuska";
  if (key === "azijska") return "Azijska";
  return "Ostalo";
}

export function getDietaryTagLabel(tag: DietaryTag): string {
  const key = variantKey(tag);
  if (key === "vegetarijansko") return "Vegetarijansko";
  if (key === "veganski") return "Vegansko";
  if (key === "bezGlutena") return "Bez glutena";
  return "Ostalo";
}

export function isFlagOpen(status: FlagStatus): boolean {
  return variantKey(status) === "otvoreno";
}
