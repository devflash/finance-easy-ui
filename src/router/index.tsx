import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home.tsx";
import { IncomePage } from "../pages/income.tsx";
import { ExpensePage } from "../pages/expense.tsx";
import { CreatePage } from "../pages/create.tsx";
import { BudgetsPage } from "../pages/budgetsPage";
import { LoginPage } from "../pages/loginPage.tsx";
import { SignupPage } from "../pages/signupPage.tsx";
import { DashboardPage } from "../pages/dashboadPage.tsx";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
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
        element: <CreatePage type="income" action="CREATE" />,
      },
      {
        path: "/budget/create",
        element: <CreatePage type="budget" action="CREATE" />,
      },
      {
        path: "/income/update/:incomeId",
        element: <CreatePage type="income" action="UPDATE" />,
      },
      {
        path: "/expense/create",
        element: <CreatePage type="expense" action="CREATE" />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);
