import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home.tsx";
import { IncomePage } from "../pages/income.tsx";
import { ExpensePage } from "../pages/expense.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "incomes",
        element: <IncomePage />,
      },
      {
        path: "expenses",
        element: <ExpensePage />,
      },
    ],
  },
]);
