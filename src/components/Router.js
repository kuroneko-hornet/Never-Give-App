import dig from "object-dig";
import { signInWithGoogle } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import ExerciseLog from "./ExerciseLog";
import Form from "./Form";
import { Route, Routes } from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import * as React from 'react';

export default function Router () {
    const currentUser = React.useContext(AuthContext);
    const [isLogin, setIsLogin] = React.useState(false);

    React.useEffect(() => {
        setIsLogin(dig(currentUser, 'currentUser', 'uid') || false);
    }, [currentUser])

    if ( isLogin ) {
        return (
            <Routes>
                <Route path="/form" element={
                    <Form uid={currentUser.currentUser.uid} isLogin={isLogin} /> }/>
                <Route path="/log"  element={
                    <ExerciseLog uid={currentUser.currentUser.uid}/> }/>
            </Routes>
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
