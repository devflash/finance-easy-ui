import Box from "@mui/material/Box";
import { CreateOrUpdateIncome } from "../components/createOrUpdateIncome";
import { CreateBudget } from "../components/createBudget/createBudget";
import { CreateOrUpdateExpense } from "../components/expense/createOrUpdateExpense";
import { CreateOrUpdateSaving } from "../components/saving/createOrUpdateSaving";

type CreatePageProps = {
  type: "income" | "expense" | "budget" | "saving";
  action: "CREATE" | "UPDATE";
};
export const CreatePage = ({ action, type }: CreatePageProps) => {
  return (
    <Box>
      {type === "income" && <CreateOrUpdateIncome action={action} />}
      {type === "budget" && <CreateBudget />}
      {type === "expense" && <CreateOrUpdateExpense action={action} />}
      {type === "saving" && <CreateOrUpdateSaving action={action} />}
    </Box>
  );
};
