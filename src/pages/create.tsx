import Box from "@mui/material/Box";
import { CreateIncome } from "../components/createIncome";
import { CreateBudget } from "../components/createBudget/createBudget";
type CreatePageProps = {
  type: "income" | "expense" | "budget";
  action: "create" | "edit";
};
export const CreatePage = ({ action, type }: CreatePageProps) => {
  return (
    <Box>
      {type === "income" && <CreateIncome action={action} />}
      {type === "budget" && <CreateBudget />}
    </Box>
  );
};
