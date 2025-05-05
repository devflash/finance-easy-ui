import { Table, Column } from "../common/table/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { IIncome } from "../../utils/types";
import { useSearchIncomes } from "../../hooks/income/useSearchIncomes";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Filters } from "../Filters";
import { PAGE_LIMIT } from "../../utils/util";
import { TableActions } from "../common/table/TableActions";

const IncomeActions = ({ incomeId }: { incomeId: string }) => {
  const navigate = useNavigate();
  return (
    <TableActions
      onEdit={() => navigate(`/income/update/${incomeId}`)}
      onDelete={() => {}}
    />
  );
};
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
    render: (income) => <IncomeActions incomeId={income._id} />,
  },
];

export const Incomes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useSearchIncomes(searchParams);

  if (!data?.length) {
    return <p>No incomes</p>;
  }

  const totalPages = data.length / PAGE_LIMIT;
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
      <Typography variant="overline" component="p">
        Income Table
      </Typography>
      <Table data={data} columns={columns} />
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
