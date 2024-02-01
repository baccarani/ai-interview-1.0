import { createBrowserRouter } from "react-router-dom";

import NotFound from "./not-found/NotFoundPage";
import ErrorBoundary from "./error-boundary/ErrorBoundary";
import HomePage from "./home/HomePage";
import InterviewPage from "./interview/InterviewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/interview",
    element: <InterviewPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorBoundary />,
  },
]);
