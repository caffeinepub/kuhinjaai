import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";

interface SuggestRecipesParams {
  ingredients: string[];
  preferences: string[];
}

export function useSuggestRecipes() {
  const { actor } = useActor(createActor);
  return useMutation<string, Error, SuggestRecipesParams>({
    mutationFn: async ({ ingredients, preferences }: SuggestRecipesParams) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).suggestRecipes(ingredients, preferences);
    },
  });
}
