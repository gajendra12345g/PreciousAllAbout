import React from "react";
// Customizable Area Start
import {
  Box,
  Divider,
  Grid,
  styled,
  TextareaAutosize,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import ContactusController, { configJSON, Props } from "./ContactusController";
import Header from "../../../components/src/DesignSystem/ContributorHeader/ContributorHeader.web";
import NormalHeader from "../../../components/src/DesignSystem/Header/Header.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import { facebook, instagram, linkedin, twitter } from "./assets";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
// Customizable Area End
// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});
// Customizable Area End

export default class Contactus extends ContactusController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Customizable Area End
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Box>
          {this.state.pageName === "Contactus" ? (
            <Box style={webStyles.header}>
              <NormalHeader
                testID={""}
                navigation={undefined}
                classNameProps={undefined}
              />
            </Box>
          ) : (
            <Header contributorLogin={true} />
          )}
          <Main style={webStyles.main}>
            <Box style={webStyles.headerContainer}>
              <CustomTypography variant="primary" component="heading2">
                {configJSON.contactUs}
              </CustomTypography>
            </Box>
            <Grid container style={webStyles.container}>
              <Grid item xs={12} md={4}>
                <Box>
                  <Box>
                    <CustomTypography
                      variant="secondary"
                      component="labelOutfit1"
                    >
                      {configJSON.callUs}
                    </CustomTypography>
                    <Box style={webStyles.mt24}>
                      <CustomTypography
                        variant="primary"
                        component="outfitHeading1"
                      >
                        {configJSON.callUs1}
                      </CustomTypography>
                    </Box>
                  </Box>
                  <Box style={webStyles.mt40}>
                    <CustomTypography
                      variant="secondary"
                      component="labelOutfit1"
                    >
                      {configJSON.emailUs}
                    </CustomTypography>
                    <Box style={webStyles.mt24}>
                      <CustomTypography
                        variant="primary"
                        component="outfitHeading1"                      >
                        {configJSON.emailUs1}
                      </CustomTypography>
                    </Box>
                  </Box>
                  <Box style={webStyles.mt40}>
                    <CustomTypography
                      variant="secondary"
                      component="labelOutfit1"
                    >
                      {configJSON.address}
                    </CustomTypography>
                    <Box style={webStyles.mt24}>
                      <CustomTypography
                        variant="primary"
                        component="outfitHeading1"
                      >
                        {configJSON.address1}
                      </CustomTypography>
                    </Box>
                  </Box>
                  <Box style={webStyles.mt40}>
                    <CustomTypography
                      variant="secondary"
                      component="labelOutfit1"
                    >
                      {configJSON.social}
                    </CustomTypography>
                    <Box style={{ ...webStyles.flex, ...webStyles.mt24 }}>
                      <a href={'https://twitter.com/?lang=en'} target={'_blank'}>
                        <img src={twitter} />
                      </a>
                      <a href={'https://www.instagram.com'} target={'_blank'}>
                        <img src={instagram} />
                      </a>
                      <a href={'https://www.linkedin.com'} target={'_blank'}>
                        <img src={linkedin} />
                      </a>
                      <a href={'https://www.facebook.com'} target={'_blank'}>
                        <img src={facebook} />
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={1}>
                <Divider orientation="vertical" style={webStyles.divider} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <CustomTypography
                    variant="primary"
                    component="lemonHeading3"
                  >
                    {configJSON.talk}
                  </CustomTypography>
                  <Box style={webStyles.subHeading}>
                    <CustomTypography>{configJSON.talk1}</CustomTypography>
                  </Box>
                  <form onSubmit={this.handleAddQuery}>
                    <Box style={webStyles.formConatiner}>
                      <StyledBox1>
                        <Input
                          label="Name"
                          value={this.state.name}
                          onChange={this.handleChangeName}
                          type="text"
                          name="name"
                          required
                          testId="txtInputEmail"
                          textTransform="capitalize"
                        />
                      </StyledBox1>
                      <StyledBox1 style={webStyles.inputContainer}>
                        <Input
                          label="Email address"
                          value={this.state.email}
                          onChange={this.handleChangeEmail}
                          type="email"
                          name="email"
                          required
                          textTransform="capitalize"
                          testId="txtInputEmail"
                          error={this.state.inValidEmail}
                          helperText={this.state.errorEmail}
                        />
                      </StyledBox1>
                      <Box style={webStyles.inputContainer}>
                        <div style={webStyles.label}>
                          {configJSON.contactNum}
                        </div>
                        <StyledPhoneInput1
                          country={"in"}
                          value={this.state.phoneNumber}
                          onChange={this.setPhoneNumber}
                          placeholder={''}
                        />
                        <Box style={webStyles.error}>
                          {this.state.errorNumber && (
                            <CustomTypography
                              variant="red"
                              component="outfitBody3"
                            >
                              {this.state.errorNumber}
                            </CustomTypography>
                          )}
                        </Box>
                      </Box>
                      <StyledBox1 style={webStyles.inputContainer}>
                        <Input
                          label="Subject"
                          value={this.state.subject}
                          onChange={this.handleChangeSubject}
                          type="text"
                          name="subject"
                          required
                          testId="txtInputEmail"
                          placeholder={configJSON.subject}
                          textTransform="capitalize"
                        />
                      </StyledBox1>
                      <Box style={webStyles.inputContainer}>
                        <div style={webStyles.label}>{configJSON.details}</div>
                        <StyledTextareaAutosize1
                          minRows={4}
                          style={{ width: "100%", padding:10 }}
                          value={this.state.summary}
                          onChange={this.handleChangeSummary}
                          placeholder={configJSON.about}
                        />
                      </Box>
                      <Box style={webStyles.inputContainer}>
                        <Box style={webStyles.btnContainer}>
                          <CustomButton
                            variant="primary"
                            fullWidth="fullWidth"
                            type="submit"
                          >
                            {configJSON.sendMsg}
                          </CustomButton>
                        </Box>
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Grid>
            </Grid>
            <CustomSnackBar
              open={this.state.RequestSnack}
              onClose={this.handleCloseRequestSnack}
              title={configJSON.requestTitle}
              subTitle={configJSON.requestSubTitle}
              data-test-id="handleCloseRequestSnack"
            />
          </Main>
        </Box>
      </ThemeProvider>
      // Customizable Area End
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start

const webStyles: any = {
  header: {
    borderBottom: "1px solid #C4C4C4",
  },
  headerContainer: {
    marginTop: "2.75rem",
    textAlign: "center",
  },
  container: {
    marginTop: "3rem",
    justifyContent: "center",
    marginBottom: "3rem",
  },
  divider: {
    backgroundColor: "#BFC2C3",
    margin: "auto",
    width: "1px",
  },
  contentContainer: {
    maxWidth: "27.6rem",
    margin: "auto",
  },
  mt40: {
    marginTop: "2.5rem",
  },
  mt24: {
    marginTop: "1.5rem",
  },
  flex: {
    display: "flex",
    gap: "1.25rem",
  },
  subHeading: {
    marginTop: ".75rem",
  },
  formConatiner: {
    marginTop: "1.5rem",
  },
  inputContainer: {
    marginTop: "1rem",
  },
  label: {
    fontFamily: "Outfit",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
    color: "#64748B",
    marginBottom: "6px",
  },
  btnContainer: {
    maxWidth: "13.25rem",
  },
  error: {
    padding: "10px 0px 0px 10px",
  },
};

const Main = styled(Box)({
  "@media(max-width:959px)": {
    paddingInline: "20px",
  },
});

const StyledTextareaAutosize1 = styled(TextareaAutosize)({
  outline: "none",
  fontSize:"16px",
  fontWeight:400,
  borderColor:"lightgrey",
  '&::placeholder': {
    color: '#999',
  },
});

const StyledPhoneInput1 = styled(PhoneInput)({
  "& .form-control": {
    width: "100% !important",
    height: "3.2rem",
    borderRadius: '0px'
  },
});

const StyledBox1 = styled(Box)({
  "& .label": {
    fontFamily: "Outfit",
    fontSize: "14px !important",
    fontWeight: 600,
    color: "#64748B !important",
  },
});

// Customizable Area End
