import React from "react";

// Customizable Area Start
import {
   Grid, Box
} from "@material-ui/core";
export const configJSON = require("./config");
export const images = require('./assets')
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import CustomRadioButton from "../../../components/src/DesignSystem/CustomRadioButton/CustomRadioButton";
import CloseIcon from '@material-ui/icons/Close';
// Customizable Area End


// Customizable Area Start
interface Props {
    openCollectionModal: (value: any) => void;
    openAssestModal: (value: any) => void;
    assetsModal: boolean;
    closeAssetsModal:(value:any) => void;
    selectedButton:string;
    handleButtonClick:(value:any) => void;
    handleSetVisibility: (value:any) => void;
    setVisibility:any
}
// Customizable Area End

export default class PhotoLibrarySection extends React.Component<Props>{
  [x: string]: any;
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { openCollectionModal, openAssestModal, assetsModal, closeAssetsModal, setVisibility, handleSetVisibility,selectedButton,handleButtonClick} = this.props
    return (
      <Grid>
        <Grid container spacing={2} style={webStyle.mainContainer}>
        <CustomTypography component="title2">{configJSON.createCollectionText}</CustomTypography>
        <CustomTypography variant="outfitBody1" component="font_color">{configJSON.viewContentText}</CustomTypography>
        <Grid style={webStyle.collectionBtn}>
        <CustomButton variant="secondary" fullWidth="fullWidth" size={"large"} onClick= {openCollectionModal}>{configJSON.collectionBtn}</CustomButton>
        </Grid>
  </Grid>
      <Grid container spacing={2} style={webStyle.mainContainer}>
      <CustomTypography component="title2">{configJSON.noAssetsText}</CustomTypography>
      <Grid style={webStyle.collectionBtn}>
      <CustomButton variant="secondary" fullWidth="fullWidth" size={"large"} onClick= {openAssestModal}>{configJSON.addAssets}</CustomButton>
      </Grid>
</Grid>
<ModalComponent
                    open={assetsModal}
                    maxWidth={508}
                    modalMinHeight={'0px'}
                >
                    <Grid style={webStyle.modalHeight}>
                        <div style={webStyle.crossIcons}>
                            <CloseIcon onClick={closeAssetsModal} />
                        </div>
                        <Grid style={webStyle.submitModalContent}>

                            <CustomTypography component="title2">{configJSON.addAssets}</CustomTypography>
                           <Box style={webStyle.fillCollection}> <CustomTypography variant="outfitBody2" component="text_none">{configJSON.newCollectionName}</CustomTypography>
                            <Input
                            type="text"
                            placeholder="Nature_image 2023"
                            />
                            </Box>
                            
                           <Box style={webStyle.fillCollection}>
                           <Box style={webStyle.orStyle}> 
                            <CustomTypography variant="outfitBody2" component="text_none">{configJSON.or}</CustomTypography>
                            </Box>
                             <CustomTypography variant="outfitBody2" component="text_none">{configJSON.existingCollectionName}</CustomTypography>
                            <Input
                            type="text"
                            placeholder="Nature_image 2023"
                            />
                            </Box>
                            <Grid style={webStyle.fillCollection}> 
                            <CustomTypography variant="outfitBody2" component="text_none" >{configJSON.collectionType}</CustomTypography>
                            <Box style={webStyle.actionBtns}>
                                <Grid style={webStyle.selectedContentBtn}>
                            <CustomButton variant={selectedButton === "image" ? "collectionContentBtn" : "tertiarySecondaryWithBorder"} fullWidth='fullWidth' component="text_none" size={"large"}  closeBtn={true} onClick={() => handleButtonClick("image")}>{configJSON.image}</CustomButton>
                            </Grid>
                            <Grid style={webStyle.selectedContentBtn}>
                                <CustomButton variant={selectedButton === "video" ? "collectionContentBtn" : "tertiarySecondaryWithBorder"} size={"large"}  fullWidth='fullWidth' component="text_none" closeBtn={true} onClick={() => handleButtonClick("video")}>{configJSON.video}</CustomButton>
                            </Grid>
                            </Box>
                            </Grid>
                            <Box>
                            <Box style={webStyle.radioBtn}>
                                <CustomRadioButton 
                             onChange={handleSetVisibility}
                             checked={
                               setVisibility === configJSON.publicVisibility
                             }
                             value={configJSON.publicVisibility}
                             />
                                <CustomTypography variant="outfitBody2" component="text_none">{configJSON.publicVisibility}</CustomTypography>
                            </Box>
                            <Grid style={webStyle.radioBtn}>
                                <CustomRadioButton 
                             onChange={handleSetVisibility}
                             checked={
                               setVisibility === configJSON.privateVisibility
                             }
                             value={configJSON.privateVisibility}
                             />
                                <CustomTypography variant="outfitBody2" component="text_none">{configJSON.privateVisibility}</CustomTypography>
                            </Grid>
                            </Box>
                            <Box style={webStyle.btnWidth}>
                                <CustomButton variant="primary" fullWidth='fullWidth' size={"large"} closeBtn={true} onClick={closeAssetsModal}>{configJSON.save}</CustomButton>
                            </Box>
                        </Grid>
                    </Grid>
                </ModalComponent>
</Grid>
      
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyle: any = {
    mainContainer:{
        display:"flex",
        flexDirection:"column",
        gap:"24px",
        overflow:"hidden",
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
    },
    crossIcons: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end"
  },
  actionBtns:{
      display:"flex",
      width:"100%",
      gap:"20px"
  },
  selectedContentBtn:{
      width:"232px",
      height:"48px"
  },
  modalHeight:{
      height:"660px"
  },
  submitModalContent:{
      padding:"50px 20px",
      gap:"24px",
      display:"flex",
      flexDirection:"column"
  },
    collectionBtn:{
        width:"224px",
        height:"48px"
    },
    fillCollection:{
      display:"flex",
      flexDirection:"column",
      gap:"10px"
  },
  radioBtn:{
      display:"flex",
      justifyContent:"space-between",
      width:"20%",
      alignItems:"center"
  },
  orStyle:{
    width:'100%',
    textAlign:"center"
  }
};

// Customizable Area End
