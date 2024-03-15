//@ts-nocheck
import React from "react";

// Customizable Area Start
import { Typography, Box, styled,Grid } from "@material-ui/core";
// Customizable Area End

import TrendingController, {
  Props,
  configJSON,
} from "./TrendingController.web";

 class Trending extends TrendingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <TrendingBox>
        <TrendingTitleBox>
          <Heading1>TRENDING COLLECTIONS</Heading1>
          <Heading2>VIEW ALL</Heading2>
        </TrendingTitleBox>
        <TrendingFlexContainer>
          <Grid container spacing={2}>
            {this.state.trendingData1?.slice(0, 8).map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                {console.log("page",item?.attributes?.name,item?.attributes?.images?.data[0]?.attributes?.pic)
                }
                <InnerDiv>
                  <TrendingImg src={item.src} />
                  <TrendingText>{item.title}</TrendingText>
                </InnerDiv>
              </Grid>
            ))}
          </Grid>
        </TrendingFlexContainer>
      </TrendingBox>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
export default Trending;

const TrendingBox = styled(Box)({
  paddingInline: "100px",
  maxWidth: "1440px", 
  margin: "0 auto", 
  "@media(max-width:900px)": {
    paddingInline: 10,
  },
});

const TrendingTitleBox = styled(Box)({
  fontSize: "16px",
  fontWeight: 500,
  display: "flex",
  justifyContent: "space-between",
});

const Heading1 = styled(Typography)({
  fontSize: 16,
  fontWeight: 500,
});

const Heading2 = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  textDecoration:"underline"
});

const TrendingFlexContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  marginTop: 24,
  flexWrap: "wrap",
  "@media(max-width: 1422px)": {
    justifyContent: "center",
  },
});

const InnerDiv = styled("div")({
  // marginBottom: "16px",
  position: "relative",
});

const TrendingText = styled("div")({
  position: "absolute",
  bottom: "0",
  left: "0",
  color: "#fff",
  padding: "24px 16px 16px 16px",
  fontSize: "12px",
  fontWeight: 500,
});

const TrendingImg = styled("img")({
  width: "100%",
  height: "156px",
});

// Customizable Area End
