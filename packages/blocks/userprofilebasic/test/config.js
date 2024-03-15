// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock('@react-native-community/async-storage-backend-legacy', () =>
  require('./__mocks__/@react-native-async-storage/async-storage')
);

jest.mock("../../framework/src/StorageProvider", () => {
    return {
      get: jest.fn(),
      remove: jest.fn(),
    };
});

global.Blob = jest.fn((content, options) => ({ content, options }));
global.URL.createObjectURL = jest.fn();


const customFormData = () => {};
customFormData.prototype.constructor = jest.fn();
customFormData.prototype.append = jest.fn();

global.FormData = customFormData;