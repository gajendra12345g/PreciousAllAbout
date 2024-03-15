import React from "react";

//Customizable Area Start
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import ResetPasswordContributorController, {
  Props,
  configJSON
} from "./ResetPasswordContributorController";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import PasswordStrength from "../../../components/src/DesignSystem/PasswordStrength/PasswordStrength.web";
import Header from "../../../components/src/DesignSystem/ContributorHeader/ContributorHeader.web";
import Alert from "../../../components/src/Alert/Alert.web";
import {IconButton} from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
//Customizable Area End

export default class ResetPasswordContributor extends ResetPasswordContributorController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    //Customizable Area Start
    //Customizable Area End
    return (
      //Customizable Area Start
      <div>
        <Header
          testID="header"
          classNameProps={""}
          languageOptions={configJSON.arrOfLanguages}
          navigation=""
          contributorLogin={false}
          selectedLanguage={this.state.selectedLanguage}
          handleChangeLanguage={this.handleChangeLanguage}
          languageDropdown = {true}
        />

        <div style={webStyles.positionRelative}>
          {this.state.error ? (
            <Alert variant={"error"} noMarginTop={true}>
              {this.state.errorText}
            </Alert>
          ) : null}

          <div style={webStyles.containerWrapper}>
            <div style={webStyles.cardContainerWrapper}>
              <CustomCard>
              <div style={webStyles.closeIconConatiner}>
                      <IconButton style={webStyles.iconColor} onClick={this.handleRedirectToLogin}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                <div style={webStyles.cardInnerWrappper}>
                  <div style={webStyles.cardLabel}>
                    <CustomTypography
                      variant={"primary"}
                      component={"subtitle2"}
                      textTransform={"uppercase"}
                    >
                      Reset password
                    </CustomTypography>
                  </div>
                  <div style={webStyles.divideWrapper}>
                    <Divider variant="primary" />
                  </div>
                  <div style={webStyles.textFieldWrappert}>
                    <Input
                      label="Enter Email"
                      value={this.state.email}
                      onChange={this.handleChangeInput}
                      error={this.state.emailInputError}
                      required
                      type="text"
                      helperText={this.state.emailHelperText}
                      name="email"
                      testId="txtInputEmail"
                    />
                  </div>
                  <div style={webStyles.textFieldWrappert}>
                    <Input
                      label="New Password"
                      value={this.state.password}
                      error={this.state.passwordError}
                      helperText={this.state.passwordHelperText}
                      onChange={this.handleChangeInput}
                      name="password"
                      type="password"
                      testId="txtInputPwd"
                      required
                    />
                  </div>
                  <div style={webStyles.textFieldWrappert}>
                    <Input
                      label="Confirm Password"
                      value={this.state.confirmPwd}
                      onChange={this.handleChangeInput}
                      error={this.state.confirmPwdError}
                      helperText={this.state.confirmPwdHelperText}
                      type="password"
                      name="confirmPwd"
                      required
                      testId="confirmPwd"
                    />
                  </div>

                  <div style={webStyles.mt15}>
                    <PasswordStrength
                      variant={"secondary"}
                      password={this.state.password}
                      confirmPwd={this.state.confirmPwd}
                    />
                  </div>

                  <div style={webStyles.mt15}>
                    <CustomButton
                      onClick={this.handleReset}
                      variant="primary"
                      fullWidth="fullWidth"
                      size={"large"}
                      testId="btnResetPwd"
                      disabled={this.state.disabled}
                      loading={this.state.loading}
                    >
                      Reset Password
                    </CustomButton>
                  </div>
                </div>
              </CustomCard>
            </div>
          </div>
        </div>
      </div>
      //Customizable Area End
    );
  }
}

//Customizable Area Start
const webStyles: any = {
  containerWrapper: {
    width: "100%",
    minHeight: "calc(100vh - 72px)",
    background: "#f3f4f4",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  cardContainerWrapper: {
    minHeight: "367px"
  },
  cardInnerWrappper: {
    width: "568px",
    padding: "16px 75px 35px 75px",
    minHeight: "367px",
    display: "flex",
    maxHeight: "auto",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "50px",
  },
  cardLabel: {
    display: "flex",
    justifyContent: "center"
  },
  divideWrapper: {
    overflow: "hidden"
  },
  textFieldWrappert: {
    marginTop: "30px"
  },
  mt15: {
    marginTop: "15px"
  },
  closeIconConatiner:{
    paddingTop:"24px",
    display:"flex",
    justifyContent:"end",
    marginRight:"24px",
  },
  iconColor:{
    color:"black"
  }
};
//Customizable Area End
