# Design Brief: KuhinjaAI

**Purpose:** Restaurant recipe management app. No authentication. Interactive recipe browsing, collaborative development, AI suggestions. All UI in Croatian.

**Tone:** Professional warmth. Culinary editorial aesthetic inspired by food magazines (Bon Appétit, Saveur). Organized and structured, never sterile or cold.

**Differentiation:** Each recipe feels like a published recipe card — elevated, composed, visually distinct from generic CRUD. Collaborative notes embedded as first-class citizens. Warm color palette anchors trust and appetite.

## Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|-----------|----------|-------|
| Primary (Terracotta) | 0.55 0.14 32 | 0.68 0.15 35 | Buttons, active states, highlights |
| Secondary (Sage) | 0.65 0.08 142 | 0.58 0.12 145 | Category tags, secondary actions |
| Accent (Saffron) | 0.80 0.18 72 | 0.75 0.20 70 | Special ingredients, call-outs, AI suggestions |
| Background | 0.98 0.01 40 | 0.15 0.02 38 | Page background (warm off-white/dark grey) |
| Card | 0.99 0.01 40 | 0.18 0.02 38 | Recipe cards, elevated surfaces |
| Muted | 0.88 0.02 40 | 0.25 0.02 38 | Disabled states, placeholders |
| Foreground | 0.22 0.04 30 | 0.92 0.02 40 | Body text, primary content |
| Border | 0.92 0.02 40 | 0.28 0.02 38 | Dividers, card edges |

## Typography

| Family | Weight | Scale | Usage |
|--------|--------|-------|-------|
| Fraunces (serif) | 400, 700 | 2.5rem, 1.875rem, 1.5rem | Recipe titles, section headers, display |
| DM Sans (sans-serif) | 400, 700 | 1rem, 0.875rem, 0.75rem | Body text, ingredient lists, instructions |
| GeistMono (monospace) | 400, 500 | 0.75rem | Technical notes, timing callouts |

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header/Navigation | `bg-card` with `border-b`, warm accent underline | App title, quick search, nav to recipe browser |
| Recipe Card | `bg-card` with `border` and `shadow-md`, lifted appearance | Each recipe is a distinct, discoverable unit |
| Ingredient Section | `bg-secondary/10` badges with `text-secondary-foreground` | Clear visual separation of ingredients; secondary color reinforces "category/group" semantics |
| Instructions Zone | White/light background, numbered steps with `font-mono` timing | Clarity and scannability for kitchen workflow |
| Collaborative Notes | `bg-muted/30` with `border-l-4 border-accent`, indented | Accent color signals user contributions and AI suggestions |
| Footer | `border-t`, minimal text in `text-muted-foreground` | Spacious breathing room, not dominant |

## Spacing & Rhythm

- **Horizontal:** 2rem padding in containers; 1rem gutters between recipe cards (md+ screens); 0.5rem gutters on mobile.
- **Vertical:** 3rem section breaks; 1.5rem within card sections; 0.75rem between list items.
- Generous whitespace encourages focus on individual recipes; prevents dense, overwhelming layouts.

## Component Patterns

- **Recipe Card:** Border-framed with shadow lift, centered 2–3 items per row (md+), 1 per row (mobile).
- **Ingredient Badges:** Secondary color, pill-shaped, clickable to filter/search by ingredient.
- **CTA Buttons:** Primary (terracotta) for "Add Recipe", "Save"; secondary (sage outline) for "Cancel", "Explore".
- **Collaborative Note:** Accent-left-border, muted background, avatar + timestamp (if user data available).

## Motion

- **Fade-in:** 0.3s ease-in-out on initial recipe load.
- **Slide-up:** 0.4s ease-out for new collaborative note arrivals.
- **Hover:** All interactive elements respond with `opacity-90` or subtle color shift (no aggressive scale transforms).
- Transitions use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, natural motion.

## Constraints

- No gradients on backgrounds (warm OKLCH palette provides visual interest).
- No hard drop shadows (use soft, warm-tinted shadows only via `boxShadow` tokens).
- Avoid icon-only buttons (always pair with text label or aria-label).
- Recipe images should be user-uploaded or placeholder with consistent aspect ratio (16:9 preferred).

## Signature Detail

**Collaborative Note Threading:** Each recipe can have embedded notes from team members and AI suggestions. Notes appear with left accent border (saffron) and muted background, creating a distinct "contribution layer" that encourages recipe iteration and team dialogue without cluttering the recipe itself.

