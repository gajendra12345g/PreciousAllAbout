// src/components/atoms/Input.jsx
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Label from '../Label/Label.web';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    width: '100%', // Adjust the width as needed
    '& .MuiOutlinedInput-root': {
      borderRadius: '0px', // Adjust border radius
      backgroundColor: '#fff', // Adjust background color
    },
    '& .MuiOutlinedInput-input': {
      padding: '15px', // Adjust input padding
    },
  },
});

const Input = ({ label,id, value, onChange,rows, startAdornment, multiple, onKeyDown, error, helperText, required, type, name, subString , maxLength,placeholder,textTransform }: any) => {
  const handleInputChange = (e: any) => {
    const inputValue = e.target;

    // Your custom validation logic
    // For example, here we'll consider the field required
    const isError = required && !inputValue;

    // Pass the input value and error to the parent component
    onChange(inputValue, isError);
  };

  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const handleClickShowPassword = () => {
    setIsPwdVisible(!isPwdVisible)
  };

  const classes = useStyles();
  return (
    <>
        {
            label ?
                <div
                    style={{
                        textAlign: 'left',
                        marginTop: '5px',
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <div>
                      <Label 
                          variant='primary'
                          size='s'
                          textTransform={textTransform?textTransform :'uppercase'}
                          wieght='w400'
                      >
                        {label}
                      </Label>
                    </div>
                    <div
                      style={{
                        marginLeft: '10px'
                      }}
                    >
                      <Label 
                        variant='secondary'
                        size='xs'
                        textTransform='none'
                        wieght='w400'
                      >
                        {subString}
                      </Label>
                    </div>
                </div>
            : null
        }
        <TextField
            value={value}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            variant="outlined"
            fullWidth
            margin="dense"
            id={id}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            required={required} 
            type={isPwdVisible ? 'text' : type}
            inputProps={{ maxLength: maxLength, id:id, ...(multiple && {multiple: multiple}) }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* Custom startAdornment content */}
                  {startAdornment}
                </InputAdornment>
              ),
              endAdornment: (
                type == 'password' ?
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                    >
                      {isPwdVisible ? 
                        <VisibilityIcon 
                          style={{
                            color: '#000'
                          }}
                        /> 
                      : <VisibilityOffIcon 
                          style={{
                            color: '#000'
                          }} 
                        /> }
                    </IconButton>
                  </InputAdornment>
                : null
              ),
            }}
            name={name}
            className={classes.textField}
            multiline={rows ? true : false} 
            rows={rows || undefined} 
        />
    </>
  );
};

export default Input;
