import React from "react";
// Customizable Area Start
import { Box,styled } from "@material-ui/core";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
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
}
// Customizable Area End

class TopPerformerCard extends React.Component<Props>{
    render(){
         // Customizable Area Start
        return(
            <CustomCard variant="variant2" >
                <Box style={webStyles.cardHeader}>
              <CustomTypography variant="primary" component="header1"  >TOP 5 PERFORMERS</CustomTypography>
              <CustomTypography variant="blue" component="outfitBody2">View all top performers</CustomTypography>
            </Box>
            <Box  style={webStyles.cardContentContainer}>
                <Box style={webStyles.headerContainer}>
                    <StyledBox style={webStyles.dropDownloadContainer}>
                        <Box style={webStyles.label}>
                            <CustomTypography variant="secondary" component="outfitBody" >Asset Type</CustomTypography>
                        </Box>
                        <CustomDropDown variant="dropdownBtnSecondary" options={configJSON.assestType} selectNewItem={this.props.handleChangeAssetType} selectedItem={this.props.selectedAssetType} />
                    </StyledBox>
                    <StyledBox style={webStyles.dropDownloadContainer}>
                        <Box  style={webStyles.label}>
                            <CustomTypography variant="secondary" component="outfitBody" >Published</CustomTypography>
                        </Box>
                        <CustomDropDown variant="dropdownBtnSecondary" options={configJSON.publishedType} selectNewItem={this.props.handleChangePublishedType} selectedItem={this.props.selectedPublishedType} />
                    </StyledBox>
                </Box>
                <Box style={webStyles.contetContainer}>
                    <Box>
                        <CustomTypography variant="primary" component="h7">
                        LOOKS LIKE YOU DON"T HAVE ANY SALES YET.
                        </CustomTypography>
                    </Box>
                    <Box>
                        <CustomTypography variant="secondary" component="body11">
                        Keep uploading! A bigger portfolio increases your chances of a sale.
                        </CustomTypography>
                    </Box>
                </Box>
            </Box>
       </CustomCard>

             // Customizable Area End
        )
    }
}

// Customizable Area Start
 
const webStyles: any = {
    container:{
        maxHeight:"26.25rem"
    },
    cardHeader:{
      paddingTop:"1.375rem",
      paddingBottom:".5rem",
      paddingLeft:"1rem",
      borderBottom:"1px solid #C4C4C4",
      paddingRight:"1rem",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      
    },
    cardContentContainer:{
        height:"22.68rem",
    },
    headerContainer:{
        display:"flex",
        marginTop:".75rem",
        paddingLeft:"1rem",
        gap:"1rem",
    },
    dropDownloadContainer:{
        width:"6.95rem",
    },
    label:{
        marginBottom:".35rem",
    },
    contetContainer:{
        textAlign:"center",
        marginTop:"5.7rem",
    },
    btnContainer:{
        margin:"auto",
        width:"16.5rem",
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

   export default TopPerformerCard