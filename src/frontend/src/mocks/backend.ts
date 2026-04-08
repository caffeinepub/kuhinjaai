import type { backendInterface } from "../backend";
import {
  Category,
  Cuisine,
  DietaryTag,
  FlagStatus,
  type Recipe,
  type CollabNote,
  type ImprovementFlag,
} from "../backend";

const sampleRecipes: Recipe[] = [
  {
    id: BigInt(0),
    title: "Pašticada s njokima",
    createdAt: BigInt(Date.now() * 1_000_000),
    updatedAt: BigInt(Date.now() * 1_000_000),
    cookTime: BigInt(180),
    prepTime: BigInt(30),
    servings: BigInt(6),
    category: Category.glavnaJela,
    cuisine: Cuisine.hrvatska,
    dietaryTags: [],
    ingredients: [
      { name: "Goveđi but", quantity: "1.5", unit: "kg" },
      { name: "Crno vino", quantity: "300", unit: "ml" },
      { name: "Rajčice", quantity: "400", unit: "g" },
      { name: "Luk", quantity: "2", unit: "kom" },
      { name: "Šljive", quantity: "100", unit: "g" },
      { name: "Začini", quantity: "1", unit: "žlica" },
    ],
    steps: [
      "Meso marinirati u vinu i začinima 24 sata.",
      "Pržiti luk do zlatne boje na maslinovom ulju.",
      "Dodati meso i pržiti 10 minuta.",
      "Dodati rajčice, šljive i vino.",
      "Kuhati na laganoj vatri 3 sata.",
      "Poslužiti s njokima.",
    ],
  },
  {
    id: BigInt(1),
    title: "Bruschetta s rajčicom i bosiljkom",
    createdAt: BigInt(Date.now() * 1_000_000),
    updatedAt: BigInt(Date.now() * 1_000_000),
    cookTime: BigInt(10),
    prepTime: BigInt(10),
    servings: BigInt(4),
    category: Category.predjela,
    cuisine: Cuisine.talijanska,
    dietaryTags: [DietaryTag.vegetarijansko],
    ingredients: [
      { name: "Bageta", quantity: "1", unit: "kom" },
      { name: "Rajčice cherry", quantity: "300", unit: "g" },
      { name: "Svježi bosiljak", quantity: "20", unit: "g" },
      { name: "Maslinovo ulje", quantity: "4", unit: "žlice" },
      { name: "Češnjak", quantity: "2", unit: "češnja" },
    ],
    steps: [
      "Narežite bagetu na kriške i prepecite.",
      "Natrljajte kruščine s češnjakom.",
      "Rajčice nasjeckajte i začinite solju i uljem.",
      "Stavite smjesu na kruh, ukrasite bosiljkom.",
    ],
  },
  {
    id: BigInt(2),
    title: "Crème brûlée s lavendom",
    createdAt: BigInt(Date.now() * 1_000_000),
    updatedAt: BigInt(Date.now() * 1_000_000),
    cookTime: BigInt(45),
    prepTime: BigInt(20),
    servings: BigInt(4),
    category: Category.deserti,
    cuisine: Cuisine.francuska,
    dietaryTags: [DietaryTag.vegetarijansko],
    ingredients: [
      { name: "Vrhnje za kuhanje", quantity: "500", unit: "ml" },
      { name: "Žumanjci", quantity: "5", unit: "kom" },
      { name: "Šećer", quantity: "100", unit: "g" },
      { name: "Lavanda", quantity: "1", unit: "žlica" },
      { name: "Vanilin šećer", quantity: "1", unit: "vr." },
    ],
    steps: [
      "Zagrijati vrhnje s lavendom, procijediti.",
      "Umutiti žumanjce sa šećerom.",
      "Sjediniti s vrhnjem, uliti u kalupe.",
      "Peći na 160°C u vodenoj kupelji 40 minuta.",
      "Ohladiti i karamelizirati šećer na vrhu.",
    ],
  },
  {
    id: BigInt(3),
    title: "Ramen s piletinom i shiitake gljivama",
    createdAt: BigInt(Date.now() * 1_000_000),
    updatedAt: BigInt(Date.now() * 1_000_000),
    cookTime: BigInt(60),
    prepTime: BigInt(20),
    servings: BigInt(2),
    category: Category.glavnaJela,
    cuisine: Cuisine.azijska,
    dietaryTags: [],
    ingredients: [
      { name: "Pileći batak", quantity: "2", unit: "kom" },
      { name: "Ramen rezanci", quantity: "200", unit: "g" },
      { name: "Shiitake gljive", quantity: "100", unit: "g" },
      { name: "Miso pasta", quantity: "2", unit: "žlice" },
      { name: "Soja umak", quantity: "3", unit: "žlice" },
      { name: "Mladi luk", quantity: "3", unit: "stabljike" },
    ],
    steps: [
      "Pirjati piletinu s đumbirom i češnjakom.",
      "Dodati vodu i kuhati 30 min za temeljac.",
      "Izvaditi piletinu, usitniti, vratiti u juhu.",
      "Dodati miso pastu i soja umak.",
      "Skuhati rezance, poslužiti s gljivama i lukom.",
    ],
  },
];

const sampleNotes: CollabNote[] = [
  {
    id: BigInt(0),
    recipeId: BigInt(0),
    createdAt: BigInt(Date.now() * 1_000_000),
    text: "Probali smo dodati karanfilić u marinadu — odlično se slaže s mesom!",
  },
  {
    id: BigInt(1),
    recipeId: BigInt(0),
    createdAt: BigInt(Date.now() * 1_000_000 - 3600000000000),
    text: "Smanjiti količinu soli, gosti preferiraju blaži okus.",
  },
];

const sampleFlags: ImprovementFlag[] = [
  {
    id: BigInt(0),
    recipeId: BigInt(0),
    createdAt: BigInt(Date.now() * 1_000_000),
    description: "Dodati alternativu za bez-glutensku verziju",
    status: FlagStatus.otvoreno,
  },
];

export const mockBackend: backendInterface = {
  getAllRecipes: async () => sampleRecipes,
  getRecipe: async (id) => sampleRecipes.find((r) => r.id === id) ?? null,
  createRecipe: async (input) => ({
    id: BigInt(sampleRecipes.length),
    createdAt: BigInt(Date.now() * 1_000_000),
    updatedAt: BigInt(Date.now() * 1_000_000),
    ...input,
  }),
  updateRecipe: async () => true,
  deleteRecipe: async () => true,
  addNote: async (recipeId, text) => ({
    id: BigInt(99),
    recipeId,
    createdAt: BigInt(Date.now() * 1_000_000),
    text,
  }),
  getNotesForRecipe: async (recipeId) =>
    sampleNotes.filter((n) => n.recipeId === recipeId),
  deleteNote: async () => true,
  addFlag: async (recipeId, description) => ({
    id: BigInt(99),
    recipeId,
    createdAt: BigInt(Date.now() * 1_000_000),
    description,
    status: FlagStatus.otvoreno,
  }),
  getFlagsForRecipe: async (recipeId) =>
    sampleFlags.filter((f) => f.recipeId === recipeId),
  resolveFlag: async () => true,
  suggestRecipes: async () =>
    "Na temelju dostupnih sastojaka preporučujemo: **Pašticadu s njokima** — klasično dalmatinsko jelo koje savršeno kombinira goveđe meso s umakom od rajčice. Možete dodati šljive za bogatiji okus. **Bruschetta** bi bila odličan izbor za lagani starter koji nadopunjuje ovaj obrok.",
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
};
