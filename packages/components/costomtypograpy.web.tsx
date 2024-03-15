import React from "react";
import customTheme from "../../../src/DesignSystem/Theme/Theme.web";


const CustomTypography = (props: any) => {

    const typoStyles: any = {
        ...styles[props.variant],
        ...styles[props.component ? props.component : 'body3'],
        // ...styles[props.weight ? props.weight : 'light'],
        ...styles[`text_${props.textTransform}`]
    }

    return(
        <div>
            <span
                style={typoStyles}
                className="label"
            >
                {props.children}
            </span>
        </div>
    )
}

const styles: any = {
    primary: {
        color: customTheme.palette.primary.main
    },
    secondary: {
        color: customTheme.palette.secondary.main
    },
    white: {
        color: customTheme.palette.white.main
    },
    red:{
        color:customTheme.palette.red.main
    },
    blue:{
        color:customTheme.palette.blue.main
    },
    success:{
        color:customTheme.palette.success.main
    },
    h1: {
        fontSize: '48px',
        lineHeight: '56px',
        fontWeight: '700',
        fontFamily: 'LemonMilk'
    },
    h2: {
        fontSize: '36px',
        lineHeight: '44px',
        fontWeight: '700',
        fontFamily: 'LemonMilk'
    },
    h3: {
        fontSize: '30px',
        lineHeight: '40px',
        fontWeight: '700',
        fontFamily: 'LemonMilk'
    },
    h4: {
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '700',
        fontFamily: 'LemonMilk'
    },
    h5: {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '700',
        fontFamily: 'LemonMilk'
    },
    h6: {
        fontSize: '18px',
        lineHeight: '26px',
        fontWeight: '700',
        fontFamily: 'LemonMilk'
    },
    h7:{
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
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
        fontFamily: 'LemonMilk'
    },
    title2: {
        fontSize: '24px',
        lineHeight: '26px',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
    },
    subTitle: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '700',
        fontFamily: 'LemonMilk'
    },
    subTitle2: {
        fontSize: '14px',
        lineHeight: '22px',
        fontWeight: '700',
        fontFamily: 'LemonMilk'
    },
    para: {
        fontSize: '12px',
        lineHeight: '15px',
        fontFamily: 'LemonMilk'
    },
    body: {
        fontSize: '10px',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
    },
    body1: {
        fontSize: '18px',
        fontWeight: '400',
        lineHeight: '26px',
        fontFamily: 'LemonMilk'
    },
    body2: {
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        fontFamily: 'LemonMilk'
    },
    body3: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        fontFamily: 'LemonMilk'
    },
    body4: {
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '20px',
        fontFamily: 'LemonMilk'
    },
    body5:{
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '24px',
        fontFamily: 'LemonMilk'
    },
    body6: {
        fontSize: '12px',
        fontWeight: '500',
        lineHeight: '20px',
        fontFamily: 'LemonMilk',
    },
    body7: {
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '20px',
        fontFamily: 'LemonMilk',
    },
    body11:{
        fontSize: '16px',
        fontWeight: '400',
        fontFamily: 'Outfit',
        lineHeight:"28px"
    }, 
    body12:{
        fontSize: '14px',
        fontWeight: '400',
        fontFamily: 'Outfit',
        lineHeight:"22px"
    },
    body8: {
        fontSize: "14px",
        fontWeight: 400,
        fontFamily:"Outfit",
        lineBreak: "anywhere",
    },
    body9: {
        fontSize: "14px",
        fontWeight: 400,
        fontFamily:"lemonMilk",
        lineBreak: "anywhere",
    }, 
    body10: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        fontFamily: 'Outfit',
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
    text_decoration:{
        textDecoration:"underline"
    },
    heading:{
        fontSize: '24px',
        fontWeight: '500',
        lineHeight: 'normal',
        fontFamily: "Outfit"
    },
    label:{
        fontSize: '10px',
        fontWeight: '300',
        lineHeight: 'normal',
        fontFamily: "LemonMilk"
    },
    outlineBody2: {
        fontSize: '16px',
        fontWeight: '400',
        fontFamily: 'LemonMilk'
    },
    header1:{
        fontSize: '20px',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
    },
    outfitBody2:{
        fontSize: '16px',
        fontWeight: '400',
        fontFamily: 'Outfit-Light'
    },
    outfitBody3:{
        fontSize: '12px',
        fontWeight: '400',
        fontFamily: 'Outfit-Light'
    },
    outfitBody:{
        fontSize: '10px',
        fontWeight: '400',
        fontFamily: 'Outfit'
    },
    outfitBody4: {
        fontSize: '24px',
        lineHeight: '26px',
        fontWeight: '500',
        fontFamily: 'Outfit-Bold'
    },
    outfitBody5:{
        fontSize: '14px',
        fontWeight: '400',
        fontFamily: "Outfit-Light",
    },
    heading2:{
        fontSize: '2rem',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
    },
    labelOutfit1:{
        fontSize: '20px',
        fontWeight: '400',
        fontFamily: 'Outfit-Bold',
    },
    outfitHeading1:{
        fontSize: '32px',
        fontWeight: '400',
        fontFamily: 'Outfit'
    },
    outfitHeading2:{
        fontSize: '32px',
        fontWeight: '500',
        fontFamily: 'Outfit'
    },
    outfitBody7:{
        fontSize: '12px',
        fontWeight: '400',
        fontFamily: 'lemonMilk',
        fontStyle:"normal",
        lineHeight:"normal",
        color:"#73767A"
    },
    outfitBody6:{
        fontSize: '12px',
        fontWeight: '400',
        fontFamily: 'Outfit',
        fontStyle:"normal",
        lineHeight:"normal",
    },
    outfitBody1:{
       fontSize: '16px',
       fontFamily:"Outfit-Bold",
       fontStyle:"normal",
       fontWeight:400,
       lineHeight:"normal"
    },
    outfitHeading3:{
        fontSize: '32px',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
    },
    outfitHeading5:{
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: "Outfit-Light",
            lineHeight:"30px",
            wordWrap:"anywhere"
        },
    needHelp:{
        color:"#73767A",
        fontSize:"16px",
        textDecoration:"underline",
        display:"flex",
        gap:"20px",
        justifyContent:"flex-end",
    },
    selectMultitext:{
        color:"#73767A",
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '24px',
        fontFamily: "Outfit-Light",
    },
    contentfEature:{
        color:"#73767A",
        fontSize: '14px',
        fontWeight: '400',
        fontFamily: "Outfit-Light",
    },
    bannerText:{
        fontSize: '14px',
        fontWeight: '400',
        fontFamily: "Outfit-Bold",
    },
    font_color:{
        color:"#73767A"
    },
    font_family:{
        fontFamily: "Outfit-Bold",
    }
    
}

export default CustomTypography