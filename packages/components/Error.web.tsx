import React from "react";
import { Box, styled } from "@material-ui/core";
import CustomTypography from "../CustomTypography/CustomTypography.web";
import CustomButton from "../CustomButton/CustomButton.web";
import NavigationMenu from "../../../../blocks/navigationmenu/src/NavigationMenu.web";

const ErrorPage = () => {
  return (
    <>
      <NavigationMenu
        contributorPortfolio={false}
        contributorContent={false}
        contributorLogin={false}
        navigation={undefined}
        id={""}
      />
      <MainBox>
        <CustomTypographySmall component="error">404</CustomTypographySmall>
        <MainBox2>
          <CustomTypography variant="red" component="heading">
            Slow or no internet connections.
          </CustomTypography>
          <CustomTypography variant="red" component="heading">
            Please check your internet settings
          </CustomTypography>
        </MainBox2>
        <ButtonD>
          <CustomButton
            fullWidth="fullWidth"
            onClick={() => {
              window.location.reload();
            }}
          >
            Try again
          </CustomButton>
        </ButtonD>
      </MainBox>
    </>
  );
};

const MainBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "150px auto",
});

const MainBox2 = styled(Box)({
  marginBottom: "50px",
  textAlign: "center",
});

const ButtonD = styled("div")({
  minWidth: 188,
});

const CustomTypographySmall = styled(CustomTypography)({
  fontSize: "200px",
  fontWeight: 600,
  "@media (max-width: 600px)": {
    fontSize: "100px",
    fontWeight: 600,
  },
});

export default ErrorPage;
