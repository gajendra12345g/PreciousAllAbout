import React from "react";

// Customizable Area Start
import {
  Grid, styled
} from "@material-ui/core";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import Footer from "../../../components/src/DesignSystem/Footer/Footer.web";
import PhotoLibraryCollection from './PhotoLibraryCollection.web'
import { createTheme} from "@material-ui/core/styles";
import PhotoLibraryGallery from "./PhotoLibraryGallery.web";
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff"
    }
  },
  typography: {
    h6: {},
    subtitle1: {
      margin: "20px 0px"
    }
  }
});
import SideBar from "../../../components/src/DesignSystem/SideBar/SideBar.web";
import {sideBarContributorListItem, sideBarContributoBottomNav } from "../../../blocks/navigationmenu/src/NavigationMenuController";

// Customizable Area End

import PhotoLibraryController, {
  Props,
  configJSON
} from "./PhotoLibraryController";

// Customizable Area Start
// Customizable Area End

export default class PhotoLibrary extends PhotoLibraryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {selectedContent, selectedPublish, selectedUpdate, assetsModal, collectionModal,selectedButton,setVisibility} = this.state
    return (
      <MainBox>
          <NavigationMenu navigation={undefined} id={""} contributorLogin={true}/>
          <SideBar id="" navigation={this.props.navigation} sideBarBottomNav={sideBarContributoBottomNav} sideBarListItem={sideBarContributorListItem}>
            <Grid style={webStyle.collectionConatiner}>
             <PhotoLibraryCollection
              selectedContent={selectedContent}
               selectedPublish={selectedPublish}
                handleContentSelect= {this.handleContentSelect}
                handlePublishSelect= {this.handlePublishSelect}
                selectedUpdate={selectedUpdate}
                handleSortSelect={this.handleSortSelect}
                collectionModal= {collectionModal}
              closeCollectionModal= {this.closeCollectionModal}
              openCollectionModal = {this.openCollectionModal}
              selectedButton={selectedButton}
              handleButtonClick={this.handleButtonClick}
              handleSetVisibility={this.handleSetVisibility}
              setVisibility={setVisibility}
                />
            </Grid>
            <Grid style={webStyle.sectionContainer}>
              <PhotoLibraryGallery
              openCollectionModal = {this.openCollectionModal}
              openAssestModal={this.openAssestModal}
              assetsModal={assetsModal}
              closeAssetsModal={this.closeAssetsModal}
              selectedButton={selectedButton}
              handleButtonClick={this.handleButtonClick}
              handleSetVisibility={this.handleSetVisibility}
              setVisibility={setVisibility}
              />
            </Grid>
            <Footer userType={"contributor"} 
                        navigation={""} />
            </SideBar>
      </MainBox>
      
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyle = {
  collectionConatiner:{
    width:"100%",
    maxHeight:"200px",
    height:"auto"
  },
  sectionContainer:{
    height:"350px",
  }
};
const MainBox = styled(Grid)({
  overflowX:"hidden"

})
// Customizable Area End
