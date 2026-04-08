import { createActor } from "@/backend";
import type { Recipe, RecipeId, RecipeInput } from "@/types/recipe";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAllRecipes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getAllRecipes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecipe(id: RecipeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Recipe | null>({
    queryKey: ["recipe", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getRecipe(id);
      if (Array.isArray(result) && result.length === 0) return null;
      if (Array.isArray(result) && result.length > 0)
        return result[0] as Recipe;
      return result as Recipe | null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useCreateRecipe() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Recipe, Error, RecipeInput>({
    mutationFn: async (input: RecipeInput) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).createRecipe(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}

export function useUpdateRecipe() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { id: RecipeId; input: RecipeInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).updateRecipe(id, input);
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipe", id.toString()] });
    },
  });
}

export function useDeleteRecipe() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, RecipeId>({
    mutationFn: async (id: RecipeId) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).deleteRecipe(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}
