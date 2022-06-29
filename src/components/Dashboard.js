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
import ButtonGroup from '@mui/material/ButtonGroup';
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

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
const defaultValues = {
    region: "chest",
    exercise: "chestPress",
    weight: 10,
    sets: 3,
    reps: 10
}

export default function SelectBodyRegionFields() {
    const currentUser = React.useContext(AuthContext);
    const [isLogin, setIsLogin] = React.useState(false);

    React.useEffect(() => {
        setIsLogin(dig(currentUser, 'currentUser', 'uid') || false);
    }, [currentUser])

    const [region, setRegion] = React.useState(defaultValues.region);
    const [exercise, setExercise] = React.useState(defaultValues.exercise);
    const [weight, setWeight] = React.useState(defaultValues.weight);
    const [reps, setReps] = React.useState(defaultValues.reps);
    const [sets, setSets] = React.useState(defaultValues.sets);
    const [loading, setLoading] = React.useState(false);

    const handleExercise = (event) => {
        const [exercise, region] = event.target.value.split("/")
        setRegion(region);
        setExercise(exercise);
    };

    const exerciseForm =
        <FormControl sx={{ m: 1}}>
            <InputLabel htmlFor="grouped-native-select">Exercise</InputLabel>
            <Select native id="exercise" label="exercise" onChange={handleExercise} >
            {exerciseDicts.map( (region) => (
                        <optgroup label={region.label} key={region.label}>
                            {region.exercise.map( (exercise) => (
                                <option value={ exercise.value + "/" + region.value } key={ exercise.value }>{exercise.label}</option>
                            ))}
                        </optgroup>
                    ))}
            </Select>
        </FormControl>

    const handleWeight = (event) => { setWeight(event.target.value) };

    const weightForm = 
        <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="grouped-native-select">kg</InputLabel>
            <Select native value={weight} id="weight" label="weight" onChange={handleWeight} >
            {weightList.map( (w) => (
                <option value={ w } key={ w }>{w}</option>
                ))}
            </Select>
        </FormControl>

    const handleSets = (event) => { setSets(event.target.value) };

    const setForm = 
        <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="grouped-native-select">Sets</InputLabel>
            <Select native value={sets} id="sets" label="sets" onChange={handleSets} >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </Select>
        </FormControl>

    const handleReps = (event) => { setReps(event.target.value) };

    const repsForm =
        <FormControl sx={{ m: 1 }}>
            <TextField id="reps" label="Reps" type="reps" value={reps} onChange={handleReps}/>
        </FormControl>

    const saveExercise = () => {
        setLoading(true)
        // Api.saveExercise(currentUser.currentUser.uid, region, exercise, weight, sets, reps);
        setRegion(defaultValues.region)
        setExercise(defaultValues.exercise)
        setWeight(defaultValues.weight)
        setSets(defaultValues.sets)
        setReps(defaultValues.reps)
        setLoading(false)
        console.log("save")
    };

    const submitForm =
        <FormControl sx={{ m: 1 }}>
            <LoadingButton
            onClick={saveExercise}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            >
                Save
            </LoadingButton>
        </FormControl>

    if ( isLogin ) {
        return (
            <Box sx={{ '& > button': { m: 1}, textAlign: 'center', minWidth: 300}}>
                <ButtonGroup
                    orientation="vertical"
                    // aria-label="vertical contained button group"
                    // variant="text"
                >
                {exerciseForm}
                {weightForm}
                {setForm}
                {repsForm}
                {submitForm}
                </ButtonGroup>
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