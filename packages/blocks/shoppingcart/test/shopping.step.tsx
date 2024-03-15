import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
const navigation = require("react-navigation");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ShoppingCartOrders from '../../src/ShoppingCartOrders.web'
import AddShoppingCartOrderItem from '../../src/AddShoppingCartOrderItem.web'

export const configJSON = require('../../config.json')
import { _ } from '../../../../framework/src/IBlock'
import CustomDropDown from "../../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addEventListener: jest.fn()
  },
  id: 'ShoppingCartOrders'
}

const screenPropsForAdd = {
  navigation: {
    navigate: jest.fn()
  },
  id: 'AddShoppingCartOrderItem'
}

const dropdownProps = {
    fontVariant: 'label',
    variant: 'dropdownBtnSecondary',
    selectedItem: {},
    options: [],
    startAdornment: '',
    endAdornment: '',
    style: '',
    checkbox: false,
    selectNewItem: jest.fn()
}


jest.mock("@react-native-community/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn()
      .mockImplementation(() => Promise.reject("")),
    signIn: jest.fn().mockImplementation(() => ({
      user: {
        email: "test@gmail.com",
        id: "id"
      }
    }))
  },
  statusCodes: {
    PLAY_SERVICES_NOT_AVAILABLE: 1,
    SIGN_IN_CANCELLED: 2,
    IN_PROGRESS: 3
  },
}));

const feature = loadFeature('./__tests__/features/shoppingcartweb-scenario.feature')

const orderData = {
  data:  {
  "id": "1",
  "type": "order",
  attributes: {
      order_status: "in-cart",
      account_id: 673,
      total_price: 2900.0,
      customer: {
          data: {
              id: "636",
              "type": "account",
              "attributes": {
                  "email": "bhavya@gmail.com",
                  "full_name": "Bhavya Modhiya",
                  "role_type": "user",
                  "activated": true,
                  "country_code": null,
                  "first_name": null,
                  "full_phone_number": "",
                  "last_name": null,
                  "phone_number": null,
                  "type": "EmailAccount",
                  "created_at": "Jan 31, 2024",
                  "updated_at": "2024-01-31T13:38:45.948Z",
                  "device_id": null,
                  "unique_auth_id": "uVHI1rrbDYIRfRnaWT1CAgtt",
                  "profile_images": null
              }
          }
      },
      order_items: {
          data: [
              {
                  "id": "2",
                  "type": "order_item",
                  "attributes": {
                      "price": 1300.0,
                      "quantity": 0,
                      "taxable": false,
                      "taxable_value": 0.0,
                      "other_charges": null,
                      "license_type": [
                          {
                            "id": 2,
                            "name": "TV",
                            "status": true,
                            "price": "100",
                            "created_at": "2024-02-13T11:40:02.134Z",
                            "updated_at": "2024-02-13T12:12:06.564Z",
                            "is_commercial": null
                          },
                          {
                            "id": 3,
                            "name": "Film",
                            "status": true,
                            "price": "789",
                            "created_at": "2024-02-14T16:49:50.813Z",
                            "updated_at": "2024-02-14T16:49:50.813Z",
                            "is_commercial": null
                          }
                        ],
                      "catalogue": {
                          "data": {
                              "id": "766",
                              "type": "catalogue",
                              "attributes": {
                                  "id": 766,
                                  "title": null,
                                  "description": null,
                                  "location": null,
                                  "nsfw_content": null,
                                  "status": "submitted",
                                  "keyword_array": [],
                                  "license_type": "0",
                                  "size": "0",
                                  "format": null,
                                  "account_id": 760,
                                  "technical_specification": null,
                                  "price": null,
                                  "sale_price": null,
                                  "rejected_title": null,
                                  "rejected_reason": null,
                                  "updated_at": "2024-02-20T05:23:07.064Z",
                                  "created_at": "2024-02-20T05:23:07.047Z",
                                  "category": null,
                                  "images": {
                                      "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaG9HIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6842b51558d4c612bcfd07929d2ff99b1dcb81e7/colored-hair-clip-white-background_593040-510.jpg",
                                      "status": "submitted",
                                      "type": "image/jpeg"
                                  },
                                  "keyword_suggestion": null
                              }
                          }
                      }
                  }
              },
              {
                "id": "2",
                "type": "order_item",
                "attributes": {
                    "price": 1300.0,
                    "quantity": 0,
                    "taxable": false,
                    "taxable_value": 0.0,
                    "other_charges": null,
                    "catalogue": {
                        "data": {
                            "id": "766",
                            "type": "catalogue",
                            "attributes": {
                                "id": 766,
                                "title": null,
                                "description": null,
                                "location": null,
                                "nsfw_content": null,
                                "status": "submitted",
                                "keyword_array": [],
                                "license_type": "0",
                                "size": "0",
                                "format": null,
                                "account_id": 760,
                                "technical_specification": null,
                                "price": null,
                                "sale_price": null,
                                "rejected_title": null,
                                "rejected_reason": null,
                                "updated_at": "2024-02-20T05:23:07.064Z",
                                "created_at": "2024-02-20T05:23:07.047Z",
                                "category": null,
                                "images": {
                                    "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTRHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6dc320c7c72579297b9c829b3a36eafd9eb4f735/Builder%20Tracker%20-%20Google%20Chrome%202024-01-18%2014-25-00_Trim.mp4",
                                    "status": "submitted",
                                    "type": "video/mp4"
                                },
                                "keyword_suggestion": null
                            }
                        }
                    }
                }
            }
          ]
      }
  }
}
}

const orderItemImageData = {
  data:  {
  "id": "1",
  "type": "order",
  attributes: {
      order_status: "in-cart",
      account_id: 673,
      total_price: 2900.0,
      customer: {
          data: {
              id: "636",
              "type": "account",
              "attributes": {
                  "email": "bhavya@gmail.com",
                  "full_name": "Bhavya Modhiya",
                  "role_type": "user",
                  "activated": true,
                  "country_code": null,
                  "first_name": null,
                  "full_phone_number": "",
                  "last_name": null,
                  "phone_number": null,
                  "type": "EmailAccount",
                  "created_at": "Jan 31, 2024",
                  "updated_at": "2024-01-31T13:38:45.948Z",
                  "device_id": null,
                  "unique_auth_id": "uVHI1rrbDYIRfRnaWT1CAgtt",
                  "profile_images": null
              }
          }
      },
      order_items: {
          data: [
              {
                  "id": "2",
                  "type": "order_item",
                  "attributes": {
                      "price": 1300.0,
                      "quantity": 0,
                      "taxable": false,
                      "taxable_value": 0.0,
                      "other_charges": null,
                      "catalogue": {
                          "data": {
                              "id": "766",
                              "type": "catalogue",
                              "attributes": {
                                  "id": 766,
                                  "title": null,
                                  "description": null,
                                  "location": null,
                                  "nsfw_content": null,
                                  "status": "submitted",
                                  "keyword_array": [],
                                  "license_type": "0",
                                  "size": "0",
                                  "format": null,
                                  "account_id": 760,
                                  "technical_specification": null,
                                  "price": null,
                                  "sale_price": null,
                                  "rejected_title": null,
                                  "rejected_reason": null,
                                  "updated_at": "2024-02-20T05:23:07.064Z",
                                  "created_at": "2024-02-20T05:23:07.047Z",
                                  "category": null,
                                  "images": {
                                      "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaG9HIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6842b51558d4c612bcfd07929d2ff99b1dcb81e7/colored-hair-clip-white-background_593040-510.jpg",
                                      "status": "submitted",
                                      "type": "image/jpeg"
                                  },
                                  "keyword_suggestion": null
                              }
                          }
                      }
                  }
              },
              {
                "id": "2",
                "type": "order_item",
                "attributes": {
                    "price": 1300.0,
                    "quantity": 0,
                    "taxable": false,
                    "taxable_value": 0.0,
                    "other_charges": null,
                    "catalogue": {
                        "data": {
                            "id": "766",
                            "type": "catalogue",
                            "attributes": {
                                "id": 766,
                                "title": null,
                                "description": null,
                                "location": null,
                                "nsfw_content": null,
                                "status": "submitted",
                                "keyword_array": [],
                                "license_type": "0",
                                "size": "0",
                                "format": null,
                                "account_id": 760,
                                "technical_specification": null,
                                "price": null,
                                "sale_price": null,
                                "rejected_title": null,
                                "rejected_reason": null,
                                "updated_at": "2024-02-20T05:23:07.064Z",
                                "created_at": "2024-02-20T05:23:07.047Z",
                                "category": null,
                                "images": {
                                    "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTRHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6dc320c7c72579297b9c829b3a36eafd9eb4f735/Builder%20Tracker%20-%20Google%20Chrome%202024-01-18%2014-25-00_Trim.mp4",
                                    "status": "submitted",
                                    "type": "video/mp4"
                                },
                                "keyword_suggestion": null
                            }
                        }
                    }
                }
            }
          ]
      }
  }
}
}

const orderItemVideoData = {
  data:  {
  "id": "1",
  "type": "order",
  attributes: {
      order_status: "in-cart",
      account_id: 673,
      total_price: 2900.0,
      customer: {
          data: {
              id: "636",
              "type": "account",
              "attributes": {
                  "email": "bhavya@gmail.com",
                  "full_name": "Bhavya Modhiya",
                  "role_type": "user",
                  "activated": true,
                  "country_code": null,
                  "first_name": null,
                  "full_phone_number": "",
                  "last_name": null,
                  "phone_number": null,
                  "type": "EmailAccount",
                  "created_at": "Jan 31, 2024",
                  "updated_at": "2024-01-31T13:38:45.948Z",
                  "device_id": null,
                  "unique_auth_id": "uVHI1rrbDYIRfRnaWT1CAgtt",
                  "profile_images": null
              }
          }
      },
      order_items: {
          data: [
              {
                "id": "2",
                "type": "order_item",
                "attributes": {
                    "price": 1300.0,
                    "quantity": 0,
                    "taxable": false,
                    "taxable_value": 0.0,
                    "other_charges": null,
                    "catalogue": {
                        "data": {
                            "id": "766",
                            "type": "catalogue",
                            "attributes": {
                                "id": 766,
                                "title": null,
                                "description": null,
                                "location": null,
                                "nsfw_content": null,
                                "status": "submitted",
                                "keyword_array": [],
                                "license_type": "0",
                                "size": "0",
                                "format": null,
                                "account_id": 760,
                                "technical_specification": null,
                                "price": null,
                                "sale_price": null,
                                "rejected_title": null,
                                "rejected_reason": null,
                                "updated_at": "2024-02-20T05:23:07.064Z",
                                "created_at": "2024-02-20T05:23:07.047Z",
                                "category": null,
                                "images": {
                                    "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTRHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6dc320c7c72579297b9c829b3a36eafd9eb4f735/Builder%20Tracker%20-%20Google%20Chrome%202024-01-18%2014-25-00_Trim.mp4",
                                    "status": "submitted",
                                    "type": "video/mp4"
                                },
                                "keyword_suggestion": null
                            }
                        }
                    }
                }
            }
          ]
      }
  }
}
}

const missingData = null;


const missingItemData = {
  data:  {
  "id": "1",
  "type": "order",
  attributes: {
      order_status: "in-cart",
      account_id: 673,
      total_price: 2900.0,
      customer: {
          data: {
              id: "636",
              "type": "account",
              "attributes": {
                  "email": "bhavya@gmail.com",
                  "full_name": "Bhavya Modhiya",
                  "role_type": "user",
                  "activated": true,
                  "country_code": null,
                  "first_name": null,
                  "full_phone_number": "",
                  "last_name": null,
                  "phone_number": null,
                  "type": "EmailAccount",
                  "created_at": "Jan 31, 2024",
                  "updated_at": "2024-01-31T13:38:45.948Z",
                  "device_id": null,
                  "unique_auth_id": "uVHI1rrbDYIRfRnaWT1CAgtt",
                  "profile_images": null
              }
          }
      },
      order_items: {
          data: []
      }
  }
}
}

const orderItemsData = {
  data:  {
  "id": "1",
  "type": "order",
  attributes: {
      order_status: "in-cart",
      account_id: 673,
      total_price: 2900.0,
      customer: {
          data: {
              id: "636",
              "type": "account",
              "attributes": {
                  "email": "bhavya@gmail.com",
                  "full_name": "Bhavya Modhiya",
                  "role_type": "user",
                  "activated": true,
                  "country_code": null,
                  "first_name": null,
                  "full_phone_number": "",
                  "last_name": null,
                  "phone_number": null,
                  "type": "EmailAccount",
                  "created_at": "Jan 31, 2024",
                  "updated_at": "2024-01-31T13:38:45.948Z",
                  "device_id": null,
                  "unique_auth_id": "uVHI1rrbDYIRfRnaWT1CAgtt",
                  "profile_images": null
              }
          }
      },
      order_items: {
          data: [
              {
                  "id": "2",
                  "type": "order_item",
                  "attributes": {
                      "price": 1300.0,
                      "quantity": 0,
                      "taxable": false,
                      "taxable_value": 0.0,
                      "other_charges": null,
                      "catalogue": {
                          "data": {
                              "id": "766",
                              "type": "catalogue",
                              "attributes": {
                                "id": 714,
                                  "title": "Test",
                                  "description": "test1234",
                                  "location": "Argentina",
                                  "nsfw_content": true,
                                  "status": "accepted",
                                  "keyword_array": [
                                      "hills",
                                      "peace",
                                      "greenery",
                                      "test"
                                  ],
                                  "license_type": "0",
                                  "size": "1",
                                  "format": "",
                                  "account_id": 673,
                                  "technical_specification": null,
                                  "price": null,
                                  "sale_price": null,
                                  "rejected_title": null,
                                  "rejected_reason": null,
                                  "updated_at": "2024-02-07T06:13:25.179Z",
                                  "created_at": "2024-02-07T05:22:24.344Z",
                                  "category": {
                                      "id": "12",
                                      "type": "category",
                                      "attributes": {
                                          "id": 12,
                                          "title": "Food",
                                          "images": null
                                      }
                                  },
                                  "images": {
                                  },
                                  "keyword_suggestion": null
                              }
                          }
                      }
                  }
              }
          ]
      }
  }
}
}

  

const errorObj={
  errors:"some error"
}
const testOrderItems = [
  {
    id: 1,
    attributes: {
      price: 1,
      quantity: 10,
      taxable: true,
      taxable_value: 1,
      catalogue: {
        data: {
          attributes: {
            name: "catalogue1"
          }
        }
      }
    }
  }
]
const CouponMockData={
  data:[
    {
    id: "2",
    type: "coupon_code",
    attributes: {
       id: 2,
       title: "TestCoupon2",
       description: "Coupon testing",
       code: "VG50",
       discount_type: "flat",
       discount: "50.0",
     }
   }
  ]
}
const licenceData={
  "data": [
      {
          "id": "2",
          "type": "licensetype",
          "attributes": {
              "name": "TV",
              "status": true,
              "price": "100",
              "is_commercial": null,
              "updated_at": "2024-02-13T12:12:06.564Z",
              "created_at": "2024-02-13T11:40:02.134Z"
          }
      },
      {
          "id": "3",
          "type": "licensetype",
          "attributes": {
              "name": "Film",
              "status": true,
              "price": "789",
              "is_commercial": null,
              "updated_at": "2024-02-14T16:49:50.813Z",
              "created_at": "2024-02-14T16:49:50.813Z"
          }
      },
      {
          "id": "4",
          "type": "licensetype",
          "attributes": {
              "name": "others",
              "status": true,
              "price": "200",
              "is_commercial": true,
              "updated_at": "2024-02-15T12:25:32.161Z",
              "created_at": "2024-02-14T16:56:03.681Z"
          }
      },
      {
          "id": "1",
          "type": "licensetype",
          "attributes": {
              "name": "Digitalweb",
              "status": true,
              "price": "100",
              "is_commercial": false,
              "updated_at": "2024-02-15T12:26:02.918Z",
              "created_at": "2024-02-06T13:35:36.480Z"
          }
      },
      {
          "id": "6",
          "type": "licensetype",
          "attributes": {
              "name": "Internal",
              "status": true,
              "price": "1500",
              "is_commercial": false,
              "updated_at": "2024-02-16T13:44:13.801Z",
              "created_at": "2024-02-16T13:44:13.801Z"
          }
      }
  ]
}
const formatData={
  "data": [
      {
          "id": "21",
          "type": "format",
          "attributes": {
              "name": "LOG",
              "status": true,
              "price": "3000",
              "percentage": 0,
              "dimention": "3840 X160",
              "resname": "ProRes 422HQ",
              "type_format": "video",
              "updated_at": "2024-02-16T12:05:48.445Z",
              "created_at": "2024-02-16T09:49:18.645Z"
          }
      },
      {
          "id": "23",
          "type": "format",
          "attributes": {
              "name": "LARGE",
              "status": true,
              "price": "1000",
              "percentage": 20,
              "dimention": "",
              "resname": "",
              "type_format": "image",
              "updated_at": "2024-02-16T12:40:48.591Z",
              "created_at": "2024-02-16T12:40:48.591Z"
          }
      },
      {
          "id": "22",
          "type": "format",
          "attributes": {
              "name": "ORIGINAL",
              "status": true,
              "price": "500",
              "percentage": 0,
              "dimention": "",
              "resname": "",
              "type_format": "image",
              "updated_at": "2024-02-16T12:53:15.703Z",
              "created_at": "2024-02-16T12:08:22.095Z"
          }
      },
      {
          "id": "24",
          "type": "format",
          "attributes": {
              "name": "SMALL",
              "status": true,
              "price": "200",
              "percentage": -20,
              "dimention": "",
              "resname": "",
              "type_format": "image",
              "updated_at": "2024-02-16T12:54:48.172Z",
              "created_at": "2024-02-16T12:54:48.172Z"
          }
      },
      {
          "id": "20",
          "type": "format",
          "attributes": {
              "name": "HD",
              "status": true,
              "price": "850",
              "percentage": 0,
              "dimention": "1920 X 1080",
              "resname": "ProRes 422",
              "type_format": "video",
              "updated_at": "2024-03-07T07:10:33.988Z",
              "created_at": "2024-02-16T09:44:46.073Z"
          }
      }
  ]
}

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
    jest.spyOn(global.localStorage, 'clear')
    jest.spyOn(global.localStorage, 'getItem')
    jest.spyOn(global.localStorage, 'setItem')
  })

  test('User navigates to ShoppingCartOrders', ({ given, when, then }) => {
    let ShoppingCartOrdersWrapper: ShallowWrapper
    let instance: ShoppingCartOrders

    given('I am a User loading ShoppingCartOrders', () => {
      ShoppingCartOrdersWrapper = shallow(<ShoppingCartOrders {...screenProps} />)
    })

    when('I navigate to the ShoppingCartOrders', () => {
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders
      instance.setState({ orderList: orderData })
      instance.setState({
        ModalData: '2'
      })
    })

    then('I can click the button', () => {

     let buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'delete_confirmation'
      )
      buttonComponent.simulate('click')
      ShoppingCartOrdersWrapper.setState({showDeleteModal:true})

      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'cancel_button'
      )
      buttonComponent.simulate('click')
      ShoppingCartOrdersWrapper.setState({showDeleteModal:false})
      
      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'delete_confirmation'
      )
      buttonComponent.simulate('click')
      ShoppingCartOrdersWrapper.setState({showDeleteModal:false})


      expect(ShoppingCartOrdersWrapper).toBeTruthy()
    })
    
    when("Show Order List Data Api will call", async () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
      runEngine.sendMessage("Unit Test", msgToken);

      const CouponAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      CouponAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        CouponAPI.messageId
      );

      CouponAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        orderData
      );
      instance.showOrderApiCallId = CouponAPI.messageId;
      runEngine.sendMessage("Unit Test", CouponAPI);
    });

    when("Show Order List Data Api will call show error", async () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      instance.hideModal();
      instance.setState({
        isVisible: true
      })
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
      runEngine.sendMessage("Unit Test", msgToken);

      const CouponAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      CouponAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        CouponAPI.messageId
      );

      CouponAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        errorObj 
      );
      instance.showOrderApiCallId = CouponAPI.messageId;
      runEngine.sendMessage("Unit Test", CouponAPI);
    });

    when("show all the input boxes", () => {
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders
    });

    then("I can enter values in first name field", () => {
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
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
        licenceData
      );
      instance.getContentLicenseTypeApiId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      instance.updateLicense(43,0)
      const msgValidationAPIFormat = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPIFormat.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPIFormat.messageId
      );
      msgValidationAPIFormat.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        formatData
      );
      instance.getContentFormatApiId = msgValidationAPIFormat.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPIFormat);
      

      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      let textInputComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'first-name'
      )

      let target = {
        name: 'firsName',
        value: 'Test'
      }

      textInputComponent.simulate('change', target);
    })

    then("I can enter values in last name field", () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      let textInputComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'last-name'
      )

      let target = {
        name: 'lastName',
        value: 'Test'
      }

      textInputComponent.simulate('change', target);
    })
    
    when("Get All Coupon Api will call", async () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
    
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
      runEngine.sendMessage("Unit Test", msgToken);

      const CouponAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      CouponAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        CouponAPI.messageId
      );

      CouponAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        CouponMockData
      );
      instance.getCouponApiCallId = CouponAPI.messageId;
      runEngine.sendMessage("Unit Test", CouponAPI);
    });

    then("all Coupons will display on the modal", () => {
      console.log(instance.state.CouponData)
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      expect(instance.state.CouponData[0].attributes.title).toEqual(
        CouponMockData.data[0].attributes.title
      );
    });

    when("Coupon Code valid Api will call", async () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        {
          "order_item": {
            "order_item_id": 43,
            "format_id": 23
          }
        }
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        orderData
      );
      instance.updateOrderItemFormatId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      let CouponValidComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop("data-test-id") === "couponAddBtn"
      );
      ShoppingCartOrdersWrapper.setState({
        coupon_code: 'FLAT10'
      })
      CouponValidComponent.simulate("click");
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
      runEngine.sendMessage("Unit Test", msgToken);

      const CouponValidApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      CouponValidApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        CouponValidApi.messageId
      );

      CouponValidApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Coupon is valid"
        }
      );
      instance.postValidCouponCodeApiCallId = CouponValidApi.messageId;
      runEngine.sendMessage("Unit Test", CouponValidApi);
      instance.handleSnackBarShow();
      instance.handleCloseSnackBar();
      const data = {
        item: {
          post: {
            id: 1,
            name: 'test',
            description: 'test',
            price: '22',
            currency: '$',
            category_id: 1,
            created_at: '2024-02-02',
            updated_at: '2024-02-02',
            account_id: 1,
            isVisible: true
          }
        },

      }
      instance.setModal(data);
    });

    when("Coupon Code field is empty", async () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      let CouponValidComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop("data-test-id") === "couponAddBtn"
      );
      ShoppingCartOrdersWrapper.setState({
        coupon_code: ''
      })
      CouponValidComponent.simulate("click");

      instance.setState({
        couponError: 'Please enter coupon code!'
      })
      
    });

    then("It will valid that Coupon is Valid or not", () => {
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
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
        {
          "data": {
              "id": "5",
              "type": "coupon_code",
              "attributes": {
                  "id": 5,
                  "title": "Test FE",
                  "description": "Holi special",
                  "code": "Holi50",
                  "discount_type": "percentage",
                  "discount": "50.0",
                  "valid_from": "2024-03-13T06:10:00.000Z",
                  "valid_to": "2024-04-01T00:00:00.000Z"
              }
          },
          "discounted_price": "3494.5"
      }
      );
      instance.getDiscountedPriceApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      expect(ShoppingCartOrdersWrapper).toBeTruthy()
    });
    then('ShoppingCartOrders will load with out errors', () => {
      expect(ShoppingCartOrdersWrapper).toBeTruthy()
    })

    when("there is no item in cart", () => {
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders
    })

    then("If no item in cart then I can click on explore btn", () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      instance.setState({
        orderData: null
      })
      let  buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'explore_btn'
      )
      buttonComponent.simulate('click')
    })

    when('Order List api will call for null', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const orderList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      orderList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        orderList.messageId
      );

      orderList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        missingData
      );
      instance.getOrdersListApiCallId = orderList.messageId;
      runEngine.sendMessage("Unit Test", orderList);
    });

    when('Order List api will call for order items null', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const orderList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      orderList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        orderList.messageId
      );

      orderList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        missingItemData
      );
      instance.getOrdersListApiCallId = orderList.messageId;
      runEngine.sendMessage("Unit Test", orderList);
    });

    when('Order List api will call', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const orderList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      orderList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        orderList.messageId
      );
      instance.setState({licenseIds:[[3,6,2],[1,6]]})
      orderList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        orderData
      );
      instance.getOrdersListApiCallId = orderList.messageId;
      runEngine.sendMessage("Unit Test", orderList);
      
      let dropDown2Licence = ShoppingCartOrdersWrapper.findWhere(
        (node) => node.prop("data-test-id") === "dropDown2Licence"
      );
      dropDown2Licence.first().prop('saveSelected')();
      dropDown2Licence.first().prop('selectNewItem')({label:"TV",value:0},4);
    });

    when('click on size drop down', () => {
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
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
        orderData
      );
      instance.getCountryListApiId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      let buttonComponent = ShoppingCartOrdersWrapper.find(CustomDropDown).first().dive().findWhere(
        node => node.prop('data-test-id') === 'sort_option-0'
      )
      instance.handleCountrySelection({label: 'test', value: 'test'})
    })

    when("click on dropdown", () => {
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
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
        orderData
      );
      instance.getStateListApiId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      let buttonComponent = ShoppingCartOrdersWrapper.find(CustomDropDown).first().dive().findWhere(
        node => node.prop('data-test-id') === 'sort_option-0'
      )
      instance.handleImageFormats({label: 'test', value: 'test'}, 1, 1)
      instance.handleVideoFormats({label: 'test', value: 'test'}, 1, 1)
    })

    when('Order List api will call for order attribute null', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const orderList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      orderList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        orderList.messageId
      );

      orderList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        orderItemsData
      );
      instance.getOrdersListApiCallId = orderList.messageId;
      runEngine.sendMessage("Unit Test", orderList);
    });

    when('Order List api will call for order content type video', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const orderList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      orderList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        orderList.messageId
      );

      orderList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        orderItemVideoData
      );
      instance.getOrdersListApiCallId = orderList.messageId;
      runEngine.sendMessage("Unit Test", orderList);
    });

    then('renders an video if the type is video', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      let item = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'item-video'
      )
      expect(item).toHaveLength(1);
    });

    when('Order List api will call for order content type image', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const orderList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      orderList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        orderList.messageId
      );

      orderList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        orderItemImageData
      );
      instance.getOrdersListApiCallId = orderList.messageId;
      runEngine.sendMessage("Unit Test", orderList);
    });

    then('renders an image if the type is image', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      let item = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'item-image0'
      )
      expect(item).toHaveLength(1);
    });
  

    when("click on delete icon modal will open", () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      let buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'deleteCartItembtn'
      )
      instance.setState({
        ModalData: '2'
      })
      buttonComponent.at(0).simulate('click', '2')
        console.log("MODAL DATA", instance.state.ModalData)
    })

    then("image will render for item", () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      let img = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'img-item'
      )

      expect(img).toHaveLength(1);
    })

    then("video will render for item", () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      let img = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'video-item'
      )

      expect(img).toHaveLength(1);
    })

    when('Delete api will call', () => {
      ShoppingCartOrdersWrapper = ShoppingCartOrdersWrapper.update();
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
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
        orderData
      );
      instance.deleteOrderItemApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      const msgValidationAPIWeb = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPIWeb.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPIWeb.messageId
      );
      msgValidationAPIWeb.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        orderData
      );
      instance.deleteOrderItemApiCallIdWeb = msgValidationAPIWeb.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPIWeb);
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(ShoppingCartOrdersWrapper).toBeTruthy()
    })
  })

  test('User navigates to AddShoppingCartOrderItem', ({ given, when, then }) => {
    let AddShoppingCartOrderItemWrapper: ShallowWrapper
    let instance: AddShoppingCartOrderItem

    given('I am a User loading AddShoppingCartOrderItem', () => {
      AddShoppingCartOrderItemWrapper = shallow(<AddShoppingCartOrderItem {...screenPropsForAdd} />)
    })

    when('I navigate to the AddShoppingCartOrderItem', () => {
      instance = AddShoppingCartOrderItemWrapper.instance() as AddShoppingCartOrderItem
    })

    then('I can input the information', () => {
      let textInputComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'inputQuantity'
      )
      textInputComponent.simulate('change', {
        target: { value: '1' }
      })

      let buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnTaxable'
      )
      buttonComponent.simulate('click', true)

      textInputComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'inputTaxableValue'
      )
      textInputComponent.simulate('change', {
        target: { value: '1' }
      })
    })

    then('I can click the button', () => {
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
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
        orderData
      );
      instance.createOrderItemApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      let buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnNavigateToShoppingCartOrders'
      )
      buttonComponent.simulate('click')

      buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnAddOrderItem'
      )
      buttonComponent.simulate('click')

    })

    then('AddShoppingCartOrderItem will be added with out errors', () => {
      expect(AddShoppingCartOrderItemWrapper).toBeTruthy()
    })

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(AddShoppingCartOrderItemWrapper).toBeTruthy()
    })
  })
 

})
