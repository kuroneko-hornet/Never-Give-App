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
import Paper from '@mui/material/Paper';
import Chart from "react-apexcharts";

export default function LogChart (props) {

    // const [region, setRegion] = React.useState("");
    // const [exercise, setExercise] = React.useState("");
    // const [weight, setWeight] = React.useState(0);
    // const [reps, setReps] = React.useState(0);
    // const [sets, setSets] = React.useState(0);

    const [chestData, setChestData] = React.useState({x: [], y: [], exercise: []});
    const [shouldersData, setShouldersData] = React.useState({x: [], y: [], exercise: []});
    const [legsData, setLegsData] = React.useState({x: [], y: [], exercise: []});
    const regionChartDict = {
        chest: chestData,
        shoulders: shouldersData,
        legs: legsData
    }

    React.useEffect(() => {
        updateExerciseLog("chest", setChestData);
        updateExerciseLog("shoulders", setShouldersData);
        updateExerciseLog("legs", setLegsData);
    }, [])

    const updateExerciseLog = async (region, setFunc) => {
        const data = await Api.selectExerciseLog(props.uid, region);
        const graphData = data.reverse().map((row) => ({
            x: row.createdAt.slice(5, 10),
            y: row.weight,
            exercise: row.exercise
        }))
        let reshapeData = {x:[], y:[]}
        await graphData.forEach((item) => {
            reshapeData.x.push(item.x)
            reshapeData.y.push(item.y)
        })

        setFunc(reshapeData)
    }
    
    const logChart = (region) => {
        const graphData = regionChartDict[region];

        const options = {
            chart: {
                // height: 50,
                zoom: {
                    enabled: false
                },
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            stroke: {
                curve: 'smooth'
            },
            dataLabels: {
                enabled: true,
                // background: {borderRadius: 5}
            },
            xaxis: {
                categories: graphData.x,
                // type: "datetime",
                range: Math.min(10, graphData.x.length) -1
            },
            yaxis: {
                labels: {
                    formatter: val => val.toFixed(0)
                },
                show: false
            }
          };

        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', margin: "1em auto"}} elevation={12}>
                <Typography
                variant="h6"
                id="chartTitle"
                component="div"
                >
                    <div style={{ lineHeight: "1.5", margin: "10px 10px 0px"}}>{region.toUpperCase()}</div>
                </Typography>
                <Chart type="line" options={options}　height={200}
                    series={[{
                        name: 'weight',
                        data: graphData.y}]}
                />
            </Paper>
        )
    }

    return (
        <Box>
            {logChart("chest")}
            {logChart("shoulders")}
            {logChart("legs")}
        </Box>
    )
}