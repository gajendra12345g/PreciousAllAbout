import React from "react";

// Customizable Area Start
import { createTheme } from "@material-ui/core/styles";
import Input from '../../../components/src/Input/Input.web';
import Button from '../../../components/src/Button/Button.web';
import CustomLink from '../../../components/src/CustomLink/CustomLink.web';
import Label from "../../../components/src/Label/Label.web";
import DividerWithOr from "../../../components/src/DividerWithOr/DividerWithOr.web";
import CustomCheckBox from "../../../components/src/CustomCheckBox";
import Alert from "../../../components/src/Alert/Alert.web";
import PasswordStrength from "../../../components/src/PasswordStrength/PasswordStrength.web";


const webStyles: any = {
  linkWrap: {
    textAlign: 'right',
    paddingTop: '10px'
  },
  loginButton: {
    marginTop: '20px'
  },
  btnLinkWrap: {
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
    // Media query for screen width less than or equal to 600px
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
  checkboxWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '40px',
    paddingLeft: '-5px'
  },
  checkLinkWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  pwdStrength: {
    marginTop: '5px',
    marginBottom: '5px'
  }
};
// Customizable Area End

import EmailAccountRegistrationController, {
  Props,
} from "./EmailAccountRegistrationController";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class EmailAccountRegistrationBlock extends EmailAccountRegistrationController {
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
          style={webStyles.container}
        >
          <Label 
            variant='primary'
            weight='w500'
            textTransform="uppercase"
            size='xxl'
          >
            Create Your Account
          </Label>
          <Label 
            variant='secondary'
            weight='w400'
            textTransform="none"
            size='xl'
            marginTop='mt15'
          >
            Welcome back to Qstock!
          </Label>
          {
            this.state.error ?
              <Alert
                variant={'error'}
              >
                {this.state.errorText}
              </Alert>
            : null
          }
          <div style={webStyles.dividerWrap}>
            <DividerWithOr 
              color={'#BFC2C3'}
              height={'1px'}
              width={'100%'}
            />
          </div>
        </div>
        <Input
          label="Name"
          value={this.state.name}
          onChange={this.handleInputChange}
          error={this.state.nameInputError}
          helperText={this.state.nameHelperText}
          type='text'
          name='name'
          required
          testID="txtInputName"
        />
        <Input
          label="Email"
          value={this.state.email}
          onChange={this.handleInputChange}
          error={this.state.emailInputError}
          helperText={this.state.emailHelperText}
          type='text'
          name='email'
          required
          testID="txtInputEmail"
        />
        <Input
          label="Create Password"
          value={this.state.password}
          onChange={this.handleInputChange}
          error={this.state.passwordInputError}
          helperText={this.state.passwordHelperText}
          type='password'
          name='password'
          required
          subString='(min 8 characters)'
          testID='txtInputPassword'
        />
        {
          this.state.password ?
            <div
              style={
                webStyles.pwdStrength
              }
            >
              <PasswordStrength 
                password={this.state.password}
              />
            </div>
          : null
        }
        <div style={webStyles.checkboxWrap}>
            <CustomCheckBox
                testID={"CustomCheckBox"} //Merge Engine::From BDS
                {...this.CustomCheckBoxProps} //Merge Engine::From BDS - {...this.testIDProps}
            />
            <div
                style={webStyles.checkLinkWrap}
            >
                <div>
                    <Label 
                        variant='secondary'
                        weight='w400'
                        textTransform="none"
                        size='xl'
                    >
                        I agree to Qstock’s
                    </Label>
                </div>
                <div
                    style={webStyles.joinLink}
                >
                    <CustomLink 
                        label="Terms and Privacy policies."
                        url='#'
                        fontSize='14px'
                        color='#0E0F17'
                        underline={false}
                    />
                </div>
            </div>
        </div>
        <div
          style={webStyles.loginButton}
        >
          <Button 
            onClick={() => this.signup()}
            variant='primary'
            fullWidth='fullWidth'
            testID='btnCreate'
          >
            Create
          </Button>
        </div>
        <div
          style={webStyles.btnLinkWrap}
        >
          <div>
            <Label 
              variant='secondary'
              weight='w400'
              textTransform="none"
              size='xl'
            >
              Have an account already?
            </Label>
          </div>
          <div
            style={webStyles.joinLink}
          >
            <CustomLink 
              label="LOGIN TO QSTOCK"
              url='#'
              fontSize='10px'
              color='#0E0F17'
              underline={true}
            />
          </div>
        </div>
      </div>
       // Customizable Area End
    );
  }
}
