/**
 * @jest-environment jsdom
*/
import { defineFeature, loadFeature } from 'jest-cucumber'
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from 'react'
import AdvancedSearch from '../../src/AdvancedSearch.web'
const navigation = require('react-navigation')

import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from '../../../../framework/src/Message'
export const configJSON = require('../../config.json')
import MessageEnum, {
  getName
} from '../../../../framework/src/Messages/MessageEnum'
import { _ } from '../../../../framework/src/IBlock'
import Search from "../../src/Search.web"
const mockNavigate = jest.fn();
const screenProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: mockNavigate,
    route: jest.fn(),
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
            remove: jest.fn()
        }
    }),
  },
  id: 'AdvancedSearch'
}

const feature = loadFeature('./__tests__/features/advancedsearch-scenario.web.feature')

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
const SearchUserMock=
  {
    "catalogues": {
        "data": [
            {
                "id": "927",
                "type": "catalogue",
                "attributes": {
                    "id": 927,
                    "title": "descccc",
                    "description": "qqqqqqqqq",
                    "location": "Angola",
                    "nsfw_content": false,
                    "status": "accepted",
                    "keyword_array": [
                        "delicious",
                        "Taste",
                        "Food"
                    ],
                    "license_type": "[]",
                    "size": "(0 to 500 employee)",
                    "format": null,
                    "account_id": 874,
                    "technical_specification": null,
                    "price": null,
                    "sale_price": "0.0",
                    "rejected_title": "",
                    "rejected_reason": "",
                    "updated_at": "2024-03-12T13:09:02.821Z",
                    "created_at": "2024-03-12T11:16:32.095Z",
                    "category": {
                        "id": "66",
                        "type": "category",
                        "attributes": {
                            "id": 66,
                            "title": "FOOD",
                            "keywords": [
                                "Taste",
                                "delicious",
                                "Food",
                                "healthy",
                                "junk",
                                "speicy",
                                "design",
                                "style",
                                "clothes",
                                "people",
                                "mountain",
                                "TEST",
                                "dummy",
                                "sample",
                                "FOREST",
                                "CARTON",
                                "ok",
                                "mn"
                            ],
                            "images": null
                        }
                    },
                    "images": {
                        "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8ffc760cfc1ca08fc954e4adc1009676e7c45764/tiger-jpg.jpg",
                        "status": "accepted",
                        "type": "image/jpeg"
                    },
                    "keyword_suggestion": null
                }
            },
            {
                "id": "932",
                "type": "catalogue",
                "attributes": {
                    "id": 932,
                    "title": "Food",
                    "description": "Healthy",
                    "location": "India",
                    "nsfw_content": true,
                    "status": "accepted",
                    "keyword_array": [
                        "Food",
                        "healthy",
                        "junk"
                    ],
                    "license_type": "[]",
                    "size": "(0 to 500 employee)",
                    "format": null,
                    "account_id": 878,
                    "technical_specification": null,
                    "price": null,
                    "sale_price": "0.0",
                    "rejected_title": "",
                    "rejected_reason": "",
                    "updated_at": "2024-03-12T12:14:30.514Z",
                    "created_at": "2024-03-12T12:12:54.878Z",
                    "category": {
                        "id": "66",
                        "type": "category",
                        "attributes": {
                            "id": 66,
                            "title": "FOOD",
                            "keywords": [
                                "Taste",
                                "delicious",
                                "Food",
                                "healthy",
                                "junk",
                                "speicy",
                                "design",
                                "style",
                                "clothes",
                                "people",
                                "mountain",
                                "TEST",
                                "dummy",
                                "sample",
                                "FOREST",
                                "CARTON",
                                "ok",
                                "mn"
                            ],
                            "images": null
                        }
                    },
                    "images": {
                        "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaUlIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1f6b5934ce2d085a200bd7bd2a73e370e0a8ad0c/download%20(11).jpg",
                        "status": "accepted",
                        "type": "image/jpeg"
                    },
                    "keyword_suggestion": null
                }
            },
            {
                "id": "930",
                "type": "catalogue",
                "attributes": {
                    "id": 930,
                    "title": "Food",
                    "description": "Test",
                    "location": "British Indian Ocean Territory",
                    "nsfw_content": true,
                    "status": "accepted",
                    "keyword_array": [
                        "Food"
                    ],
                    "license_type": "[\"Film\"]",
                    "size": "2",
                    "format": "23",
                    "account_id": 878,
                    "technical_specification": "updated",
                    "price": null,
                    "sale_price": "2289.0",
                    "rejected_title": null,
                    "rejected_reason": null,
                    "updated_at": "2024-03-12T13:39:31.143Z",
                    "created_at": "2024-03-12T12:12:54.765Z",
                    "category": {
                        "id": "66",
                        "type": "category",
                        "attributes": {
                            "id": 66,
                            "title": "FOOD",
                            "keywords": [
                                "Taste",
                                "delicious",
                                "Food",
                                "healthy",
                                "junk",
                                "speicy",
                                "design",
                                "style",
                                "clothes",
                                "people",
                                "mountain",
                                "TEST",
                                "dummy",
                                "sample",
                                "FOREST",
                                "CARTON",
                                "ok",
                                "mn"
                            ],
                            "images": null
                        }
                    },
                    "images": {
                        "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaUFIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fab7ca356a800ffbc714664c8a186f6bf104b8bc/download%20(13).jpg",
                        "status": "accepted",
                        "type": "image/jpeg"
                    },
                    "keyword_suggestion": null
                }
            },
            {
                "id": "878",
                "type": "catalogue",
                "attributes": {
                    "id": 878,
                    "title": "Food",
                    "description": "Test food",
                    "location": "British Indian Ocean Territory",
                    "nsfw_content": true,
                    "status": "accepted",
                    "keyword_array": [
                        "Food",
                        "healthy",
                        "junk"
                    ],
                    "license_type": "[\"Film\"]",
                    "size": "1",
                    "format": "23",
                    "account_id": 868,
                    "technical_specification": "updated",
                    "price": null,
                    "sale_price": "2789.0",
                    "rejected_title": null,
                    "rejected_reason": null,
                    "updated_at": "2024-03-08T12:47:16.162Z",
                    "created_at": "2024-03-08T11:24:07.065Z",
                    "category": {
                        "id": "66",
                        "type": "category",
                        "attributes": {
                            "id": 66,
                            "title": "FOOD",
                            "keywords": [
                                "Taste",
                                "delicious",
                                "Food",
                                "healthy",
                                "junk",
                                "speicy",
                                "design",
                                "style",
                                "clothes",
                                "people",
                                "mountain",
                                "TEST",
                                "dummy",
                                "sample",
                                "FOREST",
                                "CARTON",
                                "ok",
                                "mn"
                            ],
                            "images": null
                        }
                    },
                    "images": {
                        "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHdHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3bb040ce7747e9077cc79580fca37e03f0f9e8e0/download%20(13)%20-%20Copy.jpg",
                        "status": "accepted",
                        "type": "image/jpeg"
                    },
                    "keyword_suggestion": null
                }
            }
        ]
    }
}
const  EmptySearchData={
  message:"No catalogues found with the keyword 'fkkfkf'"
}

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
  })

  test('User navigates to advancedsearch', ({ given, when, then }) => {
    let AdvancedSearchWrapper: ShallowWrapper
    let instance: AdvancedSearch

    given('I am a User loading advancedsearch', () => {
      AdvancedSearchWrapper = shallow(<AdvancedSearch {...screenProps} />)
    })

    when('I navigate to the advancedsearch', () => {
      instance = AdvancedSearchWrapper.instance() as AdvancedSearch

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
      instance.advancedsearchApiCallId = getAdvancedSearchAPI.messageId
      runEngine.sendMessage('Unit Test', getAdvancedSearchAPI)
    })

    then('I can click AdvancedSearch button', () => {
      let textInputComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'inputFirstNameSearchText'
      )
      // textInputComponent.simulate('change', { target: { value: 'Irma' } })

      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnGetAdvancedSearchList'
      )
      // buttonComponent.simulate('click')
    })

    then('advancedsearch will load with out errors', () => {
      instance.setState({ advancedsearchList: testData })
      expect(AdvancedSearchWrapper).toBeTruthy()
    })

    then('I can view AdvancedSearch item', () => {
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnViewModal'
      )
      // buttonComponent.simulate('click')

      instance.setState({
        activeId: 1,
        activeFirstName: 'Irma',
        activeLastName: 'McTest',
        activeUserName: 'tester',
        activeEmail: 'irma.mctest@example.com',
        activePhoneNumber: '1234567890',
        activeCountryCode: '123',
        activeType: 'user',
        activeDeviceId: 'abcd-1234',
        activeCreatedAt: '2021-12-03T16:55:09.405Z',
        isVisible: true
      })

      buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnCloseModal'
      )
      // buttonComponent.simulate('click')
    })

    then('I can click on Filter Button to show hide filters', () => {
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'filterBtn'
      )
      buttonComponent.simulate('click')
      

    })

    then('should set searchType to val and call search function', () => {
  
      instance.search = jest.fn(); 
  
      instance.setSearchType('someValue');
  let data=
  [
    {
        "id": "12",
        "type": "filter_sub_type",
        "attributes": {
            "sub_type": "Videos",
            "inner_sub_type": {
                "data": []
            }
        }
    },
    {
        "id": "11",
        "type": "filter_sub_type",
        "attributes": {
            "sub_type": "Images",
            "inner_sub_type": {
                "data": []
            }
        }
    }
]
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'handleCheckboxChange'
      )
      buttonComponent.prop('handleCheckboxChange')("11", "Asset Type",data )
      expect(AdvancedSearchWrapper.state('searchType')).toBe('someValue');
      expect(instance.search).toHaveBeenCalledWith(AdvancedSearchWrapper.state('searchQuery'));
    });

    then('should set searchType to empty string and call search function', () => {
  
      instance.search = jest.fn(); 
  
      instance.setSearchType('all');
      let data: never[] = 
      []
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'handleCheckboxChange'
      )
      buttonComponent.prop('handleCheckboxChange')("11", "Asset Type",data )
      expect(AdvancedSearchWrapper.state('searchType')).toBe('');
      expect(instance.search).toHaveBeenCalledWith(AdvancedSearchWrapper.state('searchQuery'));
    });

    then('should update selectedSort and trigger search', () => {
      
      let data=[
        {
            "id": "15",
            "type": "filter_sub_type",
            "attributes": {
                "sub_type": "Food",
                "inner_sub_type": {
                    "data": []
                }
            }
        },
        {
            "id": "16",
            "type": "filter_sub_type",
            "attributes": {
                "sub_type": "Forest",
                "inner_sub_type": {
                    "data": []
                }
            }
        }]
      instance.search = jest.fn();
  
      instance.setSortedVal('most_relevant');
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'handleCheckboxChange'
      )
      buttonComponent.prop('handleCheckboxChange')("15", "Categories",data )
      expect(AdvancedSearchWrapper.state('selectedSort')).toBe('most_relevant');
      expect(instance.search).toHaveBeenCalledWith(AdvancedSearchWrapper.state('searchQuery'));
    });
  

    then('I can input text in search bar', () => {
      let datas: never[] = 
      []
      let buttonComponent1 = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'handleCheckboxChange'
      )
      buttonComponent1.prop('handleCheckboxChange')("15", "Categories",datas )
      let data= [
        {
            "id": "21",
            "type": "filter_sub_type",
            "attributes": {
                "sub_type": "Horizontal",
                "inner_sub_type": {
                    "data": []
                }
            }
        },
        {
            "id": "22",
            "type": "filter_sub_type",
            "attributes": {
                "sub_type": "Vertical",
                "inner_sub_type": {
                    "data": []
                }
            }
        }
    ]
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'handleCheckboxChange'
      )
      buttonComponent.prop('handleCheckboxChange')("21", "ORIENTATION",data )
      let inputComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'searchId'
      )
      instance.search('nature');
      instance.setSearchQuery('test')
      instance.setState({
        searchQuery: 'test'
      })
      inputComponent.props().setSearchQuery('test')
    })

    then('I can input text in search bar with #', () => {
      let inputComponent = AdvancedSearchWrapper.find(Search).dive().findWhere(
        node => node.prop('testID') === 'customSearch'
      )
      inputComponent.simulate("change",{target:{value:"#test"}})
      instance.setState({
        searchQuery: '#test'
      })
     
    })
    
    
    // then('I can input text in search bar', () => {
    //   let inputComponent = AdvancedSearchWrapper.findWhere(
    //     node => node.prop('testID') === 'searchId'
    //   )
    //   instance.search('nature');
    //   instance.setSearchQuery('#test')
    //   instance.setState({
    //     searchQuery: 'test'
    //   })
     

    //   inputComponent.props().setSearchQuery('test')
    // })

    then('I can click on the search button and api will have data', () => {
      let btnComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'btnSearch'
      )
      btnComponent.simulate('click');
      instance = AdvancedSearchWrapper.instance() as AdvancedSearch;
      jest.spyOn(instance, "send");
      const msgToken = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
      runEngine.sendMessage("Unit Test", msgToken);

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );

      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        SearchUserMock
      );
      instance.getSearchResultApiId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

    })

    then('I can click on the search button and api will do not have data', () => {
      let btnComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'btnSearch'
      )
      btnComponent.simulate('click');
      let data: never[] = 
      []
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'handleCheckboxChange'
      )
      buttonComponent.prop('handleCheckboxChange')("20", "ORIENTATION",data )
      buttonComponent.prop('handleCheckboxChange')("", "ORIENTATION",data )

    })

    then('I can click on the gototop button', () => {
      let btnComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'scrollToTop'
      )

      btnComponent.simulate('click');
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'handleCheckboxChange'
      )
      buttonComponent.prop('handleCheckboxChange')()
    })

    then('should set isSmallScreen state to true for small screens', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query <= '(max-width: 600px)',
      }));
  
      instance.handleWindowSizeChange();
      expect(AdvancedSearchWrapper.state('isSmallScreen')).toBe(true);
    });

    then('should set isSmallScreen state to false for large screens', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query >= '600',
      }));
  
      instance.handleWindowSizeChange();
      expect(AdvancedSearchWrapper.state('isSmallScreen')).toBe(false);
    });

    then('I can leave the screen with out errors', () => {

      AdvancedSearchWrapper
      .findWhere(
        (node) => node.prop("data-test-id") === "fetchData"
      )
      .props()
      .fetchData();
      expect(AdvancedSearchWrapper).toBeTruthy();

      instance.componentWillUnmount()
      expect(AdvancedSearchWrapper).toBeTruthy()
    })
  })
})
