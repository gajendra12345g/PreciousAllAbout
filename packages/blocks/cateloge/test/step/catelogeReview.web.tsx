import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CatalogueReview from "../../src/CatalogueReview.web";
const navigation = require("react-navigation");

const screenProps = {
    showReviewedData :[{
        "id": "296",
        "type": "catalogue",
        "attributes": {
            "title": "qwertt",
            "description": "zzzz",
            "location": "qqq",
            "nsfw_content": true,
            "status": "saved",
            "keyword_array": [
                "hills"
            ],
            "license_type": "type1",
            "size": "small",
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "sale_price": null,
            "updated_at": "2024-01-29T08:03:05.991Z",
            "created_at": "2024-01-27T14:40:39.230Z",
            "category": {
                "id": "8",
                "type": "category",
                "attributes": {
                    "id": 8,
                    "title": "Drone",
                    "images": null
                }
            },
            "images": {
                "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdmtEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8524863f1ca981ab9a4cfc9747485ddf1da18a07/flower3.jpeg",
                "status": "saved"
            }
        }
    },
    {
        "id": "240",
        "type": "catalogue",
        "attributes": {
            "title": "videosimmmmmmmmm",
            "description": "This is  videosingggg",
            "location": "india",
            "nsfw_content": true,
            "status": "saved",
            "keyword_array": [
                "updated",
                "updated",
                "Soil"
            ],
            "license_type": "type1",
            "size": "small",
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "sale_price": null,
            "updated_at": "2024-01-23T15:36:18.519Z",
            "created_at": "2024-01-22T17:41:53.702Z",
            "category": {
                "id": "3",
                "type": "category",
                "attributes": {
                    "id": 3,
                    "title": "Govt Job",
                    "images": null
                }
            },
            "images": {
                "url": "https://video.mp4",
                "status": "rejected"
            }
        }
    }],
    goToPortfolioPage: jest.fn(),
    goToUpload:jest.fn(),
    isPreviewOpen: jest.fn(),
     selectedSingleContent:["240"],
      fullConetnt: "https://video.mp4",
      handleImageClick : jest.fn(),
      handleMoreList : jest.fn(),
      openlist: jest.fn(),
      deleteSingleContent: jest.fn(),
      handleContentPreview: jest.fn(),
      handlePreviewClose: jest.fn(),
      closeList:jest.fn()

};
const screenPropsData = {
    showReviewedData :[{
        "id": "296",
        "type": "catalogue",
        "attributes": {
            "title": "qwertt",
            "description": "zzzz",
            "location": "qqq",
            "nsfw_content": true,
            "status": "saved",
            "keyword_array": [
                "hills"
            ],
            "license_type": "type1",
            "size": "small",
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "sale_price": null,
            "updated_at": "2024-01-29T08:03:05.991Z",
            "created_at": "2024-01-27T14:40:39.230Z",
            "category": {
                "id": "8",
                "type": "category",
                "attributes": {
                    "id": 8,
                    "title": "Drone",
                    "images": null
                }
            },
            "images": {
                "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdmtEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8524863f1ca981ab9a4cfc9747485ddf1da18a07/flower3.jpeg",
                "status": "saved"
            }
        }
    },
    {
        "id": "240",
        "type": "catalogue",
        "attributes": {
            "title": "videosimmmmmmmmm",
            "description": "This is  videosingggg",
            "location": "india",
            "nsfw_content": true,
            "status": "saved",
            "keyword_array": [
                "updated",
                "updated",
                "Soil"
            ],
            "license_type": "type1",
            "size": "small",
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "sale_price": null,
            "updated_at": "2024-01-23T15:36:18.519Z",
            "created_at": "2024-01-22T17:41:53.702Z",
            "category": {
                "id": "3",
                "type": "category",
                "attributes": {
                    "id": 3,
                    "title": "Govt Job",
                    "images": null
                }
            },
            "images": {
                "url": "https://video.mp4",
                "status": "rejected"
            }
        }
    }],
    goToPortfolioPage: jest.fn(),
    goToUpload:jest.fn(),
    isPreviewOpen: jest.fn(),
     selectedSingleContent:["240"],
      fullConetnt: "https://image.jpeg",
      handleImageClick : jest.fn(),
      handleMoreList : jest.fn(),
      openlist: jest.fn(),
      deleteSingleContent: jest.fn(),
      handleContentPreview: jest.fn(),
      handlePreviewClose: jest.fn(),
      closeList:jest.fn()
}

const feature = loadFeature(
  "./__tests__/features/catalogueReview-scenario.web.feature"
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
    let instance: CatalogueReview;

    given("I am a User loading catalogue", () => {
      catalogueBlock = shallow(<CatalogueReview {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = catalogueBlock.instance() as CatalogueReview;  
      let handleImageClick1 = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleImageClick')
            handleImageClick1.at(0).prop('onClick')(1, 'ContentName', "https://video.mp4")
      
      catalogueBlock = shallow(<CatalogueReview {...screenPropsData} />);
      
            let goToUpload = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'goToUpload')
            let handleImageClick = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleImageClick')
            handleImageClick.at(0).prop('onClick')(1, 'ContentName', "https://image.jpeg")
    });
    then("I can leave the screen with out errors", () => {
      let handleMoreList = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleMoreList')
            handleMoreList.at(0).prop('onClick')()

            let handlePreviewClose = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handlePreviewClose')
            handlePreviewClose.prop('onClose')()

            let handleContentPreview = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleContentPreview')
            handleContentPreview.at(0).prop('onClick')()
            let close = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'close')
            close.at(0).prop('onClose')()

    });
  });
});
