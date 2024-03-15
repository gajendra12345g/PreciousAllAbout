import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const StyledCheckbox = withStyles({
  root: {
    color: 'black',
    borderRadius: '0px',
    '&$checked': {
      color: 'black', 
      borderRadius: '0px',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CustomCheckBox = (props: any) => {

  const [checked, setChecked] = useState(props.checked);

  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);
    props.onChange(event.target.checked)
  };

  return(
      <StyledCheckbox 
        {...props} 
        checked={checked}
        onChange={handleCheckboxChange}
      />
  )
}

export default CustomCheckBox;