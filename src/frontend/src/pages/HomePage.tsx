import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllRecipes } from "@/hooks/useRecipes";
import { type Recipe, getCategoryLabel, getCuisineLabel } from "@/types/recipe";
import { Link } from "@tanstack/react-router";
import { ChefHat, Clock, PlusCircle, Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  const totalTime = Number(recipe.prepTime) + Number(recipe.cookTime);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Link
        to="/recept/$id"
        params={{ id: recipe.id.toString() }}
        data-ocid={`recipe-card-${recipe.id}`}
      >
        <div className="recipe-card-elevated p-5 hover:shadow-lg transition-smooth cursor-pointer group h-full flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-smooth line-clamp-2 leading-snug">
              {recipe.title}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {getCategoryLabel(recipe.category)}
            </Badge>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground text-sm mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {totalTime} min
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {recipe.servings.toString()} os.
            </span>
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
              {getCuisineLabel(recipe.cuisine)}
            </span>
          </div>

          {recipe.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {recipe.dietaryTags.slice(0, 3).map((tag) => {
                const tagKey =
                  typeof tag === "object" && tag !== null
                    ? Object.keys(tag)[0]
                    : (tag as unknown as string);
                const label =
                  tagKey === "vegetarijansko"
                    ? "🌿 Vegetarijansko"
                    : tagKey === "veganski"
                      ? "🌱 Vegansko"
                      : "🌾 Bez glutena";
                return (
                  <span
                    key={label}
                    className="text-xs bg-accent/15 text-accent-foreground px-2 py-0.5 rounded-full font-medium"
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

const CATEGORY_FILTERS = [
  { label: "Svi recepti", value: "sve" },
  { label: "Predjela", value: "predjela" },
  { label: "Glavna jela", value: "glavnaJela" },
  { label: "Deserti", value: "deserti" },
  { label: "Pića", value: "pica" },
];

export default function HomePage() {
  const { data: allRecipes = [], isLoading } = useAllRecipes();
  const [filter, setFilter] = useState("sve");
  const [search, setSearch] = useState("");

  const filtered = allRecipes.filter((r) => {
    const matchesCategory =
      filter === "sve" ||
      (typeof r.category === "object" && r.category !== null
        ? filter in r.category
        : (r.category as unknown as string) === filter);
    const matchesSearch =
      search === "" || r.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 bg-card rounded-2xl border border-border p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="w-6 h-6 text-primary" />
              <span className="text-primary font-medium text-sm uppercase tracking-wide">
                Suradnički recepti
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2 leading-tight">
              Baza recepata restorana
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg">
              Pregledajte, uređujte i razvijajte recepte zajedno s timom.
              Dodajte bilješke i prijedloge za poboljšanje.
            </p>
          </div>
          <Link to="/novi-recept">
            <Button
              size="lg"
              className="gap-2 shadow-sm font-medium"
              data-ocid="hero-add-recipe"
            >
              <PlusCircle className="w-5 h-5" />
              Dodaj recept
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pretraži recepte..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            data-ocid="search-input"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORY_FILTERS.map(({ label, value }) => (
            <Button
              key={value}
              variant={filter === value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(value)}
              className="shrink-0 transition-smooth"
              data-ocid={`filter-${value}`}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Recipe grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(["sk0", "sk1", "sk2", "sk3", "sk4", "sk5"] as const).map((k) => (
            <Skeleton key={k} className="h-48 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-card rounded-xl border border-border"
          data-ocid="empty-state"
        >
          <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-xl text-foreground mb-2">
            Nema pronađenih recepata
          </h3>
          <p className="text-muted-foreground mb-6">
            Pokušajte drugačije pretraživanje ili dodajte novi recept
          </p>
          <Link to="/novi-recept">
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Dodaj prvi recept
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((recipe, index) => (
            <RecipeCard
              key={recipe.id.toString()}
              recipe={recipe}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
