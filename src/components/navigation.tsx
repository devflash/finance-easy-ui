import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import OutboxIcon from "@mui/icons-material/Outbox";
import { styled, CSSObject } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const SideBar = styled(Box)(({ theme }) => ({
  width: "240px",
  backgroundColor: theme.palette.primary.main,
  paddingTop: "1rem",
  [theme.breakpoints.only("xs")]: {
    width: "48px",
  },
}));

const CustomLink = styled(Link)<{ isSelected?: boolean }>(
  ({ theme, isSelected }) => ({
    ...(isSelected && {
      backgroundColor: "#fff",
      ".MuiListItemText-root, .MuiSvgIcon-root": {
        color: theme.palette.primary.dark,
      },
    }),
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
    },
    "&:hover .MuiListItemText-root, &:hover .MuiSvgIcon-root": {
      color: theme.palette.primary.dark,
    },
  })
);

const links = [
  {
    key: "incomes",
    name: "Incomes",
    path: "/incomes",
    icon: (styles: CSSObject) => <MoveToInboxIcon sx={styles} />,
  },
  {
    key: "expenses",
    name: "Expenses",
    path: "/expenses",
    icon: (styles: CSSObject) => <OutboxIcon sx={styles} />,
  },
];

export const Navigation = () => {
  const { pathname } = useLocation();
  return (
    <SideBar>
      <Typography
        variant="h5"
        component="h1"
        fontWeight="bold"
        color="primary.contrastText"
        paddingLeft="1rem"
        paddingRight="1rem"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        Finance Easy
      </Typography>
      <Box sx={{ marginTop: "2rem" }}>
        <nav>
          <List>
            {links.map((link) => (
              <CustomLink
                key={link.key}
                to={link.path}
                isSelected={pathname === link.path}
              >
                <ListItem
                  sx={{
                    paddingLeft: "10px",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    {link.icon({ color: "primary.contrastText" })}
                  </ListItemIcon>
                  <ListItemText sx={{ display: { xs: "none", sm: "block" } }}>
                    {link.name}
                  </ListItemText>
                </ListItem>
              </CustomLink>
            ))}
          </List>
        </nav>
      </Box>
    </SideBar>
  );
};
