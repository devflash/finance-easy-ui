import Box from "@mui/material/Box";
import { CreateOrUpdateIncome } from "../components/createOrUpdateIncome";
import { CreateBudget } from "../components/createBudget/createBudget";

type CreatePageProps = {
  type: "income" | "expense" | "budget";
  action: "CREATE" | "UPDATE";
};
export const CreatePage = ({ action, type }: CreatePageProps) => {
  return (
    <Box>
      {type === "income" && <CreateOrUpdateIncome action={action} />}
      {type === "budget" && <CreateBudget />}
    </Box>
  );
};
