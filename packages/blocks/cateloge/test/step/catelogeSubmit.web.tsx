import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CatalogueSubmit from "../../src/CatalogueSubmit.web";
const screenProps = {
    goToPortfolioPage: true,
    showUploadedData :[ 
        {
        "id": "291",
        "type": "catalogue",
        "attributes": {
            "title": null,
            "description": null,
            "location": null,
            "nsfw_content": null,
            "status": "submitted",
            "keyword_array": [],
            "license_type": "type1",
            "size": "small",
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "sale_price": null,
            "updated_at": "2024-01-27T08:57:53.580Z",
            "created_at": "2024-01-27T08:57:53.572Z",
            "category": null,
            "images": {
                "url": "https://video.mp4",
                "status": "submitted"
            }
        }
    }, 
    {
        "id": "295",
        "type": "catalogue",
        "attributes": {
            "title": null,
            "description": null,
            "location": null,
            "nsfw_content": null,
            "status": "submitted",
            "keyword_array": [],
            "license_type": "type1",
            "size": "small",
            "account_id": 515,
            "technical_specification": null,
            "price": null,
            "sale_price": null,
            "updated_at": "2024-01-27T14:40:39.184Z",
            "created_at": "2024-01-27T14:40:39.166Z",
            "category": null,
            "images": {
                "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdmdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c89d683d549fb7933b16f67e6e17afa643df4b62/flower2.jpeg",
                "status": "submitted"
            }
        }
    },],
    goToUpload:jest.fn(),
    selectedSingleContent: ["291"],
    handleImageClick:jest.fn(),
};

const feature = loadFeature(
  "./__tests__/features/catalogueSubmit-scenario.web.feature"
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
    let instance: CatalogueSubmit;

    given("I am a User loading catalogue", () => {
      catalogueBlock = shallow(<CatalogueSubmit {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = catalogueBlock.instance() as CatalogueSubmit;      

            let handleImageClick = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'handleImageClick')
            handleImageClick.at(0).prop('onClick')(1, 'ContentName', "https://video.mp4")

            let imageClick = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'imageClick')
            imageClick.at(0).prop('onClick')(1, 'ContentName')

           
    });
    then("I can leave the screen with out errors", () => {
      let tabChange = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'tabChange')
    //   tabChange.prop('onChange')("test",2);
     
    });
  });
});
