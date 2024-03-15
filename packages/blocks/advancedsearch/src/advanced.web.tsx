import React from "react";
// Customizable Area Start
import { Grid} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Header from "../../../components/src/DesignSystem/Header/Header.web";
import FilterBtn from '../../../components/src/DesignSystem/FilterBtn/FilterBtn.web';
import SearchResults from "../../../components/src/DesignSystem/SearchResult/SearchResults.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Search from '../../../blocks/advancedsearch/src/Search.web';
import Filteroptions from "../../../blocks/filteritems/src/Filteroptions.web";
import Hashtags from "../../../blocks/hashtags/src/Hashtags.web";
import Sorting from "../../../blocks/sorting/src/Sorting.web";
import {ArrowIcon} from "./assets";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
// Customizable Area End

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff"
    }
  }
});
// Customizable Area End

import AdvancedSearchController, { Props } from "./AdvancedSearchController";

export default class AdvancedSearch extends AdvancedSearchController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const classNameprops = "blackHeader"
    return (
      <>
        <Header testID={""} navigation={this.props.navigation} classNameProps={classNameprops} />
        <div
          style={webStyles.arrowBtn}
        >
          <CustomButton
            size={'large'}
            onlyIcon={<img src={ArrowIcon}  />}
            onClick={() => this.goToTop()}
            testID={'scrollToTop'}
          >
          </CustomButton>
        </div>
        <div
          style={
            this.state.isSmallScreen ? webStyles.searchHeaderWrapSmall : webStyles.searchHeaderWrap
          }
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              xl={2}
            >
              <FilterBtn 
                testID={"filterBtn"} 
                onClick={() => this.toggleFilter()}
              />
            </Grid>
            <Grid
              item
              xs={8}
              sm={8}
              md={8}
              xl={8}
            >
              <Search 
                navigation={this.props.navigation} 
                id='search' 
                startIcon={true}
                endIcon={false}
                dropDown={true}
                dropDownPosition={'end'}
                variant={'dark'}
                setSearchQuery={(val: string) => this.setSearchQuery(val)}
                searchQuery={this.state.searchQuery}
                testID='searchId'
                requestSearch={(val: string) => this.search(val)}
                setSearchType={(val: string) => this.setSearchType(val)}
              />
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              xl={2}
            >
              <CustomButton 
                variant='primary'
                fullWidth='fullWidth'
                size={'large'}
                testID='btnSearch'
                onClick={() => this.serchButton(this.state.searchQuery)}
              >
                SEARCH
              </CustomButton>
            </Grid>
          </Grid>
        </div>
        <div
          style={
            this.state.isSmallScreen ? webStyles.searchBodyWrapSmall : webStyles.searchBodyWrap
          }
        >
          <Grid
            container
            spacing={3}
          >
            {
              this.state.showHideFilter ?
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={2}
                  xl={2}
                >
                  <Filteroptions 
                    navigation={this.props.navigation}
                    id="filters"
                    checkboxes={this.state.checkboxes}
                    data-test-id="handleCheckboxChange"
                    handleCheckboxChange={this.handleCheckboxChange}
                  />
                </Grid>
              : null
            }
            <Grid
              item
              xs={12}
              sm={this.state.showHideFilter ? 8 : 12}
              md={this.state.showHideFilter ? 10 : 12}
              xl={this.state.showHideFilter ? 10 : 12}
            >
              {
                this.state.searchQuery && this.state.searchResult.length ?
                  <div>
                    <div
                      style={webStyles.searchStringWrap}
                    >
                      <CustomTypography
                        variant='primary'
                        component='body2'
                      >
                        Royalty-Free-Images
                      </CustomTypography>
                    </div>
                    <Grid
                      container
                      spacing={2}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={10}
                        lg={10}
                      >
                        <div
                          style={webStyles.tags}
                        >
                          <Hashtags 
                            navigation={this.props.navigation} 
                            id="tags" 
                            hashTags={this.state.hashTags}
                            searchQuery={this.state.searchQuery}
                          /> 
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={2}
                        lg={2}
                      >
                        <Sorting  
                          navigation={this.props.navigation} 
                          id="sorting" 
                          setSort={(val: string) => this.setSortedVal(val)}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  : null
              }
              <SearchResults 
                testID={"results"}
                navigation={this.props.navigation}
                searchQuery={this.state.searchQuery}
                data={this.state.searchResult}
                onBookmarkClick={() => { } } 
                fromPage={"AdvanceSearch"}     
                isLoading={this.state.isLoading}    
                fetchData={this.fetchData}   
                hasMore={this.state.hasMore}  
                data-test-id="fetchData"  
                
                />
            </Grid>
          </Grid>
        </div>
      </>

      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles: any = {
  searchHeaderWrap: {
    marginTop: '40px',
    paddingLeft: '70px',
    paddingRight: '70px'
  },
  searchHeaderWrapSmall: {
    marginTop: '40px',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  searchBodyWrap: {
    marginTop: '20px',
    paddingLeft: '70px',
    paddingRight: '70px'
  },
  searchBodyWrapSmall: {
    marginTop: '20px',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  searchStringWrap: {
    display: 'flex'
  },
  tags: {
    marginTop: '10px'
  },
  arrowBtn: {
    right: '40px',
    bottom: '40px',
    zIndex: 99,
    position: 'fixed',
  }
}
// Customizable Area End
