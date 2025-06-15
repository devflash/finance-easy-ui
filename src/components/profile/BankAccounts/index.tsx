import { Button, Box, Typography } from "@mui/material";
import { AddCircleTwoTone } from "@mui/icons-material";
import { Table, Column } from "../../common/table/Table";
import { IBankAccounts } from "../../../utils/types";
import { useGetBanks } from "../../../hooks/profile/useGetBanks";
import { useGlobalState } from "../../../hooks/useGlobalState";
import { BankForm } from "./BankForm";
const columns: Column<IBankAccounts>[] = [
  {
    id: "name",
    label: "Name",
    render: (bank) => <span>{bank.bankName}</span>,
  },
  {
    id: "accountNumber",
    label: "Account number",
    render: (bank) => <span>{bank.accountNumber}</span>,
  },
  {
    id: "branch",
    label: "Branch",
    render: (bank) => <span>{bank.branch}</span>,
  },
  {
    id: "type",
    label: "Account type",
    render: (bank) => <span>{bank.type}</span>,
  },
];

export const BankAccounts = () => {
  const { setOpenDialogKey } = useGlobalState();
  const { data } = useGetBanks();

  const handleAddBank = () => {
    setOpenDialogKey("BANK_ACCOUNT_DIALOG");
  };

  if (!data?.length) {
    return <p>No Banks</p>;
  }
  return (
    <Box bgcolor="#fff" padding="1rem" borderRadius="10px" marginBottom="1rem">
      <Typography component="h5" variant="h5">
        Bank Accounts
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddBank}>
        <AddCircleTwoTone sx={{ mr: "0.5rem" }} />
        Add
      </Button>
      <Table columns={columns} data={data} />
      <BankForm />
    </Box>
  );
};
