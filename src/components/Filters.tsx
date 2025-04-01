import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useSearchParams } from "react-router-dom";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters =
    searchParams.size > 0 ? searchParams.toString()?.split("&") : [];

  const handleDelete = (value: string) => {
    const query: { [key: string]: string } = {};
    const updatedFilters = filters.filter((f) => f !== value);
    for (const filter of updatedFilters) {
      const [key, value] = filter.split("=");
      query[key] = value;
    }
    setSearchParams(query);
  };
  console.log(filters);
  if (!filters.length) {
    return null;
  }
  return (
    <Box
      sx={{
        mb: "1rem",
      }}
    >
      {filters.map((f) => (
        <Chip
          label={f.replace("=", " : ")}
          variant="filled"
          color="secondary"
          sx={{ margin: "0.2rem" }}
          onDelete={() => handleDelete(f)}
        />
      ))}
    </Box>
  );
};
