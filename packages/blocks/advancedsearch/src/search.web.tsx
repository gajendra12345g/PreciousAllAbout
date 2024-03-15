import React from "react";
// Customizable Area Start
import { createTheme } from "@material-ui/core/styles";
import CustomSearch from "../../../components/src/DesignSystem/CustomSearch/CustomSearch.web";
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

import SearchController, { Props } from "./SearchController.web";

export default class Search extends SearchController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
  
    return (
      <>
        <div>
            <CustomSearch 
                searchList={this.state.searchList}
                searchChange={(value: any) => this.searchChange(value)}
                clickSuggesion={(value: any) => this.moveToSearch(value)}
                testID={'customSearch'}
                startIcon={this.props.startIcon ? true : false}
                endIcon={this.props.endIcon ? true : false}
                dropDown={this.props.dropDown ? true : false}
                dropDownPosition={this.props.dropDownPosition ? this.props.dropDownPosition : 'end'}
                variant={this.props.variant}
                searchValue={this.props.searchQuery}
                requestSearch={this.props.requestSearch}
                setSearchType={this.props.setSearchType}
            />
        </div>
      </>

      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {
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
  }
}
// Customizable Area End
