import { createBrowserRouter } from "react-router";
import { pages as Main } from "./features/Main";
import { pages as Auth } from "./features/Auth";
import { ErrorPage } from "./features/Error/pages";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth.AuthPage />,
  },
  {
    path: "/",
    element: <Main.MainPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
