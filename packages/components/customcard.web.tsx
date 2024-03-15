import React from "react";


const CustomCard = (props: any) => {
    const {variant="card"} = props 
    const cardStyles: any = {
        ...styles[variant],
    };

    return(
        <div
            style={cardStyles}
        >
            {props.children}
        </div>
    )       
}

const styles: any = {
    card: {
        background: '#fff',
        borderRadius: '0px'
    },
    withBorder:{
        border: "2px solid #BFC2C3",
        padding:"42px 19px",
        heigth:295,
        width:295
    }
}

export default CustomCard