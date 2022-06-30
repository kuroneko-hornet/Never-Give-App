/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import * as Api from "../service/api"

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';


const columns = [
    { id: 'createdAt', label: "Data", minWidth: 40 },
    { id: 'exercise', label: "Exercise", minWidth: 40 },
    {
        id: 'weight',
        label: "weight" + "\u00a0\n(kg)",
        minWidth: 10,
        align: 'right',
    },
    {
        id: 'sets',
        label: "sets",
        minWidth: 10,
        align: 'right',
    },
    {
        id: 'reps',
        label: "reps",
        minWidth: 10,
        align: 'right',
    }
];


const defaultValue = {
    rowsPerPage: 3,
    page: 0
}

export default function ExerciseLog (props) {
    const [chestPage, setChestPage] = React.useState(defaultValue.page);
    const [shouldersPage, setShouldersPage] = React.useState(defaultValue.page);
    const [legsPage, setLegsPage] = React.useState(defaultValue.page);
    const pageDict = {
        chest: {value: chestPage, set: setChestPage},
        shoulders: {value: shouldersPage, set: setShouldersPage},
        legs: {value: legsPage, set: setLegsPage}
    }

    const [chestPerPage, setChestPerPage] = React.useState(defaultValue.rowsPerPage);
    const [shouldersPerPage, setShouldersPerPage] = React.useState(defaultValue.rowsPerPage);
    const [legsPerPage, setLegsPerPage] = React.useState(defaultValue.rowsPerPage);
    const rowsPerPageDict = {
        chest: {value: chestPerPage, set: setChestPerPage},
        shoulders: {value: shouldersPerPage, set: setShouldersPerPage},
        legs: {value: legsPerPage, set: setLegsPerPage}
    }

    const [chestData, setChestData] = React.useState([]);
    const [shouldersData, setShouldersData] = React.useState([]);
    const [legsData, setLegsData] = React.useState([]);
    const regionDataDict = {
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
            setFunc(data)
    }

    const handleChangePage = (event, newPage, setPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event, setRowsPerPage, setPage) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const stickyHeaderLog = (region) => {
        // regionを受け取って、regionをkeyとする
        // - regionData
        // - handleChangePage
        // - handleChangeRowsPerPage
        // を実行できるようにする必要がある
        const regionData = regionDataDict[region];
        const page = pageDict[region];
        const rowsPerPage = rowsPerPageDict[region];

        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', margin: "1em auto"}} elevation={12}>
                <Typography
                variant="h6"
                id="tableTitle"
                component="div"
                >
                    <div style={{ lineHeight: "1.5", margin: "10px 10px 0px"}}>{region.toUpperCase()}</div>
                </Typography>
                <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow align="left" colSpan={2}></TableRow>
                        <TableRow>
                            {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {regionData
                            .slice(page.value * rowsPerPage.value, page.value * rowsPerPage.value + rowsPerPage.value)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[3, 10, 100]}
                component="div"
                count={regionData.length}
                rowsPerPage={rowsPerPage.value}
                page={page.value}
                onPageChange={(event, newPage) => handleChangePage(event, newPage, page.set)}
                onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, rowsPerPage.set, page.set)}
                />
            </Paper>
        )
    }

    return (
        <div>
            {stickyHeaderLog("chest")}
            {stickyHeaderLog("shoulders")}
            {stickyHeaderLog("legs")}
        </div>
    )
}