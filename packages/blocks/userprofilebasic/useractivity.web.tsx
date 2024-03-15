import React from "react";
// Customizable Area Start
import Header from "../../../components/src/DesignSystem/Header/Header.web";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  styled
} from "@material-ui/core";
import Footer from "../../../components/src/DesignSystem/Footer/Footer.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import UserActivityController,{Props} from "./UserActivityController";
import customTheme from "../../../../packages/components/src/DesignSystem/Theme/Theme.web";
import SearchResults from "../../../components/src/DesignSystem/SearchResult/SearchResults.web";
// Customizable Area End

// Customizable Area Start
const Main = styled(Box)({
    padding: 32,
    backgroundColor: customTheme.palette.grey.secondary
  });
  
  const Container = styled(Grid)({
    padding:24,
    flexDirection:"column",
    gap:20,
    backgroundColor: customTheme.palette.white.main,
  });
  const TabS = styled(Tabs)({
    "& .MuiTabs-indicator": {
      backgroundColor: "black",
      height: "3px" 
    },
    "& .PrivateTabIndicator-colorSecondary": {
      backgroundColor: "black",
      height: "3px"
    }
  });
// Customizable Area End

export default class UserActivity extends UserActivityController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const { selectedId } = this.state;

    return (
      <>
          <Header testID={""} navigation={this.props.navigation} classNameProps={""} />
          <Main>
            <div style={webStyle.breadCrumb}>
              <CustomTypography variant='secondary' component='body11bold'>Profile / &nbsp;</CustomTypography>
              <CustomTypography component='body11bold'>{this.state.selectedLabel}</CustomTypography>
            </div>
          <Container container>
            <div style={webStyle.justifyCenter}>
            <TabS
              value={selectedId}
              onChange={(e,value)=>this.handleChange(e,value)}
              id="tabs"
              style={webStyle.justifyCenter}
            >
            {this.state.tabsMenu.map((tab:any) => (
                <Tab
                  value={tab.id}
                  label={tab.label}
                  style={{...webStyle.tabStyle,textTransform:"none"}}
                />
                ))}
            </TabS>
            </div>
            {selectedId === 1 && <CustomTypography>Following section</CustomTypography>}
            {selectedId === 2 && <CustomTypography>Purchase history</CustomTypography>}
            {selectedId === 3 && <CustomTypography>Comments section</CustomTypography>}
            {selectedId === 4 && 
            <div style={webStyle.favouriteDiv}>
            <SearchResults 
              testID={"results"}
              navigation={this.props.navigation}
              data={this.state.bookmarkData} 
              searchQuery={""}
              fromPage={"Favourites"}    
              onBookmarkClick={()=>{}}          
            />
            </div>
            }
            {selectedId === 5 && <CustomTypography>My collection</CustomTypography>}
            {selectedId === 6 && <CustomTypography>Downloads</CustomTypography>}
            {selectedId === 7 && <CustomTypography>Hire section</CustomTypography>}
          </Container>
          </Main>
          <Footer 
            userType={"normal"} 
            navigation={this.props.navigation}
          />
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyle = {
  breadCrumb:{
    display:"flex",
    marginBottom: 30
  },
  tabStyle: {
    fontSize:16,
    fontFamily: 'Outfit',
    borderBottom: "2px solid #e8e8e8",
  },
  justifyCenter:{
    display:"flex",
    justifyContent:"center"
  },
  favouriteDiv:{
    width:"100%"
  }
};
// Customizable Area End
