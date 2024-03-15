import React from "react";
// Customizable Area Start
// Customizable Area End

import UserProfileController, { Props } from "./UserProfileController";
import {
  Box,
  Button,
  Grid,
  Radio,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@material-ui/core";
import ProfileSideBar from "../../../components/src/DesignSystem/ProfileSideBar/ProfileSideBar.web";
import Header from "../../../components/src/DesignSystem/Header/Header.web";
import Footer from "../../../components/src/DesignSystem/Footer/Footer.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import { edit, errorIcon, profileIcon, sad, upload } from "./assets";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
import Dropzone from 'react-dropzone';
export default class UserProfileDetails extends UserProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    return (
      // Customizable Area Start
      <>
        <Header testID={""} navigation={this.props.navigation} classNameProps={undefined} />
        <Main>
          <MainGrid container>
            <ManiInnerGrid item xs={12} sm={12} md={3}>
              <ProfileSideBar
                name={this.state.userProfileDetails.name}
                username={this.state.userProfileDetails.userName}
                activeTab={0}
                navigation={this.props.navigation}
              />
            </ManiInnerGrid>
            <Grid item xs={12} sm={12} md={6}>
              <MainBox>
                <Box1>
                  <InnerBox1>
                  {this.state.profileImg ? (
                          <Img src={this.state.userProfileDetails?.image} />
                        ) : (
                          <Img src={profileIcon} />
                        )}
                    <InnerBox2>
                      <Heading1>
                        {this.state.userProfileDetails?.name}
                      </Heading1>
                      <Subheading1>
                        {this.state.userProfileDetails?.user_name}
                      </Subheading1>
                    </InnerBox2>
                  </InnerBox1>
                  <EditButton>
                    <EditButtonInner1
                      onClick={() => this.handleOpen(this.state.setOpen)}
                      data-test-id="profileedit"
                    >
                      EDIT
                    </EditButtonInner1>
                    <ModalComponent
                      open={this.state.setOpen}
                      maxWidth={448}
                      maxHeight={452}
                    >
                      <HeadingModal>EDIT PROFILE DETAILS</HeadingModal>
                      <ModalImgContainer>
                        {this.state.profileImg1 ? (
                          <ModalImg src={this.state.profileImg1} alt="Profile" />
                        ) : (
                          <ModalImg src={profileIcon} alt="Profile" />
                        )}
                        <AddIcon
                          src={edit}
                          onClick={() =>
                            this.handleImgOpen(this.state.setImgOpen)
                          }
                          data-test-id="addImage"
                        />
                        <ModalComponent
                          open={this.state.setImgOpen}
                          maxWidth={808}
                          maxHeight={488}
                          width="100%"
                          height="100%"
                          padding={35}
                        >
                          <UploadHeading>
                            <ArrowBackIcon
                            data-test-id="ArrowBackIcon"
                              onClick={() =>
                                this.handleImgOpen(this.state.setImgOpen)
                              }
                            />
                            <Typography>UPLOAD PROFILE PICTURE</Typography>
                            <ClearIcon
                            data-test-id="ClearIcon"
                              onClick={() =>
                                this.handleImgOpen(this.state.setImgOpen)
                              }
                            />
                          </UploadHeading>
                          <div>
                            <TabSection
                              value={this.state.selectedTab}
                              onChange={this.handleTabChange}
                              data-test-id="tabChange"
                            >
                              <Tab1 label="Gallery" />
                              <Tab1 label="From Device" />
                            </TabSection>
                            {this.state.selectedTab === 0 && (
                              <ImageGalleryBox>
                                {this.state.galleryData?.length > 0 ? (
                                  this.state.galleryData?.map(
                                    (item: any, index: any) => (
                                      <ImageGalleryBoxInner
                                        src={item.url}
                                        key={index}
                                        data-test-id="imgInputData"
                                        onClick={() => this.handleImageClick(item.url,item.id)}
                                       />
                                    )
                                  )
                                ) : (
                                  <ImageGalleryBoxInner1>
                                    <ImageGalleryImg src={sad} />
                                    <ImageGalleryHeading>
                                      OOPS! WE COULDN'T FIND ANY IMAGE IN
                                      GALLERY
                                    </ImageGalleryHeading>
                                    <ImageGalleryHeading1>
                                      Looks like you haven’t uploaded any image
                                      yet!
                                    </ImageGalleryHeading1>
                                  </ImageGalleryBoxInner1>
                                )}
                              </ImageGalleryBox>
                            )}
                            {this.state.selectedTab === 1 && (
                               <Dropzone data-test-id="imageUpload" onDrop={acceptedFiles =>{ this.handleFileDrop(acceptedFiles)}}>
                               {({ getRootProps, getInputProps }) => (
                               <div {...getRootProps()}>
                                <input {...getInputProps()} />
                              <UploadBox>
                                <TopMessage id="top-message" display={this.state.topMsg}>
                                  The selected image is too large. Please select
                                  a smaller size image.
                                </TopMessage>
                                <TopMessage id="top-message" display={this.state.topMsg1}>
                                  The selected image is not png and jpeg. Please select
                                  a png and jpeg image.
                                </TopMessage>
                                <InnerUploadBox>
                                  <LabelStyle htmlFor="image-upload">
                                    <ImgDiv>
                                      <img
                                        id="image-preview"
                                        src={upload}
                                        alt="Image Preview"
                                      />
                                      <BrowseButton>BROWSE IMAGE</BrowseButton>
                                    </ImgDiv>
                                  </LabelStyle>
                                  <OrTypography>OR</OrTypography>
                                   <CustomTypography variant="body">DRAG AND DROP</CustomTypography>
                                </InnerUploadBox>
                                <BoxStyle>
                                  <TextLeftStyle>
                                    Supported file formats: Jpeg, png
                                  </TextLeftStyle>
                                  <TextRightStyle>
                                    Allowed file size : 5 MB
                                  </TextRightStyle>
                                </BoxStyle>
                              </UploadBox>
                              </div>
                              )}
                              </Dropzone>
                            )}
                          </div>
                        </ModalComponent>
                      </ModalImgContainer>
                      <ModalRemoveButton
                        id="remove-button"
                        data-test-id="rmvbtn"
                        onClick={this.deleteImage}
                        visibility={this.state.showButton}
                      >
                        Remove image
                      </ModalRemoveButton>
                      <InputDiv>
                        <Label>USER NAME</Label>
                        <Input id="outlined-basic" maxLength={30} variant="outlined" value={this.state.name} data-test-id="userNameInput" onChange={this.handleInputchange} />
                      </InputDiv>
                      <ModalDiv>
                      <ModalButton1>
                        <CustomButton
                          variant="secondary"
                          onClick={() => {
                            this.handleOpen(this.state.setOpen);
                          }}
                          fullWidth="fullWidth"
                          size="medium"
                        >
                          CANCEL
                        </CustomButton>
                        </ModalButton1>
                        <ModalButton2>
                        <CustomButton variant="primary" fullWidth="fullWidth" size="medium" onClick={() => { this.handleSave() }} data-test-id="savebtn">
                          SAVE CHANGES
                        </CustomButton>
                        </ModalButton2>
                      </ModalDiv>
                    </ModalComponent>
                  </EditButton>
                </Box1>
                <Box2>
                  <Heading>CONTACT DETAILS</Heading>
                  <Border />
                  <ContectBox>
                    {this.state.editEmail ?
                      (
                        <div>
                          <Box>
                            <SubheadingBlack>EMAIL</SubheadingBlack>
                            <Input type="email" variant="outlined" value={this.state.email} 
                            testId='handleEmail1'
                            onChange={this.handleEditEmail1} error={this.state.emailInputError} />
                          </Box>
                          {this.state.emailInputError &&
                            (<ErrorMsg>
                              <img src={errorIcon} />
                              <ErrorText>Enter the valid email id.</ErrorText>
                            </ErrorMsg>)}
                        </div>
                      ) : (
                        <InnerContect1>
                          <Box>
                            <Subheading>EMAIL</Subheading>
                            <Heading1>{this.state.userProfileDetails?.email}</Heading1>
                          </Box>
                          <EditButton>                     
                            <EditButtonInner1 data-test-id='handleSa' onClick={this.handleEditEmail}>EDIT</EditButtonInner1>
                          </EditButton>
                        </InnerContect1>
                      )}
                    {this.state.editPhone ? (
                      <div>
                        <PhoneBox>
                          <SubheadingBlack>PHONE NUMBER</SubheadingBlack>
                          <Input data-test-id="numberUpdated" maxLength={15} variant="outlined" type="text" value={this.state.phoneNumber} onChange={this.handleEditPhone1} error={this.state.numberInputError} />
                          <Typography>
                            {this.state.numberInputError &&
                              (<ErrorMsg>
                                <img src={errorIcon} />
                                <ErrorText>Only numeric characters are allowed.</ErrorText>
                              </ErrorMsg>)}
                          </Typography>
                        </PhoneBox>
                      </div>
                    ) : (
                      <InnerContect2>
                        <Box>
                          <Subheading>PHONE NUMBER</Subheading>
                          <Heading1 data-test-id="hideMobileNumber">
                            {this.state.hideMobileNumber}
                          </Heading1>
                        </Box>
                        <EditButton>
                          <EditButtonInner1 onClick={this.handleEditPhone}>EDIT</EditButtonInner1>
                        </EditButton>
                      </InnerContect2>
                    )}
                    {this.state.cancelBtn &&
                      <CardButton>
                        <CardButtonInner>
                          <CustomButton size={'small'} data-test-id="handleCancle" variant="secondary" fullWidth="fullWidth" onClick={this.handleCancle}>CANCEL</CustomButton>
                        </CardButtonInner>
                        <CardButtonInner>
                          <CustomButton size={'small'} data-test-id="handleEmailSave" fullWidth="fullWidth" disabled={this.state.saveBtnEnable} 
                          onClick={this.handleSaveEmail1}
                         >SAVE CHANGES</CustomButton>
                        </CardButtonInner>
                      </CardButton>}
                  </ContectBox>
                </Box2>
                <Box3>
                  <Heading>LANGUAGE</Heading>
                  <Border />
                  <LanguageBox>
                    <RadioSpan
                      color = {this.state.setSelectedValue === "a"}
                      fontWeight={this.state.setSelectedValue === "a"}
                    >
                      ENGLISH
                    </RadioSpan>
                    <RadioButton
                      checked={this.state.setSelectedValue === "a"}
                      onChange={this.handleChange}
                      value="a"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                      color="default"
                      data-test-id="redio"
                    />
                  </LanguageBox>
                  <LanguageBox>
                    <RadioSpan
                    color = {this.state.setSelectedValue === "b"}
                    fontWeight={this.state.setSelectedValue === "b"}
                    >
                      ARABIC
                    </RadioSpan>
                    <RadioButton
                      checked={this.state.setSelectedValue === "b"}
                      onChange={this.handleChange}
                      value="b"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "B" }}
                      color="default"
                    />
                  </LanguageBox>
                </Box3>
                <Box4>
                  <Heading>DELETE ACCOUNT</Heading>
                  <Border />
                  <DeleteAccountBox>
                    <Box>
                      <HeadingDelete>DELETE ACCOUNT</HeadingDelete>
                      <DelHeading>
                        Deleting your account will make remove all your data and
                        preferences in Qstock.
                      </DelHeading>
                    </Box>
                    <EditButton>
                      <EditButtonInner1 data-test-id="handleOpenDelete" onClick={() => this.handleOpenDelete(this.state.setDelete)} color="secondary">
                        DELETE
                      </EditButtonInner1>
                      <ModalComponent
                        open={this.state.setDelete}
                        maxWidth={541}
                        maxHeight={300}
                      >
                        <DeleteParent>
                          <CustomTypograpyParent>
                            <CustomTypography
                              variant={'primary'}
                              component={'body6'}
                              textTransform={'uppercase'}
                            >
                              ARE YOU SURE WANT TO DELETE YOUR ACCOUNT?
                            </CustomTypography>
                          </CustomTypograpyParent>
                          <Divider variant="whiteDark"></Divider>
                          <ParentDiv>
                            <CustomTypograpyParent1>
                              <CustomTypography
                                variant={'secondary'}
                                component={'body3'}
                              >
                                Deleting your account will make you lose all your data including
                                <br/> settings and preferences, images from
                                <br/>   Qstock permanently.
                              </CustomTypography>
                            </CustomTypograpyParent1>
                            <DeleteDiv>
                              <DeleteDivInner>
                                <CustomButton
                                  onClick={() => this.handleOpenDelete(this.state.setDelete)}
                                  variant='secondary'
                                  fullWidth='fullWidth'
                                  data-test-id='handleOpenDelete1'
                                  size={'medium'}
                                >
                                  Don’t delete
                                </CustomButton>
                              </DeleteDivInner>
                              <DeleteDivInner>
                                <CustomButton
                                  variant='red'
                                  fullWidth='fullWidth'
                                  data-test-id='handleOpenDeleteNext'
                                  size={'medium'}
                                  onClick={() => this.handleOpenDeleteNext(this.state.setDeleteNext)}
                                >
                                  Yes, delete
                                </CustomButton>
                                <ModalComponent
                                  open={this.state.setDeleteNext}
                                  maxWidth={568}
                                  maxHeight={400}>
                                  <ParentNext>
                                    <ParentTypography>
                                      <CustomTypography variant="red">
                                        DELETE ACCOUNT
                                      </CustomTypography>
                                    </ParentTypography>
                                    <Divider variant="whiteDark"></Divider>
                                    <EmailNotification>
                                      <CustomTypography variant='body2'>
                                      To delete your account enter the code sent to <br/> {this.state.hideEmail}.
                                      </CustomTypography>
                                    </EmailNotification>
                                    <Input
                                        label="ENTER CODE"
                                        type='text'
                                        name='entercode'
                                        required
                                        data-test-id="handleOtpCode"
                                        value={this.state.otpCode}
                                        onChange={this.handleOtpCode}
                                        maxLength={6}
                                       />
                                       {this.state.otpError && (  
                                       <OtpCode>
                                        <img src={errorIcon}/>
                                        <OtpCode1>
                                        <CustomTypography variant="body3">Invalid code.</CustomTypography> 
                                        </OtpCode1>
                                      </OtpCode>)}
                                       <ResendDiv>
                                       <CustomTypography variant="secondary">Didn’t receive code?</CustomTypography>
                                       <ResendDiv1>
                                        <CustomButton variant="tertiary" onClick={this.sendDeleteOtp}>RESEND CODE</CustomButton>
                                       </ResendDiv1>
                                       </ResendDiv>
                                       <ResendBelowButton>
                                         <ResendBelowButtonInner>
                                        <CustomButton
                                          variant='secondary'
                                          fullWidth='fullWidth'
                                          data-test-id='handleKeepMyAccount'
                                          size={'medium'}
                                          onClick={this.handleKeepMyAccount}
                                        >
                                         keep my account
                                         </CustomButton>
                                         </ResendBelowButtonInner>
                                         <ResendBelowButtonInner>
                                         <CustomButton
                                          variant='red'
                                          fullWidth='fullWidth'
                                          testID='deletemyaccount'
                                          size={'medium'}
                                          disabled={this.state.deleteBtnEnable}
                                          onClick={this.deleteAccount}
                                        >
                                          DELETE MY ACCOUNT
                                        </CustomButton>
                                        </ResendBelowButtonInner>
                                       </ResendBelowButton>
                                  </ParentNext>
                                </ModalComponent>
                              </DeleteDivInner>
                            </DeleteDiv>
                          </ParentDiv>
                        </DeleteParent>
                      </ModalComponent>
                    </EditButton>
                  </DeleteAccountBox>
                </Box4>
              </MainBox>
            </Grid>
          </MainGrid>
        </Main>
        <Footer 
          userType={'normal'}
          navigation={this.props.navigation}
        />
         <CustomSnackBar
            open={this.state.emailUpdateSuccessfully}
            onClose={this.handleCloseSnackBar}
            title={"Email id updated successfully!"}
            subTitle={"You mail id has been updated."}
            data-test-id="handleCloseSnackBar"
          />
      </>
      // Customizable Area End
    );
  }
}
// Customizable Area Start
const Main = styled(Box)({
  backgroundColor: "#F3F4F4",
});

const Tab1=styled(Tab)({
  textTransform:"unset",
  fontFamily:"Outfit",
  fontWeight:500,
  fontSize:16
})

const MainGrid = styled(Grid)({
  padding: 32,
  "@media(max-width:959px)": {
    padding:"10px 32px 32px 32px"
  },
});

const ManiInnerGrid = styled(Grid)({
  marginRight: "25px",
  maxWidth:"290px",
  "@media(max-width:959px)": {
    marginRight: "unset",
    marginBottom: "30px",
    maxWidth:"unset",
  },
});

const Heading = styled(Typography)({
  fontSize: "12px",
  fontWeight: 500,
  fontFamily:"LEMON MILK;"
});

const HeadingDelete = styled(Typography)({
  fontSize: "10px",
  fontWeight: 500,
  fontFamily:"LEMON MILK;",
  "@media(max-width:600px)": {
    display:"none"
  },
});

const Subheading = styled(Typography)({
  fontSize: "10px",
  fontWeight: 400,
  color: "#73767A",
  marginBottom: "8px",
  fontFamily:"LEMON MILK"
});

const SubheadingBlack = styled(Typography)({
  fontSize: "10px",
  fontWeight: 400,
  color: "#000",
  marginBottom: "8px",
  fontFamily:"LEMON MILK"
});

const Heading1 = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  fontFamily:"LEMON MILK",
  lineBreak: "anywhere",
  "@media(max-width:600px)": {
    lineBreak: "anywhere",
  },
});

const Subheading1 = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#73767A",
  fontFamily:"Outfit"
});

const Border = styled("div")({
  border: "1px solid #E7EBEB",
  margin: "16px 0 32px 0px",
  "@media(max-width: 600px)": {
    margin: "16px 0 20px 0px",
  },
});

const EditButton = styled(Box)({
  fontSize: "12px",
  fontWeight: 400,
  fontFamily:"LEMON MILK"
});

const EditButtonInner1 = styled(Button)({
  "@media(max-width: 600px)": {
    paddingLeft:0,
    paddingTop:20
  },
});

const Img = styled("img")({
  borderRadius: "132px",
  width: "132px",
  height: "132px",
});

const Box1 = styled("div")({
  display: "flex",
  backgroundColor: "#fff",
  justifyContent: "space-between",
  padding: 32,
});

const Box2 = styled("div")({
  display: "flex",
  backgroundColor: "#fff",
  flexDirection: "column",
  padding: 32,
});

const Box3 = styled(Box)({
  backgroundColor: "#fff",
  padding: 32,
});

const Box4 = styled(Box)({
  backgroundColor: "#fff",
  padding: 32,
});

const InnerBox2 = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "30px",
  "@media(max-width:600px)": {
    marginLeft: "unset",
    alignItems: "center",
    paddingTop: "10px",
  },
});

const InnerBox1 = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  "@media(max-width: 600px)": {
    flexDirection: "column",
  },
});

const MainBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gridGap: "24px",
  width: "Auto",
  height: "Auto",
  maxWidth:"674px",
  "@media(max-width: 959px)": {
    maxWidth:"unset",
  },
});

const ContectBox = styled(Box)({});

const InnerContect1 = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
});

const InnerContect2 = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "30px"
});

const LanguageBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const RadioSpan = styled((props:any)=><span{...props}/>)({
  fontSize: 10,
  fontWeight: (props:any)=>(props.fontWeight ? 500 : 400 ),
  fontFamily:"LEMON MILK",
  color:(props:any)=>(props.color ? '#0E0F17' : '#73767A' )
});

const RadioButton=styled(Radio)({
  color:"black",
})

const DeleteAccountBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "@media(max-width: 600px)": {
    flexDirection:"column",
  },
});

const DelHeading = styled(Typography)({
  fontSize: "12px",
  fontWeight: 400,
  color: "#73767A",
  marginTop: "8px",
  fontFamily:"Outfit",
  "@media(max-width:600px)": {
    marginTop: 0,
  },
});

const HeadingModal = styled(Typography)({
  fontSize: "12px",
  fontWeight: 500,
  display: "flex",
  justifyContent: "center",
  marginTop: "40px",
  marginBottom: "20px",
});

const ModalImgContainer = styled("div")({
  position: "relative",
  borderRadius: "50%",
  width: "132px",
  height: "132px",
  margin: "auto",
  marginBottom: "20px",
});

const ModalImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "50%",
});

const AddIcon = styled("img")({
  position: "absolute",
  bottom: "0",
  right: "0",
  width: "32px",
  height: "32px",
  backgroundColor: "black",
  borderRadius: "50%",
  cursor: "pointer",
  padding: 4,
});

const ModalRemoveButton = styled((props:any)=><Button{...props}/>)({
  margin: "auto",
  color: "#EB5757",
  display: "flex",
  visibility:(props:any)=>(props.visibility ? 'visible' : 'hidden' )
});

const ModalDiv = styled("div")({
  margin: "20px 8px",
  display: "flex",
  gap:"20px"
});

const ModalButton1 = styled("div")({
  width: "100%",
});

const ModalButton2 = styled("div")({
  width: "100%",
});

const Label = styled("label")({
  fontSize: 10,
  fontWeight: 400,
  color: "#828282",
  marginBottom: "10px",
});

const InputDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "0px 8px",
});

const UploadHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const ImgInput = styled("input")({
  display: "none",
});

const UploadBox = styled(Box)({
  maxWidth: "805px",
  maxHeight: "355px",
  width: "100%",
  height: "100%",
  border: "1px dashed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const InnerUploadBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
});

const LabelStyle = styled("label")({
  width: "100%",
})

const OrTypography = styled(Typography)({
  margin: "10px 0px",
  fontSize: "10px",
  fontWeight: 500,
});

const DragTypography = styled("div")({
  fontSize: "10px",
  fontWeight: 500,
});

const ImgDiv = styled(Box)({
  backgroundColor: "black",
  width: "100%",
  margin: "auto",
  maxWidth: "140px",
  minHeight: "32px",
  display: "flex",
  alignItems: "center",
  paddingLeft: 30
});

const ImgDiv1 = styled(Box)({
  width: "100%",
  margin: "auto",
  maxWidth: "140px",
  minHeight: "32px",
  display: "flex",
  alignItems: "center",
  paddingLeft: 50
});

const BrowseButton = styled("div")({
  color: "#fff",
  fontSize: "10px",
  fontWeight: 500,
  padding: 5,
});

const TabSection = styled(Tabs)({
  borderBottom: "1px solid #E7EBEB",
  marginBottom: "24px",
  color: "black",
  marginTop: "29px",
  "& .MuiTabs-indicator": {
    backgroundColor: "black",
  },
  "& .MuiTab-root": {
    minWidth: 80,
    padding: 0,
    marginRight: 12,
  },
});

const BoxStyle = styled("div")({});

const TextLeftStyle = styled("div")({
  position: "absolute",
  bottom: "0",
  left: "0",
  margin: "10px",
  color: "#4F4F4F",
  fontSize: 12,
  fontWeight: 400,
  "@media(max-width:400px)": {
    width: "80px",
  },
});

const TextRightStyle = styled("div")({
  position: "absolute",
  bottom: "0",
  right: "0",
  margin: "10px",
  color: "#4F4F4F",
  fontSize: 12,
  fontWeight: 400,
  "@media(max-width:400px)": {
    width: "60px",
  },
});

const TopMessage = styled((props:any) => <div {...props} />)({
  color: "#DC2626",
  fontWeight: 400,
  fontSize: "14px",
  position: "absolute",
  top: "50px",
  margin: "10px",
  display: (props:any) => (props.display ? 'block' : 'none'),
});

const ImageGalleryBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  overflow: "auto",
  maxHeight:398,
  gap:"12px",
  "@media(max-width:900px)": {
   justifyContent:"center"
  },
});

const ImageGalleryBoxInner = styled("img")({
  maxWidth: "145px",
  maxHeight: "130px",
  width: "100%",
  height: "100%",
});

const ImageGalleryBoxInner1 = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
  paddingTop:"50px"
});

const ImageGalleryHeading = styled(Typography)({
  fontSize: 10,
  fontWeight: 500,
  color: "#000",
  margin: "32px 0px 12px 0px",
  fontFamily:"LEMON MILK;"
});

const ImageGalleryHeading1 = styled(Typography)({
  fontSize: 12,
  fontWeight: 400,
  color: "#73767A",
  maxWidth: "200px",
  width: "100%",
  textAlign: "center",
});

const ImageGalleryImg = styled("img")({
});

const CardButton = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "24px",
  marginTop: "30px"
})

const CardButtonInner = styled("div")({
  width: 102,
  height: 32,
})

const PhoneBox = styled(Box)({
  marginTop: 30
})

const ErrorMsg = styled("div")({
  color: "#DC2626",
  display: "flex",
  alignItems: "center",
  marginTop: 10
})

const ErrorText=styled(Typography)({
  fontSize:14,
  fontWeight:500,
  fontFamily:"Avenir",
  padding:"2px 0px 0px 8px"})

const DeleteDiv = styled("div")({
  display: "flex",
  gap: "24px",
})

const DeleteDivInner = styled("div")({
  width: "100%"
})

const CustomTypograpyParent = styled("div")({
  display: 'flex',
  justifyContent: 'center'
})

const CustomTypograpyParent1 = styled("div")({
  display: 'flex',
  textAlign: "center",
  padding: "32px 0px",
  "@media(max-width:600px)": {
    '& br': {
      display: "none",
    },
  },
});

const ParentDiv = styled("div")({
  padding: "0px 32px"
})

const DeleteParent = styled("div")({
  padding: "12px"
})

const ParentNext = styled("div")({
  padding:"20px"
})

const ParentTypography = styled("div")({
  display: 'flex',
  justifyContent: 'center',
})

const EmailNotification = styled("div")({
  maxWidth:406,
  padding:"40px 0px 30px 0px",
  lineBreak: "anywhere",
})

const ResendDiv=styled("div")({
  display:"flex",
  justifyContent:"end",
  padding:"17px 0px 40px 0px"
})

const ResendDiv1=styled("div")({
 paddingLeft:"12px"
})

const ResendBelowButton=styled("div")({
  display:"flex",
  gap:"24px",
})

const ResendBelowButtonInner=styled("div")({
  width:"100%"
})
const OtpCode=styled("div")({
  display:"flex"
})

const OtpCode1=styled("div")({
  paddingLeft:10,
  color:"#DC2626"
})

// Customizable Area End
