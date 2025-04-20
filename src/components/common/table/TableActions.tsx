import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const TableActions = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Box>
      <Button onClick={onEdit}>
        <EditIcon />
      </Button>
      <Button onClick={onDelete}>
        <DeleteIcon />
      </Button>
    </Box>
  );
};
