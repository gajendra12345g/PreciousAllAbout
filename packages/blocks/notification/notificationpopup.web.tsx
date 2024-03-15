import React from "react";

// Customizable Area Start
import { Box, Menu, MenuItem, styled } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { notificationIcon } from "./assets";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import customTheme from "../../../components/src/DesignSystem/Theme/Theme.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
// Customizable Area End

import NotificationsController, {
  Props,
  configJSON,
} from "./NotificationsController";

export default class Notification extends NotificationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <>
        <NotificationsNoneIcon
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleNotifiction}
        />
        <PopUpMenu
          id="simple-menu"
          anchorEl={this.state.setAnchorElNotification}
          keepMounted
          open={Boolean(this.state.setAnchorElNotification)}
          onClose={this.handleCloseNotication}
        >
          <PopUpMenuItem>
            {this.allNotification.map((item: any, index: any) => (
              <>
                <InnerPOpUpMenu key={index}>
                  <img src={notificationIcon} alt="notifiction" />
                  <InnerPOpUpMenu1>
                    <InnerPOpUpMenu2>
                      <CustomTypography component="body17">
                        {item.message}
                      </CustomTypography>
                      <CustomTypography component="body18">
                        {item.message1}
                      </CustomTypography>
                    </InnerPOpUpMenu2>
                    <CustomTypography component="body16">
                      {item.time_stemp}
                    </CustomTypography>
                  </InnerPOpUpMenu1>
                </InnerPOpUpMenu>
                <Divider variant="grey" />
              </>
            ))}
            <InnerPOpUpMenu3>
              <CustomButton
                variant="blue"
                fullWidth="fullWidth"
                size={"medium"}
                onClick={this.handleNavigation}
              >
                {configJSON.button}
              </CustomButton>
            </InnerPOpUpMenu3>
          </PopUpMenuItem>
        </PopUpMenu>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const PopUpMenu = styled(Menu)({
  "& .MuiPopover-paper": {
    top: "75px!important",
    maxWidth: "200px",
    left: "unset!important",
    right: "182px",
    borderRadius: 0,
    minWidth: "fit-content",
    padding: 0,
  }, 
   "& .MuiList-padding": {
    paddingBottom: "0px!important",
  }, 
 "&::before": {
    content: "''",
    position: "absolute",
    top: 70,
    right: 200,
    borderTop: "14px solid transparent",
    borderRight: "14px solid white",
    transform: 'rotate(225deg)',
  },
  "@media (max-width: 900px)": {
    "& .MuiPopover-paper": {
      right: "40px!important",
    },
    "&::before": {
      right: 150,
    }
  },
});

const PopUpMenuItem = styled(MenuItem)({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "self-end",
  backgroundColor: `${customTheme.palette.white.main}!important`,
  minHeight: "350px",
  padding:0,
});

const InnerPOpUpMenu = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  padding: "5px 40px 5px 15px",
});

const InnerPOpUpMenu1 = styled(Box)({
  marginLeft: "12px",
});

const InnerPOpUpMenu2 = styled(Box)({
  display: "flex",
  "@media(max-width:900px)":{
    flexDirection:"column"
  }
});

const InnerPOpUpMenu3 = styled(Box)({
  width: "100%",
  position: "absolute",
  bottom: 0,
});
// Customizable Area End
