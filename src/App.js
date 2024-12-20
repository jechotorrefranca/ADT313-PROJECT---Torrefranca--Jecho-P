import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Public/Login/Login";
import Dashboard from "./pages/Main/Dashboard/Dashboard";
import Main from "./pages/Main/Main";
import Movie from "./pages/Main/Movie/Movie";
import Lists from "./pages/Main/Movie/Lists/Lists";
import Form from "./pages/Main/Movie/Form/Form";
import Home from "./client page/Main/Movie/Home/Home";
import View from "./client page/Main/Movie/View/View";
import MainClient from "./client page/Main/MainClient";
import AnimeContextProvider from "./context/AnimeContext";
import Register from "./pages/Public/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainClient />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/view/:animeId?",
        element: <View />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/main",
    element: <Main />,
    children: [
      {
        path: "/main/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/main/movies",
        element: <Movie />,
        children: [
          {
            path: "/main/movies",
            element: <Lists />,
          },
          {
            path: "/main/movies/form/:animeId?",
            element: <Form />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <AnimeContextProvider>
        <RouterProvider router={router} />
      </AnimeContextProvider>
    </div>
  );
}

export default App;
