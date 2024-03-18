import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/books" passHref>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            社内書籍管理アプリ
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Link href="/books/add" passHref>
          <Button color="inherit">本を追加</Button>
        </Link>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/user/profile" passHref>
            <Avatar alt="User" sx={{ cursor: "pointer" }} />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
