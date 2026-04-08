import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, u as useQueryClient, d as useParams, S as Skeleton, C as ChefHat, L as Link, B as Button } from "./index-OIp2ZZ2R.js";
import { B as Badge } from "./badge-tlszjcER.js";
import { P as Primitive, A as ArrowLeft, T as Trash2 } from "./index-B7KgFXwT.js";
import { u as useActor, a as useQuery, b as useMutation, c as createActor, m as motion } from "./proxy-Cqp7hEY1.js";
import { a as useRecipe } from "./useRecipes-DXrRH-aS.js";
import { i as isFlagOpen, g as getCategoryLabel, a as getCuisineLabel, b as getDietaryTagLabel, C as Clock, U as Users } from "./recipe-BKTFXHGw.js";
import { u as ue } from "./index-C7KUYcXy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
];
const Flag = createLucideIcon("flag", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
];
const MessageSquarePlus = createLucideIcon("message-square-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function useFlags(recipeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["flags", recipeId == null ? void 0 : recipeId.toString()],
    queryFn: async () => {
      if (!actor || recipeId === void 0) return [];
      return actor.getFlagsForRecipe(recipeId);
    },
    enabled: !!actor && !isFetching && recipeId !== void 0
  });
}
function useAddFlag(recipeId) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (description) => {
      if (!actor || recipeId === void 0)
        throw new Error("Actor or recipeId not available");
      return actor.addFlag(recipeId, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flags", recipeId == null ? void 0 : recipeId.toString()]
      });
    }
  });
}
function useResolveFlag(recipeId) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (flagId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.resolveFlag(flagId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flags", recipeId == null ? void 0 : recipeId.toString()]
      });
    }
  });
}
function useNotes(recipeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["notes", recipeId == null ? void 0 : recipeId.toString()],
    queryFn: async () => {
      if (!actor || recipeId === void 0) return [];
      return actor.getNotesForRecipe(recipeId);
    },
    enabled: !!actor && !isFetching && recipeId !== void 0
  });
}
function useAddNote(recipeId) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (text) => {
      if (!actor || recipeId === void 0)
        throw new Error("Actor or recipeId not available");
      return actor.addNote(recipeId, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", recipeId == null ? void 0 : recipeId.toString()]
      });
    }
  });
}
function useDeleteNote(recipeId) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (noteId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteNote(noteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", recipeId == null ? void 0 : recipeId.toString()]
      });
    }
  });
}
function RecipeDetailPage() {
  const { id } = useParams({ from: "/recept/$id" });
  const recipeId = BigInt(id);
  const { data: recipe, isLoading } = useRecipe(recipeId);
  const { data: notes = [] } = useNotes(recipeId);
  const { data: flags = [] } = useFlags(recipeId);
  const addNote = useAddNote(recipeId);
  const deleteNote = useDeleteNote(recipeId);
  const addFlag = useAddFlag(recipeId);
  const resolveFlag = useResolveFlag(recipeId);
  const [noteText, setNoteText] = reactExports.useState("");
  const [flagText, setFlagText] = reactExports.useState("");
  const [showFlagForm, setShowFlagForm] = reactExports.useState(false);
  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    try {
      await addNote.mutateAsync(noteText.trim());
      setNoteText("");
      ue.success("Bilješka dodana!");
    } catch {
      ue.error("Greška pri dodavanju bilješke");
    }
  };
  const handleAddFlag = async () => {
    if (!flagText.trim()) return;
    try {
      await addFlag.mutateAsync(flagText.trim());
      setFlagText("");
      setShowFlagForm(false);
      ue.success("Prijedlog za poboljšanje dodan!");
    } catch {
      ue.error("Greška pri dodavanju prijedloga");
    }
  };
  const handleResolveFlag = async (flagId) => {
    try {
      await resolveFlag.mutateAsync(flagId);
      ue.success("Prijedlog označen kao riješen!");
    } catch {
      ue.error("Greška");
    }
  };
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote.mutateAsync(noteId);
      ue.success("Bilješka uklonjena");
    } catch {
      ue.error("Greška pri uklanjanju bilješke");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" })
    ] });
  }
  if (!recipe) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center",
        "data-ocid": "recipe-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Recept nije pronađen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Ovaj recept ne postoji ili je uklonjen." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Povratak na recepte"
          ] }) })
        ]
      }
    );
  }
  const totalTime = Number(recipe.prepTime) + Number(recipe.cookTime);
  const openFlags = flags.filter((f) => isFlagOpen(f.status));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-smooth",
        "data-ocid": "back-link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Svi recepti"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: getCategoryLabel(recipe.category) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: getCuisineLabel(recipe.cuisine) }),
            recipe.dietaryTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "bg-accent/15 text-accent-foreground border-0",
                children: getDietaryTagLabel(tag)
              },
              getDietaryTagLabel(tag)
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mb-4 leading-tight", children: recipe.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 text-sm text-muted-foreground bg-muted/30 rounded-xl px-5 py-4 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Priprema:" }),
              " ",
              recipe.prepTime.toString(),
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Kuhanje:" }),
              " ",
              recipe.cookTime.toString(),
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-accent-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Ukupno:" }),
              " ",
              totalTime,
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Porcije:" }),
              " ",
              recipe.servings.toString()
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          className: "md:col-span-2",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 sticky top-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "recipe-section-header mb-4", children: "Sastojci" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: recipe.ingredients.map((ing) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-baseline justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: ing.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground shrink-0", children: [
                    ing.quantity,
                    " ",
                    ing.unit
                  ] })
                ]
              },
              ing.name
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, delay: 0.15 },
          className: "md:col-span-3",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "recipe-section-header mb-5", children: "Postupak pripreme" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-4", children: recipe.steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed pt-0.5", children: step })
            ] }, `step-${step.slice(0, 20)}`)) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4 },
        className: "mb-8",
        "data-ocid": "notes-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquarePlus, { className: "w-5 h-5 text-accent-foreground" }),
            "Suradničke bilješke",
            notes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: notes.length })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Dodajte bilješku za tim...",
                value: noteText,
                onChange: (e) => setNoteText(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleAddNote(),
                className: "flex-1 px-4 py-2 bg-card border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                "data-ocid": "note-input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleAddNote,
                disabled: !noteText.trim() || addNote.isPending,
                size: "icon",
                className: "shrink-0",
                "aria-label": "Dodaj bilješku",
                "data-ocid": "note-submit",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
              }
            )
          ] }),
          notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm italic py-4 text-center", children: "Nema bilješki. Budite prvi koji komentira ovaj recept!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: notes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "collaborative-note group",
              "data-ocid": `note-${note.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm leading-relaxed", children: note.text }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDeleteNote(note.id),
                      className: "text-muted-foreground hover:text-destructive transition-smooth opacity-0 group-hover:opacity-100 shrink-0",
                      "aria-label": "Ukloni bilješku",
                      "data-ocid": `note-delete-${note.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: new Date(Number(note.createdAt)).toLocaleDateString("hr-HR") })
              ]
            },
            note.id.toString()
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: 0.1 },
        "data-ocid": "flags-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-5 h-5 text-destructive" }),
              "Prijedlozi za poboljšanje",
              openFlags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-xs", children: [
                openFlags.length,
                " otvoreno"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setShowFlagForm(!showFlagForm),
                className: "gap-1.5 text-xs",
                "data-ocid": "add-flag-toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" }),
                  "Prijavi problem"
                ]
              }
            )
          ] }),
          showFlagForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Opišite prijedlog za poboljšanje...",
                value: flagText,
                onChange: (e) => setFlagText(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleAddFlag(),
                className: "flex-1 px-4 py-2 bg-card border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                "data-ocid": "flag-input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleAddFlag,
                disabled: !flagText.trim() || addFlag.isPending,
                size: "sm",
                variant: "destructive",
                "data-ocid": "flag-submit",
                children: "Dodaj"
              }
            )
          ] }),
          flags.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm italic py-4 text-center", children: "Nema prijavljenih poboljšanja za ovaj recept." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: flags.map((flag) => {
            const isOpen = isFlagOpen(flag.status);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-start justify-between gap-3 p-4 rounded-lg border transition-smooth ${isOpen ? "bg-destructive/5 border-destructive/20" : "bg-muted/30 border-border opacity-60"}`,
                "data-ocid": `flag-${flag.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm leading-relaxed", children: flag.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-1", children: [
                      new Date(Number(flag.createdAt)).toLocaleDateString(
                        "hr-HR"
                      ),
                      " ",
                      "·",
                      " ",
                      isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-medium", children: "Otvoreno" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary-foreground font-medium", children: "Riješeno" })
                    ] })
                  ] }),
                  isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => handleResolveFlag(flag.id),
                      disabled: resolveFlag.isPending,
                      className: "gap-1.5 text-xs shrink-0 text-secondary-foreground hover:text-foreground",
                      "aria-label": "Označi kao riješeno",
                      "data-ocid": `flag-resolve-${flag.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                        "Riješi"
                      ]
                    }
                  )
                ]
              },
              flag.id.toString()
            );
          }) })
        ]
      }
    )
  ] });
}
export {
  RecipeDetailPage as default
};
