import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import NavigationMenu from "../../src/NavigationMenu.web"
import SideBar from "../../../../components/src/DesignSystem/SideBar/SideBar.web"
import { activeUserIcon } from "../../src/assets"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "NavigationMenu",
    contributorContent: true,
    contributorPortfolio: false,
    contributorLogin: false,
    showHeardNav: true,
    showContributorLable: false,
    sideBarListItem: [
      {
          id: "1",
          icon: activeUserIcon,
          listTitle: "Title 1",
          ActiveIcon:activeUserIcon,
          PathUrl: "RequestManagement",
      },
  ],
  sideBarBottomNav: [
      {
          id: "2",
          listTitle: "Title 2",
          ActiveIcon:activeUserIcon ,
          icon:activeUserIcon,
          PathUrl: "RequestManagement",
      },
  ],
  }
  const screenPropsData = {
    navigation: navigation,
    id: "NavigationMenu",
    contributorLogin: true,
    languageOptions: true,
    contributorContent: true,
    contributorPortfolio: true,
    sideBarListItem: [
      {
          id: "1",
          icon: activeUserIcon,
          listTitle: "Title 1",
          ActiveIcon:activeUserIcon,
          PathUrl: "RequestManagement",
      },
  ],
  sideBarBottomNav: [
      {
          id: "2",
          listTitle: "Title 2",
          ActiveIcon:activeUserIcon ,
          icon:activeUserIcon,
          PathUrl: "RequestManagement",
      },
  ],
  }
  const ScreenNavigationProps = {
    navigation: navigation,
    id: "Sidebar",
    sideBarListItem: [
        {
            id: "1",
            icon: activeUserIcon,
            listTitle: "Title 1",
            ActiveIcon:activeUserIcon,
            PathUrl: "RequestManagement",
        },
    ],
    sideBarBottomNav: [
        {
            id: "2",
            listTitle: "Title 2",
            ActiveIcon:activeUserIcon ,
            icon:activeUserIcon,
            PathUrl: "RequestManagement",
        },
    ], 
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
const feature = loadFeature('./__tests__/features/NavigationMenu-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to NavigationMenu', ({ given, when, then }) => {
        let navigationMenuBlock:ShallowWrapper;
        let instance:NavigationMenu; 

        given('I am a User loading NavigationMenu', () => {
            navigationMenuBlock = shallow(<NavigationMenu {...screenProps}/>);
        });

        when('I navigate to the NavigationMenu', () => {
             instance = navigationMenuBlock.instance() as NavigationMenu;
             let handleDrawerClose = navigationMenuBlock.findWhere(
              (node) => node.prop("data-test-id") === "handleDrawerClose"
            );
          handleDrawerClose.prop('onClose')();

             let handleDrawerOpen = navigationMenuBlock.findWhere(
              (node) => node.prop("data-test-id") === "handleDrawerOpen"
            );
          handleDrawerOpen.prop('onClick')();

             let handleLanguageChange = navigationMenuBlock.findWhere(
              (node) => node.prop("data-test-id") === "handleLanguageChange"
            );
          handleLanguageChange.prop('selectNewItem')();
             let resetSignUp = navigationMenuBlock.findWhere(
              (node) => node.prop("data-test-id") === "resetSignUp"
            );
          resetSignUp.prop('backRes')();
        });

        then('NavigationMenu will load with out errors', () => {
            const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);
      
            let data = '{"data":{"id":"4","type":"navigation_menu","attributes":{"id":4,"position":"row1","items":[]}}},{"data":{"id":"2","type":"navigation_menu","attributes":{"id":2,"position":"right","items":[{"name":"Builder.ai","url":"http://builder.ai/"}]}}},{"data":{"id":"1","type":"navigation_menu","attributes":{"id":1,"position":"left","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Home","url":"Home"}]}}},{"data":{"id":"3","type":"navigation_menu","attributes":{"id":3,"position":"center","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Builder.aiw","url":"http://builder.aieee/"}]}}}'
            const msgNavigastionMenuAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgNavigastionMenuAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgNavigastionMenuAPI.messageId);
              msgNavigastionMenuAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage), 
              data
            );

            runEngine.sendMessage("Unit Test", msgNavigastionMenuAPI)
            let backRes = navigationMenuBlock.findWhere(
              (node) => node.prop("data-test-id") === "backRes"
            );
          backRes.prop('backRes')();
console.log("aaaaaaaaaaaaa", instance.state.closeSignupModal)

            let buttonComponent = navigationMenuBlock.findWhere(
                (node) => node.prop("data-test-id") === "closeSignup"
              );
            buttonComponent.prop('closeSignup')();

            expect(navigationMenuBlock).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
          let closeModal = navigationMenuBlock.findWhere(
            (node) => node.prop("data-test-id") === "resetLogin"
          );
          closeModal.prop('closeLogin')();

          let callBack = navigationMenuBlock.findWhere(
            (node) => node.prop("data-test-id") === "closeModal"
          );
          callBack.prop('callBack')();
          console.log("mmmmmmmmmmmmm", instance.state.closeLoginModal)
            instance.componentWillUnmount();
            expect(navigationMenuBlock).toBeTruthy();
        });
    });

    test('User navigates to NavigationMenuBlock', ({ given, when, then }) => {
      let navigationMenuBlock:ShallowWrapper;
      let instance:NavigationMenu; 

      given('I am a User loading NavigationMenuBlock', () => {
          navigationMenuBlock = shallow(<NavigationMenu {...screenPropsData}/>);
      });

      when('I navigate to the NavigationMenuBlock', () => {
           instance = navigationMenuBlock.instance() as NavigationMenu;
      });

      then('NavigationMenu will load with out errorss', () => {
          const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
          tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
          runEngine.sendMessage("Unit Test", tokenMsg);
    
          let data = '{"data":{"id":"4","type":"navigation_menu","attributes":{"id":4,"position":"row1","items":[]}}},{"data":{"id":"2","type":"navigation_menu","attributes":{"id":2,"position":"right","items":[{"name":"Builder.ai","url":"http://builder.ai/"}]}}},{"data":{"id":"1","type":"navigation_menu","attributes":{"id":1,"position":"left","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Home","url":"Home"}]}}},{"data":{"id":"3","type":"navigation_menu","attributes":{"id":3,"position":"center","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Builder.aiw","url":"http://builder.aieee/"}]}}}'
          const msgNavigastionMenuAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
          msgNavigastionMenuAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            msgNavigastionMenuAPI.messageId);
            msgNavigastionMenuAPI.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage), 
            data
          );

          runEngine.sendMessage("Unit Test", msgNavigastionMenuAPI)
          expect(navigationMenuBlock).toBeTruthy();
      });

  });

  test('User navigates to sidebarBlock', ({ given, when, then }) => {
    let SideBarBlock:ShallowWrapper;
    let instance:SideBar; 

    given('I am user loading sidebarBlock', () => {
      SideBarBlock = shallow(<SideBar {...ScreenNavigationProps}/>);
    });

    when('User Click on sideBarIcons', () => {
         instance = SideBarBlock.instance() as SideBar;
         let SideBarComponent = SideBarBlock.findWhere(
          (node) => node.prop("data-test-id") === "click-2"
        );
         SideBarComponent.simulate('click');
    });
    then('handleListItemClick function is trigger once', () => {
      SideBarBlock = SideBarBlock.update()
      expect(instance.state.active).toEqual("2")

    })

});

});
