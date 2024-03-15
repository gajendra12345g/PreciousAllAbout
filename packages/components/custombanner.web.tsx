import React from "react";


const CustomBanner = (props: any) => {

    const bannerStyle: any = {
        background: `url(${props.backgroundImage}) center/cover no-repeat`,
        height: props.variant === 'medium' ? '450px' : '550px',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={bannerStyle}>
            {props.children}
        </div>
    )

}

export default CustomBanner