import React from "react";
import {
    Grid
} from "@material-ui/core";


const CustomImageTextLayout = (props: any) => {
    const direction = props.direction === 'rtl' ? 'row-reverse' : 'row';
    return (
        <div>
            {
                <Grid container spacing={5} direction={direction}>
                    <Grid
                        item
                        lg={6}
                        xl={6}
                        md={6}
                        sm={12}
                        xs={12}
                    >
                        <img 
                            src={props.imgUrl}
                            style={styles.img}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        xl={6}
                        md={6}
                        sm={12}
                        xs={12}
                    >
                        <div
                            style={styles.textWrap}
                        >
                            {props.children}
                        </div>
                    </Grid>
                </Grid>
            }
        </div>
    )

}

export default CustomImageTextLayout

const styles: any = {
    mainWrap: {
        height: '360px',
        width: 'auto'
    },
    img: {
        height: '100%',
        width: '100%'
    },
    textWrap: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        flexDirection: 'column'
    }
}