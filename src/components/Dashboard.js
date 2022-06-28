// import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api"
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import LogList from "./LogList";
// import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AppRegistration } from "@mui/icons-material";

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment';

const exerciseDicts = [
    {
      value: 'chest',
      label: 'Chest',
      exercise: [
          {
              value: 'chestPress',
              label: 'Chest Press',
          },
          {
              value: 'dumbbellFlies',
              label: 'Dummbell Flies',
          }
      ]
    },
    {
      value: 'shoulders',
      label: 'Shoulders',
      exercise: [
          {
              value: 'shoulderPress',
              label: 'Shoulder Press',
          },
          {
              value: 'sideRaise',
              label: 'Side Raise',
          },
      ]
    },
    {
      value: 'legs',
      label: 'Legs',
      exercise: [
          {
              value: 'leg',
              label: 'leg',
          }
      ]
    },
];

const weightList = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

export default function SelectBodyRegionFields() {
    const currentUser = React.useContext(AuthContext);
    const [selectedExercise, setExercise] = React.useState('');
    const [reps, setReps] = React.useState(<MenuItem>None</MenuItem>);
    
    const handleExercise = (event) => {
        setExercise(event.target.value);
    };

    if ( dig(currentUser, 'currentUser', 'uid') ) {
        const exerciseForm = <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="grouped-native-select">Exercise</InputLabel>
            <Select native defaultValue="select exercise" id="exercise" label="exercise">
            {/* onChange={handleExercise} */}
            {exerciseDicts.map( (region) => (
                        <optgroup label={region.label} key={region.label}>
                            {region.exercise.map( (exercise) => (
                                <option value={ exercise.value } key={ exercise.value }>{exercise.label}</option>
                            ))}
                        </optgroup>
                    ))}
            </Select>
        </FormControl>

        const setForm = <FormControl sx={{ m: 1, minWidth: 60 }}>
            <InputLabel htmlFor="grouped-native-select">kg</InputLabel>
            <Select native defaultValue="10" id="weight" label="weight">
            {/* onChange={handleExercise} */}
            {weightList.map( (w) => (
                <option value={ w } key={ w }>{w}</option>
                ))}
            </Select>
        </FormControl>

        const repsForm = <FormControl sx={{ m: 1, minWidth: 60 }}>
            <TextField id="reps" label="Reps" type="reps" defaultValue="10"
            sx={{ width: 100 }}/>
        </FormControl>

        const submitForm = ""

        return (
            <Box sx={{ textAlign: 'center' }}>
                {exerciseForm}
                {setForm}
                {repsForm}
                {submitForm}
            </Box>
        )

    } else {
        return <button onClick={signInWithGoogle}>login</button>
    }
}







// const Dashboard = () => {

    // const fetch = async () => {
    //     if ( dig(currentUser, 'currentUser', 'uid')) {
    //         const data = await Api.initGet(currentUser.currentUser.uid);
    //         await setTodos(data);
    //     }
    // }

    // React.useEffect(() => {
    //     fetch();
    // }, [currentUser])


//     const post = async () => {
//         await Api.addTodo(inputName, currentUser.currentUser.uid);
//         await setInputName("");
//         fetch();
//     }
//     return (
//         <div>
//             <LogList todos={todos} fetch={fetch}/>
//         </div>
//     )
// }