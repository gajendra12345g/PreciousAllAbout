import * as React from "react";
// Customizable Area Start
import { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Toolbar, Typography, Drawer, Box, styled, makeStyles, Menu, MenuItem, Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { logo, logouticon } from "../Header/assets";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { bag, whiteBag, profile } from './assets';
import CustomModal from '../CustomModal/CustomModal.web';
import EmailAccountLoginBlock from "../../../../blocks/email-account-login/src/EmailAccountLoginBlock.web";
import EmailAccountRegistartion from "../../../../blocks/email-account-registration/src/EmailAccountRegistration.web";
import { getStorageData } from "../../../../framework/src/Utilities";
import { Link } from "react-router-dom";
import EmailAccountLogout from "../../../../blocks/email-account-login/src/EmailAccountLogout.web";
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CustomTypography from "../CustomTypography/CustomTypography.web";
import ModalComponent from "../Modalcomponent/ModalComponent.web";
const drawerWidth = 240;

const NavSub = styled("div")({
  minHeight: "64px",
});

const CustomToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const MenuButtonDiv = styled("div")({
  display: "none",
  marginTop: "6px",
  "@media (max-width: 900px)": {
    display: "block",
    cursor: "pointer",
  },
});

const MainDrawer = styled("div")({
  "@media (min-width: 1200px)": {
    width: drawerWidth,
    flexShrink: 0,
  },

  "@media (min-width: 600px)": {
    width: "100%",
    marginLeft: 0,
    display: "flex",
    justifyContent: "space-between",
  },

  "@media (max-width: 900px)": {
    display: "none",
  },
});

const FirstDrawer = styled(Drawer)({
  display: "flex",
  flexDirection: "column",
  "& .MuiDrawer-paper": {
    backgroundColor: "white",
    border: "none",
    borderRight: "1px solid #80808042",
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    "-ms-overflow-style": "none",
    scrollbarWidth: "none",

    "@media (max-width: 600px)": {
      width: "35%",
    },

    "@media (max-width: 400px)": {
      width: "40%",
    },

    "@media (max-width: 350px)": {
      width: "40%",
    },
  },
  "& .MuiDrawer-paper::-webkit-scrollbar": {
    display: "none",
  },
});

const CustomHeader = styled(Box)({
  width: "100%",
  paddingLeft: "20px",
  paddingRight: "20px",
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "7px",
  paddingBottom: "7px",
});

const CustomLogoDiv = styled(Box)({});

const MiddleSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media (max-width: 900px)": {
    display: "none",
  },
});

const CustomLink = styled(Typography)({
  color: "#000000",
  lineHeight: "22px",
  padding: "10px 30px 10px 30px",
  textTransform: "none",
  fontSize: "12px",
  cursor: 'pointer'
});

const CustomLogo = styled("img")({
  objectFit: "cover",
});

const EndSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media (max-width: 900px)": {
    display: "none",
  },
});

const CreateAccountButton = styled(Button)({
  backgroundColor: "black",
  minWidth: "40%",
  color: "#FFFFFF",
  height: "44px",
  boxShadow: "none",
  fontFamily: "LemonMilk",
  fontWeight: 400,
  textTransform: "none",
  padding: "10px 30px 10px 30px",
  margin: "0px 5px 0px 5px",
  fontSize: "12px",
});

const ButtonClickedSection = styled(Box)({
  display: "none",
  "@media (max-width: 900px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "15px",
  },
});

const ButtonClickedMiddleSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ButtonClickedEndSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: 'space-between'
});

const MenuHeadingDiv = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const MenuHeadText = styled(Typography)({
  color: "#000000",
  lineHeight: "22px",
  padding: "10px 30px 10px 30px",
  textTransform: "none",
  fontSize: "18px",
});

// logged in section

const LoggedInEndSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

const LoggedInEndSection1 = styled(Box)({
  "@media (max-width: 900px)": {
    display: "none",
  },
});

const ProfileButton=styled(Button)({
  minWidth:0
})

const GreyVerticalLine = styled("div")({
  height: "20px",
  borderRight: "1px solid grey",
});

const LoggedInDrawerSection = styled(Box)({
  display: "none",
  "@media (max-width: 900px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "15px",
  },
});

const LogoutDrawerButton = styled(Button)({
  backgroundColor: "black",
  minWidth: "40%",
  color: "#FFFFFF",
  height: "44px",
  boxShadow: "none",
  fontFamily: "LemonMilk",
  fontWeight: "bold",
  textTransform: "none",
  padding: "13px 30px 13px 30px",
  margin: "0px 5px 0px 5px",
  fontSize: "10px",
});

const PopUpMenu = styled(Menu)({
  '& .MuiPopover-paper': {
    top: '70px!important',
    width:"200px",
    left:"unset!important",
    right: '50px',
    borderRadius:0,
    minWidth:"fit-content"
  },
  '@media (max-width: 959px)': {
    '& .first-child': {
      display: 'none',
    },
  },
  '@media (min-width: 960px)': {
    '& .last-child': {
      display: 'none',
    }},
  
});

const PopUpMenuItem=styled(MenuItem)({
  display:"flex",
  gap:"15px",
  alignItems:"self-end"
})

const LogoutPop=styled("div")({
  display:"flex",
  gap:"15px",
  padding:"8px 0px 0px 19px",
  "@media (max-width: 959px)": {
   display:"none"
  },
})

// Customizable Area End

interface ViewProps {
  testID: string;
  // Customizable Area Start
  navigation: any;
  classNameProps: any
  // Customizable Area End
}

const useStyles = makeStyles((theme) => ({
  marginLeft30: {
    marginLeft: '30px'
  },
  marginLeft20: {
    marginLeft: '20px'
  }
}))

export const Header: React.FC<ViewProps> = (
  {
    // Customizable Area Start
    navigation,
    classNameProps
    // Customizable Area End
  }
) => {
  // Customizable Area Start
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closeModalProp, setCloseModalProp] = useState<any>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const classes = useStyles();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeModalProp = () => {
    setCloseModalProp(false)
    setIsUserLoggedIn(true)
  }

  useEffect(() => {
    console.log("AuthToken", getStorageData('authToken').then((res: any) => { res }))
    getStorageData('authToken').then((res: any) => {
      if (res) {
        setIsUserLoggedIn(true)
      }
    })
  }, [isUserLoggedIn])
  const conditionalStyle = classNameProps === 'blackHeader' ? { background: '#000000', color: "#ffffff" } : { color: '' };
  const colorwhiteStyle = classNameProps === 'blackHeader' ? { color: "#ffffff" } : { color: '' }
  const customStyle = classNameProps === 'blackHeader' ? { filter: 'invert(100%)' } : { color: '' }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const receiveState1=()=>{
  setAnchorEl(null);
  setIsUserLoggedIn(false)
 }
  // Customizable Area End

  return (
    // Customizable Area Start
    <NavSub>
      <CustomToolBar style={conditionalStyle}>
        <MenuButtonDiv onClick={handleDrawerToggle}>
          <MenuIcon />
        </MenuButtonDiv>
        <CustomHeader>
          <CustomLogoDiv>
            <Link
              to="/"
            >
              <CustomLogo src={logo} alt="logo" style={customStyle} />
            </Link>
          </CustomLogoDiv>

          <MiddleSection>
            <Link to="/AdvancedSearch" style={{ textDecoration: "none" }}>
              <CustomLink style={colorwhiteStyle}>SEARCH</CustomLink>
            </Link>
            <CustomLink style={colorwhiteStyle}>COLLECTIONS</CustomLink>
            <CustomLink style={colorwhiteStyle}>DISCOVER</CustomLink>
            <CustomLink style={colorwhiteStyle}>PRICING</CustomLink>
          </MiddleSection>
          {isUserLoggedIn ? (
            <LoggedInEndSection>
              <LoggedInEndSection1>
                 <FavoriteBorderIcon />
              </LoggedInEndSection1>
              <NotificationsNoneIcon />
              <LoggedInEndSection1>
              {
                classNameProps == 'blackHeader' ?
                  <img src={whiteBag} />
                  : null
              }
              {
                classNameProps != 'blackHeader' ?
                  <img src={bag} />
                  : null
              }
              </LoggedInEndSection1>
              <GreyVerticalLine />
              <div>
                <ProfileButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <img src={profile} />
                </ProfileButton>
                <PopUpMenu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to="/userprofiledetails" style={{ textDecoration: "none" ,color:"black" }}>
                  <PopUpMenuItem className="first-child" onClick={handleClose}><PersonIcon/><CustomTypography variant="secondary">MY PROFILE</CustomTypography></PopUpMenuItem>
                  </Link>

                  <Link to="#" style={{ textDecoration: "none" ,color:"black" }}>
                  <PopUpMenuItem className="first-child" onClick={handleClose}><BookmarkBorderIcon/><CustomTypography variant="secondary">MY COLLECTONS</CustomTypography></PopUpMenuItem>
                  </Link>

                  <Link to="#" style={{ textDecoration: "none" ,color:"black" }}>
                  <PopUpMenuItem className="first-child" onClick={handleClose}><HelpOutlineIcon/><CustomTypography variant="secondary">HELP</CustomTypography></PopUpMenuItem>
                  </Link>

                  <Link to="/userprofiledetails" style={{ textDecoration: "none" ,color:"black" }}>
                  <PopUpMenuItem className="last-child" onClick={handleClose}><CustomTypography >PROFILE</CustomTypography></PopUpMenuItem>
                  </Link>

                  <Link to="/UserProfileSetting" style={{ textDecoration: "none" ,color:"black" }}>
                  <PopUpMenuItem className="last-child" onClick={handleClose}><CustomTypography >SETTINGS & PREFERENCES</CustomTypography></PopUpMenuItem>
                  </Link>

                  <Link to="#" style={{ textDecoration: "none" ,color:"black" }}>
                  <PopUpMenuItem className="last-child" onClick={handleClose}><CustomTypography >ACTIVITY</CustomTypography></PopUpMenuItem>
                  </Link>

                  <Link to="/UserProfilePrivacyAndSecurity" style={{ textDecoration: "none" ,color:"black" }}>
                  <PopUpMenuItem className="last-child" onClick={handleClose}><CustomTypography >PRIVACY & SECURITY</CustomTypography></PopUpMenuItem>
                  </Link>

                  <LogoutPop>
                  <img src={logouticon}/>
                  <EmailAccountLogout 
                   receiveState={receiveState1} 
                   navigation={undefined} id={""} 
                   style={{padding:"0px", color:"#73767A"}}>
                   
                  </EmailAccountLogout>
                  </LogoutPop>
                </PopUpMenu>
              </div>
            </LoggedInEndSection>
          ) : (
            <EndSection>
              <div>
                <CustomModal
                  btnLabel='LOGIN'
                  closeBtn={true}
                  openProp={closeModalProp}
                  variant={classNameProps == 'blackHeader' ? 'tertiarySecondaryWithoutBorder' : 'tertiaryWithoutBorder'}
                >
                  <EmailAccountLoginBlock
                    navigation={navigation}
                    id={'signin'}
                    callBack={changeModalProp}
                    roleType={0}
                  />
                </CustomModal>
              </div>
              <div
                className={classes.marginLeft30}
              >
                <CustomModal
                  btnLabel='CREATE ACCOUNT'
                  closeBtn={true}
                  openProp={closeModalProp}
                  variant={classNameProps == 'blackHeader' ? 'secondary' : 'primary'}
                >
                  <EmailAccountRegistartion
                    navigation={navigation}
                    id={'signup'}
                    callBack={changeModalProp}
                    roleType={0}
                  />
                </CustomModal>
              </div>
            </EndSection>
          )}
        </CustomHeader>
      </CustomToolBar>
      <MainDrawer aria-label="mailbox folders">
        <FirstDrawer
          container={
            window !== undefined ? () => window.document.body : undefined
          }
          variant={
            window && window.innerWidth >= 1200 ? "permanent" : "temporary"
          }
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {isUserLoggedIn ? (
            <LoggedInDrawerSection>
              <MenuHeadingDiv>
                <MenuHeadText>MENU</MenuHeadText>
              </MenuHeadingDiv>
              <ButtonClickedMiddleSection>
                <CustomLink>SEARCH</CustomLink>
                <CustomLink>COLLECTIONS</CustomLink>
                <CustomLink>DISCOVER</CustomLink>
                <CustomLink>PRICING</CustomLink>
                <CustomLink>FAVORITES</CustomLink>
                <CustomLink>NOTIFICATIONS</CustomLink>
                <CustomLink>BAG</CustomLink>
                <Link to="/userprofiledetails" style={{ textDecoration: "none"}}>
                <CustomLink>PROFILE</CustomLink>
                </Link>
                <EmailAccountLogout 
                 receiveState={receiveState1} 
                 navigation={undefined} id={""} 
                 style={{backgroundColor:"black",color:'white'}}/>
              </ButtonClickedMiddleSection>
            </LoggedInDrawerSection>
          ) : (
            <ButtonClickedSection>
              <MenuHeadingDiv>
                <MenuHeadText>MENU</MenuHeadText>
              </MenuHeadingDiv>
              <ButtonClickedMiddleSection>
                <CustomLink>SEARCH</CustomLink>
                <CustomLink>COLLECTIONS</CustomLink>
                <CustomLink>DISCOVER</CustomLink>
                <CustomLink>PRICING</CustomLink>
              </ButtonClickedMiddleSection>
              <ButtonClickedEndSection>
                <div
                  className={classes.marginLeft20}
                >
                  <CustomModal
                    btnLabel='LOGIN'
                    openProp={closeModalProp}
                    closeBtn={true}
                    variant={'tertiaryWithoutBorder'}
                  >
                    <EmailAccountLoginBlock
                      navigation={navigation}
                      id={'signin'}
                      callBack={changeModalProp}
                      roleType={0}
                    />
                  </CustomModal>
                </div>
                <div>
                  <CustomModal
                    btnLabel='CREATE ACCOUNT'
                    openProp={closeModalProp}
                    closeBtn={true}
                    variant={'tertiaryWithoutBorder'}
                  >
                    <EmailAccountRegistartion
                      navigation={navigation}
                      id={'signup'}
                      callBack={changeModalProp}
                      roleType={0}
                    />
                  </CustomModal>
                </div>
              </ButtonClickedEndSection>
            </ButtonClickedSection>
          )}
        </FirstDrawer>
      </MainDrawer>
    </NavSub>
    // Customizable Area End
  );
};

// Customizable Area Start

export default Header;
// Customizable Area End