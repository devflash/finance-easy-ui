import { Table, Column } from "./common/Table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "../services/incomeService";
import { IIncome } from "../utils/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: Column<IIncome>[] = [
  {
    id: "source",
    label: "Source",
    render: (income) => <span>{income.source}</span>,
  },
  {
    id: "category",
    label: "Category",
    render: (income) => <span>{income.category}</span>,
  },
  {
    id: "date",
    label: "Date",
    render: (income) => (
      <span>{new Date(income.incomeDate).toDateString()}</span>
    ),
  },
  {
    id: "amount",
    label: "Amount",
    render: (income) => <span>{income.amount}</span>,
  },
  {
    id: "depositType",
    label: "Deposit Type",
    render: (income) => <span>{income.depositType}</span>,
  },
  {
    id: "actions",
    label: "Actions",
    render: () => (
      <Box>
        <Button>
          <EditIcon />
        </Button>
        <Button>
          <DeleteIcon />
        </Button>
      </Box>
    ),
  },
];

export const Incomes = () => {
  const { data } = useQuery({ queryKey: ["incomes"], queryFn: getIncomes });

  if (!data) {
    return <p>No incomes</p>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Table data={data} columns={columns} />
    </Box>
  );
};
