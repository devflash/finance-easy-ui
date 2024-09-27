import { Table, Column } from "./common/Table";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { IBudget } from "../utils/types";
import { useFetchBudgets } from "../hooks/useFetchBudgets";
import { Typography } from "@mui/material";

const columns: Column<IBudget>[] = [
  {
    id: "budgetName",
    label: "Budget Name",
    render: (budget) => <span>{budget.budgetDetails.budgetName}</span>,
  },
  {
    id: "dateRange",
    label: "Date Range",
    render: (budget) => {
      const startDate = new Date(budget.budgetDetails.startDate).toDateString();
      const endDate = new Date(budget.budgetDetails.endDate).toDateString();
      return <span>{`${startDate} - ${endDate}`}</span>;
    },
  },
  {
    id: "status",
    label: "Status",
    render: () => (
      <Typography
        component="span"
        sx={{
          color: "success.main",
        }}
      >
        On track
      </Typography>
    ),
  },
  {
    id: "budgetAmount",
    label: "Budget Amount",
    render: (budget) => (
      <span>{budget.budgetAllocation.availableBudgetAmount}</span>
    ),
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
  const { data } = useFetchBudgets();

  if (!data?.length) {
    return <p>No budgets available</p>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Table data={data} columns={columns} />
    </Box>
  );
};
