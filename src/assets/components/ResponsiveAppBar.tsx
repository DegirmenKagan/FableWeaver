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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./Logo/Logo";
import ThemeModeSwitch from "./ThemeModeSwitch";
import CustomLink from "./CustomLink";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../contexts/ProfileContext";
import { useContext, useEffect, useState } from "react";
import AuthDialog from "./AuthDialog";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);

  const pages = ["Home", "Library"];
  const settings = ["Home", "Profile", "Settings", "Logout"];
  const settingsGuest = ["Home", "Login", "Register"];
  const [settingList, setSettingList] = useState(settings);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthLogin, setIsAuthLogin] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (selectionStr?: string) => {
    console.log(selectionStr);
    if (!selectionStr) {
      setAnchorElUser(null);
      return;
    } else {
      if (selectionStr === "Profile") {
        navigate(`${selectionStr.toLowerCase()}/${profile.id}`);
      } else if (selectionStr === "Home") {
        navigate("/");
      } else if (
        selectionStr === "Login" ||
        selectionStr === "Logout" ||
        selectionStr == "Register"
      ) {
        setIsAuthLogin(selectionStr === "Login");
        console.log("selectionlogin", selectionStr === "Login");
        setAuthModalOpen(true);
      } else {
        navigate(`${selectionStr.toLowerCase()}`);
      }
      setAnchorElUser(null);
    }
  };
  const handlePageItemClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event);
  };

  useEffect(() => {
    if (profile.id === 0) {
      setSettingList(settingsGuest);
    } else {
      setSettingList(settings);
    }
  }, [profile]);

  return (
    <AppBar position="static" color={"primary"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Logo />
          </Box>

          <Typography
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
            <CustomLink to={""} text="Fable Weaver" />
          </Typography>

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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handlePageItemClick}>
                  <Typography sx={{ textAlign: "center" }}>
                    <CustomLink to={page} />
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Logo />
          </Box>

          <Typography
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
            <CustomLink to={""} text="Fable Weaver" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <CustomLink
                style={{ display: "block", marginInline: 10, color: "white" }}
                key={page}
                to={page}
              />
              // </Button>
            ))}
          </Box>
          <Box>
            <ThemeModeSwitch />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={profile.name}
                  src={profile.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
            {/* <Menu
              sx={{ mt: "45px", position: "absolute", zIndex: 1 }}
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
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu> */}

            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
              open={Boolean(anchorElUser)}
              onClose={() => {
                handleCloseUserMenu();
              }}
              onClick={() => {
                handleCloseUserMenu();
              }}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {settingList.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ backgroundColor: "red" }}>
            <AuthDialog
              open={authModalOpen}
              isLogin={isAuthLogin}
              setOpen={setAuthModalOpen}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
