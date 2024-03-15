import React from 'react';
import { Modal, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 'auto', 
    height: 'auto', 
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
  },
}));

const ModalComponent = ({ open, onClose, maxWidth, maxHeight, children, padding, width, height }: any) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Paper className={classes.paper} style={{ maxWidth, maxHeight, padding, borderRadius:0, overflow:"hidden", width, height }}>
        {children}
      </Paper>
    </Modal>
  );
};

export default ModalComponent;
