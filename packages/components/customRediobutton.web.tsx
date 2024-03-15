import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio, { RadioProps } from "@material-ui/core/Radio";

const CustomRadioButton = withStyles({
    root: {
      color: "black",
      "&$checked": {
        color: "black"
      }
    },
    checked: {}
  })((props: RadioProps) => <Radio color="default" {...props} />);

  export default CustomRadioButton
