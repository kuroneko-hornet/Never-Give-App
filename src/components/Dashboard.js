import * as Api from "../service/api"
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import ExerciseLog from "./ExerciseLog";
import Form from "./Form";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import * as React from 'react';

export default function Dashboard () {
    const currentUser = React.useContext(AuthContext);
    const [isLogin, setIsLogin] = React.useState(false);

    React.useEffect(() => {
        setIsLogin(dig(currentUser, 'currentUser', 'uid') || false);
    }, [currentUser])

    // const exerciseLogComponent = exerciseLog(isLogin);
    // console.log(exerciseLogComponent)

    if ( isLogin ) {
        return (
            <Routes>
                <Route path="/form" element={
                    <Form uid={currentUser.currentUser.uid} isLogin={isLogin} /> }/>
                <Route path="/log"  element={
                    <ExerciseLog uid={currentUser.currentUser.uid}/> }/>
            </Routes>
                // <Form uid={currentUser.currentUser.uid} isLogin={isLogin} />
                // {exerciseLogComponent}
        )

    } else {
        return (

            <Box sx={{
                textAlign: "center"
            }}
            >
                <Button onClick={signInWithGoogle}>login</Button>
            </Box>
        )
    }
}
