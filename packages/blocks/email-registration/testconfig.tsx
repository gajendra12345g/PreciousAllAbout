// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock("../../framework/src/StorageProvider", () => {
    return {
      get: jest.fn(),
      remove: jest.fn(),
      set : jest.fn()
    };
  });


  const { JSDOM } = require('jsdom');

  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  global.document = dom.window.document;
  global.window = dom.window;
  global.navigator = { userAgent: 'node.js' };