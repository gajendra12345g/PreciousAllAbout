//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import LandingPage from "../../src/LandingPageContributor.web";

const feature = loadFeature(
  "./__tests__/features/LandingPageContributor-senario.web.features"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Contributor LandingPage", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPage;

    given("I am a User loading Contributor LandingPage", () => {
      landingPageBlock = shallow(
        <LandingPage navigation={{ navigate: jest.fn() }} id={""} />
      );
    });

    when("I navigate to the Contributor LandingPage", () => {
      instance = landingPageBlock.instance() as LandingPage;
    });

    then("Contributor LandingPage will load with out errors", () => {
      instance.setState({});
      expect(landingPageBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
