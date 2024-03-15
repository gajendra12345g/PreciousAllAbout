import React from "react";
// Customizable Area Start
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { styled, Box } from "@material-ui/core";
import { searchIcon } from "./assets";
import InteractiveFaqSectionController, {
  Props
} from "./InteractiveFaqSectionController";
export const configJSON = require("./config");
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import CustomLink from "../../../components/src/DesignSystem/Link/Link.web";
import NavigationMenu from "../../../blocks/navigationmenu/src/NavigationMenu.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
// Customizable Area End

// Customizable Area Start
const theme = createTheme({});

// Customizable Area End

export default class InteractiveFaqSection extends InteractiveFaqSectionController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    // Customizable Area Start
    return (
      <>
        <NavigationMenu
          showHeardNav={true}
          contributorLogin={false}
          contributorContent={false}
          navigation={undefined}
          goToLanding={this.GoLandingPage}
          id={""}
        />
        <ThemeProvider theme={theme}>
          <Box>
            {this.state.FaqData.map((i, index) => {
              return (
                <Box
                  style={{
                    background: `url(${i.attributes.image})`,
                    ...webStyles.faqHeroSection
                  }}
                  key={index}
                >
                  <CustomWrapper>
                  <Box style={webStyles.inputSectionWrapper} className="inputWrapperBlock">
                    <CustomTypography component="FaqHead" className="title">
                      {i.attributes.title}
                    </CustomTypography>
                    <CustomInput>
                      <Input
                        data-test-id="search_faq"
                        placeholder="Search"
                        onChange={this.handleSearchChange}
                        type="text"
                        value={this.state.searchValue}
                        startAdornment={<img src={searchIcon} />}
                      />
                    </CustomInput>
                  </Box>
                  </CustomWrapper>
                  
                </Box>
              );
            })}
            <CardBox >
              <Box style={webStyles.cardWrapper} className="card_wrap" >
                {this.state.InteractiveFaqQuestionType &&
                  this.state.InteractiveFaqQuestionType.map((i, index) => {
                    return (
                      <CustomCard variant="faqCard" key={index}>
                        <CustomTypography component="title2">
                          {i.attributes.title}
                        </CustomTypography>
                        <img
                          src={i.attributes.image}
                          style={webStyles.cardImg}
                        />
                        <Box>
                          {i.attributes.questions &&
                            i.attributes.questions.map(question => {
                              return (
                                <Box style={webStyles.questionSec}>
                                  <CustomLink component="body5">
                                    <CustomTypography component="linkText">
                                      {question.title}
                                    </CustomTypography>
                                  </CustomLink>
                                </Box>
                              );
                            })}
                        </Box>
                      </CustomCard>
                    );
                  })}
              </Box>
            </CardBox>
          </Box>
        </ThemeProvider>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start

const webStyles = {
  faqHeroSection: {
    minHeight: "440px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  inputSectionWrapper: {
    maxWidth: "470px",
    width: "100%"
  },
  cardWrapper: {
    display: "flex" as "flex",
    gap: "20px",
    flexWrap: "wrap" as "wrap",
    padding: "40px 35px",
    [theme.breakpoints.down('md')]: {
      justifyContent:"center"
  }
  },
  card: {
    width: "326px",
    minHeight: "auto"
  },
  cardImg: {
    minHeight: "100px",
    width: "100%",
    padding: "24px 0px "
  },
  questionSec: {
    marginBottom: "16px"
  }
};
const CustomWrapper=styled(Box)(
  {
"& .inputWrapperBlock":{
  "@media(max-width: 767px)":{
    maxWidth:"320px !important",
    width:"100%",
  }
},
"& .label":{
  "@media(max-width: 767px)":{
  fontSize:"28px !important",
  lineHeight:"10px !important"
} 
}
  }
)
const CardBox=styled(Box)(
  {
"& .card_wrap":{
  "@media(max-width: 767px)":{
    justifyContent:"center"
  }
}
  }
)
const CustomInput = styled(Box)({
  "& .MuiFormControl-marginDense": {
    marginTop: "34px"
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0px"
  }
});

// Customizable Area
