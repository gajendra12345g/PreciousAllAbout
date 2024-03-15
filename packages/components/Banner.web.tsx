import React from "react";
import {
  Typography,
  Box,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { landingImg } from './assets'

const TitleBox = styled(Box)({
  backgroundImage: `url(${landingImg})`,
  width: "100%",
  margin: 0,
  padding: 0,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "451px",
  backgroundColor: "#fafafa",
  position: "relative"
});

const Title = styled(Typography)({
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "44px",
  lineHeight: "56px",
  paddingTop: "186px",
  position: "relative",
  zIndex: 3,
  textAlign: "center"
});

const SubTitle = styled(Typography)({
  color: "#ffffff",
  fontSize: "15px",
  lineHeight: "28px",
  fontWeight: 400,
  position: "relative",
  zIndex: 3,
  textAlign: "center"
});
const Banner = () => {
  return (
    <TitleBox>
      <Title>
        UNCOVER THE MAGIC <br />
      </Title>
      <SubTitle>
        Exclusive images and videos for Qatar, A visual spectacle of
        prosperity
      </SubTitle>
    </TitleBox>
  )
}

export default Banner