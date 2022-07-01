import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import * as React from 'react';
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
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import Update from "./Update";
import BarChartIcon from '@mui/icons-material/BarChart';

const drawerWidth = 240;
const navItems = [
    ['form', <AddIcon/>, "Register"],
    ['log', <ListAltIcon/>, "Log"],
    ['chart', <BarChartIcon/>, "Chart"],
];

function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const currentUser = React.useContext(AuthContext);

    const menuRenderMobile = () => {
        let menuDom
        if ( dig(currentUser, 'currentUser', 'uid') ) {
            menuDom = <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {navItems.map((item) => (
                    <Link to={"/"+item[0]} key={item[0]} >
                        <Button style={{ color: "white"}}>
                                {item[1]}
                        </Button>
                    </Link>
                ))}
                <Button onClick={logOut} sx={{ color: "#fff" }}>
                    <LogoutIcon/>
                </Button>
            </Box>
        }
        return menuDom
    }

    const menuRender = () => {
        let menuDom
        if ( dig(currentUser, 'currentUser', 'uid') ) {
            menuDom = <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                    <Button key={item[0]} size="large">
                        <Link to={"/"+item[0]} style={{ color: "white", textDecoration: "none"}}>
                        {item[2]}
                        </Link>
                    </Button>
                ))}
                <Button onClick={logOut} size="large"
                    sx={{ color: "#fff", p: "auto"}}>Logout
                </Button>
            </Box>
        }
        return menuDom
    }

    const menuRenderBurger = () => {
        let menuDom
        if ( dig(currentUser, 'currentUser', 'uid') ) {
            menuDom = <List>
                {navItems.map((item) => (
                    <Link to={"/"+item[0]} style={{ color: "black", textDecoration: "none" }} key={item[0]}>
                    <ListItem disablePadding>
                        <ListItemButton style={{ textAlign: "center" }}>
                            <ListItemText primary={item[2]}/>
                        </ListItemButton>
                    </ListItem>
                    </Link>
                ))}
                <ListItem>
                    <ListItemButton onClick={logOut} sx={{ textAlign: 'center' }}>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
                <Update />
            </List>
        } else {
            menuDom = <Box>
                <Button variant='text' onClick={signInWithGoogle}
                sx={{ color: "#000" , m: 5}}>Login</Button>
                <Update />
                </Box>
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
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { xs: 'block', sm: 'none' }}}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
                        >
                        Never Give App
                    </Typography>
                    {menuRenderMobile()}
                    {menuRender()}
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

export default Header;
