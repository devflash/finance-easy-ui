import { Box, Typography } from "@mui/material";
import { Table, Column } from "../../common/table/Table";

type IBankAccounts = {
  bankName: string;
  accountNumber: string;
  branch: string;
  ifscCode: string;
};

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
    id: "ifsc",
    label: "IFSC code",
    render: (bank) => <span>{bank.ifscCode}</span>,
  },
];

const data: IBankAccounts[] = [
  {
    bankName: "IDBI Bank",
    accountNumber: "IDBI0000176651",
    ifscCode: "IDBI1111",
    branch: "Dombivli",
  },
  {
    bankName: "IDBI Bank",
    accountNumber: "IDBI0000176651",
    ifscCode: "IDBI1111",
    branch: "Dombivli",
  },
  {
    bankName: "IDBI Bank",
    accountNumber: "IDBI0000176651",
    ifscCode: "IDBI1111",
    branch: "Dombivli",
  },
];
export const BankAccounts = () => {
  return (
    <Box bgcolor="#fff" padding="1rem" borderRadius="10px">
      <Typography component="h5" variant="h5">
        Bank Accounts
      </Typography>
      <Table columns={columns} data={data} />
    </Box>
  );
};
