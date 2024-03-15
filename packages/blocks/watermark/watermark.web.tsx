// import React from "react";

// import {
//   Container,
//   Box,
//   Input,
//   Button,
//   InputLabel,
//   Typography,
//   InputAdornment,
//   IconButton,
//   // Customizable Area Start
//   // Customizable Area End
// } from "@material-ui/core";

// // Customizable Area Start
// import { createTheme, ThemeProvider } from "@material-ui/core/styles";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Visibility from "@material-ui/icons/Visibility";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#fff",
//       contrastText: "#fff",
//     },
//   },
//   typography: {
//     h6: {
//       fontWeight: 500,
//     },
//     subtitle1: {
//       margin: "20px 0px",
//     },
//   },
// });
// // Customizable Area End

// import WatermarkController, {
//   Props,
//   configJSON,
// } from "./WatermarkController";

// export default class Watermark extends WatermarkController {
//   constructor(props: Props) {
//     super(props);
//     // Customizable Area Start
//     // Customizable Area End
//   }

// Customizable Area Start

import React from "react";
import { createTheme } from "@material-ui/core/styles";
import {
    Box,
    Avatar, Grid, styled, ThemeProvider
} from "@material-ui/core";
import WatermarkController, { Props } from "./WatermarkController.web";
import {
    RightCropIcon,
    leftCropIcon,
    uploadImageIcon,
    watermark,
    CropWatermark
} from "./assets";
export const configJSON = require("./config");
import Label from "../../../components/src/DesignSystem/Label/Label.web";
import NavigationMenu from "../../../blocks/navigationmenu/src/NavigationMenu.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import SideBar from "../../../components/src/DesignSystem/SideBar/SideBar.web";
import { sideBarBottomNav, sideBarListItem } from "../../../blocks/navigationmenu/src/NavigationMenuController";
import Input from "../../../components/src/DesignSystem/Input/Input.web";

const theme = createTheme({});


export default class Watermark extends  WatermarkController {
  constructor(props: Props) {
    super(props);
 
  }
  render() {
  
    return (
      <>
       <NavigationMenu ModeratorLogin={true} contributorLogin={true} contributorContent={false} data-test-id="goToUpload" navigation={undefined} id={""} />
                <SideBar id="Test-id" navigation={this.props.navigation} sideBarBottomNav={sideBarBottomNav} sideBarListItem={sideBarListItem}>
                    <ThemeProvider theme={theme}>
                        <Box style={webStyle.MainWrapper}>
                            <CustomGrid container spacing={2}>
                                <Grid container spacing={2} style={webStyle.mainContainer}>
                                    <Grid style={webStyle.watermarkHead}>
                                        <Grid item xs={12} lg={6} style={webStyle.uploadHead}>
                                            Add Watermark To Photo & Image Files
                                        </Grid>
                                        {this.state.selectedFile && this.state.selectedFile.length > 0 && !this.state.applyClick ? (
                                            <Grid item style={webStyle.cropImageBlock}>
                                                <span><img src={RightCropIcon} alt="Right Crop Icon" /></span>
                                                <span><img src={leftCropIcon} alt="Left Crop Icon" /></span>
                                            </Grid>
                                        ) : null}
                                    </Grid>

                                    {this.state.selectedFile && this.state.selectedFile.length === 0 && <CustomGridContainer container data-test-id="dragDrop">
                                        <Avatar src={`${uploadImageIcon}`} style={webStyle.showIcon} />
                                        <Grid item style={{ ...webStyle.dragContent }} >{configJSON.dragContent}</Grid>
                                        <CustomTypography component="text_none">{configJSON.or}</CustomTypography>
                                        <Label htmlFor='fileInput'>
                                            <Grid data-test-id='handleUploadClick' style={webStyle.selectFilesBtn}>{configJSON.selectFiles}</Grid>
                                        </Label>
                                        <CustomInput>
                                            <Input
                                                type='file'
                                                id='fileInput'
                                                // ref={this.inputRef}
                                                style={webStyle.fileInput}
                                                data-test-id='handleFileInputChange'
                                                onChange={this.handleFileInputChange}
                                                multiple
                                            />
                                        </CustomInput>
                                        <CustomTypography component="text_none">{configJSON.watermarkImageCondition}</CustomTypography>
                                    </CustomGridContainer>}
                                    {(this.state.selectedFile && this.state.selectedFile.length > 0  && !this.state.applyClick) && (
                                        <CustomGridWatermark style={webStyle.uploadWaterMark}>
                                            <Grid style={webStyle.BtnBlock} className="watermark">
                                                <img src={`${watermark}`} alt="Watermark" />
                                                <span className="crop_img"><img src={CropWatermark} alt="watermark_crop" /></span>
                                                <Grid style={webStyle.UploadBtnBLock}>
                                                    <div style={webStyle.btnWidth}>
                                                        <CustomButton variant="secondary" size="large" fullWidth='fullWidth'>
                                                            Cancel
                                                        </CustomButton>
                                                    </div>
                                                    <div style={webStyle.btnWidth}>
                                                        <CustomButton variant="primary" size="large" fullWidth='fullWidth' data-test-id="applyClickBtn" onClick={this.handleApplyClick}>
                                                            Apply
                                                        </CustomButton>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </CustomGridWatermark>
                                    )}
                                    {(this.state.selectedFile && this.state.selectedFile.length > 0 && this.state.applyClick) && (
                                        <Grid style={webStyle.uploadWaterMark}>
                                            <Grid style={webStyle.BtnBlock}>
                                                <img src={`${watermark}`} />
                                                <Grid style={webStyle.UploadBtnBLock}>
                                                    <div style={webStyle.btnWidth}>
                                                        <CustomButton variant="secondary" size="large" fullWidth='fullWidth'>
                                                            Cancel
                                                        </CustomButton>
                                                    </div>
                                                    <div style={webStyle.btnWidth}>
                                                        <CustomButton variant="primary" size="large" fullWidth='fullWidth'>
                                                            Submit
                                                        </CustomButton>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </CustomGrid>
                        </Box>
                    </ThemeProvider>
                </SideBar>
      </>
    );

  }
}



const webStyle: any = {
    MainWrapper: {
        border: "1px solid #BFC2C3",
        background: "#FFF",
        margin: "24px"
    },
    MainWrapperHeading: {
        padding: "24px"
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
    watermarkHead: {
        width: "100%",
        display: "flex",
    },
    cropImageBlock: {
        marginTop: "50px",
        display: "flex",
        gap: "20px"
    },
    fileInput: { display: 'none' },
    showIcon: {
        width: "98px",
        height: "98px"
    },
    selectFilesBtn: {
        color: "white",
        backgroundColor: "black",
        textTransform: "uppercase",
        fontSize: "14px",
        padding: "20px 30px",
        textAlign: "center",
        cursor: "pointer"
    },
    btnWidth: {
        width: "126px"
    },
    uploadWaterMark: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    UploadBtnBLock: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "24px",
        marginTop: "32px"
    }
  };
  const CustomInput = styled(Box)({
    '& .MuiFormHelperText-contained': {
        marginLeft: '0px'
    },
    display: "none"
  })
  const CustomGrid = styled(Grid)({
      display: "flex",
    marginBottom: "2rem",
    justifyContent: "center",
    '@media (min-width: 320px)': {
        padding: '0px 50px',
    },
  })
  const CustomGridContainer = styled(Grid)({
      height: "auto",
      border: "2px dashed #73767A",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: '16px',
    backgroundColor: "#F6F6F6",
    padding: "40px 0",
    '@media (max-width: 768px)': {
        padding: '40px 20px',
    },
  })
  const CustomGridWatermark = styled(Grid)(
    {
        "& .watermark": {
            position: "relative"
        },
        "& .crop_img": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }
    }
  )

// Customizable Area End

//   render() {
//     return (
//       // Customizable Area Start
//       <ThemeProvider theme={theme}>
//         <Container maxWidth={"sm"}>
//           <Box sx={webStyle.mainWrapper}>
//             <Typography variant="h6">{configJSON.labelTitleText}</Typography>
//             <Typography variant="subtitle1" component="div">
//               {configJSON.labelBodyText}
//             </Typography>
//             <Box sx={webStyle.inputStyle}>
//               <InputLabel id="service-shop-name">
//                 This is the reviced value:{this.state.txtSavedValue}{" "}
//               </InputLabel>
//               <Input
//                 data-test-id={"txtInput"}
//                 type={this.state.enableField ? "password" : "text"}
//                 placeholder={configJSON.txtInputPlaceholder}
//                 fullWidth={true}
//                 disableUnderline={true}
//                 value={this.state.txtInputValue}
//                 onChange={(eData) => this.setInputValue(eData.target.value)}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={this.setEnableField}
//                       edge="end"
//                     >
//                       {this.state.enableField ? (
//                         <Visibility />
//                       ) : (
//                         <VisibilityOff />
//                       )}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//             </Box>
//             <Box
//               data-test-id="btnAddExample"
//               onClick={() => this.doButtonPressed()}
//               component="button"
//               sx={webStyle.buttonStyle}
//             >
//               <Button color={"primary"}>{configJSON.btnExampleTitle}</Button>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//       // Customizable Area End
//     );
//   }
// }

// // Customizable Area Start
// const webStyle = {
//   mainWrapper: {
//     display: "flex",
//     fontFamily: "Roboto-Medium",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingBottom: "30px",
//     background: "#fff",
//   },
//   inputStyle: {
//     borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
//     width: "100%",
//     height: "100px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   buttonStyle: {
//     width: "100%",
//     height: "45px",
//     marginTop: "40px",
//     border: "none",
//     backgroundColor: "rgb(98, 0, 238)",
//   },
// };
// // Customizable Area End
