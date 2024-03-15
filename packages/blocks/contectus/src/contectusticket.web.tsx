import React from "react";
// Customizable Area Start
import ContactUsTicketsController, {
  Props
} from "./ContactUsTicketsController";
import { 
  Box, 
  Button, 
  styled, 
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextareaAutosize,
  ThemeProvider,
  createTheme,
  Typography,
  ClickAwayListener
} from "@material-ui/core";
export const configJSON = require("./config");
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import SideBar from "../../../components/src/DesignSystem/SideBar/SideBar.web";
import { sideBarBottomNav, sideBarListItem } from "../../../blocks/navigationmenu/src/NavigationMenuController";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomDropDown from "../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import NavigationMenu from "../../../blocks/navigationmenu/src/NavigationMenu.web";
import { SearchIcon, downArrow, userImg } from "./assets";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import EmojiPicker from 'emoji-picker-react';
import moment from "moment";
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";

const theme = createTheme({});
// Customizable Area End

class ContactUsTickets extends ContactUsTicketsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  
  render() {
    return (
      // Customizable Area Start
      <>
        <NavigationMenu ModeratorLogin={true} contributorLogin={true} contributorContent={false} data-test-id="goToUpload"  navigation={undefined} id={""}/>
        <SideBar id="Test-id" navigation={this.props.navigation} sideBarBottomNav={sideBarBottomNav} sideBarListItem={sideBarListItem}>       
          <ThemeProvider theme={theme}>
            <Box style={webStyles.contentContainer} >
              <Box style={webStyles.cardHeader}>
                <CustomTypography variant="primary" component="header1">{configJSON.ticketTitle}</CustomTypography>
                <ul style={webStyles.tableUserList}>
                  <li
                    style={
                      this.state.selectedTab === 0
                        ? {
                            ...webStyles.tablelistItem,
                            ...webStyles.activeList
                          }
                        : webStyles.tablelistItem
                    }
                    onClick={() => this.handleTabSelect(0)}
                    data-test-id="tab0"
                  >
                    {configJSON.ticketTabAll}
                  </li>
                  <li
                    style={
                      this.state.selectedTab === 1
                        ? {
                            ...webStyles.tablelistItem,
                            ...webStyles.activeList
                          }
                        : webStyles.tablelistItem
                    }
                    onClick={() => this.handleTabSelect(1)}
                    data-test-id="tab1"
                  >
                    {configJSON.ticketTabPending}
                  </li>
                  <li
                    style={
                      this.state.selectedTab === 2
                        ? {
                            ...webStyles.tablelistItem,
                            ...webStyles.activeList
                          }
                        : webStyles.tablelistItem
                    }
                    onClick={() => this.handleTabSelect(2)}
                    data-test-id="tab2"
                  >
                    {configJSON.ticketTabSolved}
                  </li>
                  <li
                    style={
                      this.state.selectedTab === 3
                        ? {
                            ...webStyles.tablelistItem,
                            ...webStyles.activeList
                          }
                        : webStyles.tablelistItem
                    }
                    onClick={() => this.handleTabSelect(3)}
                    data-test-id="tab3"
                  >
                    {configJSON.ticketTabReject}
                  </li>
                </ul>
                <Box style={webStyles.filterContainer}>
                  <StyledBox>
                    <Input
                      data-test-id="search_data"
                      placeholder={configJSON.searchPlaceholder}
                      isSearch
                      onChange={this.handleInputChange}
                      type='text'
                      value={this.state.searchQuery}
                      startAdornment={<img src={SearchIcon}/>}
                    />
                  </StyledBox>
                  <SelectBox>
                    <CustomDropDown 
                      options={configJSON.sortBy} 
                      selectNewItem={this.handleChangeSortType} 
                      selectedItem={this.state.selectedSortType} 
                      variant = "dropdownLanguage" 
                      data-test-id="sort_option"
                      endAdornment={ <img src={downArrow} alt="Down Arrow" style={webStyles.iconStyle} />}  
                    />
                  </SelectBox>
                </Box>
              </Box>
              <TableBox>
                <TableContainer data-test-id="tableData">
                  <Table>
                    <TableHead>
                      <TableRow style={webStyles.tableHeader}>
                          <TableCell style={webStyles.NameHeadBlock}>
                            <Checkbox data-test-id="select_all" 
                            onChange={() => this.handleSelectAll(!this.state.checkAll)}/>
                            {configJSON.idLabelText}
                          </TableCell>
                          <TableCell>{configJSON.subjectLabelText}</TableCell>
                          <TableCell>{configJSON.requesterLabelText}</TableCell>
                          <TableCell>{configJSON.requestedLabelText}</TableCell>
                          <TableCell>{configJSON.emailLabelText}</TableCell>
                          <TableCell style={{paddingRight: '2rem'}}>{configJSON.actionLabelText}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={webStyles.tableBody}>
                      {this.state.tickets && this.state.tickets.map((ticket, index) => {
                        return (
                        <TableRow key={ticket.id} style={webStyles.tableRow}>
                          <TableCell scope="row" style={webStyles.NameBlock} data-test-id={`tablename-${index}`}>
                            <Box style={{display: 'flex', alignItems: 'center', gap:'12px'}} >
                              <Checkbox 
                                checked={this.state.selectedIds.includes(ticket.id)} 
                                onChange={() => this.handleTicketSelect(ticket.id)}
                                data-test-id={`select_ticket-${index}`}
                                style={{marginRight:'12px'}}
                              />
                              <Box data-test-id={`small_statusBox-${index}`} style={{...webStyles.smallStatusBox, background: this.getColorForTicketStatus(ticket.attributes.query.status) }}>
                                  <CustomTypography variant={"white"} component={"outfitBody"}>
                                    {ticket.attributes.query.status.toUpperCase().substring(0,1)}
                                  </CustomTypography>
                              </Box>
                              {`#${ticket.id}`}
                            </Box>
                          </TableCell>
                          <TableCell style={{textTransform: 'capitalize'}} scope="row">
                            {ticket.attributes.query.subject}
                          </TableCell>
                          <TableCell 
                            style={{textTransform: 'capitalize'}}  scope="row">{ticket.attributes.query.requester}
                          </TableCell>
                          <TableCell>
                            {this.formatDate(ticket.attributes.query.requested)}
                          </TableCell>
                          <TableCell 
                            style={{textTransform: 'capitalize'}}  scope="row">{ticket.attributes.query.email}
                          </TableCell>
                          <TableCell style={{paddingRight:'2rem'}}>
                            <Box style={webStyles.tableBtnGroup}>
                                <Button 
                                  aria-controls={`simple-menu-${ticket.id}`} 
                                  aria-haspopup="true" 
                                  onClick={(e) => this.handleMoreMenuClick(e,ticket.id)}
                                  style={webStyles.btnMenuStyle}
                                  data-test-id={`menu_button-${index}`}
                                >
                                  <MoreHorizIcon style={webStyles.tableBtnIconStyle}/>
                                </Button>
                                <Menu
                                  id={`simple-menu-${ticket.id}`}
                                  anchorEl={this.state.anchorEl}
                                  elevation={1}
                                  open={Boolean(this.state.anchorEl)}
                                  onClose={this.handleMoreMenuClose}
                                  data-test-id={`menu-${index}`}
                                >
                                  <MenuItem 
                                    onClick={this.viewTicket}
                                    data-test-id={`view_ticket-${index}`}
                                  >
                                    <ListItemIcon style={{minWidth:'27px'}}>
                                        <VisibilityOutlinedIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={configJSON.viewTicketLabel} />
                                  </MenuItem>
                                  <MenuItem 
                                    onClick={this.showDeleteConfirmation} 
                                    style={{color:"#DC2626"}} 
                                    data-test-id={`delete_button-${index}`}
                                  >
                                    <ListItemIcon style={{minWidth:'27px'}}>
                                        <DeleteOutlineOutlinedIcon fontSize="small" style={{color:"#DC2626"}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={configJSON.deleteTicketLabel} />
                                  </MenuItem>
                                </Menu>
                            </Box>
                          </TableCell>
                        </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableBox>
              <CustomSnackBar
                open={this.state.snackBarSource}
                onClose={this.handleCloseSnackBar}
                title={'Ticket Deleted Successfully!'}
                data-test-id="backdrop"
                horizontal="center"
                variant='delete'
              />
              <ModalComponent open={this.state.showDeleteDialog} maxWidth={541} maxHeight={300}>
                <DeleteParent>
                  <CustomTypograpyParent>
                    <CustomTypography
                      variant={"primary"}
                      component={"body6"}
                      textTransform={"uppercase"}
                    >
                      {configJSON.deleteDialogTitle}
                    </CustomTypography>
                  </CustomTypograpyParent>
                  <Divider variant="whiteDark"></Divider>
                  <ParentDiv>
                    <CustomTypograpyParent1>
                      <CustomTypography variant={"secondary"} component={"body10"}>
                        {`You are about to delete ${this.state.selectedIds.length > 1 ?  this.state.selectedIds.length + ' tickets': 'a ticket'}, Please confirm`}
                      </CustomTypography>
                    </CustomTypograpyParent1>
                    <ActionDiv>
                      <ActionDivInner>
                        <CustomButton
                          onClick={this.handleCloseDeleteDialog}
                          variant="secondary"
                          fullWidth="fullWidth"
                          data-test-id="cancel_button"
                          size={"medium"}
                        >
                        {configJSON.cancelBtnLabel}
                        </CustomButton>
                      </ActionDivInner>
                      <ActionDivInner>
                        <CustomButton
                          variant="red"
                          fullWidth="fullWidth"
                          data-test-id="delete_confirmation"
                          size={"medium"}
                          onClick={this.handleDeleteTicket}
                        >
                        {configJSON.deleteBtnLabel}
                        </CustomButton>
                      </ActionDivInner>
                    </ActionDiv>
                  </ParentDiv>
                </DeleteParent>
              </ModalComponent>
              <ModalComponent
                fullWidth={true}
                elevation={5}
                hideBackdrop={true}
                maxWidth={"md"}
                maxHeight={"90vh"}
                open={this.state.ticketDialogOpen}
                onClose={this.handleCloseTicketDialog}
                data-test-id="comment_dialog"
                aria-labelledby="ticket-dialog-title"
              >
                <Box style={webStyles.dialogContainer}>
                  <Box style={webStyles.ticketCotainer}>
                    <DialogTitle id="ticket-dialog-title" disableTypography style={{padding: "0px", position: 'relative'}}>
                      <Box style={webStyles.titleContainer}>
                        <Box style={{
                          padding: "0.75rem 1.25rem",
                          background: this.getColorForTicketStatus(this.state.selectedTicket?.data?.attributes?.query?.status || ''),
                        }}>
                            <CustomTypography variant={"white"} component={"body4"}>{(this.state.selectedTicket?.data?.attributes?.query?.status || '').toUpperCase()}</CustomTypography>
                        </Box>
                        <CustomTypography variant={"primary"} component={"outfitBody1"}>{`Ticket #${this.state.selectedTicket?.data?.id}`}</CustomTypography>
                      </Box>
                      <IconButton 
                        data-test-id="close_button" 
                        aria-label="close" 
                        className={webStyles.closeButton} 
                        onClick={() => this.handleCloseTicketDialog()} 
                        style={{ position: 'absolute', right: 0, top: 0, margin: 0, padding:0 }}
                      >
                        <CloseOutlinedIcon />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent style={webStyles.descriptionContainer}>
                      <CustomTypography variant={"primary"} component={"outfitBody1"}>
                        {this.state.selectedTicket?.data.attributes.query.details}
                      </CustomTypography>
                    </DialogContent>
                    <CustomTypography variant={"font_color"} component={"body12"}>{configJSON.commentLabel}</CustomTypography>
                  </Box>
                  <Box style={webStyles.commentSection}>
                    {this.state.selectedTicket?.included
                    .sort((commentA, commentB) => {
                      const createdAtA = new Date(commentA.attributes.created_at);
                      const createdAtB = new Date(commentB.attributes.created_at);
                      return createdAtB.getTime() - createdAtA.getTime()
                    })
                    .map((comment, index) => {
                      const { url, name } = comment.attributes.account_details
                      return (
                        <Box key={`comment-${comment.id}-${index}`}>
                          <Box style={webStyles.divider}/>
                          <Box style={webStyles.commentContainer}>
                            <Box style={webStyles.commentHeaderContainer}>
                              <Box style={webStyles.commentUserContainer}>
                                {url ? 
                                    <img src={url} style={webStyles.profileStyle}/> 
                                  : <img src={userImg} style={webStyles.profileStyle}/> 
                                }
                                <CustomTypography variant={"primary"} component={"outfitBody1"}>{name ? name : 'Alex'}</CustomTypography>
                              </Box>
                              <CustomTypography variant={"font_color"} component={"body12"}>{moment(comment.attributes.created_at).format('ll')}</CustomTypography>
                            </Box>
                            <CustomTypography variant={"primary"} component={"outfitBody1"}>{comment.attributes.comment}</CustomTypography>
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                  <DialogActions style={webStyles.actionContainer}>
                      {
                        this.state.isEmojiVisible ?
                          <ClickAwayListener onClickAway={() => this.handleClickAwayEvent()}>
                            <Box style={webStyles.emojiWrap}>
                              <Box>
                                <EmojiPicker 
                                  height={280}
                                  searchDisabled={true}
                                  skinTonesDisabled={true}
                                  onEmojiClick={this.onEmojiClick}
                                />
                              </Box>
                            </Box>
                          </ClickAwayListener>
                        : null
                      }
                      <Box style={webStyles.commentBox}>
                          <TextareaAutosize
                              maxRows={4}
                              value={this.state.comment}
                              data-test-id="comment_box"
                              aria-label="maximum height"
                              placeholder="Write a comment"
                              style={webStyles.textAreaStyle}
                              onChange={(e) => this.handleTextAreaChange(e.target.value)}
                          />
                          <Box style={webStyles.btnContainer}>
                              <Button data-test-id={'emojiBtn'} style={webStyles.btnEmojiStyle} onClick={() => this.toggleEmoji()}>
                                  <SentimentSatisfiedOutlinedIcon/>
                              </Button>
                              <Button data-test-id="submit_comment" onClick={this.addTicketComment} style={webStyles.btnAddStyle}>
                                  <SendOutlinedIcon/>
                              </Button>
                          </Box>
                      </Box>
                  </DialogActions>
                </Box>
              </ModalComponent>
            </Box>
          </ThemeProvider>
        </SideBar>
      </>
      // Customizable Area End
    );
  }
}
// Customizable Area Start

const ParentDiv = styled("div")({
  padding: "0px 32px",
});

const DeleteParent = styled("div")({
  padding: "12px",
});

const CustomTypograpyParent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const CustomTypograpyParent1 = styled("div")({
  textAlign: "center",
  padding: "32px 0px",
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

const ActionDivInner = styled("div")({
  width: "100%",
});
 
const webStyles: any = {
  smallStatusBox: {
    height: '20px',
    width: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  customSnackbar: {
    minWidth: '266px',
    height: '42px',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 12px'
  },
  deleteLabelStyle: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
    fontFamily: 'Inter'
  },
  closeButton: {
    position: 'absolute',
    color: theme.palette.grey[500],
    right: 0, 
    top: 0, 
    margin: 0, 
    padding:0
  },
  tablelistItem: {
    fontSize: "12px",
    color: "#73767A",
    fontWeight: 500,
    listStyle: "none",
    fontFamily: "LemonMilk",
    padding: "10px 10px 18px 10px"
  },
  activeList: {
    color: "#3A82FF",
    borderBottom: "3px solid #3A82FF"
  },
  tableUserList: {
    display: "flex",
    alignItems: "center",
    marginTop: '24px',
    gap: "72px",
    listStyle: "none",
    borderBottom: "1px solid #BFC2C3",
    padding: "0px"
  },
  NameBlock: {
    height: "60px",
    alignItems: "center",
    paddingLeft: "15px"
  },
  tableRow: {
    height: "60px",
    fontSize: "16px",
    fontWeight: 400,
    color: "#000"
  },
  btnMenuStyle: {
      height: '2rem',
      width:'2rem',
      display: 'flex',
      minWidth: "2rem",
      alignItems: 'center',
      justifyContent: 'center',
      background: '#E7EBEB',
      "&:hover" : {
          background: '##3A82FF',
          color: "#fff"
      }
  },
  dialogContainer: {
      padding: '0'
  },
  ticketCotainer: {
      position: 'sticky',
      top: 0,
      padding: "1.5rem 1.5rem 0rem",
      backgroundColor: "#fff"
  },
  commentSection: {
      padding: "0 1.5rem"
  },
  descriptionContainer: {
      margin: '24px 0 20px',
      padding: 0
  },
  actionContainer: {
      marginTop: '1rem',
      padding: "0rem 1.5rem 1.5rem",
      position: 'relative'
  },
  btnEmojiStyle: {
      padding: '0px',
      minWidth: '0px',
      color: '#73767A'
  },
  btnAddStyle: {
      padding: '0px',
      minWidth: '0px',
      color: '#3A82FF'
  },
  commentBox: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '10px 16px',
      border: '1px solid #3A82FF'
  },
  textAreaStyle: {
      border: 0,
      fontSize: '16px',
      fontFamily: 'Outfit',
      fontWeight: '400',
      color: '#64748B',
      outline: 0
  },
  btnContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginLeft: 'auto'
  },
  commentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginBottom: '1rem'
  },
  titleContainer: {
      display : 'flex',
      alignItems: 'center',
      gap: '2.25rem'
  },
  commentHeaderContainer: {
      display:'flex',
      width: '100%',
      aligntItems: 'center',
      justifyContent: 'space-between'
  },
  commentUserContainer: {
      display:'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textTransform: 'capitalize'
  },
  profileStyle: {
      borderRadius: '2rem',
      height: '2rem',
      width: '2rem',
      objectFit: 'cover'
  },
  divider: {
      borderBottom: "1px solid #E7EBEB",
      marginBottom: '.75rem',
      width: "100%",
      margintTop: '8px'
  },
  searchBarWrapper: {
      background: '#F3F4F4',
      height: '2.5rem',
      padding: '0rem 1rem',
      width: '22rem',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center'
  },
  input: {
      border: 0,
      outline: 0,
      background: '#F3F4F4'
  },
  contentContainer:{
    border: "1px solid #BFC2C3",
    background: "#FFF",
    margin: "24px"
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  cardHeader: {
    padding: '1.5rem',
  },
  tableHeader: {
    backgroundColor: "#E7EBEB",
    border: "none",
    color: "#000",
    height: "48px",
    fontWeight: 500
  },
  cardSubHeader1: {
      marginTop: '1.5rem',
      borderBottom: '1px solid #BFC2C3'
  },
  tableBtnStyle: {
      border: 0,
      height: '2rem',
      width:' 2rem',
      flexShrink: '0',
      color: '#73767A',
      display:'flex', 
      backgroundColor:'#E7EBEB',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      "&:hover": {
      backgroundColor:"#E7EBEB",
      },
  },
  tableBtnGroup: {
      display: 'flex',
      gap:'1rem'
  },
  tableBody: {
      margin: '0 1.5rem',
  },
  approveContainer: {
      flexGrow: 1,
      background: 'linear-gradient(115deg, #D4FFF2 0%, #97EFD3 102.23%)',
      color: '#007550'
  },
  pendingContainer: {
      flexGrow: 1,
      background: 'linear-gradient(116deg, #FFF6D7 -0.91%, #FFC876 101.49%)',
      color: '#D97706'
  },
  rejectContainer: {
      flexGrow: 1,
      background: 'linear-gradient(115deg, #FFDADA -1.75%, #FBB2B2 102.54%)',
      color: '#CA2121'
  },
  submitContainer: {
      flexGrow: 1,
      background: 'linear-gradient(115deg, #EADBFF 0%, #C6A7F2 102.23%)',
      color: '#6111D1'
  },
  tableBtnIconStyle: {
      height: '20px',
      width: '20px',
      color: '#73767A'
  },
  iconStyle: {
    width: "24px",
    height: "24px",
    paddingRight: "18px"
  },
  iconColor: {
      color: '#73767A',
  },
  NameHeadBlock: {
    paddingLeft: "15px"
  },
  emojiWrap: {
    position: 'absolute', 
    zIndex: 9999, 
    bottom: 2, 
    right: 20
  }
};

  const SelectBox = styled(Box)({
    "& .sortDropDown": {
      background: "#F3F4F4",
      fontSize: "14px !important",
      fontWeight: 400,
      fontFamily: "LemonMilk",
      color: "#000",
      maxWidth:"141px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:"12px 20px",
      width:"auto"
    },  
    "& .label":{
      fontSize:"14px !important",
      fontFamily: "LemonMilk !important",
      whiteSpace:"nowrap"
    }
  });

  const TableBox = styled(Box)({
    "& .MuiTableCell-root": {
      padding: "0px 16px",
      fontSize: "16px"
    },
    "& .MuiTableCell-head": {
      minWidth: "150px",
    },
    "& .MuiTableCell-body": {
      minWidth: "150px",
      overflow: "hidden",
    },
    "& .PrivateSwitchBase-root-42": {
      padding: "0px 24px 0px 24px"
    },
    "& .MuiIconButton-colorSecondary:hover": {
      backgroundColor: "transparent"
    },
    "& .MuiIconButton-root:hover": {
      backgroundColor: "transparent"
    },
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "rgba(0, 0, 0, 0.54)"
    }
  });

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
      border:"none"
    },
    "& .MuiOutlinedInput-notchedOutline":{
      border:"0px"
    }
  });
 // Customizable Area End



export default ContactUsTickets;
