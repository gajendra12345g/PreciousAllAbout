import React from "react";
// Customizable Area Start
import {
    Box,
    Grid, styled, CircularProgress,
} from "@material-ui/core";
import { doubleTickIcon } from "./assets"
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
export const configJSON = require("./config");
export const images= require("./assets")
// Customizable Area End
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
const getImageName = (imageUrl: string) => {
    const urlParts = imageUrl.split('/');
    const imageName = urlParts[urlParts.length - 1];
    return imageName;
};
interface Props {
    goToPortfolioPage: any;
    showUploadedData : any
    goToUpload: ()=>void;
    selectedSingleContent: any;
    handleImageClick: any
}

export default class CatalogueSubmit extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    tabFirstContent = () => {
        const { showUploadedData, selectedSingleContent, handleImageClick } = this.props

        return (
            <Grid style={webStyle.visibleData}>
                {showUploadedData.map((catalogueData: any, index: any) => {
                    const { url } = catalogueData.attributes.images;
                    const isVideo = url.endsWith('.mp4');

                    return (
                        <div style={webStyle.contentData} key={index} data-test-id="imageClick" onClick={() =>handleImageClick(catalogueData.id, getImageName(url), url)}>
                            {isVideo ? (
                                <div
                                    style={{
                                        ...webStyle.contentData,
                                        ...webStyle.showContentSize,
                                        outline: selectedSingleContent.includes(catalogueData.id) ? '2px solid #3A82FF' : 'none',
                                    }}
                                    data-test-id="handleImageClick"
                                    onClick={() => handleImageClick(catalogueData.id, getImageName(url), url)}

                                >
                                    <video
                                        controls
                                        style={webStyle.contentWidth}key={index}
                                        src={url}
                                    />
                                </div>
                            ) : (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Image ${index + 1}`}
                                    style={{
                                        ...webStyle.contentData,
                                        ...webStyle.showContentSize,
                                        outline: selectedSingleContent.includes(catalogueData.id) ? '2px solid #3A82FF' : 'none',
                                    }}
                                />
                            )}
                            <div style={webStyle.moreIcon}>
                                <CustomTypography variant="outfitHeading5" component="text_capitalize">{`${getImageName(url)}`}</CustomTypography>
                                <img src={images.moreIcon} style={webStyle.iconHeight} />

                            </div>
                        </div>
                    );
                })}
            </Grid>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        const { goToPortfolioPage, showUploadedData, goToUpload } = this.props;
        const booleanValue = goToPortfolioPage;
        const submitContent = booleanValue && showUploadedData.length === 0
        // Customizable Area End
        return (
            // Customizable Area Start
            <>
                <Grid style={{ display: booleanValue ? "block" : "none" }}>
                    <TopBanner>
                        <div style={webStyle.headerBanner}>
                            <img src={doubleTickIcon} alt="" style={webStyle.img} />
                        </div>
                        <div style={webStyle.headerBannerRightSection}>
                            <CustomTypography variant="bannerText" component="text_none">
                                {configJSON.topBannerText} <span style={webStyle.link}>{configJSON.learnMore}</span>
                            </CustomTypography>
                        </div>
                    </TopBanner>
                </Grid>

                {!booleanValue && showUploadedData.length === 0 && (
                    <Grid style={webStyle.selectedContentDetails}>
                        <div>
                        <CustomTypography component="outfitHeading3">{configJSON.noSubmitHead}</CustomTypography>
                        <div style={webStyle.alignText}>
                        <CustomTypography variant='selectMultitext' component="text_none">{configJSON.noSubmitContent}</CustomTypography>
                        </div>
                        <div style={webStyle.displayflex}>
                        <div style={webStyle.btnWidth}>
                        <CustomButton variant="primary" fullWidth='fullWidth' size={"large"} onClick={goToUpload}>{configJSON.startHere}</CustomButton>
                        </div></div> </div></Grid>
                )}

                {submitContent ? (
                    <CircularProgress style={webStyle.selectedContentDetails} />
                ) :

                    this.tabFirstContent()

                }
            </>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const webStyle: any = {
    selectedContentDetails: {
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "91vh",
        flexDirection: "column",
        gap: "20px",
        overflowY: "hidden",
    },
    headerBanner: {
        background: "#1FD794",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "4rem",
        marginRight: "1rem"
    },
    headerBannerRightSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        height: "1.5rem",
        width: "1.5rem"
    },
    link: {
        cursor: "pointer",
        color: "#3A82FF"
    },
    showContentSize: {
        width: "192px",
        height: "158px",
        borderWidth: "7px 23px",
        borderStyle: "solid",
        borderColor: "#D9D9D9",
    },
    contentData: {
        margin: "10px",
        display: "flex",
        flexDirection: "column"
    },
    visibleData: {
        display: "flex",
        flexWrap: "wrap",
    },
    moreIcon: {
        display: "flex",
        justifyContent: "space-between",
        margin: "0px 10px",
        width: "240px"
    },
    btnWidth:{width:"224px"},
    contentWidth:{ width: "100%", height: "100%" },
    iconHeight:{ height: "30px" },
    position:{ position: "relative" },
    flexDisplay:{ display: 'flex', alignItems: 'center', justifyContent: 'center' },
    objectFit: {objectFit: 'contain'},
    displayflex:{
        width:"100%", display: 'flex', justifyContent: 'center' 
    },
    alignText:{
        textAlign:"center"
    }
};
const TopBanner = styled(Box)({
    border: "1px solid #BFC2C3",
    height: "3.75rem",
    margin: "0px auto",
    width: "92%",
    display: 'flex'
})
// Customizable Area End
