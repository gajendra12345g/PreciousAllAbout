import React from "react";
// Customizable Area Start
import { Box} from "@material-ui/core";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import {mapImage,uploadIconWhite} from "./assets"

interface Props {
}
// Customizable Area End

class LatestDownload extends React.Component<Props>{
    render(){
         // Customizable Area Start
        return(
            <CustomCard variant="variant2" >
            <Box style={webStyles.cardHeader}>
              <CustomTypography variant="primary" component="header1"  >LATEST DOWNLOADS</CustomTypography>
            </Box>
            <Box  style={webStyles.cardContentContainer}>
                <Box>
                    
                </Box>
                <Box style={webStyles.cardFooter}>
                <CustomTypography variant="primary" component = "outfitBody2" >There are no downloads to display.</CustomTypography>
                <Box style={webStyles.btn} >
                    <CustomButton startIcon={<img src={uploadIconWhite} />} variant="secondary" size="large" fullWidth="fullWidth" >UPLOAD</CustomButton>
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

    cardHeader:{
      paddingTop:"1.375rem",
      paddingBottom:".5rem",
      paddingLeft:"1rem",
      paddingRight:"1rem",
      borderBottom:"1px solid #C4C4C4",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center"
      
    },
   
    cardContentContainer:{
        padding:"1.375rem 1rem",
        position:"relative",
        height:"38.75rem",
        backgroundImage: `url(${mapImage})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between"
      },
    
    cardFooter:{
        marginBottom:"1rem",
        textAlign:"center"
    },
    btn:{
        margin:"auto",
        width:"9rem",
        marginTop:"1.25rem"
    }
  };

   // Customizable Area End

   export default LatestDownload