import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CustomInput } from "../common/inputNew";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { CategoryDialogForm } from "./categoryDialogForm";
import { useGlobalState } from "../../hooks/useGlobalState";

export type BudgetItem = {
  category: string;
  budget: number;
  type: "NEED" | "WANT" | "SAVING";
};

const initialData: BudgetItem[] = [];

export const CreateBudget = () => {
  const [categories, setCategories] = useState<BudgetItem[]>(initialData);
  const [editable, setEditable] = useState<string>("");
  const { setOpenDialogKey } = useGlobalState();

  const addCategory = (allocation: BudgetItem) => {
    setCategories([...categories, allocation]);
  };

  const updateCategory = (allocation: BudgetItem) => {
    setCategories((prev) =>
      prev.map((item) => {
        if (editable === item.category) {
          return allocation;
        }
        return item;
      })
    );
    setEditable("");
  };

  const handleDelete = (category: string) => {
    setCategories((prev) => prev.filter((c) => c.category !== category));
  };

  const handleEdit = (category: string) => {
    setEditable(category);
    setOpenDialogKey("CATEGORY_FORM");
  };

  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography>Create Budget</Typography>
      <Box>
        <Box
          maxWidth="450px"
          width="80%"
          margin="0 auto"
          display="flex"
          gap="0.8rem"
        >
          <CustomInput label="Start Date" type="date" />
          <CustomInput label="End Date" type="date" />
        </Box>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Allocate Budget</Typography>
            <Button
              variant="outlined"
              onClick={() => setOpenDialogKey("CATEGORY_FORM")}
            >
              Add
            </Button>
          </Box>

          <Box
            display="flex"
            width="90%"
            justifyContent="center"
            border="1px solid lightgray"
            borderRadius="10px"
            padding="1rem"
            margin="1rem auto"
            gap="1rem"
            flexWrap="wrap"
          >
            {categories.length === 0 && (
              <Typography>
                No Categories are selected for the budget allocation
              </Typography>
            )}
            {categories.map(({ category, budget, type }) => (
              <Box
                key={category}
                boxShadow="rgba(0,0,0,0.2) 0px 1px 4px"
                bgcolor="#f3908e"
                padding="1rem"
                borderRadius="10px"
                flex="1 1 25%"
                display="flex"
                gap="1rem"
                maxWidth="500px"
              >
                <Box
                  height="50px"
                  width="50px"
                  border="2px solid grey"
                  borderRadius="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  alignSelf="center"
                >
                  <HomeOutlinedIcon />
                </Box>
                <Box flexGrow="1">
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography component="p">{category}</Typography>
                      <Typography component="p">{budget}</Typography>
                    </Box>
                    <Chip label={type} color="primary" variant="filled" />
                  </Box>
                  <Box display="flex" gap="0.5rem" justifyContent="flex-end">
                    <Button
                      sx={{ minWidth: "auto", padding: 0 }}
                      onClick={() => handleEdit(category)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      sx={{ minWidth: "auto", padding: 0 }}
                      onClick={() => handleDelete(category)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Button
          sx={{ margin: "0 auto" }}
          variant="contained"
          disabled={categories.length === 0}
          fullWidth
        >
          Create
        </Button>
      </Box>
      <CategoryDialogForm
        editable={editable}
        selectedCategories={categories}
        addCategory={addCategory}
        updateCategory={updateCategory}
      />
    </Paper>
  );
};
