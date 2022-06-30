import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFF",
        backgroundColor: "#1976d2",
        position: "fixed",
        bottom: 0,
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>copyright kuroneko.</Box>
    )
};

export default Footer;