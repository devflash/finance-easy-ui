import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

type ICardProps = { title: string; amount: number };

const CustomCard = styled(Box)(({ theme }) => ({
  flex: "1 1 auto",
  backgroundColor: blue[100],
  padding: "1rem",
  borderRadius: "0.4rem",
  [theme.breakpoints.down(990)]: {
    flex: "1 1 48%",
  },
  [theme.breakpoints.down("sm")]: {
    flex: "1 1 100%",
  },
}));

export const Card = ({ title, amount }: ICardProps) => {
  return (
    <CustomCard>
      <Typography component="header" variant="h5">
        {title}
      </Typography>
      <Typography component="p" fontSize={20}>
        ${amount}
      </Typography>
    </CustomCard>
  );
};
