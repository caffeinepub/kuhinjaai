import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSuggestRecipes } from "@/hooks/useAiSuggestions";
import { ChefHat, Loader2, PlusCircle, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SUGGESTION_PRESETS = [
  "Vegetarijansko",
  "Bez glutena",
  "Brza priprema",
  "Dalmatinska kuhinja",
  "Sezonski sastojci",
  "Lagano jelo",
  "Za veće grupe",
  "Veganski",
];

const COMMON_INGREDIENTS = [
  "Piletina",
  "Junetina",
  "Losos",
  "Janjetina",
  "Rajčica",
  "Paprika",
  "Tikvica",
  "Bundeva",
  "Riža",
  "Tjestenina",
  "Krumpir",
  "Leća",
  "Sir",
  "Jaja",
  "Špinat",
  "Gljive",
];

export default function AiSuggestionsPage() {
  const suggestMutation = useSuggestRecipes();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [preferenceInput, setPreferenceInput] = useState("");

  const addIngredient = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
    }
    setIngredientInput("");
  };

  const addPreference = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !preferences.includes(trimmed)) {
      setPreferences((prev) => [...prev, trimmed]);
    }
    setPreferenceInput("");
  };

  const handleSuggest = async () => {
    if (ingredients.length === 0 && preferences.length === 0) {
      toast.error("Dodajte barem jedan sastojak ili preferenciju");
      return;
    }
    try {
      await suggestMutation.mutateAsync({ ingredients, preferences });
    } catch {
      toast.error("Greška pri dohvaćanju AI sugestija. Pokušajte ponovo.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-sm overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent-foreground" />
          </div>
          <Badge className="bg-accent/20 text-accent-foreground border-0 font-medium">
            AI Asistent
          </Badge>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3 leading-tight">
          AI Sugestije recepata
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Recite nam koje sastojke imate i vaše prehrambene preferencije — naš
          AI predložit će savršena jela za vaš restoran.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Ingredients */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            Dostupni sastojci
          </h2>

          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Dodajte sastojak..."
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addIngredient(ingredientInput);
                }
              }}
              className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              data-ocid="ingredient-input"
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => addIngredient(ingredientInput)}
              aria-label="Dodaj sastojak"
              data-ocid="ingredient-add-btn"
            >
              <PlusCircle className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick add */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {COMMON_INGREDIENTS.map((ing) => (
              <button
                key={ing}
                type="button"
                onClick={() => addIngredient(ing)}
                disabled={ingredients.includes(ing)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                  ingredients.includes(ing)
                    ? "bg-primary/10 border-primary/30 text-primary cursor-default"
                    : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
                data-ocid={`quick-ingredient-${ing}`}
              >
                {ing}
              </button>
            ))}
          </div>

          {/* Selected */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {ingredients.map((ing) => (
                  <motion.div
                    key={ing}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      className="gap-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-smooth"
                      data-ocid={`selected-ingredient-${ing}`}
                    >
                      {ing}
                      <button
                        type="button"
                        onClick={() =>
                          setIngredients((prev) =>
                            prev.filter((i) => i !== ing),
                          )
                        }
                        aria-label={`Ukloni ${ing}`}
                        className="hover:opacity-70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-foreground" />
            Preferencije
          </h2>

          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="npr. Vegetarijansko..."
              value={preferenceInput}
              onChange={(e) => setPreferenceInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPreference(preferenceInput);
                }
              }}
              className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              data-ocid="preference-input"
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => addPreference(preferenceInput)}
              aria-label="Dodaj preferenciju"
              data-ocid="preference-add-btn"
            >
              <PlusCircle className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {SUGGESTION_PRESETS.map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => addPreference(pref)}
                disabled={preferences.includes(pref)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                  preferences.includes(pref)
                    ? "bg-accent/20 border-accent/40 text-accent-foreground cursor-default"
                    : "bg-background border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                }`}
                data-ocid={`quick-pref-${pref}`}
              >
                {pref}
              </button>
            ))}
          </div>

          {/* Selected */}
          {preferences.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {preferences.map((pref) => (
                  <motion.div
                    key={pref}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      className="gap-1.5 bg-accent/15 text-accent-foreground border-accent/20 hover:bg-accent/25 transition-smooth"
                      data-ocid={`selected-pref-${pref}`}
                    >
                      {pref}
                      <button
                        type="button"
                        onClick={() =>
                          setPreferences((prev) =>
                            prev.filter((p) => p !== pref),
                          )
                        }
                        aria-label={`Ukloni ${pref}`}
                        className="hover:opacity-70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Generate button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={handleSuggest}
          disabled={
            suggestMutation.isPending ||
            (ingredients.length === 0 && preferences.length === 0)
          }
          size="lg"
          className="gap-3 px-8 shadow-sm font-medium min-w-[220px]"
          data-ocid="generate-suggestions"
        >
          {suggestMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              AI razmišlja...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generiraj sugestije
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {suggestMutation.data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="bg-card border-2 border-accent/30 rounded-2xl p-6 shadow-sm"
            data-ocid="ai-results"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
              <h3 className="font-display font-bold text-xl text-foreground">
                AI Prijedlozi
              </h3>
              <Badge className="bg-accent/20 text-accent-foreground border-0 ml-auto">
                Generirano AI-om
              </Badge>
            </div>
            <div className="prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap font-body">
              {suggestMutation.data}
            </div>
          </motion.div>
        )}

        {suggestMutation.isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 text-center"
            data-ocid="ai-error"
          >
            <p className="text-destructive font-medium">
              Greška pri dohvaćanju sugestija
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Provjerite internet vezu i pokušajte ponovo
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
