// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../../framework/src/StorageProvider', () => ({
    get: jest.fn().mockImplementation(()=>'showUploadedData').mockImplementationOnce(()=>"true"),
    set: jest.fn(),
    remove: jest.fn()

  }))
  global.FormData =jest.fn().mockImplementation(()=> ({
    append:jest.fn()
}))