import React from "react";
import Label from "../Label/Label.web";


const Button = (props: any) => {

  const btnStyles: any = {
    ...styles[props.variant],
    ...styles[props.fullWidth],
    ...styles['height'],
    ...styles['cursor']
  };

  return  <div>
            <button 
              style={btnStyles} 
              onClick={props.onClick}
            >
              <Label
                variant='white'
                size='l'
                textTransform='uppercase'
                weight='w500'
              >
                {props.children}
              </Label>
            </button>
          </div>
}

const styles: any = {
  primary: {
    background: '#0E0F17',
    border: 'none'
  },
  outlined: {
    border: '1px solid #0E0F17',
    background: '#fff'
  },
  fullWidth: {
    width: '100%'
  },
  height: {
    height: '49px'
  },
  cursor: {
    cursor: 'pointer'
  }
}

export default Button