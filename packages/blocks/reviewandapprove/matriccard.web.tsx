import React from "react";
// Customizable Area Start
import { Box } from "@material-ui/core";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";

interface Props {
    title: string;
    subtitle: any;
    value: any
    icon: any
    color: any
}
// Customizable Area End
 
export default class MetricsCard extends React.Component<Props>{
    render(){
         // Customizable Area Start
        return(
            <Box style={webStyles.cardContainer} >
                <Box style={{...webStyles.iconContainer, background: this.props.color}}>
                    {this.props.icon && React.cloneElement(this.props.icon, { style: webStyles.iconStyles })}
                </Box>
                <CustomTypography component="body5"  >{this.props.title}</CustomTypography>
                <CustomTypography component="title2"  >{this.props.value}</CustomTypography>
                <CustomTypography component="body2" textTransform='capitalize' >{this.props.subtitle}</CustomTypography>
            </Box>

             // Customizable Area End
        )
    }
}

// Customizable Area Start
 
const webStyles: any = {
    iconStyles:{
        color: '#FFFFFF',
        height: '1.5rem',
        width: '1.5rem'
    },
    iconContainer: {
        height: '2.5rem',
        width: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0

    },
    cardContainer:{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding:"1.25rem 1.5rem",
    },
  };

   // Customizable Area End