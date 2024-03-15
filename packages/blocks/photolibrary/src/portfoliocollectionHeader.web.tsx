import React from "react";

// Customizable Area Start
import {
    Grid
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomDropDown from "../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
export const configJSON = require("./config");
export const images = require('./assets');
import CloseIcon from '@material-ui/icons/Close';

// Customizable Area End
import PortfolioCollectionController, { Props } from "./PortfolioCollectionController.web";
import customTheme from "../../../components/src/DesignSystem/Theme/Theme.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import PortfolioCollectionData from "./PortfolioCollectionData.web";
// Customizable Area Start
// Customizable Area End

export default class PortfolioCollectionHeader extends PortfolioCollectionController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End

    render() {
        // Customizable Area Start
        const { libraryData, selectedImageIds } = this.state;
        const { contentModals, closeContentModal, selectedUpdate, selectedCollectionContent, handleSortSelect } = this.props;
        const selectedCollectionData = selectedCollectionContent?.collection?.data?.attributes
        const showImage = selectedCollectionContent?.galleries?.[0]?.catalogue_ids[0].data?.attributes.images?.url;
        const imageItems = libraryData.filter((item: any) => selectedCollectionData?.collection_type === "image" && item.attributes.images.type.startsWith("image"));
        const videoItems = libraryData.filter((item: any) =>
            selectedCollectionData?.collection_type == "video" && item.attributes.images.type.startsWith("video"));
            let setSelectedIds =this.state.selectedImageIds.length > 0
        return (
            <Grid>
                <Grid style={webStyle.mainHeader} onClick={this.openLibraryModal}>
                    {showImage && selectedCollectionData?.collection_type === "image" && <img src={showImage} style={webStyle.imageSizes} /> }
                    {showImage && selectedCollectionData?.collection_type === "video" &&
                    <video style={webStyle.imageSizes} src={showImage} controls />}
                    <Grid style={webStyle.mainContainer}>
                        <div>
                            <CustomTypography variant="h7" component="blue" >{selectedCollectionData?.collection_name}</CustomTypography>

                        </div>
                        <Grid style={webStyle.collectionHeader}>
                            <Grid style={webStyle.sortStyle}>

                                <Grid style={webStyle.contentDetail}>
                                    <img src={images.fileIcon} style={webStyle.iconSize} />
                                    <CustomTypography variant="outfitBody2" component="text_capitalize">{selectedCollectionContent?.count?.galleries_count} {selectedCollectionData?.collection_type}</CustomTypography>
                                </Grid>
                                <Grid style={webStyle.contentDetail}>
                                    <img src={images.eyeIcon} style={webStyle.iconSize} />
                                    <CustomTypography component="outfitBody2">{selectedCollectionData?.collection_subtype == "public_domain" ? "Published Collection" : "Private Collection"}</CustomTypography>
                                </Grid>
                                <Grid style={webStyle.divider}></Grid>
                                <Grid style={webStyle.contentDetail}>
                                    <CustomTypography component="outfitBody2">{selectedCollectionData?.download} Downloads </CustomTypography>
                                </Grid>
                            </Grid>
                            <Grid style={webStyle.contetStyleDrop} data-test-id="stopPropagation" onClick={(e: any) => { e.stopPropagation() }}>
                                <CustomDropDown variant="dropdownContent" style={webStyle.dropDownContent} endAdornment={<ExpandMoreIcon />} options={configJSON.sortType} selectedItem={selectedUpdate} selectNewItem={handleSortSelect} />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={webStyle.galleryContainer}>
                <PortfolioCollectionData selectedCollection={this.props.selectedCollection}
              contentModals={contentModals}
              openContentModal={this.props.openContentModal}
              closeContentModal={this.props.closeContentModal}
              selectedCollectionContent={selectedCollectionContent}
              showSelectedCollectionApi={this.props.showSelectedCollectionApi}
              currentDataPage={this.props.currentDataPage}
              prevDataPage={this.props.prevDataPage}
              nextDataPage={this.props.nextDataPage}
              handleSortSelect={this.props.handleSortSelect}
              data-test-id="PortfolioCollectionData"
              collectionData={this.props.collectionData}
              onItemClick={this.props.onItemClick}
              openLibraryModal={this.openLibraryModal}
               />
               </Grid>
                <ModalComponent
                    open={contentModals}
                    maxWidth={800}
                    maxHeight={508}
                >
                    <Grid style={webStyle.modalWidth}>
                        <div style={webStyle.crossIcons} >
                            <CloseIcon onClick={closeContentModal} style={webStyle.pointer} />
                        </div>
                        <Grid style={webStyle.modalWidthContent}>
                            {imageItems.length || videoItems.length > 0 ? 
                            <>
                            <Grid style={webStyle.libraryContent} >
                                {imageItems.map((data: any, index: any) => {
                                    const isSelected = selectedImageIds.includes(data.id);
                                    return (
                                        <Grid key={data.id} style={webStyle.setPosition}>
                                            <img src={data.attributes.images.url} style={webStyle.contentImage} data-test-id="handleImageClick" onClick={() => this.handleImageClick(data.id)} />
                                            {isSelected && (
                                                <div style={webStyle.tickIcon}>
                                                    <img src={images.selectIcon} />
                                                </div>
                                            )}
                                        </Grid>
                                    )
                                })}
                                {videoItems.map((data: any, index: any) => {
                                    const isSelected = selectedImageIds.includes(data.id);
                                    return (
                                        <Grid key={data.id} style={webStyle.setPosition}>
                                            <div onClick={() => this.handleImageClick(data.id)} data-test-id="handleImageClick" style={webStyle.borderWidth}>
                                                <video style={webStyle.contentImage} >
                                                    <source src={data.attributes.images.url} />
                                                </video>
                                            </div>

                                            {isSelected && (
                                                <div style={webStyle.tickIcon}>
                                                    <img src={images.selectIcon} />
                                                </div>
                                            )}
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <Grid style={webStyle.submitModalContent}>
                                <Grid style={webStyle.btnWidth}>
                                    <CustomButton variant={!setSelectedIds ? 'nextDisableBtn' : 'primary'} fullWidth='fullWidth' size={"large"} data-test-id="saveContentCall"
                    onClick={setSelectedIds ? this.saveContentCall : null}
                     >{configJSON.save}
                    </CustomButton>
                                </Grid>
                            </Grid>
                            </> : 
                            <Grid style={webStyle.noContent}>
                            <CustomTypography>{configJSON.noContentFound}</CustomTypography>
                            </Grid>}
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
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "10px 24px",
        width: "100%",
    },
    mainHeader: {
        backgroundColor: customTheme.palette.white.dark,
        padding: "15px 24px",
        cursor: "pointer",
        width: "96%",
        display: 'flex',
        alignItems: "center",
    },
    collectionHeader: {
        display: "flex",
        justifyContent: "space-between",
    },
    collectionBtn: {
        width: "200px"
    },
    contetStyleDrop: {
        height: "48px",
        border: `1px solid ${customTheme.palette.primary.main}`,
        backgroundColor: customTheme.palette.white.main,
        display: "flex",
        justifyContent: "space-between",
        width: "149px",
        alignItems: "center",
    },
    dropDownContent: {
        width: "149px",
    },
    sortStyle: {
        display: "flex",
        // wid?th:"32%",
        gap: "20px",
        justifyContent: "space-between",
    },
    contentDetail: {
        display: "flex",
        gap: "5px",
        alignItems: "center"
    },
    iconSize: {
        width: "18px",
        height: "18px"
    },
    divider: {
        backgroundColor: customTheme.palette.secondary.main,
        width: "2px",
        height: "24px",
        marginTop: "15px"
    },
    crossIcons: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
    },
    pointer: {
        cursor: "pointer"
    },
    submitModalContent: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    btnWidth: {
        width: "122px"
    },
    contentImage: {
        width: "301px",
        height: "182px",
        cursor: "pointer"
    },
    libraryContent: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
    },
    modalWidth: {
        display: "flex",
        flexDirection: "column",
        gap: '20px',
    },
    tickIcon: {
        position: 'absolute',
        top: "10px",
        right: "10px",
    },
    modalWidthContent: {
        display: "flex",
        flexDirection: "column",
        gap: '20px',
        height: "90%",
        justifyContent: "space-between"
    },
    imageSizes: { width: "64px", height: "94px" },
    setPosition: { position: 'relative' },
    borderWidth: {
        border: `1px solid ${customTheme.palette.primary.main}`
    },
    noContent:{
        height:"100%",
        margin:"auto",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"50px"
    },
    galleryContainer:{
        height:"550px",
      }
};
// Customizable Area End
