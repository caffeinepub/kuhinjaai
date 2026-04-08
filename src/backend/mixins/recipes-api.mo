import List "mo:core/List";
import Time "mo:core/Time";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import RecipesLib "../lib/recipes";
import Types "../types/recipes";

mixin (
  recipes : List.List<Types.Recipe>,
  notes : List.List<Types.CollabNote>,
  flags : List.List<Types.ImprovementFlag>,
  state : Types.State,
) {

  // ── Transform (required by http-outcalls) ────────────────────────────────────

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Recipe CRUD ──────────────────────────────────────────────────────────────

  public func createRecipe(input : Types.RecipeInput) : async Types.Recipe {
    let now = Time.now();
    let recipe = RecipesLib.createRecipe(recipes, state.nextRecipeId, input, now);
    state.nextRecipeId += 1;
    recipe;
  };

  public query func getRecipe(id : Types.RecipeId) : async ?Types.Recipe {
    RecipesLib.getRecipe(recipes, id);
  };

  public query func getAllRecipes() : async [Types.Recipe] {
    RecipesLib.getAllRecipes(recipes);
  };

  public func updateRecipe(id : Types.RecipeId, input : Types.RecipeInput) : async Bool {
    let now = Time.now();
    RecipesLib.updateRecipe(recipes, id, input, now);
  };

  public func deleteRecipe(id : Types.RecipeId) : async Bool {
    RecipesLib.deleteRecipe(recipes, id);
  };

  // ── Collaborative Notes ───────────────────────────────────────────────────────

  public func addNote(recipeId : Types.RecipeId, text : Text) : async Types.CollabNote {
    let now = Time.now();
    let note = RecipesLib.addNote(notes, state.nextNoteId, recipeId, text, now);
    state.nextNoteId += 1;
    note;
  };

  public query func getNotesForRecipe(recipeId : Types.RecipeId) : async [Types.CollabNote] {
    RecipesLib.getNotesForRecipe(notes, recipeId);
  };

  public func deleteNote(noteId : Types.NoteId) : async Bool {
    RecipesLib.deleteNote(notes, noteId);
  };

  // ── Improvement Flags ─────────────────────────────────────────────────────────

  public func addFlag(recipeId : Types.RecipeId, description : Text) : async Types.ImprovementFlag {
    let now = Time.now();
    let flag = RecipesLib.addFlag(flags, state.nextFlagId, recipeId, description, now);
    state.nextFlagId += 1;
    flag;
  };

  public query func getFlagsForRecipe(recipeId : Types.RecipeId) : async [Types.ImprovementFlag] {
    RecipesLib.getFlagsForRecipe(flags, recipeId);
  };

  public func resolveFlag(flagId : Types.FlagId) : async Bool {
    RecipesLib.resolveFlag(flags, flagId);
  };

  // ── AI Suggestions ────────────────────────────────────────────────────────────

  public func suggestRecipes(
    ingredients : [Text],
    dietaryRestrictions : [Text],
  ) : async Text {
    let ingredientsList = ingredients.vals().join(", ");
    let dietaryList = if (dietaryRestrictions.size() == 0) {
      "bez posebnih ograničenja"
    } else {
      dietaryRestrictions.vals().join(", ")
    };

    let prompt = "Ti si kuhar u restoranu. Predloži 3 jela koja se mogu pripremiti od sljedećih sastojaka: "
      # ingredientsList
      # ". Prehrambena ograničenja: "
      # dietaryList
      # ". Za svako jelo navedi: naziv jela, kratki opis i ključne sastojke. Odgovori u JSON formatu s poljem 'suggestions' koji sadrži niz objekata s poljima 'name' i 'description'.";

    let requestBody = "{\"model\":\"gpt-3.5-turbo\",\"messages\":[{\"role\":\"user\",\"content\":\""
      # escapeJson(prompt)
      # "\"}],\"max_tokens\":500}";

    let url = "https://api.openai.com/v1/chat/completions";
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer OPENAI_API_KEY" },
    ];

    await OutCall.httpPostRequest(url, headers, requestBody, transform);
  };

  // ── Private Helpers ───────────────────────────────────────────────────────────

  private func escapeJson(text : Text) : Text {
    var result = text;
    result := result.replace(#text "\\", "\\\\");
    result := result.replace(#text "\"", "\\\"");
    result := result.replace(#text "\n", "\\n");
    result := result.replace(#text "\r", "\\r");
    result := result.replace(#text "\t", "\\t");
    result;
  };
};
