import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as Sparkles, C as ChefHat, B as Button, a as CirclePlus } from "./index-OIp2ZZ2R.js";
import { B as Badge } from "./badge-tlszjcER.js";
import { M as MotionConfigContext, i as isHTMLElement, d as useConstant, P as PresenceContext, e as usePresence, f as useIsomorphicLayoutEffect, L as LayoutGroupContext, u as useActor, b as useMutation, c as createActor, m as motion } from "./proxy-Cqp7hEY1.js";
import { u as ue } from "./index-C7KUYcXy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function useSuggestRecipes() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ ingredients, preferences }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.suggestRecipes(ingredients, preferences);
    }
  });
}
const SUGGESTION_PRESETS = [
  "Vegetarijansko",
  "Bez glutena",
  "Brza priprema",
  "Dalmatinska kuhinja",
  "Sezonski sastojci",
  "Lagano jelo",
  "Za veće grupe",
  "Veganski"
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
  "Gljive"
];
function AiSuggestionsPage() {
  const suggestMutation = useSuggestRecipes();
  const [ingredients, setIngredients] = reactExports.useState([]);
  const [preferences, setPreferences] = reactExports.useState([]);
  const [ingredientInput, setIngredientInput] = reactExports.useState("");
  const [preferenceInput, setPreferenceInput] = reactExports.useState("");
  const addIngredient = (val) => {
    const trimmed = val.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
    }
    setIngredientInput("");
  };
  const addPreference = (val) => {
    const trimmed = val.trim();
    if (trimmed && !preferences.includes(trimmed)) {
      setPreferences((prev) => [...prev, trimmed]);
    }
    setPreferenceInput("");
  };
  const handleSuggest = async () => {
    if (ingredients.length === 0 && preferences.length === 0) {
      ue.error("Dodajte barem jedan sastojak ili preferenciju");
      return;
    }
    try {
      await suggestMutation.mutateAsync({ ingredients, preferences });
    } catch {
      ue.error("Greška pri dohvaćanju AI sugestija. Pokušajte ponovo.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
        className: "bg-card border border-border rounded-2xl p-8 mb-8 shadow-sm overflow-hidden relative",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-accent-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/20 text-accent-foreground border-0 font-medium", children: "AI Asistent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mb-3 leading-tight", children: "AI Sugestije recepata" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl", children: "Recite nam koje sastojke imate i vaše prehrambene preferencije — naš AI predložit će savršena jela za vaš restoran." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.1, duration: 0.4 },
          className: "bg-card border border-border rounded-xl p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "w-5 h-5 text-primary" }),
              "Dostupni sastojci"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Dodajte sastojak...",
                  value: ingredientInput,
                  onChange: (e) => setIngredientInput(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addIngredient(ingredientInput);
                    }
                  },
                  className: "flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                  "data-ocid": "ingredient-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "icon",
                  variant: "outline",
                  onClick: () => addIngredient(ingredientInput),
                  "aria-label": "Dodaj sastojak",
                  "data-ocid": "ingredient-add-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: COMMON_INGREDIENTS.map((ing) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => addIngredient(ing),
                disabled: ingredients.includes(ing),
                className: `text-xs px-2.5 py-1 rounded-full border transition-smooth ${ingredients.includes(ing) ? "bg-primary/10 border-primary/30 text-primary cursor-default" : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
                "data-ocid": `quick-ingredient-${ing}`,
                children: ing
              },
              ing
            )) }),
            ingredients.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: ingredients.map((ing) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
                transition: { duration: 0.2 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: "gap-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-smooth",
                    "data-ocid": `selected-ingredient-${ing}`,
                    children: [
                      ing,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setIngredients(
                            (prev) => prev.filter((i) => i !== ing)
                          ),
                          "aria-label": `Ukloni ${ing}`,
                          className: "hover:opacity-70",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  }
                )
              },
              ing
            )) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.15, duration: 0.4 },
          className: "bg-card border border-border rounded-xl p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-accent-foreground" }),
              "Preferencije"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "npr. Vegetarijansko...",
                  value: preferenceInput,
                  onChange: (e) => setPreferenceInput(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addPreference(preferenceInput);
                    }
                  },
                  className: "flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                  "data-ocid": "preference-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "icon",
                  variant: "outline",
                  onClick: () => addPreference(preferenceInput),
                  "aria-label": "Dodaj preferenciju",
                  "data-ocid": "preference-add-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: SUGGESTION_PRESETS.map((pref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => addPreference(pref),
                disabled: preferences.includes(pref),
                className: `text-xs px-2.5 py-1 rounded-full border transition-smooth ${preferences.includes(pref) ? "bg-accent/20 border-accent/40 text-accent-foreground cursor-default" : "bg-background border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"}`,
                "data-ocid": `quick-pref-${pref}`,
                children: pref
              },
              pref
            )) }),
            preferences.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: preferences.map((pref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
                transition: { duration: 0.2 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: "gap-1.5 bg-accent/15 text-accent-foreground border-accent/20 hover:bg-accent/25 transition-smooth",
                    "data-ocid": `selected-pref-${pref}`,
                    children: [
                      pref,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setPreferences(
                            (prev) => prev.filter((p) => p !== pref)
                          ),
                          "aria-label": `Ukloni ${pref}`,
                          className: "hover:opacity-70",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  }
                )
              },
              pref
            )) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleSuggest,
        disabled: suggestMutation.isPending || ingredients.length === 0 && preferences.length === 0,
        size: "lg",
        className: "gap-3 px-8 shadow-sm font-medium min-w-[220px]",
        "data-ocid": "generate-suggestions",
        children: suggestMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
          "AI razmišlja..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }),
          "Generiraj sugestije"
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
      suggestMutation.data && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.5 },
          className: "bg-card border-2 border-accent/30 rounded-2xl p-6 shadow-sm",
          "data-ocid": "ai-results",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-accent-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: "AI Prijedlozi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/20 text-accent-foreground border-0 ml-auto", children: "Generirano AI-om" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap font-body", children: suggestMutation.data })
          ]
        }
      ),
      suggestMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "bg-destructive/5 border border-destructive/20 rounded-xl p-5 text-center",
          "data-ocid": "ai-error",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: "Greška pri dohvaćanju sugestija" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Provjerite internet vezu i pokušajte ponovo" })
          ]
        }
      )
    ] })
  ] });
}
export {
  AiSuggestionsPage as default
};
