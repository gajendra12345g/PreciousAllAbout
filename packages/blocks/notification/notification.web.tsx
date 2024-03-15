import React from "react";

// Customizable Area Start
import { Box, styled } from "@material-ui/core";
import customTheme from "../../../components/src/DesignSystem/Theme/Theme.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import { notificationIcon } from "./assets";
import Header from "../../../components/src/DesignSystem/Header/Header.web";
// Customizable Area End

import NotificationsController, {
  Props,
  configJSON,
} from "./NotificationsController";

export default class Notifications extends NotificationsController {
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
        <Header testID={""} navigation={undefined} classNameProps={undefined} />
        <MainBox1>
          <MainBox11>
            <TitleBox1>
              <CustomTypography component="body19">
                {configJSON.Notifications}
              </CustomTypography>
            </TitleBox1>
            <PopUpMenuItem1>
              {this.allNotification1.map((item: any, index: any) => (
                <>
                  <InnerPOpUpMenu1 key={index}>
                    <img src={notificationIcon} alt="notifiction" />
                    <InnerPOpUpMenu11>
                      <InnerPOpUpMenu21>
                        <CustomTypography component="body17">
                          {item.message}
                        </CustomTypography>
                        <CustomTypography component="body18">
                          {item.message1}
                        </CustomTypography>
                      </InnerPOpUpMenu21>
                      <CustomTypography component="body16">
                        {item.time_stemp}
                      </CustomTypography>
                    </InnerPOpUpMenu11>
                  </InnerPOpUpMenu1>
                  <Divider variant="grey" />
                </>
              ))}
              <InnerPOpUpMenu31>
                <CustomButton
                  variant="blue"
                  fullWidth="fullWidth"
                  size={"medium"}
                >
                  {configJSON.buttonClear}
                </CustomButton>
              </InnerPOpUpMenu31>
            </PopUpMenuItem1>
          </MainBox11>
        </MainBox1>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

const MainBox1 = styled(Box)({
  backgroundColor: "#F3F4F4",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const MainBox11 = styled(Box)({
  backgroundColor: customTheme.palette.white.main,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "620px",
  margin: "30px 0px",
});

const TitleBox1 = styled(Box)({
  padding: "30px",
});

const PopUpMenuItem1 = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  backgroundColor: `${customTheme.palette.white.main}!important`,
});

const InnerPOpUpMenu1 = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  padding: "5px 100px 5px 20px",
});

const InnerPOpUpMenu11 = styled(Box)({
  marginLeft: "12px",
});

const InnerPOpUpMenu21 = styled(Box)({
  display: "flex",
});

const InnerPOpUpMenu31 = styled(Box)({
  width: "100%",
});

// Customizable Area End
