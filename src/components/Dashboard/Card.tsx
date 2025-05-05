import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

type ICardProps = { title: string; amount: number };
export const Card = ({ title, amount }: ICardProps) => {
  return (
    <Box
      flex="1 1 auto"
      bgcolor={blue[100]}
      padding="1rem"
      borderRadius="0.4rem"
    >
      <Typography component="header" variant="h5">
        {title}
      </Typography>
      <Typography component="p" fontSize={20}>
        ${amount}
      </Typography>
    </Box>
  );
};
