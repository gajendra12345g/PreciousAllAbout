import React from "react";
// Customizable Area Start
import ReviewApprovalModeratorController, {
  Props,configJSON
} from "./ReviewApprovalModeratorController";
import { 
    Box, 
    Paper,
    styled, 
    Tabs, 
    Tab, 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,Grid,
    TableCell, } from "@material-ui/core";
import CustomPagination from "../../../components/src/DesignSystem/CustomPagination/CustomPagination.web";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import CustomDropDown from "../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
import MetricsCard from "./MetricsCard.web";
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import SideBar from "../../../components/src/DesignSystem/SideBar/SideBar.web";
import {sideBarListItem, sideBarBottomNav } from "../../../blocks/navigationmenu/src/NavigationMenuController";
import customTheme from "../../../components/src/DesignSystem/Theme/Theme.web";
import CustomSnackBar from "../../../components/src/DesignSystem/CustomSnackBar/CustomSnackBar";
// Customizable Area End

class ReviewApprovalModerator extends ReviewApprovalModeratorController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  
  render() {
    const {showAlert, alertType} = this.state;
    return (
      // Customizable Area Start
      <Grid>
          <NavigationMenu navigation={undefined} id={""} ModeratorLogin={true} contributorLogin={true} contributorContent={false} data-test-id="showCollection"/>
          <SideBar id="" navigation={this.props.navigation} sideBarBottomNav={sideBarBottomNav} sideBarListItem={sideBarListItem}>
        <CustomContainer>
          <TopMetrics>
            <Box style={webStyles.approveContainer} >
              <MetricsCard color='#007550' icon={<CheckCircleOutlineOutlinedIcon />} title="TOTAL APPROVE" value={this.state.contentCount.total_approved} subtitle={`Increased by ${Math.round(this.state.contentCount?.percentage_approved)}%`}/>
            </Box>
            <Box style={webStyles.pendingContainer} >                
              <MetricsCard color='#D97706' icon={<ForumOutlinedIcon />}  title="TOTAL PENDING" value={this.state.contentCount.total_pending} subtitle={`Increased by ${Math.round(this.state.contentCount?.percentage_pending)}%`}/>
            </Box>
            <Box style={webStyles.rejectContainer} >                
              <MetricsCard color='#CA2121' icon={<NewReleasesOutlinedIcon />}  title="TOTAL REJECT" value={this.state.contentCount.total_rejected} subtitle={`Increased by ${Math.round(this.state.contentCount?.percentage_rejected)}%`}/>
            </Box>
            <Box style={webStyles.submitContainer} >                
              <MetricsCard color='#6111D1' icon={<MonetizationOnOutlinedIcon />}  title="TOTAL SUBMISSION" value={this.state.contentCount.total_submitted} subtitle={`Increased by ${Math.round(this.state.contentCount?.percentage_submitted)}%`}/>
            </Box>
          </TopMetrics>
          <Box style={webStyles.contentContainer} >
            <Box style={webStyles.cardHeader}>
              <CustomTypography variant="primary" component="header1"  >LIST OF CONTENT</CustomTypography>
            </Box>
            <Box>
              <Box style={webStyles.cardSubHeader1}>
                <CustomTabs value={this.state.selectedTab} onChange={this.handleChangeTabs} data-test-id="handleChangeTabs">
                    <Tab label ={`Approved(${this.state.contentCount?.total_approved})`} />
                    <Tab label ={`Pending(${this.state.contentCount?.total_pending})`}/>
                    <Tab label ={`Reject(${this.state.contentCount?.total_rejected})`}/>
                    <Tab label ={`Total Submissions(${this.state.contentCount?.total_submitted})`}/>
                </CustomTabs>
              </Box>
              <Box style={webStyles.filterContainer}>
                <div style={webStyles.searchBarWrapper}>
                  <SearchIcon style={webStyles.iconColor}/>
                  <input
                    value={this.state.searchQuery}
                    style={webStyles.input}
                    placeholder="Search Content"
                    data-test-id="searchContent"
                    onChange={(e) => this.handleInputChange(e.target.value)}
                  />
                </div>
                <Grid style={webStyles.contetStyleDrop}>
                        <CustomDropDown variant="dropdownContent" style={webStyles.dropDownContent} endAdornment={<ExpandMoreIcon />} options={configJSON.sortType} selectedItem={this.state.selectedUpdate} selectNewItem={this.handleSortSelect} />
                    </Grid>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead style={webStyles.tableHeader}>
                    <TableRow>
                        <TableCell style={{paddingLeft: '2rem'}}>{configJSON.contentLabelText}</TableCell>
                        <TableCell>{configJSON.typeLabelText}</TableCell>
                        <TableCell>{configJSON.dateLabelText}</TableCell>
                        <TableCell>{configJSON.userLabelText}</TableCell>
                        <TableCell>{configJSON.priceLabelText}</TableCell>
                        <TableCell>{configJSON.statusLabelText}</TableCell>
                        <TableCell style={{paddingRight: '2rem'}}>{configJSON.actionLabelText}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={webStyles.tableBody}>
                    {this.state.contents?.length>0 ? 
                    this.state.contents?.map((content:any) => {
                      let badge;
                      if (content.status === "accepted") {
                          badge = { background: '#BEE4D8', color: '#057A55', text: 'Approved' };
                      } else if (content.status === "rejected") {
                          badge = { background: '#FFE9E9', color: '#DC2626', text: 'Rejected' };
                      } else {
                          badge = { background: '#FCDCA6', color: '#D97706', text: content.status };
                      }  
                      const isImage = content?.type.startsWith('image');
                     const isVideo = content?.type.startsWith('video');
                    
                      return (
                      <TableRow key={content.id}>
                          <TableCell style={{paddingLeft:'2rem'}} scope="row">
                            {isImage && (
                          <img src={content.file_link || ''} alt="content-icon" width={50} height={50} />
                        )}
                        {isVideo && (
                          <video width={50} height={50} controls>
                            <source src={content.file_link || ''} type={content.type} />
                            Your browser does not support the video tag.
                          </video>
                        )}
                          </TableCell>
                          <TableCell style={{textTransform: 'capitalize'}} scope="row">{content.type}</TableCell>
                          <TableCell scope="row">
                            {content.date 
                              ? new Date(content.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) 
                              : ''
                            }
                          </TableCell>
                          <TableCell style={webStyles.listShow}  scope="row">{content.user_detail.name}</TableCell>
                          <TableCell style={webStyles.listShow} >{content.price}</TableCell>
                          <TableCell >
                            <Box style={{ color: badge.color, background: badge.background, padding: '0.75rem 1.25rem',display: 'flex', alignItems: 'center' , justifyContent: 'center', gap:'0.5rem', textTransform: 'capitalize', width:'fit-content'}}>
                              <Box style={{ height:'0.5rem', width:'0.5rem', borderRadius: '100px', background: badge.color}}/> {badge.text}
                            </Box>
                          </TableCell>
                          <TableCell style={{paddingRight:'2rem'}}>
                            <Box style={webStyles.tableBtnGroup}>
                              <Grid
                                onClick={() => this.handleRedirectToContentDetails(content.id)}
                                style={webStyles.tableBtnStyle}
                                data-test-id="handleRedirectToContentDetails"
                              >
                                <EditOutlinedIcon style={webStyles.tableBtnIconStyle}/>
                              </Grid>
                              <Grid
                                style={webStyles.tableBtnStyle}
                                data-test-id="deleteContent"
                                  onClick={() => this.deletecontent(content.id)}
                              >
                                <DeleteOutlinedIcon style={webStyles.tableBtnIconStyle}/>
                              </Grid>
                            </Box>
                          </TableCell>
                      </TableRow>
                      );
                    }):
                    <Grid style={webStyles.noFound}>
                    <CustomTypography>No Catalogue Found</CustomTypography>
                    </Grid>}
                  </TableBody>
                </Table>
              </TableContainer>
{this.state.contents?.length>0 &&
              <Box style={webStyles.paginationWrapper}>
                <Box style={webStyles.paginationInner}>
                  <CustomPagination count={this.state.pageNumber} onChange={(event: any, value: number) => this.handleChange(value)} data-test-id="test" />
                </Box>
              </Box>}
            </Box>
          </Box>
          <ModalComponent maxWidth={541}  open={this.state.showDeleteDialog} maxHeight={300}>
                <DeleteParent>
                  <CustomTypograpyParent>
                    <CustomTypography
                      textTransform={"uppercase"}
                      variant={"primary"}
                      component={"body6"}
                    >
                      {configJSON.deleteDialogTitle}
                    </CustomTypography>
                  </CustomTypograpyParent>
                  <Divider variant="whiteDark"></Divider>
                  <ParentDiv>
                    <CustomTypograpyParent1>
                      <CustomTypography  component={"body10"} variant={"secondary"}>
                        {configJSON.deleteContent}
                      </CustomTypography>
                    </CustomTypograpyParent1>
                    <ActionDiv>
                      <ActionDivInner>
                        <CustomButton
                          data-test-id="cancel_button"
                          size={"medium"}
                          onClick={this.handleCloseDeleteDialog}
                          variant="secondary"
                          fullWidth="fullWidth"
                        >
                        {configJSON.cancelBtnLabel}
                        </CustomButton>
                      </ActionDivInner>
                      <ActionDivInner>
                        <CustomButton
                          variant="red"
                          fullWidth="fullWidth"
                          data-test-id="delete_confirmation"
                          onClick={this.handleDeleteContent}
                          size={"medium"}
                        >
                        {configJSON.deleteBtnLabel}
                        </CustomButton>
                      </ActionDivInner>
                    </ActionDiv>
                  </ParentDiv>
                </DeleteParent>
              </ModalComponent>
              <CustomSnackBar
          open={showAlert}
          onClose={this.handleAlertClose}
          title={alertType}
          horizontal="center"
          variant="delete"
        />
        </CustomContainer>
      </SideBar>
      </Grid>
      
      // Customizable Area End
    );
  }
}
// Customizable Area Start
 
const webStyles: any = {
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
    padding:"1.5rem 0",
    border:"1px solid #C4C4C4",
    height:"100%",
    display:'flex',
    flexDirection: 'column',    
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.875rem',
    padding: '0 1.5rem',
    marginTop: '1.5rem',
  },
  tableBtnIconStyle: {
    height: '20px',
    width: '20px',
    color: '#73767A'
  },
  cardHeader: {
    padding: '0 1.5rem',
    marginBottom: '1.5rem'
  },
  tableHeader: {
    margin: '0 1.5rem',
    borderBottom: '1px solid #BFC2C3'
  },
  cardSubHeader1: {
    marginLeft: '1.5rem',
    borderBottom: '1px solid #BFC2C3'
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
  tableBtnStyle: {
    cursor: 'pointer',
    "&:hover": {
      backgroundColor:"#E7EBEB",
    },
    border: 0,
    height: '2rem',
    width:' 2rem',
    flexShrink: '0',
    color: '#73767A',
    display:'flex', 
    backgroundColor:'#E7EBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableBtnGroup: {
    display: 'flex',
    gap:'1rem'
  },
  tableBody: {
    margin: '0 1.5rem',
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
  iconColor: {
    color: '#73767A',
  },
  dropDownloadContainer: {
    width: '10rem',
    marginLeft: 'auto'
  },
  contetStyleDrop: {
    height: "48px",
    border: `1px solid ${customTheme.palette.primary.main}`,
    backgroundColor: customTheme.palette.white.main,
    display: "flex",
    justifyContent: "space-between",
    width: "149px",
    alignItems: "center",
    marginTop: "8px",
    cursor: "pointer"
},
dropDownContent: {
  width: "149px",
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
noFound:{
  width:"100%",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  height:"300px"
},
listShow:{
  textTransform:"captalize",
  color:customTheme.palette.blue.main
}
};

const CustomContainer = styled(Box)({
  padding:"2rem 1rem",
})
const DeleteParent = styled("div")({
  padding: "12px",
});

const TopMetrics = styled(Box)({
  gap: '1.5rem',
  height:"12.5rem",
  marginBottom:"2rem",
  display:"flex",
  width: '100%'
})

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
const ParentDiv = styled("div")({
  padding: "0px 32px",
});
const ActionDiv = styled("div")({
  display: "flex",
  gap: "24px",
});

const ActionDivInner = styled("div")({
  width: "100%",
});
 
const CustomTabs =styled(Tabs)({
    "& .MuiTabs-indicator":{
      backgroundColor:"#3A82FF",
      width:"3.125rem"
    },
    "& .MuiTab-textColorInherit":{
      color:"#73767A",
      fontFamily : "LemonMilk",
      fontSize:"12px",
      fontWeight:500,
      minWidth:"3.125rem"
    },
    "& .Mui-selected span":{
      color:"#3A82FF"
    },
    "& .MuiTabs-flexContainer":{
      gap:"1rem"
    }
  })
 // Customizable Area End



export default ReviewApprovalModerator;
