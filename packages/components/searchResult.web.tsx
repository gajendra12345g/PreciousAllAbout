import * as React from "react";
// Customizable Area Start

import { CircularProgress, makeStyles, styled } from "@material-ui/core";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import  {downloadIcon, cartIcon, profileIcon} from './assets';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CustomTypography from "../CustomTypography/CustomTypography.web";
import InfiniteScroll from "react-infinite-scroll-component";


const CustomDiv = styled('div')({
  '& .infinite-scroll-component':{
    overflow: 'unset !important'
  }
})

const useStylesBootstrap = makeStyles((theme: any) => ({
  arrow: {
    color: '#fff',
  },
  tooltip: {
    backgroundColor: '#fff',
    borderRadius: 0,
    height: '32px',
    maxHeight: '32px',
    justifyCOntent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: '#000',
    fontSize: '10px',
    fontFamily: 'LemonMilk-Light'
  },
}));

function BootstrapTooltip(props: TooltipProps) {
  const classes = useStylesBootstrap();

  return <Tooltip placement={'left'} arrow classes={classes} {...props} />;
}
// Customizable Area End

interface ViewProps {
  testID: string;
  // Customizable Area Start
  navigation: any;
  searchQuery: string;
  fromPage: string;
  data: any;
  onBookmarkClick: any;
  isLoading?:any;
  hasMore?:any;
  fetchData?:()=>void;
  // Customizable Area End
}

const useStyles = makeStyles((theme) => ({
  resultWrap: {
    marginTop: '20px'
  },
  iconsWrap: {
    position:"absolute",
    right: 10,
    bottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    visibility: "hidden",
    '&:hover': {
      visibility: "visible",
    },
  },
  imgContainer: {
    cursor:'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&:hover img': {
      transform: 'scale(1.2)', 
    },
    '&:hover $overLay': {
      visibility: 'visible',
    },
    '&:hover + $iconsWrap': {
      visibility: 'visible',
    },
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.3s ease',
  },
  overLay: {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    transform: 'translate(-50%, -50%)',
    visibility: 'hidden',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  },
  tagWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  tag: {
    display: 'flex',
    height: '34px',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    background: '#eee',
    marginTop: '5px',
  },
  overlayContentWrap: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '10px'
  },
  overlayProfileWrap: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover $profileName': {
      display: 'block'
    }
  },
  profileCircle: {
    maxHeight: '32px',
    maxWidth: '32px',
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    overflow: 'hidden'
  },
  profileImg: {
    height: '100%',
    width: '100%'
  },
  profileName: {
    marginLeft: '10px',
    display: 'none'
  },
  marginBottom10: {
    marginBottom: '10px'
  },
  icon: {
    height: '40px',
    width: '40px',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  imgIcon: {
    height: '12px',
    width: '12px'
  },
  noData: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDataInt: {
    textAlign: 'left'
  }
}))

export const SearchResults: React.FC<ViewProps> = (
  {
    // Customizable Area Start
    navigation,
    searchQuery,
    data,
    fromPage,
    onBookmarkClick,
    isLoading,
    hasMore,
    fetchData,
    // Customizable Area End
  }
) => {
  // Customizable Area Start
  const classes = useStyles();
  const showImage=(image:any)=>{
    return(
      <>
{searchQuery && searchQuery.charAt(0) === '#' && image.attributes.category.attributes.images === null ? (
  ""
) : (
  <img
    src={searchQuery && searchQuery.charAt(0) === '#'  && image.attributes.category.attributes.image !== null ? image.attributes.category.attributes.images : image.attributes.images.url}
    alt="Your Image"
    className={classes.image}
  />
)}


      </>
    )
  }

  // Customizable Area End

  return (
    // Customizable Area Start
    <>
      <div>
        {isLoading && <CircularProgress size={20} color="inherit" />}
        {!isLoading && (
     <>
       <CustomDiv>
         <InfiniteScroll
           dataLength={data.length}
           next={fetchData || (() => {})}
           hasMore={hasMore}
           loader={<CircularProgress size={20} color="inherit"
           />}
         >
        {
          data.length ?
          <div
            className={classes.resultWrap}
          >
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
              >
                <Masonry
                  gutter="20px"
                >
                    {data.map((image: any, i: any) => {
                      console.log("image",)
                        return(
                          <>
                           {
                            image.attributes.images ?
                            <div style={{position:"relative"}}>
                            <div onClick={()=>navigation.navigate("ProductDescription", { id: (fromPage == "Favourites" ? image.attributes.catalogue_id : image.id )})} 
                            className={classes.imgContainer}>
                              {
                                image.attributes.images.type.split("/")[0] == 'image'?
                              showImage(image)   
                                : 
                                <video 
                                  className={classes.image} 
                                  controls={false}
                                >
                                  <source src={image.attributes.images.url} type={image.attributes.images.type} />
                                </video>
                              }
                              <div
                                className={classes.overLay}
                              >
                                <div
                                  className={classes.overlayContentWrap}
                                >
                                  <div
                                    className={classes.overlayProfileWrap}
                                  >
                                    <div
                                      className={classes.profileCircle}
                                    >
                                      { !image.attributes.account_profile_image ?
                                          <img 
                                            className={classes.profileImg}
                                            src={profileIcon}
                                          />
                                        :
                                          <img 
                                            className={classes.profileImg}
                                            src={image.attributes.account_profile_image == 'no image' ? profileIcon : image.attributes.account_profile_image}
                                          />
                                      }
                                    </div>
                                    <div
                                      className={classes.profileName}
                                    >
                                      <CustomTypography
                                        variant={'white'}
                                        component={'body'}
                                        textTransform={'uppercase'}
                                      >
                                        {image.attributes.account_full_name ? image.attributes.account_full_name : 'Anonymous'}
                                      </CustomTypography>
                                    </div>
                                  </div>
                                 
                                </div>
                              </div>
                            </div>
                            <div
                                    className={classes.iconsWrap}
                                  >
                                    <div
                                      onClick={() => onBookmarkClick(image.id)}
                                      className={classes.marginBottom10}
                                    >
                                      <BootstrapTooltip  title="Add to collection">
                                        <div
                                          className={classes.icon}
                                        >
                                          <BookmarkBorderIcon
                                             
                                            style={{
                                              color: '#fff'
                                            }}
                                            fontSize="small"
                                          />
                                        </div>
                                      </BootstrapTooltip>
                                    </div>
                                    <div
                                      className={classes.marginBottom10}
                                    >
                                      <BootstrapTooltip title="Add to cart">
                                        <div
                                          className={classes.icon}
                                        >
                                          <img 
                                            src={cartIcon}
                                            className={classes.imgIcon}
                                          />
                                        </div>
                                      </BootstrapTooltip>
                                    </div>
                                    <div>
                                      <BootstrapTooltip title="Download">
                                        <div
                                          className={classes.icon}
                                        >
                                          <img 
                                            src={downloadIcon}
                                            className={classes.imgIcon}
                                          />
                                        </div>
                                      </BootstrapTooltip>
                                    </div>
                            </div>
                            </div>
                            : null
                          } 
                          </>
                        )
                         
                        
                        })}
                </Masonry>
              </ResponsiveMasonry>
          </div>
          : <div
              className={classes.noData}
            >
              <div
                className={classes.noDataInt}
              >

                <CustomTypography
                  variant={'primary'}
                  component={'h6'}
                >
                { fromPage == "Favourites" ? `Sorry, you have not added any favourite item.` : `Sorry, we couldn't find any results for those filters.`} 
                </CustomTypography>
                <CustomTypography
                  variant={'secondary'}
                  component={'body3'}
                >
                {fromPage == "Favourites" ? `Try to add favourite item from product page.` : `Try removing a filter or changing your search query.`} 
                </CustomTypography>
              </div>
            </div>
        }
        </InfiniteScroll>
        </CustomDiv>
        </>
        )}
      </div>
    </>
    // Customizable Area End
  );
};

// Customizable Area Start

export default SearchResults;
// Customizable Area End

