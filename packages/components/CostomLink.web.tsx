import React from 'react';

import { Link } from "@material-ui/core";

const preventDefault = (event: any) => event.preventDefault();

const CustomLink = (props: any) => {
    return (
        <Link 
            href={props.url} 
            onClick={preventDefault}
            style={{
                width: '100%',
                fontSize: props.fontSize ? props.fontSize : '12px',
                color: props.color ? props.color : '#000',
                textAlign: props.align ? props.align : 'left',
                textDecoration: props.underline ? 'underline' : ''
            }}
        >
            {props.label}
        </Link>
    )
}

export default CustomLink;