import List "mo:core/List";
import Types "../types/recipes";

module {

  // ── Recipe CRUD ──────────────────────────────────────────────────────────────

  public func createRecipe(
    recipes : List.List<Types.Recipe>,
    nextId : Nat,
    input : Types.RecipeInput,
    now : Int,
  ) : Types.Recipe {
    let recipe : Types.Recipe = {
      id = nextId;
      title = input.title;
      category = input.category;
      cuisine = input.cuisine;
      ingredients = input.ingredients;
      steps = input.steps;
      prepTime = input.prepTime;
      cookTime = input.cookTime;
      servings = input.servings;
      dietaryTags = input.dietaryTags;
      createdAt = now;
      updatedAt = now;
    };
    recipes.add(recipe);
    recipe;
  };

  public func getRecipe(
    recipes : List.List<Types.Recipe>,
    id : Types.RecipeId,
  ) : ?Types.Recipe {
    recipes.find(func(r) { r.id == id });
  };

  public func getAllRecipes(
    recipes : List.List<Types.Recipe>,
  ) : [Types.Recipe] {
    recipes.toArray();
  };

  public func updateRecipe(
    recipes : List.List<Types.Recipe>,
    id : Types.RecipeId,
    input : Types.RecipeInput,
    now : Int,
  ) : Bool {
    var found = false;
    recipes.mapInPlace(
      func(r) {
        if (r.id == id) {
          found := true;
          {
            r with
            title = input.title;
            category = input.category;
            cuisine = input.cuisine;
            ingredients = input.ingredients;
            steps = input.steps;
            prepTime = input.prepTime;
            cookTime = input.cookTime;
            servings = input.servings;
            dietaryTags = input.dietaryTags;
            updatedAt = now;
          };
        } else { r };
      }
    );
    found;
  };

  public func deleteRecipe(
    recipes : List.List<Types.Recipe>,
    id : Types.RecipeId,
  ) : Bool {
    let sizeBefore = recipes.size();
    let filtered = recipes.filter(func(r) { r.id != id });
    recipes.clear();
    recipes.append(filtered);
    recipes.size() < sizeBefore;
  };

  // ── Collaborative Notes ───────────────────────────────────────────────────────

  public func addNote(
    notes : List.List<Types.CollabNote>,
    nextId : Nat,
    recipeId : Types.RecipeId,
    text : Text,
    now : Int,
  ) : Types.CollabNote {
    let note : Types.CollabNote = {
      id = nextId;
      recipeId;
      text;
      createdAt = now;
    };
    notes.add(note);
    note;
  };

  public func getNotesForRecipe(
    notes : List.List<Types.CollabNote>,
    recipeId : Types.RecipeId,
  ) : [Types.CollabNote] {
    notes.filter(func(n) { n.recipeId == recipeId }).toArray();
  };

  public func deleteNote(
    notes : List.List<Types.CollabNote>,
    noteId : Types.NoteId,
  ) : Bool {
    let sizeBefore = notes.size();
    let filtered = notes.filter(func(n) { n.id != noteId });
    notes.clear();
    notes.append(filtered);
    notes.size() < sizeBefore;
  };

  // ── Improvement Flags ─────────────────────────────────────────────────────────

  public func addFlag(
    flags : List.List<Types.ImprovementFlag>,
    nextId : Nat,
    recipeId : Types.RecipeId,
    description : Text,
    now : Int,
  ) : Types.ImprovementFlag {
    let flag : Types.ImprovementFlag = {
      id = nextId;
      recipeId;
      description;
      status = #otvoreno;
      createdAt = now;
    };
    flags.add(flag);
    flag;
  };

  public func getFlagsForRecipe(
    flags : List.List<Types.ImprovementFlag>,
    recipeId : Types.RecipeId,
  ) : [Types.ImprovementFlag] {
    flags.filter(func(f) { f.recipeId == recipeId }).toArray();
  };

  public func resolveFlag(
    flags : List.List<Types.ImprovementFlag>,
    flagId : Types.FlagId,
  ) : Bool {
    var found = false;
    flags.mapInPlace(
      func(f) {
        if (f.id == flagId) {
          found := true;
          { f with status = #rijeseno };
        } else { f };
      }
    );
    found;
  };

  // ── Sample Data ────────────────────────────────────────────────────────────────

  public func initSampleRecipes(
    recipes : List.List<Types.Recipe>,
    now : Int,
  ) : Nat {
    let samples : [Types.RecipeInput] = [
      // 1. Predjelo – Bruschetta s rajčicom
      {
        title = "Bruschetta s rajčicom i bosiljkom";
        category = #predjela;
        cuisine = #talijanska;
        ingredients = [
          { name = "Kruh ciabatta"; quantity = "4"; unit = "kriške" },
          { name = "Rajčice"; quantity = "3"; unit = "kom" },
          { name = "Svježi bosiljak"; quantity = "10"; unit = "listića" },
          { name = "Maslinovo ulje"; quantity = "3"; unit = "žlice" },
          { name = "Češnjak"; quantity = "2"; unit = "režnja" },
          { name = "Sol"; quantity = "1"; unit = "prstohvat" },
        ];
        steps = [
          "Kruh narežite na kriške i prepecite na roštilju ili u tosteru.",
          "Rajčice operite i narežite na sitne kocke.",
          "Bosiljak operite i sitno nasjeckajte.",
          "Rajčice pomiješajte s bosiljkom, maslinovim uljem, soli.",
          "Prepečeni kruh natrljajte prerezanim češnjakom.",
          "Stavite smjesu od rajčice na kruh i odmah poslužite.",
        ];
        prepTime = 10;
        cookTime = 5;
        servings = 4;
        dietaryTags = [#vegetarijansko, #veganski];
      },
      // 2. Glavno jelo – Pečena piletina s povrćem
      {
        title = "Pečena piletina s mediteranskim povrćem";
        category = #glavnaJela;
        cuisine = #hrvatska;
        ingredients = [
          { name = "Pileći bataci"; quantity = "4"; unit = "kom" },
          { name = "Tikvice"; quantity = "2"; unit = "kom" },
          { name = "Paprika"; quantity = "2"; unit = "kom" },
          { name = "Luk"; quantity = "1"; unit = "kom" },
          { name = "Maslinovo ulje"; quantity = "4"; unit = "žlice" },
          { name = "Ružmarin"; quantity = "2"; unit = "grančice" },
          { name = "Sol i papar"; quantity = "1"; unit = "prstohvat" },
        ];
        steps = [
          "Zagrijte pećnicu na 200°C.",
          "Pileće batake začinite solju, paprom i ružmarinom.",
          "Povrće narežite na veće komade.",
          "Posložite piletinu i povrće u lim za pečenje.",
          "Prelijte maslinovim uljem i pecite 45 minuta.",
          "Provjerite je li piletina potpuno pečena i poslužite.",
        ];
        prepTime = 15;
        cookTime = 45;
        servings = 4;
        dietaryTags = [#bezGlutena];
      },
      // 3. Desert – Kroštule
      {
        title = "Kroštule – tradicionalni hrvatski desert";
        category = #deserti;
        cuisine = #hrvatska;
        ingredients = [
          { name = "Brašno"; quantity = "300"; unit = "g" },
          { name = "Jaja"; quantity = "2"; unit = "kom" },
          { name = "Šećer"; quantity = "3"; unit = "žlice" },
          { name = "Rakija"; quantity = "2"; unit = "žlice" },
          { name = "Limunova korica"; quantity = "1"; unit = "kom" },
          { name = "Ulje za prženje"; quantity = "500"; unit = "ml" },
          { name = "Šećer u prahu"; quantity = "50"; unit = "g" },
        ];
        steps = [
          "Pomiješajte brašno, jaja, šećer, rakiju i limunovu koricu u tijesto.",
          "Mijesite dok tijesto ne postane glatko, zatim ostavite 30 minuta da odmori.",
          "Razvaljajte tijesto tanko (2-3 mm) i narežite na trake.",
          "Savijte svaku traku u oblik leptira ili petlje.",
          "Pržite u vrućem ulju dok ne postanu zlatne boje.",
          "Ocijedite na papiru i pospite šećerom u prahu.",
        ];
        prepTime = 40;
        cookTime = 20;
        servings = 8;
        dietaryTags = [#vegetarijansko];
      },
      // 4. Glavno jelo – Rižoto s gljivama (vegetarijansko)
      {
        title = "Kremasti rižoto s divljim gljivama";
        category = #glavnaJela;
        cuisine = #talijanska;
        ingredients = [
          { name = "Arborio riža"; quantity = "300"; unit = "g" },
          { name = "Miješane gljive"; quantity = "400"; unit = "g" },
          { name = "Luk"; quantity = "1"; unit = "kom" },
          { name = "Češnjak"; quantity = "3"; unit = "režnja" },
          { name = "Bijelo vino"; quantity = "100"; unit = "ml" },
          { name = "Povrtna juha"; quantity = "1"; unit = "l" },
          { name = "Parmezan"; quantity = "50"; unit = "g" },
          { name = "Maslac"; quantity = "30"; unit = "g" },
          { name = "Peršin"; quantity = "1"; unit = "hrpa" },
        ];
        steps = [
          "Na maslacu propržite sitno nasjeckani luk i češnjak.",
          "Dodajte gljive i pržite dok ne ispare.",
          "Dodajte rižu i miješajte 2 minute dok ne postane staklasta.",
          "Prelijte bijelim vinom i miješajte dok ne upije.",
          "Dodavajte vrelu juhu kutlaču po kutlaču, stalno miješajući.",
          "Nakon 18-20 minuta riža treba biti kremasta al dente.",
          "Dodajte parmezan i maslac, dobro promiješajte.",
          "Poslužite odmah, ukrašeno svježim peršinom.",
        ];
        prepTime = 10;
        cookTime = 25;
        servings = 4;
        dietaryTags = [#vegetarijansko];
      },
      // 5. Predjelo – Salata od hobotnice
      {
        title = "Salata od hobotnice s krumpirom";
        category = #predjela;
        cuisine = #hrvatska;
        ingredients = [
          { name = "Hobotnica"; quantity = "1"; unit = "kg" },
          { name = "Krumpir"; quantity = "500"; unit = "g" },
          { name = "Luk"; quantity = "1"; unit = "kom" },
          { name = "Maslinovo ulje"; quantity = "5"; unit = "žlica" },
          { name = "Ocat"; quantity = "2"; unit = "žlice" },
          { name = "Peršin"; quantity = "1"; unit = "hrpa" },
          { name = "Sol i papar"; quantity = "1"; unit = "prstohvat" },
        ];
        steps = [
          "Hobotincu operite i stavite u hladnu vodu, kuhajte 45-60 minuta dok ne omekša.",
          "Krumpir skuhajte zasebno u slanoj vodi, ogulite i narežite.",
          "Hobotincu narežite na zalogaje.",
          "Luk nasjeckajte na tanke kolutove.",
          "Sve sastojke pomiješajte, začinite maslinovim uljem i octom.",
          "Dodajte sol, papar i svježi peršin.",
          "Ostavite da se marinira najmanje 30 minuta prije posluživanja.",
        ];
        prepTime = 20;
        cookTime = 60;
        servings = 6;
        dietaryTags = [#bezGlutena];
      },
    ];

    var count = 0;
    for (input in samples.vals()) {
      let id = recipes.size();
      let recipe : Types.Recipe = {
        id;
        title = input.title;
        category = input.category;
        cuisine = input.cuisine;
        ingredients = input.ingredients;
        steps = input.steps;
        prepTime = input.prepTime;
        cookTime = input.cookTime;
        servings = input.servings;
        dietaryTags = input.dietaryTags;
        createdAt = now;
        updatedAt = now;
      };
      recipes.add(recipe);
      count += 1;
    };
    count;
  };
};
