import React from "react";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';


const Alert = (props: any) => {

  const alertStyles: any = {
    ...styles[props.variant],
    ...styles[props.fullWidth],
    ...styles['height'],
    ...styles['cursor'],
    ...styles['marginTop']
  };

  return  <div>
            <div
                style={alertStyles}
            >
                <ReportProblemOutlinedIcon style={styles.icon16} /> <span>{props.children}</span>
            </div>
          </div>
}

const styles: any = {
  error: {
    background: '#FEE2E2',
    color: '#CA2121',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    textTransform: 'capitalize'
  },
  warning: {
    background: 'rgb(255, 244, 229)',
    color: 'rgb(102, 60, 0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    textTransform: 'capitalize'
  },
  success: {
    background: 'rgb(237, 247, 237)',
    color: 'rgb(30, 70, 32)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    textTransform: 'capitalize'
  },
  marginTop: {
    marginTop: '20px'
  },
  fullWidth: {
    width: '100%'
  },
  height: {
    height: '48px'
  },
  icon16: {
    height: '16px',
    width: '16px',
    marginRight: '5px'
  }
}

export default Alert