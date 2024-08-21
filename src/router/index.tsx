import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home.tsx";
import { IncomePage } from "../pages/income.tsx";
import { ExpensePage } from "../pages/expense.tsx";
import { CreatePage } from "../pages/create.tsx";
import { BudgetPage } from "../pages/budget.tsx";
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
      {
        path: "budgets",
        element: <BudgetPage />,
      },
      {
        path: "/income/create",
        element: <CreatePage type="income" action="create" />,
      },
      {
        path: "/budget/create",
        element: <CreatePage type="budget" action="create" />,
      },
    ],
  },
]);
