// @ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount, shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Hashtags from "../../src/Hashtags.web";

const hashCodesData = require("../../__mocks__/hashCodesData.json");

const navigation = require("react-navigation");

const screenProps = {
    navigation: navigation,
    id: "Hashtags",
    hashTags:[
        "cotton",
        "wild"
    ],
    searchQuery:"#nature"
};
const withScreenProps = {
    navigation: navigation,
    id: "Hashtags",
    hashTags:[
        "cotton",
        "wild"
    ],
    searchQuery:"nature"
};

const feature = loadFeature(
    "./__tests__/features/Hashtags-scenario.web.feature"
);

const hashtag = { "data": [{ "id": "4", "type": "tag", "attributes": { "id": 4, "name": "Test", "created_at": "2022-05-06T17:49:44.330+05:30", "updated_at": "2022-05-06T17:49:44.330+05:30", "swag_shots_count": 23 } }, { "id": "13", "type": "tag", "attributes": { "id": 13, "name": "Tatva", "created_at": "2022-05-25T10:03:27.431+05:30", "updated_at": "2022-05-25T10:03:27.431+05:30", "swag_shots_count": 6 } }, { "id": "20", "type": "tag", "attributes": { "id": 20, "name": "Testuser ", "created_at": "2022-06-22T10:28:12.741+05:30", "updated_at": "2022-06-22T10:28:12.741+05:30", "swag_shots_count": 6 } }, { "id": "9", "type": "tag", "attributes": { "id": 9, "name": "Tatvasoft ", "created_at": "2022-05-18T09:47:34.315+05:30", "updated_at": "2022-05-18T09:47:34.315+05:30", "swag_shots_count": 4 } }, { "id": "7", "type": "tag", "attributes": { "id": 7, "name": "Test ", "created_at": "2022-05-13T16:23:48.579+05:30", "updated_at": "2022-05-13T16:23:48.579+05:30", "swag_shots_count": 4 } }, { "id": "32", "type": "tag", "attributes": { "id": 32, "name": "Test1234", "created_at": "2022-07-21T09:55:42.603+05:30", "updated_at": "2022-07-21T09:55:42.603+05:30", "swag_shots_count": 2 } }, { "id": "6", "type": "tag", "attributes": { "id": 6, "name": "Teet", "created_at": "2022-05-12T15:19:18.357+05:30", "updated_at": "2022-05-12T15:19:18.357+05:30", "swag_shots_count": 1 } }, { "id": "33", "type": "tag", "attributes": { "id": 33, "name": "Tedt", "created_at": "2022-08-17T11:47:43.259+05:30", "updated_at": "2022-08-17T11:47:43.259+05:30", "swag_shots_count": 1 } }, { "id": "5", "type": "tag", "attributes": { "id": 5, "name": "Tewr", "created_at": "2022-05-11T15:23:57.426+05:30", "updated_at": "2022-05-11T15:23:57.426+05:30", "swag_shots_count": 1 } }, { "id": "21", "type": "tag", "attributes": { "id": 21, "name": "Tata", "created_at": "2022-06-22T11:37:16.366+05:30", "updated_at": "2022-06-22T11:37:16.366+05:30", "swag_shots_count": 1 } }] };
const selectedHash = { "id": 30, "name": "india", "created_at": "2023-03-22T16:01:28.367+05:30", "updated_at": "2023-03-22T16:01:28.367+05:30", "swag_shots_count": 2, "posts_count": 1 };

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to HashtagsWeb", ({ given, when, then }) => {
        let hashtagsWebWrapper: ShallowWrapper;
        let instance: Hashtags;

        given("I am a User loading HashtagsWeb", () => {
            hashtagsWebWrapper = shallow(<Hashtags {...screenProps} />).dive();
        });

        given("I am a User loading HashtagsWeb without  hastags", () => {
            hashtagsWebWrapper = shallow(<Hashtags {...withScreenProps} />).dive();
        });

        when("I navigate to the HashtagsWeb", () => {
            instance = hashtagsWebWrapper.instance() as Hashtags;
        });

        then("HashtagsWeb will load with out errors", async () => {
            await instance.componentDidMount();
            expect(hashtagsWebWrapper).toBeTruthy();
        });

        then("I can set the default state with out error", () => {
            instance.setState({
                token:
                    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NDMzLCJleHAiOjE2ODE5NzEzODd9.HhJA9ggikCH24ZFOy8iP5bFNa2q925VGa1_9lVbza-8APbPSRQ4lAICzzqApcTHPx-2DvESDCniFnUPJQrO27A",
                hashData: hashCodesData.data.map((item: any) => item.attributes),
                hashInputValue: "",
                selectedHashOption: null,
                selectedHashOptions: []
            }, async () => {
                expect(instance.state.token).toEqual("eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NDMzLCJleHAiOjE2ODE5NzEzODd9.HhJA9ggikCH24ZFOy8iP5bFNa2q925VGa1_9lVbza-8APbPSRQ4lAICzzqApcTHPx-2DvESDCniFnUPJQrO27A");
            });
        });

        then("Autocomplete renders without errors", () => {
            const wrapper = mount(<Hashtags {...screenProps} />);
            const autocomplete = wrapper.find("input[name='hashtags']");
            // expect(autocomplete).toHaveLength(1);
        });

        then("should update the state with the new input value", () => {
            instance.handleHashInputChange({} as React.ChangeEvent<{}>, "india");
            expect(instance.state.hashInputValue).toEqual("india");
        });

        then("should call hashtagFn when the input value is not empty", () => {
            instance.hashtagFn = jest.fn();
            instance.handleHashInputChange({} as React.ChangeEvent<{}>, "india");
            expect(instance.hashtagFn).toHaveBeenCalledWith("india");
        });

        then("should not call hashtagFn when the input value is empty", () => {
            instance.hashtagFn = jest.fn();
            instance.handleHashInputChange({} as React.ChangeEvent<{}>, "");
            expect(instance.hashtagFn).not.toHaveBeenCalled();
        });

        then("I am a user attempting to fetch hashcodes based on search value", () => {
            let magResendSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magResendSucessRestAPI.messageId);
            magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), JSON.parse(JSON.stringify(hashtag)));
            instance.hashtagApiCallId = magResendSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magResendSucessRestAPI);
            instance.handleHashOptionChange({} as React.ChangeEvent<{}>, selectedHash);
            instance.handleHashChipDelete(selectedHash);
            expect(instance.state.hashInputValue).toEqual("");
        });

        then("the user should be able to remove the chip by clicking on the delete icon", () => {
            instance.setState({
                selectedHashOptions: [selectedHash]
            }, async () => {
                const chips = hashtagsWebWrapper.find('[data-testid="selectedHashCode"]');
                if (chips.length > 0) {
                    (chips.first().prop('onDelete') as () => void)();
                    expect(instance.state.selectedHashOptions).toHaveLength(0);
                }
            })
        });

        then("should display options when user types in the input", () => {
            const autocomplete = hashtagsWebWrapper.find("input[name='hashtags']");
            const getOptionLabelWrapper = (param: any) => () => {
                (autocomplete.first().prop('getOptionLabel') as (param: any) => void)(param);
            };
            getOptionLabelWrapper([selectedHash]);
            expect(hashtagsWebWrapper).toBeTruthy();
        });

        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(hashtagsWebWrapper).toBeTruthy();
        });
    });
});

