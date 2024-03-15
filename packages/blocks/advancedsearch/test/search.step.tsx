import { defineFeature, loadFeature } from 'jest-cucumber'
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from 'react'
import Search from '../../src/Search.web'
const navigation = require('react-navigation')

import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from '../../../../framework/src/Message'
export const configJSON = require('../../config.json')
import MessageEnum, {
  getName
} from '../../../../framework/src/Messages/MessageEnum'
import { _ } from '../../../../framework/src/IBlock'

const screenProps = {
  navigation: {
    navigate: jest.fn()
  },
  id: 'Search',
  startIcon: true,
  endIcon: false,
  dropDown: true,
  dropDownPosition: 'end',
  variant: 'dark',
  searchQuery: 'test',
  setSearchQuery: jest.fn(),
  testID: 'test',
  requestSearch: jest.fn(),
  setSearchType: jest.fn()
}

const feature = loadFeature('./__tests__/features/search-scenario.web.feature')

const testData = [
  {
    id: '1',
    type: 'user',
    attributes: {
      activated: true,
      country_code: '123',
      user_name: 'tester',
      email: 'irma.mctest@example.com',
      first_name: 'Irma',
      full_phone_number: '+12344567890',
      last_name: 'McTest',
      phone_number: '1234567890',
      type: 'user',
      created_at: '2021-12-03T16:55:09.405Z',
      updated_at: '2021-12-03T16:55:09.405Z',
      device_id: 'abcd-1234',
      unique_auth_id: '12345'
    }
  }
]

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
  })

  test('User navigates to advancedsearch', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search

    given('I am a User loading advancedsearch', () => {
        SearchWrapper = shallow(<Search {...screenProps} />)
    })

    when('I navigate to the advancedsearch', () => {
        instance = SearchWrapper.instance() as Search
        instance.props.setSearchQuery('test')
        const tokenMsg: Message = new Message(
            getName(MessageEnum.SessionResponseMessage)
          )
          tokenMsg.addData(getName(MessageEnum.SessionResponseToken), 'TOKEN')
          runEngine.sendMessage('Unit Test', tokenMsg)
    
          const getAdvancedSearchAPI = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          )
    
          getAdvancedSearchAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
            data: [
              {
                id: '1',
                type: 'user',
                attributes: {
                  activated: true,
                  country_code: '123',
                  user_name: 'tester',
                  email: 'irma.mctest@example.com',
                  first_name: 'Irma',
                  full_phone_number: '+12344567890',
                  last_name: 'McTest',
                  phone_number: '1234567890',
                  type: 'user',
                  created_at: '2021-12-03T16:55:09.405Z',
                  updated_at: '2021-12-03T16:55:09.405Z',
                  device_id: 'abcd-1234',
                  unique_auth_id: '12345'
                }
              }
            ]
          })
          instance.getRecommendationApiCallID = getAdvancedSearchAPI.messageId
          runEngine.sendMessage('Unit Test', getAdvancedSearchAPI)
    })

    then('I can enter in search bar input', () => {
        let textInputComponent = SearchWrapper.findWhere(node => node.prop('testID') === 'customSearch');
        // textInputComponent.simulate('change', 'test')
        textInputComponent.props().searchChange()
    })

    then('I can click on recommendations and move to advanced search with value', () => {
        let textInputComponent = SearchWrapper.findWhere(node => node.prop('testID') === 'customSearch');
        
        textInputComponent.props().clickSuggesion('Test Search Query');
    })

    then('I can click on recommendations and move to advanced search with out value', () => {
        let textInputComponent = SearchWrapper.findWhere(node => node.prop('testID') === 'customSearch');
        
        textInputComponent.props().clickSuggesion(null);
    })

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(SearchWrapper).toBeTruthy()
    })
  })
})
