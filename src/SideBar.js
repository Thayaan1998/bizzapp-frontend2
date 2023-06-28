import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";

import logo from './logo.jpeg'; // Tell webpack this JS file uses this image
import { Margin } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';


const drawerWidth = 240;

function SideBar(props) {
    const { window1, heading } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
      if(window.confirm("Do you want to logout")){
        navigate('/')
      }
    };


    const drawer = (
        <div style={{ backgroundColor: "rgba(32,56,100,255)", height: "100%", color: "white" }}>
            <Toolbar sx={{
                //   width: 240,
                //   height: 500,
                color: "rgba(225,249,27,1)",
                backgroundColor: "rgba(32,56,100,255)"

            }} disableGutters>
                <img style={{ margin: "20px" }} src={logo} alt="Logo" />

            </Toolbar>
            <Divider />


            <List          >
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/masterConfigaration')}>
                        <ListItemText primary="Master Configaration" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/customers')}>
                        <ListItemText primary="Customers" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/sales')}>
                        <ListItemText primary="Sales" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/billWiseRecipt')}>
                        <ListItemText primary="Bill Wise Receipt" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/cheque')}>
                        <ListItemText primary="Cheque Return" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/salesSummary')}>
                        <ListItemText primary="Sales Summary" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/receiptSummary')}>
                        <ListItemText primary="Receipt Summary" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/outStandingSummary')}>
                        <ListItemText primary="OutStanding Summary" />
                    </ListItemButton>
                </ListItem>


            </List>


        </div>
    );

    const container = window1 !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                {/* <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                     
                    </Typography>
                </Toolbar> */}
                 <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {heading}
                </Typography>
                <div align="right">
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={logOut}>LogOut</MenuItem>
                        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    </Menu>
                </div>
                </Toolbar>
            </AppBar>
            
          
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
                bgcolor="primary"
            >

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block', background: "primary" },
                        background: "primary",
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >

            </Box>
        </Box>
    );
}

SideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window1: PropTypes.func,
};

export default SideBar;