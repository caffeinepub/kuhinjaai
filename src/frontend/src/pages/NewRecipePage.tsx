import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRecipe } from "@/hooks/useRecipes";
import type {
  Category,
  Cuisine,
  DietaryTag,
  Ingredient,
  RecipeInput,
} from "@/types/recipe";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChefHat, PlusCircle, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type CategoryKey = "predjela" | "glavnaJela" | "deserti" | "pica";
type CuisineKey =
  | "hrvatska"
  | "talijanska"
  | "francuska"
  | "azijska"
  | "ostalo";
type DietaryTagKey = "vegetarijansko" | "veganski" | "bezGlutena";

const CATEGORIES: { label: string; value: CategoryKey }[] = [
  { label: "Predjela", value: "predjela" },
  { label: "Glavna jela", value: "glavnaJela" },
  { label: "Deserti", value: "deserti" },
  { label: "Pića", value: "pica" },
];

const CUISINES: { label: string; value: CuisineKey }[] = [
  { label: "Hrvatska", value: "hrvatska" },
  { label: "Talijanska", value: "talijanska" },
  { label: "Francuska", value: "francuska" },
  { label: "Azijska", value: "azijska" },
  { label: "Ostalo", value: "ostalo" },
];

const DIETARY_TAGS: { label: string; value: DietaryTagKey }[] = [
  { label: "🌿 Vegetarijansko", value: "vegetarijansko" },
  { label: "🌱 Vegansko", value: "veganski" },
  { label: "🌾 Bez glutena", value: "bezGlutena" },
];

function makeCategoryVariant(key: CategoryKey): Category {
  return { [key]: null } as Category;
}

function makeCuisineVariant(key: CuisineKey): Cuisine {
  return { [key]: null } as Cuisine;
}

function makeDietaryTagVariant(key: DietaryTagKey): DietaryTag {
  return { [key]: null } as DietaryTag;
}

export default function NewRecipePage() {
  const navigate = useNavigate();
  const createRecipe = useCreateRecipe();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryKey>("glavnaJela");
  const [cuisine, setCuisine] = useState<CuisineKey>("hrvatska");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [selectedTags, setSelectedTags] = useState<DietaryTagKey[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "", unit: "" },
  ]);
  const [steps, setSteps] = useState<string[]>(["", ""]);

  const toggleTag = (tag: DietaryTagKey) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const addIngredient = () =>
    setIngredients((prev) => [...prev, { name: "", quantity: "", unit: "" }]);
  const removeIngredient = (i: number) =>
    setIngredients((prev) => prev.filter((_, idx) => idx !== i));
  const updateIngredient = (
    i: number,
    field: keyof Ingredient,
    value: string,
  ) => {
    setIngredients((prev) =>
      prev.map((ing, idx) => (idx === i ? { ...ing, [field]: value } : ing)),
    );
  };

  const addStep = () => setSteps((prev) => [...prev, ""]);
  const removeStep = (i: number) =>
    setSteps((prev) => prev.filter((_, idx) => idx !== i));
  const updateStep = (i: number, value: string) => {
    setSteps((prev) => prev.map((s, idx) => (idx === i ? value : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validIngredients = ingredients.filter((ing) => ing.name.trim());
    const validSteps = steps.filter((s) => s.trim());

    if (
      !title.trim() ||
      validIngredients.length === 0 ||
      validSteps.length === 0
    ) {
      toast.error("Ispunite naslov, sastojke i korake");
      return;
    }

    const input: RecipeInput = {
      title: title.trim(),
      category: makeCategoryVariant(category),
      cuisine: makeCuisineVariant(cuisine),
      ingredients: validIngredients,
      steps: validSteps,
      prepTime: BigInt(Number.parseInt(prepTime) || 0),
      cookTime: BigInt(Number.parseInt(cookTime) || 0),
      servings: BigInt(Number.parseInt(servings) || 1),
      dietaryTags: selectedTags.map(makeDietaryTagVariant),
    };

    try {
      const newRecipe = await createRecipe.mutateAsync(input);
      toast.success("Recept uspješno dodan!");
      navigate({ to: "/recept/$id", params: { id: newRecipe.id.toString() } });
    } catch {
      toast.error("Greška pri dodavanju recepta. Pokušajte ponovo.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-smooth"
        data-ocid="back-link"
      >
        <ArrowLeft className="w-4 h-4" />
        Svi recepti
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Novi recept
            </h1>
            <p className="text-muted-foreground text-sm">
              Dodajte novi recept u zajedničku bazu
            </p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Basic info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-6 space-y-5"
        >
          <h2 className="recipe-section-header">Osnovne informacije</h2>

          <div className="space-y-2">
            <Label htmlFor="title">Naziv recepta *</Label>
            <Input
              id="title"
              placeholder="npr. Pašticada s njokima"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              data-ocid="recipe-title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kategorija</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as CategoryKey)}
              >
                <SelectTrigger data-ocid="recipe-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Kuhinja</Label>
              <Select
                value={cuisine}
                onValueChange={(v) => setCuisine(v as CuisineKey)}
              >
                <SelectTrigger data-ocid="recipe-cuisine">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CUISINES.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prepTime">Priprema (min)</Label>
              <Input
                id="prepTime"
                type="number"
                min="0"
                placeholder="15"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                data-ocid="recipe-prep-time"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cookTime">Kuhanje (min)</Label>
              <Input
                id="cookTime"
                type="number"
                min="0"
                placeholder="30"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                data-ocid="recipe-cook-time"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servings">Porcije</Label>
              <Input
                id="servings"
                type="number"
                min="1"
                placeholder="4"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                data-ocid="recipe-servings"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Prehrambene oznake</Label>
            <div className="flex flex-wrap gap-2">
              {DIETARY_TAGS.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleTag(value)}
                  data-ocid={`tag-${value}`}
                  className={`transition-smooth px-3 py-1.5 rounded-full text-sm font-medium border ${
                    selectedTags.includes(value)
                      ? "bg-accent/20 border-accent text-accent-foreground"
                      : "bg-card border-border text-muted-foreground hover:border-accent/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ingredients */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="recipe-section-header">Sastojci *</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addIngredient}
              className="gap-1.5"
              data-ocid="add-ingredient"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Dodaj
            </Button>
          </div>

          <div className="space-y-3">
            {ingredients.map((ing, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: form list ordered by index
              <div key={i} className="flex gap-2 items-center">
                <Input
                  placeholder="Naziv (npr. Brašno)"
                  value={ing.name}
                  onChange={(e) => updateIngredient(i, "name", e.target.value)}
                  className="flex-[2]"
                  data-ocid={`ingredient-name-${i}`}
                />
                <Input
                  placeholder="Količina"
                  value={ing.quantity}
                  onChange={(e) =>
                    updateIngredient(i, "quantity", e.target.value)
                  }
                  className="flex-1"
                  data-ocid={`ingredient-qty-${i}`}
                />
                <Input
                  placeholder="Jedinica"
                  value={ing.unit}
                  onChange={(e) => updateIngredient(i, "unit", e.target.value)}
                  className="flex-1"
                  data-ocid={`ingredient-unit-${i}`}
                />
                {ingredients.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(i)}
                    aria-label="Ukloni sastojak"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    data-ocid={`ingredient-remove-${i}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="recipe-section-header">Koraci pripreme *</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addStep}
              className="gap-1.5"
              data-ocid="add-step"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Dodaj korak
            </Button>
          </div>

          <div className="space-y-3">
            {steps.map((step, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: form list ordered by index
              <div key={i} className="flex gap-3 items-start">
                <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-2">
                  {i + 1}
                </div>
                <Textarea
                  placeholder={`Korak ${i + 1}...`}
                  value={step}
                  onChange={(e) => updateStep(i, e.target.value)}
                  rows={2}
                  className="flex-1 resize-none"
                  data-ocid={`step-${i}`}
                />
                {steps.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStep(i)}
                    aria-label="Ukloni korak"
                    className="shrink-0 mt-1 text-muted-foreground hover:text-destructive"
                    data-ocid={`step-remove-${i}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Submit */}
        <div className="flex gap-3 justify-end pb-4">
          <Link to="/">
            <Button type="button" variant="outline" data-ocid="cancel-recipe">
              Odustani
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={createRecipe.isPending}
            className="gap-2 min-w-[140px]"
            data-ocid="submit-recipe"
          >
            {createRecipe.isPending ? (
              <>Sprema se...</>
            ) : (
              <>
                <ChefHat className="w-4 h-4" />
                Spremi recept
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
