import { createActor } from "@/backend";
import type { FlagId, ImprovementFlag, RecipeId } from "@/types/recipe";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFlags(recipeId: RecipeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ImprovementFlag[]>({
    queryKey: ["flags", recipeId?.toString()],
    queryFn: async () => {
      if (!actor || recipeId === undefined) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getFlagsForRecipe(recipeId);
    },
    enabled: !!actor && !isFetching && recipeId !== undefined,
  });
}

export function useAddFlag(recipeId: RecipeId | undefined) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<ImprovementFlag, Error, string>({
    mutationFn: async (description: string) => {
      if (!actor || recipeId === undefined)
        throw new Error("Actor or recipeId not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).addFlag(recipeId, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flags", recipeId?.toString()],
      });
    },
  });
}

export function useResolveFlag(recipeId: RecipeId | undefined) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, FlagId>({
    mutationFn: async (flagId: FlagId) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).resolveFlag(flagId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flags", recipeId?.toString()],
      });
    },
  });
}
