import React from "react";

// Customizable Area Start
import {
  Box, Grid
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomDropDown from "../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
export const configJSON = require("./config");
export const images = require('./assets')
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import CustomRadioButton from "../../../components/src/DesignSystem/CustomRadioButton/CustomRadioButton";
// Customizable Area End


// Customizable Area Start
interface Props {
    selectedContent:any;
    handleContentSelect : (value: any) => void;
    selectedPublish: any;
    handlePublishSelect : (value:any) => void;
    selectedUpdate: any;
    handleSortSelect: (value:any) => void;
    closeCollectionModal: (valu:any) => void;
    collectionModal: any;
    openCollectionModal : (value:any) => void;
    selectedButton:string;
    handleButtonClick:(value:any) => void;
    handleSetVisibility: (value:any) => void;
    setVisibility:any
}
// Customizable Area End

export default class PhotoLibraryCollection extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {selectedContent, handleContentSelect, selectedPublish, handlePublishSelect, selectedUpdate, handleSortSelect, collectionModal,closeCollectionModal, selectedButton,openCollectionModal,handleButtonClick,setVisibility, handleSetVisibility} = this.props
    return (
        <Grid container spacing={2} style={webStyle.mainContainer}>
            <Grid style={webStyle.collectionHeader}>
        <Grid>
          <CustomTypography component="header1">{configJSON.collection}</CustomTypography>
        </Grid>
        <Grid style={webStyle.collectionBtn}>
          <CustomButton size={"large"} fullWidth="fullWidth" variant="collectionBtn" startIcon={<AddIcon/>} onClick={openCollectionModal}>{configJSON.newCollection}</CustomButton>
        </Grid>
        </Grid>
        <Grid style={webStyle.sortingContainer} spacing={4}>
            <Grid style={webStyle.contetStyleDrop}>
            <CustomDropDown variant = "dropdownContent" style={webStyle.dropDownContent} endAdornment={<ExpandMoreIcon/>} options={configJSON.contentType} selectedItem={selectedContent} selectNewItem={handleContentSelect}/>
            </Grid>
            <Grid style={webStyle.contetStyleDrop}>
            <CustomDropDown variant = "dropdownContent" style={webStyle.dropDownContent} endAdornment={<ExpandMoreIcon/>} options={configJSON.publishType} selectedItem={selectedPublish} selectNewItem={handlePublishSelect}/>
            </Grid>
            <Grid style={webStyle.searchBar}>
                <Input
                  startAdornment={<img src={images.searchIcon} />}
                  placeholder={configJSON.searchText}
                />
            </Grid>
            <Grid style={webStyle.contetStyleDrop}>
            <CustomDropDown variant = "dropdownContent" style={webStyle.dropDownContent} endAdornment={<ExpandMoreIcon/>} options={configJSON.sortType} selectedItem={selectedUpdate} selectNewItem={handleSortSelect}/>
            </Grid>
        </Grid>

        <ModalComponent
                    open={collectionModal}
                    maxWidth={508}
                    modalMinHeight={'0px'}
                >
                    <Grid style={webStyle.modalHeight}>
                        <div style={webStyle.crossIcons}>
                            <CloseIcon onClick={closeCollectionModal} />
                        </div>
                        <Grid style={webStyle.submitModalContent}>

                            <CustomTypography component="title2">{configJSON.newCollection}</CustomTypography>
                           <Box style={webStyle.fillCollection}> <CustomTypography variant="outfitBody2" component="text_none">{configJSON.collectionName}</CustomTypography>
                            <Input
                            type="text"
                            placeholder="Nature_image 2023"
                            />
                            </Box>
                            <Box style={webStyle.fillCollection}> 
                            <CustomTypography variant="outfitBody2" component="text_none" >{configJSON.collectionType}</CustomTypography>
                            <div style={webStyle.actionBtns}>
                                <Grid style={webStyle.selectedContentBtn}>
                            <CustomButton variant={selectedButton === "image" ? "collectionContentBtn" : "tertiarySecondaryWithBorder"} fullWidth='fullWidth' size={"large"} component="text_none" closeBtn={true} onClick={() => handleButtonClick("image")}>{configJSON.image}</CustomButton>
                            </Grid>
                            <Grid style={webStyle.selectedContentBtn}>
                                <CustomButton variant={selectedButton === "video" ? "collectionContentBtn" : "tertiarySecondaryWithBorder"} fullWidth='fullWidth' size={"large"} component="text_none" closeBtn={true} onClick={() => handleButtonClick("video")}>{configJSON.video}</CustomButton>
                            </Grid>
                            </div>
                            </Box>
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
                            <Box style={webStyle.radioBtn}>
                                <CustomRadioButton 
                             onChange={handleSetVisibility}
                             checked={
                               setVisibility === configJSON.privateVisibility
                             }
                             value={configJSON.privateVisibility}
                             />
                                <CustomTypography variant="outfitBody2" component="text_none">{configJSON.privateVisibility}</CustomTypography>
                            </Box>
                            </Box>
                            <div style={webStyle.btnWidth}>
                                <CustomButton variant="primary" fullWidth='fullWidth' size={"large"} closeBtn={true} onClick={closeCollectionModal}>{configJSON.save}</CustomButton>
                            </div>
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
        backgroundColor:"#E7EBEB",
        padding:"14px 24px",
        display:"flex",
        flexDirection:"column",
        gap:"24px",
        overflow:"hidden",
         height:"100%"
        
    },
    collectionHeader:{
        display:"flex",
        justifyContent:"space-between",
        width:"94%",
        padding:"0px 45px",
        paddingTop:"20px"

    },
    collectionBtn:{
        width:"200px"
    },
    contetStyleDrop:{
        height:"48px",
        border:"1px solid #000000",
        backgroundColor:'#FFFFFF',
        display:"flex",
        justifyContent:"space-between",
        width:"149px",
        alignItems:"center",
        marginTop:"8px"
    },
    dropDownContent:{
        width:"149px",
    },
    sortingContainer:{
        display:"flex",
        justifyContent:"space-evenly",
        width:"100%"
    },
    searchBar:{
        width:"723px",
        height:"48px",
        marginTop:"0px"
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
        height:"548px"
    },
    submitModalContent:{
        padding:"40px 20px",
        gap:"32px",
        display:"flex",
        flexDirection:"column"
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
    }
};

// Customizable Area End
