import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import {TabPanel} from "../../src/CataloguePortfolio.web";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CataloguePortfolio from "../../src/CataloguePortfolio.web";
const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "Catalogue",
};
const feature = loadFeature(
  "./__tests__/features/cataloguePortfolio-scenario.web.feature"
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
const tabPanelProps = {
  children: jest.fn(),
  index: jest.fn(),
  value: jest.fn()
}
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let catalogueBlock: ShallowWrapper;
    let instance: CataloguePortfolio;

    given("I am a User loading catalogue", () => {
      catalogueBlock = shallow(<CataloguePortfolio {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = catalogueBlock.instance() as CataloguePortfolio;
      shallow(<TabPanel {...tabPanelProps} value={tabPanelProps.index} />)
      
      let handleContentChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleContentChange')
            handleContentChange.prop('onChange')({target:{value:"test"}})
            let goToUpload = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'goToUpload')
            goToUpload.prop('goToUpload')()
            goToUpload.prop("goToLanding")()
            goToUpload.prop("handleSelect")({value:"lg"})
            let handleMultiSelect = catalogueBlock.findWhere((node) => node.prop('data-test-id') == "multiSelect")
            handleMultiSelect.simulate('click')

            let handleImageClick1 = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleSubmitBlock')
            handleImageClick1.at(0).prop('handleImageClick')(1, 'ContentName', "https://video.mp4")
            const mockEvents= {
              key: 'Enter',
              preventDefault: jest.fn(),
            };
            const mockEvents2 = {
              key: 'Escape',
              preventDefault: jest.fn(),
            };
            let gotodashboard = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'goToDashboard')
            gotodashboard.at(0).prop('goToDashboard')();
            gotodashboard.at(0).prop('deleteAllModalOpen')()
             gotodashboard.at(0).prop('handleContentInfo')();
             gotodashboard.at(0).prop('closeModal')();
             gotodashboard.at(0).prop('handleCategoryChange')({target:{value:"testing"}})
             gotodashboard.at(0).prop('handleFormChange')({ value: 'test', name: 'description' })
             gotodashboard.at(0).prop('handleFormChange')({ value: 'test', name: 'title' })
             gotodashboard.at(0).prop('handleFormChange')({value:"india", name:"location"})
             gotodashboard.at(0).prop('handleCheckBoxChange')()
             gotodashboard.at(0).prop('handleKeyDown')(mockEvents)
             gotodashboard.at(0).prop('handleKeyDown')(mockEvents2)
             gotodashboard.at(0).prop('handleRemoveKeyword')(['hills'])
             gotodashboard.at(0).prop('handleAddKeyword')(["hills"])
             gotodashboard.at(0).prop('handleInputKeywordChange')({value:"hills"})
            const msgProductRestAPI = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            msgProductRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgProductRestAPI.messageId
            );
            msgProductRestAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                "data": [
                  {
                      "id": "241",
                      "type": "catalogue",
                      "attributes": {
                          "title": "orange",
                          "description": "okayysss",
                          "location": "ujjain",
                          "nsfw_content": true,
                          "keyword_array": [
                              "greenery"
                          ],
                          "account_id": 515,
                          "technical_specification": null,
                          "price": null,
                          "updated_at": "2024-01-23T17:12:59.990Z",
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
                              "status": "saved"
                          }
                      }
                  },
                  {
                    "id": "231",
                    "type": "catalogue",
                    "attributes": {
                        "title": "red",
                        "description": "flowers look",
                        "location": "ok",
                        "nsfw_content": true,
                        "keyword_array": [
                            "Eco-Friendly"
                        ],
                        "account_id": 515,
                        "technical_specification": null,
                        "price": null,
                        "updated_at": "2024-01-23T15:19:33.767Z",
                        "created_at": "2024-01-22T13:57:57.785Z",
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
                            "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26381f7ae1ed9eb2efac575d65b20756a8bdeee1/flower1.jpeg",
                            "status": "saved"
                        }
                    }
                }
                ],
                meta: {
                  total: 5,
                },
              }
            );
            instance.showContentCallId = msgProductRestAPI.messageId;
            runEngine.sendMessage("Unit Test", msgProductRestAPI);

            let handleReviewBlock = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleReviewBlock')
            handleReviewBlock.prop('handleMoreList')({currentTarget:"test"});
            handleReviewBlock.prop('handlePreviewClose')();
            handleReviewBlock.prop('handleContentPreview')()
            handleReviewBlock.prop('closeList')
            let deleteSingleContent = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'deleteSingleContent')
            deleteSingleContent.at(0).prop('onClick')()

            let saveDetailsBtn = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'saveDetailsBtn')
            saveDetailsBtn.prop('onClick')()
            const deleteApiCall = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            deleteApiCall.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              deleteApiCall.messageId
            );
            deleteApiCall.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
           {success:true})
            instance.deleteSingleContentCallId = deleteApiCall.messageId;
            runEngine.sendMessage("Unit Test", deleteApiCall);

            let handleAddKeyword = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleAddKeyword')
            // handleAddKeyword.at(0).prop('onClick')(["hills"])
            let tabChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'tabChange')
            tabChange.prop('onChange')("test",1);
            const msgDeleteApi = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            msgDeleteApi.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgDeleteApi.messageId
            );
            msgDeleteApi.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
           {success:true})
            instance.deleteSingleContentCallId = msgDeleteApi.messageId;
            runEngine.sendMessage("Unit Test", msgDeleteApi);
            const msgPending = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            msgPending.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgPending.messageId
            );
            msgPending.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
             { data:[ {
              "id": "238",
              "type": "catalogue",
              "attributes": {
                  "title": "all",
                  "description": "datassss",
                  "location": "pakstan",
                  "nsfw_content": true,
                  "keyword_array": [
                      "hills"
                  ],
                  "account_id": 515,
                  "technical_specification": null,
                  "price": null,
                  "updated_at": "2024-01-23T10:55:39.883Z",
                  "created_at": "2024-01-22T17:40:25.700Z",
                  "category": {
                      "id": "10",
                      "type": "category",
                      "attributes": {
                          "id": 10,
                          "title": "Architecture",
                          "images": null
                      }
                  },
                  "images": {
                      "url": "https://video.mp4",
                      "status": "pending"
                  }
              }
          },
          {
              "id": "242",
              "type": "catalogue",
              "attributes": {
                  "title": "all",
                  "description": "purple",
                  "location": "aaa",
                  "nsfw_content": true,
                  "keyword_array": [
                      "landscape"
                  ],
                  "account_id": 515,
                  "technical_specification": null,
                  "price": null,
                  "updated_at": "2024-01-23T12:13:21.340Z",
                  "created_at": "2024-01-22T17:41:53.791Z",
                  "category": {
                      "id": "6",
                      "type": "category",
                      "attributes": {
                          "id": 6,
                          "title": "Nature",
                          "images": null
                      }
                  },
                  "images": {
                      "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcjhEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7554e089f9c91897b11e1ca7be65d33e7985bc9/flower3.jpeg",
                      "status": "pending"
                  }
              }
          }], 
          meta:{
            total:22
          }}
            );
            instance.showPendingCallId = msgPending.messageId;
            runEngine.sendMessage("Unit Test", msgPending);
            let handleContentCategoryChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleContentCategoryChange')
            handleContentCategoryChange.prop('onChange')({target:{value:"test"}})
            
    });

    then("catalogue will load with out errors", () => {
      const msgReviewApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgReviewApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgReviewApi.messageId
      );
      msgReviewApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      [])
      instance.showReviewedDataCallId = msgReviewApi.messageId;
      runEngine.sendMessage("Unit Test", msgReviewApi);
            
      instance.componentDidMount();
      
    });

    then("catalogue will load data from API", () => {
    

      const msgDeleteApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgDeleteApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgDeleteApi.messageId
      );
      msgDeleteApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "success": true
      }
      );
      instance.deleteAllContentCallId = msgDeleteApi.messageId;
      runEngine.sendMessage("Unit Test", msgDeleteApi);
    });

    then("I can leave the screen with out errors", () => {
      const msgCategoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgCategoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCategoryApi.messageId
      );
      msgCategoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data: [{
          "id": "1",
          "type": "category",
          "attributes": {
              "id": 1,
              "title": "K12",
              "images": null
          }
      }]}
      );
      instance.showAllCategoryDataCallId = msgCategoryApi.messageId;
      runEngine.sendMessage("Unit Test", msgCategoryApi);

      let tabChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'tabChange')
      tabChange.prop('onChange')("test",2);
      let handleContentReviewChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleContentReviewChange')
      handleContentReviewChange.prop('onChange')({target:{value:"test"}})
      const msgReviewApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgReviewApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgReviewApi.messageId
      );
      msgReviewApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      {data : [{
          "id": "218",
          "type": "catalogue",
          "attributes": {
              "title": null,
              "description": null,
              "location": null,
              "nsfw_content": null,
              "keyword_array": [],
              "account_id": 515,
              "technical_specification": null,
              "price": null,
              "category": null,
              "images": {
                  "url": "https://flower.jpeg",
                  "status": "accepted"
              }
          }
      },
      {
        "id": "217",
        "type": "catalogue",
        "attributes": {
            "title": null,
            "description": null,
            "location": null,
            "nsfw_content": null,
            "keyword_array": [],
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "category": null,
            "images": {
                "url": "https://flower.jpeg",
                "status": "rejected"
            }
        }
    }],
      meta:{total:"32"}
      })
      instance.showReviewedDataCallId = msgReviewApi.messageId;
      runEngine.sendMessage("Unit Test", msgReviewApi);
            const msgDeleteApi = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            msgDeleteApi.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgDeleteApi.messageId
            );
            msgDeleteApi.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
           {success:true})
            instance.deleteSingleContentCallId = msgDeleteApi.messageId;
            runEngine.sendMessage("Unit Test", msgDeleteApi);

            const msgSaveApi = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            msgSaveApi.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgSaveApi.messageId
            );
            msgSaveApi.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
           { "data": [
            {
                "id": "231",
                "type": "catalogue",
                "attributes": {
                    "title": "my changes",
                    "description": "This is  videosingggg",
                    "location": "india",
                    "nsfw_content": false,
                    "keyword_array": [
                        "updated",
                        "updated",
                        "Soil"
                    ],
                    "account_id": 515,
                    "technical_specification": null,
                    "price": null,
                    "updated_at": "2024-01-23T17:19:14.579Z",
                    "created_at": "2024-01-22T13:57:57.785Z",
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
                        "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26381f7ae1ed9eb2efac575d65b20756a8bdeee1/flower1.jpeg",
                        "status": "saved"
                    }
                }
            }
        ],
        "meta": {
            "total": 57
        }})
            instance.saveDetailsCallId = msgSaveApi.messageId;
            runEngine.sendMessage("Unit Test", msgSaveApi);

            const msgInfoApi = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            msgInfoApi.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgInfoApi.messageId
            );
            msgInfoApi.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
           { "data": [
            {
                "id": "231",
                "type": "catalogue",
                "attributes": {
                    "title": "videos yess bb",
                    "description": "This is  videos",
                    "location": "india",
                    "nsfw_content": false,
                    "keyword_array": [
                        "updated",
                        "updated",
                        "Soil"
                    ],
                    "account_id": 515,
                    "technical_specification": null,
                    "price": null,
                    "updated_at": "2024-01-23T17:20:16.474Z",
                    "created_at": "2024-01-22T13:57:57.785Z",
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
                        "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26381f7ae1ed9eb2efac575d65b20756a8bdeee1/flower1.jpeg",
                        "status": "pending"
                    }
                }
            }
        ],
        "meta": {
            "total": 57
        }})
            instance.contentInfoCallId = msgInfoApi.messageId;
            runEngine.sendMessage("Unit Test", msgInfoApi);
                

    });
  });
});
