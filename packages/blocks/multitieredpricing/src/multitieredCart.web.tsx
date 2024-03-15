import React from "react";

import {
  // Customizable Area Start
  Box,
  Button,
  Grid,
  Typography,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { ArrowBackIosSharp, HighlightOff } from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
// Customizable Area End

import MultitieredpricingController, {
  MultitieredCartItem,
  Props,
  configJSON,
} from "./MultitieredPricingController.web";

export default class Multitieredcart extends MultitieredpricingController {
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
        <Box style={webStyles.firstNavbar}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <ArrowBackIosSharp />
            <Typography
              style={{ fontSize: "18px", fontWeight: "bold" }}
              data-test-id="handleBackButton"
              onClick={this.handleBackButton}
            >
              {configJSON.backButtonText}
            </Typography>
          </Box>
          <Typography style={webStyles.headingOne}>
            {configJSON.addToCartHeading}
          </Typography>
          <HomeIcon onClick={this.handleBuyButton} />
        </Box>
        {this.state.allCartItem && this.state.allCartItem.length > 0 ? (
          <>
            {this.state.allCartItem?.map(
              (item: MultitieredCartItem, index: number) => (
                <Box
                  key={index}
                  style={webStyles.firstMainBox}
                  data-test-id="grid"
                >
                  <Grid
                    container
                    spacing={2}
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Grid item xs={12} sm={6}>
                      <Box style={{ display: "flex" }}>
                        <img
                          src={
                            item.attributes.multitieredpricing_attributes
                              .product_attributes.image.url
                          }
                          alt="image"
                          width="100%"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                        <Box style={{ marginLeft: "50px" }}>
                          <Typography style={webStyles.headingTitle}>
                            {
                              item.attributes.multitieredpricing_attributes
                                .product_attributes.name
                            }
                          </Typography>
                          <Typography style={webStyles.contentText}>
                            {
                              item.attributes.multitieredpricing_attributes
                                .quality_range
                            }
                          </Typography>
                          <Typography style={webStyles.contentText}>
                            ${item.attributes.total_price}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        data-test-id="handleMinus"
                        test-id="handleMinus1"
                        onClick={() =>
                          this.handleMinus(item.id, item.attributes.quantity)
                        }
                        style={webStyles.minus}
                      >
                        -
                      </Box>
                      <Box>{item.attributes.quantity}</Box>
                      <Box
                        data-test-id="handlePlus"
                        onClick={() =>
                          this.handlePlus(item.id, item.attributes.quantity)
                        }
                        style={webStyles.plus}
                      >
                        +
                      </Box>
                      <Box
                        data-test-id="handle"
                        style={webStyles.cancel}
                        onClick={() => this.handleRemoveItem(item.id)}
                      >
                        <HighlightOff />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )
            )}
            <Box style={webStyles.secondGrid}>
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                Total Price :
              </Typography>
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                ${this.state.totalCost}
              </Typography>
            </Box>
          </>
        ) : (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "150px auto",
            }}
          >
            <Typography>No items in the cart.</Typography>
            <Button variant="contained" onClick={this.handleBuyButton}>
              Buy Now
            </Button>
          </Box>
        )}
      </>

      // Customizable Area End
    );
  }
}

// Customizable Area Start

const webStyles = {
  firstMainBox: {
    padding: "20px 100px",
  },

  headingTitle: {
    fontSize: "18px",
    fontWeight: 600,
  },

  contentText: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#000000",
    marginTop: "10px",
  },
  firstNavbar: {
    borderBottom: "1px solid gray",
    display: "flex",
    padding: "25px",
    justifyContent: "space-around",
  },
  headingOne: {
    color: "#000000",
    fontWeight: 600,
    fontSize: "20px",
  },
  plus: {
    width: "15px",
    height: "30px",
    background: "rgb(0, 128, 0)",
    color: "rgb(255, 255, 255)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "10px",
  },
  minus: {
    background: "red",
    color: "#ffffff",
    width: "15px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px",
  },
  cancel: {
    marginLeft: "40px",
  },
  secondGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
};

// Customizable Area End
