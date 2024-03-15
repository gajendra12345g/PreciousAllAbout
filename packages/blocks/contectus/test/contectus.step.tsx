import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Contactus from "../../src/ContactUs2.web";
const navigation = require("react-navigation");

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { _ } from "../../../../framework/src/IBlock";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "Contactus",
};

const feature = loadFeature(
  "./__tests__/features/contactUs2-scenario.feature"
);



defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to contactus", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a User loading contactus", () => {
        ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      });
  
    
      when("I navigate to the contactus", () => {
        instance = ContactUsWrapper.instance() as Contactus;
        instance.componentDidMount()

      });
  
      then("Component render without error", () => {
        expect(ContactUsWrapper).toBeTruthy();
      });

      when("user input the name", () => {
        instance.handleChangeName({value:"Test"})

      });
  
      then("Name should be match", () => {
        expect(instance.state.name).toEqual("Test");
      });

      when("user input the email", () => {
        instance.handleChangeEmail({value:"test@mail.com"})

      });
  
      then("Email should be match", () => {
        expect(instance.state.email).toEqual("test@mail.com");
      });

      when("user input the phone number", () => {
        const event ={
          target:{
            value:"982349824"
          }
        } as React.ChangeEvent<HTMLInputElement>
        instance.handleChangePhone(event)

      });
  
      then("Phone number should be match", () => {
        expect(instance.state.phoneNumber).toEqual("982349824");
      });

      when("user input the subject", () => {
        instance.handleChangeSubject({value:"subject"})
      });
  
      then("Subject should be match", () => {
        expect(instance.state.subject).toEqual("subject");
      });
   
      when("user input the summary", () => {
        const event ={
          target:{
            value:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
          }
        } as React.ChangeEvent<HTMLTextAreaElement>
        instance.handleChangeSummary(event)

      });
  
      then("Summary should be match", () => {
        expect(instance.state.summary).toEqual("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,");
      });

      when("user submit the form successfully", () => {
        const event = {
          preventDefault:jest.fn()
        } as any
        instance.handleAddQuery(event)
        const apiRequestCallId = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
  
        apiRequestCallId.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          apiRequestCallId.messageId
        );
  
        apiRequestCallId.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {"message":"Query Submitted Successfully","ticket_id":4}
        );
  
        instance.addQueryApiCallId = apiRequestCallId.messageId;
        runEngine.sendMessage("Unit Test", apiRequestCallId);

      });
  
      then("all field should reset", () => {
        expect(instance.state.name).toEqual("")
      });
   
  });

});
