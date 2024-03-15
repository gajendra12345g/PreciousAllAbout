import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Multitieredpricing from "../../src/Multitieredpricing.web";
import { jest, beforeEach } from "@jest/globals";
const navigation = require("react-navigation");

const generateMockData = () => ({
  allResolutionType: ["Standard (480p)"],
  allProductsMultitiered: [{ attributes: {} }],
  allUserType: ["Low", "Medium", "High"]
});

const screenProps = {
  id: "Multitieredpricing",
  navigation: {
    navigate: jest.fn(),
  },
};

const feature = loadFeature(
  "./__tests__/features/multitieredpricing-scenario.web.feature"
);

defineFeature(feature, (test) => {        
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to multitieredpricing", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Multitieredpricing;

    given("I am a User loading multitieredpricing", () => {
      exampleBlockA = shallow(<Multitieredpricing {...screenProps}/>);
    });

    when("I navigate to the multitieredpricing", () => {
      instance = exampleBlockA.instance() as Multitieredpricing;
      let handleAddToCart = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "handleAddToCart"
      );
      handleAddToCart.simulate("click");
    });

    then("I can enter text with out errors", () => {
      let handleAddToCart = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "handleAddToCart"
      );
      expect(handleAddToCart.props().style.color).toMatch("#ffffff");
    });

    when('I can click back button', () => {
      let handleHomeBack = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "handleHomeBack"
      );
      handleHomeBack.simulate("click");
    })
    then('I can back using button', () => {
      const handleHomeBack = exampleBlockA.findWhere(
          (node:any) => node.prop("data-test-id") === "handleHomeBack"
      );
      expect(handleHomeBack.props().style.display).toMatch("flex");
    })

    when('I can select resolution', () => {
      let handleResolution = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "handleResolution"
      );
      handleResolution.simulate("change",{target:{value:""}});
    })
    then('I can update resolution', () => {
      const handleResolution = exampleBlockA.findWhere(
          (node:any) => node.prop("data-test-id") === "handleResolution"
      );
      expect(handleResolution.props().labelId).toMatch("demo-simple-select-label");
    })

    when('I can call api', () => {
      const allProducts = [{}];
      let magResendSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      magResendSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magResendSucessRestAPI.messageId
      );
      magResendSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        allProducts
      );
      instance.allProductsMultitieredApi = magResendSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magResendSucessRestAPI);
    })

    then('I can call api without error', () => {
     expect(instance["allProductsMultitieredApi"]).toBeDefined();
    })

    when('I can handle userType', () => {
      let handleUserType = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "handleUserType"
      );
      handleUserType.simulate("change",{target:{value:""}});
    })
    then('I can handle userType without error', () => {
      const handleUserType = exampleBlockA.findWhere(
          (node:any) => node.prop("data-test-id") === "handleUserType"
      );
      expect(handleUserType.props().labelId).toMatch("demo-simple-select-label");
    })

    when('I can handle cart', () => {
      let handleCart = exampleBlockA.findWhere(
        (node) => node.prop("id") === "handleCart"
      );
      handleCart.simulate("click","");
    })
    then('I can handle cart without error', () => {
      const handleCart = exampleBlockA.findWhere(
          (node:any) => node.prop("id") === "handleCart"
      );
      expect(handleCart.props().id).toMatch("handleCart");
    })
  });
});
