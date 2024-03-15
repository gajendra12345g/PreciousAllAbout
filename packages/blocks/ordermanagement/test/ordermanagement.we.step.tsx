//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import OrderManagements from "../../src/OrderManagements.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as utilities from "framework/src/Utilities";
const feature = loadFeature(
  "./__tests__/features/OrderManagements-scenario.scenario.features"
);

const screenProps = {
  navigation: jest.fn(),
  id: "OrderManagements"
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
defineFeature(feature, test => {
  jest
    .spyOn(utilities, "setStorageData")
    .mockImplementation(() => Promise.resolve());
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web")
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to OrderManagementsPage", ({ given, when, then }) => {
    let OrderManagementsBlock: ShallowWrapper;
    let instance: OrderManagements;

    given("I am a User loading OrderManagementsPage", () => {
      OrderManagementsBlock = shallow(<OrderManagements {...screenProps} />);
    });

    when("I navigate to the OrderManagementsPage", async () => {
      instance = OrderManagementsBlock.instance() as OrderManagements;
    });

    then("OrderManagementsPage will load with out errors", () => {
      expect(OrderManagementsBlock).toBeTruthy();
    });
    when("User click on All tab", async () => {
      OrderManagementsBlock = OrderManagementsBlock.update();
      let listComponent = OrderManagementsBlock.findWhere(
        node => node.prop("data-test-id") === "list_item-0"
      );
      listComponent.simulate("click");
    });
    then("active state will be 1", () => {
      expect(instance.state.active).toEqual(1);
    });
    when("User click on member tab", async () => {
      OrderManagementsBlock = OrderManagementsBlock.update();
      let listComponent = OrderManagementsBlock.findWhere(
        node => node.prop("data-test-id") === "list_item-1"
      );
      listComponent.simulate("click");
    });
    then("active state will change to 2", () => {
      expect(instance.state.active).toEqual(2);
    });
    when("User click on group tab", async () => {
      OrderManagementsBlock = OrderManagementsBlock.update();
      let listComponent = OrderManagementsBlock.findWhere(
        node => node.prop("data-test-id") === "list_item-2"
      );
      listComponent.simulate("click");
    });
    then("active state will change to 3", () => {
      expect(instance.state.active).toEqual(3);
    });
  });
});
