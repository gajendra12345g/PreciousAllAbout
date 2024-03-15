import React from "react";

import {
  // Customizable Area Start
  Box,
  Grid,
  Typography,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
// Customizable Area End

import MultitieredpricingController, {
  Item,
  Props,
  configJSON,
} from "./MultitieredPricingController.web";

export default class Multitieredproduct extends MultitieredpricingController {
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
          <Typography style={webStyles.heading}>
            {configJSON.allProductHeading}
          </Typography>
        </Box>
        <Box style={webStyles.mainBox}>
          <Grid container spacing={2}>
            {this.state.allProducts?.map((item: Item, index: number) => (
              <Grid
                key={index}
                data-test-id="handleCardNavigation"
                onClick={() => this.handleCardNavigation(item.id)}
                item
                xs={12}
                sm={5}
                md={4}
              >
                <Box style={webStyles.cards}>
                  <img
                    src={item.attributes.image?.url}
                    alt="image"
                    style={webStyles.image}
                  />
                  <Box style={webStyles.cardContent}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography style={webStyles.title}>
                        {item.attributes.name}
                      </Typography>
                      <Typography style={webStyles.price}>
                        {item.attributes.price}
                      </Typography>
                    </Box>
                    <Typography style={webStyles.content}>
                      {item.attributes.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
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
    padding: "50px",
  },
  cardContent: {
    padding: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
  },
  cards: {
    border: "1px solid gray",
    borderRadius: "8px",
  },
  price: {
    fontSize: "16px",
    fontWeight: 500,
  },
  content: {
    fontSize: "16px",
    fontWeight: 500,
  },
  navbar: {
    borderBottom: "1px solid gray",
    padding: "20px",
    display:"flex",
    justifyContent:"space-around"
  },
  heading: {
    color: "#000000",
    fontWeight: 600,
    fontSize: "20px",
  },
  image: {
    width: "100%",
    height: "350px",
  },
};

// Customizable Area End
