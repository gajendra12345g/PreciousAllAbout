import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CataloguePending from "../../src/CataloguePending.web";
const navigation = require("react-navigation");

const screenProps = {
    goToPortfolioPage: jest.fn() ,
    showPendingData: [{
        "id": "256",
        "type": "catalogue",
        "attributes": {
            "title": "titless",
            "description": "qqqqqqqqqqqqq",
            "location": "http://localhost:3000/Contributor/Portfoli",
            "nsfw_content": true,
            "status": "pending",
            "keyword_array": [
                "photography"
            ],
            "license_type": "type1",
            "size": "small",
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "sale_price": null,
            "updated_at": "2024-01-29T09:35:38.828Z",
            "created_at": "2024-01-25T12:42:26.076Z",
            "category": {
                "id": "4",
                "type": "category",
                "attributes": {
                    "id": 4,
                    "title": "Competitive Exams",
                    "images": null
                }
            },
            "images": {
                "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdFVEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1bc5270105b346ddcb23bea9bc26293010a18af9/flower1.jpeg",
                "status": "pending"
            }
        }
    },
    {
        "id": "241",
        "type": "catalogue",
        "attributes": {
            "title": "orangessssssssssssssssssssssssss",
            "description": "okayysss",
            "location": "ujjaining",
            "nsfw_content": true,
            "status": "pending",
            "keyword_array": [
                "greenery"
            ],
            "license_type": "type1",
            "size": "small",
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "sale_price": null,
            "updated_at": "2024-01-23T17:23:33.445Z",
            "created_at": "2024-01-22T17:41:53.756Z",
            "category": {
                "id": "11",
                "type": "category",
                "attributes": {
                    "id": 11,
                    "title": "City View",
                    "images": null
                }
            },
            "images": {
                "url": "https://video.mp4",
                "status": "pending"
            }
        }
    }],
     selectedSingleContent:["241"],
     handleImageClick: jest.fn(),
     goToSubmiTab: jest.fn()
};

const feature = loadFeature(
  "./__tests__/features/cataloguePending-scenario.web.feature"
);
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

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let catalogueBlock: ShallowWrapper;
    let instance: CataloguePending;

    given("I am a User loading catalogue", () => {
      catalogueBlock = shallow(<CataloguePending {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = catalogueBlock.instance() as CataloguePending;      
            let handleImageClick = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleImageClick')
            handleImageClick.at(0).prop('onClick')(1, 'ContentName', "https://video.mp4")
            
            let handlePending = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handlePending')
            handlePending.at(0).prop('onClick')(1, 'ContentName', "https://video.mp4")
    });

    then("I can leave the screen with out errors", () => {
      let tabChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'tabChange')
    //   tabChange.prop('onChange')("test",2);
    });
  });
});
