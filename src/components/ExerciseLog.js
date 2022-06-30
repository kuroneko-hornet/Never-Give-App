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

export default function ExerciseLog (props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [chestData, setChestData] = React.useState([]);
    const [shouldersData, setShoulderData] = React.useState([]);
    const [legsData, setLegsData] = React.useState([]);

    React.useEffect(() => {
        updateExerciseLog("chest", setChestData);
        updateExerciseLog("shoulders", setShoulderData);
        updateExerciseLog("legs", setLegsData);
    }, [])
    
    const updateExerciseLog = async (region, setFunc) => {
            const data = await Api.selectExerciseLog(props.uid, region);
            setFunc(data)
    }

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

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const stickyHeaderLog = (regionData, region) => {
        // regionを受け取って、regionをkeyとする
        // - regionData
        // - handleChangePage
        // - handleChangeRowsPerPage
        // を実行できるようにする必要がある
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', margin: "1em auto"}} elevation={12}>
                <Typography
                variant="h6"
                id="tableTitle"
                component="div"
                >
                    <div style={{ lineHeight: "1.5", margin: "10px 10px 0px"}}>{region}</div>
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
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={regionData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        )
    }

    return (
        <div>
            {stickyHeaderLog(chestData, "CHEST")}
            {stickyHeaderLog(shouldersData, "SHOULDER")}
            {stickyHeaderLog(legsData, "LEG")}
        </div>
    )
}