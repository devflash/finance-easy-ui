import { Box, Typography, Button } from "@mui/material";
import { AddCircleTwoTone } from "@mui/icons-material";
import { Table, Column } from "../../common/table/Table";
import { useGlobalState } from "../../../hooks/useGlobalState";
import { CardForm } from "./CardForm";
import { ICard } from "../../../utils/types";
import { useGetcards } from "../../../hooks/profile/useGetCards";
const columns: Column<ICard>[] = [
  {
    id: "cardNumber",
    label: "Card number",
    render: (card) => <span>{card.cardNumber}</span>,
  },
  {
    id: "expiryDate",
    label: "Expity Date",
    render: (card) => <span>{card.expirationDate}</span>,
  },
  {
    id: "type",
    label: "Type",
    render: (card) => <span>{card.type}</span>,
  },
  {
    id: "name",
    label: "Name on the card",
    render: (card) => <span>{card.name}</span>,
  },
];

export const CreditCards = () => {
  const { data } = useGetcards();
  const { setOpenDialog } = useGlobalState();
  const handleAddCard = () => {
    setOpenDialog(true);
  };
  // ToDo: Improve this to show in table
  if (!data?.length) {
    return <p>No cards</p>;
  }

  return (
    <Box bgcolor="#fff" padding="1rem" borderRadius="10px">
      <Typography component="h5" variant="h5">
        Credit Cards
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddCard}>
        <AddCircleTwoTone sx={{ mr: "0.5rem" }} />
        Add
      </Button>
      <Table columns={columns} data={data} />
      <CardForm />
    </Box>
  );
};
