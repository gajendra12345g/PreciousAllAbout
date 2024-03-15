import React from "react";
// Customizable Area Start
import {
    Box,
    Grid, styled,  MenuItem, Divider, CircularProgress, Popover,
    MenuList, Dialog, DialogContent, DialogActions
} from "@material-ui/core";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
// Customizable Area End
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
export const configJSON = require("./config");
export const images= require("./assets")
interface Props {
    showReviewedData : any;
    goToPortfolioPage: any;
    goToUpload:()=> void;
    isPreviewOpen: any,
     selectedSingleContent: any,
      fullConetnt: any;
      handleImageClick : any;
      handleMoreList : any;
      openlist: any;
      deleteSingleContent: any;
      handleContentPreview: any;
      handlePreviewClose: any;
      closeList: any;
}
const getImageName = (imageUrl: string) => {
    const urlParts = imageUrl.split('/');
    const imageName = urlParts[urlParts.length - 1];
    return imageName;
};

export default class CatalogueReview extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    tabThirdContent = () => {
        const { showReviewedData, isPreviewOpen,closeList,selectedSingleContent,handlePreviewClose, openlist, handleContentPreview, deleteSingleContent, fullConetnt, handleImageClick,handleMoreList } = this.props
        const isVideos = fullConetnt?.endsWith('.mp4') || fullConetnt?.endsWith('.mov');

        return (
            <Grid style={webStyle.visibleDataReview}>
                {showReviewedData.map((item: any) => {
                    const {
                        id,
                        attributes: {updated_at,
                            images: { url },
                        },
                    } = item;
                    let dateObject = new Date(updated_at);
                    const day = dateObject.getUTCDate();
                    const month = dateObject.getUTCMonth() + 1;
                    const year = dateObject.getUTCFullYear();
                    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                    const isVideo = url.endsWith('.mp4') || url.endsWith('.mov');

                    return (
                        <div style={webStyle.contentData} key={id} data-test-id="handleImageClick" onClick={() =>handleImageClick(id, getImageName(url), url)}>
                            <div style={webStyle.reviewStatus}>
                                <div style={webStyle.position}>
                                    <div style={webStyle.absolutePosition}>
                                        {item.attributes.images.status === "rejected" ? (
                                            <CloseIcon style={webStyle.closeIcon} />
                                        ) : (
                                            <CheckIcon style={webStyle.rightIcon} />
                                        )}
                                    </div>
                                </div>
                                {isVideo ? (
                                    <div
                                        style={{
                                            ...webStyle.contentData,
                                            ...webStyle.showContentSize,
                                            outline: selectedSingleContent.includes(id) ? '2px solid #3A82FF' : 'none',
                                        }}
                                        data-test-id="handleImageClick"
                                        onClick={() =>handleImageClick(id, getImageName(url), url)}
                                    >
                                        <video key={id} src={url} style={webStyle.contentWidth} controls />
                                    </div>
                                ) : (
                                    <img
                                        key={id}
                                        src={url}
                                        alt={`Image ${id}`}
                                        style={{
                                            ...webStyle.contentData,
                                            ...webStyle.showContentSize,
                                            outline: selectedSingleContent.includes(id) ? '2px solid #3A82FF' : 'none',
                                        }}
                                    />
                                )}


                                {item.attributes.images.status == "rejected" ?
                                    <Grid style={webStyle.margins}>
                                        <CustomTypography variant="labelOutfit1" component="text_capitalize">{configJSON.rejectionReason}</CustomTypography>
                                        <CustomTypography variant="outfitBody2" component="text_capitalize"><span style={{ color: "#3A82FF" }}>{configJSON.tradeMark}</span><span>{configJSON.rejectionReasons}</span></CustomTypography>

                                    </Grid> : <Grid style={{ ...webStyle.margins, ...webStyle.marginLeft }}>
                                        <CustomTypography variant="labelOutfit1" textTransform="text_capitalize" component="success">{configJSON.approvedStatus}</CustomTypography>
                                        <CustomTypography variant="body11" component="secondary" textTransform="text_none">{configJSON.approvedDate}{formattedDate}</CustomTypography>
                                    </Grid>}
                            </div>
                            <div style={webStyle.moreIcon}>
                                <CustomTypography variant="outfitHeading5" component="text_capitalize">{`${getImageName(url)}`}</CustomTypography>
                                <><div>
                                    <img src={images.moreIcon} aria-describedby={id} onClick={(e: any) => handleMoreList(e, url)} data-test-id="handleMoreList" style={webStyle.iconHeight} />
                                </div>
                           
                                </>
                            </div>
                            <Divider />

                        </div>

                    );
                })}
                                    <Popover
                    open={Boolean(openlist)}
                    anchorEl={openlist}
                    data-test-id="close"
                    onClose={closeList}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    PaperProps={{
                      style: {
                        boxShadow: "#CECECE 0px 2px 1px",
                      },
                    }}
                >
                    <MenuList>
                        <MenuItem disabled
                        >
                            <img src={images.editIcon} style={webStyle.iconSize} />  Edit
                        </MenuItem>


                        <MenuItem onClick={deleteSingleContent}>
                            <img src={images.deleteIcon} style={webStyle.iconSize} />  Remove
                        </MenuItem>
                        <MenuItem data-test-id="handleContentPreview" onClick={handleContentPreview}>
                            <img src={images.preview} style={webStyle.iconSize} />  Preview
                        </MenuItem>
                    </MenuList>
                </Popover>
                
                <Dialog open={isPreviewOpen} fullWidth maxWidth="md" data-test-id="handlePreviewClose" onClose={handlePreviewClose}>
                    <DialogActions>
                        <CloseIcon onClick={handlePreviewClose} />
                    </DialogActions>
                    <DialogContent style={webStyle.flexDisplay} >



                        {isVideos ? (
                            <video src={fullConetnt} style={webStyle.tableGrid} controls />

                        ) : (
                            <img src={fullConetnt} style={{ ...webStyle.tableGrid, ...webStyle.objectFit }} alt="Full-Screen Image" />

                        )}
                    </DialogContent>


                </Dialog>
            </Grid>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        const { goToPortfolioPage, showReviewedData, goToUpload } = this.props;
        const booleanValue = goToPortfolioPage;

        // Customizable Area End
        return (
            // Customizable Area Start
            <>
                <Grid>
                    <TopBanner>
                        <div style={{ ...webStyle.headerBanner, background: "#F59E0B" }}>
                            <img src={images.warnIcon} alt="" style={webStyle.img} />
                        </div>
                        <div style={webStyle.headerBannerRightSection}>
                            <CustomTypography variant="bannerText" component="text_none">
                                {configJSON.topBannerReviewedText} <span style={webStyle.underline}>{configJSON.preference}</span>
                            </CustomTypography>
                        </div>
                    </TopBanner>
                </Grid>
                {(!booleanValue && showReviewedData.length === 0) &&
                    <Grid style={webStyle.selectedContentDetails}>
                        <CustomTypography component="outfitHeading3">{configJSON.noReviewedHead}</CustomTypography>
                        <CustomTypography variant='selectMultitext' component="text_none">{configJSON.noPendingContent}</CustomTypography>
                        <div style={webStyle.btnWidth}><CustomButton variant="primary" fullWidth='fullWidth' size={"large"} onClick={goToUpload}>{configJSON.upload}</CustomButton>
                        </div></Grid>}
                {(booleanValue && showReviewedData.length === 0) ? (
                    <CircularProgress style={webStyle.selectedContentDetails} />
                ) : this.tabThirdContent()
                }
            </>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const webStyle: any = {
    
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
    contentData: {
        margin: "10px",
        display: "flex",
        flexDirection: "column"
    },
    moreIcon: {
        display: "flex",
        justifyContent: "space-between",
        margin: "0px 10px",
        width: "240px"
    },
    iconSize: {
        width: "20px",
        height: "20px"
    },
    selectedContentDetails: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "91vh",
        flexDirection: "column",
        gap: "20px",
        overflowY: "hidden",
        margin: "auto",
    },
    headerBanner: {
        background: "#1FD794",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "4rem",
        marginRight: "1rem"
    },
    visibleDataReview: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
    },
    tableGrid: {
        width: "100%"
    },
    reviewStatus: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    closeIcon: { color: 'white', backgroundColor: "red" },
    rightIcon: {
        color: "white",
        backgroundColor: "rgb(31, 215, 148)"
    },
    btnWidth: { width: "224px" },
    contentWidth: { width: "100%", height: "100%" },
    iconHeight: { height: "30px" },
    position: { position: "relative" },
    absolutePosition: { position: "absolute", bottom: "17px", left: "33px" },
    margins: { margin: "auto" },
    marginLeft: { marginLeft: "10%" },
    flexDisplay: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    objectFit: { objectFit: 'contain' },
    underline:{textDecoration:"underline"}
};
const TopBanner = styled(Box)({
    border: "1px solid #BFC2C3",
    height: "3.75rem",
    margin: "0px auto",
    width: "92%",
    display: 'flex'
})
// Customizable Area End
