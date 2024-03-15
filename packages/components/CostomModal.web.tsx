import React from "react";
import {
  Modal,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '604px',
    overflowX: 'hidden',
    overflowY: 'scroll',
    height: '500px'
  },
  closeIcon: {
    position: 'relative',
    width: '100%',
    textAlign: 'right',
    paddingTop: '15px',
    paddingRight: '20px'
  },
  icon: {
    cursor: 'pointer'
  },
  contained: {
    background: '#0E0F17',
    borderRadius: '0px',
    color: '#fff',
    height: '46px'
  },
  outlined: {
    background: '#fff',
    borderRadius: '0px',
    border: '1px solid #0E0F17',
    color: '#0E0F17',
    height: '46px'
  }
}));

const CustomModal = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.openProp);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        <Button 
          onClick={handleOpen}
          variant={props.variant}
          className={props.variant == 'contained' ? classes.contained : ''}
        >
          {props.btnLabel}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          className={classes.modal}
        >
          <div className={classes.paper}>
            <div
              className={classes.closeIcon}
            >
              <CloseIcon 
                onClick={handleClose}
                className={classes.icon}
              />
            </div>
            {props.children}
          </div>
        </Modal>
      </div>
  );
}

export default CustomModal