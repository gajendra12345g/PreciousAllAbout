import React from "react";
import Header from "../../../components/src/DesignSystem/Header/Header.web";
import Banner from "../../../components/src/DesignSystem/Banner/Banner.web";
import Footer from "../../../components/src/DesignSystem/Footer/Footer.web";
import Trending from "../../../blocks/trending/src/Trending.web";
import ContentManagement from "../../../blocks/contentmanagement/src/ContentManagement.web";
import FeaturedPhotographer from "./FeaturedPhotographer.web";
import LandingPageController, { Props } from "./LandingPageController";
import Search from '../../../blocks/advancedsearch/src/Search.web';
import { Box, styled } from "@material-ui/core";

class LandingPage extends LandingPageController {
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
        <Header navigation={undefined} testID={""} classNameProps={undefined} />
        <Banner />
        <Search 
          navigation={this.props.navigation} 
          id='search' 
          startIcon={true}
          endIcon={false}
          dropDown={true}
          dropDownPosition={'end'}
          variant={'light'}
          setSearchQuery={(val: string) => this.setSearchQuery(val)}
          searchQuery={this.state.searchQuery}
          testID='searchCom'
        />
        <MainDiv>
          <Trending navigation={""} id={""} />
          <ContentManagement navigation={""} idContent={""} />
          <FeaturedPhotographer navigation={""} id={""} />
        </MainDiv>
        <Footer 
          userType={'normal'}
        />
      </>
    );
  }
}

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

export default LandingPage;
