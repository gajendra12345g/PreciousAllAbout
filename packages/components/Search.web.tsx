import React from "react";
import { Typography, Box, Menu, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { styled } from "@material-ui/core/styles";
import { search } from "./assest";
const Searchimg = styled("img")({
  width: 20,
  height: 20,
  padding: "20px 0px 20px 20px",
});

const InputField = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "8px",
  fontSize: "10px",
  fontWeight: 500,
  color: "#73767A",
});

const InputBox = styled(Box)({
  maxWidth: "805px",
  width: "100%",
  height: "64px",
  background: "white",
  boxShadow: "10px 30px 50px rgba(191, 194, 195, 0.2)",
  marginTop: "-32px",
  margin: "auto",
  marginBottom: 169,
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const GreyVerticalLine = styled("div")({
  margin: "20px",
  borderRight: "1px solid #73767A",
  padding: "15px",
});

const CustomSelectMain = styled("div")({
  cursor: "pointer",
});

const LabelMainDiv = styled("div")({
  minWidth: "100px",
  display: "flex",
});

const LabelSelectText = styled(Typography)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "10px",
  fontWeight: 500,
  color: "#73767A",
  paddingTop: 0,
});

const CustomMenuMainDiv = styled("div")({});
const CustomMenu = styled(Menu)({
  "& .MuiMenu-paper": {
    width: "auto",
    marginTop: "5px",
    height: "150px",
  },

  "@media (max-width: 1280px)": {
    "& .MuiMenu-paper": {
      marginTop: "5px",
    },
  },
});
const CustomMenuItem = styled(MenuItem)({});

const CustomSelectIcon = styled(ArrowDropDownIcon)({
  color: "#73767A",
  paddingLeft: 4,
  paddingRight:20,
});

const searchData = {
  array: [
    { id: 1, text: "NATURE" },
    { id: 2, text: "FOREST " },
    { id: 3, text: "DRONE" },
    { id: 3, text: "FASTION" },
    { id: 1, text: "ARCHITECHTURE" },
    { id: 2, text: "CITY VIEW " },
    { id: 3, text: "FOOD" },
    { id: 3, text: "ABSTRACT" },
  ],
};

const Search = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState("ALL ITEM");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setAnchorEl(null);
  };
  return (
    <InputBox>
      <Searchimg src={search} />
      <InputField type="text" placeholder="search" />
      <GreyVerticalLine />
      <CustomSelectMain>
        <LabelMainDiv>
          <LabelSelectText onClick={handleClick}>
            {selectedOption}
            <CustomSelectIcon />
          </LabelSelectText>
        </LabelMainDiv>
        <CustomMenuMainDiv>
          <CustomMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {searchData.array.map((item) => {
              return (
                <CustomMenuItem
                  key={item.id}
                  onClick={() => handleOptionSelect(item.text)}
                >
                  {item.text}
                </CustomMenuItem>
              );
            })}
          </CustomMenu>
        </CustomMenuMainDiv>
      </CustomSelectMain>
    </InputBox>
  );
};

export default Search;
