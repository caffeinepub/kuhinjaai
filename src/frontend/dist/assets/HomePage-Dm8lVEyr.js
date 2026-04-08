import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, C as ChefHat, L as Link, B as Button, a as CirclePlus, S as Skeleton } from "./index-OIp2ZZ2R.js";
import { B as Badge } from "./badge-tlszjcER.js";
import { u as useAllRecipes } from "./useRecipes-DXrRH-aS.js";
import { g as getCategoryLabel, C as Clock, U as Users, a as getCuisineLabel } from "./recipe-BKTFXHGw.js";
import { m as motion } from "./proxy-Cqp7hEY1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function RecipeCard({ recipe, index }) {
  const totalTime = Number(recipe.prepTime) + Number(recipe.cookTime);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.4 },
      viewport: { once: true },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/recept/$id",
          params: { id: recipe.id.toString() },
          "data-ocid": `recipe-card-${recipe.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "recipe-card-elevated p-5 hover:shadow-lg transition-smooth cursor-pointer group h-full flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground group-hover:text-primary transition-smooth line-clamp-2 leading-snug", children: recipe.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "shrink-0 text-xs", children: getCategoryLabel(recipe.category) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground text-sm mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                totalTime,
                " min"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
                recipe.servings.toString(),
                " os."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-muted px-2 py-0.5 rounded-full", children: getCuisineLabel(recipe.cuisine) })
            ] }),
            recipe.dietaryTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-auto", children: recipe.dietaryTags.slice(0, 3).map((tag) => {
              const tagKey = typeof tag === "object" && tag !== null ? Object.keys(tag)[0] : tag;
              const label = tagKey === "vegetarijansko" ? "🌿 Vegetarijansko" : tagKey === "veganski" ? "🌱 Vegansko" : "🌾 Bez glutena";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs bg-accent/15 text-accent-foreground px-2 py-0.5 rounded-full font-medium",
                  children: label
                },
                label
              );
            }) })
          ] })
        }
      )
    }
  );
}
const CATEGORY_FILTERS = [
  { label: "Svi recepti", value: "sve" },
  { label: "Predjela", value: "predjela" },
  { label: "Glavna jela", value: "glavnaJela" },
  { label: "Deserti", value: "deserti" },
  { label: "Pića", value: "pica" }
];
function HomePage() {
  const { data: allRecipes = [], isLoading } = useAllRecipes();
  const [filter, setFilter] = reactExports.useState("sve");
  const [search, setSearch] = reactExports.useState("");
  const filtered = allRecipes.filter((r) => {
    const matchesCategory = filter === "sve" || (typeof r.category === "object" && r.category !== null ? filter in r.category : r.category === filter);
    const matchesSearch = search === "" || r.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-10 bg-card rounded-2xl border border-border p-8 shadow-sm",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-6 h-6 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium text-sm uppercase tracking-wide", children: "Suradnički recepti" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mb-2 leading-tight", children: "Baza recepata restorana" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-lg", children: "Pregledajte, uređujte i razvijajte recepte zajedno s timom. Dodajte bilješke i prijedloge za poboljšanje." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/novi-recept", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "gap-2 shadow-sm font-medium",
              "data-ocid": "hero-add-recipe",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-5 h-5" }),
                "Dodaj recept"
              ]
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Pretraži recepte...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-9 pr-4 py-2 bg-card border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
            "data-ocid": "search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 sm:pb-0", children: CATEGORY_FILTERS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: filter === value ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter(value),
          className: "shrink-0 transition-smooth",
          "data-ocid": `filter-${value}`,
          children: label
        },
        value
      )) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["sk0", "sk1", "sk2", "sk3", "sk4", "sk5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-lg" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center py-20 bg-card rounded-xl border border-border",
        "data-ocid": "empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Nema pronađenih recepata" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Pokušajte drugačije pretraživanje ili dodajte novi recept" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/novi-recept", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
            "Dodaj prvi recept"
          ] }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((recipe, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      RecipeCard,
      {
        recipe,
        index
      },
      recipe.id.toString()
    )) })
  ] });
}
export {
  HomePage as default
};
