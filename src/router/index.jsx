import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import BookForm from "../pages/BookForm";
import BookDetails from "../pages/BookDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function index() {
  let { authReady, user } = useContext(AuthContext);
  let isAuth = !!user;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: isAuth ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/create",
          element: isAuth ? <BookForm /> : <Navigate to="/login" />,
        },
        {
          path: "/edit/:id",
          element: isAuth ? <BookForm /> : <Navigate to="/login" />,
        },
        {
          path: "/books/:id",
          element: isAuth ? <BookDetails /> : <Navigate to="/login" />,
        },
        {
          path: "/register",
          element: !isAuth ? <Register /> : <Navigate to="/" />,
        },
        {
          path: "/login",
          element: !isAuth ? <Login /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return authReady && <RouterProvider router={router} />;
}
