import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home.tsx";
import { IncomePage } from "../pages/income.tsx";
import { ExpensePage } from "../pages/expense.tsx";
import { CreatePage } from "../pages/create.tsx";
import { BudgetsPage } from "../pages/budgetsPage";
import { LoginPage } from "../pages/loginPage.tsx";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
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
        element: <BudgetsPage />,
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
