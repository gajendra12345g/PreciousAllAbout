import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Box
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logo } from "./assets";
import CustomLink from '../Link/Link.web';
import CustomModal from '../CustomModal/CustomModal.web';
import EmailAccountLoginBlock from '../../../../blocks/email-account-login/src/EmailAccountLoginBlock';
import EmailAccountRegistartion from '../../../../blocks/email-account-registration/src/EmailAccountRegistration.web';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',
    height: 72,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuIcon: {
    color: '#000'
  },
  menuWrapperlg: {
    width: '100%',
    height: 72,
    display: 'flex',
    marginTop: '5px',
    marginLeft: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
  },
  menuListWrap: {
    height: 72,
    display: 'flex',
    alignItems: 'center'
  },
  btn: {
    width: '108px',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
  }
}));

const Header = (props: any) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [closeModalProp, setCloseModalProp] = useState<any>();
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const changeModalProp = () => {
    setCloseModalProp(false)
    // setIsUserLoggedIn(true)
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <MenuIcon 
                className={classes.menuIcon}
            />
          </IconButton>
          <div>
            <img
                src={logo}
            />
          </div>
          <div
            className={classes.menuWrapperlg}
          >
            <div
                className={classes.menuListWrap}
            >
                <Box
                    ml={2}
                >
                    <CustomLink
                        variant={'primary'}
                        url={'#'}
                        component={'body3'}
                    >
                        BLOG
                    </CustomLink>
                </Box>
                <Box
                    ml={2}
                >
                    <CustomLink
                        variant={'primary'}
                        url={'#'}
                        component={'body3'}
                    >
                        SUPPORT CENTRE
                    </CustomLink>
                </Box>
            </div>
            <div
                className={classes.menuListWrap}
            >
                <Box
                    mr={2}
                >
                    <CustomLink
                        variant={'primary'}
                        url={'#'}
                        component={'body4'}
                        textTransform={'uppercase'}
                    >
                        by stock photos & videos
                    </CustomLink>
                </Box>
                <Box
                    mr={2}
                    className={classes.btn}
                >
                    <CustomModal
                        btnLabel='LOGIN'
                        closeBtn={true}
                        openProp={closeModalProp}
                        variant={'secondary'}
                        size={'medium'}
                    >
                        <EmailAccountLoginBlock
                            navigation={props.navigation}
                            id={'signin'}
                            callBack={changeModalProp}
                        />
                    </CustomModal>
                </Box>
                <Box
                    className={classes.btn}
                >
                    <CustomModal
                        btnLabel='Sign up'
                        closeBtn={true}
                        openProp={closeModalProp}
                        variant={'primary'}
                        size={'medium'}
                    >
                        <EmailAccountRegistartion
                            navigation={props.navigation}
                            id={'signup'}
                            callBack={changeModalProp}
                        />
                    </CustomModal>
                </Box>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
            <ListItem button onClick={handleDrawerClose}>
                <img src={logo}/>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
                <CustomLink
                    variant={'primary'}
                    url={'#'}
                    component={'body3'}
                    textTransform={'uppercase'}
                >
                    BLOG
                </CustomLink>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
                <CustomLink
                    variant={'primary'}
                    url={'#'}
                    component={'body3'}
                    textTransform={'uppercase'}
                >
                    Support Centre
                </CustomLink>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
                <CustomLink
                    variant={'primary'}
                    url={'#'}
                    component={'body3'}
                    textTransform={'uppercase'}
                >
                    by stock photos & videos
                </CustomLink>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
                <div
                    className={classes.btn}
                >
                    <CustomModal
                        btnLabel='LOGIN'
                        closeBtn={true}
                        openProp={closeModalProp}
                        variant={'secondary'}
                        size={'medium'}
                    >
                        <EmailAccountLoginBlock
                            navigation={props.navigation}
                            id={'signin'}
                            callBack={changeModalProp}
                        />
                    </CustomModal>
                </div>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
                <div
                    className={classes.btn}
                >
                    <CustomModal
                        btnLabel='Sign up'
                        closeBtn={true}
                        openProp={closeModalProp}
                        variant={'primary'}
                        size={'medium'}
                    >
                        <EmailAccountRegistartion
                            navigation={props.navigation}
                            id={'signup'}
                            callBack={changeModalProp}
                        />
                    </CustomModal>
                </div>
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;