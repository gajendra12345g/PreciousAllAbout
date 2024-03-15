import React from "react";

// Customizable Area Start
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Button,
  styled,
  Select, Tabs, Tab,Menu
} from "@material-ui/core";
import customTheme from "../../../components/src/DesignSystem/Theme/Theme.web";
import LanguageIcon from '@material-ui/icons/Language';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import EmailAccountRegistartion from '../../email-account-registration/src/EmailAccountRegistration.web';
import EmailAccountLoginBlock from "../../email-account-login/src/EmailAccountLoginBlock.web";
import { createTheme} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import CustomDropDown from "../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
import CustomLink from "../../../components/src/DesignSystem/Link/Link.web";
import CustomModal from "../../../components/src/DesignSystem/CustomModal/CustomModal.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import ModalComponent from '../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web';
import { profile } from "./assets";
import { logouticon } from "../../../components/src/DesignSystem/Header/assets";
import EmailAccountLogoutContributor from "../../../blocks/email-account-login/src/EmailAccountLogoutContributor.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
const drawerWidth = 240;
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const webStyle: any = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',
    height: 72,
    boxShadow: 'none!important',
    borderBottom: "1px solid #C4C4C4"
  },
  menuButton: {
    marginRight: theme.spacing(1),
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
  menuDropDown:{
    width: '100%',
    height: 72,
    display: 'flex',
    marginTop: '5px',
    marginLeft: '20px',
    justifyContent:"flex-end",
    color:"black",
    "& > div":{
      width:"172px",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
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
  },
  displayFlex: {
    display:"flex",
    alignItems:"center",
  },
  pointer:{
    cursor:"pointer"
  },
  rightContainer:{
    width: '100%',
    height: 72,
    display: 'flex',
    marginTop: '5px',
    // marginLeft: '20px',
    justifyContent:"flex-end",
    color:"black",
    alignItems:"center",
    gap:"20px"
  },
  leftContainer:{
    width: '100%',
    height: 72,
    display: 'flex',
    marginTop: '5px',
    marginLeft: '20px',
    color:"black",
    alignItems:"center",
    gap:"20px"
  },
  btnContainer:{
    width:"8.25rem",
    cursor:'pointer'
  },
  portfolioTab:{
    color:"black",
    fontWeight:"bold"
  },
  profileStyle:{
     width:"150px",
   textTransform:"none",
    marginLeft:"-97px",
    textAlign:"left",
    fontFamily:"Outfit",
    fontSize:"14px"
  },
  marginTops:{
    marginTop:"6px"
  },
  widthBtns:{width:"124px"},
    submitModalContent:{
        display:"flex", 
       gap:"30px",
       flexDirection:"column",
       alignItems:'center',
       padding:"70px 20px"
    },
    btnWidth:{
      display:"flex",
      justifyContent:"space-around",
      width:"100%"
  },
  divider:{
    borderLeft:`1px solid ${customTheme.palette.secondary.light}`,
    paddingLeft:"20px"
  }
};
const ProfileButton=styled(Button)({
  minWidth:0
})
const LanguageSelector= styled(Button)({
  minWidth:0
})
const MenuWrapper= styled(IconButton)({
  '& .MuiIconButton-root': {
  display:"none"
  },
  '@media (max-width: 768px)': {
    '& .MuiIconButton-root': {
      display: 'block',
    },
  }
})
const SelectInput = styled(Select)({
  outline: "none",
  border: "none",
  margin: "unset",
  paddingLeft: "10px",
  "& .MuiInput-underline::before": {
    borderBottom: "none", 
  },
  "@media (hover: none)": {
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },}
});

const PopUpMenu = styled(Menu)({
  '& .MuiPopover-paper': {
    top: '74px!important',
    width:"200px",
    left:"unset!important",
    right: '25px',
    borderRadius:0,
    minWidth:"fit-content"
  },
});

const LogoutPop=styled("div")({
  display:"flex",
  gap:"15px",
  padding:"8px 0px 0px 19px",
  "@media (max-width: 959px)": {
   display:"none"
  },
})
export const images= require("./assets")
// Customizable Area End

import NavigationMenuController, {
  Props,
  configJSON,
} from "./NavigationMenuController";

export default class NavigationMenu extends NavigationMenuController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { drawerOpen, closeModalProp, closeLoginModal,logOutModal, selectedItemModal, closeSignupModal,selectedLanguage, contributorName, selectedProfile } = this.state;
    return (
      <HeaderSection>
        <div style={webStyle.root}>
              <AppBar position="static" style={webStyle.appBar}>
                <Toolbar>
                  <MenuWrapper>
                  {!!!this.props.contributorLogin && this.props.showHeardNav && <IconButton
                    edge="start"
                    style={webStyle.menuButton}
                    color="inherit"
                    data-test-id="handleDrawerOpen"
                    onClick={this.handleDrawerOpen}
                  >
                    <MenuIcon 
                        style={webStyle.menuIcon}
                    />
                  </IconButton>}
                  </MenuWrapper>
                
                  <div style={webStyle.displayFlex} onClick={this.props.goToLanding}>
                    <img
                        src={images.logo}
                        style={webStyle.pointer}
                    />
                    {(!!this.props.contributorLogin || !!this.props.showContributorLable || !!this.props.contributorContent || !!this.props.contributorPortfolio) && <span style={webStyle.marginTops}>
                      <CustomTypography variant ="secondary" >{this.props.ModeratorLogin ?"Moderator":"Contributor"}</CustomTypography>
                    </span>}
                  </div>
                {!!!this.props.contributorLogin && this.props.showHeardNav &&
                  <div
                    style={webStyle.menuWrapperlg}
                  >
                    <div
                        style={webStyle.menuListWrap}
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
                        style={webStyle.menuListWrap}
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
                                {configJSON.stockText}
                            </CustomLink>
                        </Box>
                        <Box
                            mr={2}
                            style={webStyle.btn}
                        >
                            <CustomModal
                                btnLabel='LOGIN'
                                closeBtn={true}
                                openProp={closeModalProp}
                                data-test-id="backRes"
                                backRes={this.resetLogin}
                                variant={'secondary'}
                                size={'medium'}
                            >
                                {!closeLoginModal ?
                                  <EmailAccountLoginBlock
                                    navigation={this.props.navigation}
                                    id={'signin'}
                                    callBack={this.changeModalProp}
                                    closeLogin={this.closeLogin}
                                    roleType={1}
                                    forgetPasswordRoute='/Contributor/forgot-password'
                                  />
                                :
                                  <EmailAccountRegistartion
                                    navigation={this.props.navigation}
                                    id={'signup'}
                                    callBack={this.changeModalProp}
                                    roleType={1}
                                    data-test-id="closeModal"
                                    closeSignup={this.closeSignup}
                                  />
                                }
                            </CustomModal>
                        </Box>
                        <Box
                            style={webStyle.btn}
                        >
                            <CustomModal
                                btnLabel='Sign up'
                                closeBtn={true}
                                openProp={closeModalProp}
                                variant={'primary'}
                                size={'medium'}
                                backRes={this.resetSignUp}
                            >
                                {closeSignupModal ?
                                  <EmailAccountLoginBlock
                                    navigation={this.props.navigation}
                                    id={'signin'}
                                    callBack={this.changeModalProp}
                                    closeLogin={this.closeLogin}
                                    roleType={1}
                                    forgetPasswordRoute='/Contributor/forgot-password'
                                  />
                                :
                                  <EmailAccountRegistartion
                                    navigation={this.props.navigation}
                                    id={'signup'}
                                    callBack={this.changeModalProp}
                                    roleType={1}
                                    closeSignup={this.closeSignup}
                                  />
                                }
                            </CustomModal>
                        </Box>
                    </div>
                  </div>
                }

                {!!this.props.languageOptions && <div style={webStyle.menuDropDown}>
                  <div>
                    <CustomDropDown startAdornment={<LanguageIcon />} options={this.props.languageOptions} selectedItem={this.props.selectedLanguage} selectNewItem={this.props.handleChangeLanguage}/>
                  </div>
                </div> }

         {!!this.props.contributorLogin && <div style={webStyle.rightContainer}>
          <IconButton style={{backgroundColor:"#E9EAEA",color:""}}>
            <NotificationsNoneOutlinedIcon/>
          </IconButton>
          {this.props.ModeratorLogin &&<span style={webStyle.divider}>
                    <IconButton style={{backgroundColor:"#E9EAEA",color:"#73767A"}}>
                    <EmailOutlinedIcon/>
                  </IconButton>
                  </span> }
          <Box style={webStyle.btnContainer} onClick={this.props.goToCatalogue}>
            <CustomButton startIcon={<AddCircleOutlineIcon/>}  variant="primary" size="large" fullWidth="fullWidth"> Add</CustomButton>
          </Box>
          {/* <ProfileButton aria-controls="simple-menu" aria-haspopup="true" >
            <CustomDropDown variant = "dropdownProfile" style={webStyle.profileStyle} endAdornment={<img src={images.profile}/>} options={configJSON.profileType} selectedItem={selectedProfile} selectNewItem={this.handleLogoutModal}/>
            </ProfileButton> */}
              <div>
                <ProfileButton data-test-id="handleClick" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                  <img src={profile} />
                </ProfileButton>
                <PopUpMenu
                  id="simple-menu"
                  anchorEl={this.state.setAnchorEl}
                  keepMounted
                  open={Boolean(this.state.setAnchorEl)}
                  onClose={this.handleClose}
                >
                  <LogoutPop>
                  <img src={logouticon}/>
                  <EmailAccountLogoutContributor
                   receiveState={this.receiveState1} 
                   navigation={undefined} id={""} 
                   style={{padding:"0px", color:"#73767A",fontFamily:"lemonMilk"}}>
                   
                  </EmailAccountLogoutContributor>
                  </LogoutPop>
                </PopUpMenu>
              </div> 
         </div>}
         {!!this.props.contributorContent && !this.props.contributorPortfolio && <div style={webStyle.rightContainer}>
         <LanguageSelector aria-controls="simple-menu" aria-haspopup="true">
            <CustomDropDown startAdornment = {<img src={images.language} />} variant = "dropdownLanguage" endAdornment={<ExpandMoreIcon />} options={configJSON.assestType} selectedItem={selectedLanguage} data-test-id="handleLanguageChange" selectNewItem={this.handleLanguageChange}/>
            </LanguageSelector>
          <ProfileButton aria-controls="simple-menu" aria-haspopup="true" >
              <img src={images.profile} />
              <CustomTypography variant="selectMultitext">{contributorName}</CustomTypography>
            <CustomDropDown style={webStyle.profileStyle}  endAdornment={<ExpandMoreIcon />} options={configJSON.profileType} selectedItem={selectedProfile} selectNewItem={this.handleLogoutModal} data-test-id="profile"/>
            </ProfileButton>
         </div>}
         {!!this.props.contributorPortfolio && 
         <div style={{display:"flex", justifyContent:"space-between", width:"100%"}} >
      <Tabs style={webStyle.leftContainer}>
        <Tab label="Earnings" />
        <Tab label="Portfolio" style={webStyle.portfolioTab}/>
        <Tab label="Insights" />
        <Tab label="request" />
      </Tabs>
      <div style={webStyle.rightContainer} >
      <CustomButton variant="primary" size="large" fullWidth="fullWidth" onClick={this.props.goToUpload}> upload</CustomButton>
         <LanguageSelector aria-controls="simple-menu" aria-haspopup="true">
         <CustomDropDown startAdornment = {<img src={images.language} />} variant = "dropdownLanguage" endAdornment={<ExpandMoreIcon />} options={configJSON.assestType} selectedItem={selectedLanguage} selectNewItem={this.handleLanguageChange}/>
            </LanguageSelector>
          <ProfileButton aria-controls="simple-menu" aria-haspopup="true" >
            <CustomDropDown variant = "dropdownProfile" style={webStyle.profileStyle} endAdornment={<img src={images.profile}/>} options={configJSON.profileType} selectedItem={selectedProfile} selectNewItem={this.handleLogoutModal}/>
            </ProfileButton>
            </div>
         </div>}
         
        </Toolbar>
      </AppBar>
     {!!!this.props.contributorLogin && <Drawer
        style={webStyle.drawer}
        anchor="left"
        open={drawerOpen}
        data-test-id="handleDrawerClose"
        onClose={this.handleDrawerClose}
        classes={{
          paper: webStyle.drawerPaper,
        }}
      >
        <List>
            <ListItem button onClick={this.handleDrawerClose}>
                <img src={images.logo}/>
            </ListItem>
            <ListItem button onClick={this.handleDrawerClose}>
                <CustomLink
                    variant={'primary'}
                    url={'#'}
                    component={'body3'}
                    textTransform={'uppercase'}
                >
                    BLOG
                </CustomLink>
            </ListItem>
            <ListItem button onClick={this.handleDrawerClose}>
                <CustomLink
                    variant={'primary'}
                    url={'#'}
                    component={'body3'}
                    textTransform={'uppercase'}
                >
                    Support Centre
                </CustomLink>
            </ListItem>
            <ListItem button onClick={this.handleDrawerClose}>
                <CustomLink
                    variant={'primary'}
                    url={'#'}
                    component={'body3'}
                    textTransform={'uppercase'}
                >
                    by stock photos & videos
                </CustomLink>
            </ListItem>
            <ListItem button onClick={this.handleDrawerClose}>
                <div
                    style={webStyle.btn}
                >
                    <CustomModal
                        btnLabel='LOGIN'
                        closeBtn={true}
                        openProp={closeModalProp}
                        variant={'secondary'}
                        size={'medium'}
                        backRes={this.resetLogin}
                    >
                        {!closeLoginModal ?
                          <EmailAccountLoginBlock
                            navigation={this.props.navigation}
                            id={'signin'}
                            callBack={this.changeModalProp}
                            closeLogin={this.closeLogin}
                            roleType={1}
                        data-test-id="resetLogin"
                        forgetPasswordRoute='"/Contributor/forgot-password'
                          />
                        :
                          <EmailAccountRegistartion
                            navigation={this.props.navigation}
                            id={'signup'}
                            callBack={this.changeModalProp}
                            roleType={1}
                            closeSignup={this.closeSignup}
                          />
                        }
                    </CustomModal>
                </div>
            </ListItem>
            <ListItem button onClick={this.handleDrawerClose}>
                <div
                    style={webStyle.btn}
                >
                    <CustomModal
                        btnLabel='Sign up'
                        closeBtn={true}
                        openProp={closeModalProp}
                        variant={'primary'}
                        size={'medium'}
                        data-test-id="resetSignUp"
                        backRes={this.resetSignUp}
                    >
                        {closeSignupModal ?
                          <EmailAccountLoginBlock
                            navigation={this.props.navigation}
                            id={'signin'}
                            callBack={this.changeModalProp}
                            closeLogin={this.closeLogin}
                            roleType={1}
                            forgetPasswordRoute='/Contributor/forgot-password'
                          />
                        :
                          <EmailAccountRegistartion
                            navigation={this.props.navigation}
                            id={'signup'}
                            callBack={this.changeModalProp}
                            roleType={1}
                            data-test-id="closeSignup"
                            closeSignup={this.closeSignup}
                          />
                        }
                    </CustomModal>
                </div>
            </ListItem>
        </List>
      </Drawer>}

              {/* <ModalComponent
                                            open={logOutModal}
                                            maxWidth={530}
                                            maxHeight={508}
                                            modalMinHeight={'0px'}

                                        >
                                            <Grid>
                                            <Grid style={webStyle.submitModalContent}>
                                                
                                                <CustomTypography component="outfitBody4">{configJSON.logoutConfirmationText}</CustomTypography>
                                                <div style={webStyle.btnWidth}>
                                                    <div style={webStyle.widthBtns}>
                                                    <CustomButton variant="primary" fullWidth="fullWidth" size={"large"} onClick={this.props.handleSelect}>{configJSON.yes}</CustomButton>
                                                    </div>
                                                    <div style={webStyle.widthBtns}><CustomButton fullWidth="fullWidth" variant="secondary" size={"large"} onClick={this.closeLogOutModal} data-test-id="closeDeleteModal">{configJSON.cancel}</CustomButton>
                                                    </div></div>
                                            </Grid>
                                            </Grid>
                                        </ModalComponent> */}

                <ModalComponent open={logOutModal} maxWidth={541} maxHeight={300}>
                  <LogoutParentN>
                    <CustomTypograpyParentN>
                      <CustomTypography
                        variant={"primary"}
                        component={"body6"}
                        textTransform={"uppercase"}
                      >
                        {configJSON.title}
                      </CustomTypography>
                    </CustomTypograpyParentN>
                    <Divider variant="whiteDark"></Divider>
                    <ParentDivN>
                      <CustomTypograpyParent1N>
                        <CustomTypography variant={"secondary"} component={"body10"}>
                        {configJSON.subTitle}
                        </CustomTypography>
                      </CustomTypograpyParent1N>
                      <LogoutDivN>
                        <LogoutDivInnerN>
                          <CustomButton
                            onClick={() => this.closeLogOutModal()}
                            variant="secondary"
                            fullWidth="fullWidth"
                            data-test-id="handleOpenDelete1"
                            size={"medium"}
                          >
                          {configJSON.button1}
                          </CustomButton>
                        </LogoutDivInnerN>
                        <LogoutDivInnerN>
                          <CustomButton
                            variant="red"
                            fullWidth="fullWidth"
                            data-test-id="handleOpenDeleteNext"
                            size={"medium"}
                            onClick={this.props.handleSelect}
                          >
                          {configJSON.button}
                          </CustomButton>
                        </LogoutDivInnerN>
                      </LogoutDivN>
                    </ParentDivN>
                  </LogoutParentN>
                </ModalComponent>
            </div>
      </HeaderSection>
     
    );
    // Customizable Area End
  }
}

// Customizable Area Start

const HeaderSection=styled(Box)(
  {
    "& .MuiPaper-root":{
      boxShadow:"unset"
    }
  }
)
const ParentDivN = styled("div")({
  padding: "0px 32px",
});

const LogoutParentN = styled("div")({
  padding: "12px",
});

const CustomTypograpyParentN = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const CustomTypograpyParent1N = styled("div")({
  textAlign: "center",
  padding: "32px 0px",
  "@media(max-width:600px)": {
    "& br": {
      display: "none",
    },
  },
});

const LogoutDivN = styled("div")({
  display: "flex",
  gap: "24px",
});

const LogoutDivInnerN = styled("div")({
  width: "100%",
});

// Customizable Area End
