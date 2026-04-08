import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./proxy-Cqp7hEY1.js";
import { u as useQueryClient } from "./index-OIp2ZZ2R.js";
function useAllRecipes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecipes();
    },
    enabled: !!actor && !isFetching
  });
}
function useRecipe(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["recipe", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      const result = await actor.getRecipe(id);
      if (Array.isArray(result) && result.length === 0) return null;
      if (Array.isArray(result) && result.length > 0)
        return result[0];
      return result;
    },
    enabled: !!actor && !isFetching && id !== void 0
  });
}
function useCreateRecipe() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createRecipe(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    }
  });
}
export {
  useRecipe as a,
  useCreateRecipe as b,
  useAllRecipes as u
};
