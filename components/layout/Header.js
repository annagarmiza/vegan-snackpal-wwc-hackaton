import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import { PassageUser } from "@passageidentity/passage-elements/passage-user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Router from "next/router";
import { useRouter } from "next/router";

import styles from "@/styles/Header.module.css";

import { useTheme } from "@mui/material/styles";

const pages = [
  { title: "Swap🔁Rules", path: "/swaprules" }, // Add paths for your pages
  { title: "Q&A", path: "/q&a" }, // Add paths for your pages
  { title: "About", path: "/about" }, // Add paths for your pages
];
const settings = ["Account", "Logout"];

const Header = ({ hideHeaderElements }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [backgroundColor, setBackgroundColor] = React.useState("primary");

  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === "/") {
        setBackgroundColor("black");
      } else {
        setBackgroundColor("primary");
      }
    };

    // Listen for route changes and update the header color
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const theme = useTheme();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();

    if (setting === "Logout") {
      //TODO: clear the jwt session token
      new PassageUser().signOut();
      Router.push("/");
    }

    if (setting === "Account") {
      Router.push("/account");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: backgroundColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className={styles.imageContainer_md}>
            <Link href="/dashboard">
              <Image src="/logo.png" alt="Logo" width="50" height="50" />
            </Link>
          </div>
          <Typography
            href="/dashboard"
            linkcomponent={Link}
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <span style={{ color: theme.palette.secondary.light }}>Vegan</span>
            📦SnackPal🌏
          </Typography>
          {!hideHeaderElements && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    key={page.title}
                    href={page.path}
                    className={styles.link_menu}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          )}
          <div className={styles.imageContainer_xs}>
            <Link href="/dashboard">
              <Image src="/logo.png" alt="Logo" width="50" height="50" />
            </Link>
          </div>
          <Typography
            href="/dashboard"
            linkcomponent={Link}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <span style={{ color: theme.palette.secondary.light }}>Vegan</span>
            📦SnackPal🌏
          </Typography>
          {!hideHeaderElements && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link key={page.title} href={page.path} className={styles.link}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>
          )}
          {!hideHeaderElements && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <AccountCircleIcon sx={{ color: "#ffffff" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleSettingClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
