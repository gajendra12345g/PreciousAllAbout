import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MultitieredCart from "../../src/Multitieredcart.web";
import { jest, beforeEach } from "@jest/globals";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "MultitieredCart",
};

const feature = loadFeature(
  "./__tests__/features/multitieredcart-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to multitieredcart", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: MultitieredCart;

    given("I am a User loading multitieredcart", () => {
      exampleBlockA = shallow(<MultitieredCart {...screenProps} />);
    });

    when("I navigate to the multitieredcart", () => {
      instance = exampleBlockA.instance() as MultitieredCart;
    });

    then("multitieredcart will load with out errors", () => {
      const allCartItem = [
        {
          id: 1,
          attributes: {
            multitieredpricing_attributes: {
              product_attributes: {
                name: "Product 1",
                description: "Description 1",
                image: { url: "image1.jpg" },
              },
            },
            quantity: 2,
            total_price: "$20",
          },
        },
        {
          id: 2,
          attributes: {
            multitieredpricing_attributes: {
              product_attributes: {
                name: "Product 2",
                description: "Description 2",
                image: { url: "image2.jpg" },
              },
            },
            quantity: 3,
            total_price: "$30",
          },
        },
      ];
      exampleBlockA.setState({ allCartItem, totalCost: "$50" });
      expect(exampleBlockA.find('[data-test-id="grid"]').length).toEqual(allCartItem.length);
      allCartItem.forEach((item, index) => {
        const itemWrapper = exampleBlockA.find('[data-test-id="grid"]').at(index);
        expect(itemWrapper.find('img').prop('src')).toEqual(item.attributes.multitieredpricing_attributes.product_attributes.image.url);
        expect(itemWrapper.find('[data-test-id="grid"]').exists()).toBeTruthy();
        expect(itemWrapper.find('[data-test-id="handle"]').simulate("click"))
        expect(itemWrapper.find('[data-test-id="handleMinus"]').simulate("click"))
        expect(itemWrapper.find('[data-test-id="handlePlus"]').simulate("click"))
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
      instance.allCartItemApi = magResendSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magResendSucessRestAPI);
      expect(allProducts).toEqual(allProducts);
    });
  });
});
