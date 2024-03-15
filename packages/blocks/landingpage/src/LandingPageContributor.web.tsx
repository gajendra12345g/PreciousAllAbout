import React from "react";
import LandingPageContributorController, {
  Props,
  configJSON
} from "./LandingPageContributorController";
// Customizable Area Start
import { Box, Grid, styled } from "@material-ui/core";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import {
  arrContributorIcon,
  bgImageFooter,
  easyToolImg,
  communityImg,
  globalFamilyImg,
  cameraImg,
  bannerImg,
  workshopImg,
  shotListImg,
  contributorImg
} from "./assets";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomBanner from "../../../components/src/DesignSystem/CustomBanner/CustomBanner.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import CustomImageTextLayout from "../../../components/src/DesignSystem/CustomImageTextLayout/CustomImageTextLayout.web";
import CustomImgButton from "../../../components/src/DesignSystem/CustomImgButton/CustomImgButton.web";
import ContributorHeader from "../../../components/src/DesignSystem/ContributorHeader/ContributorHeader.web";
import Footer from "../../../components/src/DesignSystem/Footer/Footer.web";

// Customizable Area End
class ContributorLandingPage extends LandingPageContributorController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      <>
        <ContributorHeader navigation={this.props.navigation} showHeardNav ={true}/>
        <div>
          <CustomBanner variant={"medium"} backgroundImage={bannerImg}>
            <div>
              <CustomTypography 
                variant={"white"} 
                component={"h2"}
                textTransform={'uppercase'}
              >
                Unlock Earnings with QStock
              </CustomTypography>
            </div>
            <div style={webStyles.mt15}>
              <CustomTypography 
                variant={"white"} 
                component={"body1"}
                textTransform={'uppercase'}
              >
                Join the QStockMedia Contributor Community and Turn Your Passion
                into Profit
              </CustomTypography>
            </div>
            <div style={webStyles.buttonWidth}>
              <CustomButton
                variant={"secondaryWithoutBorder"}
                fullWidth="fullWidth"
                size={"large"}
              >
                Get Started
              </CustomButton>
            </div>
          </CustomBanner>
        </div>
        <MainDiv>
          <StyledContributorConatiner>
            <StyledContributorHeader>
              <CustomTypography
                textTransform="uppercase"
                variant="primary"
                component="h4"
              >
                become a contributor
              </CustomTypography>
            </StyledContributorHeader>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              {configJSON.becomeContributorSection.map(
                (details: any, index: number) => (
                  <Grid item key={index}>
                    <CustomCard variant="withBorder">
                      <StyledDiv>
                        <StyledImg
                          src={arrContributorIcon[index]}
                          alt="create"
                        />
                        <StyledContentConatiner>
                          <CustomTypography
                            variant="primary"
                            component="title2"
                          >
                            {details.header}
                          </CustomTypography>
                          <CustomTypography
                            component="body2"
                            variant="secondary"
                          >
                            {details.subHeading}
                          </CustomTypography>
                        </StyledContentConatiner>
                      </StyledDiv>
                    </CustomCard>
                  </Grid>
                )
              )}
            </Grid>
          </StyledContributorConatiner>
          <Box mt={15} mb={15}>
            <CustomImageTextLayout imgUrl={cameraImg} direction={"rtl"}>
              <div style={webStyles.mt15}>
                <CustomTypography
                  variant={"primary"}
                  component={"title2"}
                  textTransform={"uppercase"}
                >
                  Over $1 Billion Distributed
                </CustomTypography>
              </div>
              <div style={webStyles.mt15}>
                <CustomTypography variant={"secondary"} component={"body2"}>
                  In 15 Remarkable Years, We've Contributed Over a Billion
                  Dollars to Our Global Community of Talent.
                </CustomTypography>
              </div>
              <div style={webStyles.expBtn}>
                <CustomButton variant={"secondary"} fullWidth={"fullWidth"}>
                  Join Now
                </CustomButton>
              </div>
            </CustomImageTextLayout>
          </Box>
          <Box mt={15} mb={15}>
            <CustomImageTextLayout imgUrl={globalFamilyImg} direction={"ltr"}>
              <div style={webStyles.mt15}>
                <CustomTypography
                  variant={"primary"}
                  component={"title2"}
                  textTransform={"uppercase"}
                >
                  Join Our Global Family
                </CustomTypography>
              </div>
              <div style={webStyles.mt15}>
                <CustomTypography variant={"secondary"} component={"body2"}>
                  Showcase Your Talent, Expand Your Skills: Join Our Global
                  Community. Explore Tools, Tips, and Support to Maximize Your
                  Earnings as an Artist.
                </CustomTypography>
              </div>
              <div style={webStyles.expBtn}>
                <CustomButton variant={"secondary"} fullWidth={"fullWidth"}>
                  Join Now
                </CustomButton>
              </div>
            </CustomImageTextLayout>
          </Box>
          <Box mt={15} mb={15}>
            <CustomImageTextLayout imgUrl={easyToolImg} direction={"rtl"}>
              <div style={webStyles.mt15}>
                <CustomTypography
                  variant={"primary"}
                  component={"title2"}
                  textTransform={"uppercase"}
                >
                  Easy-to-use tools
                </CustomTypography>
              </div>
              <div style={webStyles.mt15}>
                <CustomTypography variant={"secondary"} component={"body2"}>
                  Effortlessly Upload, Showcase, and Profit. Create Your Unique
                  Portfolio, Portfolio, Track Earnings with Our Intuitive Tools.
                </CustomTypography>
              </div>
              <div style={webStyles.expBtn}>
                <CustomButton variant={"secondary"} fullWidth={"fullWidth"}>
                  Explore Tool
                </CustomButton>
              </div>
            </CustomImageTextLayout>
          </Box>
          <Box>
            <Box mb={4} style={webStyles.heading}>
              <CustomTypography
                variant={"primary"}
                component={"title2"}
                textTransform={"uppercase"}
              >
                View our resources
              </CustomTypography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <CustomImgButton url={workshopImg} variant={"medium"}>
                  <div style={webStyles.imgBtn}>
                    <CustomTypography 
                      variant={"white"} 
                      component={"body1"}
                      textTransform={'uppercase'}
                    >
                      Video workshop
                    </CustomTypography>
                    <CustomTypography 
                      variant={"white"} 
                      component={"body3"}
                    >
                      Learn from our experts
                    </CustomTypography>
                  </div>
                </CustomImgButton>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <CustomImgButton url={shotListImg} variant={"medium"}>
                  <div style={webStyles.imgBtn}>
                    <CustomTypography 
                      variant={"white"} 
                      component={"body1"}
                      textTransform={'uppercase'}
                    >
                      The shot list
                    </CustomTypography>
                    <CustomTypography variant={"white"} component={"body3"}>
                      What’s in demand now
                    </CustomTypography>
                  </div>
                </CustomImgButton>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <CustomImgButton url={contributorImg} variant={"medium"}>
                  <div style={webStyles.imgBtn}>
                    <CustomTypography 
                      variant={"white"} 
                      component={"body1"}
                      textTransform={'uppercase'}
                    >
                      Contributor Blog
                    </CustomTypography>
                    <CustomTypography variant={"white"} component={"body3"}>
                      Get inspired
                    </CustomTypography>
                  </div>
                </CustomImgButton>
              </Grid>
            </Grid>
          </Box>
          <Box mt={10}>
            <Box mb={4} style={webStyles.heading}>
              <CustomTypography
                variant={"primary"}
                component={"title2"}
                textTransform={"uppercase"}
              >
                Increase Your Earnings with Our Additional Contributor Platforms
              </CustomTypography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <CustomImgButton url={workshopImg}>
                  <div style={webStyles.imgBtn}>
                    <Box>
                      <CustomTypography
                        variant={"white"}
                        component={"title2"}
                        textTransform={"uppercase"}
                      >
                        Qstock editorial
                      </CustomTypography>
                    </Box>
                    <Box mt={1}>
                      <CustomTypography variant={"white"} component={"body2"}>
                        Top news, sports and entertainment content
                      </CustomTypography>
                    </Box>
                  </div>
                </CustomImgButton>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <CustomImgButton url={shotListImg}>
                  <div style={webStyles.imgBtn}>
                    <Box>
                      <CustomTypography
                        variant={"white"}
                        component={"title2"}
                        textTransform={"uppercase"}
                      >
                        Qstock custom
                      </CustomTypography>
                    </Box>
                    <Box mt={1}>
                      <CustomTypography variant={"white"} component={"body2"}>
                        Create custom content for brands
                      </CustomTypography>
                    </Box>
                  </div>
                </CustomImgButton>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <CustomImgButton url={contributorImg}>
                  <div style={webStyles.imgBtn}>
                    <Box>
                      <CustomTypography
                        variant={"white"}
                        component={"title2"}
                        textTransform={"uppercase"}
                      >
                        Qstock videos
                      </CustomTypography>
                    </Box>
                    <Box mt={1}>
                      <CustomTypography variant={"white"} component={"body2"}>
                        QStock Videos Your Source for Visual Excellence
                      </CustomTypography>
                    </Box>
                  </div>
                </CustomImgButton>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <CustomImgButton url={contributorImg}>
                  <div style={webStyles.imgBtn}>
                    <Box>
                      <CustomTypography
                        variant={"white"}
                        component={"title2"}
                        textTransform={"uppercase"}
                      >
                        offset by qstock
                      </CustomTypography>
                    </Box>
                    <Box mt={1}>
                      <CustomTypography variant={"white"} component={"body2"}>
                        Authentic imagery that inspires
                      </CustomTypography>
                    </Box>
                  </div>
                </CustomImgButton>
              </Grid>
            </Grid>
          </Box>
          <Box mt={15} mb={15}>
            <CustomImageTextLayout imgUrl={communityImg} direction={"ltr"}>
              <div style={webStyles.mt15}>
                <CustomTypography
                  variant={"primary"}
                  component={"title2"}
                  textTransform={"uppercase"}
                >
                  Worldwide Marketplace
                </CustomTypography>
              </div>
              <div style={webStyles.mt15}>
                <CustomTypography variant={"secondary"} component={"body2"}>
                  Qstock Connects Your Work with Millions Worldwide. Billboards
                  to Blockbusters, Your Content Travels the Globe.
                </CustomTypography>
              </div>
              <div style={webStyles.expBtn}>
                <CustomButton variant={"secondary"} fullWidth={"fullWidth"}>
                  Join Now
                </CustomButton>
              </div>
            </CustomImageTextLayout>
          </Box>
        </MainDiv>
        <div>
          <CustomBanner backgroundImage={bgImageFooter}>
            <div>
              <CustomTypography variant={"white"} component={"h2"}>
                Begin Earning Today
              </CustomTypography>
            </div>
            <div style={webStyles.mt15}>
              <CustomTypography variant={"white"} component={"body2"}>
                Contribute to Qstock Turn Your Passion into Profit
              </CustomTypography>
            </div>
            <div style={webStyles.buttonWidth}>
              <CustomButton
                variant={"secondaryWithoutBorder"}
                fullWidth="fullWidth"
                size={"large"}
              >
                Join Now
              </CustomButton>
            </div>
            <div style={webStyles.divider}>
              <Divider variant="white" />
            </div>
            <div style={webStyles.mt15}>
              <CustomTypography
                variant={"white"}
                component={"body2"}
                textTransform={"none"}
              >
                Already have an account? Sign in
              </CustomTypography>
            </div>
          </CustomBanner>
        </div>
        <Box>
          <Footer 
            userType={"contributor"} 
            navigation={this.props.navigation} 
            toNavigateGeneric={this.toContributorNavigateGeneric}
            data-test-id="toContributorNavigateGeneric"
          />
        </Box>
      </>
    );
  }
}

const webStyles: any = {
  mt15: {
    marginTop: "15px"
  },
  divider: {
    marginTop: "15px",
    width: "480px"
  },
  buttonWidth: {
    marginTop: "20px",
    width: "240px"
  },
  expBtn: {
    width: "212px",
    marginTop: "15px"
  },
  imgBtn: {
    display: "flex",
    flexDirection: "column"
  },
  heading: {
    display: "flex",
    justifyContent: "center"
  }
};

const MainDiv = styled(Box)({
  paddingInline: "100px",
  maxWidth: "1440px",
  margin: "0 auto",
  "@media(max-width:900px)": {
    paddingInline: 150
  },
  "@media(max-width:600px)": {
    paddingInline: 10
  }
});

const StyledContributorConatiner = styled("div")({
  paddingTop: 100,
  paddingBottom: 80
});

const StyledContributorHeader = styled("div")({
  marginBottom: 42,
  textAlign: "center"
});

const StyledDiv = styled("div")({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: 210
});

const StyledImg = styled("img")({
  height: 80,
  width: 80,
  marginBottom: 24
});
const StyledContentConatiner = styled("div")({
  // maxWidth :
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px"
});

export default ContributorLandingPage;
