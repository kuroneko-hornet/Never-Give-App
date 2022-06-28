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

import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';


const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A202',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledGroupRoot = styled('li')`
  list-style: none;
`;

const StyledGroupHeader = styled('span')`
  display: block;
  padding: 15px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;

const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;

  > li {
    padding-left: 20px;
  }
`;

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(props, ref) {
  const components = {
    Root: StyledGroupRoot,
    Label: StyledGroupHeader,
    List: StyledGroupOptions,
    ...props.components,
  };

  return <OptionGroupUnstyled {...props} ref={ref} components={components} />;
});

CustomOptionGroup.propTypes = {
  /**
   * The components used for each slot inside the OptionGroupUnstyled.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Label: PropTypes.elementType,
    List: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
};

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


export default function SelectBodyRegionFields() {
    const currentUser = React.useContext(AuthContext);
    const [selectedExercise, setExercise] = React.useState('');
    const [exerciseMenu, setExerciseMenu] = React.useState(<MenuItem>None</MenuItem>);
    const [reps, setReps] = React.useState(<MenuItem>None</MenuItem>);
    
    const handleExercise = (event) => {
        setExercise(event.target.value);
    };

    let dom;
    if ( dig(currentUser, 'currentUser', 'uid') ) {
        dom = <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '100px' },
                }}
                noValidate
                autoComplete="off"
            >
            <CustomSelect
                // onChange={handleExercise}
            >
                {exerciseDicts.map( (region) => (
                    <CustomOptionGroup label={region.label} key={region.label}>
                        {region.exercise.map( (exercise) => (
                            <StyledOption value={ exercise.value } key={ exercise.value }>{exercise.label}</StyledOption>
                        ))}
                    </CustomOptionGroup>
                ))}
            </CustomSelect>
            </Box>
    } else {
        dom = <button onClick={signInWithGoogle}>login</button>
    }

    return (
        dom
);
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