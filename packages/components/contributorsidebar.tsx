import React, { ReactChildren, ReactChild } from "react"
import Header from "../ContributorHeader/ContributorHeader.web"
import { Box, Grid, styled ,makeStyles,SvgIcon} from "@material-ui/core";
import Footer from "../Footer/Footer.web";
import CustomTypography from "../CustomTypography/CustomTypography.web";
import CustomTheme from "../Theme/Theme.web"
import HomeIcon from "./Assest/HomeIcon";
import EarningIcon from "./Assest/EarningIcon";
import PortfolioIcon from "./Assest/PortfolioIcon";
import InsightsIcon from "./Assest/InsigthIcon";
import RequestIcon from "./Assest/RequestIcon";
import AccountIcon from "./Assest/AccountIcon";
import HelpIcon from "./Assest/HelpIcon";

interface Props{
    children: ReactChild | ReactChildren;
    activeTab: number;
    navigation?:any
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        display:"flex"
    },
    sideBarWapper:{
        minHeight: "calc(100vh - 90px)",
        paddingLeft:"2.5rem",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        paddingTop:"17px",
    },
    sideBarContainer:{
        width:"5.5rem",
    },
    contentSection:{
        width:"100%"
    }, 
    iconContainer:{
        textAlign:"center",
        marginBottom:"17px",
        "&:last-child":{
            marginBottom:0
        },
        cursor:"pointer",
        "& svg":{
            marginBottom:"2px"
        }
    },
    iconContainerBottom:{
        paddingTop:"17px",
        borderTop:`1px solid ${CustomTheme.palette.secondary.light}`,
        "&:last-child":{
            marginBottom:"17px"
        }        
    },
    activeNav:{
        borderLeft:`2px solid ${CustomTheme.palette.primary.dark}`,
    }
}))


const sideBarTopNav = [
    {
        label:"HOME",
        Icon:HomeIcon,
        path:"",
        id:1
    },
    {
        label:"EARNINGS",
        Icon:EarningIcon,
        path:"",
        id:2
    },
    {
        label:"PORTFOLIO",
        Icon:PortfolioIcon,
        path:"",
        id:3
    },
    {
        label:"INSIGHTS",
        Icon:InsightsIcon,
        path:"",
        id:4
    },{
        label:"REQUEST",
        Icon:RequestIcon,
        path:"",
        id:5
    },
]  


const sideBarBottomNav = [
    {
        label:"ACCOUNT",
        Icon:AccountIcon,
        path:"",
        id:6
    },
    {
        label:"HELP",
        Icon:HelpIcon,
        path:"",
        id:7
    },
]  



const ContributorSideBarLayout =(props:Props)=>{
    const {children,activeTab}  = props

    const classes = useStyles();

    return(
        <>
        <Header />
        <Box className={classes.container}>
            <Box className={classes.sideBarWapper}>
                <Box className={classes.sideBarContainer}>
                    {
                        sideBarTopNav.map((item:{label:string,Icon:any,path:string,id:number})=>(
                            <Box className={`${classes.iconContainer} ${activeTab == item.id?classes.activeNav:""}`}>
                                <SvgIcon>
                                    <item.Icon color={activeTab == item.id?CustomTheme.palette.primary.dark:CustomTheme.palette.secondary.light} />
                                </SvgIcon>
                                <CustomTypography variant={activeTab == item.id? "primary":"secondary"} component="label" >
                                    {item.label}
                                </CustomTypography>
                            </Box>
                        ))
                    }
                </Box>
                <Box className={classes.iconContainerBottom} >
                {
                        sideBarBottomNav.map((item:{label:string,Icon:any,path:string,id:number})=>(
                            <Box className={`${classes.iconContainer} ${activeTab == item.id?classes.activeNav:""}`}>
                                <SvgIcon>
                                    <item.Icon color={activeTab == item.id?CustomTheme.palette.primary.dark:CustomTheme.palette.secondary.light} />
                                </SvgIcon>
                                <CustomTypography variant={activeTab == item.id? "primary":"secondary"} component="label" >
                                    {item.label}
                                </CustomTypography>
                            </Box>
                        ))
                    }              
                </Box>
            </Box>
            <Box className={classes.contentSection} >
                <Box>
                    {children}
                </Box>
                <Box>
                    <Footer
                        userType={"contributor"} 
                        navigation={""} 
                    />
                </Box>
            </Box>
        </Box>
        </>
    )
} 


export default ContributorSideBarLayout