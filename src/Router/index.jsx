import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layouts/LayoutPublic";
import PageHome from "../Pages/PageHome";
import PageAbout from "../Pages/PageAbout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <PageHome />,
      },
      {
        path: "about",
        element: <PageAbout />,
      },
    ],
  },
]);
