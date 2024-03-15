import * as React from "react";
// Customizable Area Start
import {
  Box,
  Button,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@material-ui/core";
import { useState } from "react";
import {facebook,insta,linkdin,youtube,vimeo,twitter} from './assets'
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CustomTypography from "../CustomTypography/CustomTypography.web";
import CustomLink from "../Link/Link.web";
import LanguageIcon from '@material-ui/icons/Language';
import CustomButton from "../CustomButton/CustomButton.web";

const ourCompany = {
  heading: "OUR COMPANY",
  array: [
    {
      id: 1,
      text: "ABOUT US",
    },
    {
      id: 2,
      text: "CAREERS",
    },
    {
      id: 3,
      text: "PARTNERS",
    },
    {
      id: 4,
      text: "PRICING",
    },
    {
      id: 5,
      text: "DOWNLOAD OUR APP ",
    },
  ],
};

const legal = {
  heading: "LEGAL",
  array: [
    {
      id: "1",
      text: "TERMS & CONDITIONS",
    },
    {
      id: "2",
      text: "PRIVACY POLICY",
    },
    {
      id: "3",
      text: "LICENSING",
    },
  ],
};

const MainDiv = styled("div")({
  maxWidth: "1650px",
  margin: "0 auto",
});

const language = {
  array: [
    {
      id: 1,
      text: "ENGLISH",
    },
    {
      id: 1,
      text: "GERMAN",
    },
    {
      id: 1,
      text: "ITALIAN",
    },
    {
      id: 1,
      text: "SPANISH",
    },
  ],
};

const helpAndSupport = {
  heading1: "HELP & SUPPORT",
  heading2: "LANGUAGE",
  array: [
    {
      id: "1",
      text: "FAQS",
    },
    {
      id: "2",
      text: "CONTACT US",
    },
  ],
};

const gettingStarted = {
  heading: 'Getting Started',
  list: [
    {
      id: 1,
      title: 'Submission Guidelines'
    },
    {
      id: 2,
      title: 'Contributor Platform'
    },
    {
      id: 3,
      title: 'Model & property releases'
    }
  ]
}

const improve = {
  heading: 'Improve your content',
  list: [
    {
      id: 1,
      title: 'The Shot List'
    },
    {
      id: 2,
      title: 'Contributor blog'
    },
    {
      id: 3,
      title: 'Video workshops'
    }
  ]
}

const community = {
  heading: 'Community',
  list: [
    {
      id: 1,
      title: 'Contributor Twitter'
    },
    {
      id: 2,
      title: 'Contributor Instagram'
    },
    {
      id: 3,
      title: 'Social Media Guidelines'
    }
  ]
}

const help = {
  heading: 'HELP & SUPPORT',
  list: [
    {
      id: 1,
      title: 'FAQS'
    },
    {
      id: 2,
      title: 'CONTACT US'
    },
    {
      id: 3,
      title: 'Privacy policy'
    }
  ]
}

const socialIcons = [
  {
    id: "1",
    icon: <img src={twitter} />,
  },
  {
    id: "2",
    icon: <img src={insta} />,
  },
  {
    id: "3",
    icon: <img src={linkdin} />,
  },
  {
    id: "4",
    icon: <img src={facebook} />,
  },
  {
    id: "5",
    icon: <img src={youtube} />,
  },
  {
    id: "6",
    icon: <img src={vimeo} />,
  },
];

const Main = styled("div")({
  backgroundColor: "black",
});

const GridMain = styled(Grid)({
  backgroundColor: "black",
  padding: "100px 100px 88px 100px",
});

const GridItem1 = styled(Grid)({
  "@media (max-width: 960px)": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
const GridItem2 = styled(Grid)({
  "@media (max-width: 960px)": {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
const GridItem3 = styled(Grid)({
  "@media (max-width: 1280px)": {
    marginTop: "50px",
  },
  "@media (max-width: 960px)": {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
const GridItem4 = styled(Grid)({
  "@media (max-width: 1280px)": {
    marginTop: "50px",
  },
  "@media (max-width: 960px)": {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const FooterMainText = styled(Typography)({
  color: "white",
  fontSize: "24px",
  fontWeight: 500,
  marginBottom: "24px",
});

const FooterButton = styled(Button)({
  backgroundColor: "white",
  padding: "10px",
  fontSize:12,
  fontWeight:500,
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor:"white",
  },
  "@media (max-width: 460px)": {
    width: "100%",
  },
});

const NavSectionHeading = styled(Typography)({
  color: "white",
  fontSize: "14px",
  fontWeight:500,
  marginBottom: "24px",
});

const NavSectionText = styled(Typography)({
  color: "grey",
  fontSize: "12px",
  marginBottom: "12px",
  fontWeight:400
});

const CustomSelectMain = styled("div")({
  cursor: "pointer",
});

const LabelMainDiv = styled("div")({
  width: "32%",
  display: "flex",
});

const LabelSelectText = styled(Typography)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "12px",
  color: "grey",
});

const CustomMenuMainDiv = styled("div")({});
const CustomMenu = styled(Menu)({
  "& .MuiMenu-paper": {
    width: "8.6%",
    marginTop: "5px",
  },

  "@media (max-width: 1280px)": {
    "& .MuiMenu-paper": {
      width: "100px",
      marginTop: "5px",
    },
  },
});
const CustomMenuItem = styled(MenuItem)({
});

const CustomSelectIcon = styled(ArrowDropDownIcon)({
  color: "white",
  padding:2
});

const BelowSectionMain = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "33px 100px 33px 100px",
  backgroundColor: "black", 
  "@media (max-width: 500px)": {
    flexDirection: "column",
    gap: "10px",
  },
});
const Border=styled(Box)({
  padding: "0px 100px 0px 100px",
  background:"black"
})

const BelowSectionText = styled(Typography)({
  fontSize: "12px",
  color: "#ffffff",
});

const BelowSectionSocial = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
});

const SocialIcon = styled(Typography)({
  color: "white",
  height:24,
  width:24
});

// Customizable Area End

interface ViewProps {
  // Customizable Area Start
  userType: string;
  // Customizable Area End
}

export const Footer: React.FC<ViewProps> = (
  {
    // Customizable Area Start
    userType
    // Customizable Area End
  }
) => {
  // Customizable Area Start
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("ENGLISH");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setAnchorEl(null);
  };

  const iconStyle: any = {
    icon: {
      color: '#fff'
    }
  }
  // Customizable Area End

  return (
    // Customizable Area Start
    <Main>
      <MainDiv>
        {
          userType === 'contributor' ?
            <GridMain container>
              <Grid item xs={12} sm={4} md lg xl>
                  <CustomTypography
                    variant={'white'}
                    textTransform={'uppercase'}
                    component={'subTitle2'}
                  >
                    {gettingStarted.heading}
                  </CustomTypography>
                  <Box
                    mt={2}
                  >
                    {gettingStarted.list.map((list: any, index: any) => {
                      return (
                        <Box
                          key={index}
                          mt={1}
                        >
                          <CustomLink
                            variant={'secondary'}
                            textTransform={'uppercase'}
                            component={'body4'}
                          >
                            {list.title}
                          </CustomLink>
                        </Box>
                      )
                    })}
                  </Box>
              </Grid>
              <Grid item xs={12} sm={4} md lg xl>
                  <CustomTypography
                    variant={'white'}
                    textTransform={'uppercase'}
                    component={'subTitle2'}
                  >
                    {improve.heading}
                  </CustomTypography>
                  <Box
                    mt={2}
                  >
                    {improve.list.map((list: any, index: any) => {
                      return (
                        <Box
                          key={index}
                          mt={1}
                        >
                          <CustomLink
                            variant={'secondary'}
                            textTransform={'uppercase'}
                            component={'body4'}
                          >
                            {list.title}
                          </CustomLink>
                        </Box>
                      )
                    })}
                  </Box>
              </Grid>
              <Grid item xs={12} sm={4} md lg xl>
                  <CustomTypography
                    variant={'white'}
                    textTransform={'uppercase'}
                    component={'subTitle2'}
                  >
                    {community.heading}
                  </CustomTypography>
                  <Box
                    mt={2}
                  >
                    {community.list.map((list: any, index: any) => {
                      return (
                        <Box
                          key={index}
                          mt={1}
                        >
                          <CustomLink
                            variant={'secondary'}
                            textTransform={'uppercase'}
                            component={'body4'}
                          >
                            {list.title}
                          </CustomLink>
                        </Box>
                      )
                    })}
                  </Box>
              </Grid>
              <Grid item xs={12} sm={4} md lg xl>
                  <CustomTypography
                    variant={'white'}
                    textTransform={'uppercase'}
                    component={'subTitle2'}
                  >
                    {help.heading}
                  </CustomTypography>
                  <Box
                    mt={2}
                  >
                    {help.list.map((list: any, index: any) => {
                      return (
                        <Box
                          key={index}
                          mt={1}
                        >
                          <CustomLink
                            variant={'secondary'}
                            textTransform={'uppercase'}
                            component={'body4'}
                          >
                            {list.title}
                          </CustomLink>
                        </Box>
                      )
                    })}
                  </Box>
              </Grid>
              <Grid item xs={12} sm={4} md lg xl>
                  <Box
                    mt={4}
                  >
                    <Box
                      display="flex"
                      flexDirection={'row'}
                      alignItems={'center'}
                      mt={2}
                    >
                      <Box>
                        <LanguageIcon 
                          style={iconStyle.icon}
                        />
                      </Box>
                      <Box
                        display={'flex'}
                        flexDirection={'column'}
                        ml={1}
                      >
                        <CustomTypography
                          variant={'secondary'}
                          component={'body'}
                          textTransform={'uppercase'}
                        >
                          Language
                        </CustomTypography>
                        <CustomSelectMain>
                          <LabelMainDiv>
                            <LabelSelectText onClick={handleClick}>
                              <CustomTypography
                                variant={'white'}
                                component={'body2'}
                                textTransform={'uppercase'}
                              >
                                {selectedOption}
                              </CustomTypography>
                              <CustomSelectIcon />
                            </LabelSelectText>
                          </LabelMainDiv>
                          <CustomMenuMainDiv>
                            <CustomMenu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              {language.array.map((item) => {
                                return (
                                  <CustomMenuItem
                                    key={item.id}
                                    onClick={() => handleOptionSelect(item.text)}
                                  >
                                    {item.text}
                                  </CustomMenuItem>
                                );
                              })}
                            </CustomMenu>
                          </CustomMenuMainDiv>
                        </CustomSelectMain>
                      </Box>
                    </Box>
                  </Box>
              </Grid>
            </GridMain>
            : 
            <GridMain container>
              <GridItem1 item xs={12} md={6} lg={3}>
                <FooterMainText>ELEVATE QSTOCK COMMUNITY</FooterMainText>
                <CustomButton variant="white">BECOME OUR CONTRIBUTOR</CustomButton>
              </GridItem1>
              <GridItem2 item xs={12} md={6} lg={3}>
                <NavSectionHeading>{ourCompany.heading}</NavSectionHeading>
                {ourCompany.array.map((item) => {
                  return <NavSectionText key={item.id}>{item.text}</NavSectionText>;
                })}
              </GridItem2>
              <GridItem3 item xs={12} md={6} lg={3}>
                <NavSectionHeading>{legal.heading}</NavSectionHeading>
                {legal.array.map((item) => {
                  return <NavSectionText key={item.id}>{item.text}</NavSectionText>;
                })}
              </GridItem3>
              <GridItem4 item xs={12} md={6} lg={3}>
                <NavSectionHeading>{helpAndSupport.heading1}</NavSectionHeading>
                {helpAndSupport.array.map((item) => {
                  return <NavSectionText key={item.id}>{item.text}</NavSectionText>;
                })}
                <p
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: 500,
                    marginTop: 32,
                    marginBottom: 24,
                  }}
                >
                  LANGUAGE
                </p>
                <CustomSelectMain>
                  <LabelMainDiv>
                    <LabelSelectText onClick={handleClick}>
                      {selectedOption}
                      <CustomSelectIcon />
                    </LabelSelectText>
                  </LabelMainDiv>
                  <CustomMenuMainDiv>
                    <CustomMenu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {language.array.map((item) => {
                        return (
                          <CustomMenuItem
                            key={item.id}
                            onClick={() => handleOptionSelect(item.text)}
                          >
                            {item.text}
                          </CustomMenuItem>
                        );
                      })}
                    </CustomMenu>
                  </CustomMenuMainDiv>
                </CustomSelectMain>
              </GridItem4>
            </GridMain>
        }
        {/* Below section */}
        <Border>
          <Divider style={{ background: "grey" }} />
        </Border>
        <BelowSectionMain>
          <BelowSectionText>&copy; 2023 GSTOCK</BelowSectionText>
          <BelowSectionSocial>
            {socialIcons.map((item) => {
              return <SocialIcon key={item.id}>{item.icon}</SocialIcon>;
            })}
          </BelowSectionSocial>
        </BelowSectionMain>
      </MainDiv>
    </Main>

    // Customizable Area End
  );
};

// Customizable Area Start
export default Footer;
// Customizable Area End