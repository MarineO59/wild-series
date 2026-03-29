import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import App from "./App";
import ProgramDetails from "./pages/ProgramDetails";
import ProgramEdit from "./pages/ProgramEdit";
import ProgramNew from "./pages/ProgramNew";
import Programs from "./pages/Programs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/programs",
    element: <Programs />,
  },
  {
    path: "/programs/new",
    element: <ProgramNew />,
  },
  {
    path: "/programs/:id",
    element: <ProgramDetails />,
  },
  {
    path: "/programs/:id/edit",
    element: <ProgramEdit />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
