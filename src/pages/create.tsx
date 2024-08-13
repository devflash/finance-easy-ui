import Box from "@mui/material/Box";
import { CreateIncome } from "../components/createIncome";

type CreatePageProps = {
  type: "income" | "expense";
  action: "create" | "edit";
};
export const CreatePage = ({ action, type }: CreatePageProps) => {
  return <Box>{type === "income" && <CreateIncome action={action} />}</Box>;
};
