import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import Create from "../pages/Create";
import BookDetails from "../pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

export default router;
