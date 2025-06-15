import { Box } from "@mui/material";
import { PersonalInfo } from "./PersonalInfo";
import { BankAccounts } from "./BankAccounts";
import { CreditCards } from "./cards";
export const Profile = () => {
  return (
    <Box>
      <PersonalInfo />
      <BankAccounts />
      <CreditCards />
    </Box>
  );
};
