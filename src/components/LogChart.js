import * as Api from "../service/api"
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chart from "react-apexcharts";

export default function LogChart (props) {

    /**
     * 現状、exerciseがごちゃ混ぜになってregionでまとめて表示されている。
     * 要件としては、1regionにexerciseの数だけgraphを追加したい。
     * その時に軸のxは固定なので、データがない箇所についてはnullを入れる必要がある。
     * 同じに同じ種目をしていいた場合、数値が高い方を採用することとする。
     */

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
                offsetX: 20,
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
                },
            },
            stroke: {
                curve: 'smooth'
            },
            dataLabels: {
                enabled: true,
            },
            xaxis: {
                categories: graphData.x,
                range: Math.min(10, graphData.x.length) -1,
                labels: {offsetX: 1}
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
                <Chart type="line" options={options} height={200} width='95%'
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