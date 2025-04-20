import Box from "@mui/material/Box";
import { Table, Column } from "../common/table/Table";
import { TableActions } from "../common/table/TableActions";
import { IExpense } from "../../utils/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchExpenses } from "../../hooks/expense/useSearchExpenses";
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
    render: (expense) => (
      <span>{new Date(expense.expenseDate).toDateString()}</span>
    ),
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
  const [searchParams] = useSearchParams();

  const { data } = useSearchExpenses(searchParams);
  if (!data?.length) {
    return <p>No expenses</p>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Table data={data} columns={columns} />
    </Box>
  );
};
