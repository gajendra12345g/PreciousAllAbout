import React from "react";
// Customizable Area Start
import {
  Box, Grid,
} from "@material-ui/core";
import { createTheme, ThemeProvider,styled } from "@material-ui/core/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});
export const configJSON = require("./config");
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
import CloseIcon from '@material-ui/icons/Close';
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import customTheme from "../../../components/src/DesignSystem/Theme/Theme.web";
import Header from "../../../components/src/DesignSystem/Header/Header.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import CustomDropDown from "../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
import {deleteIcon, emptyCartIcon } from "./assets";
import CustomeStepper from "../../../components/src/DesignSystem/CustomStepper/CustomStepper.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import OfferTag from '@material-ui/icons/LocalOfferOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
// Customizable Area End

import ShoppingCartOrdersController, {
  Props,
} from "./ShoppingCartOrdersController";

export default class ShoppingCartOrders extends ShoppingCartOrdersController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Header navigation={this.props.navigation} testID={""} classNameProps={undefined} />
        {
          !this.state.orderData ?
            <Box
              style={webStyles.emptyCartWrap}
            >
              <Box
                style={webStyles.emptyCart}
              >
                <img src={emptyCartIcon} style={webStyles.emptyCartImg}/>
                <Box mt={3}>
                  <CustomTypography
                    variant={'primary'}
                    component={'h3'}
                  >
                    Your cart is empty
                  </CustomTypography>
                </Box>
                <Box mt={1}>
                  <CustomTypography
                    variant={'secondary'}
                    component={'subTitle'}
                  >
                    click here to explore the amzing content.
                  </CustomTypography>
                </Box>
                <Box mt={3}>
                  <CustomButton
                    variant={'primary'}
                    size={'large'}
                    onClick={() => this.goToAdvancedSearchPage()}
                    data-test-id={'explore_btn'}
                  >
                    Explore More
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          :
          <div style={webStyles.cartWrap}>
            <div
              style={webStyles.cardWrap}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                  <CustomCard variant='card'>
                    <div style={webStyles.innerCardWrap}>
                      <div style={webStyles.cardHeader}>
                        <CustomTypography
                          variant={'primary'}
                          component={'body6'}
                          textTransform={'uppercase'}
                        >
                          Cart
                        </CustomTypography>
                        <CustomTypography
                          variant={'secondary'}
                          component={'body6'}
                          textTransform={'uppercase'}
                        >
                          Empty Cart
                        </CustomTypography>
                      </div>
                      <div style={webStyles.itemCounter}>
                        <CustomTypography
                          variant={'secondary'}
                          component={'body11500'}
                          textTransform={'lowercase'}
                        >
                          {this.state.orderData.attributes?.order_items.data.length} items in your cart
                        </CustomTypography>
                      </div>
                      <div style={webStyles.itemsWrap}>
                        {
                          this.state.orderData.attributes?.order_items?.data.map((item: any, index: any) => {
                            return (
                                <div key={item.attributes.catalogue.data.id} style={webStyles.itemWrap}>
                                  <div style={webStyles.imgWrap}>
                                    {
                                      item.attributes.catalogue.data.attributes.images.type.split("/")[0] == 'image' ?
                                      <img data-test-id={`item-image${index}`} src={item.attributes.catalogue.data.attributes.images.url} style={webStyles.imgStyle} />
                                      : <video data-test-id={`item-video`} controls={false} style={webStyles.imgStyle}>
                                        <source src={item.attributes.catalogue.data.attributes.images.url} type={item.attributes.catalogue.data.attributes.images.type} />
                                      </video>
                                    }
                                  </div>
                                  <div style={webStyles.itemDetailsWrap}>
                                    <div>
                                      <CustomTypography
                                        variant={'primary'}
                                        component={'body12400'}
                                        textTransform={'capitalize'}
                                      >
                                        Stock image id: {item.attributes.catalogue.data.id}
                                      </CustomTypography>
                                      <CustomButton
                                        variant={'primary'}
                                        size="small"
                                        disabled={true}
                                      >
                                        {item.attributes.dimention}
                                      </CustomButton>
                                    </div>
                                    <DropDownWrapper>
                                      <div style={webStyles.DropDownSection}>
                                        <div style={webStyles.dropDownWidth}>
                                          {
                                            item.attributes.catalogue.data.attributes.images.type.split("/")[0] == 'image' ?
                                            <CustomDropDown variant="dropdownBtnSecondary" 
                                              options={this.state.imageFormats} 
                                              selectNewItem={(value: any) => this.handleImageFormats(value, item.id, item.attributes.format.id)} 
                                              selectedItem={this.state.selectedImageFormat[item.attributes?.format?.id] || {
                                                label: item.attributes?.format?.name,
                                                value: item.attributes?.format?.id
                                              }} 
                                              data-test-id={`OriginalSizeDropDown${index}`}
                                            /> 
                                            :
                                            <CustomDropDown variant="dropdownBtnSecondary" 
                                              options={this.state.videoFormats} 
                                              selectNewItem={(value: any) => this.handleVideoFormats(value, item.id, item.attributes.format.id)} 
                                              selectedItem={this.state.selectedVideoFormat[item.attributes?.format?.id] || {
                                                label: item.attributes?.format?.name,
                                                value: item.attributes?.format?.id
                                              }} 
                                              data-test-id={`OriginalSizeDropDown${index}`}
                                            /> 
                                          } 
                                        </div>
                                        <div style={webStyles.dropDownWidth}>
                                          <CustomDropDown 
                                            data-test-id={'dropDown2Licence'} 
                                            selectNewItem={(value: any) => this.handleLicenseChange(value,index)}  
                                            variant="dropdownBtnSecondary" 
                                            options={this.state.contentLicense[index]} 
                                            checkbox 
                                            selectedItem={this.state.selectedNames[index] || {
                                              label: 'Format', 
                                              value: 'Format'
                                            }} 
                                            saveSelected={() => this.updateLicense(item.id,index)}
                                          />  
                                        </div>
                                      </div>
                                    </DropDownWrapper>
                                  </div>
                                  <div style={webStyles.actionWrap}>
                                    <CustomTypography
                                      variant={'primary'}
                                      component={'body5'}
                                      textTransform={'uppercase'}
                                    >
                                      {item.attributes.price} AED
                                    </CustomTypography>
                                    <CustomButton
                                      variant={'secondaryWithoutBorderGrey'}
                                      size="small"
                                      data-test-id={`deleteCartItembtn`}
                                      onlyIcon={<img  src={deleteIcon} />}
                                      onClick={()=>this.handleDeleteCartItem(item)}
                                    >
                                    </CustomButton>
                                  </div>
                                </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </CustomCard>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                  <CustomCard>
                    <div style={webStyles.innerCardWrap2}>
                      <div style={webStyles.checkoutHead}>
                        <CustomTypography
                          variant={'primary'}
                          component={'body7'}
                          textTransform={'uppercase'}
                        >
                          Checkout
                        </CustomTypography>
                      </div>
                      <Box mt={2}>
                        <CustomStepperWrapper>
                          <CustomeStepper 
                            activeStep={0}
                          />
                        </CustomStepperWrapper>
                        
                      </Box>
                      <Box mt={2}>
                        <div style={webStyles.cardHeaderPrice}>
                          <CustomTypography
                            variant={'primary'}
                            component={'body11500'}
                            textTransform={'none'}
                          >
                            Your Total price
                          </CustomTypography>
                          <CustomTypography
                            variant={'primary'}
                            component={'body5'}
                            textTransform={'uppercase'}
                          >
                            {this.state.finalPrice} AED
                          </CustomTypography>
                        </div>
                      </Box>
                      <Box mt={5}>
                        <div>
                          <CustomTypography
                            variant={'primary'}
                            component={'body6'}
                            textTransform={'uppercase'}
                          >
                            Billing Address
                          </CustomTypography>
                        </div>
                      </Box>
                      <Box mt={2} style={webStyles.itemsWrap}>
                        <div style={webStyles.formWrap}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <CustomTypography
                                variant={'primary'}
                                component={'label'}
                              >
                                Country/Region <sup style={{color: 'red'}}>*</sup>
                              </CustomTypography>
                              <CountryDropDownWrapper style={webStyles.CountryWrapper}>
                                <CustomDropDown 
                                  variant="dropdownBtnSecondary" 
                                  options={this.state.countryList} 
                                  selectNewItem={this.handleCountrySelection} 
                                  selectedItem={this.state.CountryValue} 
                                  data-test-id="countryDropDown"
                                />  
                              </CountryDropDownWrapper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Input 
                                placeholder="First Name"
                                type='text'
                                required
                                name="firstName"
                                value={this.state.firstName}
                                label={'First Name'}
                                data-test-id="first-name"
                                onChange={this.handleChange}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Input 
                                placeholder="Last Name"
                                type='text'
                                required
                                name="lastName"
                                value={this.state.lastName}
                                label={'Last Name'}
                                data-test-id="last-name"
                                onChange={this.handleChange}
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} md={12} lg={12}>
                              <Input 
                                placeholder="Apartment/Floor/Building"
                                type='text'
                                required
                                name="address1"
                                value={this.state.address1}
                                label={'Address 1'}
                                data-test-id="handleFormChange"
                                onChange={this.handleChange}
                                isRequired={true}
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} md={12} lg={12}>
                              <Input 
                                placeholder="Area/Local"
                                type='text'
                                required
                                name="address2"
                                value={this.state.address2}
                                label={'Address 2'}
                                data-test-id="handleFormChange"
                                onChange={this.handleChange}
                                isRequired={true}
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} md={12} lg={12}>
                              <Input 
                                placeholder="City"
                                type='text'
                                required
                                name="city"
                                value={this.state.city}
                                label={'City'}
                                data-test-id="handleFormChange"
                                onChange={this.handleChange}
                                isRequired={false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Input 
                                placeholder="State"
                                type='text'
                                required
                                name="state"
                                value={this.state.state}
                                label={'STATE'}
                                data-test-id="handleFormChange"
                                onChange={this.handleChange}
                                isRequired={false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Input 
                                placeholder="123456"
                                type='text'
                                required
                                name="zipCode"
                                value={this.state.zipCode}
                                label={'ZIPCODE'}
                                data-test-id="handleFormChange"
                                onChange={this.handleChange}
                                isRequired={false}
                              />
                            </Grid>
                              <div style={{...webStyles.displayFlex,marginLeft:8}}>
                                <CustomTypography
                                  variant={'primary'}
                                  component={'body6'}
                                  textTransform={'uppercase'}
                                >
                                  ADD PROMO CODE
                                </CustomTypography>
                              </div>

                            <Grid container style={{marginLeft:8}}>
                            {!this.state.couponIsValid?
                            <>
                            <Grid item xs={12} sm={8} md={8} lg={8} style={{width:"95%"}}>
                              <Input 
                                placeholder="Enter the code"
                                type='text'
                                name="coupon_code"
                                value={this.state.coupon_code}
                                data-test-id="handleFormChange"
                                onChange={this.handleChange}
                                isRequired={false}
                                labelComp={'para'}
                                error={this.state.couponError}
                                helperText={this.state.couponError}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                              <div style={webStyles.addTagStyle}>
                                <CustomButton
                                  variant={'blueWhiteText'}
                                  fullWidth={'fullWidth'}
                                  size={'large'}
                                  onClick={this.handleAddPromoCode}
                                  data-test-id="couponAddBtn"
                                >
                                  ADD
                                </CustomButton>
                              </div>
                            </Grid>
                            </>
                            :
                            <>
                            <Grid item xs={12} sm={8} md={8} lg={8} style={{width:"95%"}}>
                             <div style={{...webStyles.displayFlex,padding:12,border:"1px solid lightgray",marginTop:8}}>
                             <CheckIcon style={webStyles.iconColor}></CheckIcon>
                             <CustomTypography variant={'primary'} component={'body11bold'}>
                                {this.state.appliedCoupon} 
                             </CustomTypography>
                              <CustomTypography variant={'secondary'} component={'body11bold'}>
                                &nbsp;applied
                              </CustomTypography>
                             </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                              <div style={webStyles.addTagStyle}>
                                <CustomButton
                                  variant={'whiteBgRedText'}
                                  fullWidth={'fullWidth'}
                                  size={'large'}
                                  onClick={()=>this.setState({couponIsValid:false,finalPrice:this.state.orderData.attributes?.total_price})}
                                  data-test-id="couponAddBtn"
                                >
                                  REMOVE
                                </CustomButton>
                              </div>
                            </Grid>
                            </>
                            }
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                            {!this.state.couponIsValid && this.state.CouponData.map((i:any,index:any)=>
                              <Box style={{...webStyles.displayFlex,...webStyles.coupanBox}}>
                                <div style={{...webStyles.displayFlex, ...webStyles.tagDiv}}>
                                <OfferTag style={webStyles.iconColor}></OfferTag>
                                <CustomTypography variant={'primary'} component={'body11bold'}>
                                   {i.attributes.code}
                                </CustomTypography>
                                </div>
                                <div style={webStyles.applyDiv} onClick={()=>this.PostValidCoupon(i.attributes.code)}>
                                <CustomTypography variant={'success'} component={'body11500'}>
                                   APPLY
                                </CustomTypography>
                                </div>
                              </Box>
                            )}
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <Box>
                                <CustomButton
                                  variant={'primary'}
                                  fullWidth={'fullWidth'}
                                  size={'large'}
                                >
                                  PROCEED TO PAYMENT
                                </CustomButton>
                              </Box>
                            </Grid>
                          </Grid>
                        </div>
                      </Box>
                    </div>
                  </CustomCard>
                </Grid>
              </Grid>
            </div>
          </div>

        }
        <ModalComponent open={this.state.showDeleteModal} maxWidth={600} maxHeight={324}>
                <DeleteCartItemParent>
                  <CustomTypograpyCartParent>
                    <CustomTypography
                      variant={"primary"}
                      component={"body"}
                      textTransform={"uppercase"}
                    >
                      {configJSON.DeleteTitle}
                    </CustomTypography>
                  </CustomTypograpyCartParent>
                  <Divider variant="whiteDark"></Divider>
                  <ParentDiv>
                    <CustomTypograpyCartParent1>
                      <Box>
                        {this.state.orderData?.attributes?.order_items?.data.filter((i: any)=>i.id===this.state.ModalData).map((i: any)=>{
                            return( 
                              <div style={webStyles.ModalitemWrap} key={i.id}>
                                <div style={webStyles.imgWrap}>{
                                    i.attributes.catalogue.data.attributes.images.type.split("/")[0] == 'image' ?
                                    <img data-test-id={'img-item'} src={i.attributes.catalogue.data.attributes.images.url} style={webStyles.imgStyle} />
                                    : <video data-test-id={'video-item'} style={webStyles.imgStyle} controls={false}>
                                        <source src={i.attributes.catalogue.data.attributes.images.url} type={i.attributes.catalogue.data.attributes.images.type} />
                                      </video>
                                  }
                                </div>
                                <div style={webStyles.itemDetailsWrap}>
                                  <div style={webStyles.ItemDescription}>
                                    <CustomTypography
                                      variant={'primary'}
                                      component={'modalFont'}
                                    >
                                     {
                                      i.attributes.catalogue.data.attributes.title 
                                     }
                                    </CustomTypography>
                                    <div style={webStyles.layoutbtn}>
                                    <CustomButton
                                      variant={'primary'}
                                      size="small"
                                      disabled={true}
                                    >
                                      {i.attributes.dimention}
                                    </CustomButton>
                                    </div>
                                   
                                  </div>
                                </div>
                                <div style={webStyles.actionWrap}>
                                  <CustomTypography
                                    variant={'primary'}
                                    component={'body5'}
                                    textTransform={'uppercase'}
                                  >
                                    {i.attributes.price} AED
                                  </CustomTypography>
                                </div>
                              </div>
                            )
                         })} 
                      
                      </Box>
                    </CustomTypograpyCartParent1>
                    <Divider variant="whiteDark"></Divider>
                    <ActionDiv>
                      <ActionDivInner>
                        <CustomButton
                          onClick={this.handleCloseItemDialog}
                          variant="secondary"
                          fullWidth="fullWidth"
                          data-test-id="cancel_button"
                          size={"medium"}
                        >
                        {configJSON.CancelItem}
                        </CustomButton>
                      </ActionDivInner>
                      <ActionDivInner>
                        <CustomButton
                          variant="red"
                          fullWidth="fullWidth"
                          data-test-id="delete_confirmation"
                          size={"medium"}
                          onClick={this.handleRemoveCartConfirm}
                        >
                        {configJSON.DeleteItemBtn}
                        </CustomButton>
                      </ActionDivInner>
                    </ActionDiv>
                  </ParentDiv>
                </DeleteCartItemParent>
              </ModalComponent>
              <CustomSnackBar
                open={this.state.showSnackbar}
                onClose={this.handleCloseSnackBar}
                title={this.state.couponResponseMessage}
                data-test-id="backdrop"
                horizontal="center"
                variant={this.state.snackVariant}
              />
      </ThemeProvider>
      //Merge Engine End DefaultContainer
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyles: any = {
  emptyCartWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px'
  },
  emptyCart: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyCartImg: {
    width: '170px'
  },
  cartWrap: {
    minHeight: window.innerHeight - 64,
    background: customTheme.palette.white.light
  },
  cardWrap: {
    display: 'flex',
    marginTop: '40px',
    paddingLeft: '50px',
    paddingRight: '45px',
    paddingBottom: '50px'
  },
  itemCardWrap: {
    display: 'flex', 
    flex: 1.3,
  },
  addressCardWrap: {
    display: 'flex',
    flex: 1
  },
  innerCardWrap: {
    padding: '24px',
    paddingBottom: '10px',
    height:"100vh",
    display: 'flex',
    flexDirection: 'column'
  },
  innerCardWrap2: {
    padding: '74px',
    paddingTop: '24px',
    paddingBottom: '10px',
    height:"100vh",
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    paddingBottom: '10px',
    borderBottom: `1px solid ${customTheme.palette.white.dark}`
  },
  cardHeaderPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    paddingBottom: '20px',
    borderBottom: `1px solid ${customTheme.palette.white.dark}`
  },
  itemCounter: {
    display: 'flex',
    justifyContent: 'start',
    marginTop: '25px',
    marginBottom: '10px'
  },
  itemWrap: {
    marginTop: '25px',
    display: 'flex',
    gap: 10,
    paddingBottom: '35px',
  },
  itemsWrap: {
    height: '100%', 
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  divider: {
    marginBottom: '5px',
    borderBottom: `1px solid ${customTheme.palette.white.dark}`,
  },
  imgWrap: {
    display: 'flex',
    flex: 1
  },
  imgStyle: {
    height: '107px',
    width: '117px'
  },
  itemDetailsWrap: {
    display: 'flex',
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actionWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'end'
  }, 
  checkoutHead: {
    display: 'flex', 
    justifyContent: 'center',
    marginTop: '20px'
  },
  DropDownSection:{
    display:"flex",
    gap:"8px"
  },
  dropDownWidth:{
    maxWidth:"159px",
    width:"100%"
  },
  CountryWrapper:{
    marginTop:"8px"
  },
  layoutbtn:{
    marginTop:"12px"
  },
   ModalitemWrap: {
    marginTop: '40px',
    display: 'flex',
    gap: 10,
    paddingBottom: '40px',
  },
  couponModalWrapper:{
    display:"flex",
    flexDirection:"column",
    gap:"15px",
  },
  couponModalInnerWrapper:{
    padding:"10px 15px",
    display:"flex",
    gap:"30px",
    border:`1px solid ${customTheme.palette.primary.main}`
  },
  closeIcons:{
   display:"flex",
   justifyContent:"flex-end",
   marginBottom:"10px"
  },
  CodeContentWrapper:{
    paddingLeft:"10px"
  },
  coupanBox:{
    backgroundColor: "#E5FFF7",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:12
  },
  iconColor:{
    color: customTheme.palette.success.main,
    marginRight: 8
  },
  displayFlex:{
    display: "flex"
  },
  tagDiv:{
    alignItems: "center"
  },
  applyDiv:{
     cursor: 'pointer' 
  },
  addTagStyle:
  {marginTop:8,width:"85%",marginLeft:"auto",marginRight:8}
}
const DropDownWrapper=styled(Box)(
  {
    "& .dropdownCss":{
     borderRadius:"0px !important",
     padding:"3px 12px !important",
    },
    "& .dropdownContentBlock":{
      width:"100%",
      fontSize:"12px !important",
      fontWeight:"400",
      fontFamily:"Outfit",
      boxShadow: "unset",
      border:`1px solid ${customTheme.palette.white.dark}`,
      marginTop: "10px",
      minHeight:"100px",
      maxHeight: '300px',
      overflowY:"auto",
      overflowX:"hidden"
    },
    "& .Mui-checked":{
      color:"blue !important",
      width:"18px !important",
      height:"18px !important",
      borderRadius:"0px !important"
  }  

  }
)
const CountryDropDownWrapper=styled(Box)(
  {
      "& .dropdownCss":{
       borderRadius:"0px !important",
       padding:"11px 12px !important"
      },
      "& .dropdownContentBlock":{
        width:"100%", 
      },  
    }  
)
const ParentDiv = styled("div")({
  paddingTop: "40px 0px !important",
});

const DeleteCartItemParent = styled("div")({
  padding: "12px",
});

const CustomTypograpyCartParent = styled("div")({
 textAlign:"start"
});

const CustomTypograpyCartParent1 = styled("div")({
  "@media(max-width:600px)": {
    "& br": {
      display: "none",
    },
  },
});
const CustomStepperWrapper=styled("div")(
  {
    "& .MuiStepper-root":{
      padding:"24px 0px "
    },
  }
)
const ActionDiv = styled("div")({
  display: "flex",
  gap: "24px",
  marginTop:"24px !important"
});

const ActionDivInner = styled("div")({
  width: "100%",
});
const CouponParent = styled("div")({
  padding:"5px"
});


// Customizable Area End
