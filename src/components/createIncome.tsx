import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Input } from "./common/input";
import { Select } from "./common/select";
import { FormActions } from "./common/formActions";
type CreateIncomeProps = {
  action: "create" | "edit";
};

export const CreateIncome = ({ action }: CreateIncomeProps) => {
  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        Add new Income
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#A29E9E" }}>
        Please provide the details about the income
      </Typography>
      <Box>
        <Input
          id="income-source"
          label="Income source"
          subLabelText="Please enter the source name from where the income is received"
        />
        <Input
          id="income-amount"
          label="Amount"
          subLabelText="Please enter the received amout"
          type="number"
        />
        <Select
          label="Deposite Type"
          subLabelText="Please select the type of deposite"
          options={[{ label: "Cash", value: "cash" }]}
        />
        <Select
          label="Category"
          subLabelText="Please select the catehory of the income"
          options={[{ label: "Salary", value: "salary" }]}
        />
        <Input
          label="Notes"
          subLabelText="Please enter the short description about the income"
          multiline
          rows={4}
          maxRows={4}
        />
        <Input
          label="Income Date"
          subLabelText="Please select the date when the income is received"
          type="date"
        />
      </Box>
      <FormActions />
    </Paper>
  );
};
