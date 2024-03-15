import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {
  styled,
  Box,
} from "@material-ui/core";

const CustomPagination =  (props: any) => {
  return (
    <StyledPagination>
    <Pagination
      count={props.count}
      onChange={props.onChange}
      page={props.page}
      data-test-id="page_number"    
    />
    
    </StyledPagination>
 
  );
};
const StyledPagination=styled(Box)(
  {
    "& .MuiButtonBase-root":{
      fontFamily: "Outfit" as '"Outfit"',
      fontSize: "14px",
      minWidth:"24px",
      height:"24px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      border:"none",
      fontWeight:400,
      borderRadius:"0px",
    },
    "& .MuiPaginationItem-page.Mui-selected":{
      background:"#000000",
      color:"#fff",
    },
    "& .MuiPagination-ul > :first-child , .MuiPagination-ul > :last-child":{
      width:"24px",
      height:"24px",
      background:"#E7EBEB",
      border:"none",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:"0px"
    }
  }
)
export default CustomPagination;
