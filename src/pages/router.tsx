import { createBrowserRouter } from "react-router-dom";

import NotFound from "./not-found/NotFoundPage";
import ErrorBoundary from "./error-boundary/ErrorBoundary";
import HomePage from "./home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorBoundary />,
  },
]);
