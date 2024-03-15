//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import FeaturedPhotographer from "../../src/FeaturedPhotographer.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const feature = loadFeature(
  "./__tests__/features/FeaturedPhotographer-scenario.web.features"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to FeaturedPhotographer", ({ given, when, then }) => {
    let FeaturedPhotographerBlock: ShallowWrapper;
    let instance: FeaturedPhotographer;

    given("I am a User loading FeaturedPhotographer", () => {
      FeaturedPhotographerBlock = shallow(
        <FeaturedPhotographer navigation={undefined} id={""} />
      );
    });

    when("I navigate to the FeaturedPhotographer", () => {
      instance = FeaturedPhotographerBlock.instance() as FeaturedPhotographer;
    });

    then("FeaturedPhotographer will load with out errors", () => {
      expect(FeaturedPhotographerBlock).toBeTruthy();
    });
    then("Search api will load", () => {
      const featuredData = [
        {
          attributes: {
            images: [{ url: "image1.jpg" }],
            medias: [{ url: "profileImage1.jpg" }],
            name: "Photographer 1",
            location: "Location 1",
          },
        },
        {
          attributes: {
            images: [{ url: "image2.jpg" }],
            medias: [{ url: "profileImage2.jpg" }],
            name: "Photographer 2",
            location: "Location 2",
          },
        },
      ];

      FeaturedPhotographerBlock.setState({ featuredData });
    });

    then("I can leave the screen with out errors", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message:
            "We are processing your file we will send you an email once successfully imported.",
          data: {
            error: [
              {
                catalogue_row: [
                  "Category can't be blank",
                  "Sub category can't be blank",
                  "Brand can't be blank",
                  "Sku has already been taken",
                ],
                variant_row: [],
                row_number: 0,
              },
            ],
            saved_object: {},
            already_exist: {},
          },
        }
      );
      instance.featuredApiId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      expect(FeaturedPhotographerBlock).toBeTruthy();
    });
  });
});
