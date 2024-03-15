import React, { useState } from "react";
import { makeStyles, Icon } from "@material-ui/core";
import CustomTypography from "../CustomTypography/CustomTypography.web";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox.web";
import { CheckIcon,InfoIcon } from "./assets";
import CustomButton from "../CustomButton/CustomButton.web";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import customTheme from "../Theme/Theme.web";



const useStyles = makeStyles((theme) => ({
  dropdown: {
    width: "100%",
    position: "relative",
  },
  dropdownContent: {
    zIndex: 10000,
    position: "absolute",
    left: " 0",
    boxShadow: " 0 0 10px 5px rgba(0, 0, 0, 0.07)",
    background: "white",
  },
  item: {
    padding: " 10px",
    cursor: "pointer",
    fontFamily: "lemonMilk",
    fontSize: "12px",
    fontWeight: 400,
    color: "#73767A",
  },
  item1: {
    padding: " 10px",
    cursor: "pointer",
  },
  icon: {
    color: "#73767A",
  },
  infoIcon:{
    paddingLeft:"8px"
  },
  infoimg:{
    width:"12px",
    height:"12px"
  },
  DisplayWrapper:{
    display:"flex",
    alignItems:"center"
  }
}));

interface Option {
  label: string;
  value: any;
  checked?: boolean;
}
interface Props {
  fontVariant?: any;
  variant?: any;
  selectedItem: Option;
  options: Option[];
  startAdornment?: any;
  endAdornment?: any;
  style? : any;
  checkbox?:boolean;
  selectNewItem: (value: Option) => void;
  saveSelected?: any;
}

const  CustomDropDown = (props: Props) => {
  const { options, selectNewItem, selectedItem, startAdornment, endAdornment,style, saveSelected } = props;
  const classes = useStyles();
  const [isActive, setIsActive] = useState(false);

  const typoStyles: any = {
    ...styles[props.variant],
  };

  function handleSelect(option: Option) {
    selectNewItem(option);
    if(!props.checkbox)
    {
      handleChangeActive();
    }
  }

  const handleChangeActive = () => {
    setIsActive(!isActive);
  };
  const handleClose=()=>{
    saveSelected();
    handleChangeActive();
  }

  const handleClickAway = () => {
    setIsActive(false);
  }
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={`${classes.dropdown} sortDropDown`}>
        <div onClick={handleChangeActive} style={typoStyles} className="dropdownCss">
          {!!startAdornment &&  <span>
            <Icon className={classes.icon}>
              {!!startAdornment && startAdornment}
            </Icon>
          </span>}
         
          <CustomTypography
            variant="primary"
            component={
              props.fontVariant === "lemon" ? "outfitBody7" : "outfitBody6"
            }
          >
            {!!selectedItem.label && selectedItem.label}
          </CustomTypography>
          <Icon className={classes.icon}>
              {!!endAdornment ? endAdornment : isActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Icon>
        </div>
        <div
          className= {`${classes.dropdownContent} dropdownContentBlock`}
          style={{ display: isActive ? "block" : "none", ...style }}
        >
          {!!options && Array.isArray(options) &&
            options.map((option: Option, index: number) => {
              return (
                <div
                  onClick={() => handleSelect(option)}
                  className={`${
                    props.fontVariant
                      ? `${classes.item} label`
                      : `${classes.item1} label`
                  }`}
                  data-test-id={`sort_option-${index}`}
                  key={index}
                >
               
                              {
                  props.checkbox ? (
                    <span className={classes.DisplayWrapper}>
                      <CustomCheckBox checked={option?.checked} className="check" icon={<img src={CheckIcon} alt="check Arrow" />} />
                      {option.label}
                      <span className={classes.infoIcon}>
                        <img src={InfoIcon} alt="info icon" className={classes.infoimg} />
                      </span>
                    </span>
                  ) : (
                    <span>{option.label}</span>
                  )
                }
                </div>
              );
            })}
            {props.checkbox && <CustomButton variant="blueWhiteText" fullWidth={'fullWidth'}
                                size={'large'} onClick={handleClose}>SAVE</CustomButton>}
        </div>
      </div>
    </ClickAwayListener>
  );
};

const styles: any = {
  dropdownBtnPrimary: {
    cursor: " pointer",
    background: "transparent",
    display: " flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "max-content",
    padding: "10px",
    color:customTheme.palette.secondary.main,
    fontWeight: 500,
    textAlign: "center",
  },
  dropdownBtnSecondary: {
    cursor: " pointer",
    background: "white",
    display: " flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    border: " 1px solid #BFC2C3",
    borderRadius: " 5px",
    color: " #000",
    fontWeight: 500,
    textAlign: "center",
  },
  dropdownLanguage :{
    width:"100px",
    display:"flex",
    gap:"10px",
    justifyContent:"center",
    alignItems:"center",
    fontSize:'16px',
    color:customTheme.palette.secondary.main
  },
  dropdownProfile:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontSize:'16px',
    color:customTheme.palette.secondary.main
  },
  dropdownContent:{
    display:"flex",
    justifyContent:"space-evenly",
    fontSize:"14px",
    alignItems:"center",
    fontFamily:"LemonMilk-Bold",
    fontWeight:"bold",
    textTransform:"uppercase",
  }
};

export default CustomDropDown;
