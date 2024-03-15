import React from "react";
// Customizable Area Start
// Customizable Area End

import EmailAccountLogoutController, {
  Props,
  configJSON
} from "./EmailAccountLogoutController";
import { Button, styled } from "@material-ui/core";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";

export default class EmailAccountLogout extends EmailAccountLogoutController {
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
      <>
        <Button
          data-test-id="handleLogout"
          onClick={() => this.handleModal(this.state.open)}
          style={this.props.style}
        >
          LOGOUT
        </Button>
        <ModalComponent open={this.state.open} maxWidth={541} maxHeight={300}>
          <LogoutParent>
            <CustomTypograpyParent>
              <CustomTypography
                variant={"primary"}
                component={"body6"}
                textTransform={"uppercase"}
              >
                {configJSON.title}
              </CustomTypography>
            </CustomTypograpyParent>
            <Divider variant="whiteDark"></Divider>
            <ParentDiv>
              <CustomTypograpyParent1>
                <CustomTypography variant={"secondary"} component={"body10"}>
                {configJSON.subTitle}
                </CustomTypography>
              </CustomTypograpyParent1>
              <LogoutDiv>
                <LogoutDivInner>
                  <CustomButton
                    onClick={() => this.handleModal(this.state.open)}
                    variant="secondary"
                    fullWidth="fullWidth"
                    data-test-id="handleOpenDelete1"
                    size={"medium"}
                  >
                   {configJSON.button1}
                  </CustomButton>
                </LogoutDivInner>
                <LogoutDivInner>
                  <CustomButton
                    variant="red"
                    fullWidth="fullWidth"
                    data-test-id="handleOpenDeleteNext"
                    size={"medium"}
                    onClick={() => this.handleLogout()}
                  >
                   {configJSON.button}
                  </CustomButton>
                </LogoutDivInner>
              </LogoutDiv>
            </ParentDiv>
          </LogoutParent>
        </ModalComponent>
      </>
      // Customizable Area End
    );
  }
}
// Customizable Area Start

const ParentDiv = styled("div")({
  padding: "0px 32px",
});

const LogoutParent = styled("div")({
  padding: "12px",
});

const CustomTypograpyParent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const CustomTypograpyParent1 = styled("div")({
  textAlign: "center",
  padding: "32px 0px",
  "@media(max-width:600px)": {
    "& br": {
      display: "none",
    },
  },
});

const LogoutDiv = styled("div")({
  display: "flex",
  gap: "24px",
});

const LogoutDivInner = styled("div")({
  width: "100%",
});

// Customizable Area End