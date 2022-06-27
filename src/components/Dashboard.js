import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api"
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import ToDoList from "./ToDoList";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    root: {
        textAlign: "center",
        marginTop: 40,
    },
    form: {
        width: "100%",
        maxWidth: 360,
        margin: "auto",
        marginBottom: 40,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
    },
    input: {
        marginRight: 10
    }
}));



const Dashboard = () => {
    const classes = useStyles();
    const currentUser = useContext(AuthContext);
    const [inputName, setInputName] = useState("");
    const [todos, setTodos] = useState([]);
    // console.log(inputName);
    // console.log(todos);

    useEffect(() => {
        fetch();
    }, [currentUser])

    const fetch = async () => {
        if ( dig(currentUser, 'currentUser', 'uid')) {
            const data = await Api.initGet(currentUser.currentUser.uid);
            await setTodos(data);
        }
    }

    const formRender = () => {
        let dom
        if ( dig(currentUser, 'currentUser', 'uid') ) {
            dom = <form className={classes.form}>
                <TextField placeholder="ToDoName" className={classes.input} value={inputName} onChange={(event) => setInputName(event.currentTarget.value)}/>
                <Button variant="contained" color="primary" size="small"
                disabled={inputName.length > 0 ? false : true} type="button" onClick={() => post()}>追加</Button>
            </form>            
        } else {
            dom = <button onClick={signInWithGoogle}>ログイン</button>
        }
        return dom
    }

    const post = async () => {
        await Api.addTodo(inputName, currentUser.currentUser.uid);
        await setInputName("");
        fetch();
    }
    return (
        <div className={classes.root}>
            {formRender()}
            <ToDoList todos={todos} fetch={fetch}/>
        </div>
    )
}
export default Dashboard;