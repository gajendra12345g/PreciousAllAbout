import React from "react";
// Customizable Area Start
import { Typography, Box, styled, Grid } from "@material-ui/core";
// Customizable Area End

import ContentManagementController, { Props } from "./LandingPageController";
// Customizable Area Start
import { profileIcon } from "./assets";
// Customizable Area End

export default class FeaturedPhotographer extends ContentManagementController {
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
      <TrendingBox>
        <FeaturesTitleBox>
          <Title1>FEATURED PHOTOGRAPHERS</Title1>
          <Title2>VIEW ALL</Title2>
        </FeaturesTitleBox>
        <FeaturesContainer>
          <Grid container spacing={2}>
            {this.featureData.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={4}>
                <FeaturesSubContainer key={index}>
                  <TrendingVideo src={item.src} alt="image" />
                  <FeaturesImg>
                    <ProfileImg src={item.subProfile} />
                    <FeaturesText>
                      <FeaturesSubText1>{item.title}</FeaturesSubText1>
                      <FeaturesSubText2>{item.subTitle}</FeaturesSubText2>
                    </FeaturesText>
                    <ProfileIcon src={profileIcon} />
                  </FeaturesImg>
                </FeaturesSubContainer>
              </Grid>
            ))}
          </Grid>
        </FeaturesContainer>
      </TrendingBox>
      // Customizable Area End
    );
  }
}
// Customizable Area Start

const TrendingBox = styled(Box)({
  paddingInline: "100px",
  maxWidth: "1440px", 
  margin: "0 auto", 
  "@media(max-width: 900px)": {
    paddingInline: "10px"
  }
});

const TrendingVideo = styled("img")({
  width: "100%",
  height: 284
});

const FeaturesImg = styled("div")({
  position: "absolute",
  bottom: "15px",
  left: "0",
  color: "#fff",
  fontSize: "12px",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  width: "100%"
});

const FeaturesText = styled("div")({
  fontSize: 10,
  fontWeight: 400,
  margin: 0,
  paddingLeft: 12
});

const FeaturesSubText1 = styled("p")({
  fontSize: 12,
  fontWeight: 500,
  margin: 0,
  paddingBottom: 4
});

const FeaturesSubText2 = styled("p")({
  fontSize: 10,
  fontWeight: 400,
  margin: 0
});

const FeaturesTitleBox = styled(Box)({
  fontSize: "16px",
  fontWeight: 500,
  display: "flex",
  justifyContent: "space-between",
  marginTop: "264px"
});

const Title1 = styled(Typography)({
  fontSize: 16,
  fontWeight: 500
});

const Title2 = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  textDecoration: "underline"
});

const ProfileImg = styled("img")({
  height: 50,
  width: 50,
  borderRadius: "50%",
  paddingLeft: 15
});

const ProfileIcon = styled("img")({
  position: "absolute",
  right: 20,
  backgroundColor: "rgba(128, 128, 128, 0.30)",
  padding: "10px"
});

const FeaturesContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  marginTop: 24,
  flexWrap: "wrap",
  "@media(max-width: 1422px)": {
    justifyContent: "center"
  }
});

const FeaturesSubContainer = styled("div")({
  marginBottom: "16px",
  position: "relative"
});
// Customizable Area End
