import Box from "@mui/material/Box";
import { Table, Column } from "../common/table/Table";
import { TableActions } from "../common/table/TableActions";
import { IExpense } from "../../utils/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchExpenses } from "../../hooks/expense/useSearchExpenses";
import { Filters } from "../Filters";
import Pagination from "@mui/material/Pagination";
import { PAGE_LIMIT } from "../../utils/util";

const ExpenseActions = ({ incomeId }: { incomeId: string }) => {
  const navigate = useNavigate();
  return (
    <TableActions
      onDelete={() => {}}
      onEdit={() => navigate(`/income/update/${incomeId}`)}
    />
  );
};

const columns: Column<IExpense>[] = [
  {
    id: "paidTo",
    label: "Paid to",
    render: (expense) => <span>{expense.moneyPaidTo}</span>,
  },
  {
    id: "category",
    label: "Category",
    render: (expense) => <span>{expense.category}</span>,
  },
  {
    id: "date",
    label: "Date",
    render: (expense) => <span>{new Date(expense.date).toDateString()}</span>,
  },
  {
    id: "amount",
    label: "Amount",
    render: (expense) => <span>{expense.amount}</span>,
  },
  {
    id: "actions",
    label: "Actions",
    render: (expense) => <ExpenseActions incomeId={expense._id} />,
  },
];

export const Expenses = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useSearchExpenses(searchParams);
  if (!data?.expenses.length) {
    return <p>No expenses</p>;
  }
  const totalPages = data.count / PAGE_LIMIT;
  const currentPage = searchParams.has("page")
    ? Number(searchParams.get("page"))
    : 1;

  const handlePagination = (_: unknown, page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Filters />

      <Table data={data.expenses} columns={columns} />
      {totalPages > 1 && (
        <Pagination
          sx={{ mt: "1rem" }}
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={handlePagination}
        />
      )}
    </Box>
  );
};
