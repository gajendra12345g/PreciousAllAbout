import React from "react";
// Customizable Area Start
import ReviewSetPriceModeratorController, {
  Props, configJSON
} from "./ReviewSetPriceModeratorController";
import {
  Box,
  styled,
  Breadcrumbs,
  Link,
  Select,
  MenuItem,
  Chip, Grid,Divider
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import PriceCard from "./PriceCard.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import SideBar from "../../../components/src/DesignSystem/SideBar/SideBar.web";
import { sideBarListItem, sideBarBottomNav } from "../../../blocks/navigationmenu/src/NavigationMenuController";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
export const images = require('./assets');
import CustomCheckBox from "../../../components/src/DesignSystem/CustomCheckBox/CustomCheckBox.web";
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
// Customizable Area End

class ReviewSetPriceModerator extends ReviewSetPriceModeratorController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  renderContent= (isImage:any, isVideo:any, fileLink:any) => {
    if (isVideo) {
      return(
        <ContentVideo width={50} height={50} controls>
          <source src={fileLink} />
          Your browser does not support the video tag.
        </ContentVideo>
      ); 
    }
     if(isImage) {
      return <ContentImg src={fileLink} alt="content-icon" />;
    }
  }

  render() {
    const { location, suggestionLocation,userSuccessAlert,showAlert, alertType, 
      selectedFormat,selectedBtn, formats, setSize, isChecked, licenseData, suggestions,
      inputValue, sizeData, keywords,title, selectedCategoryIndex, categories,selectedLicenseNames, catalogueType,rejectionTitle } = this.state;
      const imageFormats = formats.filter((format: any) => {
        return (
          (catalogueType?.startsWith("image") && format.attributes.type_format === "image") ||
          (catalogueType?.startsWith("video") && format.attributes.type_format === "video")
        );
      });
    const selectedFormated = formats.find((format:any) => format.id === selectedFormat);
    const selectedFormatPrice = selectedFormated ? `$${selectedFormated.attributes.price}` : `$${selectedFormat?.attributes?.price}`;
    const selectedFormatPriceId = selectedFormated ? selectedFormated.id : selectedFormat?.id;
    const isImage =catalogueType?.startsWith('image');
  const isVideo =catalogueType?.startsWith('video');
    return (
      // Customizable Area Start
      <Grid>
        <NavigationMenu navigation={undefined} id={""} ModeratorLogin={true} contributorLogin={true} contributorContent={false} data-test-id="showCollection" />
        <SideBar id="" navigation={this.props.navigation} sideBarBottomNav={sideBarBottomNav} sideBarListItem={sideBarListItem}>
          <CustomContainer>
            <Box style={webStyles.topContainer}>
              <Breadcrumbs>
                <Link color="inherit" href="/Moderator/review/">
                  Review
                </Link>
                <CustomTypography  variant="primary" component="text_none">Set Price</CustomTypography>
              </Breadcrumbs>
              <Box style={webStyles.groupIconContainer}>
                <Box style={webStyles.iconContainer} data-test-id="deletecontent" onClick={this.deletecontent}>
                <img src={images.deleteIcon} style={webStyles.iconSize} />
                  <CustomTypography variant={"secondary"} component="label" >
                    Delete
                  </CustomTypography>
                </Box>
                <Box style={webStyles.iconContainer} data-test-id="saveCatalogueApiCall" onClick={this.saveCatalogueApiCall}>
                <img src={images.saveIcon} style={webStyles.iconSize} />
                  <CustomTypography variant={"secondary"} component="label" >
                    Save
                  </CustomTypography>
                </Box>
              </Box>
            </Box>
            <Box style={webStyles.contentContainer}>
              <Box style={webStyles.imageContainer}>
              {this.renderContent(isImage, isVideo, this.state.contentDetails?.file_link)}
              </Box>
              <Box style={webStyles.detailContainer}>
                <Box marginBottom={2}>
                <CustomTypography variant="outfitBody2" component="text_none" gutterBottom id="modal-modal-title">
                  {`Date ${this.state.contentDetails?.date
                    ? new Date(this.state.contentDetails.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }).replace(/,/g, ',')
                    : ''
                    }`}
                </CustomTypography>
                </Box>
                <Box style={webStyles.fieldStyle2}>
                  <CustomTypography variant="font_family" component="text_none" gutterBottom id="modal-modal-title">
                    {configJSON.contentTitle}
                  </CustomTypography>
                  <Box style={webStyles.inputContainer}>
                    <Input
                      data-test-id="txtTitle"
                      placeholder={configJSON.titlePlaceholder}
                      fullWidth={true}
                      value={title}
                      disableUnderline={true}
                      maxLength={100}
                      onChange={this.handleFormChange}
                      name="title"
                    />
                    <CustomTypography variant="outfitBody2" component="secondary" textTransform="text_none">{`${this.state.title.length}/100`}</CustomTypography>
                  </Box>
                </Box>

                <Box style={webStyles.fieldStyle}>
                  <CustomTypography variant="font_family" component="text_none" gutterBottom id="modal-modal-title">
                    {configJSON.contentDescription}
                  </CustomTypography>
                  <Box style={webStyles.inputContainer}>
                    <Input
                      data-test-id="txtDescription"
                      value={this.state.description}
                      multiline
                      placeholder={configJSON.descriptionPlaceholder}
                      fullWidth
                      rows={4}
                      name='description'
                      variant="outlined"
                      onChange={this.handleFormChange}
                    />
                    <CustomTypography variant="outfitBody2" component="secondary" textTransform="text_none">{`${this.state.description.length}/500`}</CustomTypography>

                  </Box>
                </Box>
                <Box style={webStyles.fieldStyle2}>
                  <CustomTypography variant="font_family" component="text_none" gutterBottom id="modal-modal-title">
                    {configJSON.contentSpecification}
                  </CustomTypography>
                  <Box style={webStyles.inputContainer}>
                    <Input
                      data-test-id={"txtSpecification"}
                      placeholder={configJSON.specificationPlaceholder}
                      value={this.state.specificationText}
                      fullWidth={true}
                      disableUnderline={true}
                      onChange={this.handleFormChange}
                      maxLength={100}
                      name="txtSpecification"
                    />
                    <CustomTypography variant="outfitBody2" component="secondary" textTransform="text_none">{`${this.state.specificationText.length}/100`}</CustomTypography>
                  </Box>

                </Box>
                <Box style={webStyles.fieldStyle}>
                  <CustomTypography variant="font_family" component="text_none" gutterBottom id="modal-modal-title">
                    {configJSON.contentCategory}
                  </CustomTypography>
                  <Select
                    disableUnderline
                    value={selectedCategoryIndex}
                    data-test-id="handleCategoryChange"
                    onChange={this.handleCategoryChange}
                    IconComponent={ExpandMoreIcon}
                    style={webStyles.inputStyle}
                    displayEmpty
                  >
                    
                    {categories?.map((item: any, index: any) => (
                      <MenuItem key={index} value={item.id}>{item.attributes.title}</MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box style={webStyles.fieldStyle}>
                  <Box style={webStyles.checkbox}>
                    <div style={webStyles.showCheckbox}>

                      <CustomCheckBox
                        data-test-id="handleCheckBoxChange"
                        checked={isChecked}
                        onChange={this.handleCheckBoxChange}
                      />
                    </div>
                    <Grid>
                      <CustomTypography component="outfitBody1">{configJSON.nsfwTitle}<span>{configJSON.Content}</span></CustomTypography>
                      <CustomTypography variant="contentfEature" component="text_none">{configJSON.nsfwDescription}</CustomTypography>
                    </Grid>
                  </Box>
                </Box>
                <Box style={webStyles.fieldStyle2}>
                  <CustomTypography variant="font_family" component="text_none" gutterBottom id="modal-modal-title">
                    {configJSON.contentLocation}
                  </CustomTypography>
                  <Input
                    placeholder="Enter location"
                    type='text'
                    required
                    value={location}
                    onChange={this.handleInputLocationChange}
                    name="location"
                    data-test-id="handleFormChangeLocation"
                    startAdornment=
                    {<img src={images.searchIcon} alt="Search" />} />
                  {suggestionLocation?.length > 0 && (
                    <Grid style={webStyles.locationStyle}>
                      {suggestionLocation?.map((suggestion: any, index: number) => (
                        <div
                          key={index}
                          data-test-id="handleSuggestionClick"
                          style={webStyles.styledLocation}
                          onClick={() => this.handleSuggestionClick(suggestion)}
                        >
                          <CustomTypography variant="font_family" component="text_none">{suggestion}</CustomTypography>
                        </div>
                      ))}
                    </Grid>
                  )}

                </Box>
                <Box style={webStyles.fieldStyle}>
                  <CustomTypography variant="font_family" component="text_none" gutterBottom id="modal-modal-title">
                    {configJSON.contentKeyword}
                  </CustomTypography>
                  <Box>
                    <Input
                      variant="outlined"
                      value={inputValue}
                      type="text"
                      data-test-id="handleKeyDown"
                      onChange={this.handleInputKeywordChange}
                      onKeyDown={this.handleKeyDown}
                      placeholder="Add your keywords"
                    />
                      {keywords.map((keyword: any) => (
                        <Chip
                          key={keyword}
                          label={keyword}
                          onDelete={() => this.handleRemoveKeyword(keyword)}
                          style={webStyles.chip}
                          data-test-id="handleRemoveKeyword"
                        />

                      ))}
                    <CustomTypography variant="outfitBody1" component="blue">{configJSON.keywordSuggestion} <span style={{ fontSize: "12px" }}>{configJSON.auto}</span></CustomTypography>
                    <Box marginTop={2}>
                      {suggestions?.filter((suggestion: any) =>
                          suggestion.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .map((suggestion: any) => (
                          <ChipStyle
                            key={suggestion}
                            label={suggestion}
                            data-test-id="handleAddKeyword"
                            onDelete={() => this.handleDeleteKeyword(suggestion)}
                            onClick={() => this.handleAddKeyword(suggestion)}
                            deleteIcon={<CloseIcon />}
                          />
                        ))}
                    </Box>
                  </Box>
                </Box>
                <Box>
                <Box marginBottom={2}>
                  <CustomTypography variant="subtitle2" gutterBottom id="modal-modal-title">
                    {configJSON.setThePriceLabel}
                  </CustomTypography>
                  </Box>
                  <Divider/>
                <Box marginBottom={2} marginTop={2}>
                  <CustomTypography variant="outfitBody2" component="text_none" gutterBottom id="modal-modal-title">
                    {configJSON.setThePriceDescription}
                  </CustomTypography>
                  </Box>
                  <Box style={webStyles.category}>
                  <Select
          multiple
          data-test-id="handleLicenseText"
          style={{...webStyles.chooseStyle}}
          disableUnderline
          displayEmpty
          value={this.state.selectedLicenses}
        onChange={this.handleLicenseText}
        IconComponent={ExpandMoreIcon}
        renderValue={(selected:any) =>
          selected.map((licenseId:any) => this.getLicenseName(licenseId)).join(', ')
        }
        >
           <MenuItem
            value="Select"
            style={webStyles.display_none}
          >
            {configJSON.digitalText}
          </MenuItem>
          {licenseData.map((format:any) => (
            <MenuItem key={format.id} value={format.id}>
              <div>
                 <CustomCheckBox
                        checked={this.isAssetChecked(format.id)}
                        onChange={(e:any) =>this.onSelectionChange(e, format.id)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        data-test-id="handleFormatSelectLicense"

                  />
                <label>{format.attributes.name}</label>
              </div>
            </MenuItem>
          ))}
        </Select>
                  </Box>
                  <Box style={webStyles.category}>
                    <Select
                      data-test-id="handleSize"
                      style={{...webStyles.chooseStyle}}
                      disableUnderline
                      IconComponent={ExpandMoreIcon}
                      displayEmpty
                      value={setSize || "Select"}
                      onChange={this.handleSize}
                    >
                      <MenuItem
            value="Select"
            style={webStyles.display_none}
          >
            {configJSON.sizePlaceholder}
          </MenuItem>
                      {sizeData.map((item: any, index: any) => (
                        <MenuItem key={index} value={item.id}>{item.attributes.name}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <Box style={webStyles.fieldStyle} marginTop={3}>
                  <CustomTypography variant="font_family" component="text_none" gutterBottom id="modal-modal-title">
                    {configJSON.selectPriceLabel}
                  </CustomTypography>
                  <Box style={webStyles.priceContainer} marginTop={2}>
                    {imageFormats.map((format: any) => (
          <PriceCard
            key={format.id}
            data-test-id="handleFormatSelect"
            onClick={() => this.handleFormatSelect(format)}
            isActive={selectedFormatPriceId && selectedFormatPriceId === format.id}
            title={format.attributes.name} value={`$${format.attributes.price}`}
          >
            {format.attributes.name}
          </PriceCard>
        ))}
                  </Box>
                  <Box style={webStyles.selectedPrice}>
                  {selectedFormatPrice !== "$undefined" && (
    <CustomTypography component="outfitBody4">
        {selectedFormatPrice}
    </CustomTypography>
)}
                  </Box>
                </Box>
                <Box style={webStyles.actionBtns}>
                  <Grid style={webStyles.btns}>
                    <CustomButton variant="primary" fullWidth="fullWidth" size="large" data-test-id="handleBtnCall" onClick={this.handleBtnCall}>{configJSON.approveBtn}</CustomButton>
                  </Grid>
                  <Grid style={webStyles.btns} data-test-id="rejectCatalogue" onClick={this.rejectCatalogue}>
                    <CustomButton variant="secondary" fullWidth="fullWidth" size="large">{configJSON.rejectBtn}</CustomButton>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <ModalComponent open={this.state.showDeleteDialog} maxWidth={541} maxHeight={300}>
              <DeleteParent>
                <CustomTypograpyParent>
                  <CustomTypography
                    variant={"primary"}
                    component={"body6"}
                    textTransform={"uppercase"}
                  >
                    {configJSON.deleteDialogTitle}
                  </CustomTypography>
                </CustomTypograpyParent>
                <Divider></Divider>
                <ParentDiv>
                  <CustomTypograpyParent1>
                    <CustomTypography variant={"secondary"} component={"body10"}>
                      {selectedBtn ? configJSON.approveContent :configJSON.deleteContent}
                    </CustomTypography>
                  </CustomTypograpyParent1>
                  <ActionDiv>
                    <ActionDivInner>
                      <CustomButton
                        onClick={this.handleCloseDeleteDialog}
                        variant="secondary"
                        fullWidth="fullWidth"
                        data-test-id="cancel_button"
                        size={"medium"}
                      >
                        {configJSON.cancelBtnLabel}
                      </CustomButton>
                    </ActionDivInner>
                    <ActionDivInner>
                      <CustomButton
                        variant="red"
                        fullWidth="fullWidth"
                        data-test-id="delete_confirmation"
                        size={"medium"}
                        onClick={this.handleSelectedBtnCall}
                      >
                        {configJSON.deleteBtnLabel}
                      </CustomButton>
                    </ActionDivInner>
                  </ActionDiv>
                </ParentDiv>
              </DeleteParent>
            </ModalComponent>
            <ModalComponent open={this.state.showRejectectionModal} maxWidth={541} maxHeight={500}>
              <DeleteParent>
                <CustomTypograpyParent>
                  <CustomTypography
                    variant={"primary"}
                    component={"body6"}
                    textTransform={"uppercase"}
                  >
                    {configJSON.deleteDialogTitle}
                  </CustomTypography>
                </CustomTypograpyParent>
                <Divider></Divider>
                <ParentDiv>
                  <CustomTypograpyParent1>
                    <CustomTypography variant={"secondary"} component={"body10"}>
                      {configJSON.rejectionContent}
                    </CustomTypography>
                    <Input
                      placeholder={configJSON.rejectPlaceholder}
                      fullWidth={true}
                      disableUnderline={true}
                      value={rejectionTitle}
                      data-test-id="handleRejection"
                      multiline onChange={(e: any) => this.handleRejectionTitle(e)} />
                  </CustomTypograpyParent1>
                  <CustomTypograpyParent1>
                    <CustomTypography variant={"secondary"} component={"body10"}>
                      {configJSON.rejectionDesc}
                    </CustomTypography>
                    <Input
                      placeholder={configJSON.rejectPlaceholder}
                      fullWidth={true}
                      disableUnderline={true}
                      value={this.state.rejectionReason}
                      data-test-id="handleRejectionDesc"
                      multiline onChange={(e: any) => this.handleRejection(e)} />
                  </CustomTypograpyParent1>
                  <ActionDiv>
                    <ActionDivInner>
                      <CustomButton
                        onClick={this.handleCloseRejection}
                        variant="secondary"
                        fullWidth="fullWidth"
                        data-test-id="handleCloseRejection"
                        size={"medium"}
                      >
                        {configJSON.cancelBtnLabel}
                      </CustomButton>
                    </ActionDivInner>
                    <ActionDivInner>
                      <CustomButton
                        variant="red"
                        fullWidth="fullWidth"
                        data-test-id="rejectCatalogueApi"
                        size={"medium"}
                        onClick={this.rejectCatalogueApi}
                      >
                        {configJSON.reject}
                      </CustomButton>
                    </ActionDivInner>
                  </ActionDiv>
                </ParentDiv>
              </DeleteParent>
            </ModalComponent>
            <CustomSnackBar
          open={showAlert}
          data-test-id="handleAlertClosed"
          onClose={this.handleAlertClose}
          title={userSuccessAlert}
          horizontal="center"
          variant={alertType == "success" ? "success" : "error"}
        />
          </CustomContainer>
        </SideBar></Grid>
      // Customizable Area End
    );
  }
}
// Customizable Area Start

const webStyles: any = {
  topContainer: {
    height: '3.5rem',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
    justifyContent: 'space-between',
    border: '1px solid #BFC2C3'
  },
  groupIconContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',

  },
  iconContainer: {
    textAlign: "center",
    cursor: "pointer",
    "& svg": {
      marginBottom: "2px"
    }
  },
  contentContainer: {
    display: 'flex',
    border: '1px solid #BFC2C3',
    bordderTop: 0
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    gap: '0.25rem'
  },
  imageContainer: {
    flex: '1 1 0%',
    borderRight: '1px solid #BFC2C3',
    padding: '2rem 1.5rem'
  },
  detailContainer: {
    flex: '1 1 0%',
    padding: '2rem 1.5rem',
  },
  priceContainer: {
    display: 'flex',
    gap: '1rem'
  },
  fieldStyle: {
    marginBottom: '1rem',
    gap: '0.75rem',
    display: 'flex',
    flexDirection: 'column'
  },
  fieldStyle2: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  inputStyle: {
    border: '1px solid #BFC2C3',
    minHeight: '3rem',
    padding: '0.875rem 1rem',
    marginTop: '0px',
    marginBottom: '0px'
  },
  chipset: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    gap: '0.5rem',
    margin: 0,
    padding: 0,
    boxShadow: 0
  },
  keywordStyle: {
    color: '#3A82FF',
    marginBottom: '2rem'
  },
  locationStyle: {
    zIndex: 1,
    border: "1px solid #BFC2C3",
    maxHeight: "147px",
    padding: "10px",
    overflowY: "auto",
    height: "auto"
  },
  styledLocation: {
    padding: "5px 0px"
  },
  actionBtns: {
    display: "flex",
    gap: "20px",
    width: "100%"
  },
  btns: {
    width: "100%",
    cursor: "pointer"
  },
  display_none: {
    display: "none",
    position:"absolute",
    top:"40%"
  },
  display_block:{
    position:"absolute",
    top:"40%"
  },
  chooseStyle: {
    display: "flex", color: '#73767A'
  },
  checkbox: {
    display: "flex",
    gap: '10px',
    padding: "10px 0px"
  },
  showCheckbox: {
    margin: "auto 0px"
  },
  chip: {
    margin: "4px",
    cursor: "pointer",
    borderRadius: 0,
    backgroundColor: "white",
    color: "#73767A",
    border: "1px solid #73767A",
    marginBottom: "20px"
  },
  category: {
    border: "1px solid #BFC2C3",
    padding: "15px 20px",
    marginTop: "20px",
    position:"relative"
},
selectedPrice:{
  display:"flex",
  justifyContent:"flex-end",
  width:"100%"
},
iconSize: {
  width: "20px",
  height: "20px"
},
};

const CustomContainer = styled(Box)({
  width: "100%"
})
const DeleteParent = styled("div")({
  padding: "12px",
});

const TopMetrics = styled(Box)({
  gap: '1.5rem',
  height: "12.5rem",
  marginBottom: "2rem",
  display: "flex",
  width: '100%'
})

const CustomTypograpyParent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const ActionDiv = styled("div")({
  display: "flex",
  gap: "24px",
});

const ActionDivInner = styled("div")({
  width: "100%",
});

const ContentImg = styled("img")({
  width: "100%",
  height: "458px",
});
const ContentVideo = styled("video")({
  width: "100%",
  height: "458px",
});

const CustomTypograpyParent1 = styled("div")({
  textAlign: "center",
  padding: "32px 0px",
  "@media(max-width:600px)": {
    "& br": {
      display: "none",
    },
  },
});
const ChipStyle = styled(Chip)({
  color: "#3A82FF",
  border: "1px solid #3A82FF",
  margin: "4px",
  cursor: "pointer",
  borderRadius: 0,
  backgroundColor: "white",
  '& .MuiChip-deleteIcon': {
    color: '#3A82FF',
    width: 18,
    height: 18,
  },
})
const ParentDiv = styled("div")({
  padding: "0px 32px",
});
// Customizable Area End



export default ReviewSetPriceModerator;
