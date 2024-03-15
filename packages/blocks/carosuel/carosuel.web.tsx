import React from "react";

// Customizable Area Start
import { Container, Box, styled, CircularProgress } from "@material-ui/core";
import { slider1, slider2, slider3 } from "./assets";
import Carousel from "react-material-ui-carousel";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
// Customizable Area End

import CarouselDisplayController, {
  Props,
  configJSON,
} from "./CarouselDisplayController";

export default class CarouselDisplay extends CarouselDisplayController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderThumbnails() {
    if (!this.state.CarosuelData || this.state.CarosuelData.length === 0) {
      return <CircularProgress size={20} />;
    }
    return (
      <IndicatorIconWrap>
        {this.state.imgData.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              onClick={() => this.setState({ index: index })}
              style={webStyle.indicatorIcon}
            >
              <Box
                style={{
                  flex: 1,
                  backgroundColor: `${
                    index === this.state.index ? "#fff" : "C4C4C4"
                  }`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 100,
                }}
              />
            </Box>
          );
        })}
      </IndicatorIconWrap>
    );
  }
  // Customizable Area End

  render() {
    console.log(slider1);
    return (
      // Customizable Area Start
      <Container style={webStyle.container}>
        <Carousel
          data-test-id="handleNext"
          animation="fade"
          autoPlay={false}
          swipe={true}
          index={this.state.index}
          indicators={false}
          navButtonsAlwaysVisible={true}
          next={this.handleNext}
          prev={this.handlePrevious}
          navButtonsProps={{
            style: {
              backgroundColor: "#fff",
              color: "#000",
              width: "24px",
              height: "24",
              margin: "0px 27px",
            },
          }}
        >
          {this.state.CarosuelData && this.state.CarosuelData?.map((item: any, i: any) => {
            return (
              <Box key={i} style={webStyle.carousel}>
                <img style={webStyle.carouselImage} src={item.attributes.image} />
                <InnerDiv>
                  <CustomTypography component="outfitHeading3">
                    {item.attributes.title}
                  </CustomTypography>
                  <InnerDiv1>
                    <CustomTypography component="body13">
                     {item.attributes.subtitle}
                    </CustomTypography>
                  </InnerDiv1>
                  <ButtonDiv>
                  <CustomButton fullWidth="fullWidth" variant="secondary">{configJSON.button}</CustomButton>
                  </ButtonDiv>
                </InnerDiv>
              </Box>
            );
          })}
        </Carousel>
        {this.renderThumbnails()}
      </Container>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  container: {
    maxWidth: "unset",
    padding: 0,
  },
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  carouselImage: {
    width: "100%",
    height:"600px"
  },
  carousel: {
    flex: 1,
    maxHeight: 531,
    overflow: "hidden",
  },
  indicatorIconWrap: {
  
  },
  indicatorIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    overflow: "hidden",
    display: "flex",
  },
};

const InnerDiv = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  background: "rgba(0, 0, 0, 0.24)",
  color: "#fff",
  padding: "16px 127px 29px 24px",
});

const InnerDiv1 = styled("div")({
  margin: "16px 0px",
});

const ButtonDiv=styled("div")({
 maxWidth:"150px"
})

const IndicatorIconWrap=styled(Box)({
  display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "center",
    transform: "translateY(-120%)",
    "@media(max-width: 600px)": {
      transform: "translateY(-90%)",
    },
})

// Customizable Area End
