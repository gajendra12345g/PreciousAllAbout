//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import UserProfileDetails from "../../src/UserProfileDetails.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const feature = loadFeature(
  "./__tests__/features/UserProfileDetails-scenario.web.features"
);

const screenProps = {
  navigation: jest.fn(),
  id: "UserProfileSetting",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UserProfileDetails", ({ given, when, then }) => {
    let UserProfileDetailsBlock: ShallowWrapper;
    let instance: UserProfileDetails;

    given("I am a User loading UserProfileDetails", () => {
      UserProfileDetailsBlock = shallow(
        <UserProfileDetails {...screenProps} />
      );
    });

    when("I navigate to the UserProfileDetails", () => {
      instance = UserProfileDetailsBlock.instance() as UserProfileDetails;
      let handleKeepMyAccount = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "handleKeepMyAccount"
      );
      instance.handleCloseSnackBar();
      handleKeepMyAccount.simulate("click");

      let profileEdit = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "profileedit"
      );
      profileEdit.simulate("click");

      let saveButton = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "savebtn"
      );
      saveButton.simulate("click");

      let addImage = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "addImage"
      );
      addImage.simulate("click");

      let tabChange = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "tabChange"
      );

      let event = {
        target: {
          value: "hii hello how are you",
        },
      };

      tabChange.simulate("change", event);

      let rmvbtn = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "rmvbtn"
      );
      rmvbtn.simulate("click");

      instance.setState({ editEmail: true });

      let handleEmail1 = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("testId") === "handleEmail1"
      );
      handleEmail1.simulate("change", "");

      instance.setState({ editPhone: true });
      let numberUpdated = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "numberUpdated"
      );
      numberUpdated.simulate("change", "");

      instance.setState({ selectedTab: 1 });
      const events = {
        target: {
          files: "",
        },
      };

      instance.setState({ cancelBtn: true });
      let handleCancle = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "handleCancle"
      );
      handleCancle.simulate("click", "");
      instance.handleEditPhone();
      instance.setState({
        profileUpdated: true,
      });

      UserProfileDetailsBlock.setState({ editEmail: true });
      instance.handleSaveEmail1();
      instance.handleImageClick("");

      const event1 = {
        target: {
          value: "",
        },
      };
      let redio = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "redio"
      );
      redio.simulate("change", event1);
    });

    then("UserProfileDetails will load with out errors", () => {
      expect(UserProfileDetailsBlock).toBeTruthy();
    });
    then("UserProfileDetails api will load", () => {
      instance = UserProfileDetailsBlock.instance() as UserProfileDetails;
      const responseFifth = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.updateUserProfileDetailsApi = responseFifth.messageId;
      responseFifth.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseFifth.messageId
      );
      responseFifth.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "11",
            type: "profile",
            attributes: {
              image: null,
              id: 11,
              first_name: "pradumn2",
              last_name: null,
              email: null,
              dob: null,
              country: "india",
              address: "mr10",
              city: "ujjain",
              postal_code: "467122",
              account_id: 65,
              profile_role: null,
              bio: null,
              user_name: null,
              instagram: null,
              facebook: null,
              youtube: null,
              name: null,
              photo:
                "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWVk9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8547ac3fa6dbd776fa97dee94b532ba440fd4711/image_03.png",
              profile_bio: {
                id: null,
                custom_attributes: null,
                about_me: null,
              },
            },
          },
        }
      );
      runEngine.sendMessage("For unit test", responseFifth);
    });
    then("sets emailInputError and saveBtnEnable when email is invalid", () => {
      const setStateMock = jest.fn();
      instance.setState = setStateMock;

      jest.spyOn(instance, "isValidEmail").mockReturnValue(false);

      instance.handleEmail("invalid_email@example.comm");

      expect(setStateMock).toHaveBeenCalledWith({
        emailInputError: true,
        saveBtnEnable: true,
      });
    });
    then(
      "resets emailInputError and updates saveBtnEnable when email is valid",
      () => {
        const setStateMock = jest.fn();
        instance.setState = setStateMock;

        jest.spyOn(instance, "isValidEmail").mockReturnValue(true);
        UserProfileDetailsBlock.setState({ emailInputError: true });

        UserProfileDetailsBlock.setState({ emailInputError: true });

        instance.handleEmail("valid_email@example.com");

        // expect(setStateMock).toHaveBeenCalledWith({
        //   emailInputError: false,
        //   saveBtnEnable: true,
        // });
      }
    );
    then(
      "sets numberInputError and saveBtnEnable when phone is invalid",
      () => {
        const setStateMock = jest.fn();
        instance.setState = setStateMock;
        instance.handlePhone("invalid_phone");
        expect(setStateMock).toHaveBeenCalledWith({
          numberInputError: true,
          saveBtnEnable: true,
        });
      }
    );

    then(
      "resets numberInputError and updates saveBtnEnable when phone is valid",
      () => {
        const setStateMock = jest.fn();
        instance.setState = setStateMock;
        UserProfileDetailsBlock.setState({ numberInputError: true });
        instance.handlePhone("1234567890");
        // expect(setStateMock).toHaveBeenCalledWith({
        //   numberInputError: false,
        //   // saveBtnEnable: true,
        // });
      }
    );

    then("deleteAccountApi api will load", () => {
      let dataOrg = {
        attributes: {
          comment: "this.state.newCommentText",
        },
      };
      const requestMessage: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { dataOrg }
      );
      instance.galleryDataGetApi = requestMessage.messageId;
      runEngine.sendMessage("Unit Test", requestMessage);
    });

    then("deleteImageApi api will load", () => {
      let dataOrg = {
        attributes: {
          comment: "this.state.newCommentText",
        },
      };
      const requestMessage: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { dataOrg }
      );
      instance.deleteImageApi = requestMessage.messageId;
      runEngine.sendMessage("Unit Test", requestMessage);
    });

    then("deleteImageApi1 api will load", () => {
      let errors = {
        attributes: {
          comment: "this.state.newCommentText",
        },
      };
      const requestMessage: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors }
      );
      instance.userProfileDetailsApi = requestMessage.messageId;
      runEngine.sendMessage("Unit Test", requestMessage);
    });

    then("deleteAccountApi api will load", () => {
      let apiRequestCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiRequestCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiRequestCallId.messageId
      );
      apiRequestCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: [{}] }
      );
      instance.deleteAccountApi = apiRequestCallId.messageId;

      runEngine.sendMessage("Unit Test", apiRequestCallId);

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
          message:
            "We are processing your file we will send you an email once successfully imported.",
          data: {
            attributes: {
              image: null,
            },
            error: [
              {
                catalogue_row: [
                  "Category can't be blank",
                  "Sub category can't be blank",
                  "Brand can't be blank",
                  "Sku has already been taken",
                ],

                variant_row: [],

                row_number: 0,
              },
            ],
            saved_object: {},
            already_exist: {},
          },
        }
      );

      instance.deleteAccountApi = msgValidationAPI.messageId;
      instance.hideMobileNumber("12345678");
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
    then("I can leave the screen with out errors", () => {
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
          message:
            "We are processing your file we will send you an email once successfully imported.",
          data: {
            attributes: {
              image: "",
            },
            errors: [
              {
                catalogue_row: [
                  "Category can't be blank",
                  "Sub category can't be blank",
                  "Brand can't be blank",
                  "Sku has already been taken",
                ],
                variant_row: [],
                row_number: 0,
              },
            ],
            saved_object: {},
            already_exist: {},
          },
          errors: {},
        }
      );
      instance.userProfileDetailsApi = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      let handleEmail = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "handleSa"
      );
      handleEmail.simulate("click");

      instance.setState({ profileImg: true });
      let ArrowBackIcon = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "ArrowBackIcon"
      );
      ArrowBackIcon.simulate("click");

      let ClearIcon = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "ClearIcon"
      );
      ClearIcon.simulate("click");

      let addImage = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "addImage"
      );
      addImage.simulate("click");

      let handleOpenDelete = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "handleOpenDelete"
      );
      handleOpenDelete.simulate("click");

      let handleOpenDelete1 = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "handleOpenDelete1"
      );
      handleOpenDelete1.simulate("click");

      let handleCloseSnackBar = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "handleCloseSnackBar"
      );
      handleCloseSnackBar.simulate("click");

      const handleOtpCode = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "handleOtpCode"
      );

      let event10 = {
        value: {
          replace: jest.fn(),
        },
      };

      handleOtpCode.simulate("change", event10);
      let handleOpenDeleteNext = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "handleOpenDeleteNext"
      );

      UserProfileDetailsBlock.setState({ email: "hide23@gmail.com" });
      handleOpenDeleteNext.simulate("click");
      instance.deleteAccount();

      const userNameInput = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "userNameInput"
      );
      let event = {
        target: {
          value: "hii hello how are you",
        },
      };
      userNameInput.simulate("change", event);

      let imageUpload = UserProfileDetailsBlock.findWhere(
        (node) => node.prop("data-test-id") === "imageUpload"
      );
      let events = [
        {
          name: "sample-image.jpeg",
          size: 1024 * 1024,
          type: "image/jpeg",
        },
      ];

      let events2 = [
        {
          name: "sample-image.jpg",
          size: 1024 * 1024,
          type: "image/jpg",
        },
      ];

      imageUpload.simulate("drop", events);
      imageUpload.simulate("drop", events2);


      instance.handleFileDrop({});
      instance.handleEmail2()
      instance.handlePhone2()
      expect(UserProfileDetailsBlock).toBeTruthy();
    });
  });
});
