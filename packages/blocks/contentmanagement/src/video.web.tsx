import React from "react";
// Customizable Area Start
import { Button, Typography, Box, styled } from "@material-ui/core";
// Customizable Area End

import ContentManagementController, {
  Props
} from "./ContentManagementController";
// Customizable Area Start
import { videoImage } from "./assets";
// Customizable Area End

export default class VideoContent extends ContentManagementController {
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
        <ExploreVideoBox>
          <ExploreVideoSubBox>
            <FirstImg src={videoImage}></FirstImg>
            <SubImg src={videoImage}></SubImg>
          </ExploreVideoSubBox>
          <VideoContentBox>
            <VideoH1>Dive into Our Premier Video Collections.</VideoH1>
            <VideoH2>
              Explore a world of motion and emotion in our exceptional video
              gallery
            </VideoH2>
            <VideoButton
              variant="contained"
            >
              EXPLORE VIDEO
            </VideoButton>
          </VideoContentBox>
        </ExploreVideoBox>
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
  "@media(max-width:900px)": {
    paddingInline: "10px",
  },
});

const ExploreVideoSubBox = styled(Box)({
  display: "flex",
  flexWrap: "nowrap",
  width: "50%",
  "@media(max-width: 1320px)": {
    transform: "scale(0.5)",
    width: "100%",
    alignItems: "center",
    justifyContent:"center",
    "@media(max-width: 900px)": {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      transform: "none",
    },
  },
});

const VideoContentBox = styled(Box)({
  "@media(max-width: 1320px)": {
    marginTop: "150px",
    margin: "auto",
  },
});

const VideoH1 = styled(Typography)({
  fontWeight: 500,
  fontSize: 32,
  maxWidth: "403px",
});

const VideoH2 = styled(Typography)({
  fontWeight: 400,
  fontSize: 16,
  maxWidth: "403px",
  paddingTop: "12px",
  paddingBottom: 24,
  color: "73767A",
});

const VideoButton=styled(Button)({
    background: "#0E0F17", 
    color: "#ffffff" 
})

const ExploreVideoBox = styled(Box)({
  marginTop: "164px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  "@media(max-width: 1320px)": {
    marginTop: 0,
  },
});

const FirstImg = styled("img")({
  width: "100%",
  maxWidth:"426px",
  height: 240,
  "@media(max-width: 900px)": {
    maxWidth:"none",
  },
});

const SubImg = styled("img")({
  width:"100%",
  maxWidth:"426px",
  height: 240,
  position: "relative",
  top: "120px",
  left: "-190px",
  border: "10px solid white",
  "@media(max-width: 900px)": {
    position: "unset",
    top: 0,
    left: 0,
    border: "unset",
    maxWidth:"none",
  },
});

// Customizable Area End
