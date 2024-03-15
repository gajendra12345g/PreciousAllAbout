import React from "react";

//Customizable Area Start
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";
import Header from "../../../components/src/DesignSystem/Header/Header.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import { Grid } from "@material-ui/core";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Alert from "../../../components/src/Alert/Alert.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import { mailboxIcon } from "./assets"
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    //Customizable Area Start
    const {
        disabled,
        loading,
        error,
        errorText,
        mailSent,
        email,
        emailHelperText,
        emailInputError
    } = this.state;
    //Customizable Area End
    return (
        //Customizable Area Start
        <div>
            <Header 
                testID='header'
                navigation=''
                classNameProps={''}
            />
            {
                error ?
                <Alert
                    variant={'error'}
                >
                    {errorText}
                </Alert>
                : null
            }
            {
                mailSent ?
                    <div
                        style={webStyles.msgWrapper}
                    >
                        <div
                            style={webStyles.iconWrap}
                        >
                            <img 
                                src={mailboxIcon} 
                                style={webStyles.icon}
                            />
                        </div>
                        <div
                            style={webStyles.mt15}
                        >
                            <CustomTypography
                                variant={'primary'}
                                component={'h5'}
                                textTransform={'uppercase'}
                                weight='semiLight'
                            >
                                CHECK YOUR EMAIL
                            </CustomTypography>
                        </div>
                        <div
                            style={webStyles.mt15}
                        >
                            <CustomTypography
                                variant={'secondary'}
                                component={'h5'}
                                textTransform={'none'}
                                weight='light'
                            >
                                Please check your email for a link to reset your password.
                            </CustomTypography>
                        </div>
                    </div>
                :
                <div
                    style={webStyles.parentWrap}
                >
                    <div
                        style={webStyles.cardWrap}
                    >
                        <CustomCard>
                            <div
                                style={webStyles.cardInnerWrap}
                            >
                                <div
                                    style={webStyles.cardHead}
                                >
                                    <CustomTypography
                                        variant={'primary'}
                                        component={'subtitle2'}
                                        textTransform={'uppercase'}
                                    >
                                        Recover your password
                                    </CustomTypography>
                                </div>
                                <div
                                    style={webStyles.dividerWrap}
                                >
                                    <Divider 
                                        variant='primary'
                                    />
                                </div>
                                <div
                                    style={webStyles.descWrap}
                                >
                                    <CustomTypography
                                        variant='secondary'
                                        component={'body2'}
                                        textTransform={'none'}
                                    >
                                        Please provide your email address, and we will send you a link to reset your password.
                                    </CustomTypography>
                                </div>
                                <div
                                    style={webStyles.inputWrap}
                                >
                                    <Input 
                                        label="Email"
                                        value={email}
                                        onChange={this.handleChange}
                                        error={emailInputError}
                                        helperText={emailHelperText}
                                        type='text'
                                        name='email'
                                        required
                                        testId='txtInputEmail'
                                    />
                                </div>
                                <div>
                                    <Grid
                                        container
                                        spacing={2}
                                    >
                                        <Grid
                                            item
                                            sm={6}
                                            md={6}
                                            xs={12}
                                        >
                                            <CustomButton
                                                variant='secondary'
                                                fullWidth='fullWidth'
                                                size={'large'}
                                                onClick={() => this.cancelPwdReset()}
                                                testID='cancelBtn'
                                            >
                                                Cancel
                                            </CustomButton>
                                        </Grid>
                                        <Grid
                                            item
                                            sm={6}
                                            md={6}
                                            xs={12}
                                        >
                                            <CustomButton
                                                onClick={() => this.sendLink()}
                                                variant='primary'
                                                fullWidth='fullWidth'
                                                size={'large'}
                                                testId='btnSendLink'
                                                disabled={disabled}
                                                loading={loading}
                                            >
                                                Send Link
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </CustomCard>
                    </div>
                </div>
            }
        </div>
        //Customizable Area End
    );
  }
}

//Customizable Area Start
const webStyles : any = {
    parentWrap: {
        minHeight: '100%',
        height: 'calc(100vh - 64px)',
        width: '100%',
        background: '#f3f4f4',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardWrap: {
        // width: '568px',
        minHeight: '367px',
    },
    cardInnerWrap: {
        padding: '30px',
        maxWidth: '568px',
        minHeight: '367px',
        maxHeight: '367px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    cardHead: {
        display: 'flex',
        justifyContent: 'center'
    },
    dividerWrap: {
        overflow: 'hidden'
    },
    descWrap: {
        marginTop: '30px'
    },
    inputWrap: {
        marginTop: '30px'
    },
    msgWrapper: {
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    iconWrap: {
        height: '144px',
        width: '144px'
    },
    icon: {
        height: '100%',
        width: '100%'
    },
    mt15: {
        marginTop: '15px'
    }
}
//Customizable Area End
