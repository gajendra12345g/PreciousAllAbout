import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock.web";
import SocialMediaAccountLogin from "../../../social-media-account/src/SocialMediaAccountLogin";
// import { jest } from '@jest/globals';
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!doctype html><html><body></body></html>');

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "EmailAccountLoginBlock",
  callBack: jest.fn(),
  closeLogin: jest.fn(),
  scrollToDiv: jest.fn(),
  roleType: 1,
  checkRole: jest.fn()
};

jest.mock("@react-native-community/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockImplementation(() => true),
    // .mockImplementationOnce(() => Promise.reject({code : 2})),
    signIn: jest.fn().mockImplementation(() => ({
      user: {
        email: "test@gmail.com",
        id: "id",
      },
    })),
  },
  statusCodes: {
    PLAY_SERVICES_NOT_AVAILABLE: 1,
    SIGN_IN_CANCELLED: 2,
    IN_PROGRESS: 3,
  },
}));

Object.defineProperty(global, 'window', {
  value: {
    location:{
      replace:jest.fn()
    }
  },
});

const feature = loadFeature(
  "./__tests__/features/email-account-login-scenario.web.feature"
);

Object.defineProperty(global, 'document', {
  value: {
    getElementById: (wrapper: any) => ({
      scrollIntoView: (wrapper: any) => {}
    })
  }
});

Object.defineProperty(global, 'window', {
  value: dom.window,
});

Object.defineProperty(global, 'navigator', {
  value: { userAgent: 'node.js' },
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Email Log In", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} forgetPasswordRoute="/ForgotPassword" />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
        instance.setEmail('test@gmail.com')
        instance.setPassword('password')
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              email_validation_regexp:
                "^[a-zA-Z0-9.!\\#$%&‘*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
              password_validation_regexp:
                "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
              password_validation_rules:
                "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_).",
            },
          ],
        }
      );
      instance.validationApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    when("I navigate to the Log In Screen", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.CustomCheckBoxProps.onChangeValue(true)
      instance.btnRememberMeProps.onPress()
      instance.setRememberMe(true);
    });
    then("I can select Log In with Soical Media Account", () => {
      expect(mobileAccountLogInWrapper).toBeTruthy();
      instance.btnEmailLogInProps.onPress();
    });

    then( "navigates to LandingPageAfterLoginContributor if roleType is 1", () => {
      const navigateMock = jest.fn();
      const callBackMock = jest.fn();
      const props = {
        id: '',
        closeLogin: '',
        navigation: { navigate: navigateMock },
        roleType: 1,
        callBack: callBackMock,
      };
      const wrapper = shallow(<EmailAccountLoginBlock {...props} forgetPasswordRoute="/ForgotPassword" />);
      let instance = wrapper.instance() as EmailAccountLoginBlock;
      instance.onSignupResponse();
      expect(navigateMock).toHaveBeenCalledWith('LadingPageAfterLoginContributor');
      expect(callBackMock).not.toHaveBeenCalled(); 
    })

    then( "navigates to tickets if roleType is 2", () => {
      const navigateMock = jest.fn();
      const callBackMock = jest.fn();
      const props = {
        id: '',
        closeLogin: '',
        navigation: { navigate: navigateMock },
        roleType: 2,
        callBack: callBackMock,
      };
      const wrapper = shallow(<EmailAccountLoginBlock {...props} forgetPasswordRoute="/ForgotPassword" />);
      let instance = wrapper.instance() as EmailAccountLoginBlock;
      instance.setLoginResponse({
        meta: {
          token: 'kdsjfhbksdjf',
          name: 'test'
        }
      });
      instance.setState({
        roleType: 2
      })
      expect(navigateMock).toHaveBeenCalledWith('ModeratorTickets');
      expect(callBackMock).toHaveBeenCalled(); 
    })
    then( "save info if roleType is 0", () => {
      const navigateMock = jest.fn();
      const callBackMock = jest.fn();
      const props = {
        id: '',
        closeLogin: '',
        navigation: { navigate: navigateMock },
        roleType: 0,
        callBack: callBackMock,
      };
      const wrapper = shallow(<EmailAccountLoginBlock {...props} forgetPasswordRoute="/ForgotPassword" />);
      let instance = wrapper.instance() as EmailAccountLoginBlock;
      instance.setLoginResponse({
        meta: {
          token: 'kdsjfhbksdjf',
          name: 'test'
        }
      });
      instance.setState({
        roleType: 0
      })
      instance.saveLoggedInUserData({meta: {
        token: 'kdsjfhbksdjf',
        name: 'test'
      }})
      instance.sendLoginSuccessMessage()
    })

    then("calls callBack if roleType is not 1", () => {
      const navigateMock = jest.fn();
      const callBackMock = jest.fn();
      const props = {
        id: '',
        closeLogin: '',
        navigation: { navigate: navigateMock },
        roleType: 2, // Assuming roleType is not 1
        callBack: callBackMock,
      };

      // Render the component with mock props
      const wrapper = shallow(<EmailAccountLoginBlock {...props} forgetPasswordRoute="/ForgotPassword" />);

      let instance = wrapper.instance() as EmailAccountLoginBlock;
      instance.onSignupResponse();
      instance.btnForgotPasswordProps.onPress();
      instance.txtInputPasswordProps.onChangeText('test')

      // Assert callBack is called
      expect(callBackMock).toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    })

    then("sets state and calls scrollToDiv", () => {
      // const scrollToDivMock = jest.fn();
      const error = 'Test error';
      instance.errorResponse(error);

      expect(mobileAccountLogInWrapper.state('error')).toBe(true);
      expect(mobileAccountLogInWrapper.state('errorText')).toBe(error);
      expect(mobileAccountLogInWrapper.state('errorType')).toBe('error');

      // expect(scrollToDivMock).toHaveBeenCalled();
    })

    then("calls successCallBack when successfully logged in", () => {
      const successCallBackMock = jest.fn();

      // Render the component with mock props
      const wrapper = shallow(
        <SocialMediaAccountLogin
          navigation={{ navigate: jest.fn() }}
          id="id"
          role="0"
          successCallBack={successCallBackMock}
          errorCallBack={() => {}}
        />
      );

      let instance = wrapper.instance() as SocialMediaAccountLogin
      instance.props.successCallBack();

      // Assert that successCallBackMock was called
      expect(successCallBackMock).toHaveBeenCalled();
    })

    then("calls errorCallBack when login fails", () => {
      const errorCallBack = jest.fn();

      // Render the component with mock props
      const wrapper = shallow(
        <SocialMediaAccountLogin
          navigation={{ navigate: jest.fn() }}
          id="id"
          role="0"
          successCallBack={() => {}}
          errorCallBack={errorCallBack}
        />
      );

      let instance = wrapper.instance() as SocialMediaAccountLogin
      instance.props.errorCallBack();

      // Assert that successCallBackMock was called
      expect(errorCallBack).toHaveBeenCalled();
    })

    then("I can toggle the Remember Me with out errors", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnRememberMe"
      );
      // buttonComponent.simulate("click");
    });

    then('scrolls into view with smooth behavior', () => {
      const myDiv = {
        scrollIntoView: jest.fn(),
      };
      jest.spyOn(document, 'getElementById').mockReturnValue(myDiv as unknown as HTMLElement);
      instance.scrollToDiv();
      expect(myDiv.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });
    });

    then("I can click join Qstock", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "joinQstock"
      );
      buttonComponent.simulate("click");
      expect(screenProps.closeLogin).toHaveBeenCalled();
    });

    then("I can select the Log In button with out errors", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testId") === "btnEmailLogIn"
      );
      buttonComponent.simulate("click");
    });

    then('should set error state for empty email', () => {
      instance.setState({ email: '' });
  
      let btnComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testId') === 'btnEmailLogIn');
      btnComponent.simulate('click');
      instance.setState({
        errorText: 'Please enter a valid email!'
      })
  
      expect(mobileAccountLogInWrapper.state('error')).toEqual(true);
      expect(mobileAccountLogInWrapper.state('errorText')).toEqual('Please enter a valid email!');
      expect(mobileAccountLogInWrapper.state('errorType')).toEqual('error');
    });
  
    then('should set error state for invalid email format', () => {
      instance.setState({ email: 'invalidemail' });

  
      let btnComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testId') === 'btnEmailLogIn');
      btnComponent.simulate('click');

      instance.setState({
        errorText: 'Please enter a valid email!'
      })
  
      expect(mobileAccountLogInWrapper.state('error')).toEqual(true);
      expect(mobileAccountLogInWrapper.state('errorText')).toEqual('Please enter a valid email!');
      expect(mobileAccountLogInWrapper.state('errorType')).toEqual('error');
    });

    then('should set error state for empty password', () => {
      instance.setState({ password: '' });
  
      let btnComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testId') === 'btnEmailLogIn');
      btnComponent.simulate('click');

      instance.setState({
        errorText: 'Please enter password!'
      })
  
      expect(mobileAccountLogInWrapper.state('error')).toEqual(true);
      expect(mobileAccountLogInWrapper.state('errorText')).toEqual('Please enter password!');
      expect(mobileAccountLogInWrapper.state('errorType')).toEqual('error');
    });
  
    then('should set error state for invalid password format', () => {
      instance.setState({ password: 'sdfsdf' });
      instance.setState({
        errorText: 'Please enter valid password!'
      })
  
      let btnComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testId') === 'btnEmailLogIn');
      btnComponent.simulate('click');
  
      expect(mobileAccountLogInWrapper.state('error')).toEqual(true);
      expect(mobileAccountLogInWrapper.state('errorText')).toEqual('Invalid Email ID');
      expect(mobileAccountLogInWrapper.state('errorType')).toEqual('error');
    });

    then("I can select the Forgot Password button with out errors", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnForgotPassword"
      );
      // buttonComponent.simulate("click");
    });

    then("I can enter a email address with out errors", () => {
      let textInputComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testId") === "txtInputEmail"
      );
      textInputComponent.simulate("change", {
        target: { value: "hello@aol.com" },
      });
      // instance.setState({ email: 'example@test.com' });
      // if(instance.state.email){}
    });

    then("if role type 0 then check role and type email", () => {
      const textInput = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testId") === "txtInputEmail"
      );
      const target = {name:'email', value: 'test@test.com'}
      const configJson = {
        emailRegEx: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      }
      textInput.simulate('change', target)
      instance.setState({
        email: target.value
      })
      configJson.emailRegEx.test(instance.state.email);
      
      instance.checkRole()

    });

    then('should call checkRole when roleType is 0 and target name is email with a valid email', () => {
      const configJSON = {
        emailRegEx: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      };
      const target = { target: { name: 'email', value: 'test@example.com' } };
      instance.handleChange(target);
      instance.setState({
        email: target.target.value
      })
      configJSON.emailRegEx.test(instance.state.email);
      instance.checkRole()
    });

    then("I can enter a password with out errors", () => {
      let textInputComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testId") === "txtInputPassword"
      );
      textInputComponent.simulate("change", {
        target: { value: "passWord1!" },
      });
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });
  });

  test("Empty Email Address", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email Address", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} forgetPasswordRoute="forgetpassword"/>
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    when("I Log In with an empty Email Address", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({ email: "", password: "password!" });
    });

    then("Log In Should Fail", () => {
      expect(instance.doEmailLogIn()).toBe(false);

      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              failed_login: "Login Failed",
            },
          ],
        }
      );

      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      instance.apiEmailLoginCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
    });
  });

  test("Email Address and Empty Password", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email Address", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} forgetPasswordRoute="forgetpassword" />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    when("I Log In with a Email Address and empty Password", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({ email: "test@aol.com", password: "" });
    });

    then("Log In Should Fail", () => {
      expect(instance.doEmailLogIn()).toBe(false);
    });
  });

  test("Password and Empty Email Address", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email Address", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} forgetPasswordRoute="forgetpassword" />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    when("I Log In with a Password and empty Email Address", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({ email: "", password: "password" });
    });

    then("Log In Should Fail", () => {
      expect(instance.doEmailLogIn()).toBe(false);
    });
  });

  test("Email Address and Password", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given(
      "I am a Registed User attempting to Log In with a Email Address",
      () => {
        mobileAccountLogInWrapper = shallow(
          <EmailAccountLoginBlock {...screenProps} forgetPasswordRoute="forgetpassword" />
        );
        expect(mobileAccountLogInWrapper).toBeTruthy();
      }
    );

    when("I Log In with Email Address and Password", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({ email: "abc@aol.com", password: "password" });
    });

    then("Log In Should Succeed", () => {
      // expect(instance.doEmailLogIn()).toBe(true);
      expect(mobileAccountLogInWrapper.state('error')).toEqual(false);
      expect(mobileAccountLogInWrapper.state('errorText')).toEqual('');
      expect(mobileAccountLogInWrapper.state('errorType')).toEqual('');
    });

    then("RestAPI will return token", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          meta: {
            token:
              "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q",
          },
        }
      );
      instance.apiEmailLoginCallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
    });
  });

  test("Remember Me - Email Address Account Log In", ({
    given,
    when,
    then,
  }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given(
      "I am a Registed User who has already Logged In and selected Remember Me",
      () => {
        //Force ios to render mobile layout once.
        jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
        mobileAccountLogInWrapper = shallow(
          <EmailAccountLoginBlock {...screenProps} forgetPasswordRoute="forgetpassword" />
        );
        expect(mobileAccountLogInWrapper).toBeTruthy();
      }
    );

    when("I navigate to Email Address Account Log In", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;

      const msgRestoreCreds = new Message(
        getName(MessageEnum.ReciveUserCredentials)
      );
      msgRestoreCreds.addData(getName(MessageEnum.LoginPassword), "passWord1!");
      msgRestoreCreds.addData(
        getName(MessageEnum.LoginUserName),
        "test@aol.com"
      );
      runEngine.sendMessage("Unit Test", msgRestoreCreds);
    });

    then(
      "The Country Code, Email Address and Password will be restored",
      () => {
        expect(mobileAccountLogInWrapper).toBeTruthy();
      }
    );
  });


  test('Render screen for User login form', ({ given, when, then }) => {
    let lognFormWrapper:ShallowWrapper;
    let instance:EmailAccountLoginBlock; 

    given('I am a User loading Login form', () => {           
        lognFormWrapper = shallow(<EmailAccountLoginBlock {...screenProps} roleType={0} forgetPasswordRoute="test"/>);
        expect(lognFormWrapper).toBeTruthy();
    });

    when('I navigate to the Login form', () => {
        instance = lognFormWrapper.instance() as EmailAccountLoginBlock
    });

    then('Login form will load with out errors', () => {
        expect(lognFormWrapper).toBeTruthy();   
        expect(instance.props.roleType).toEqual(0)
    });
});

test('Render screen for Contributor login form', ({ given, when, then }) => {
    let lognFormWrapper:ShallowWrapper;
    let instance:EmailAccountLoginBlock; 

    given('I am a Contributor loading Login form', () => {           
        lognFormWrapper = shallow(<EmailAccountLoginBlock {...screenProps} roleType={1} forgetPasswordRoute="test"/>);
        expect(lognFormWrapper).toBeTruthy();
    });

    when('I navigate to the Login form', () => {
        instance = lognFormWrapper.instance() as EmailAccountLoginBlock
    });

    then('Login form will load with out errors', () => {
        expect(lognFormWrapper).toBeTruthy();   
        expect(instance.props.roleType).toEqual(1)
    });
});

});
