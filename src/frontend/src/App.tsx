import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy page imports
const HomePage = lazy(() => import("@/pages/HomePage"));
const RecipeDetailPage = lazy(() => import("@/pages/RecipeDetailPage"));
const NewRecipePage = lazy(() => import("@/pages/NewRecipePage"));
const AiSuggestionsPage = lazy(() => import("@/pages/AiSuggestionsPage"));

function PageLoader() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}

// Root layout route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// Child routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const recipeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recept/$id",
  component: RecipeDetailPage,
});

const newRecipeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/novi-recept",
  component: NewRecipePage,
});

const aiSuggestionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-sugestije",
  component: AiSuggestionsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  recipeDetailRoute,
  newRecipeRoute,
  aiSuggestionsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
