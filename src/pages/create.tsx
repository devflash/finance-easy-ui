import Box from "@mui/material/Box";
import { CreateOrUpdateIncome } from "../components/createOrUpdateIncome";
import { CreateBudget } from "../components/createBudget/createBudget";
import { CreateOrUpdateExpense } from "../components/expense/createOrUpdateExpense";

type CreatePageProps = {
  type: "income" | "expense" | "budget";
  action: "CREATE" | "UPDATE";
};
export const CreatePage = ({ action, type }: CreatePageProps) => {
  return (
    <Box>
      {type === "income" && <CreateOrUpdateIncome action={action} />}
      {type === "budget" && <CreateBudget />}
      {type === "expense" && <CreateOrUpdateExpense action={action} />}
    </Box>
  );
};
