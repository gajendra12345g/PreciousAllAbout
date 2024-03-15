import React from "react";

// Customizable Area Start
import {
  Grid, Box, Popover, MenuList, MenuItem, Select, styled
} from "@material-ui/core";
export const configJSON = require("./config");
export const images = require('./assets')
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import CustomRadioButton from "../../../components/src/DesignSystem/CustomRadioButton/CustomRadioButton";
import CloseIcon from '@material-ui/icons/Close';
import PortfolioCollectionController, { Props } from "./PortfolioCollectionController.web";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import customTheme from "../../../components/src/DesignSystem/Theme/Theme.web";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
// Customizable Area End


// Customizable Area Start
// Customizable Area End

export default class PortfolioCollectionData extends PortfolioCollectionController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { assetsModal, setVisibility, selectedButton, collectionName, collectionSuggestName, showAlert, userSuccessAlert } = this.state;
    const { selectedCollectionContent, currentDataPage, prevDataPage, nextDataPage, collectionData } = this.props
    const selectedCollectionData = selectedCollectionContent?.galleries
    return (
      <Grid>
        {selectedCollectionData?.length > 0 ?
          <div style={webStyle.mainContentContainer}>
            <Grid style={webStyle.setHeight}>
              <Grid style={webStyle.contentSize}>
                {selectedCollectionData?.map((data: any) => {
                  return (
                    data.catalogue_ids.map((item: any) => {
                      return (
                        <Grid key={item.data.id}>
                          <div
                            style={{ position: 'relative', display: 'inline-block' }}
                          >

                            {selectedCollectionContent?.collection?.data.attributes.collection_type === "image" ? (
                              <img src={item.data.attributes.images.url} style={webStyle.contentImage}
                              />
                            ) : (
                              <video src={item.data.attributes.images.url} style={webStyle.contentImage} controls
                              />
                            )}
                            <div style={webStyle.downloadBtn} data-test-id="handleImageDownload" onClick={() => this.handleImageDownload(item.data.attributes.images.url,data.gallery_id, item.data.attributes.id)}>
                              <VerticalAlignBottomIcon />
                            </div>

                          </div>

                          <Grid style={webStyle.contentDetails}>
                            <CustomTypography variant="outfitBody2" component="text_none">{item.data.attributes.title}</CustomTypography>
                            <img src={images.moreIcon} style={{ ...webStyle.iconSize, ...webStyle.pointer }}
                              data-test-id="handleIconClick" onClick={(e: any) => {
                                this.handleIconClick(e, data, item.data.attributes.id);
                              }} />
                          </Grid>
                          <Popover
                            open={Boolean(this.state.anchorEl)}
                            anchorEl={this.state.anchorEl}
                            data-test-id="close"
                            onClose={() => this.setState({ anchorEl: null })}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            PaperProps={{
                              style: {
                                boxShadow: `${customTheme.palette.shadow.main} 0px 2px 1px`,
                              },
                            }}
                          >
                            <MenuList>
                              <MenuItem
                                style={webStyle.selectedOption}
                              >
                                <img src={images.editIcon} style={webStyle.iconSizes} /> Edit
                              </MenuItem>
                              <MenuItem
                                style={webStyle.selectedOption}
                              >
                                <img src={images.viewIcon} style={webStyle.iconSizes} /> View details
                              </MenuItem>
                              <MenuItem
                                style={webStyle.selectedOption}
                                onClick={this.deleteMdal}
                                data-test-id="deleteCollectionApi"
                              >
                                <img src={images.deleteIcon} style={webStyle.iconSizes} /> Remove from collections
                              </MenuItem>
                            </MenuList>
                          </Popover>
                        </Grid>
                      )
                    })
                  )
                })}
                <img onClick={this.props.openLibraryModal} src={images.addContent} style={webStyle.pointer} />
              </Grid>
            </Grid>
            <Grid style={webStyle.paginationContainer}>
              <div style={webStyle.pageBtn} onClick={prevDataPage}>
                <ChevronLeftIcon style={this.getIconLeftStyle(webStyle)} />
              </div>
              <CustomButton variant="primary">{currentDataPage}</CustomButton>
              <Grid style={webStyle.pageBtn} onClick={nextDataPage}>
                <ChevronRightIcon style={this.getIconRightStyle(webStyle)} />
              </Grid>
            </Grid>

          </div> :
          <Grid container spacing={2} style={webStyle.mainContainer}>
            <CustomTypography component="title2">{configJSON.noAssetsText}</CustomTypography>
            <Grid style={webStyle.collectionBtn}>
              <CustomButton variant="secondary" fullWidth="fullWidth" size={"large"} onClick={this.openAssestModal} data-test-id="openAssestModal">{configJSON.addAssets}</CustomButton>
            </Grid>
          </Grid>
        }
        <ModalComponent
          open={assetsModal}
          maxWidth={508}
          modalMinHeight={'0px'}
        >
          <form onSubmit={this.createCollection} data-test-id="handleCreateCollectionSave">
            <Grid style={webStyle.modalHeight}>
              <div style={webStyle.crossIcons}>
                <CloseIcon onClick={this.closeAssetsModal} style={webStyle.pointer} />
              </div>
              <Grid style={webStyle.submitModalContent}>

                <CustomTypography component="title2">{configJSON.addAssets}</CustomTypography>
                <Box style={webStyle.fillCollection}> <CustomTypography variant="outfitBody2" component="text_none">{configJSON.newCollectionName}</CustomTypography>
                  <Input
                    type="text"
                    placeholder="Nature_image 2023"
                    value={collectionName}
                    data-test-id="handleCreateCollection"
                    onChange={this.handleCreateCollection}
                    required
                    disabled={collectionSuggestName}
                    maxLength={30}
                  />
                </Box>

                <Box style={webStyle.fillCollection}>
                  <Box style={webStyle.orStyle}>
                    <CustomTypography variant="outfitBody2" component="text_none">{configJSON.or}</CustomTypography>
                  </Box>
                  <CustomTypography variant="outfitBody2" component="text_none">{configJSON.existingCollectionName}</CustomTypography>
                  <Box style={webStyle.category}>
                    <Select
                      disableUnderline
                      value={collectionSuggestName}
                      data-test-id="handleCategoryChange"
                      onChange={this.handleCreateDropCollection}
                      IconComponent={ExpandMoreIcon}
                      style={webStyle.chooseStyle}
                      displayEmpty
                      disabled={collectionName}

                    >
                      <MenuItem value="" style={webStyle.display_none}>
                        {configJSON.chooseCollection}
                      </MenuItem>
                      {collectionData?.map((item: any, index: any) => (
                        <MenuItem key={index} value={item.attributes.collection_name}>{item.attributes.collection_name}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <Grid style={webStyle.fillCollection}>
                  <CustomTypography variant="outfitBody2" component="text_none" >{configJSON.collectionType}</CustomTypography>
                  <Box style={webStyle.actionBtns}>
                    <Grid style={webStyle.selectedContentBtn}>
                      <CustomButton type="button" variant={selectedButton === "image" ? "collectionContentBtn" : "tertiarySecondaryWithBorder"} fullWidth='fullWidth' component="text_none" size={"largeButton"} data-test-id="handleButtonClick" closeBtn={true} onClick={() => this.handleButtonClick("image")}>{configJSON.image}</CustomButton>
                    </Grid>
                    <Grid style={webStyle.selectedContentBtn}>
                      <CustomButton type="button" variant={selectedButton === "video" ? "collectionContentBtn" : "tertiarySecondaryWithBorder"} size={"largeButton"} fullWidth='fullWidth' component="text_none" data-test-id="handleButtonVideoClick" closeBtn={true} onClick={() => this.handleButtonClick("video")}>{configJSON.video}</CustomButton>
                    </Grid>
                  </Box>
                </Grid>
                <Box>
                  <Box style={webStyle.radioBtn}>
                    <CustomRadioButton
                      data-test-id="handleSetVisibility"
                      onChange={this.handleSetVisibility}
                      checked={
                        setVisibility === configJSON.publicVisibility
                      }
                      value={configJSON.publicVisibility}
                    />
                    <CustomTypography variant="outfitBody2" component="text_none">{configJSON.publicVisibility}</CustomTypography>
                  </Box>
                  <Grid style={webStyle.radioBtn}>
                    <CustomRadioButton
                      onChange={this.handleSetVisibility}
                      checked={
                        setVisibility === configJSON.privateVisibility
                      }
                      value={configJSON.privateVisibility}
                    />
                    <CustomTypography variant="outfitBody2" component="text_none">{configJSON.privateVisibility}</CustomTypography>
                  </Grid>
                </Box>
                <Box style={webStyle.btnWidth}>
                  <CustomButton variant="primary" type="submit" fullWidth='fullWidth' size={"large"} closeBtn={true} >{configJSON.save}</CustomButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </ModalComponent>
        <CustomSnackBar
          open={showAlert}
          onClose={this.handleAlertClose}
          data-test-id="handleAlertClose"
          title={userSuccessAlert}
          horizontal="center"
          variant={this.showAlertType()}
        />
        <ModalComponent open={this.state.showDeleteDialog} maxWidth={541} maxHeight={300}>
          <DeleteParent>
            <CustomTypograpyParent>
              <CustomTypography
                textTransform={"uppercase"}
                variant={"primary"}
                component={"body6"}
              >
                {configJSON.deleteDialogTitle}
              </CustomTypography>
            </CustomTypograpyParent>
            <Divider variant="whiteDark"></Divider>
            <ParentDiv>
              <CustomTypograpyParent1>
                <CustomTypography variant={"secondary"} component={"body10"}>
                  {configJSON.deleteContent}
                </CustomTypography>
              </CustomTypograpyParent1>
              <ActionDiv>
                <ActionDivInner>
                  <CustomButton
                    fullWidth="fullWidth"
                    data-test-id="cancel_button"
                    size={"medium"}
                    onClick={this.handleCloseDeleteDialog}
                    variant="secondary"
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
                    onClick={this.deleteGalleryApi}
                  >
                    {configJSON.deleteBtnLabel}
                  </CustomButton>
                </ActionDivInner>
              </ActionDiv>
            </ParentDiv>
          </DeleteParent>
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
    gap: "24px",
    overflow: "hidden",
    backgroundColor: customTheme.palette.white.main,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",

  },
  mainContentContainer: {
    padding: "24px 20px 24px 30px",
    width: "96%",
    height: "92%",
    backgroundColor: customTheme.palette.white.main,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  crossIcons: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  actionBtns: {
    display: "flex",
    width: "100%",
    gap: "20px"
  },
  selectedContentBtn: {
    width: "232px",
    height: "48px"
  },
  modalHeight: {
    height: "660px"
  },
  submitModalContent: {
    padding: "50px 20px",
    gap: "24px",
    display: "flex",
    flexDirection: "column"
  },
  collectionBtn: {
    width: "224px",
    height: "48px"
  },
  fillCollection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  radioBtn: {
    display: "flex",
    justifyContent: "space-between",
    width: "18%",
    alignItems: "center"
  },
  orStyle: {
    width: '100%',
    textAlign: "center"
  },
  contentSize: {
    width: "301px",
    height: "214px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "40px",
  },
  contentImage: {
    width: "301px",
    height: "182px"
  },
  pointer: {
    cursor: "pointer"
  },
  contentDetails: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px"
  },
  iconSizes: {
    width: "16px",
    height: "16px",
    paddingRight: '10px'
  },
  selectedOption: {
    fontSize: "12px",
    fontFamily: "Outfit-Light",
    fontWeight: 400
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    gap: '20px',
    overflow: "hidden",
    paddingRight: "50px"
  },
  pageBtn: {
    backgroundColor: customTheme.palette.disabled.main,
    width: "24px",
    height: "24px",
    padding: "10px"
  },
  disabled: {
    color: customTheme.palette.secondary.main
  },
  able: {
    color: "black",
    cursor: "pointer"
  },
  category: {
    border: `1px solid ${customTheme.palette.secondary.light}`,
    padding: "10px",
    marginTop: "10px"
  },
  chooseStyle: {
    display: "flex", color: customTheme.palette.secondary.main
  },
  display_none: {
    display: "none"
  },
  setHeight: { height: "100%" },
  downloadBtn: {
    cursor: "pointer",
    position: 'absolute',
    top: '77%',
    right: '3%',
    color: customTheme.palette.white.main,
    backgroundColor: customTheme.palette.secondary.main,
    padding: '3px'
  },
  paginationWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px 24px"
  },
  paginationInner: {
    display: "flex",
    gap: "8px"
  },
};
const ParentDiv = styled("div")({
  padding: "0px 32px",
});

const DeleteParent = styled("div")({
  padding: "12px",
});

const ActionDiv = styled("div")({
  gap: "24px",
  display: "flex",
});
const ActionDivInner = styled("div")({
  width: "100%",
});
const CustomTypograpyParent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const CustomTypograpyParent1 = styled("div")({
  padding: "32px 0px",
  textAlign: "center",
  "@media(max-width:600px)": {
    "& br": {
      display: "none",
    },
  },
});

// Customizable Area End
