// import React, { useContext } from "react";
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['Home', 'Log', 'Graph'];

function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const currentUser = React.useContext(AuthContext);

    const menuRender = () => {
        let menuDom
        if ( dig(currentUser, 'currentUser', 'uid') ) {
            menuDom = <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                    <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                    </Button>
                ))}
                <Button variant='text' onClick={logOut}
                    sx={{ color: "#fff" }}>Logout
                </Button>            
            </Box>
        } else {
            menuDom = <Button variant='text' onClick={signInWithGoogle}
                sx={{ color: "#fff"}}>Login</Button>
        }
        return menuDom
    }

    const menuRenderBurger = () => {
        let menuDom
        if ( dig(currentUser, 'currentUser', 'uid') ) {
            menuDom = <List>
                {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </ListItem>
                ))}
                <ListItem>
                    <ListItemButton onClick={logOut} sx={{ textAlign: 'center' }}>
                        <ListItemText primary="Logout" />
                    </ListItemButton>  
                </ListItem>
            </List>
        } else {
            menuDom = <Button variant='text' onClick={signInWithGoogle}
                sx={{ color: "#000" , m: 5}}>Login</Button>
        }
        return menuDom

    }

    // burger menu
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
            Never Give App
        </Typography>
        <Divider />
        {menuRenderBurger()}
        </Box>
    );


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                        Never Give App
                    </Typography>
                    {menuRender("#fff")}
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
