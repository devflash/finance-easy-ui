import MaterialTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export type Column<T> = {
  id: string;
  label: string;
  render: (data: T) => JSX.Element;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

const RenderRow = <T,>({ row, columns }: { row: T; columns: Column<T>[] }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {columns.map((column, index) => {
        return (
          <TableCell key={`cell-${index}`} align="center">
            {column.render(row)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
      <MaterialTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "secondary.main" }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align="center">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((cur, index) => (
            <RenderRow key={`row-${index}`} row={cur} columns={columns} />
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};
