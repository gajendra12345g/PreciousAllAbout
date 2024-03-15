import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import customTheme  from '../../../src/DesignSystem/Theme/Theme.web';


const CustomButton = (props: any) => {

    const btnStyles: any = {
        ...styles[props.variant ? props.variant : 'primary'],
        ...styles[props.fullWidth ? props.fullWidth : ''],
        ...styles[props.size ? props.size : 'medium']
    };

    const disabledBtnStyles: any = {
        ...disabledStyles[props.variant ? props.variant : 'primary'],
        ...styles[props.fullWidth ? props.fullWidth : ''],
        ...styles[props.size ? props.size : 'medium']
    };

    const tertiaryBtnStyles: any = {
        ...tertiaryStyles[props.variant ? props.variant : 'tertiary'],
        ...tertiaryStyles[props.size ? props.size : 'medium']
    }

    const disabledTertiaryBtnStyles: any = {
        ...disabledTertiaryStyles[props.variant],
        ...disabledTertiaryStyles[props.size ? props.size : 'medium']
    }

    const startIconStyles: any = {
        ...styles['marginRight'],
        ...iconVariants[props.size]
    }

    const endIconStyles: any = {
        ...styles['marginLeft'],
        ...iconVariants[props.size]
    }

    const onlyIconStyles: any = {
        ...iconVariants[props.size]
    }

    const loaderIconStyle: any = {
        ...iconVariants[props.size],
        ...iconVariants[props.variant]
    }

    const endLoaderIconStyle: any = {
        ...styles['marginLeft'],
        ...iconVariants[props.size],
        ...iconVariants[props.variant]
    }

    const getTextBtn = () => {
        switch (props.variant) {
            case "tertiary":
            case "tertiarySecondary":
            case "tertiaryWithoutBorder":
            case "tertiarySecondaryWithoutBorder":
              return true; 
            default:
              return false; 
        }
    }
    return  (
        <div>
            {
                getTextBtn() ?
                    <button 
                        style={props.disabled ? disabledTertiaryBtnStyles  : tertiaryBtnStyles}
                        onClick={props.onClick}
                        disabled={props.disabled}
                        type={props.type}
                    >
                        
                        {
                            props.onlyIcon ?
                                props.loading ?
                                    <CircularProgress style={loaderIconStyle}/>
                                :   React.cloneElement(props.onlyIcon, { style: onlyIconStyles })
                            :
                                <>
                                    {
                                        <>
                                            {props.startIcon && React.cloneElement(props.startIcon, { style: startIconStyles })}
                                            {props.children}
                                            {
                                                props.loading ?
                                                    <CircularProgress style={endLoaderIconStyle}/>
                                                : props.endIcon && React.cloneElement(props.endIcon, { style: endIconStyles })
                                            }
                                        </>
                                    }
                                </>
                        }
                    </button>
                :
                <button 
                    style={props.disabled ? disabledBtnStyles : btnStyles}
                    onClick={props.onClick}
                    disabled={props.disabled}
                    type={props.type}
                >
                    
                    {
                        props.onlyIcon ?
                            props.loading ?
                                <CircularProgress style={loaderIconStyle}/>
                            :   React.cloneElement(props.onlyIcon, { style: onlyIconStyles })
                        :
                            <>
                                {
                                    <>
                                        {props.startIcon && React.cloneElement(props.startIcon, { style: startIconStyles })}
                                        {props.children}
                                        {
                                            props.loading ?
                                                <CircularProgress style={endLoaderIconStyle}/>
                                            : props.endIcon && React.cloneElement(props.endIcon, { style: endIconStyles })
                                        }
                                    </>
                                }
                            </>
                    }
                </button>
            }
        </div>
    )
}

const styles: any = {
    primary: {
        background: customTheme.palette.primary.main,
        border: `1px solid ${customTheme.palette.primary.main}`,
        color: customTheme.palette.white.main,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    secondary: {
        background: '#fff',
        border: `1px solid ${customTheme.palette.primary.dark}`,
        color: customTheme.palette.primary.dark,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    blue: {
        background: '#fff',
        border: `1px solid ${customTheme.palette.grey.secondary}`,
        color: customTheme.palette.blue.secondary,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    grey: {
        background: '#fff',
        border: `1px solid ${customTheme.palette.secondary.light}`,
        color: customTheme.palette.secondary.main,
        textTransform: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    red: {
        background: customTheme.palette.red.main,
        border: `1px solid ${customTheme.palette.red.main}`,
        color: customTheme.palette.white.main,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    white: {
        background: customTheme.palette.white.main,
        border: `1px solid ${customTheme.palette.white.main}`,
        color: customTheme.palette.primary.main,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    secondaryWithoutBorder: {
        background: '#fff',
        border: 'none',
        color: customTheme.palette.primary.dark,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    secondaryWithoutBorderGrey: {
        background: customTheme.palette.white.light,
        border: 'none',
        color: customTheme.palette.primary.dark,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    darkInverted: {
        background: customTheme.palette.white.main,
        border: `1px solid ${customTheme.palette.white.main}`,
        color: customTheme.palette.purple.main,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    blueWhiteText: {
        background: customTheme.palette.blue.main,
        border: `1px solid ${customTheme.palette.blue.main}`,
        color: customTheme.palette.white.main,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    whiteBgRedText: {
        background: customTheme.palette.white.main,
        border: `1px solid ${customTheme.palette.secondary.light}`,
        color: customTheme.palette.red.main,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    fullWidth: {
        width: '100%'
    },
    medium: {
        height: '38px',
        fontSize: '10px',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
    },
    large: {
        height: '48px',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
    },
    largeButton: {
        fontSize: '14px',
        fontWeight: '500',
        height: '48px',
    },
    small: {
        height: '32px',
        fontSize: '10px',
        fontWeight: '500',
        fontFamily: 'LemonMilk'
    },
    marginRight: {
        marginRight: '10px'
    },
    marginLeft: {
        marginLeft: '10px'
    },
      nextDisableBtn:{
        border:"none",
        textTransform:"uppercase",
        fontSize:'14px',
        fontWeight:400,
        backgroundColor:customTheme.palette.secondary.main,
        color:customTheme.palette.secondary.light,
        padding:"0px 32px",
      },
      collectionBtn:{
        backgroundColor:customTheme.palette.blue.main,
        color:customTheme.palette.white.main,
        fontSize:"14px",
        textTransform:"uppercase",
        fontFamily:"LemonMilk",
        display:"flex",
        justifyContent:"space-evenly",
        alignItems:"center",
        border:"none",
        cursor:"pointer"
      },
      collectionContentBtn:{
        backgroundColor:customTheme.palette.blue.main,
        color:customTheme.palette.white.main,
        fontSize:"16px",
        border:"none",
        textTransform:"capitalize",
        fontWeight:400,
        fontFamily: "Outfit",
      },
      tertiarySecondaryWithBorder: {
        backgroundColor: customTheme.palette.disabled.main,
        border: 'none',
        color: customTheme.palette.primary.main,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:"16px",
        fontFamily:"Outfit",
        textTransform:"none"
    },
    paginationButton:{
        width:"24px",
        height:"24px",
        background:customTheme.palette.white.dark,
        border:"none",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    downloadBtn:{
        background: "#F3F4F4",
        fontSize: "14px !important",
        fontWeight: 400,
        fontFamily: "LemonMilk",
        color: "#000",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"12px 20px",
        border:"none"
      },
    couponsBtn:{
        border:"none",
        background:"#fff",
        textDecoration:"underline",
        fontWeight:"500",
        fontFamily:"LemonMilk",
        textAlign: "end",
         width: "100%"
    },
    couponsSize:{
        height: "28px",
        fontSize:"12px"
    },
    CommentButton:{  
        width:"116px",
        color:"#fff",
        background:`${customTheme.palette.secondary.main}`,
    },
    ReplyButton:{
        width:"116px",
        color:"#fff",
        background:`${customTheme.palette.blue.main}`,
    },
    largeBtn:{
        height:"48px",
        fontSize:"10px",
        fontWeight:500,
        fontFamily:"LemonMilk"  
    },
    loadMoreCommentBtn:{
        border:`1px solid ${customTheme.palette.shadow.main}`,
        width:"197px",
        color:`${customTheme.palette.secondary.main}`,
        background:"#fff",
        cursor:"pointer"
    }
}

const tertiaryStyles: any = {
    tertiary: {
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${customTheme.palette.primary.dark}`,
        color: customTheme.palette.primary.dark,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tertiarySecondary: {
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${customTheme.palette.primary.dark}`,
        color: customTheme.palette.white.main,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tertiaryWithoutBorder: {
        background: 'transparent',
        border: 'none',
        color: customTheme.palette.primary.dark,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tertiarySecondaryWithoutBorder: {
        background: 'transparent',
        border: 'none',
        color: customTheme.palette.white.main,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    medium: {
        fontSize: '12px',
        fontWeight: '500'
    },
    large: {
        fontSize: '14px',
        fontWeight: '500'
    },
    small: {
        fontSize: '10px',
        fontWeight: '500'
    },
    
}

const disabledTertiaryStyles: any = {
    tertiary: {
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${customTheme.palette.secondary.light}`,
        color: customTheme.palette.secondary.light,
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    medium: {
        fontSize: '12px',
        fontWeight: '500'
    },
    large: {
        fontSize: '14px',
        fontWeight: '500'
    },
    small: {
        fontSize: '10px',
        fontWeight: '500'
    },
    
}

const disabledStyles: any = {
    primary: {
        background: customTheme.palette.white.light,
        border: `1px solid ${customTheme.palette.white.light}`,
        color: customTheme.palette.secondary.main,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondary: {
        background: customTheme.palette.white.light,
        border: `1px solid ${customTheme.palette.white.light}`,
        color: customTheme.palette.secondary.main,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    darkInverted: {
        background: customTheme.palette.white.main,
        border: `1px solid ${customTheme.palette.secondary.main}`,
        color: customTheme.palette.primary.main,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const iconVariants: any = {
    primary: {
        color: customTheme.palette.white.main
    }, 
    secondary: {
        color: customTheme.palette.primary.dark
    },
    darkInverted: {
        color: customTheme.palette.purple.main
    },
    large: {
        height: '24px',
        width: '24px'
    },
    medium: {
        height: '18px',
        width: '18px'
    },
    small: {
        height: '18px',
        width: '18px'
    },
}

export default CustomButton