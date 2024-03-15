import React from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  styled,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar
} from "@material-ui/core";

function ProfileSideBar(props: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const Main = styled("div")({
    height: "100%",
    maxHeight: 876,
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    padding: "0 32px 10px 32px",
  });

  const SideBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    fontSize: "10px",
    maxHeight: "1082px",
    width: "100%",
  });

  const HeadingSection = styled(Box)({
    padding: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });

  const Heading = styled(Typography)({
    fontSize: "12px",
    fontWeight: 400,
    textAlign: "center",
  });

  const Subheading = styled(Typography)({
    fontSize: "12px",
    fontWeight: 400,
    color: "#73767A",
    marginTop: "8px",
  });

  const Border = styled("div")({
    border: "1px solid #BFC2C3",
    width: "100%",
    marginBottom: "23px",
  });

  const SelectSection = styled(Select)({
    width: "100%",
  });

  const TabSection = styled(Tab)({
    color: "#73767A",
    "& .MuiTab-wrapper": {
      alignItems: "flex-start",
      textAlign: "initial",
    },
    "&.MuiTab-textColorInherit.Mui-selected": {
      color: "black",
      background: "#F3F4F4",
    },
  });

  const StyledAvatar = styled(Avatar)({
    height:56,
    width:56,
    marginBottom:16
  })

  const sideData = [
    
    {
      id: 1,
      text: "PROFILE",
      path: "UserProfileDetails",
    },
    {
      id: 2,
      text: "Settings & Preferences",
      path: "UserProfileSetting",
    },
    {
      id: 3,
      text: "ACTIVITY",
      path: "UserProfileDetails",
    },
    {
      id: 4,
      text: "Privacy & Security",
      path: "UserProfilePrivacyAndSecurity",
    },
  ];

  return (
    <Main>
      <HeadingSection>
        {props.activeTab && <StyledAvatar src={props.profileImage} alt="profileImage" />}
        <Heading>{props.name}</Heading>
        <Subheading>{props.username}</Subheading>
      </HeadingSection>
      <Border />
      <SideBox>
        {isMobile ? (
          <SelectSection
            value={props.activeTab}
          >
            {sideData &&
              sideData.map((item: any, index: any) => (
                <MenuItem
                  key={item.index}
                  value={index}
                  onClick={() => props.navigation.navigate(item.path)}
                >
                  {item.text}
                </MenuItem>
              ))}
          </SelectSection>
        ) : (
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={props.activeTab}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            {sideData && sideData.map((item: any, index: any) => (
              <TabSection
                onClick={() => props.navigation.navigate(item.path)}
                key={item.index}
                label={item.text}
                style={{
                  borderLeft:
                    props.activeTab === index
                      ? "3px solid #0E0F17"
                      : "3px solid transparent",
                }}
              />
            ))}
          </Tabs>
        )}
      </SideBox>
    </Main>
  );
}

export default ProfileSideBar;
