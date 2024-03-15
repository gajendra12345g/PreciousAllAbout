import React from "react";
// Customizable Area Start
import LandingPageAfterLoginContributorController, {
  Props
} from "./LandingPageAfterLoginContributorController";
import ContributorSideBarLayout from "../../../components/src/DesignSystem/ContributorSideBar/ContributorSideBarLayout";
import { Box, Grid, styled } from "@material-ui/core";
import {doubleTickIcon} from "./assets"
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import PortfolioCard from "./PortfolioCard.web";
import EarningsCard from "./EarningsCard.web";
import LatestDownload from "./LastDownloadCard.web";
import ContributorSurveyCard from "./ContributorSurveyCard.web"
import CollectionCard from "./CollectionsCard.web";
import TopPerformerCard from "./TopPerformerCard.web";
// Customizable Area End

class ContributorLandingPageAfterLogin extends LandingPageAfterLoginContributorController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  
  render() {
    return (
      // Customizable Area Start
      <>
        <ContributorSideBarLayout activeTab={1} contributorLogin ={true} contributorContent ={false}>
          <CustonContainer>
            <TopBanner>
                <div style={webStyles.headerBanner}>
                  <img src={doubleTickIcon} alt="" style={webStyles.img}/>
                </div>
                <div style={webStyles.headerBannerRightSection}>
                  <CustomTypography variant="primary" component="outfitBody1" >
                    Let's Begin. Share Your Finest <span style={webStyles.link}>Images</span> and <span style={webStyles.link}>Clips</span>, and Submit for Review.
                  </CustomTypography>
                </div>
            </TopBanner>
            <div>
              Carousel
            </div>
            <Grid container spacing={2} style={webStyles.gridContainer}>
              <Grid item xs={12} lg={6} style={webStyles.gridTopSpacing} >
                <PortfolioCard data-test-id="handleChangePortfolioTab" handleChange={this.handleChangePortfolioTab} portFolioStatusTab={this.state.portFolioStatusTab}/>
              </Grid>
              <Grid item xs={12} lg={6}  style={webStyles.gridTopSpacing} >
                <EarningsCard  uploadContentBtn = {this.uploadContentBtn} />
              </Grid>
              <Grid item xs={12} lg={6}  style={webStyles.gridTopSpacing}>
                <LatestDownload />
              </Grid>
              <Grid item xs={12} lg={6}  style={webStyles.gridTopSpacing}>
                <ContributorSurveyCard />
              </Grid>
              <Grid item xs={12} lg={6} style={webStyles.gridTopSpacing} >
                <CollectionCard handleChangeAssetType={this.handleChangeAssetType} collectionSectionBtn={this.collectionSectionBtn} handleChangePublishedType={this.handleChangePublishedType} selectedAssetType={this.state.selectedAssetType} selectedPublishedType={this.state.selectedPublishedType}/>
              </Grid>
              <Grid item xs={12} lg={6} style={webStyles.gridTopSpacing} >
                <TopPerformerCard handleChangeAssetType={this.handleChangeAssetType} handleChangePublishedType={this.handleChangePublishedType} selectedAssetType={this.state.selectedAssetType} selectedPublishedType={this.state.selectedPublishedType} />
              </Grid>
            </Grid>

          </CustonContainer>
        </ContributorSideBarLayout>
      </>
      // Customizable Area End
    );
  }
}
// Customizable Area Start
 
const webStyles: any = {
  headerBanner:{
    background:"#1FD794",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"4rem",
    marginRight:"1rem"
  },
  headerBannerRightSection:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  img:{
    height:"1.5rem",
    width:"1.5rem"
  },
  link:{
    cursor:"pointer",
    color:"#3A82FF"
  },
  gridContainer:{
    marginBottom:"2rem"
  },
  gridTopSpacing:{
    marginTop:"1.5rem"
  }

};

const CustonContainer = styled(Box)({
  paddingTop:"1rem",
  marginLeft:"1rem",
  width:"calc(100% - 2.5rem)"
})

const TopBanner = styled(Box)({
  border: "1px solid #BFC2C3",
  height:"3.75rem",
  marginBottom:"1.25rem",
  display:"flex"
})


 // Customizable Area End



export default ContributorLandingPageAfterLogin;
