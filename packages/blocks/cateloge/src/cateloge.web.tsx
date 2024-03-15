import React from "react";
// Customizable Area Start
import {
  Box,
  Avatar, Grid, Tabs, Tab, AppBar, styled, Dialog, DialogContent, DialogActions,LinearProgress
} from "@material-ui/core";
const configJSON = require("./config");
const images = require("./assets")
import { createTheme } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import Label from "../../../components/src/DesignSystem/Label/Label.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";

const getBackgroundColor = (success: any, fileName: any) => {
  if (success[fileName] === 'success') {
    return '#059669';
  } else if (success[fileName] === 'failure') {
    return '#DC2626';
  } else {
    return '#3A82FF !important';
  }
};
// Customizable Area End

import CatalogueController, { Props } from "./CatalogueController";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class Catalogue extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  getIconSrc = (successStatus: any, images: any) => {
    if (successStatus === 'success') {
      return images.success;
    } else if (successStatus === 'failure') {
      return images.failed;
    } else {
      return images.process;
    }
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {files, progress, success,uploadTime} = this.state
    // Customizable Area End
    return (
      // Customizable Area Start
      <Grid>
      <NavigationMenu contributorLogin={false} contributorContent={true} data-test-id="goToUpload" goToLanding={this.goToLanding} handleSelect= {this.handleSelect} navigation={undefined} id={""}/>
        <Box style={webStyle.mainUploadContainer}>

          <Grid>
            <AppBar position="static" style={webStyle.topNavbar}>
              <Tabs variant="scrollable"
          scrollButtons="auto">
                <Tab label="Earnings" style={webStyle.navbarTabs} />
                <Tab label="Portfolio" style={webStyle.navbarTabs} data-test-id="goToPortfolioPage" onClick={this.goToPortfolioPage} />
                <Tab label="Insights" style={webStyle.navbarTabs} />
                <Tab label="request" style={webStyle.navbarTabs} />
                <Tab label="upload" style={webStyle.navbarTabs} />
                <Tab label="unpaid earnings: US$0.00" style={webStyle.rightContent} />

              </Tabs>
            </AppBar>
          </Grid>
          <CustomGrid container spacing={2}>
            <Grid container spacing={2} style={webStyle.mainContainer}>
              <Grid style={webStyle.actionBtnsArea}>
                <Grid item xs={12} lg={6} style={webStyle.uploadHead} >{configJSON.uploadHeading}</Grid>
                <CustomTypography variant='needHelp' component="text_capitalize">{configJSON.needHelp}</CustomTypography>
              </Grid>
              <CustomGridContainer container onDrop={this.handleDrop} data-test-id="dragDrop"
                onDragOver={this.handleDragOver}
              >
                <Avatar src={`${images.uploadImageIcon}`} style={webStyle.showIcon} />
                <Grid item style={{ ...webStyle.dragContent }} >{configJSON.dragContent}</Grid>
                <CustomTypography component="text_none">{configJSON.or}</CustomTypography>
                <Label htmlFor='fileInput'>
                  <Grid onClick={this.handleUploadClick} data-test-id='handleUploadClick' style={webStyle.selectFilesBtn}>{configJSON.selectFiles}</Grid>
                </Label>
                <CustomInput>
                  <Input
                    type='file'
                    id='fileInput'
                    ref={this.inputRef}
                    style={webStyle.fileInput}
                    data-test-id='handleFileInputChange'
                    onChange={this.handleFileInputChange}
                    multiple
                  />
                </CustomInput>
                <CustomTypography component="text_none">{configJSON.imageSize}</CustomTypography>
                <CustomTypography component="text_none">
                  <span style={webStyle.uploadLink}>image</span> and <span style={webStyle.uploadLink}>video</span> requirements.</CustomTypography>

                <Grid style={webStyle.showSelectedImage}>
                  {this.state.files.map((item: any, index: any) => (
                    <div key={index} style={webStyle.showImageList}>
                      {item.type === 'image' ? (
                        <img
                          src={item.dataUrl}
                          alt={`media-${index}`}
                          style={webStyle.selectedContent}
                        />
                      ) : (
                        <video
                          src={item.dataUrl}
                          style={webStyle.selectedContent}
                          controls
                        />
                      )}
                      <CloseIcon
                        style={webStyle.cancelIcon
                        }
                        data-test-id="handleRemoveMedia"
                        onClick={() => this.handleRemoveMedia(index)}
                      />
                    </div>
                  ))}
                </Grid>

              </CustomGridContainer>
              <Grid style={webStyle.actionBtnsArea}>
                <CustomGridButton style={webStyle.actionBtns}>
                  <div style={webStyle.btnsWidth}>
                  <CustomButton variant={'secondary'}
                    fullWidth='fullWidth'
                    size={'large'} onClick={this.cancelBtn} data-test-id="cancelBtn">{configJSON.cancel}</CustomButton>
                    </div>
                    <div style={webStyle.btnsWidth}>
                  <CustomButton variant={!this.state.isSubmitEnabled ? 'nextDisableBtn' : 'primary'} fullWidth='fullWidth' size={"large"} data-test-id="sendContent"
                    onClick={this.state.isSubmitEnabled ? this.sendContentCall : null}
                     >{configJSON.next}
                    </CustomButton>
                    </div>
                </CustomGridButton>
                <Dialog open={this.state.inValidContent} PaperProps={{
                  style: {
                    padding: 20,
                  },
                }} maxWidth="md" data-test-id="handlePreviewClose" onClose={this.handleInValidContent}>
                  <DialogActions>
                    <CloseIcon onClick={this.handleInValidContent} />
                  </DialogActions>
                  <DialogContent style={webStyle.flexDisplay} >
                    <img src={images.error} />
                    <CustomTypography component="red">{configJSON.errorContent}</CustomTypography>
                    <div style={webStyle.btnWidth}>
                    <CustomButton variant="secondary" fullWidth='fullWidth' size="large" onClick={this.handleInValidContent}>{configJSON.retryBtn}</CustomButton>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={this.state.showProcesssing} PaperProps={{
                  style: {
                    padding: 20,
                  },
                }} maxWidth="md" data-test-id="closeUploadingContent" onClose={this.closeUploadingContent}>
                  <DialogActions>
                    <CloseIcon onClick={this.closeUploadingContent} />
                  </DialogActions>
                  <DialogContent style={webStyle.flexDisplay} >
                  {files.map((file: any, index: any) => (
                    
          <div key={file.name} style={webStyle.processStyle}>

        {file.type === "image" ? 
        <img
          src={file.dataUrl}
          alt={`media-${index}`}
          style={webStyle.uploadedImage}
        />
      :
        <video
          key={file.name}
          src={file.dataUrl}
          style={webStyle.uploadedImage}
          controls
        />
      }
                        <div style={webStyle.flexContent}>
                          <div style={webStyle.uploadingTime}>
                        <CustomTypography component="outfitBody2" textTransform="text_none">{file.contentName}</CustomTypography>

                        {progress[file.name] > 0 && (
            <>
            {success[file.name] === 'failure' ?
              <CustomTypography>Failed</CustomTypography> : 
            <>
            <CustomTypography component="outfitBody3" textTransform="text_none">{progress[file.name]}%</CustomTypography>
           {success[file.name] !== 'success' && <CustomTypography component="outfitBody3" textTransform="text_none">{uploadTime[file.name] / 1000} sec left</CustomTypography>}
              </>
          }
              
            </>
          )}
          </div>
            {progress[file.name] > 0 && (
              <CustomLinearProgress
              variant="determinate"
              value={progress[file.name]}
              success={success}
              file={file}
              sx={{ marginBottom: 1 }}
            />
            )}
            </div>
            <img src={this.getIconSrc(success[file.name], images)}/>
          </div>
        ))}
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>
          </CustomGrid>
        </Box>
        </Grid>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle: any = {
  mainUploadContainer: {
    overflowX: "hidden"
  },
  topNavbar: {
    backgroundColor: "#0E0F17",
    color: "white",
    textTransform: "uppercase"
  },
  navbarTabs: {
    borderRight: "1px solid white"
  },
  mainContainer: {
    width: "1360px",
    gap: "32px"
  },
  uploadHead: {
    fontSize: "24px",
    fontWeight: 400,
    fontFamily: "lemonMilk",
    textTransform: "Uppercase",
    marginTop: "50px"
  },
  dragContent: {
    fontSize: "32px",
    fontWeight: 400,
    textTransform: "Uppercase",
    fontFamily: "lemonMilk",
  },
  uploadContentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: '16px'

  },

  actionBtns: {
    display: "flex",
    gap: "20px",
    justifyContent: "flex-end"
  },
  cancelBtn: {
    border: "1px solid black",
    textTransform: "uppercase",
    padding: "0px 32px",
    fontSize: '14px',
    fontWeight: 400,
  },
  showSelectedImage: {
    display: "flex",
    width: "100%",
    flexWrap: "nowrap"
  },
  cancelIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    color: "white",
    padding: "10px"
  },
  selectedContent: {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: '10px',
    width: "140px",
    height: "140px"
  },

  uploadLink: {
    color: "#3A82FF",
    textDecoration: "underline"
  },
  actionBtnsArea:
  {
    width: "100%"
  },
  fileInput: { display: 'none' },
  showIcon: {
    width: "98px",
    height: "98px"
  },
  rightContent: {
    marginLeft: "auto"
  },
  showImageList: {
    position: 'relative',
    display: 'inline-block'
  },
  selectFilesBtn: {
    color: "white",
    backgroundColor: "black",
    textTransform: "uppercase",
    fontSize: "14px",
    padding: "20px 30px",
    textAlign: "center"
  },
  flexDisplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: '50px',
    flexDirection: "column"
  },
  btnWidth:{
    width:"200px"
  },
  btnsWidth:{
width:"112px"
  },
  uploadedImage :{
    width:"48px",
    height:"48px",
  },
  processStyle:{
    display:"flex",
   gap:"24px",
   alignItems:"center"
  },
  flexContent :{
    display:"flex",
    gap:"12px",
    flexDirection:"column"
  },
  uploadingTime: {display:'flex', justifyContent:"space-between"}
};
const CustomInput = styled(Box)({
  '& .MuiFormHelperText-contained': {
    marginLeft: '0px'
  },
  display: "none"
})
const CustomGrid = styled(Grid)({
  marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
    '@media (min-width: 320px)': {
      padding: '0px 50px',
    },
})
const CustomGridContainer = styled(Grid)({
  border: "2px dashed #73767A",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: '16px',
    padding: "40px 0",
    backgroundColor: "#F6F6F6",
    '@media (max-width: 768px)': {
      padding: '40px 20px',
    },
})
const CustomGridButton = styled(Grid)({
  display: "flex",
    gap: "20px",
    justifyContent: "flex-end",
    '@media (max-width: 400px)': {
    justifyContent: "center !important",
    },
})
const CustomLinearProgress = styled(LinearProgress)(({ success, file }: any) => ({
  width:"288px",
  height:"4px",
  borderRadius:"2px",
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: getBackgroundColor(success, file.name),
  },
}));
// Customizable Area End
