import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import NavigationMenu from "../../src/NavigationMenu"
import { activeUserIcon } from "../../src/assets"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "NavigationMenu",
    drawerContent: true,
    sideBarListItem: [
        {
            id: "1",
            icon: activeUserIcon,
            listTitle: "Title 1",
            ActiveIcon:activeUserIcon,
            PathUrl: "RequestManagement",
        }
    ],
    sideBarBottomNav: [
        {
            id: "2",
            listTitle: "Title 2",
            ActiveIcon:activeUserIcon ,
            icon:activeUserIcon,
            PathUrl: "RequestManagement",
        }
    ],
  }
  const screenPropsData = {
    navigation:{
        openDrawer : jest.fn()
    },
    id: "NavigationMenu",
    drawerContent: false,
    sideBarListItem: [
        {
            id: "1",
            icon: activeUserIcon,
            listTitle: "Title 1",
            ActiveIcon:activeUserIcon,
            PathUrl: "RequestManagement",
        }
    ],
    sideBarBottomNav: [
        {
            id: "2",
            listTitle: "Title 2",
            ActiveIcon:activeUserIcon ,
            icon:activeUserIcon,
            PathUrl: "RequestManagement",
        }
    ],
  }

const feature = loadFeature('./__tests__/features/NavigationMenu-scenario.feature');

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
            navigationMenuBlock = shallow(<NavigationMenu {...screenProps}/>)
        });

        when('I navigate to the NavigationMenu', () => {
             instance = navigationMenuBlock.instance() as NavigationMenu
             const hideKeyboard = navigationMenuBlock.findWhere((node:any)=>node.prop('data-test-id')==='hideKeyboard')
      hideKeyboard.simulate('press')
        });

        then('NavigationMenu will load with out errors', () => {
            let contentData = {"data":{"id":"4","type":"navigation_menu","attributes":{"id":4,position:"rowl1","items":[]}}}
            const responseFirst = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
               );
               instance.apiGetDataCallId = responseFirst.messageId;
               responseFirst.addData(
               getName(MessageEnum.RestAPIResponceDataMessage),
                responseFirst.messageId
               );
               responseFirst.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                [contentData]
                );
              
               runEngine.sendMessage("For unit test", responseFirst);
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

            expect(navigationMenuBlock).toBeTruthy()
      
        });

        then('I can leave the screen with out errors', () => {
            let contentData = {"data":{id:"4","type":"navigation_menu","attributes":{"id":4,position:"left","items":[{id:"4", name:"test"}]}}}
            const responseFirst = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
               );
               instance.apiGetDataCallId = responseFirst.messageId;
               responseFirst.addData(
               getName(MessageEnum.RestAPIResponceDataMessage),
                responseFirst.messageId
               );
               responseFirst.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                [contentData]
                );
              
               runEngine.sendMessage("For unit test", responseFirst);
                const onPressMenuItem = navigationMenuBlock.findWhere((node:any)=>node.prop('data-test-id')==='onPressMenuItem')
      onPressMenuItem.simulate('press')
      
            instance.componentWillUnmount()
            expect(navigationMenuBlock).toBeTruthy()
        });

    });

test('User navigates to NavigationMenuBlock', ({ given, when, then }) => {
    let navigationMenuBlock:ShallowWrapper;
    let instance:NavigationMenu; 

    given('I am a User loading NavigationMenuBlock', () => {
        navigationMenuBlock = shallow(<NavigationMenu {...screenPropsData}/>)
    });

    when('I navigate to the NavigationMenuBlock', () => {
         instance = navigationMenuBlock.instance() as NavigationMenu
         const btnOpenDrawer = navigationMenuBlock.findWhere((node:any)=>node.prop('testID')==='btnOpenDrawer')
      btnOpenDrawer.prop('onPress')()
    });

    then('NavigationMenu will load with out errorss', () => {
        const responseFirst = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
           );
           instance.apiGetDataCallId = responseFirst.messageId;
           responseFirst.addData(
           getName(MessageEnum.RestAPIResponceDataMessage),
            responseFirst.messageId
           );
           responseFirst.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            []
            );
          
           runEngine.sendMessage("For unit test", responseFirst);
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

        expect(navigationMenuBlock).toBeTruthy()
        
  
    });

});

})