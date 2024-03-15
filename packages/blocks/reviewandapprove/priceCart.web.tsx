import React from "react";
// Customizable Area Start
import { Box } from "@material-ui/core";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";

interface Props {
    title: string;
    value: string;
    isActive?: any;
    onClick?: () => void;
}
// Customizable Area End
 
class PriceCard extends React.Component<Props>{
    render(){
         // Customizable Area Start
        return(
            <Box style={this.props.isActive ? webStyles.activeCardContainer : webStyles.cardContainer} onClick={this.props.onClick} >
                <Box style={this.props.isActive ? webStyles.activeHeaderContainer : webStyles.headerContainer}>
                    <CustomTypography component="body">{this.props.title}</CustomTypography>
                </Box>
                <Box style={webStyles.priceContainer}>
                    <CustomTypography component="title2">{this.props.value}</CustomTypography>
                </Box>
            </Box>

             // Customizable Area End
        )
    }
}

// Customizable Area Start
 
const webStyles: any = {
    cardContainer:{
      display: 'flex',
      flexDirection: 'column',
      width: '100%' ,
      height: '7rem',
      border: '1px solid #E7EBEB',
      cursor:"pointer"
    },
    headerContainer: {
        height: '2.5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#E7EBEB'
    },
    priceContainer: {
        height: '4.5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeHeaderContainer: {
        height: '2.5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#3A82FF',
        color: '#FFFFFF',
    },
    activeCardContainer:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%' ,
        height: '7rem',
        border: '1px solid #3A82FF',
        cursor:"pointer"
      },
  };

   // Customizable Area End

   export default PriceCard