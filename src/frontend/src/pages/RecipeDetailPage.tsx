import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddFlag, useFlags, useResolveFlag } from "@/hooks/useFlags";
import { useAddNote, useDeleteNote, useNotes } from "@/hooks/useNotes";
import { useRecipe } from "@/hooks/useRecipes";
import {
  getCategoryLabel,
  getCuisineLabel,
  getDietaryTagLabel,
  isFlagOpen,
} from "@/types/recipe";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  Clock,
  Flag,
  MessageSquarePlus,
  Send,
  Timer,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function RecipeDetailPage() {
  const { id } = useParams({ from: "/recept/$id" });
  const recipeId = BigInt(id);

  const { data: recipe, isLoading } = useRecipe(recipeId);
  const { data: notes = [] } = useNotes(recipeId);
  const { data: flags = [] } = useFlags(recipeId);

  const addNote = useAddNote(recipeId);
  const deleteNote = useDeleteNote(recipeId);
  const addFlag = useAddFlag(recipeId);
  const resolveFlag = useResolveFlag(recipeId);

  const [noteText, setNoteText] = useState("");
  const [flagText, setFlagText] = useState("");
  const [showFlagForm, setShowFlagForm] = useState(false);

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    try {
      await addNote.mutateAsync(noteText.trim());
      setNoteText("");
      toast.success("Bilješka dodana!");
    } catch {
      toast.error("Greška pri dodavanju bilješke");
    }
  };

  const handleAddFlag = async () => {
    if (!flagText.trim()) return;
    try {
      await addFlag.mutateAsync(flagText.trim());
      setFlagText("");
      setShowFlagForm(false);
      toast.success("Prijedlog za poboljšanje dodan!");
    } catch {
      toast.error("Greška pri dodavanju prijedloga");
    }
  };

  const handleResolveFlag = async (flagId: bigint) => {
    try {
      await resolveFlag.mutateAsync(flagId);
      toast.success("Prijedlog označen kao riješen!");
    } catch {
      toast.error("Greška");
    }
  };

  const handleDeleteNote = async (noteId: bigint) => {
    try {
      await deleteNote.mutateAsync(noteId);
      toast.success("Bilješka uklonjena");
    } catch {
      toast.error("Greška pri uklanjanju bilješke");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center"
        data-ocid="recipe-not-found"
      >
        <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Recept nije pronađen
        </h2>
        <p className="text-muted-foreground mb-6">
          Ovaj recept ne postoji ili je uklonjen.
        </p>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Povratak na recepte
          </Button>
        </Link>
      </div>
    );
  }

  const totalTime = Number(recipe.prepTime) + Number(recipe.cookTime);
  const openFlags = flags.filter((f) => isFlagOpen(f.status));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-smooth"
        data-ocid="back-link"
      >
        <ArrowLeft className="w-4 h-4" />
        Svi recepti
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{getCategoryLabel(recipe.category)}</Badge>
          <Badge variant="outline">{getCuisineLabel(recipe.cuisine)}</Badge>
          {recipe.dietaryTags.map((tag) => (
            <Badge
              key={getDietaryTagLabel(tag)}
              className="bg-accent/15 text-accent-foreground border-0"
            >
              {getDietaryTagLabel(tag)}
            </Badge>
          ))}
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4 leading-tight">
          {recipe.title}
        </h1>

        {/* Meta strip */}
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground bg-muted/30 rounded-xl px-5 py-4 mb-8">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <strong className="text-foreground">Priprema:</strong>{" "}
            {recipe.prepTime.toString()} min
          </span>
          <span className="flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-primary" />
            <strong className="text-foreground">Kuhanje:</strong>{" "}
            {recipe.cookTime.toString()} min
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-accent-foreground" />
            <strong className="text-foreground">Ukupno:</strong> {totalTime} min
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            <strong className="text-foreground">Porcije:</strong>{" "}
            {recipe.servings.toString()}
          </span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Ingredients */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="md:col-span-2"
        >
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h2 className="recipe-section-header mb-4">Sastojci</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing) => (
                <li
                  key={ing.name}
                  className="flex items-baseline justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0"
                >
                  <span className="text-foreground font-medium">
                    {ing.name}
                  </span>
                  <span className="text-muted-foreground shrink-0">
                    {ing.quantity} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="md:col-span-3"
        >
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h2 className="recipe-section-header mb-5">Postupak pripreme</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={`step-${step.slice(0, 20)}`} className="flex gap-4">
                  <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-foreground leading-relaxed pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>

      <Separator className="my-8" />

      {/* Collaborative Notes */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-8"
        data-ocid="notes-section"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-accent-foreground" />
            Suradničke bilješke
            {notes.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {notes.length}
              </Badge>
            )}
          </h2>
        </div>

        {/* Note input */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Dodajte bilješku za tim..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
            className="flex-1 px-4 py-2 bg-card border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            data-ocid="note-input"
          />
          <Button
            onClick={handleAddNote}
            disabled={!noteText.trim() || addNote.isPending}
            size="icon"
            className="shrink-0"
            aria-label="Dodaj bilješku"
            data-ocid="note-submit"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Notes list */}
        {notes.length === 0 ? (
          <p className="text-muted-foreground text-sm italic py-4 text-center">
            Nema bilješki. Budite prvi koji komentira ovaj recept!
          </p>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id.toString()}
                className="collaborative-note group"
                data-ocid={`note-${note.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-foreground text-sm leading-relaxed">
                    {note.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-muted-foreground hover:text-destructive transition-smooth opacity-0 group-hover:opacity-100 shrink-0"
                    aria-label="Ukloni bilješku"
                    data-ocid={`note-delete-${note.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-muted-foreground text-xs mt-1">
                  {new Date(Number(note.createdAt)).toLocaleDateString("hr-HR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Improvement Flags */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        data-ocid="flags-section"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
            <Flag className="w-5 h-5 text-destructive" />
            Prijedlozi za poboljšanje
            {openFlags.length > 0 && (
              <Badge variant="destructive" className="text-xs">
                {openFlags.length} otvoreno
              </Badge>
            )}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFlagForm(!showFlagForm)}
            className="gap-1.5 text-xs"
            data-ocid="add-flag-toggle"
          >
            <Flag className="w-3.5 h-3.5" />
            Prijavi problem
          </Button>
        </div>

        {showFlagForm && (
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Opišite prijedlog za poboljšanje..."
              value={flagText}
              onChange={(e) => setFlagText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddFlag()}
              className="flex-1 px-4 py-2 bg-card border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              data-ocid="flag-input"
            />
            <Button
              onClick={handleAddFlag}
              disabled={!flagText.trim() || addFlag.isPending}
              size="sm"
              variant="destructive"
              data-ocid="flag-submit"
            >
              Dodaj
            </Button>
          </div>
        )}

        {flags.length === 0 ? (
          <p className="text-muted-foreground text-sm italic py-4 text-center">
            Nema prijavljenih poboljšanja za ovaj recept.
          </p>
        ) : (
          <div className="space-y-3">
            {flags.map((flag) => {
              const isOpen = isFlagOpen(flag.status);
              return (
                <div
                  key={flag.id.toString()}
                  className={`flex items-start justify-between gap-3 p-4 rounded-lg border transition-smooth ${
                    isOpen
                      ? "bg-destructive/5 border-destructive/20"
                      : "bg-muted/30 border-border opacity-60"
                  }`}
                  data-ocid={`flag-${flag.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm leading-relaxed">
                      {flag.description}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {new Date(Number(flag.createdAt)).toLocaleDateString(
                        "hr-HR",
                      )}{" "}
                      ·{" "}
                      {isOpen ? (
                        <span className="text-destructive font-medium">
                          Otvoreno
                        </span>
                      ) : (
                        <span className="text-secondary-foreground font-medium">
                          Riješeno
                        </span>
                      )}
                    </p>
                  </div>
                  {isOpen && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleResolveFlag(flag.id)}
                      disabled={resolveFlag.isPending}
                      className="gap-1.5 text-xs shrink-0 text-secondary-foreground hover:text-foreground"
                      aria-label="Označi kao riješeno"
                      data-ocid={`flag-resolve-${flag.id}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Riješi
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </motion.section>
    </div>
  );
}
