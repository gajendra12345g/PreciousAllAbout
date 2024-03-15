import React from "react";
// Customizable Area Start
import { createTheme } from "@material-ui/core/styles";
import {
  styled,
  ThemeProvider,
  Box,
} from "@material-ui/core";
import UserManagementController, { Props } from "./UserManagementController";
import {
  SearchIcon,
  downArrow,
} from "./assets";
export const configJSON = require("./config");
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
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
    tab: "MEMBER",
  },
  {
    id: 3,
    tab: "GROUPS",
  }
]
const headers = [
  {
    id: "full_name", label: "Name", type: "avatar", img_variant: "circularImg", imgsrc: "profile_images.url", columnWidth: "auto"
  },
  {
    id: "role_type", label: "Role"
  },
  {
    id: "created_at", label: "Created Date"
  },
  {
    id: "email", label: "Email", blockCss: "EmailBlock"
  },
  {
    id: "Actions", label: "Actions", type: "actions"
  }
]
// Customizable Area End

export default class UserManagement extends UserManagementController {
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
            <Box style={webStyles.UserManagementWrapper}>
              <Box style={webStyles.UserManagementHeader}>
                <Box style={webStyles.listUserWrapper}>
                  <CustomTypography variant="label" component="h7">LIST OF USERS</CustomTypography>
                  <CustomButton variant="primary" size="large">ADD USER</CustomButton>
                </Box>
                <ul style={webStyles.tableUserList}>
                  {tabsData.map((i, index) => {
                    return (
                      <li
                        key={index}
                        style={
                          this.state.active === i.id
                            ? {
                              ...webStyles.tablelistItem,
                              ...webStyles.activeList
                            }
                            : webStyles.tablelistItem
                        }
                        onClick={() => this.handleActive(i.id)}
                        data-test-id={`list_item-${index}`}
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
                        isSearch
                        onChange={this.handleSearchChange}
                        type='text'
                        value={this.state.searchValue}
                        startAdornment={<img src={SearchIcon} />}
                      />
                    </StyledBox>
                    <SelectBox>
                      <CustomDropDown selectedItem={this.state.sortItem} selectNewItem={this.handleSortChange} options={configJSON.sortType} variant="dropdownLanguage" endAdornment={<img src={downArrow} alt="Down Arrow" style={webStyles.iconStyle} />} />
                    </SelectBox>
                  </Box>
                </SelectContainer>
              </Box>
              <CustomTable headers={headers} data={this.state.receivedRequests} handleDelete={this.handleDeleteModal} />
              {/* </TableContainer> */}
              <Box style={webStyles.paginationWrapper}>
                <Box style={webStyles.paginationInner}>
                  <CustomPagination count={this.state.pageNumber} onChange={(event: any, value: number) => this.handleChange(value)} data-test-id="test" />
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        </SideBar>
        <CustomSnackBar
          open={this.state.snackBar}
          onClose={this.handleCloseSnackBar}
          title={'User Deleted Successfully!'}
          data-test-id="backdrop"
          horizontal="center"
          variant='delete'
        />
        <ModalComponent  open={this.state.showDeleteUserDialog} maxWidth={541} maxHeight={300}>
          <DeleteUserParent>
            <CustomTypograpyUserParent>
              <CustomTypography
                variant={"primary"}
                component={"body6"}
                textTransform={"uppercase"}
              >
                {configJSON.DeleteModalTitle}
              </CustomTypography>
            </CustomTypograpyUserParent>
            <Divider variant="whiteDark"></Divider>
            <ParentUserDiv>
              <CustomTypograpyUserParent1>
                <CustomTypography variant={"secondary"} component={"body10"}>
                  You want to delete a user, Please confirm
                </CustomTypography>
              </CustomTypograpyUserParent1>
              <ActionDiv>
                <ActionUserDivInner>
                  <CustomButton
                    onClick={this.handleUserCloseDialog}
                    variant="secondary"
                    fullWidth="fullWidth"
                    data-test-id="cancel_button"
                    size={"medium"}
                  >
                    {configJSON.cancelBtnText}
                  </CustomButton>
                </ActionUserDivInner>
                <ActionUserDivInner>
                  <CustomButton
                    variant="red"
                    fullWidth="fullWidth"
                    data-test-id="DeleteData"
                    size={"medium"}
                    onClick={this.handleDeleteUser}
                  >
                    {configJSON.deleteBtnText}
                  </CustomButton>
                </ActionUserDivInner>
              </ActionDiv>
            </ParentUserDiv>
          </DeleteUserParent>
        </ModalComponent>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start

const webStyles = {
  UserManagementWrapper: {
    border: "1px solid #BFC2C3",
    background: "#FFF",
    margin: "24px",
  },
  UserManagementHeader: {
    padding: "24px"
  },
  listUserWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  CreatedBlock: {
    minWidth: "150px"
  },
  roleBlock: {
    minWidth: "150px"
  },
  tableUserList: {
    display: "flex",
    alignItems: "center",
    gap: "72px",
    listStyle: "none",
    borderBottom: "1px solid #BFC2C3",
    padding: "0px"
  },
  AddUserBtn: {
    padding: "14px 20px",
    border: "1px solid #000",
    background: "#000",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 400
  },
  tablelistItem: {
    fontSize: "12px",
    color: "#73767A",
    fontWeight: 500,
    listStyle: "none",
    fontFamily: "LemonMilk",
    padding: "10px 10px 24px 10px"
  },
  activeList: {
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
  paginationWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px 24px"
  },
  paginationInner: {
    display: "flex",
    gap: "8px"
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
const SelectBox = styled(Box)({
  "& .sortDropDown": {
    background: "#F3F4F4",
    fontSize: "14px !important",
    fontWeight: 400,
    fontFamily: "LemonMilk",
    color: "#000",
    maxWidth: "141px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 20px",
    width: "auto"
  },
  "& .label": {
    fontSize: "14px !important",
    fontFamily: "LemonMilk !important",
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

const ParentUserDiv = styled("div")({
  padding: "0px 32px",
});

const DeleteUserParent = styled("div")({
  padding: "12px",
});

const CustomTypograpyUserParent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const CustomTypograpyUserParent1 = styled("div")({
  padding: "32px 0px",
  textAlign: "center",
  "@media(max-width:600px)": {
    "& br": {
      display: "none",
    },
  },
});

const ActionDiv = styled("div")({
  display: "flex",
  gap: "24px",
});

const ActionUserDivInner = styled("div")({
  width: "100%",
});
// Customizable Area
