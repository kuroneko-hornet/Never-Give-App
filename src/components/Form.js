import * as Api from "../service/api"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

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

const weekday = ['日', '月', '火', '水', '木', '金', '土'];

export default function Form (props) {
    const uid = props.uid
    // const isLogin = props.isLogin

    const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleString())
    const [year, setYear] = React.useState(new Date().getFullYear())
    const [month, setMonth] = React.useState(new Date().getMonth()+1)
    const [date, setDate] = React.useState(new Date().getDate())
    const [week, setWeek] = React.useState(new Date().getDay())
    const [hours, setHours] = React.useState(new Date().getHours())
    const [minutes, setMinutes] = React.useState(new Date().getMinutes())
    const [secounds, setSeconds] = React.useState(new Date().getSeconds())

    const [region, setRegion] = React.useState(defaultValues.region);
    const [exercise, setExercise] = React.useState(defaultValues.exercise);
    const [weight, setWeight] = React.useState(defaultValues.weight);
    const [reps, setReps] = React.useState(defaultValues.reps);
    const [sets, setSets] = React.useState(defaultValues.sets);
    const [loading, setLoading] = React.useState(false);

    setInterval( () => {
        setCurrentTime(new Date().toLocaleString())
        // year: new Date().getFullYear(), // 年
        // month: new Date().getMonth()+1, // 月
        // date: new Date().getDate(), // 日
        setWeek(weekday[new Date().getDay()]) // 曜日
        // hours: new Date().getHours(), // 時
        // minutes: new Date().getMinutes(), // 分
        // seconds: new Date().getSeconds(), // 秒
    }, 1000)

    const handleExercise = (event) => {
        const [exercise, region] = event.target.value.split("/")
        setRegion(region);
        setExercise(exercise);
    };

    const exerciseForm = <FormControl sx={{ m: 1}}>
        <InputLabel htmlFor="grouped-native-select">Exercise</InputLabel>
        <Select native id="exercise" label="exercise" onChange={handleExercise} >
        {exerciseDicts.map( (region) => (
                    <optgroup label={region.label} key={region.label}>
                        {region.exercise.map( (exercise) => (
                            <option value={ exercise.label + "/" + region.value } key={ exercise.value }>{exercise.label}</option>
                        ))}
                    </optgroup>
                ))}
        </Select>
        </FormControl>

    const handleWeight = (event) => { setWeight(event.target.value) };

    const weightForm =  <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="grouped-native-select">kg</InputLabel>
            <Select native value={weight} id="weight" label="weight" onChange={handleWeight} >
            {weightList.map( (w) => (
                <option value={ w } key={ w }>{w}</option>
                ))}
            </Select>
        </FormControl>

    const handleSets = (event) => { setSets(event.target.value) };

    const setForm =  <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="grouped-native-select">Sets</InputLabel>
            <Select native value={sets} id="sets" label="sets" onChange={handleSets} >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </Select>
        </FormControl>

    const handleReps = (event) => { setReps(event.target.value) };

    const repsForm = <FormControl sx={{ m: 1 }}>
            <TextField id="reps" label="Reps" type="reps" value={reps} onChange={handleReps}/>
        </FormControl>

    const saveExercise = () => {
        setLoading(true)
        Api.saveExercise(uid, region, exercise, weight, sets, reps);
        setRegion(defaultValues.region)
        setExercise(defaultValues.exercise)
        setWeight(defaultValues.weight)
        setSets(defaultValues.sets)
        setReps(defaultValues.reps)
        setLoading(false)
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

    return (
        <Box sx={{ '& > button': { m: 1}, textAlign: 'center', minWidth: 300}}>
            <ButtonGroup
                orientation="vertical"
            >
            <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            style={{ lineHeight: "2", margin: "0px 0px 20px"}}
            >
                {currentTime} ({week})
            </Typography>
            {exerciseForm}
            {weightForm}
            {setForm}
            {repsForm}
            {submitForm}
            </ButtonGroup>
        </Box>
    )
}