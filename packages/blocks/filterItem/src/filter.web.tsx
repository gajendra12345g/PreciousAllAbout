import React from "react";
// Customizable Area Start
import CustomFilters from "../../../components/src/DesignSystem/CustomFilters/CustomFilters.web";
// Customizable Area End

import FilteroptionsController, {
  Props,
  configJSON
} from "./FilteroptionsController";

export default class Filteroptions extends FilteroptionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <div>
        <CustomFilters 
          testID="filters" 
          data={this.state.filterData} 
          checkboxes={this.props.checkboxes}
          handleCheckboxChange={this.props.handleCheckboxChange}
        />
      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
