import React from "react";

//Customizable Area Start
import ForgotPasswordContributorController, {
  Props,
  configJSON
} from "./ForgotPasswordContributorController";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import { emailIcon } from "./assets";
import Header from "../../../components/src/DesignSystem/ContributorHeader/ContributorHeader.web";
import Alert from "../../../components/src/Alert/Alert.web";
import {IconButton} from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
//Customizable Area End

export default class ForgotPasswordContributor extends ForgotPasswordContributorController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    //Customizable Area Start
    const {
      disabled,
      loading,
      mailSent,
      email,
      emailHelperText,
      emailInputError,
      error,
      errorText
    } = this.state;
    //Customizable Area End
    return (
      //Customizable Area Start
      <div>
        <Header
          testID="header"
          navigation=""
          classNameProps={""}
          contributorLogin={false}
          languageOptions={configJSON.arrOfLanguages}
          selectedLanguage={this.state.selectedLanguage}
          handleChangeLanguage={this.handleChangeLanguage}
          languageDropdown = {true}
        />
        <div style={webStyles.positionRelative}>
          {error ? (
            <Alert variant={"error"} noMarginTop={true}>
              {errorText}
            </Alert>
          ) : null}
          {mailSent ? (
            <div style={webStyles.msgWrapper}>
              <div style={webStyles.iconWrap}>
                <img src={emailIcon} style={webStyles.icon} />
              </div>
              <div style={webStyles.mt15}>
                <CustomTypography
                  variant={"primary"}
                  component={"h5"}
                  textTransform={"uppercase"}
                  weight="semiLight"
                >
                  ALMOST THERE! CHECK YOUR INBOX
                </CustomTypography>
              </div>
              <div style={webStyles.mt15}>
                <CustomTypography
                  variant={"secondary"}
                  component={"h5"}
                  textTransform={"none"}
                  weight="light"
                >
                  Confirm your identity by clicking the link I sent to {this.state.email}.
                </CustomTypography>
              </div>
              <div style={webStyles.mt15}>
                <CustomButton
                  variant="primary"
                  fullWidth="fullWidth"
                  size={"large"}
                  testId="btnSendLink"
                >
                  OPEN EMAIL
                </CustomButton>
              </div>
            </div>
          ) : (
            <div style={webStyles.parentWrapper}>
              <div style={webStyles.cardWrap}>
                <CustomCard>
                    <div style={webStyles.closeIconConatiner}>
                      <IconButton style={webStyles.iconColor} onClick={this.handleRedirectToLogin}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  <div style={webStyles.cardInnerWrapper}>
                    <div style={webStyles.cardHead}>
                      <CustomTypography
                        variant={"primary"}
                        component={"subtitle2"}
                        textTransform={"uppercase"}
                      >
                        FORGOT YOUR PASSWORD?
                      </CustomTypography>
                    </div>
                    <div style={webStyles.dividerWrap}>
                      <Divider variant="primary" margin="noMargin" />
                    </div>
                    <div style={webStyles.descWrap}>
                      <CustomTypography
                        variant="secondary"
                        component={"body2"}
                        textTransform={"none"}
                      >
                        Enter your email address below and we'll send you a link
                        to reset your password.
                      </CustomTypography>
                    </div>
                    <div style={webStyles.inputWrap}>
                      <Input
                        label="Enter Email"
                        value={email}
                        onChange={this.handleChange}
                        error={emailInputError}
                        helperText={emailHelperText}
                        type="text"
                        name="email"
                        required
                        testId="txtInputEmail"
                      />
                    </div>
                    <div>
                      <CustomButton
                        variant="primary"
                        fullWidth="fullWidth"
                        size={"large"}
                        testId="btnSendLink"
                        disabled={disabled}
                        loading={loading}
                        onClick={this.handleSendLink}
                      >
                        SEND RESET LINK
                      </CustomButton>
                    </div>
                  </div>
                </CustomCard>
              </div>
            </div>
          )}
        </div>
      </div>
      //Customizable Area End
    );
  }
}

//Customizable Area Start
const webStyles: any = {
  parentWrapper: {
    minHeight: "calc(100vh - 72px)",
    background: "#f3f4f4",
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardWrap: {
    minHeight: "367px"
  },
  cardInnerWrapper: {
    maxWidth: "568px",
    padding: "16px 75px 35px 75px",
    maxHeight: "367px",
    minHeight: "367px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  dividerWrap: {
    overflow: "hidden"
  },
  cardHead: {
    display: "flex",
    justifyContent: "center"
  },
  descWrap: {
    marginTop: "24px"
  },
  inputWrap: {
    marginTop: "16px"
  },
  msgWrapper: {
    minHeight: "calc(100vh - 128px)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  iconWrap: {
    height: "144px",
    width: "144px"
  },
  icon: {
    width: "100%",
    height: "100%"
  },
  mt15: {
    marginTop: "15px"
  },
  positionRelative: {
    postion: "relative"
  },
  marginNone:{
    margin:"0 !impoertant"
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
