import List "mo:core/List";
import Time "mo:core/Time";
import RecipesLib "lib/recipes";
import RecipesApi "mixins/recipes-api";
import Types "types/recipes";

actor {
  let recipes = List.empty<Types.Recipe>();
  let notes = List.empty<Types.CollabNote>();
  let flags = List.empty<Types.ImprovementFlag>();
  let state : Types.State = {
    var nextRecipeId = 0;
    var nextNoteId = 0;
    var nextFlagId = 0;
    var initialized = false;
  };

  include RecipesApi(recipes, notes, flags, state);

  // ── First-deploy initialisation ───────────────────────────────────────────────

  if (not state.initialized) {
    let now = Time.now();
    ignore RecipesLib.initSampleRecipes(recipes, now);
    state.nextRecipeId := recipes.size();
    state.initialized := true;
  };
};
