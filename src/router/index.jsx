import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import BookForm from "../pages/BookForm";
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
        element: <BookForm />,
      },
      {
        path: "/edit/:id",
        element: <BookForm />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

export default router;
