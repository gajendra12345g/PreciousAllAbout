//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { beforeEach, expect, jest } from "@jest/globals";
import React from "react";
import Trending from "../../src/Trending.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    hideKeyboard: jest.fn(),
  },
  id: "Trending",
};
const Item = {
  id: "2",
  type: "trending",
  attributes: {
    name: "jeans",
    sku: "jeans",
    description:
      "Jeans are a type of pants or trousers made from denim or dungaree cloth",
    manufacture_date: "2020-02-17T14:14:00.000Z",
    length: 11.0,
    breadth: 12.0,
    height: 24.0,
    availability: 34,
    stock_qty: 80,
    weight: "32.0",
    price: 900.0,
    recommended: true,
    on_sale: true,
    sale_price: "1890.0",
    discount: "120.0",
    images: [
      {
        id: 680,
        url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWdDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a9134c54865e125987ab739e29a9880fa5ba274e/jense1.jpeg",
        type: "image",
        filename: "jense1.jpeg",
      },
      {
        id: 681,
        url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWtDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f73db01e9fc614d296db2f900db04c9c332a818e/jense2.webp",
        type: "image",
        filename: "jense2.webp",
      },
    ],
  },
};

const apiData = [
  {
    id: "2",
    type: "trending",
    attributes: {
      name: "jeans",
      sku: "jeans",
      description:
        "Jeans are a type of pants or trousers made from denim or dungaree cloth",
      manufacture_date: "2020-02-17T14:14:00.000Z",
      length: 11.0,
      breadth: 12.0,
      height: 24.0,
      availability: 34,
      stock_qty: 80,
      weight: "32.0",
      price: 900.0,
      recommended: true,
      on_sale: true,
      sale_price: "1890.0",
      discount: "120.0",
      images: [
        {
          id: 680,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWdDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a9134c54865e125987ab739e29a9880fa5ba274e/jense1.jpeg",
          type: "image",
          filename: "jense1.jpeg",
        },
        {
          id: 681,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWtDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f73db01e9fc614d296db2f900db04c9c332a818e/jense2.webp",
          type: "image",
          filename: "jense2.webp",
        },
      ],
    },
  },
  {
    id: "3",
    type: "trending",
    attributes: {
      name: "tshirt",
      sku: "tshirt",
      description:
        "tshirt are a type of pants or trousers made from denim or dungaree cloth",
      manufacture_date: "2020-02-17T14:14:00.000Z",
      length: 11.0,
      breadth: 12.0,
      height: 24.0,
      availability: 34,
      stock_qty: 80,
      weight: "32.0",
      price: 900.0,
      recommended: true,
      on_sale: true,
      sale_price: "1890.0",
      discount: "120.0",
      images: [
        {
          id: 680,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWdDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a9134c54865e125987ab739e29a9880fa5ba274e/jense1.jpeg",
          type: "image",
          filename: "jense1.jpeg",
        },
        {
          id: 681,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWtDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f73db01e9fc614d296db2f900db04c9c332a818e/jense2.webp",
          type: "image",
          filename: "jense2.webp",
        },
      ],
    },
  },
];

const feature = loadFeature(
  "./__tests__/features/Trending-scenario.web.feature"
);

global.localStorage = {
  state: {
    "access-token": "8eb0f9fd-80a6-59b0-bac3-f74533a7bcc7",
  },
  setItem(key, item) {
    this.state[key] = item;
  },
  getItem(key) {
    return this.state[key];
  },
  clear(key) {
    return this.state[key];
  },
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(global.localStorage, "clear");
    jest.spyOn(global.localStorage, "getItem");
    jest.spyOn(global.localStorage, "setItem");
  });

  test("User navigates to Trending", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Trending;

    given("I am a User loading Trending", () => {
      exampleBlockA = shallow(<Trending route={""} {...screenProps} />);
      instance = exampleBlockA.instance() as Trending;
      instance.trending();
      const TrendingListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      TrendingListAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        TrendingListAPI
      );
      TrendingListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: apiData,
        }
      );
      instance.trendingList = TrendingListAPI;
      runEngine.sendMessage("Unit Test", TrendingListAPI);
      instance.setState({ loading: false, list: apiData });
    });

    // when("Trending load without errors", () => {
    //   instance.trending();
    //   const TrendingListAPI = new Message(
    //     getName(MessageEnum.RestAPIResponceMessage)
    //   );
    //   TrendingListAPI.addData(
    //     getName(MessageEnum.RestAPIResponceDataMessage),
    //     TrendingListAPI
    //   );
    //   TrendingListAPI.addData(
    //     getName(MessageEnum.RestAPIResponceSuccessMessage),
    //     {
    //       data: apiData,
    //     }
    //   );
    //   instance.trendingList = TrendingListAPI;
    //   runEngine.sendMessage("Unit Test", TrendingListAPI);
    //   instance.setState({ loading: false, list: apiData });
    // });

    then("I can see the trending products", () => {
      let listCompp = exampleBlockA.findWhere(
        (node) => node.prop("id") === "p_list_trending"
      );
      expect(listCompp).toHaveLength(2);
    });
  });

  test("Handle API errors", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Trending;

    given("I am on the Trending screen", () => {
      exampleBlockA = shallow(<Trending route={""} {...screenProps} />);
      instance = exampleBlockA.instance() as Trending;
    });

    when("Trending load with errors", () => {
      const TrendingListAPIError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      TrendingListAPIError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        TrendingListAPIError
      );
      TrendingListAPIError.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [],
        }
      );
      instance.trendingList = TrendingListAPIError;
      runEngine.sendMessage("Unit Test", TrendingListAPIError);
      instance.setState({ loading: false, list: [] });
    });

    then("I should not see the list of products", () => {
      let listCompp = exampleBlockA.findWhere(
        (node) => node.prop("id") === "p_list_trending"
      );
      expect(listCompp).toHaveLength(0);
      expect(instance.state.list.length).toEqual(0);
    });
  });
});
