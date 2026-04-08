import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type NoteId = bigint;
export interface RecipeInput {
    title: string;
    cookTime: bigint;
    steps: Array<string>;
    dietaryTags: Array<DietaryTag>;
    cuisine: Cuisine;
    prepTime: bigint;
    category: Category;
    servings: bigint;
    ingredients: Array<Ingredient>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CollabNote {
    id: NoteId;
    recipeId: RecipeId;
    createdAt: bigint;
    text: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type RecipeId = bigint;
export type FlagId = bigint;
export interface Ingredient {
    name: string;
    unit: string;
    quantity: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface ImprovementFlag {
    id: FlagId;
    status: FlagStatus;
    recipeId: RecipeId;
    createdAt: bigint;
    description: string;
}
export interface Recipe {
    id: RecipeId;
    title: string;
    createdAt: bigint;
    cookTime: bigint;
    updatedAt: bigint;
    steps: Array<string>;
    dietaryTags: Array<DietaryTag>;
    cuisine: Cuisine;
    prepTime: bigint;
    category: Category;
    servings: bigint;
    ingredients: Array<Ingredient>;
}
export enum Category {
    deserti = "deserti",
    glavnaJela = "glavnaJela",
    pica = "pica",
    predjela = "predjela"
}
export enum Cuisine {
    hrvatska = "hrvatska",
    azijska = "azijska",
    francuska = "francuska",
    talijanska = "talijanska",
    ostalo = "ostalo"
}
export enum DietaryTag {
    veganski = "veganski",
    bezGlutena = "bezGlutena",
    vegetarijansko = "vegetarijansko"
}
export enum FlagStatus {
    otvoreno = "otvoreno",
    rijeseno = "rijeseno"
}
export interface backendInterface {
    addFlag(recipeId: RecipeId, description: string): Promise<ImprovementFlag>;
    addNote(recipeId: RecipeId, text: string): Promise<CollabNote>;
    createRecipe(input: RecipeInput): Promise<Recipe>;
    deleteNote(noteId: NoteId): Promise<boolean>;
    deleteRecipe(id: RecipeId): Promise<boolean>;
    getAllRecipes(): Promise<Array<Recipe>>;
    getFlagsForRecipe(recipeId: RecipeId): Promise<Array<ImprovementFlag>>;
    getNotesForRecipe(recipeId: RecipeId): Promise<Array<CollabNote>>;
    getRecipe(id: RecipeId): Promise<Recipe | null>;
    resolveFlag(flagId: FlagId): Promise<boolean>;
    suggestRecipes(ingredients: Array<string>, dietaryRestrictions: Array<string>): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateRecipe(id: RecipeId, input: RecipeInput): Promise<boolean>;
}
