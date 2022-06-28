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
    const [weight, setWeight] = React.useState('');
    const [reps, setReps] = React.useState('');
    const [sets, setSets] = React.useState('');

    const handleExercise = (event) => {
        setExercise(event.target.value);
    };

    const handleWeight = (event) => {
        setWeight(event.target.value);
    };

    const handleSets = (event) => {
        setSets(event.target.value);
    };

    const handleReps = (event) => {
        setReps(event.target.value);
    };

    if ( dig(currentUser, 'currentUser', 'uid') ) {
        const exerciseForm = <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="grouped-native-select">Exercise</InputLabel>
            <Select native defaultValue="select exercise" id="exercise" label="exercise" onChange={handleExercise} >
            {exerciseDicts.map( (region) => (
                        <optgroup label={region.label} key={region.label}>
                            {region.exercise.map( (exercise) => (
                                <option value={ exercise.value } key={ exercise.value }>{exercise.label}</option>
                            ))}
                        </optgroup>
                    ))}
            </Select>
        </FormControl>

        const weightForm = <FormControl sx={{ m: 1, minWidth: 60 }}>
            <InputLabel htmlFor="grouped-native-select">kg</InputLabel>
            <Select native defaultValue="10" id="weight" label="weight" onChange={handleWeight} >
            {weightList.map( (w) => (
                <option value={ w } key={ w }>{w}</option>
                ))}
            </Select>
        </FormControl>

        const setForm = <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel htmlFor="grouped-native-select">Sets</InputLabel>
            <Select native defaultValue="3" id="sets" label="sets" onChange={handleSets} >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </Select>
        </FormControl>

        const repsForm = <FormControl sx={{ m: 1, minWidth: 60 }}>
            <TextField id="reps" label="Reps" type="reps" defaultValue="10" onChange={handleReps} sx={{ width: 100 }}/>
        </FormControl>

        const submitForm = ""

        return (
            <Box sx={{ textAlign: 'center' }}>
                {exerciseForm}
                {weightForm}
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