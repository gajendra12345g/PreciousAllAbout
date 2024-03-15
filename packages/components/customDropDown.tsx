import React from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { setStorageData } from "../../../../framework/src/Utilities";
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 'auto',
      outline: 'none',
      'label + &': {
        marginTop: theme.spacing(3),
      },
      [theme.breakpoints.down('sm')]: {
        width: '60px'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    displayNoneSm: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
    },
    displayNoneLarge: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      },
    }
  }),
);

export default function CustomDropDown() {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = React.useState("all");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
    setStorageData('Category', event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        <div
          className={classes.displayNoneSm}
        >
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={selectedOption}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <MenuItem value={'all'}>ALL ITEMS</MenuItem>
            <MenuItem value={'images'}>IMAGES</MenuItem>
            <MenuItem value={'videos'}>VIDEOS</MenuItem>
          </Select>
        </div>
        <div
          className={classes.displayNoneLarge}
        >
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={selectedOption}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <MenuItem value={'all'}>ALL</MenuItem>
            <MenuItem value={'images'}>
              <ImageIcon 
                fontSize='small'
              />
            </MenuItem>
            <MenuItem value={'videos'}>
              <VideocamIcon 
                fontSize='small'
              />
            </MenuItem>
          </Select>
        </div>
      </FormControl>
    </div>
  );
}
