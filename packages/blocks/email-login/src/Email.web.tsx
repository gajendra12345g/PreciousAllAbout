import React from "react";

// Customizable Area Start
import { createTheme } from "@material-ui/core/styles";
import Input from '../../../components/src/DesignSystem/Input/Input.web';
import CustomButton from '../../../components/src/DesignSystem/CustomButton/CustomButton.web';
import Link from '../../../components/src/DesignSystem/Link/Link.web';
import DividerWithOr from "../../../components/src/DesignSystem/DividerWithOr/DividerWithOr.web";
import Alert from "../../../components/src/Alert/Alert.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
import {appleIcon, instaIcon} from "./assets";
import SocialMediaAccountLogin from "../../social-media-account/src/SocialMediaAccountLogin";
import {
  Box 
} from "@material-ui/core";



const webStyle: any = {
  linkWrap: {
    textAlign: 'right',
    paddingTop: '10px'
  },
  loginBtn: {
    marginTop: '20px'
  },
  btmLinkWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px'
  },
  joinLink: {
    marginLeft: '5px'
  },
  container: {
    padding: '0px',
    paddingBottom: '40px',
    paddingLeft: '0px',
    paddingRight: '0px',
    textAlign: 'center',
    overflowX: 'hidden',
    '@media (max-width: 600px)': {
      padding: '20px',
      paddingLeft: '0px',
      paddingRight: '0px',
      textAlign: 'center',
      overflowX: 'hidden',
    },
  },
  dividerWrap: {
    overflow: 'hidden', 
    marginTop: '40px', 
    // marginBottom: '20px'
  },
  socialIcon: {
    marginRight: '10px'
  }
};
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class EmailAccountLoginBlock extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}
 // Customizable Area Start
 // Customizable Area End
  render() {
    return (
       // Customizable Area Start
      // Required for all blocks
      <div>
        <div
          id={'wrapper'}
          style={webStyle.container}
        >
          <CustomTypography 
            variant={'primary'}
            component={'title'}
            textTransform={'uppercase'}
          >
            Login
          </CustomTypography>
          <CustomTypography 
            variant={'secondary'}
            component={'body3'}
            textTransform={'none'}
          >
            {
              this.props.roleType === 1 ?
              'Welcome to Qstock Contributor'
              : 'Welcome back to Qstock!'
             } 
          </CustomTypography>
          {
            this.state.error ?
              <Alert
                variant={'error'}
              >
                {this.state.errorText}
              </Alert>
            : null
          }
          <Box mt={5}>
            <CustomButton
              variant={'grey'}
              fullWidth='fullWidth'
              size={'large'}
              testID={'btnSocialLogin'}
            >
              <SocialMediaAccountLogin
                navigation={this.props.navigation} 
                id={'id'}
                role={this.props.roleType}
                successCallBack={() => this.onSignupResponse()}
                errorCallBack={(error: any) => this.errorResponse(error)}
              />
            </CustomButton>
          </Box>
          <Box mt={2}>
            <CustomButton
              variant={'grey'}
              fullWidth='fullWidth'
              size={'large'}
            >
              <img 
                src={appleIcon} 
                style={webStyle.socialIcon}
              />
              Continue with Apple
            </CustomButton>
          </Box>
          <Box mt={2}>
            <CustomButton
              variant={'grey'}
              fullWidth='fullWidth'
              size={'large'}
            >
              <img 
                src={instaIcon} 
                style={webStyle.socialIcon}
              />
              Continue with Instagram
            </CustomButton>
          </Box>
          <div style={webStyle.dividerWrap}>
            <DividerWithOr 
              variant={'secondary'}
              textVariant={'primary'}
            />
          </div>
        </div>
        <Input
          label="Email"
          value={this.state.email}
          onChange={this.handleChange}
          error={this.state.emailInputError}
          helperText={this.state.emailHelperText}
          type='text'
          name='email'
          required
          testId='txtInputEmail'
        />
        <Input
          label="Password"
          value={this.state.password}
          onChange={this.handleChange}
          error={this.state.emailInputError}
          helperText={this.state.emailHelperText}
          type='password'
          name='password'
          required
          testId='txtInputPassword'
        />
        <div
          style={webStyle.linkWrap}
        >
          <Link 
            url={this.props.forgetPasswordRoute}
            variant={'secondary'}
            underlined={'underlined'}
            component={'para'}
          >
            Forgot Password?
          </Link>
        </div>
        <div
          style={webStyle.loginBtn}
        >
          <CustomButton 
            onClick={() => this.login()}
            variant='primary'
            fullWidth='fullWidth'
            size={'large'}
            testId='btnEmailLogIn'
          >
            login
          </CustomButton>
        </div>
        <div
          style={webStyle.btmLinkWrap}
        >
          <div>
            <CustomTypography 
              variant={'secondary'}
              component={'body3'}
              textTransform={'none'}
            >
              {
              this.props.roleType === 1 ?
              `Don't have an account yet?`
              : `Don’t have an account?`
             }
            </CustomTypography>
          </div>
          <div
            style={webStyle.joinLink}
          >
            <CustomButton 
              onClick={() => this.joinQstock()}
              variant={'tertiary'}
              testID={'joinQstock'}
            >
              {this.props.roleType === 1 ? 'Create Free Account':'JOIN QSTOCK'}
            </CustomButton>
          </div>
        </div>
      </div>
       // Customizable Area End
    );
  }
}
