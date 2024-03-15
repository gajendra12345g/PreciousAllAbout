import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";

import EmailAccountRegistration from "../../src/EmailAccountRegistration.web"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "email-account-registration-scenario",
    callBack: jest.fn()
}

const mockAPICall = (instance: any, apiCallID: string, apiData: object | string) => {
    const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage), apiData)
    instance[apiCallID] = msgSucessRestAPI.messageId
    runEngine.sendMessage("Unit Test", msgSucessRestAPI)
}

const feature = loadFeature('./__tests__/features/email-account-registration-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Register Email Account', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register after confirming OTP', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()  
        });

        when('I navigate to the Registration Screen', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
        });

        then('I can enter a name with out errors', () => {
            const target = {
                name: 'name',
                value: 'test'
            }
            let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputName');
            textInputComponent.simulate('change', target);

            // let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'Background');
            // buttonComponent.simulate('press')
        });


        then('I can enter a last name with out errors', () => {
            let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputLastName');
            // textInputComponent.simulate('changeText', 'LAST');
        });
            
        then('I can enter a email with out errors', () => {
            const target = {
                name: 'email',
                value: 'test@example.com'
            }
            let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputEmail');
            textInputComponent.simulate('change', target);
        });

        then('I can enter a password with out errors', () => {
            const target = {
                name: 'password',
                value: 'password'
            }
            let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputPassword');
            textInputComponent.simulate('change', target);
        });

        then('I can toggle the Password Show/Hide with out errors', () => {
            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnPasswordShowHide');
            // buttonComponent.simulate('press')
        });
        
        then('I can enter a confimation password with out errors', () => {
            let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
            // textInputComponent.simulate('changeText', 'password');
        });


        then('I can toggle the Confimation Password Show/Hide with out errors', () => {
            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnPasswordShowHide');
            // buttonComponent.simulate('press')
        });

        then('CustomCheckBoxProps isChecked should be true when value is true', () => {
            instance.CustomCheckBoxProps.onChangeValue(true);
            expect(instance.CustomCheckBoxProps.isChecked).toBe(true);
        });
        
        then('CustomCheckBoxProps isChecked should be false when value is false', () => {
            instance.CustomCheckBoxProps.onChangeValue(false);
            expect(instance.CustomCheckBoxProps.isChecked).toBe(false);
        });

        then('I can select the Submit button with out errors', () => {
            
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration

            
            instance.setState({
                name: 'test',
                email: 'test@example.com',
                password: 'Abcd1234',
                checkedRememberMe: true
            })

            instance.isValidEmail('test@example.com')
            instance.passwordReg.test('Abcd12345')

            const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
            // msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage));
            instance.createAccountApiCallId = msgSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgSucessRestAPI)
            
            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnCreate');
            buttonComponent.simulate('click')
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
        });

    });


    test('Empty Name', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with an empty Name', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration;
        });

        then('Registration Should Fail', () => {
         expect(instance.createAccount()).toBe(false);
        });

        then('RestAPI will return an error', () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors": [
                    {
                        "account": "Registration failed"
                    },
                    {
                        "password": "Password should be min 8 characters long"
                    }
                ]
            });

            instance.createAccountApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
            instance.setState({
                name:  "name", 
                email: "a", 
                password: "pass", 
                checkedRememberMe: true
            });
        });
        
    });

    test('Empty Email', ({given, when, then}) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 
        given('I am a User attempting to Register with Empty Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });
        when('I Register with an empty Email', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({
                email: ''
            })
        });
        then('Registration Should Fail', () => {
            expect(instance.signup()).toBe(false);
        })
    })

    test('Empty Data', ({given, when, then}) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 
        given('I am a User attempting to Register with Empty Data', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });
        when('I Register with an empty Data', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({
                name: '',
                email: '',
                password: '',
                checkedRememberMe: false
            })
            instance.isStringNullOrBlank('')
            instance.setState({
                error: true,
                errorText: 'All fields are mandatory',
                errorType: 'error'
            })
        });
        then('Registration Should Fail', () => {
            expect(instance.signup()).toBe(false);
        })
    })

    test('Invalid EmailData', ({given, when, then}) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 
        given('I am a User attempting to Register with Invalid EmailData', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });
        when('I Register with an Invalid Email', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({
                email: 'test'
            })
            instance.isValidEmail('test')
        });
        then('Registration Should Fail', () => {
            expect(instance.signup()).toBe(false);
        })
    })

    test('Invalid NameData', ({given, when, then}) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 
        given('I am a User attempting to Register with Invalid NameData', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });
        when('I Register with an Invalid Name', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({
                name: 'test11'
            })
            instance.nameReg.test('test11')
            instance.setState({
                error: true,
                errorText: 'Invalid Name',
                errorType: 'error'
            })
        });
        
        then('Registration Should Fail', () => {
            expect(instance.signup()).toBe(false);
        })
    })

    test('Invalid PasswordData', ({given, when, then}) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 
        given('I am a User attempting to Register with Invalid PasswordData', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });
        when('I Register with an Invalid Password', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({
                password: ''
            })
            instance.passwordReg.test('')
            instance.setState({
                error: true,
                errorText: 'Invalid Password',
                errorType: 'error'
            })
        });
        
        then('Registration Should Fail', () => {
            expect(instance.signup()).toBe(false);
        })
    })

    test('Invalid Email', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with an Invalid Email', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration

            const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "data": [
                    {
                        "email_validation_regexp": "^[a-zA-Z0-9.!\\#$%&‘*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                        "password_validation_regexp": "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                        "password_validation_rules": "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_)."
                    }
                ]
            });
            instance.createAccountApiCallId = msgValidationAPI.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPI)

            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)   
            instance.setState({
                name:  "name", 
                email: "a", 
                password: "pass", 
                checkedRememberMe: true
            });

        });

        then('Registration Should Fail', () => {
         expect(instance.createAccount()).toBe(false);
        });

        then('RestAPI will return an error', () => {
          
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors": [
                    {
                        "account": "Registration failed"
                    }
                ]
            });

            instance.createAccountApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
        
    });
    

    test('Invalid Password', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with an Invalid Password', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration

            const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "data": [
                    {
                        "email_validation_regexp": "^[a-zA-Z0-9.!\\#$%&‘*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                        "password_validation_regexp": "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                        "password_validation_rules": "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_)."
                    }
                ]
            });
            instance.validationApiCallId = msgValidationAPI.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPI)

            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)   
            instance.setState({firstName: "FIRST", lastName: "LAST", email: "a@b.com", password: "pass", reTypePassword: "pass123", checkedRememberMe: true});
        });

        then('Registration Should Fail', () => {
         expect(instance.createAccount()).toBe(false);
        });

        then('RestAPI will return an error', () => {
          
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors": [
                    {
                        "password": "Invalid password"
                    }
                ]
            });

            instance.createAccountApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
        
    });


    test('Password and RePassword do not match', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with Password and RePassword that do not match', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration 
            instance.setState({firstName: "FIRST", lastName: "LAST", email: "a@b.com", password: "password123!!", reTypePassword: "pass123"});

        });

        then('Registration Should Fail', () => {
         expect(instance.createAccount()).toBe(false);
        });

        then('RestAPI will return an error', () => {
          
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors": [
                    {
                        "password": "Registration failed"
                    }
                ]
            });

            instance.createAccountApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
        
    });

    test('Valid Registration', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with all valid data', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration 
            instance.setState({
                name: "LAST", 
                email: "a@b.com", 
                password: "password123A",
                checkedRememberMe: true
            });
        });

        then('Registration Should Succeed', () => {
            expect(instance.signup()).toBe(true);
        });

        then('RestAPI will return token', () => {
            const magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instance.createAccountApiCallId = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
        });
        
    });
});
