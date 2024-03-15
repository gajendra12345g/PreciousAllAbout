import * as React from "react";
// Customizable Area Start

import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core";

import SortIcon from "@material-ui/icons/Sort";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
// Customizable Area End

interface ViewProps {
  testID: string;
  // Customizable Area Start

  // Customizable Area End
}

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
        minWidth: '120px',
        outline: 'none',
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      position: 'relative',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '12px',
      outline: 'none',
      padding: '10px 26px 10px 12px',
      '&:focus': {
        borderRadius: '0',
        border: 'none',
        outline: 'none',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);


const useStyles = makeStyles((theme) => ({
  sortWrap: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  selectSort: {
    border: 'none'
  },
  sortIconsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  sortIcon: {
    marginTop: '5px'
  }
}))

export const CustomSort: React.FC<ViewProps> = (
  {
    // Customizable Area Start

    // Customizable Area End
  }
) => {
  // Customizable Area Start
  const classes = useStyles();

  const [selectedOption, setSelectedOption] = React.useState("all");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
  };
  
  // Customizable Area End

  return (
    // Customizable Area Start
    <>
      <div>
            <div
              className={classes.sortWrap}
            >
              <div
                className={classes.sortIcon}
              >
                <SortIcon />
              </div>
              <div>
                <FormControl>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={selectedOption}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                  >
                      <MenuItem value={'all'}>SORT BY</MenuItem>
                      <MenuItem value={'popularity'}>POPULARITY</MenuItem>
                      <MenuItem value={'trending'}>TRENDING</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
        </div>
    </>
    // Customizable Area End
  );
};

// Customizable Area Start

export default CustomSort;
// Customizable Area End

