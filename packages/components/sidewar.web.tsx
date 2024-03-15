import React from "react";
// Customizable Area Start
import { Box } from "@material-ui/core";
const webStyle: any = {
    SideBarMain: {
        display: "flex",
        height: "calc(100vh - 72px)",
        overflow: "hidden"
    },
    SideBarWrapper: {
        width: "calc(130px - 40px)",
        height: "calc(100vh - 72px)",
        paddingLeft: "40px",
    },
    SideBarItemBlock: {
        display: "flex",
        padding: "16px 0px 9px 8px",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        borderRight: "1px solid #C4C4C4",
    },
    listWrapper: {
        height: "60%",
        paddingRight: "8px",
        overflow: "scroll"
    },
    listInner: {
        padding: "4px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    listIcon: {
        width: "24px",
        height: "24px",
        marginBottom: "8px"
    },
    activeStyle: {
        borderLeft: "3px solid #000000",
        color: "#000000"
    },
    ListIconBottomBlock: {
        margin: "16px 8px 35px 8px",
        paddingTop: "16px",
        borderTop: "1px solid #C4C4C4"
    },
    RightSideContent: {
        overflow: "scroll",
        width:"100%"
    }
};
import CustomTypography from "../CustomTypography/CustomTypography.web";
import NavigationMenuController, { Props } from "../../../../blocks/navigationmenu/src/NavigationMenuController";
// Customizable Area End

export default class SideBar extends NavigationMenuController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End
    render() {
        // Customizable Area Start
        const { sideBarListItem, sideBarBottomNav } = this.props;
        const { active } = this.state;
        return (
            <Box style={webStyle.SideBarMain}>
                <Box style={webStyle.SideBarWrapper}>
                    <Box style={webStyle.SideBarItemBlock}>
                        <Box style={webStyle.listWrapper} >
                            {sideBarListItem && sideBarListItem.map((item) => {
                                return (
                                    <Box data-test-id={`click-${item.id}`} key={item.id} style={active === item.id ? { ...webStyle.activeStyle, ...webStyle.listInner } : webStyle.listInner} onClick={() => this.handleListItemClick(item.id, item.PathUrl)}>
                                        <img src={active === item.id ? item.ActiveIcon : item.icon} style={webStyle.listIcon} />
                                        <CustomTypography variant={active === item.id ? "primary" : "secondary"} component={"label"}>{item.listTitle}</CustomTypography>
                                    </Box>
                                )
                            })}
                        </Box>
                        <Box style={webStyle.ListIconBottomBlock}>
                            {sideBarBottomNav  && sideBarBottomNav.map((item) => {
                                return (
                                    <Box data-test-id={`click-${item.id}`} key={item.id} style={active === item.id ? { ...webStyle.activeStyle, ...webStyle.listInner } : webStyle.listInner} onClick={() => this.handleListItemClick(item.id, item.PathUrl)}>
                                        <img src={active === item.id ? item.ActiveIcon : item.icon} style={webStyle.listIcon} />
                                        <CustomTypography variant={active === item.id ? "primary" : "secondary"} component={"label"}>{item.listTitle}</CustomTypography>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
                <Box style={webStyle.RightSideContent}>
                    {this.props.children}
                </Box>
            </Box>
        );
        // Customizable Area End
    }
}

// Customizable Area Start
// Customizable Area End
