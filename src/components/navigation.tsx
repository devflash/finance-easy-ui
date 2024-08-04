import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/incomes">Incomes</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
      </ul>
    </nav>
  );
};
