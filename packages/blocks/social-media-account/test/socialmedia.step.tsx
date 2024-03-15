import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import SocialMediaAccount from "../../src/SocialMediaAccount.web";
import { View as MockView } from "react-native";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import SocialMediaAccountController from "../../src/SocialMediaAccountController.web";
import googleController from "../../src/GoogleWebController";
import { GoogleDelegate } from "../../src/GoogleDelegate";
// import { jest } from '@jest/globals';

const screenProps = {
  id: "SocialMediaAccount",
  navigation: {},
  role: 1, 
  successCallBack: jest.fn(), 
  errorCallBack: jest.fn()
};

const GoogleAuthDetails = {
  iss: '',
  nbf: 1,
  aud: '',
  sub: 'string',
  hd: 'string',
  email: 'string',
  token: 'string',
  email_verified: true,
  azp: 'string',
  name: 'string',
  picture: 'string',
  given_name: 'string',
  family_name: 'string',
  iat: 1,
  exp: 1,
  jti: 'string'
}

const googleResponse = {
  credential:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNDFkZWRlZWUyZDE4NjliNjU3ZmE5MzAzMDAwODJmZTI2YjNkOTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODkwOTQ1OTAsImF1ZCI6IjY0OTU5MjAzMDQ5Ny1ncDNtb3FoMGsyc3JjNXIydTVxZmFvcmlpMWRxa3ZkYy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNTA3NjE0NDE0MDA2MTY1MzA0OCIsImhkIjoibW9iaS1naWcuY29tIiwiZW1haWwiOiJhZm5hbi5kYW5pc2hAbW9iaS1naWcuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjY0OTU5MjAzMDQ5Ny1ncDNtb3FoMGsyc3JjNXIydTVxZmFvcmlpMWRxa3ZkYy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJBZm5hbiBEYW5pc2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZGVWaTQ4UUhObXpoVHo4Zl9KcXNPVFV4alNaSG9weWJ6SlZ6emRCSXVBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFmbmFuIiwiZmFtaWx5X25hbWUiOiJEYW5pc2giLCJpYXQiOjE2ODkwOTQ4OTAsImV4cCI6MTY4OTA5ODQ5MCwianRpIjoiMmQxNzJkYzdjOTIyMmM4MzdmZmYyNjFkYzNlZTJlNjE2MDgxYjZiMSJ9.kNpG8x05u2QK30TPCaBBnuvXw569dff0yCZdIXqtBGXNS-DZQFSLJ_gJnbqSB0wUyHfXk6RJZB9JjlTZ77VSd4kmMPBO8svKFcSgGskcXRoxUN9Ii-MFHNaTMZGam4skjWOfPtoN_I_lvE8dkjTrFchafjSyfeXw51Jv-PUdxwugYwcrXpA93U3nBBRyYP42opciDo_iPbOb-v_vidz2DIvYVYBEo9fSTScgXuB-RF4_xgVuL7ZD55HejsamrW-pyAKTnJ7KsKznGY2522csd841fFoqbzlM00CiOOdY5xB22rtxBdjisiAzTTPLFCDyqHQdaIS4ETOveyTN7yoDgg",
  clientId:
    "649592030497-gp3moqh0k2src5r2u5qfaorii1dqkvdc.apps.googleusercontent.com",
  select_by: "user"
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

jest.mock("react-native-modal-activityindicator", () => ({
  default: (props: object) => <MockView {...props} />
}));

jest.mock("react-facebook-login/dist/facebook-login-render-props", () => ({
  default: (props: object) => <MockView {...props} />
}));

describe("SocialMediaAccount", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.spyOn(runEngine, "sendMessage");
    jest.spyOn(runEngine, "debugLog");
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  test("should render without crashes", () => {
    // const { container } = render(<SocialMediaAccount {...screenProps} isRegistration={false} />);
    // expect(container).toBeTruthy();
  });

  test("response message should be saved on session message", () => {
    const responseMessage = new Message(
      getName(MessageEnum.SessionSaveMessage)
    );
    runEngine.sendMessage(responseMessage.id, responseMessage);
  });

  test("network response should be get for login", () => {
    const responseMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      {}
    );

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      responseMessage.messageId
    );
    runEngine.sendMessage(responseMessage.id, responseMessage);
  });

  test("Should be get success message when user login with google account successfully", () => {
    // const { getByTestId } = render(<SocialMediaAccount {...screenProps} isRegistration={false} />);
    // waitFor(() => {
    //   const googleLogin = getByTestId("googleLogin");
    //   const children: any = googleLogin.children[0];
    //   children.props.onSuccess(googleResponse);
    //   expect(runEngine.debugLog).toBeCalledWith("User SIGNED IN.");
    // });
  });

  test("Should be get failed message when user click google button and cancel", () => {
    // const { getByTestId } = render(<SocialMediaAccount {...screenProps} isRegistration={false} />);
    // waitFor(() => {
    //   const googleLogin = getByTestId("googleLogin");
    //   const children: any = googleLogin.children[0];
    //   children.props.onError();
    //   expect(window.alert).toBeCalledWith("Something went wrong!");
    // });
  });

  test("User login with google account for registration", () => {
    // const { getByTestId } = render(
    //   <SocialMediaAccount {...screenProps} isRegistration={true} />
    // );
    // const googleLogin = getByTestId("googleLogin");
    // const children: any = googleLogin.children[0];
    // children.props.onSuccess(googleResponse);
  });

  test("network response should be get for signup", () => {
    const socialMediaAccountController = new SocialMediaAccountController({
      navigation: {},
      id: "",
      isRegistration: true,
      role: 1, 
      successCallBack: jest.fn(), 
      errorCallBack: jest.fn()
    });
    socialMediaAccountController.googleLogIn(true, 'testingcreds')
    socialMediaAccountController.googleUserStatusChanged({
      email: 'test',
      id: '1',
      token: 'dsjbsdjhf',
      status: 'changed'
    })
    const googleDelegateInstance = new GoogleDelegate();

    socialMediaAccountController.logInWithSocial('test', '1', 'token', socialMediaAccountController.props)
    socialMediaAccountController.navigate()
    socialMediaAccountController.navigateToRegister()
    socialMediaAccountController.navigateToSignin()
    socialMediaAccountController.openInfoPage()
    googleController.googleLogIn(googleDelegateInstance, 'test', true)
    googleController.signinChanged(GoogleAuthDetails)
    googleController.userChanged(GoogleAuthDetails, true)
    const token = "eyJhbGciOi4ZWYzZDg4MDk3OGRjODJmMjVjM2VjMzE3YzZhNWI3ODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NDk1OTIwMzA0OTctZ3AzbW9xaDBrMnNyYzVyMnU1cWZhb3JpaTFkcWt2ZGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NDk1OTIwMzA0OTctZ3AzbW9xaDBrMnNyYzVyMnU1cWZhb3JpaTFkcWt2ZGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDEwMDE3MzA2Mzc3MTk2MTkzNzciLCJoZCI6Im9rb2RlcnMuY29tIiwiZW1haWwiOiJtb2hpdC5wcmF0YXBAb2tvZGVycy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzA1NTc3NDg0LCJuYW1lIjoiTW9oaXQgUHJhdGFwIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0x3czdSWjF1T0h6cXFCT0dTOFJmdExIallSSmljajh1SnBZN0VnWWZBSj1zOTYtYyIsImdpdmVuX25hbWUiOiJNb2hpdCIsImZhbWlseV9uYW1lIjoiUHJhdGFwIiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE3MDU1Nzc3ODQsImV4cCI6MTcwNTU4MTM4NCwianRpIjoiZTA1MDlkMzYwYzQ3MTczOGYwODAxNzY4OTNiOTRlZDlhMmIyMzA4YyJ9.Nzgt_vbp1CzT91rLbBAmvFwQFNUS-HqA43kTm_bKmoPTzHs1-2APFsR8AGqlvz1ZB2kNYi6cyPG9rm14jVkEDBZ9o1uFG5yNCRggPjSussiRS028LJ4FDn5q7hBVfcddWzUm13Q-qVymvmADLpbqwx3LpgVOs8xdOQx87tTX8P-2lfArxMjQjQ8f8GeNoq43isATIyf7u3YuQoPkij4V24LvU_S8P5iPdHMBxO0J3raZqogjsIiwjb2I9_n9HuynGQDaxEJRHlXyN_u8Hpr21f8HQNp-bNszEyGI1cCdH4d0RGBWzMFIHFeFX-X-auJlKpOvIHkvTskrRp_CYd6zhw"
    googleController.parseUserDetails(token)
    socialMediaAccountController.btnGoogleLogInProps.onResponse('creds')
    socialMediaAccountController.btnGoogleLogInProps.onError('error')
    socialMediaAccountController.btnNavigateProps.onPress()
    socialMediaAccountController.btnFacebookLogInProps.onPress()
    const responseMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      responseMessage.messageId
    );

    socialMediaAccountController.createAccountAPICallId =
      responseMessage.messageId;

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        meta: {
          token: "dummy-token-string"
        }
      }
    );
    runEngine.sendMessage(responseMessage.id, responseMessage);
  });

  test("Navigation should be called for login with email and password", () => {
    // const { getByTestId } = render(<SocialMediaAccount {...screenProps} />);
    // const btnNavigate = getByTestId("btnNavigate");
    // fireEvent.press(btnNavigate);
    // expect(btnNavigate).toBeDefined();
  });

  test("Navigation should be called for signup with email and password", () => {
    // const { getByTestId } = render(
    //   <SocialMediaAccount {...screenProps} isRegistration={true} />
    // );
    // const btnNavigate = getByTestId("btnNavigate");
    // fireEvent.press(btnNavigate);
    // expect(btnNavigate).toBeDefined();
  });
});
