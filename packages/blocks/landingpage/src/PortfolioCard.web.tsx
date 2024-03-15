import React from "react";
// Customizable Area Start
import { Box, styled, Tabs,Tab } from "@material-ui/core";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";

interface Props {
    portFolioStatusTab: number;
    handleChange: (event: React.ChangeEvent<{}>, newValue: number)=>void
}
// Customizable Area End

class PortfolioCard extends React.Component<Props>{
    render(){
         // Customizable Area Start
        return(
            <CustomCard variant="variant2" >
                <Box style={webStyles.cardHeader}>
                  <CustomTypography variant="primary" component="header1"  >PORTFOLIO STATUS</CustomTypography>
                </Box>
                <Box style={webStyles.cardContentContainer}>
                  <Box style={webStyles.cardSubHeader1}>
                    <CustomTabs value={this.props.portFolioStatusTab} onChange={this.props.handleChange} >
                      <Tab label="Images" />
                      <Tab label ="Videos"/>
                    </CustomTabs>
                  </Box>
                  {this.props.portFolioStatusTab ?
                 <>
                 <Box style={webStyles.card1Content}>
                  <Box style={webStyles.alignItemCenter}>
                    <CustomTypography variant="blue" component="outfitBody2" >Not submitted</CustomTypography>
                  </Box>
                  <Box style={webStyles.circle}>
                    <CustomTypography variant="white" component="outfitBody2">0</CustomTypography>
                  </Box>
                </Box>
                <Box style={webStyles.card1Content}>
                  <Box>
                    <CustomTypography variant="blue" component="outfitBody2" >Pending approval</CustomTypography>
                    <CustomTypography variant="secondary" component="outfitBody3" >Updated several times daily</CustomTypography>
                  </Box>
                  <Box style={webStyles.circle}>
                    <CustomTypography variant="white" component="outfitBody2">0</CustomTypography>
                  </Box>
                </Box>
                <Box style={webStyles.card1Content}>
                  <Box>
                    <CustomTypography variant="blue" component="outfitBody2" >Recently reviewed</CustomTypography>
                    <CustomTypography variant="secondary" component="outfitBody3" >In the last 3 weeks</CustomTypography>
                  </Box>
                  <Box style={webStyles.circle}>
                    <CustomTypography variant="white" component="outfitBody2">0</CustomTypography>
                  </Box>
                </Box>
                <Box style={{...webStyles.card1Content,...webStyles.cardFooter}}>
                <Box style={webStyles.alignItemCenter}>
                  <CustomTypography variant="blue" component="outfitBody2" >Video portfolio </CustomTypography>
                </Box>
                      <Box style={webStyles.circle}>
                  <CustomTypography variant="white" component="outfitBody2">0</CustomTypography>
                  </Box>
                </Box>
                </>
                  :
                  <>
                  <Box style={webStyles.card1Content}>
                  <Box style={webStyles.alignItemCenter}>
                    <CustomTypography variant="blue" component="outfitBody2">Not submitted</CustomTypography>
                  </Box>
                  <Box style={webStyles.circle}>
                    <CustomTypography variant="white" component="outfitBody2">0</CustomTypography>
                  </Box>
                </Box><Box style={webStyles.card1Content}>
                    <Box>
                      <CustomTypography variant="blue" component="outfitBody2">Pending approval</CustomTypography>
                      <CustomTypography variant="secondary" component="outfitBody3">Updated several times daily</CustomTypography>
                    </Box>
                    <Box style={webStyles.circle}>
                      <CustomTypography variant="white" component="outfitBody2">0</CustomTypography>
                    </Box>
                  </Box><Box style={webStyles.card1Content}>
                    <Box>
                      <CustomTypography variant="blue" component="outfitBody2">Recently reviewed</CustomTypography>
                      <CustomTypography variant="secondary" component="outfitBody3">In the last 3 weeks</CustomTypography>
                    </Box>
                    <Box style={webStyles.circle}>
                      <CustomTypography variant="white" component="outfitBody2">0</CustomTypography>
                    </Box>
                  </Box><Box style={{ ...webStyles.card1Content, ...webStyles.cardFooter }}>
                    <Box style={webStyles.alignItemCenter}>
                      <CustomTypography variant="blue" component="outfitBody2">Image portfolio</CustomTypography>
                    </Box>
                    <Box style={webStyles.circle}>
                      <CustomTypography variant="white" component="outfitBody2">0</CustomTypography>
                    </Box>
                  </Box>
                  </>}
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
      borderBottom:"1px solid #C4C4C4"
      
    },
    cardSubHeader1:{
      paddingTop:".5rem",
      display:"flex",
      justifyContent:"center",
      borderBottom:"1px solid #C4C4C4"
    },
    cardContentContainer:{
      padding:"1.375rem 1rem"
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
    }
  
  };

  const CustomTabs =styled(Tabs)({
    "& .MuiTabs-indicator":{
      backgroundColor:"#000000",
      width:"3.125rem"
    },
    "& .MuiTab-textColorInherit":{
      color:"#73767A",
      fontFamily : "LemonMilk",
      fontSize:"12px",
      fontWeight:500,
      minWidth:"3.125rem"
    },
    "& .Mui-selected span":{
      color:"#000000"
    },
    "& .MuiTabs-flexContainer":{
      gap:"1rem"
    }
  })

   // Customizable Area End

   export default PortfolioCard