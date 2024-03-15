import React from "react";
// Customizable Area Start
import { Box, styled } from "@material-ui/core";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import CustomDropDown from "../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
import {configJSON} from "./LandingPageAfterLoginContributorController"

interface Option{
    label: string;
    value: any;
  }

interface Props {
    selectedAssetType:Option,
    selectedPublishedType:Option,
    handleChangeAssetType:(value:Option)=>void
    handleChangePublishedType:(value:Option)=>void
    collectionSectionBtn :(value:any) => void
}
// Customizable Area End

class CollectionCard extends React.Component<Props>{
    render(){
         // Customizable Area Start
        return(
            <CustomCard variant="variant2" >

            <Box style={webStyle.cardHeader}>
              <CustomTypography variant="primary" component="header1"  >COLLECTIONS</CustomTypography>
            </Box>
            <Box  style={webStyle.cardContentContainer}>
                <Box style={webStyle.headerContainer}>
                    <StyledBox style={webStyle.dropDownloadContainer}>
                        <Box style={webStyle.label}>
                            <CustomTypography variant="secondary" component="outfitBody" >Asset Type</CustomTypography>
                        </Box>
                        <CustomDropDown variant="dropdownBtnSecondary" options={configJSON.assestType} selectNewItem={this.props.handleChangeAssetType} selectedItem={this.props.selectedAssetType} />
                    </StyledBox>
                    <StyledBox style={webStyle.dropDownloadContainer}>
                        <Box  style={webStyle.label}>
                            <CustomTypography variant="secondary" component="outfitBody" >Published</CustomTypography>
                        </Box>
                        <CustomDropDown variant="dropdownBtnSecondary" options={configJSON.publishedType} selectNewItem={this.props.handleChangePublishedType} selectedItem={this.props.selectedPublishedType} />
                    </StyledBox>
                </Box>
                <Box style={webStyle.contetContainer}>
                    <Box>
                        <CustomTypography variant="primary" component="h7">
                        CREATE NEW COLLECTIONS TO TRACK YOUR EARNINGS
                        </CustomTypography>
                    </Box>
                    <Box>
                        <CustomTypography variant="secondary" component="body11">
                        You can view your content's performance and stay organized.
                        </CustomTypography>
                    </Box>
                    <Box style={webStyle.btnContainer}>
                        <CustomButton variant="secondary" size="large" fullWidth="fullWidth" onClick={this.props.collectionSectionBtn}>CREATE A COLLECTION</CustomButton>
                    </Box>

                </Box>
            </Box>
               

          </CustomCard>

             // Customizable Area End
        )
    }
}

// Customizable Area Start
 
const webStyle: any = {
    container:{
        maxHeight:"26.25rem"
    },
    cardHeader:{
      paddingTop:"1.375rem",
      paddingLeft:"1rem",
      paddingRight:"1rem",
      paddingBottom:".5rem",
      borderBottom:"1px solid #C4C4C4",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center"
      
    },
    cardContentContainer:{
        height:"22.68rem"
    },
    headerContainer:{
        marginTop:".75rem",
        display:"flex",
        gap:"1rem",
        paddingLeft:"1rem"
    },
    dropDownloadContainer:{
        width:"6.95rem"
    },
    label:{
        marginBottom:".35rem"
    },
    contetContainer:{
        marginTop:"7.05rem",
        textAlign:"center"
    },
    btnContainer:{
        width:"16.5rem",
        margin:"auto",
        marginTop:"1.5rem",
    }
  };
  const StyledBox =styled(Box)({
    " & .label":{
        fontSize:".75rem !important",
        textTransform:"capitalize"
    }
  })

   // Customizable Area End

   export default CollectionCard