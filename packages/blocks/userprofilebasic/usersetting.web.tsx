import React from "react";
// Customizable Area Start
import { createTheme } from "@material-ui/core/styles";
import Header from "../../../components/src/DesignSystem/Header/Header.web";
import {
  Box,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  styled,
  Divider
} from "@material-ui/core";
import UserProfileSettingController, {
  Props
} from "./UserProfileSettingController";
import ProfileSideBar from "../../../components/src/DesignSystem/ProfileSideBar/ProfileSideBar.web";
import Footer from "../../../components/src/DesignSystem/Footer/Footer.web";
import CustomSwitch from "../../../components/src/DesignSystem/CustomSwitch/CustomSwitch";
// Customizable Area End

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff"
    }
  },
  typography: {
    h6: {
      fontSize: "12px",
      fontWeight: 500,
      color: "#0E0F17"
    },
    subtitle1: {
      fontSize: "10px",
      fontWeight: 500,
      color: "#0E0F17"
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 400,
      color: "#0E0F17",
      fontFamily: "Outfit",
      lineHeight: 2.5
    }
  }
});

const Main = styled(Box)({
  backgroundColor: "#F3F4F4"
});

const Container = styled(Grid)({
  padding: 32
});

const ManiInnerGrid = styled(Grid)({
  marginRight: "25px",
  "@media(max-width:959px)": {
    marginRight: "unset",
    marginBottom: "30px"
  }
});

const MainBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gridGap: "24px",
  width: "Auto",
  height: "Auto"
});

const MiddleContainer = styled(Paper)({
  padding: 32,
  maxWidth: 580
});
// Customizable Area End

export default class UserProfileSetting extends UserProfileSettingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const classNameprops = "";

    return (
      <>
        <ThemeProvider theme={theme}>
          <Header testID={""} navigation={""} classNameProps={classNameprops} />
          <Main>
            <Container container>
              <ManiInnerGrid item xs={12} sm={12} md={3}>
                <ProfileSideBar
                  name="JHON"
                  username="@user011"
                  activeTab={1}
                  navigation={this.props.navigation}
                />
              </ManiInnerGrid>
              <Grid item xs={12} sm={12} md={6}>
                <MainBox>
                  <MiddleContainer>
                    <Box style={webStyles.notificationPreferenceSectionHearder}>
                      <Typography variant="h6">
                        NOTIFICATION PREFERENCES
                      </Typography>
                    </Box>
                    <Divider style={webStyles.notificationPreferenceSection} />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: this.state.newContent ? "bold" : "normal"
                        }}
                      >
                        NEW CONTENT
                      </Typography>
                    </Box>
                    <Box style={webStyles.notificationPreferenceSection}>
                      <Typography variant="subtitle2">
                        Receive notifications when new content is uploaded.
                      </Typography>
                      <CustomSwitch
                        checked={this.state.newContent}
                        onChange={this.onChangeNewContent}
                        data-testId="switch_newContent"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: this.state.updates ? "bold" : "normal"
                        }}
                      >
                        UPDATES
                      </Typography>
                    </Box>
                    <Box style={webStyles.notificationPreferenceSection}>
                      <Typography variant="subtitle2">
                        Receive notifications when new content is uploaded.
                      </Typography>
                      <CustomSwitch
                        checked={this.state.updates}
                        onChange={this.onChangeUpdates}
                        data-testId="switch_updates"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: this.state.specialOffer
                            ? "bold"
                            : "normal"
                        }}
                      >
                        SPECIAL OFFER & PROMOTIONS
                      </Typography>
                    </Box>
                    <Box style={webStyles.notificationPreferenceSection}>
                      <Typography variant="subtitle2">
                        Receive notifications when new content is uploaded.
                      </Typography>
                      <CustomSwitch
                        checked={this.state.specialOffer}
                        onChange={this.onChangeSpecialOffer}
                        data-testId="switch_special"
                      />
                    </Box>
                  </MiddleContainer>
                  <MiddleContainer>
                    <Box style={webStyles.notificationPreferenceSectionHearder}>
                      <Typography variant="h6">
                        COMMUNICATION PREFERENCES
                      </Typography>
                    </Box>
                    <Divider style={webStyles.notificationPreferenceSection} />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: this.state.inAppNotification
                            ? "bold"
                            : "normal"
                        }}
                      >
                        IN-APP NOTIFICATION
                      </Typography>
                    </Box>
                    <Box style={webStyles.notificationPreferenceSection}>
                      <Typography variant="subtitle2">
                        Communicate via in-app notifications{" "}
                      </Typography>
                      <CustomSwitch
                        checked={this.state.inAppNotification}
                        onChange={this.onChangeInAppNotification}
                        data-testId="switch_inApp"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: this.state.emailNotification
                            ? "bold"
                            : "normal"
                        }}
                      >
                        EMAIL NOTIFICATIONS
                      </Typography>
                    </Box>
                    <Box style={webStyles.notificationPreferenceSection}>
                      <Typography variant="subtitle2">
                        Communicate via email notifications
                      </Typography>
                      <CustomSwitch
                        checked={this.state.emailNotification}
                        onChange={this.onChangeEmailNotification}
                        data-testId="switch_email"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: this.state.both ? "bold" : "normal"
                        }}
                      >
                        BOTH
                      </Typography>
                    </Box>
                    <Box style={webStyles.notificationPreferenceSection}>
                      <Typography variant="subtitle2">
                        Communicate via both in-app and email notifications
                      </Typography>
                      <CustomSwitch
                        checked={this.state.both}
                        onChange={this.onChangeBoth}
                        data-testId="switch_both"
                      />
                    </Box>
                  </MiddleContainer>
                </MainBox>
              </Grid>
            </Container>
          </Main>
          <Footer userType={"normal"} />
        </ThemeProvider>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {
  notificationPreferenceSectionHearder: {
    marginBottom: "16px"
  },
  notificationPreferenceSection: {
    marginBottom: "32px",
    display: "flex",
    justifyContent: "space-between"
  },
  bold: {
    fontWeight: "bold"
  }
};
// Customizable Area End
