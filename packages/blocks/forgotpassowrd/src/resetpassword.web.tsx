import React from "react";

//Customizable Area Start
import ResetPasswordController, { Props } from "./ResetPasswordController.web";
import CustomCard from "../../../components/src/DesignSystem/CustomCard/CustomCard.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import Divider from "../../../components/src/DesignSystem/Divider/Divider.web";
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import Header from "../../../components/src/DesignSystem/Header/Header.web";
import PasswordStrength from "../../../components/src/DesignSystem/PasswordStrength/PasswordStrength.web";
import Alert from "../../../components/src/Alert/Alert.web";
//Customizable Area End

export default class ResetPassword extends ResetPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    //Customizable Area Start
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
                this.state.error ?
                <Alert
                    variant={'error'}
                >
                    {this.state.errorText}
                </Alert>
                : null
            }
            <div
                style={webStyles.mainWrap}
            >
                <div
                    style={webStyles.cardMainWrap}
                >
                    <CustomCard>
                        <div
                            style={webStyles.cardInnerWrap}
                        >
                            <div
                                style={webStyles.cardLabel}
                            >
                                <CustomTypography
                                    variant={'primary'}
                                    component={'subtitle2'}
                                    textTransform={'uppercase'}
                                >
                                    Reset password
                                </CustomTypography>
                            </div>
                            <div
                                style={webStyles.divideWrap}
                            >
                                <Divider 
                                    variant='primary'
                                />
                            </div>
                            <div
                                style={webStyles.textFieldWrap}
                            >
                                <Input 
                                    label="Enter Email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={this.state.emailInputError}
                                    helperText={this.state.emailHelperText}
                                    type='text'
                                    name='email'
                                    required
                                    testId='txtInputEmail'
                                />
                            </div>
                            <div
                                style={webStyles.textFieldWrap}
                            >
                                <Input 
                                    label="New Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={this.state.passwordError}
                                    helperText={this.state.passwordHelperText}
                                    type='password'
                                    name='password'
                                    required
                                    testId='txtInputPwd'
                                />
                            </div>
                            <div
                                style={webStyles.textFieldWrap}
                            >
                                <Input 
                                    label="Confirm Password"
                                    value={this.state.confirmPwd}
                                    onChange={this.handleChange}
                                    error={this.state.confirmPwdError}
                                    helperText={this.state.confirmPwdHelperText}
                                    type='password'
                                    name='confirmPwd'
                                    required
                                    testId='confirmPwd'
                                />
                            </div>
                            {
                                this.state.password ?
                                <div
                                    style={webStyles.mt15}
                                >
                                    <PasswordStrength 
                                        variant={'secondary'}
                                        password={this.state.password}
                                        confirmPwd={this.state.confirmPwd}
                                    />
                                </div>
                                : null
                            }
                            <div
                                style={
                                    webStyles.mt15
                                }
                            >
                                <CustomButton
                                    onClick={() => this.resetPwd()}
                                    variant='primary'
                                    fullWidth='fullWidth'
                                    size={'large'}
                                    testId='btnResetPwd'
                                    disabled={this.state.disabled}
                                    loading={this.state.loading}
                                >
                                    Reset Password
                                </CustomButton>
                            </div>
                        </div>
                    </CustomCard>
                </div>
            </div>
        </div>
        //Customizable Area End
    );
  }
}

//Customizable Area Start
const webStyles : any = {
    mainWrap: {
        minHeight: '100%',
        height: 'auto',
        width: '100%',
        background: '#f3f4f4',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardMainWrap: {
        minHeight: '367px',
    },
    cardInnerWrap: {
        padding: '30px',
        width: '568px',
        minHeight: '367px',
        maxHeight: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginTop: '64px',
        marginBottom: '50px'
    },
    cardLabel: {
        display: 'flex',
        justifyContent: 'center'
    },
    divideWrap: {
        overflow: 'hidden'
    },
    textFieldWrap: {
        marginTop: '30px'
    },
    mt15: {
        marginTop: '15px'
    }
}
//Customizable Area End
