import React from "react";
// Customizable Area Start
import {
    Box,
    Grid, Tabs, Tab, AppBar, styled, Typography, MenuItem, Select
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
// Customizable Area End
import CataloguePortfolioController, { Props, images, configJSON } from "./CataloguePortfolioController.web";
import CatalogueSubmit from "./CatalogueSubmit.web";
import CatalogueReview from "./CatalogueReview.web";
import CataloguePending from './CataloguePending.web';
import CatalogueForm from './CatalogueForm.web';
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
interface Option {
    value: string;
    label: string;
}

export const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
            style={webStyle.tableGrid}
        >
            {value === index && (
                <Grid >
                    <Typography>{children}</Typography>
                </Grid>
            )}
        </div>
    );
}
export default class CataloguePortfolio extends CataloguePortfolioController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    a11yProps(index: any) {
        return {
            id: `wrapped-tab-${index}`,
            'aria-controls': `wrapped-tabpanel-${index}`,
        };
    }
    renderCustomSelectInput(value: number, selectedContent: any, selectedValue: any, style: React.CSSProperties, onChange: (event: React.ChangeEvent<{ value: unknown }>) => void, dataTestId: string, options: Option[]) {
        return value === selectedValue && (
            <SelectInput
                value={selectedContent}
                style={style}
                onChange={onChange}
                data-test-id={dataTestId}
                IconComponent={ExpandMoreIcon}
                disableUnderline
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </SelectInput>
        );
    }
    renderNoSelectionContent = () => {
        const { value } = this.state
        return (
            <>
                {value != 2 ?
                    <Grid style={webStyle.selectedContentDetails}>
                        <div style={webStyle.contentSize}>
                            <CustomTypography component="title2">{configJSON.noSelectedContent}</CustomTypography>
                            <CustomTypography variant='selectMultitext' component="text_none">{configJSON.selectMulti}</CustomTypography>
                        </div>
                    </Grid> : <Grid style={webStyle.selectedContentDetails}>
                        <div style={webStyle.contentSize}>

                            <CustomTypography component="title2">{configJSON.selectReviewContent}</CustomTypography>
                            <div style={webStyle.setRejection}>
                                <CustomTypography variant='selectMultitext' component="text_none">{configJSON.rejectedContent}</CustomTypography>
                            </div>
                        </div>
                    </Grid>}
            </>
        )
    }
    
    // Customizable Area End

    render() {
        // Customizable Area Start
        const { selectedContent, title, selectedCategoryIndex,reviewDate, submittedDate,deleteModal,deleteAllModal, showReviewedData, submitModal, showPendingData, selectedSingleContent, openlist, description, totalSubmit, totalPending, totoalReviewed, showUploadedData, isChecked, showCategoryData, location, isPreviewOpen, fullConetnt, inputValue, keywords, suggestions, selectedReviewContent, selectedCategryContent, value, goToPortfolioPage, filterContent } = this.state;
        const booleanValue = goToPortfolioPage;
        const visibility = this.isContentVisible(value);
        let dateObject = new Date(reviewDate);
        const day = dateObject.getUTCDate();
        const month = dateObject.getUTCMonth() + 1;
        const year = dateObject.getUTCFullYear();
        const reviewAcceptDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        // Customizable Area End
        return (
            // Customizable Area Start
            <Grid style={webStyle.mainBox}>
                <NavigationMenu contributorLogin={false} contributorContent={true} contributorPortfolio={true} handleSelect={this.handleSelect} goToUpload={this.goToUpload} goToLanding={this.goToLanding} data-test-id="goToUpload" navigation={undefined} id={""} />
                <Box style={webStyle.container}>

                    <Grid style={{ ...webStyle.showTopNav, width: (!booleanValue && showUploadedData.length === 0) ? "100%" : '60%' }}>

                        <AppBar position="static" style={webStyle.topNavbar}>
                            <Tabs style={webStyle.navBar}
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="secondary"
                                data-test-id="tabChange"
                                textColor="secondary"
                                aria-label="icon label tabs example"
                                TabIndicatorProps={{ style: { backgroundColor: 'black' } }}
                                {...this.a11yProps(1)}
                            >
                                <SelectedTab label={`To submit (${totalSubmit})`} {...this.a11yProps(0)} />
                                <SelectedTab label={`Pending (${totalPending})`}  {...this.a11yProps(1)} />
                                <SelectedTab label={`Reviewed (${totoalReviewed})`}  {...this.a11yProps(2)} />
                            </Tabs>
                            <div>
                                {this.renderCustomSelectInput(value, selectedContent, 0, { ...webStyle.selectedContent, display: filterContent ? 'block' : 'none' }, this.handleContentChange, "handleContentChange", [
                                    { value: "images", label: "Images" },
                                    { value: "videos", label: "Videos" },
                                    { value: "all", label: "All" },
                                ])}

                                {this.renderCustomSelectInput(value, selectedCategryContent, 1, webStyle.selectedContent, this.handleContentCategoryChange, "handleContentCategoryChange", [
                                    { value: "newest", label: "Newest" },
                                    { value: "oldest", label: "Oldest" },
                                ])}

                                {this.renderCustomSelectInput(value, selectedReviewContent, 2, webStyle.selectedContent, this.handleContentReviewChange, "handleContentReviewChange", [
                                    { value: "all", label: "All Reviewed" },
                                    { value: "accepted", label: "Approved" },
                                    { value: "rejected", label: "Rejected" },
                                ])}
                            </div>

                        </AppBar>
                        <CustomConatiner>
                            <TabPanel value={this.state.value} index={0}>
                                <CatalogueSubmit goToPortfolioPage={goToPortfolioPage}
                                    showUploadedData={showUploadedData}
                                    goToUpload={this.goToUpload}
                                    selectedSingleContent={selectedSingleContent}
                                    handleImageClick={this.handleImageClick} />
                            </TabPanel>
                        </CustomConatiner>
                        <CustomConatiner>
                            <TabPanel value={this.state.value} index={1}>
                                <CataloguePending goToPortfolioPage={goToPortfolioPage}
                                    showPendingData={showPendingData}
                                    goToSubmiTab={this.goToSubmiTab}
                                    selectedSingleContent={selectedSingleContent}
                                    data-test-id="handleSubmitBlock"
                                    handleImageClick={this.handleImageClick} />
                            </TabPanel>
                        </CustomConatiner>
                        <CustomConatiner>
                            <TabPanel value={this.state.value} index={2}>
                                <CatalogueReview showReviewedData={showReviewedData}
                                    goToPortfolioPage={goToPortfolioPage}
                                    goToUpload={this.goToUpload}
                                    isPreviewOpen={isPreviewOpen}
                                    selectedSingleContent={selectedSingleContent}
                                    fullConetnt={fullConetnt}
                                    data-test-id="handleReviewBlock"
                                    deleteSingleContent={this.deleteSingleContent}
                                    closeList={this.closeList}
                                    handleImageClick={this.handleImageClick} handleMoreList={this.handleMoreList} openlist={openlist} handleContentPreview={this.handleContentPreview} handlePreviewClose={this.handlePreviewClose} />
                            </TabPanel>
                        </CustomConatiner>

                    </Grid>
                    <Grid style={{ ...webStyle.detailContainer, display:visibility }}>
                        <CustomAppBar position="static">
                            <Tabs style={{ marginLeft: 'auto', marginRight:"20px" }}>
                                <Tab label="Delete" onClick={this.deleteContentModal} style={webStyle.actionsBtns} data-test-id="deleteSingleContent" icon={<img src={images.deleteIcon} style={webStyle.iconSize} />} />
                                {
                                    value === 0 && (
                                        <>
                                            <Tab label="Multi-Select" data-test-id="multiSelect" style={webStyle.actionsBtns} onClick={this.handleMultiSelect} icon={<img src={images.multiSelectIcon} style={webStyle.iconSize} />} />
                                            <Tab label="Save" style={webStyle.actionsBtns} data-test-id="saveDetailsBtn" onClick={this.saveDetailsBtn} icon={<img src={images.saveIcon} style={webStyle.iconSize} />} />
                                        </>
                                    )
                                }
                            </Tabs>
                        </CustomAppBar>


                        {selectedSingleContent.length === 0 ? this.renderNoSelectionContent() :

                            <CatalogueForm
                                value={value}
                                handleContentInfo={this.handleContentInfo}
                                deleteAllModalOpen={this.deleteAllModalOpen}
                                submitModal={submitModal}
                                title={title}
                                handleFormChange={this.handleFormChange}
                                description={description}
                                selectedCategoryIndex={selectedCategoryIndex}
                                handleCategoryChange={this.handleCategoryChange}
                                showCategoryData={showCategoryData}
                                isChecked={isChecked}
                                handleCheckBoxChange={this.handleCheckBoxChange}
                                inputValue={inputValue}
                                handleInputKeywordChange={this.handleInputKeywordChange}
                                handleKeyDown={this.handleKeyDown}
                                handleRemoveKeyword={this.handleRemoveKeyword}
                                keywords={keywords}
                                suggestions={suggestions}
                                handleAddKeyword={this.handleAddKeyword}
                                data-test-id="goToDashboard"
                                goToDashboard={this.goToDashboard}
                                location={location}
                                closeModal={this.closeModal}
                                handleDeleteKeyword={this.handleDeleteKeyword}
                                submittedDate={submittedDate}
                                reviewAcceptDate={reviewAcceptDate}
                                 />
                        }
                                  <ModalComponent
                                    open={deleteModal}
                                    maxWidth={530}
                                    maxHeight={508}
                                    modalMinHeight={'0px'}

                                >
                                    <Grid>
                                    <Grid style={webStyle.submitModalContent}>
                                        
                                        <CustomTypography component="outfitBody4">{configJSON.confirmDeleteText}</CustomTypography>
                                        <div style={webStyle.btnWidth}>
                                            <div style={webStyle.widthBtns}>
                                            <CustomButton variant="primary" fullWidth="fullWidth" size={"large"} onClick={this.deleteSingleContent}>{configJSON.yes}</CustomButton>
                                            </div>
                                            <div style={webStyle.widthBtns}><CustomButton fullWidth="fullWidth" variant="secondary" size={"large"} onClick={this.closeDeleteModal} data-test-id="goToDashboard">{configJSON.cancel}</CustomButton>
                                            </div></div>
                                    </Grid>
                                    </Grid>
                                </ModalComponent>

                                <ModalComponent
                                    open={deleteAllModal}
                                    maxWidth={530}
                                    maxHeight={508}
                                    modalMinHeight={'0px'}

                                >
                                    <Grid>
                                    <Grid style={webStyle.submitModalContent}>
                                        
                                        <CustomTypography component="outfitBody4">{configJSON.confirmDeleteText}</CustomTypography>
                                        <div style={webStyle.btnWidth}>
                                            <div style={webStyle.widthBtns}>
                                            <CustomButton variant="primary" fullWidth="fullWidth" size={"large"} onClick={this.deleteAllContent}>{configJSON.yes}</CustomButton>
                                            </div>
                                            <div style={webStyle.widthBtns}><CustomButton fullWidth="fullWidth" variant="secondary" size={"large"} onClick={this.closeAllDeleteModal} data-test-id="goToDashboard">{configJSON.cancel}</CustomButton>
                                            </div></div>
                                    </Grid>
                                    </Grid>
                                </ModalComponent>
                    </Grid>


                </Box>
            </Grid>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const webStyle: any = {
    mainBox: {
        overflowX: "hidden"
    },
    topNavbar: {
        borderTop: "1px solid #C4C4C4",
        height: "48px"
    },
    navBar: {
        backgroundColor: "white",
        color: "#73767A",
        // padding: "0px 20px",
        // widt/h:"80%"
    },
    selectedTab: {
        fontWeight: "bold",
        color: "black",
        borderBottom: "3px solid black"
    },
    container: {
        display: 'flex',
        width: "100%",
        // height: "100%",
        margin: "0",
        height: "100vh",
    },
    showTopNav: {
        width: "60%",
        display: "flex",
        position: 'relative',
        borderRight: "1px solid #BFC2C3",
        // height: "91vh",
        backgroundColor: "#F3F4F4",
        flexDirection: "column",
        gap: "20px",
    },
    detailContainer: {
        width: "40%",
        // flex: "0 0 auto",
        // overflow: "hidden"
    },
    selectedContent: {
        color: 'black',
        position: 'absolute',
        right: "20px",
        top: "10px",
    },
    iconSize: {
        width: "20px",
        height: "20px"
    },
    actionsBtns: {
        fontSize: "10px",
        textTransform: "capitalize",
        color: "#73767A",
        minHeight: "fit-content",
        paddingTop: "5px",
        paddingBottom: "10px",
        minWidth: "0px"
    },
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
    
    img: {
        height: "1.5rem",
        width: "1.5rem"
    },
    tableGrid: {
        width: "100%"
    },
    setRejection: {
        textAlign: "center",
        width:"386px"
    },
    btnWidth:{
        display:"flex",
        justifyContent:"space-around",
        width:"100%"
    },
    position: { position: "relative" },
    contentSize: { padding: "20px", textAlign: "center" },
    widthBtns:{width:"124px"},
    submitModalContent:{
        display:"flex", 
       gap:"30px",
       flexDirection:"column",
       alignItems:'center',
       padding:"70px 20px"
    }
};
const SelectInput = styled(Select)({
    outline: 'none',
    border: 'none',
    margin: 'unset',
    paddingLeft: '10px',
});
const CustomConatiner = styled(Grid)({
    display: "flex",
    flexWrap: "wrap",
    padding: "0px 20px",
    overflowY: "auto",
    "& .MuiDrawer-paper::-webkit-scrollbar": {
        display: "none",
    },
})
const CustomAppBar = styled(AppBar)({
    borderTop: "1px solid #C4C4C4",
    height: "48px",
    backgroundColor: "transparent",
    "&.MuiAppBar-colorPrimary": {
        backgroundColor: "transparent !important",
    },
});
const SelectedTab = styled(Tab)({
    "&.Mui-selected": {
        color: "black !important",
        fontWeight: "bold",
    },
});
// Customizable Area End
