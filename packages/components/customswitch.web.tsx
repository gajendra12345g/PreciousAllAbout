import * as React from "react";
// Customizable Area Start

import { makeStyles } from "@material-ui/core";
import Label from "../Label/Label.web";


const tagData = [
    {
        id: 1,
        title: '28,989 images found'
    },
    {
        id: 2,
        title: 'Forest HD wallpapers'
    },
    {
        id: 3,
        title: 'Tree Images'
    },
    {
        id: 4,
        title: 'Forest'
    }
]
// Customizable Area End

interface ViewProps {
  testID: string;
  // Customizable Area Start

  // Customizable Area End
}


const useStyles = makeStyles((theme) => ({
    tagWrap: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    tag: {
        display: 'flex',
        height: '34px',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        background: '#eee',
        marginLeft: '20px',
        marginTop: '10px',
        '&:first-child': {
            marginLeft: '0px'
        }
    }
}))

export const CustomTags: React.FC<ViewProps> = (
  {
    // Customizable Area Start

    // Customizable Area End
  }
) => {
  // Customizable Area Start
  const classes = useStyles();
  
  // Customizable Area End

  return (
    // Customizable Area Start
    <>
      <div
        className={classes.tagWrap}
      >
        {
            tagData.map((item: any, i: any) => {
                return(
                    <div
                        key={i}
                        className={classes.tag}
                    >
                        <Label
                            variant='secondary'
                            weight='w500'
                            textTransform="none"
                            size='xl'
                        >
                            #{item.title}
                        </Label>
                    </div>
                )
            })
        }
      </div>
    </>
    // Customizable Area End
  );
};

// Customizable Area Start

export default CustomTags;
// Customizable Area End

