import { Table, Column } from "../common/table/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { ISaving } from "../../utils/types";
import { useSearchSavings } from "../../hooks/saving/useSearchSavings";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Filters } from "../Filters";
import { PAGE_LIMIT } from "../../utils/util";
import { TableActions } from "../common/table/TableActions";

const SavingTypeLabel = {
  fd: "Fixed deposit",
  mf: "Mutual fund",
};

const SavingActions = ({ savingId }: { savingId: string }) => {
  const navigate = useNavigate();
  return (
    <TableActions
      onEdit={() => navigate(`/saving/update/${savingId}`)}
      onDelete={() => {}}
    />
  );
};
const columns: Column<ISaving>[] = [
  {
    id: "date",
    label: "Date",
    render: (saving) => <span>{new Date(saving.date).toDateString()}</span>,
  },
  {
    id: "type",
    label: "Type",
    render: (saving) => (
      <span>
        {SavingTypeLabel[saving.investmentType as keyof typeof SavingTypeLabel]}
      </span>
    ),
  },
  {
    id: "amount",
    label: "Amount",
    render: (saving) => <span>{saving.amount}</span>,
  },
  {
    id: "actions",
    label: "Actions",
    render: (saving) => <SavingActions savingId={saving._id} />,
  },
];

export const Savings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useSearchSavings(searchParams);

  if (!data?.savings.length) {
    return <p>No Savings</p>;
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
      <Typography variant="overline" component="p">
        Saving Table
      </Typography>
      <Table data={data.savings} columns={columns} />
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
