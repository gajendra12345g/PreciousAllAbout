import React from "react";
// Customizable Area Start
import { createTheme } from "@material-ui/core/styles";
import {
  styled,
  ThemeProvider,
  Box,
} from "@material-ui/core";
import OrderManagementsController, { Props } from "./OrderManagementsController.web";
import {
  SearchIcon,
  downArrow,
  downloadIcon
} from "./assets";
export const configJSON = require("./config");
import NavigationMenu from "../../../blocks/navigationmenu/src/NavigationMenu.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import SideBar from "../../../components/src/DesignSystem/SideBar/SideBar.web";
import { sideBarBottomNav, sideBarListItem } from "../../../blocks/navigationmenu/src/NavigationMenuController";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import CustomTable from "../../../components/src/DesignSystem/CustomTable/CustomTable.web"
import CustomPagination from "../../../components/src/DesignSystem/CustomPagination/CustomPagination.web";
import CustomDropDown from "../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
// Customizable Area End

// Customizable Area Start
const theme = createTheme({});
const tabsData = [
  {
    id: 1,
    tab: "ALL",
  },
  {
    id: 2,
    tab: "PAID",
  },
  {
    id: 3,
    tab: "REJECT",
  }
]
const headers = [
  {
    id: "ItemList",label:"ItemList", type: "avatar", img_variant:"squareImg",TableName:"OrderTable",imgsrc:"ItemListImg",columnWidth:"auto"
  },
  {
    id: "order_id", label: "Order Id",TableName:"OrderTable"
  },
  {
    id: "Customer", label: "Customer",TableName:"OrderTable", type: "avatar",img_variant:"circularImg",imgsrc:"CustomerImg",columnWidth:"auto"
  },
  {
    id: "Purchase_date", label: "Purchase Date",TableName:"OrderTable"
  },
  {
    id: "status", label: "Status" ,type:"status",TableName:"OrderTable"
  },
  {
    id: "Price", label: "Price", type: "action_icon",blockCss:"OptionIcon",TableName:"OrderTable",columnWidth:"auto"
  },
]


// const data:any=[]
// Customizable Area End

export default class OrderManagements extends OrderManagementsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    // Customizable Area Start
    return (
      <>
        <NavigationMenu ModeratorLogin={true} contributorLogin={true} contributorContent={false} data-test-id="goToUpload" navigation={undefined} id={""} />
        <SideBar id="Test-id" navigation={this.props.navigation} sideBarBottomNav={sideBarBottomNav} sideBarListItem={sideBarListItem}>
          <ThemeProvider theme={theme}>
            <Box style={webStyles.OrderManagementWrapper}>
              <Box style={webStyles.OrderManagementHeader}>
                <Box style={webStyles.OrderlistWrapper}>
                  <CustomTypography variant="label" component="h7">LIST OF ORDERS</CustomTypography>
                </Box>
                <ul style={webStyles.OrdertableList}>
                  {tabsData.map((i, index) => {
                    return (
                      <li
                        key={index}
                        style={
                          this.state.active === i.id
                            ? {
                              ...webStyles.activeOrderList,
                              ...webStyles.OrderListItem
                            }
                            : webStyles.OrderListItem
                        }
                        data-test-id={`list_item-${index}`}
                        onClick={() => this.handleOrderActive(i.id)}
                      >
                        {i.tab}
                      </li>
                    )
                  })}
                </ul>
                <SelectContainer>
                  <Box style={webStyles.InputWrapper} className="input_main">
                    <StyledBox>
                      <Input
                        data-test-id="search_data"
                        placeholder="Search users"
                        onChange={this.handleOrderSearchChange}
                        isSearch
                        value={this.state.searchOrderValue}
                        type='text'
                        startAdornment={<img src={SearchIcon} />}
                      />
                    </StyledBox>
                    <SelectOrderBox style={webStyles.downloadBlock}>
                      <Box>
                        <CustomButton variant="downloadBtn" size="large">DOWNLOAD <span style={webStyles.downloadIcon}><img src={downloadIcon} /></span></CustomButton>
                      </Box>
                      <Box>
                        <CustomDropDown selectedItem={this.state.sortOrder} selectNewItem={this.handleOrderSort} options={configJSON.sortOrderType} variant="dropdownLanguage" endAdornment={<img src={downArrow} alt="Down Arrow" style={webStyles.iconStyle} />} />
                      </Box>
                    </SelectOrderBox>
                  </Box>
                </SelectContainer>
              </Box>
              <CustomTable headers={headers}  data={this.state.OrderData} />
              <Box style={webStyles.OrderpaginationWrapper}>
                <Box style={webStyles.OrderpaginationInner}>
                  <CustomPagination count={1} data-test-id="test" />
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        </SideBar>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start

const webStyles = {
 OrderManagementWrapper: {
    border: "1px solid #BFC2C3",
    background: "#FFF",
    margin: "24px"
  },
  OrderManagementHeader: {
    padding: "24px"
  },
  OrderlistWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  OrdertableList: {
    display: "flex",
    alignItems: "center",
    gap: "72px",
    listStyle: "none",
    borderBottom: "1px solid #BFC2C3",
    padding: "0px"
  },
  OrderListItem: {
    fontSize: "12px",
    color: "#73767A",
    fontWeight: 500,
    listStyle: "none",
    fontFamily: "LemonMilk",
    padding: "10px 10px 24px 10px"
  },
  activeOrderList: {
    color: "#3A82FF",
    borderBottom: "3px solid #3A82FF"
  },
  InputWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    alignItems: "center",
  },
  inputSearch: {
    height: "48px",
    padding: "14px 217px 14px 16px",
    background: "#F3F4F4",
    marginTop: "27px",
    marginBottom: "27px",
    border: "none"
  },
  iconStyle: {
    width: "24px",
    height: "24px",
    paddingRight: "18px"
  },
  OrderpaginationWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px 24px"
  },
  OrderpaginationInner: {
    display: "flex",
    gap: "8px"
  },
  downloadBlock: {
    display: "flex",
    gap: "20px"
  },
  downloadIcon: {
    paddingLeft: "12px"
  },

};
const StyledBox = styled(Box)({
  "& .MuiOutlinedInput-root": {
    fontFamily: "Outfit",
    fontSize: "14px !important",
    fontWeight: 400,
    color: "#73767A !important",
    padding: "14px 16px",
    height: "48px",
    width: "351px",
    backgroundColor: "#F3F4F4",
    border: "none"
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0px"
  }
});
const SelectOrderBox = styled(Box)({
  "& .sortDropDown": {
    background: "#F3F4F4",
    fontWeight: 400,
    fontSize: "14px !important",
    color: "#000",
    fontFamily: "LemonMilk",
    maxWidth: "141px",
    display: "flex",
    justifyContent: "center",
    padding: "12px 20px",
    alignItems: "center",
    width: "auto"
  },
  "& .label": {
    fontFamily: "LemonMilk !important",
    fontSize: "14px !important",
    whiteSpace: "nowrap"
  }
});
const SelectContainer = styled(Box)({
  "& .input_main": {
    '@media (max-width: 768px)': {
      display: "flex",
      alignItems: "flex-start !important",
      flexDirection: "column"
    },
  }
})
// Customizable Area
