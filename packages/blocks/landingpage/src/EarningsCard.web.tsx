import React from "react";
// Customizable Area Start
import { Box } from "@material-ui/core";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import {uploadIcon} from "./assets"

interface Props {
  uploadContentBtn :(value: any)=>void
}
// Customizable Area End

class EarningsCard extends React.Component<Props>{
    render(){
         // Customizable Area Start
        return(
            <CustomCard variant="variant2" >
            <Box style={webStyles.cardHeader}>
              <CustomTypography variant="primary" component="header1"  >EARNINGS</CustomTypography>
              <CustomTypography variant="blue" component="outfitBody2">See earnings summary</CustomTypography>
            </Box>
            <Box  style={webStyles.cardContentContainer}>
                <Box style={webStyles.centerContent}>
                    <Box>
                        <CustomTypography variant="primary" component="title2">START UPLOADING TODAY</CustomTypography>
                    </Box>
                    <Box style={webStyles.btn}>
                        <CustomButton startIcon={<img src={uploadIcon} />}  variant="primary" size="large" fullWidth="fullWidth" onClick={this.props.uploadContentBtn}>UPLOAD</CustomButton>
                    </Box>
                    <Box style={webStyles.footerTxt}>
                        <CustomTypography variant="primary" component = "outfitBody2" >Unsure what types of content to submit? Check out the Shot List.</CustomTypography>
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
    cardSubHeader1:{
      paddingTop:".5rem",
      display:"flex",
      justifyContent:"center",
      borderBottom:"1px solid #C4C4C4"
    },
    cardContentContainer:{
        padding:"1.375rem 1rem",
        position:"relative",
        height:"100%",
      },
    card1Content:{
      display:"flex",
      justifyContent:"space-between",
      marginTop:"1rem"
    },
    circle:{
      borderRadius:"50%",
      padding:".5rem .75rem",
      backgroundColor:"#000",
      
    },
    cardFooter:{
        borderTop:"1px solid #C4C4C4",
        marginTop:"1.5rem",
        paddingTop:".5rem",
    },
    alignItemCenter:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    },
    centerContent:{
        marginTop:"5.25rem",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{
        width:"9rem",
        marginTop:"1.25rem"
    },
    footerTxt:{
        textAlign:"center",
        marginTop:"6rem"
    }
  };

   // Customizable Area End

   export default EarningsCard