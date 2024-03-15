//@ts-nocheck

import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  // Customizable Area Start
  Grid,
  Divider,
  FormControl,
  Select,
  MenuItem,
  ImageList,
  ImageListItem,
  Checkbox,
  ListItemText,
  Radio,
  FormControlLabel,Dialog, DialogContent, DialogActions
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "../../../../packages/components/src/DesignSystem/Header/Header.web";
import Footer from "../../../../packages/components/src/DesignSystem/Footer/Footer.web";
import CustomButton from "../../../../packages/components/src/DesignSystem/CustomButton/CustomButton.web";
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';
import CropFreeSharpIcon from '@material-ui/icons/CropFreeSharp';
import ShareIcon from '@material-ui/icons/Share';
import Avatar from '@material-ui/core/Avatar';
import { basket } from "./assets";
import { FlatList } from "react-native";
import ModalComponent from "../../../../packages/components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import InputComponent from "../../../../packages/components/src/DesignSystem/Input/Input.web"
import CustomTypography from "../../../../packages/components/src/DesignSystem/CustomTypography/CustomTypography.web";
import customTheme from "../../../../packages/components/src/DesignSystem/Theme/Theme.web";
import CustomSnackBar from "../../../../packages/components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const themeDropdown = createTheme({
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          borderColor: 'blue', // Specify the desired background color
        },
      },
    },
  },
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250,
      position:'absolute'
    },
  },
};
// Customizable Area End

import ProductDescriptionController, {
  Props,
  configJSON,
} from "./ProductDescriptionController";
import { dummyProduct } from "./assets";

export default class ProductDescription extends ProductDescriptionController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  getFormatOptions = (type) => {
    if(type == "image"){
      return this.setImageOptions()
    }else if(type == "video"){
      return this.setVideoOptions()
    }
  }
  setImageOptions = () => {
    return (
    <div>
        <CustomTypography component="outfitHeading6">Select {this.state.catalogueType} format</CustomTypography>
        {this.state.imageFormats?.map((size) => (
          <div key={size}>
            <FormControlLabel
              style={{
                ...webStyle.clickableLabel,
                ...(this.state.selectedValue === size.id ? webStyle.selectedLabel : webStyle.clickableLabel),
              }}              
              value={size.id}
              control={
                <Radio
                  style={{
                    color: this.state.selectedValue === size.id && customTheme.palette.white.main,
                  }}
                />
              }
              labelPlacement="start"
              label={
                <Typography
                  style={{
                    fontSize: 14,fontFamily: 'LemonMilk',
                    fontWeight: this.state.selectedValue === size.id && "bold",
                    color: this.state.selectedValue !== size.id && "grey",
                  }}
                >
                  {size.attributes.name.toUpperCase()} SIZE
                </Typography>
              }
              testId="radioImgBtn"
              checked={this.state.selectedValue === size.id}
              onChange={(event)=> this.setFormatPrice(event.target.value)}
              />

            {this.state.selectedValue === size.id && (
              <Grid
                container
                style={webStyle.radioDiv}
              >

                <Typography style={{ display: "flex", color: "grey", fontFamily: 'Outfit-Light' }}>
                {(this.state.productData?.attributes?.height + (this.state.productData?.attributes?.height * size.attributes.percentage / 100)).toFixed(2)} X {(this.state.productData?.attributes?.height + (this.state.productData?.attributes?.width * size.attributes.percentage / 100)).toFixed(2)} px
                  <Divider
                    orientation="vertical"
                    style={webStyle.radioDivision}
                  />
                  {(this.state.productData?.attributes?.height_in_inches + (this.state.productData?.attributes?.height_in_inches * size.attributes.percentage / 100)).toFixed(2)} X {(this.state.productData?.attributes?.width_in_inches + (this.state.productData?.attributes?.width_in_inches * size.attributes.percentage / 100)).toFixed(2)} in
                  <Divider
                    orientation="vertical"
                    style={webStyle.radioDivision}
                  />
                  {(this.state.productData?.attributes?.dpi + (this.state.productData?.attributes?.dpi * size.attributes.percentage / 100)).toFixed(2)} DPI
                  <Divider
                    orientation="vertical"
                    style={webStyle.radioDivision}
                  />
                   {this.state.productData?.attributes?.images.type}
                  <Divider
                    orientation="vertical"
                    style={webStyle.radioDivision}
                  />
                  {(this.state.productData?.attributes?.image_size_in_mb + (this.state.productData?.attributes?.image_size_in_mb * size.attributes.percentage / 100)).toFixed(2)} MB
                 </Typography>
              </Grid>
            )}
          </div>
        ))}
      </div>
    )
  }
  setVideoOptions = () => {
    return (
      <div>
      <CustomTypography component="outfitHeading6">Select {this.state.catalogueType} format</CustomTypography>
      <Grid container item xs={12}>
              {(this.state.videoFormats)?.map(item => (
                <Grid item xs={4} key={item.id}>
                  <div testId="videoSelection" style={{ ...webStyle.resDiv, borderColor: this.state.selectedRes === item.id ? "#3A82FF" : "lightgray" }}
                    onClick={() => this.setFormatPrice(item.id) }>
                    <div style={{ ...webStyle.titleDiv, backgroundColor: this.state.selectedRes === item.id ? "#3A82FF" : "lightgray" }}>
                      <Typography style={{ padding: 10,fontFamily: 'LemonMilk', color: this.state.selectedRes === item.id ? "white" : "black" }}>{item.attributes.name}</Typography>
                    </div>
                    <div style={{ textAlign: "center", padding: 15, position: "relative", width: "100%", boxSizing: "border-box" }}>
                    <CustomTypography variant={'primary'} component={'outfitBody2'} textTransform={'none'}>{item.attributes.resname}</CustomTypography>
                    <CustomTypography variant={'secondary'} component={'outfitBody2'} textTransform={'none'}>({item.attributes.dimention})</CustomTypography>
                      {this.state.selectedRes === item.id &&
                        <img style={webStyle.blueTickDiv}
                          src={require("../assets/blueTick.png")}
                          alt="Watermark"
                        />
                      }
                    </div>
                  </div>
                </Grid>
              ))}
      </Grid>
      </div>
    )
  }
  requestForm = () => {
    return (
      <div>
      <Grid container>
          <Grid item>
          <CustomTypography variant={'primary'} component={'outfitHeading6'} textTransform={'none'}>This license needs to be quoted</CustomTypography>
          <CustomTypography variant={'secondary'} component={'outfitHeading6'} textTransform={'none'}>Expected to be delivered within <span style={{color:customTheme.palette.primary.main}}>1 business day.</span></CustomTypography>
          </Grid>
          <Grid item style={webStyle.marginTop10}>
          <InputComponent 
          value={this.state.email}
          onChange={this.handleChange}
          type='text'
          name='email'
          required
          placeholder="Email address"
          testID="txtInputEmail"
          ></InputComponent>
          <InputComponent 
          value={this.state.phone}
          onChange={this.handleChange}
          type='text'
          name='phone'
          required
          placeholder="Phone number"
          testID="txtInputPhone"
          ></InputComponent>
          <InputComponent 
          value={this.state.endClient}
          onChange={this.handleChange}
          type='text'
          name='endClient'
          required
          placeholder="End client"
          testID="txtInputEndClient"          
          ></InputComponent>
          <InputComponent 
          value={this.state.distDetails}
          onChange={this.handleChange}
          type='text'
          name='distDetails'
          required
          placeholder="Distribution details"
          testID="txtInputDist"
          ></InputComponent>
          </Grid>
      </Grid>
              <Button
                variant="contained"
                color="default"
                testId="requestBtn"
                onClick={()=> this.postSendRequest()}
                style={webStyle.requestBtn}
               > SUBMIT REQUEST
               </Button>
          </div>
    )
  }
  downloadImage() {
    // Logic to download the image
    const imageUrl = `data:image/png;base64,${this.state.productData?.attributes?.water_mark_image}`;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  ImagePreviewDialog = () => {
    return (
      <Dialog open={this.state.openPreview} fullWidth data-test-id="handlePreviewClose">
         <DialogActions testId="closePreview" onClick={()=> this.setState({openPreview:false})} >
             <CloseIcon  cursor='pointer'/>
         </DialogActions>
         <DialogContent style={webStyle.flexDisplay} >
            <img src={`data:image/png;base64,${this.state.productData?.attributes?.water_mark_image}`} style={webStyle.objectFit} alt="Full-Screen Image" />
         </DialogContent>
      </Dialog>
    );
  }
  getBookmarkIcon = (flag) => {
    if(flag == "0"){
      return ( <BookmarkBorderOutlinedIcon cursor='pointer' onClick={()=>this.postBookmarkAPI()} style={webStyle.whiteColor}/> )
    }else{
      return ( <BookmarkOutlinedIcon cursor='pointer' onClick={()=>this.postBookmarkAPI()} style={webStyle.whiteColor}/> )
    }
  }
  showCommentFunction=()=>{
    return(
      <div style={webStyle.mainDiv}>
      <Grid container>
            <Grid item xs={12}>
            <CustomTypography variant={'primary'} component={'body3'}>{this.state.commentsData && this.state.commentsData.length} COMMENTS</CustomTypography>
            <Divider style={webStyle.dividerStyle}></Divider>
            <div style={this.state.showCommentBlock ? webStyle.CommentDisplay :webStyle.CommentWrapper} data-test-id="commentblockbtn" onClick={this.handleCommentBlock}>
            <Avatar style={webStyle.avatarStyle} alt="Remy Sharp" src={""} />
            {this.state.showCommentBlock ? <div style={webStyle.CommentBlock}>
              <TextareaAutosize style={webStyle.TextAreaBlock} data-test-id="commentInput" aria-label="minimum height" minRows={10} placeholder="Add your comment..."  onChange={this.handleCommentChange} value={this.state.CommentInput}/>
               <div style={webStyle.commentBtn}><CustomButton data-test-id = "comment_btn" onClick={this.handleAddComment} variant="CommentButton" size={"largeBtn"}>ADD COMMENT</CustomButton></div>
            </div> :  <CustomTypography variant={'secondary'} component={'outfitBody2'} textTransform={'none'}>Add your comment</CustomTypography>}
            </div>

            {this.state.commentsData && this.state.commentsData?.map((comment, index) => (
                <div key={index} style={webStyle.commentMainDiv}>
                  <div style={{ display: "flex", flex: 0.25 }}>
                    <Avatar style={webStyle.avatarStyle} alt={comment.attributes.account_name} src={comment.attributes.account_image} />
                  </div>
                  <div style={webStyle.commentSecondDiv}>
                  <CustomTypography variant={'primary'} component={'body11bold'}>{comment.attributes.account_name}
                      <span style={{ fontSize: 13, color: "gray" }}> . {this.timeElapsedAgo(comment.attributes.created_at)}</span></CustomTypography>
                    <CustomTypography variant={'secondary'} component={'body15'}>{comment.attributes.comment}</CustomTypography>
                    <span onClick={()=>this.handleReplyBlock(comment.id)} style={webStyle.CursorCSS} data-test-id={`ReplyClick_${index}`}>
                    <CustomTypography variant={'blue'} component={'body14'}>REPLY</CustomTypography>
                    </span>
                    { this.state.commentId === comment.id  &&  <div style={webStyle.replyBlock}>
                      <TextareaAutosize style={webStyle.TextAreaBlock} aria-label="minimum height" data-test-id="ReplyInput"  minRows={5} placeholder={`${comment.attributes.account_name}...`} onChange={this.handleReplyChange} value={this.state.ReplyText}/>
                      <div style={webStyle.commentBtn}><CustomButton onClick={this.handleAddReply} data-test-id="ReplyBtn" variant="ReplyButton" size="largeBtn">REPLY</CustomButton></div>
                      </div> 
                      }
                      {
                        comment.attributes.reply && comment.attributes.reply.length && comment?.attributes?.reply.map((reply)=>{
                          return(
                            <div key={index} style={webStyle.commentMainDiv}>
                            <div style={{ display: "flex", flex: 0.25 }}>
                              <Avatar style={webStyle.avatarStyle} alt={comment.attributes.account_name} src={reply.image} />
                            </div>
                            <div style={webStyle.commentSecondDiv}>
                            <CustomTypography variant={'primary'} component={'body11bold'}>{reply.name}
                                <span style={{ fontSize: 13, color: "gray" }}> . {this.timeElapsedAgo(reply.created_at)}</span></CustomTypography>
                              <CustomTypography variant={'secondary'} component={'body15'}>{reply.content}</CustomTypography>  
                            </div>
                          </div>
                          )
                        })
                      }
                  </div>
                </div>
             ))}
             
             <div style={webStyle.viewallBtn} onClick={this.handleViewComment}>
            <CustomTypography variant={'primary'} component={'body3'} >VIEW ALL COMMENTS</CustomTypography>
            </div>
            </Grid>
      </Grid>
      </div>
    )
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
      <Header navigation={this.props.navigation} testID={""} classNameProps={undefined} />
      <Container maxWidth={"xl"} style={webStyle.mainContainer}>
      <div style={{...webStyle.mainDiv,...webStyle.marginTop25}}>
      {this.ImagePreviewDialog()}
      <Grid container style={webStyle.gridContainer}>
          <Grid item xs={12} sm={6} style={webStyle.imageGrid}>
            {this.state.catalogueType == 'video'?
              <div style={{ display:'flex',position: 'relative',justifyContent:'center',alignItems:'center' }}>   
               <video style={webStyle.mediaDimensionVideo} controls>
               <source src={this.state.productData?.attributes?.images.url} type={this.state.productData?.attributes?.images.type} />
                 Your browser does not support the video tag.
               </video> 
               <div style={{...webStyle.absoluteTopDiv,marginLeft:"85%"}}>
                {this.getBookmarkIcon(this.state.productData?.attributes?.bookmark)}
               </div>
               </div>
            :
              <div style={{ position: 'relative', display:'flex',justifyContent:'center',alignItems:'center' }}>   
               <img style={webStyle.mediaDimension} src={`data:image/png;base64,${this.state.productData?.attributes?.water_mark_image}`} alt={this.state.productData?.attributes?.title}></img>
               <div style={webStyle.absoluteTopDiv}>
               <CropFreeSharpIcon testId="openPreview" onClick={()=> this.setState({openPreview:true})} cursor='pointer' style={webStyle.whiteColor}/>
               </div>
               <Box style={webStyle.absoluteBottomDiv}>
               <Box style={{...webStyle.absoluteBottomImage,marginRight:10}}>
                {this.state.productData?.attributes?.bookmark == "0" ?
               <BookmarkBorderOutlinedIcon cursor='pointer' onClick={()=>this.postBookmarkAPI()} style={webStyle.whiteColor}/>
                :
                <BookmarkOutlinedIcon cursor='pointer' testId="bookmarkBtn" onClick={()=>this.postBookmarkAPI()} style={webStyle.whiteColor}/>
                }
               </Box>
               <Box style={{...webStyle.absoluteBottomImage}}>
               <GetAppIcon cursor='pointer' testId="downloadBtn" onClick={()=>this.downloadImage()} style={webStyle.whiteColor}/>
               </Box>
               </Box>
              </div> 
            }
            
          </Grid>
          <Grid item xs={12} sm={6} style={webStyle.cartGrid}>
            <CustomTypography component={'body2'}>PURCHASE LICENSE</CustomTypography>
            <Divider style={webStyle.dividerStyle}></Divider>
            <CustomTypography component="outfitHeading6">Select your license type to get personalised pricing.</CustomTypography>
            <ThemeProvider theme={themeDropdown}>
            <FormControl variant="outlined" style={webStyle.sizeDropdownStyle}>
              <InputLabel>How are you distributing this?</InputLabel>
              <Select
                id="demo-simple-select-outlined"
                label="How are you distributing this?"
                multiple
                testId="sizeDropdown"
                onChange={(event) => {this.checkIsCommercial(event.target.value) }}
                renderValue={(selected) => selected.join(", ")}
                value={this.state.electronicData}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                  ...MenuProps,
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select all that apply</em>
                </MenuItem>
                {this.state.licenseTypes?.map((license) => (
                    <MenuItem key={license.id} value={license.attributes.name}>
                      <Checkbox
                        checked={this.state.electronicData.indexOf(license.attributes.name) > -1}
                      />
                      <ListItemText primary={license.attributes.name} />
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            </ThemeProvider>
            <ThemeProvider theme={themeDropdown}>
            <FormControl variant="outlined" style={{ width: "100%", marginTop: 20 ,marginBottom: 20}}>
              <InputLabel>How large is your end client?</InputLabel>
              <Select
                id="demo-simple-select-outlined"
                label="How are you distributing this?"
                testId="clientDropdown"
                disabled={!this.state.licensePrice}
                onChange={(event) => this.setSizePriceAndId(event.target.value)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                  ...MenuProps,
                }}
              >
                <MenuItem value="" disabled>
                  <em>How large is your end client?</em>
                </MenuItem>
                {this.state.clientSizes?.map((size) => (
                    <MenuItem key={size.id} name={size.id} value={size.id}>
                      <ListItemText primary={size.attributes.name}/>
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            </ThemeProvider>

            <div>
            <FormControl style={{ width: "100%" }}>
            {!this.state.isRqeustForm && this.getFormatOptions(this.state.catalogueType)}
            {this.state.isRqeustForm && this.requestForm()}
            </FormControl>
            </div>

            {!this.state.isRqeustForm &&
            <div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center",marginTop:20,marginBottom:20}}>
            <CustomTypography component="outfitHeading6">Total price</CustomTypography>
            <CustomTypography variant={'primary'} component="outfitHeading7">{this.state.totalPrice} AED</CustomTypography>
            </div>
            <CustomButton 
            onClick={() => {this.postAddToCart()}}
            variant='primary'
            fullWidth='fullWidth'
            size={'large'}
            testId='btnAddCart'
          >
          <img style={{ width:20, marginRight:10 }} src={basket} alt="basket"/>  
          <CustomTypography variant={'white'} component="body2">ADD TO BASKET</CustomTypography>
          </CustomButton>
          </div>
            }
          </Grid>
      </Grid>

      <Grid container style={webStyle.directionColumn}>
        <CustomTypography component={'outfitBody2'}>{this.state.productData?.attributes?.title}</CustomTypography>
            <Grid xs={12} sm={7} item style={webStyle.userGridStyle}>
              <div style={{display:"flex"}}>
              <Avatar style={{marginRight:10}} alt={this.state.productData?.attributes?.account} src={this.state.productData?.attributes?.account_image} />
              <div>
              <CustomTypography component={'body3'}>{this.state.productData?.attributes?.account}</CustomTypography>
              <CustomTypography 
              variant={'secondary'}
              component={'outfitHeading6H20'} 
              textTransform={'none'}>
              {this.state.productData?.attributes?.follower_count} Followers
              </CustomTypography>
              </div>
              <Button
                variant="contained"
                testId="followBtn"
                disabled={this.state.calledAPI}
                onClick={()=>this.postFollowAPI()}
                style={{...webStyle.actionBtn,marginLeft:25}}
                startIcon={<img style={{width:20}} src={require("../assets/follow.png")}  alt={"item.title"} />}
               >
              <CustomTypography 
              variant={'secondary'}
              component={'body3'} 
              textTransform={'none'}>
               {this.getFollowWord(this.state.productData?.attributes?.follow)}
              </CustomTypography>
               </Button>
              </div>
              <div>
              <Button
                variant="contained"
                testId="likeBtn"
                onClick={()=>this.postLikeAPI()}
                style={webStyle.actionBtn}
                startIcon={this.getLikeIcon(this.state.productData?.attributes?.favourties)}
               > 
              <CustomTypography 
              variant={'secondary'}
              component={'body3'} 
              textTransform={'none'}>
               {this.getLikeWord(this.state.productData?.attributes?.favourties)}
              </CustomTypography>
               </Button>
               <Button
                variant="contained"
                style={webStyle.actionBtn}
                testId="shareBtn"
                onClick={this.handleCopyUrl}
                startIcon={<ShareIcon />}
               > 
               <CustomTypography 
              variant={'secondary'}
              component={'body3'} 
              textTransform={'none'}>
               SHARE
              </CustomTypography>
               </Button>
              </div>
            </Grid>
            <Grid container style={{margin:"20px 0px"}}>
            <div style={webStyle.specsDiv}>
              <CustomTypography variant={'secondary'} component={'outfitBody2'}>{this.state.catalogueType == 'image' ? this.state.productData?.attributes?.aspect_ratio : (this.state.productData?.attributes?.duration)}</CustomTypography>
              </div>
              <div style={webStyle.specsDiv}>
              <CustomTypography variant={'secondary'} component={'outfitBody2'}>{this.state.catalogueType == 'image' ? `${this.state.productData?.attributes?.height} X ${this.state.productData?.attributes?.width}` : this.state.productData?.attributes?.aspect_ratio}</CustomTypography>
              </div>
              <div style={webStyle.specsDiv}>
              <CustomTypography variant={'secondary'} component={'outfitBody2'}>Stock image id: {this.state.productData?.id}</CustomTypography>
              </div>
            </Grid>
            </Grid>
            <Grid container style={webStyle.directionColumn}>
              <Grid item>
            <FlatList
              testId="keywordList"
              contentContainerStyle={webStyle.keywordFlatListStyle}
              data={this.state.productData?.attributes?.keyword_array}
              renderItem={({item,index})=>(
              <div style={webStyle.hashTags}>
              <CustomTypography variant='secondary' component='outfitBody2'>#{item}</CustomTypography>
              </div>
              )}
            />
            </Grid>
            <Grid item style={{flexGrow:0, ...webStyle.marginTop20}}>
            <CustomTypography variant={'secondary'} component={'body11bold'} textTransform={'none'}>Uploaded on {this.getUploadDate(this.state.productData?.attributes?.updated_at)}.</CustomTypography>
            </Grid>
        </Grid>
        </div>
       {this.showCommentFunction()}
        <div style={webStyle.mainDiv}>
        <Grid container>
              <Grid item xs={12}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20}}>
              <div style={{display:"flex", marginTop:20, alignItems:"center"}}>
              <Avatar style={{marginRight:15, height:30, width:30}} alt={this.state.productData?.attributes?.account} src={this.state.productData?.attributes?.account_image}/>
              <CustomTypography variant={'primary'} component={'body3'}>{this.state.productData?.attributes?.account}</CustomTypography>
              </div>
              <div>
              <CustomTypography variant={'primary'} component={'body3'} textTransform={'decoration'}>VIEW ALL</CustomTypography>
              </div>
              </div>
              <Divider></Divider>
              <ImageList rowHeight={170} style={webStyle.marginTop20} cols={4}>
                  {(this.state.userscatalogueImages)?.map((catImage) => (
                    <ImageListItem style={webStyle.marginBtm10} cols={1}>
                      {catImage.attributes.images.type.includes('video')?
                        <video style={webStyle.mediaDimensionVideo} controls>
                        <source src={catImage.attributes.images.url} type={catImage.attributes.images.type} alt={catImage.attributes.title}/>
                          Your browser does not support the video tag.
                        </video> 
                      :
                        <img style={{width:"98%"}} src={catImage.attributes.images.url}  alt={catImage.attributes.title} />
                      }
                    </ImageListItem>
                  ))}
              </ImageList>
              </Grid>
        </Grid>
        </div>
        <div style={{...webStyle.mainDiv,...webStyle.marginBtm20}}>
        <Grid container>
              <Grid item xs={12}>
              <CustomTypography variant={'primary'} component={'body3'} textTransform={'none'}>SIMILAR IMAGES</CustomTypography>
              <Divider style={webStyle.dividerStyle}></Divider>
              <ImageList rowHeight={170} cols={4}>
                  {this.state.similarImages?.map((image) => (
                    <ImageListItem style={webStyle.marginBtm10} cols={1}>
                      {image.type.includes('video')?
                        <video style={webStyle.mediaDimensionVideo} controls>
                        <source src={image.url} type={image.type} alt={image.catalogue_id}/>
                          Your browser does not support the video tag.
                        </video> 
                      :
                      <img style={{width:"98%"}} src={image.url}  alt={image.catalogue_id} />
                      }
                    </ImageListItem>
                  ))}
              </ImageList>
              </Grid>
        </Grid>
        </div>
        <ModalComponent
            open={this.state.cartModalFlag}
            maxWidth={600}
            maxHeight={460}
            >
              <CustomTypography variant={'primary'} component={'body3'} textTransform={'none'}>ADDED TO CART</CustomTypography>
              <Divider style={webStyle.dividerStyle}></Divider>
              <div style={webStyle.cartModalDiv}>

                <div style={{display:"flex", flex:1}}>
                {this.state.catalogueType == 'video'?
                    <video style={webStyle.mediaDimensionCart} controls>
                    <source src={this.state.productData?.attributes?.images.url} type={this.state.productData?.attributes?.images.type} />
                      Your browser does not support the video tag.
                    </video> 
                :
                    <img style={webStyle.mediaDimensionCart} src={this.state.productData?.attributes?.images.url}  alt={"Product image"} />
                }
                </div>

                <div style={webStyle.cartDivStyle}>
                <div style={{display:"flex", flexDirection:"row" }}>
                <div style={{display:"flex", flex:1.3 }}>
                <CustomTypography variant={'primary'} component={'outfitHeading6'}>{this.state.productData?.attributes?.title}</CustomTypography>
                </div>
                <div style={webStyle.currencyDiv}>
                <CustomTypography variant={'primary'} component={'outfitHeading7'}>{this.state.totalPrice} AED</CustomTypography>
                </div>
                </div>
                <div style={{display:"flex"}}>
                <div style={webStyle.specsDiv}>
                <CustomTypography variant={'secondary'} component={'outfitBody2'}>{this.state.productData?.attributes?.aspect_ratio}</CustomTypography>
              </div>
              <div style={webStyle.specsDiv}>
              <CustomTypography variant={'secondary'} component={'outfitBody2'}>{this.state.catalogueType == 'image' ? `${this.state.productData?.attributes?.height} X ${this.state.productData?.attributes?.width}` : this.state.productData?.attributes?.duration}</CustomTypography>
              </div>
              <div style={webStyle.specsDiv}>
              <CustomTypography variant={'secondary'} component={'outfitBody2'}>Digital</CustomTypography>
              </div>
              </div>
                </div>
              </div>
              <Divider></Divider>
              <div style={webStyle.btnNavigation}>
              <div style={{width:"100%"}}>
                        <CustomButton
                          variant="secondary"
                          fullWidth="fullWidth"
                          size="medium"
                          testId="goToHomePage"
                          onClick={()=>this.gotoHomePage()}
                        >
                        <CustomTypography variant={'primary'} component={'body3'}>CONTINUE SHOPPING</CustomTypography>
                        </CustomButton>
                        </div>
                        <div style={{width:"100%"}}>
                        <CustomButton variant="primary" fullWidth="fullWidth" size="medium" 
                        onClick={() => { this.gotoCartPage() }} 
                        testId="cartbtn">
                        <CustomTypography variant={'white'} component={'body3'}>GO TO CART</CustomTypography>
                        </CustomButton>
                        </div>
                        </div>
                        </ModalComponent>
                       
                        </Container>
                        <CustomSnackBar
                             open={this.state.showAlert}
                             onClose={this.handleAlertClose}
                             title={this.state.alertTitle}
                             horizontal="center"
                             vertical="bottom"
                             variant={this.state.alertType}
                         />          
      <Footer 
          userType={'normal'}
          navigation={this.props.navigation}
          toNavigateGeneric={this.toNavigateGeneric}
          data-test-id="toNavigateGeneric"
      />
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
 mainContainer: {
  padding: 0,
  backgroundColor: customTheme.palette.grey.secondary
 },
 mainDiv:{
  padding:50,
  margin: "0px 25px",
  marginBottom: 15,
  backgroundColor: customTheme.palette.white.main
 },
 gridContainer:{
  boxSizing: "border-box"
 },
 imageGrid:{
  padding:40
 },
 cartGrid:{
  padding:40
 },
 marginTop10:{ marginTop: 10},
 marginTop20:{ marginTop: 20},
 marginTop50:{ marginTop: 50},
 marginBtm10:{ marginBottom: 10},
 marginBtm20:{ marginBottom: 20},
 marginTop25:{ marginTop: 25},
 cartModalDiv: {display:"flex", flex:3, marginBottom:30},
 cartDivStyle: {display:"flex", flex:2, flexDirection:"column", justifyContent:"space-between" },
 currencyDiv: {display:"flex", flex:0.7, justifyContent:"center" },
 btnNavigation: {display:"flex", gap:10, marginTop:20},
 userGridStyle: {display:"flex", justifyContent:"space-between",marginTop:20, width:"53%"},
 keywordFlatListStyle: {flexDirection:"row", flexWrap:"wrap"},
 avatarStyle: {marginRight:15, height:30, width:30},
 commentMainDiv: { display: "flex", flex: 12, marginTop: 20 },
 commentSecondDiv: { display: "flex", flex: 11.75, flexDirection: "column" },
 directionColumn: {flexDirection:"column"},
 sizeDropdownStyle: { width: "100%", marginTop: 20 },
 actionBtn: {
  borderRadius: 0,
  color: "#73767A",
  boxShadow: "none",
  marginRight:10,
  height:35,
  backgroundColor:customTheme.palette.grey.secondary
},
specsDiv:{
  backgroundColor:customTheme.palette.grey.secondary, 
  padding:"4px 16px",
  marginRight: 10,
  marginBottom: 10,
  marginTop: 10
},
hashTags:{
  backgroundColor:customTheme.palette.grey.secondary, 
  padding:"6px 16px",
  marginRight: 10,
  marginBottom: 10
},
absoluteTopDiv:{
  position:"absolute",
  width:"10%",
  padding: 10,
  backgroundColor: 'rgba(0, 0, 0, .2)',
  top: "2%",
  height: "auto",
  boxSizing: "border-box", 
  justifyContent: "center",
  display: "flex",
  marginLeft: "65%"
},
absoluteBottomDiv:{
  position:"absolute",
  bottom: "2%",
  paddingLeft: "59%",
  display:"flex",
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
absoluteBottomImage:{
  padding: 10,
  backgroundColor: 'rgba(0, 0, 0, .2)',
  height: "auto",
  boxSizing: "border-box", 
  justifyContent: "center",
  display: "flex"
},
clickableLabel: {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "6px 12px",
  border: "1px solid lightgray",
  borderColor: "lightgray",
  margin: 0,
  marginTop: 10,
  justifyContent: "space-between"
},
dividerStyle:{
  marginBottom: 20,
  marginTop: 15
},
selectedLabel: {
  backgroundColor: "#3A82FF",
  color: "#fff",
  borderColor: "#3A82FF"
},
resDiv: {
  border: "2px solid", borderColor: "lightgray", alignItems: "center", display: "flex", flexDirection: "column", width: "90%", marginBottom:10
},
titleDiv: { backgroundColor: "#E7EBEB", width: "100%", textAlign: "center" },
requestBtn:{
  borderRadius: '0px',
  width: '100%',
  marginTop: '20px',
  boxShadow: 'none',
  backgroundColor: '#3A82FF',
  color: 'white'
},
radioDiv:{
  border: `2px solid ${ "#3A82FF" }`,
  borderTop: "0px",
  padding: 10,
  marginBottom: 10,
},
CommentDisplay:{
  display:"flex",
  cursor:"pointer"
},
CommentWrapper:{
  display:"flex",
  alignItems:"center",
  cursor:"pointer"
},
CommentBlock:{
width:"100%"
},
replyBlock:{
marginTop:"10px"
},
TextAreaBlock:{
width:"95%",
border:`1px solid ${customTheme.palette.white.dark}`,
padding:"15px",
fontSize:"14px",
color:`${customTheme.palette.white.grey}`,
fontWeight:400,
fontFamily:"Outfit"
},
commentBtn:{
  width:"95%",
  display:"flex",
  justifyContent:"flex-end",
  marginTop:"10px"
},
CursorCSS:{
  cursor:"pointer"
  } ,
  viewallBtn:{
    marginTop:"50px",
    cursor:"pointer"
  },
radioDivision:{ margin: "0 10px", backgroundColor: "grey" },
blueTickDiv: { position: "absolute", bottom: 0, right: 0, width: 40 },
mediaDimension: { width: '90%',height:'70%' },
mediaDimensionVideo: { width: '98%',height:'100%' },
mediaDimensionCart: {width:"90%", height:120},
whiteColor: {color:customTheme.palette.white.main},
flexDisplay: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
objectFit: { objectFit: 'contain', width: "100%" }
};
// Customizable Area End
