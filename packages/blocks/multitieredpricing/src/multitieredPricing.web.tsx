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
  Select,
  MenuItem,
  FormControl,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { ArrowBackIosSharp } from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// Customizable Area End

import MultitieredpricingController, {
  Props,
  configJSON,
  Option,
} from "./MultitieredpricingController";

export default class Multitieredpricing extends MultitieredpricingController {
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
        <Box style={webStyles.navbar}>
          <Box
            data-test-id="handleHomeBack"
            onClick={this.handleHomeBack}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <ArrowBackIosSharp />
            <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
              {configJSON.backButtonText}
            </Typography>
          </Box>
          <Typography style={webStyles.heading}>
            {configJSON.multiteredPricingHeading}
          </Typography>
          <ShoppingCartIcon id="handleCart" onClick={this.handleCart} />
        </Box>
        <Box style={webStyles.mainBox}>
          <Grid container spacing={8}>
            <>
              <Grid item xs={12} sm={12} md={6} style={webStyles.leftBox}>
                <Box style={webStyles.cards}>
                  <img
                    src={this.state.productImage}
                    alt="image"
                    style={{ width: "100%" }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                style={webStyles.cardContent as React.CSSProperties}
              >
                <Box style={{ width: "600px" }}>
                  <Typography style={webStyles.title}>
                    {this.state.productName}
                  </Typography>
                  <Typography style={webStyles.content}>
                    {this.state.productDescription}
                  </Typography>
                  <Box>
                    <Grid container style={webStyles.priceTypeBox} spacing={2}>
                      {this.state.allProductsMultitiered?.map(
                        (option: Option, index) => (
                          <Grid item xs={4} sm={4} key={index}>
                            <Box
                              style={
                                this.state.selectedPriceType ===
                                option.attributes.quality_range
                                  ? webStyles.activePriceType
                                  : webStyles.priceType
                              }
                              data-test-id="selectedPriceType"
                              onClick={() =>
                                this.handleClick(
                                  option.attributes.quality_range,
                                  option
                                )
                              }
                            >
                              <Typography
                                style={
                                  this.state.selectedPriceType ===
                                  option.attributes.quality_range
                                    ? webStyles.activePriceTitle
                                    : webStyles.priceTitle
                                }
                              >
                                {option.attributes.quality_range}
                              </Typography>
                              <Box style={{ paddingBottom: "20px" }}>
                                <Typography>
                                  {option.attributes.description}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        )
                      )}
                    </Grid>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "50px",
                      }}
                    >
                      <Box>
                        <FormControl style={{ width: "120px" }}>
                          <InputLabel id="demo-simple-select-label">
                            Resolution
                          </InputLabel>
                          <Select
                            data-test-id="handleResolution"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.resolutionType}
                            onChange={this.handleResolution}
                          >
                            {this.state.allResolutionType?.map((item, index) => (
                              <MenuItem value={item} key={index}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl style={{ width: "120px" }}>
                          <InputLabel id="demo-simple-select-label">
                            User Type
                          </InputLabel>
                          <Select
                            data-test-id="handleUserType"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.userType}
                            onChange={this.handleUserType}
                          >
                            {this.state.allUserType?.map((item, index) => (
                              <MenuItem value={item} key={index}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box>
                        <Typography style={webStyles.mainPrice}>
                          price: ${this.state.price}
                        </Typography>
                        <Button
                          style={webStyles.addBtn as React.CSSProperties}
                          data-test-id="handleAddToCart"
                          onClick={this.handleAddToCart}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </>
          </Grid>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyles = {
  mainBox: {
    padding: "80px",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
  },
  leftBox: {
    display: "flex",
    justifyContent: "center",
  },
  cards: {
    borderRadius: "8px",
    maxWidth: "500px",
    minWidth: "500px",
  },
  price: {
    fontSize: "16px",
    fontWeight: 500,
  },
  content: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#949494",
  },
  navbar: {
    borderBottom: "1px solid gray",
    display: "flex",
    padding: "25px",
    justifyContent: "space-around",
  },
  heading: {
    color: "#000000",
    fontWeight: 600,
    fontSize: "20px",
  },
  priceType: {
    border: "1px solid #D3D3D3",
  },
  activePriceType: {
    border: "1px solid #000000",
  },
  priceTitle: {
    color: "black",
    background: "#D3D3D3",
  },
  activePriceTitle: {
    color: "#ffffff",
    background: "#000000",
  },
  priceTypeBox: {
    marginTop: "20px",
  },
  addToCartBox: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "end",
  },
  mainPrice: {
    fontSize: "20px",
  },
  addBtn: {
    textTransform: "none",
    color: "#ffffff",
    background: "#008000",
    fontSize: "18px",
    fontWeight: 600,
  },
};
// Customizable Area End
