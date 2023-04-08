import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
import LoadingSpinner from "./components/LoadingSpinner";
import Errorpage from "./components/Errorpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "books",
        element: <Books></Books>,
        loader: () => fetch("https://api.itbook.store/1.0/new"),
      },
      {
        path: "book/:id",
        element: <BookDetails></BookDetails>,
        loader: ({ params }) =>
          fetch(`https://api.itbook.store/1.0/books/${params.id}`),
      },

      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/about",
    element: <p>About page</p>,
  },
  {
    path: "loader",
    element: <LoadingSpinner></LoadingSpinner>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
