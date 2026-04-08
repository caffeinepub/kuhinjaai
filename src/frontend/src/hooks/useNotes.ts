import { createActor } from "@/backend";
import type { CollabNote, NoteId, RecipeId } from "@/types/recipe";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotes(recipeId: RecipeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CollabNote[]>({
    queryKey: ["notes", recipeId?.toString()],
    queryFn: async () => {
      if (!actor || recipeId === undefined) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getNotesForRecipe(recipeId);
    },
    enabled: !!actor && !isFetching && recipeId !== undefined,
  });
}

export function useAddNote(recipeId: RecipeId | undefined) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<CollabNote, Error, string>({
    mutationFn: async (text: string) => {
      if (!actor || recipeId === undefined)
        throw new Error("Actor or recipeId not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).addNote(recipeId, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", recipeId?.toString()],
      });
    },
  });
}

export function useDeleteNote(recipeId: RecipeId | undefined) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, NoteId>({
    mutationFn: async (noteId: NoteId) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).deleteNote(noteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", recipeId?.toString()],
      });
    },
  });
}
