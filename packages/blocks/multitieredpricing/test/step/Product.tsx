import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MultitieredProduct from "../../src/Multitieredproduct.web";
import { jest, beforeEach } from "@jest/globals";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "MultitieredProduct",
};

const feature = loadFeature(
  "./__tests__/features/multitieredproduct-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    
  });

  test("User navigates to multitieredproduct", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: MultitieredProduct;

    given("I am a User loading multitieredproduct", () => {
      exampleBlockA = shallow(<MultitieredProduct {...screenProps} />);
    });

    when("I navigate to the multitieredproduct", () => {
      instance = exampleBlockA.instance() as MultitieredProduct;
    });

    then("I can enter text with out errors", () => {
      const allProducts = [
        { id: 1, attributes: { name: "Product 1", price: "$10", description: "Description 1", image: { url: "image1.jpg" } } },
        { id: 2, attributes: { name: "Product 2", price: "$15", description: "Description 2", image: { url: "image2.jpg" } } },
      ];
      exampleBlockA.setState({ allProducts });
      expect(exampleBlockA.find('[data-test-id="handleCardNavigation"]').length).toEqual(allProducts.length);
      allProducts.forEach((product, index) => {
        const itemWrapper = exampleBlockA.find('[data-test-id="handleCardNavigation"]').at(index);
        expect(itemWrapper.find('img').prop('src')).toEqual(product.attributes.image.url);
        expect(itemWrapper.find('[data-test-id="handleCardNavigation"]').exists()).toBeDefined();
        itemWrapper.simulate("click")
      });
    });

    then("allProducts api will load", () => {
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
      instance.allProductsApi = magResendSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magResendSucessRestAPI);
      expect(allProducts).toEqual(allProducts);
      expect(exampleBlockA).toBeDefined();
    });
  });
});
