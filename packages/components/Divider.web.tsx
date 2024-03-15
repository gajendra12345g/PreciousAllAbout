import React from 'react';


const Divider = (props: any) => {
    return (
        <div 
            style={{
                minWidth: props.width,
                minHeight: props.height,
                background: props.color,
                paddingRight: '10px',
                paddingLeft: '10px'
            }}
        ></div>
    )
}

export default Divider;