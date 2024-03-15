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
  Divider,
  IconButton
} from "@material-ui/core";
import UserProfilePrivacyAndSecurityController, {
  Props,
  configJSON
} from "./UserProfilePrivacyAndSecurityController";
import ProfileSideBar from "../../../components/src/DesignSystem/ProfileSideBar/ProfileSideBar.web";
import Footer from "../../../components/src/DesignSystem/Footer/Footer.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import CustomRadioButton from "../../../components/src/DesignSystem/CustomRadioButton/CustomRadioButton";
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
import PasswordStrength from "../../../components/src/DesignSystem/PasswordStrength/PasswordStrength.web";
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
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      color: "#0E0F17"
    }
  }
});

const Main = styled(Box)({
  backgroundColor: "#F3F4F4"
});

const Container = styled(Grid)({
  padding: 32,
  flexWrap: "nowrap",
  "@media(max-width:965px)": {
    flexWrap: "wrap"
  }
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

const MiddleGrid = styled(Grid)({
  maxWidth: "700px"
});

const MiddleContainer = styled(Paper)({
  padding: 32,
  maxWidth: 580
});

const MiddleContainerHidden = styled(Paper)({
  padding: 32,
  maxWidth: 580,
  display: "none",
  "@media(max-width:965px)": {
    display: "block"
  }
});

const RightContainer = styled(Paper)({
  padding: 32,
  maxWidth: 340
});

const StyledGrid = styled(Grid)({
  "@media(max-width:965px)": {
    display: "none"
  }
});

// Customizable Area End

export default class UserProfilePrivacyAndSecurity extends UserProfilePrivacyAndSecurityController {
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
                  name={this.state.name}
                  username={this.state.userName}
                  activeTab={3}
                  navigation={this.props.navigation}
                  profileImage={this.state.profileImg}
                />
              </ManiInnerGrid>
              <MiddleGrid item xs={12} sm={12} md={6} lg={6}>
                <MainBox>
                  <MiddleContainer>
                    <Box style={webStyles.header}>
                      <Typography variant="h6">UPDATE PASSWORD</Typography>
                    </Box>
                    <Divider style={webStyles.marginBottom} />
                    <form onSubmit={this.handleSavePassword}>
                      <Box style={webStyles.marginBottom}>
                        <Input
                          label="Old Password"
                          value={this.state.oldPassword}
                          onChange={this.handleChangePassword}
                          type="password"
                          name="password"
                          required
                          testID="txtInputOldPass"
                          error={this.state.isOldPasswordError}
                          helperText={this.state.oldPasswordErrorMessage}
                        />
                      </Box>
                      <Box style={webStyles.marginBottom}>
                        <Input
                          label="New Password"
                          value={this.state.newPassword}
                          onChange={this.handleNewPassword}
                          type="password"
                          name="password"
                          required
                          testID="txtInputNewPass"
                        />
                      </Box>

                      <Box style={webStyles.marginBottom}>
                        <Input
                          label="Confirm Password"
                          value={this.state.confirmNewPassword}
                          onChange={this.handleChangeConfirmPassword}
                          error={this.state.passwordMatchError}
                          helperText={this.state.passwordErrorMessage}
                          type="password"
                          name="password"
                          required
                          testID="txtInputConfirmPass"
                        />
                      </Box>
                      <Box style={webStyles.spaceBetween}>
                        <Box>
                          <IconButton>
                            <HelpOutlineIcon
                              style={{ width: 18, height: 18 }}
                            />
                          </IconButton>
                          <Typography variant="caption">
                            Trouble loging in?
                          </Typography>
                        </Box>
                        <Box style={webStyles.flexRow}>
                          <div style={webStyles.btnMarginRigth}>
                            <CustomButton
                              variant="secondary"
                              size={"small"}
                              style={webStyles.btnMarginRigth}
                              onClick={this.resetPassowrdFields}
                              type="button"
                            >
                              Cancel
                            </CustomButton>
                          </div>
                          <CustomButton
                            variant="primary"
                            size={"small"}
                            type="submit"
                          >
                            SAVE CHANGES
                          </CustomButton>
                        </Box>
                      </Box>
                    </form>
                  </MiddleContainer>
                  <MiddleContainerHidden>
                    <Box style={webStyles.header}>
                      <Typography variant="h6">
                        PASSWORD REQUIREMENTS
                      </Typography>
                    </Box>
                    <Divider style={webStyles.marginBottom} />

                    <PasswordStrength
                      variant={"secondary"}
                      password={this.state.newPassword}
                      confirmPwd={this.state.confirmNewPassword}
                      hideMatchPass={true}
                    />
                  </MiddleContainerHidden>
                  <MiddleContainer>
                    <Box style={webStyles.header}>
                      <Typography variant="h6">SET VISIBILITY</Typography>
                    </Box>
                    <Divider style={webStyles.marginBottom} />

                    <Box
                      style={{
                        ...webStyles.spaceBetween,
                        ...webStyles.marginBottom
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">PUBLIC</Typography>
                        <Typography variant="subtitle2">
                          Communicate via in-app notifications.
                        </Typography>
                      </Box>
                      <CustomRadioButton
                        onChange={this.handleSetVisibility}
                        checked={
                          this.state.visibility === configJSON.publicVisibility
                        }
                        value={configJSON.publicVisibility}
                      />
                    </Box>

                    <Box
                      style={{
                        ...webStyles.spaceBetween,
                        ...webStyles.marginBottom
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">Private</Typography>
                        <Typography variant="subtitle2">
                          Communicate via email notifications.
                        </Typography>
                      </Box>
                      <CustomRadioButton
                        onChange={this.handleSetVisibility}
                        checked={
                          this.state.visibility === configJSON.PrivateVisibility
                        }
                        value={configJSON.PrivateVisibility}
                      />
                    </Box>

                    <Box style={webStyles.spaceBetween}>
                      <Box>
                        <Typography variant="subtitle1">
                          FOLLOWERS ONLY
                        </Typography>
                        <Typography variant="subtitle2">
                          Communicate via both in-app and email notifications.
                        </Typography>
                      </Box>
                      <CustomRadioButton
                        onChange={this.handleSetVisibility}
                        checked={
                          this.state.visibility ===
                          configJSON.FollowersVisibility
                        }
                        value={configJSON.FollowersVisibility}
                      />
                    </Box>
                  </MiddleContainer>
                  <MiddleContainer>
                    <Box style={webStyles.header}>
                      <Typography variant="h6">SECURITY ALERT</Typography>
                    </Box>
                    <Divider style={webStyles.marginBottom} />
                    <Box
                      style={{
                        ...webStyles.spaceBetween,
                        ...webStyles.marginBottom
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">
                          IN-APP NOTIFICATION
                        </Typography>
                        <Typography variant="subtitle2">
                          Send security alerts via in-app notifications.
                        </Typography>
                      </Box>
                      <CustomRadioButton
                        onChange={this.handleAlert}
                        checked={
                          this.state.alertType ===
                          configJSON.inAppNotificationAlert
                        }
                        value={configJSON.inAppNotificationAlert}
                      />
                    </Box>
                    <Box style={webStyles.spaceBetween}>
                      <Box>
                        <Typography variant="subtitle1">EMAIL</Typography>
                        <Typography variant="subtitle2">
                          Send security alerts via email notifications.
                        </Typography>
                      </Box>

                      <CustomRadioButton
                        onChange={this.handleAlert}
                        checked={
                          this.state.alertType ===
                          configJSON.emailNotificationAlert
                        }
                        value={configJSON.emailNotificationAlert}
                      />
                    </Box>
                  </MiddleContainer>
                </MainBox>
              </MiddleGrid>
              <StyledGrid item xs={12} sm={12} md={3} lg={3}>
                <MainBox>
                  <RightContainer>
                    <Box style={webStyles.header}>
                      <Typography variant="h6">
                        PASSWORD REQUIREMENTS
                      </Typography>
                    </Box>
                    <Divider style={webStyles.marginBottom} />

                    <PasswordStrength
                      variant={"secondary"}
                      password={this.state.newPassword}
                      confirmPwd={this.state.confirmNewPassword}
                      hideMatchPass={true}
                    />
                  </RightContainer>
                </MainBox>
              </StyledGrid>
            </Container>
          </Main>
          <Footer userType={"normal"} />
          <CustomSnackBar
            open={this.state.passwordUpdateSuccessfully}
            onClose={this.handleCloseSnackBar}
            title={"Password changed successfully!"}
            subTitle={"You password has been updated."}
          />
        </ThemeProvider>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {
  header: {
    marginBottom: "16px"
  },
  marginBottom: {
    marginBottom: "32px"
  },
  bold: {
    fontWeight: "bold"
  },
  flexRow: {
    display: "flex"
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between"
  },
  btnMarginRigth: {
    marginRight: "5px"
  },
  typographyLineHeight: {
    lineHeight: 3
  }
};
// Customizable Area End
