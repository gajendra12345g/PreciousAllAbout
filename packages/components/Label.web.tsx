import React from 'react';


const Label = (props: any) => {
    
    const textStyles: any = {
        ...styles[props.variant],
        ...styles[props.weight],
        ...styles[`text_${props.textTransform}`],
        ...styles[props.marginTop],
        ...styles[props.size]
    };

    return <div style={textStyles}>{props.children}</div>;
}

const styles: any = {
    basicBlack: {
        color: '#000'
    },
    white: {
        color: '#fff'
    },
    primary: {
        color: '#0E0F17',
    },
    primaryDark: {
        color: '#000'
    },
    secondary: {
        color: '#73767A'
    },
    xxl: {
        fontSize: '18px'
    },
    xl: {
        fontSize: '14px'
    },
    l: {
        fontSize: '12px'
    },
    s: {
        fontSize: '10px'
    },
    xs: {
        fontSize: '8px'
    },
    textAlign_center: { 
        textAlign: 'center'
    },
    textAlign_left: { 
        textAlign: 'left'
    },
    textAlign_right: { 
        textAlign: 'right' 
    },
    textAlign_auto: { 
        textAlign: 'auto' 
    },
    text_capitalize: { 
        textTransform: 'capitalize' 
    },
    text_lowercase: { 
        textTransform: 'lowercase' 
    },
    text_none: { 
        textTransform: 'none' 
    },
    text_uppercase: { 
        textTransform: 'uppercase' 
    },
    bold: {
        fontWeight: 'bold'
    },
    w100: {
        fontWeight: 100
    },
    w300: {
        fontWeight: 300
    },
    w400: {
        fontWeight: 400
    },
    w500: {
        fontWeight: 500
    },
    w600: {
        fontWeight: 600
    },
    w700: {
        fontWeight: 700
    },
    light: {
        fontWeight: 'light'
    },
    mt5: {
        marginTop: '5px'
    },
    mt10: {
        marginTop: '10px'
    },
    mt15: {
        marginTop: '15px'
    },
    mt20: {
        marginTop: '20px'
    }
}

export default Label;