import React from "react";
// Customizable Area Start
import { StyleRules, withStyles } from "@material-ui/core/styles";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
// Customizable Area End

import HashtagsController, {
  Props,
  HashtagAttributes
} from "./HashtagsController.web";

export class Hashtags extends HashtagsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {classes} = this.props;
    return (
      <div>
        <div
          className={classes.tagWrap}
        >
          {
            this.props.hashTags && this.props.hashTags.length ? 
            this.props.hashTags.map((item: any) => {
              return(
                <div
                    className={classes.tag}
                >
                    <CustomTypography
                        variant='secondary'
                        component='body7'
                    >
                      { this.props.searchQuery && this.props.searchQuery.charAt(0)==="#" ? `#${item}`: item }
                    </CustomTypography>
                </div>
              )
            })
            : null
          }
        </div>
      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start

const webStyles: any = {
    tagWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        gap:"10px"
    },
    tag: {
        display: 'flex',
        height: '34px',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        background: '#eee',
        '&:first-child': {
          marginLeft: '0px', 
        }
    }
}
const styles: StyleRules = {
  root: {
    margin: '15px'
  },
  container: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px'
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '10px',
    margin: 0
  },
  chip: {
    margin: '10px',
  },
  autocomplete: {
    width: '400px'
  }
}

export default withStyles(webStyles)(Hashtags);
// Customizable Area End