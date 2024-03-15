import React from "react";
// Customizable Area Start
import { Button, Typography, Box, Grid, styled } from "@material-ui/core";
// Customizable Area End

import ContentManagementController, {
  Props
} from "./ContentManagementController";
// Customizable Area Start
import { img1 } from "./assets";
// Customizable Area End

export default class ImageCotent extends ContentManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End

  render() {
    const images = this.getContentImage(this.state.imageData);
    const [img2] = images;
    console.log("img2",images);
    return (
      // Customizable Area Start
      <TrendingBox>
        <ExploreImageBox>
          <ExploreImageGrid container>
            <ImageContentGridCenter item>
              <ImageH1>Unveiling Our Finest image Collections.</ImageH1>
              <ImageH2>
                Explore curated collections of stunning images that spark
                inspiration and elevate your projects.
              </ImageH2>
              <ButtonImage variant="contained">EXPLORE IMAGES</ButtonImage>
            </ImageContentGridCenter>
            <ImageContentGrid item>
              <MainSection>
                <InsideSection1>
                  <InsideSection1Box1>
                    <CustomImgGirl src={img1} />
                  </InsideSection1Box1>
                  <InsideSection1Box2>
                    <CustomImgBuilding src={img1} />
                    <CustomImgPod src={img1} />
                  </InsideSection1Box2>
                  <InsideSection1Box3>
                    <CustomImgRobot src={img1} />
                    <CustomImgTiger src={img1} />
                  </InsideSection1Box3>
                </InsideSection1>
                <InsideSection2>
                  <CustomImgFood src={img1} />
                  <CustomImgDrone src={img1} />
                </InsideSection2>
              </MainSection>
            </ImageContentGrid>
          </ExploreImageGrid>
        </ExploreImageBox>
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
    paddingInline: 10,
  },
});

const ExploreImageBox = styled(Box)({
  marginTop: "164px",
});

const ExploreImageGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media(max-width: 900px)": {
    flexDirection:"column"
}});

const ImageContentGridCenter = styled(Grid)({
  "@media(max-width: 1320px)": {
    margin: "auto",
  },
  "@media(max-width: 900px)": {
    margin: "auto",
  }
});
const ImageContentGrid = styled(Grid)({
  "@media(max-width: 1320px)": {
    margin: "auto",
  },
  "@media(max-width: 900px)": {
    margin: "auto",
    width: '100%'
  }
});

const ImageH1 = styled(Typography)({
  fontWeight: 500,
  fontSize: 32,
  maxWidth: "403px",
});

const ImageH2 = styled(Typography)({
  fontWeight: 400,
  fontSize: 16,
  maxWidth: "403px",
  paddingTop: "12px",
  paddingBottom: 24,
  color: "#73767A",
});

const ButtonImage = styled(Button)({
  background: "#0E0F17",
  color: "#ffffff",
});

const MainSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "50%",
  gap: "12px",
  "@media(max-width: 1320px)": {
    transform: "scale(0.6)",
    width: "100%",
  },
  "@media(max-width: 900px)": {
    transform: "unset",
    alignItems: "center",
    marginTop:164,
    marginBottom:164,
    '& img': {
      width: '100%',
      height: '200px',
      minWidth:"unset"
    },
    '& div': {
      width: '100%'
    }
  },
});

const InsideSection1 = styled(Box)({
  display: "flex",
  gap: "12px",
  "@media(max-width:900px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%'
  },
});

const InsideSection1Box1 = styled(Box)({
  '@media(max-width: 900px)': {
    width: '100%',
  }
});
const InsideSection1Box2 = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});
const InsideSection1Box3 = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});
const InsideSection2 = styled(Box)({
  display: "flex",
  gap: "12px",
  "@media(max-width:900px)": {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
});

const CustomImgGirl = styled("img")({
  width: "244px",
  height: "364px",
});

const CustomImgBuilding = styled("img")({
  width: "221px",
  height: "208px",
});

const CustomImgPod = styled("img")({
  width: "221px",
  height: "144px",
});

const CustomImgRobot = styled("img")({
  width: "221px",
  height: "144px",
});

const CustomImgTiger = styled("img")({
  width: "221px",
  height: "208px",
});

const CustomImgFood = styled("img")({
  minWidth: "350px",
  height: "166px",
});

const CustomImgDrone = styled("img")({
  minWidth: "350px",
  height: "166px",
});

// Customizable Area End
