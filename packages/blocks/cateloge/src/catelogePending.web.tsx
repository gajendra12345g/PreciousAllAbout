import React from "react";
// Customizable Area Start
import {
    Box,
    Grid, styled,CircularProgress
} from "@material-ui/core";
import { doubleTickIcon } from "./assets"
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
// Customizable Area End
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
export const configJSON = require("./config");
export const images= require("./assets")
const getImageName = (imageUrl: string) => {
    const urlParts = imageUrl.split('/');
    const imageName = urlParts[urlParts.length - 1];
    return imageName;
};
interface Props {
    goToPortfolioPage: any, 
    showPendingData: any,
     selectedSingleContent:any,
     handleImageClick: any,
     goToSubmiTab: any
}

export default class CataloguePending extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    tabSecondContent = () => {
        const { showPendingData, selectedSingleContent, handleImageClick} = this.props
        return (
            <Grid style={webStyle.visibleData}>
                {showPendingData.map((item: any, index: any) => {
                    const { url, status } = item.attributes.images;
                    const isVideo = url.endsWith('.mp4');

                    return (
                        status === "pending" && (
                            <div style={webStyle.contentData} key={index} data-test-id='handlePending' onClick={() => handleImageClick(item.id, getImageName(url), url)}>
                                {isVideo ? (
                                    <div
                                        style={{
                                            ...webStyle.contentData,
                                            ...webStyle.showContentSize,
                                            outline: selectedSingleContent.includes(item.id) ? '2px solid #3A82FF' : 'none',
                                        }}
                                        data-test-id="handleImageClick"
                                        onClick={() =>handleImageClick(item.id, getImageName(url), url)}
                                    >
                                        <video
                                            key={index}
                                            src={url}
                                            controls
                                            style={webStyle.contentWidth}
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
                                            outline: selectedSingleContent.includes(item.id) ? '2px solid #3A82FF' : 'none',
                                        }}
                                    />
                                )}
                                <div style={webStyle.moreIcon}>
                                    <CustomTypography variant="outfitHeading5" component="text_capitalize">{`${getImageName(url)}`}</CustomTypography>
                                    <img src={images.moreIcon} style={{ height: "30px" }} />
                                </div>
                            </div>
                        )
                    );
                })}
            </Grid>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        const { goToPortfolioPage, showPendingData, goToSubmiTab } = this.props;
        const booleanValue = goToPortfolioPage;
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
                            {configJSON.topBannerPendingText}
                        </CustomTypography>
                    </div>
                </TopBanner>
            </Grid>
            {(!booleanValue && showPendingData.length === 0) && <Grid style={webStyle.selectedContentDetails}>
                <CustomTypography component="outfitHeading3">{configJSON.noPendingHead}</CustomTypography>
                <CustomTypography variant='selectMultitext' component="text_none">{configJSON.noPendingContent}</CustomTypography>
                <div style={webStyle.btnWidth}>
                    <CustomButton variant="primary" fullWidth='fullWidth' size={"large"} onClick={goToSubmiTab}>{configJSON.submit}</CustomButton>
                </div>
            </Grid>}
            {(booleanValue && showPendingData.length === 0) ? <CircularProgress style={webStyle.selectedContentDetails} /> :
                this.tabSecondContent()
            }
        </>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const webStyle: any = {
   
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
    btnWidth: { width: "224px" },
    contentWidth: { width: "100%", height: "100%" },
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
    showContentSize: {
        width: "192px",
        height: "158px",
        borderWidth: "7px 23px",
        borderStyle: "solid",
        borderColor: "#D9D9D9",
    },
};
const TopBanner = styled(Box)({
    border: "1px solid #BFC2C3",
    height: "3.75rem",
    margin: "0px auto",
    width: "92%",
    display: 'flex'
})
// Customizable Area End
