import React from 'react';

import { Link } from "@material-ui/core";
import CustomTheme from '../Theme/Theme.web';


const CustomLink = (props: any) => {
    const linkStyles: any = {
        ...styles[props.variant ? props.variant : 'primary'],
        ...styles[props.underlined],
        ...styles[props.component ? props.component : 'body3'],
        // ...styles[props.weight ? props.weight : 'light'],
        ...styles[`text_${props.textTransform}`]
    }
    return (
        <Link 
            href={props.url} 
            style={linkStyles}
        >
            {props.children}
        </Link>
    )
}

const styles: any = {
    primary: {
        color: CustomTheme.palette.primary.main,
        cursor: 'pointer'
    },
    secondary: {
        color: CustomTheme.palette.secondary.main,
        cursor: 'pointer'
    },
    underlined: {
        textDecoration: 'underline'
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
    white: {
        color: CustomTheme.palette.white.main,
        cursor: 'pointer'
    },
    h1: {
        fontSize: '48px',
        lineHeight: '56px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    h2: {
        fontSize: '36px',
        lineHeight: '44px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    h3: {
        fontSize: '30px',
        lineHeight: '40px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    h4: {
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    h5: {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    h6: {
        fontSize: '18px',
        lineHeight: '26px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    semiLight: {
        fontWeight: '500'
    },
    light: {
        fontWeight: '400'
    },
    title: {
        fontSize: '18px',
        lineHeight: '26px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    subTitle: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    subTitle2: {
        fontSize: '14px',
        lineHeight: '22px',
        fontWeight: '700',
        fontFamily: 'LemonMilk-Bold'
    },
    para: {
        fontSize: '12px',
        lineHeight: '15px',
        fontFamily: 'LemonMilk-Regular'
    },
    body: {
        fontSize: '10px',
        fontWeight: '500',
        fontFamily: 'LemonMilk-Medium'
    },
    body1: {
        fontSize: '18px',
        fontWeight: '400',
        lineHeight: '26px',
        fontFamily: 'LemonMilk-Light'
    },
    body2: {
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        fontFamily: 'LemonMilk-Light'
    },
    body3: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px'
    },
    body4: {
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '20px',
        fontFamily: 'LemonMilk-Light'
    },
    heading:{
        fontSize: '24px',
        fontWeight: '500',
        lineHeight: 'normal',
        fontFamily: "Outfit"
    }
}

export default CustomLink;