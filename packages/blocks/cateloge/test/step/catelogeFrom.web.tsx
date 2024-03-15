import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CatalogueForm from "../../src/CatalogueForm.web";
const navigation = require("react-navigation");

const screenProps = {
    value: jest.fn(),
    handleContentInfo: jest.fn(),
    deleteAllModalOpen: jest.fn(),
    submitModal: jest.fn(),
    title: jest.fn(),
    handleFormChange: jest.fn(),
    description: jest.fn(),
    selectedCategoryIndex: jest.fn(),
    handleCategoryChange:jest.fn(),
    showCategoryData: [{
        "id": "1",
        "type": "category",
        "attributes": {
            "id": 1,
            "title": "K12",
            "images": null
        }
    },
    {
        "id": "2",
        "type": "category",
        "attributes": {
            "id": 2,
            "title": "Higher Education",
            "images": null
        }
    }],
    isChecked: jest.fn(),
    handleCheckBoxChange: jest.fn(),
    inputValue: jest.fn(),
    handleInputKeywordChange: jest.fn(),
    handleKeyDown: jest.fn(),
    handleRemoveKeyword: jest.fn(),
    keywords: ["hills", "landscape"],
    suggestions: ["hills", "landscape"],
    handleAddKeyword: jest.fn(),
    goToDashboard: jest.fn(),
    closeModal: jest.fn(),
    location: jest.fn(),
    handleDeleteKeyword: jest.fn(),
     submittedDate: jest.fn(),
     reviewAcceptDate : jest.fn()
};

const feature = loadFeature(
  "./__tests__/features/catalogueForm-scenario.web.feature"
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
    let instance: CatalogueForm;

    given("I am a User loading catalogue", () => {
      catalogueBlock = shallow(<CatalogueForm   {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = catalogueBlock.instance() as CatalogueForm; 
     
      let handleContentChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleContentChange')
            // handleContentChange.prop('onChange')({target:{value:"test"}})
            let goToUpload = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'goToUpload')
            // goToUpload.prop('goToUpload')()
            // let handleMultiSelect = catalogueBlock.findWhere((node) => node.prop('data-test-id') == "multiSelect")
            // handleMultiSelect.simulate('click')

            let handleImageClick = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleImageClick')
            // handleImageClick.at(0).prop('onClick')(1, 'ContentName', "https://video.mp4")
            let imageClick = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'imageClick')
            // imageClick.at(0).prop('onClick')(1, 'ContentName')

            let deleteSingleContent = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'deleteSingleContent')
            // deleteSingleContent.at(0).prop('onClick')()

            let saveDetailsBtn = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'saveDetailsBtn')
            // saveDetailsBtn.at(0).prop('onClick')()

            let handleFormChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleFormChange')
            // handleFormChange.at(0).prop('onChange')({ value: 'test', name: 'description' })
            
            let handleFormChange2 = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleFormChange')
            // handleFormChange2.at(0).prop('onChange')({ value: 'test', name: 'title' })

            let handleCategoryChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleCategoryChange')
            // handleCategoryChange.prop('onChange')({target:{value:"test"}})

            let handleFormChangeLocation = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleFormChangeLocation')
            // handleFormChangeLocation.prop('onChange')({value:"india", name:"location"})
            let KeywordChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleInputKeywordChange')
            // KeywordChange.prop('onChange')({value:'Hills'})
            const mockEvent = {
              key: 'Enter',
              preventDefault: jest.fn(),
            };
            let handleRemoveKeyword = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleRemoveKeyword')
            handleRemoveKeyword.at(0).prop('onDelete')(["hills"])

            let goToDashboard = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'goToDashboard')
            goToDashboard.prop('onClick')()
    });

    then("catalogue will load with out errors", () => {
    });
  });
});
