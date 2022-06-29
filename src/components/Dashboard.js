import * as Api from "../service/api"
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import ExerciseLog from "./ExerciseLog";
import Form from "./Form";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

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
            <BrowserRouter><Routes>
                <Route path="/Form" element={
                    <Form uid={currentUser.currentUser.uid} isLogin={isLogin} /> }/>
                <Route path="/Log"  element={
                    <ExerciseLog uid={currentUser.currentUser.uid}/> }/>
            </Routes>
            <Link to="/">Back To Home</Link>
            </BrowserRouter>
                // <Form uid={currentUser.currentUser.uid} isLogin={isLogin} />
                // {exerciseLogComponent}
        )

    } else {
        return <button onClick={signInWithGoogle}>login</button>
    }
}
