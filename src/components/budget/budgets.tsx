import { Table, Column } from "../common/table/Table";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { IBudget } from "../../utils/types";
import { useSearchBudgets } from "../../hooks/budget/useSearchBudgets";
import { useSearchParams } from "react-router-dom";

const columns: Column<IBudget>[] = [
  {
    id: "startDate",
    label: "Start Date",
    render: (budget) => (
      <span>{new Date(budget.startDate).toDateString()}</span>
    ),
  },
  {
    id: "endDate",
    label: "End Date",
    render: (budget) => <span>{new Date(budget.endDate).toDateString()}</span>,
  },
  {
    id: "budget",
    label: "Budget",
    render: (budget) => <span>{budget.totalBudget}</span>,
  },
  {
    id: "actual",
    label: "Actual",
    render: (budget) => <span>{budget.totalActual}</span>,
  },
  {
    id: "remaining",
    label: "Remaining",
    render: (budget) => <span>{budget.totalBudget - budget.totalActual}</span>,
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

export const Budgets = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useSearchBudgets(searchParams);

  if (!data?.budgets.length) {
    return <p>No budgets available</p>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Table data={data.budgets} columns={columns} />
    </Box>
  );
};
