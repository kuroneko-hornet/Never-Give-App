import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api"
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 360,
        margin: 'auto',
    },
    ul: {
        paddingLeft: 0,
        listStyle: 'none',
    },
    li: {
        justifyContent: 'space-between',
    }
}));


const ToDoList = (props) => {

    const classes = useStyles();
    const deleteHandle = (id) => {
        Api.todoDelete(id);
        props.fetch();
    }
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const checkHandle = async (id) => {
        await Api.toggleComplete(id);
        props.fetch();
        
    }
    const todoList = props.todos.map((todo) => {
        return (
                // <li key={todo.id}>
                    
                //     <button type="button" onClick={() => deleteHandle(todo.id)}>
                //         delete
                //     </button>
                // </li>

                <ListItem key={todo.id} className={classes.list}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteHandle(todo.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                    <ListItemIcon>
                        <Checkbox {...label} checked={todo.isComplete} onChange={() => checkHandle(todo.id)}/>
                    </ListItemIcon>
                    <ListItemText primary={todo.content} />
                </ListItem>
        )
    });

    return (
        <div className={classes.root}>
            <h2>Your ToDo</h2>
            <ul className={classes.ul}>{todoList}</ul>
        </div>
    )
}

export default ToDoList