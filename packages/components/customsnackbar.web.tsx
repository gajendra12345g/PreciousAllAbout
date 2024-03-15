import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {Box, IconButton, SvgIcon, styled} from "@material-ui/core"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CustomTypography from '../CustomTypography/CustomTypography.web';
import CloseIcon from '@material-ui/icons/Close';

type Variant = "success" 
type Vertical = "top" | "bottom"
type Horizontal = "left"| "right"

interface Props{
    open:boolean;
    onClose: ()=>void,
    variant?:Variant;
    vertical?:Vertical;
    horizontal?:Horizontal,
    title:string,
    subTitle:string
}

const componenets = {
   success:(title:string,subitle:string,onClose:()=>void)=>
   ( <StyledBox>
    <StyledDivJustifyCenter >
        <StylSVGIcon >
            <CheckCircleIcon/>
        </StylSVGIcon>
    </StyledDivJustifyCenter>
    <StyledDiv >
        <CustomTypography variant={'primary'}
            component={'body5'}>
            {title}
        </CustomTypography>
        <CustomTypography variant={'secondary'}
            component={'body3'}>
            {subitle}
        </CustomTypography>
    </StyledDiv>
    <StyledDivJustifyCenter>
        <StyledIconButton onClick={onClose}>
            <CloseIcon />
        </StyledIconButton>
    </StyledDivJustifyCenter>
    </StyledBox>)
   
}


const CustomSnackBar = (props:Props) =>{

    const {title,subTitle,open, onClose,variant="success",vertical="bottom",horizontal="right"} = props

    return(
        <StyledSnackBar
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal,
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <StyledSnackbarContent
          message={<>{componenets[variant](title,subTitle,onClose)}</>}
          action={[]}
        />
      </StyledSnackBar>
    )
}

const StyledSnackBar = styled(Snackbar)({
    padding:0,
   "& > div":{
    borderRadius:0
   }
})

const StyledSnackbarContent = styled(SnackbarContent)({
    backgroundColor:"white",
    padding:0,
    margin:0,
    "& .MuiSnackbarContent-message":{
        padding:0
    }
  });

const StyledBox = styled(Box)({
    padding:16,
    display:"flex"
})

const StyledDiv = styled('div')({
    display:"flex",
    flexDirection:"column",
    marginRight:16
})

const StyledDivJustifyCenter= styled('div')({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
})

const StylSVGIcon = styled(SvgIcon)({
    color:"#3A82FF",
    height:32,
    width:32,
    marginRight:16
})

const StyledIconButton = styled(IconButton)({
    color:"#000000"
})
  

export default CustomSnackBar