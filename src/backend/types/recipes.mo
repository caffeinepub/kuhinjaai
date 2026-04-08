module {
  public type RecipeId = Nat;
  public type NoteId = Nat;
  public type FlagId = Nat;

  public type Category = {
    #predjela;
    #glavnaJela;
    #deserti;
    #pica;
  };

  public type Cuisine = {
    #hrvatska;
    #talijanska;
    #francuska;
    #azijska;
    #ostalo;
  };

  public type DietaryTag = {
    #vegetarijansko;
    #veganski;
    #bezGlutena;
  };

  public type FlagStatus = {
    #otvoreno;
    #rijeseno;
  };

  public type Ingredient = {
    name : Text;
    quantity : Text;
    unit : Text;
  };

  public type Recipe = {
    id : RecipeId;
    title : Text;
    category : Category;
    cuisine : Cuisine;
    ingredients : [Ingredient];
    steps : [Text];
    prepTime : Nat;
    cookTime : Nat;
    servings : Nat;
    dietaryTags : [DietaryTag];
    createdAt : Int;
    updatedAt : Int;
  };

  public type RecipeInput = {
    title : Text;
    category : Category;
    cuisine : Cuisine;
    ingredients : [Ingredient];
    steps : [Text];
    prepTime : Nat;
    cookTime : Nat;
    servings : Nat;
    dietaryTags : [DietaryTag];
  };

  public type CollabNote = {
    id : NoteId;
    recipeId : RecipeId;
    text : Text;
    createdAt : Int;
  };

  public type ImprovementFlag = {
    id : FlagId;
    recipeId : RecipeId;
    description : Text;
    status : FlagStatus;
    createdAt : Int;
  };

  public type AISuggestion = {
    name : Text;
    description : Text;
  };

  public type State = {
    var nextRecipeId : Nat;
    var nextNoteId : Nat;
    var nextFlagId : Nat;
    var initialized : Bool;
  };
};
