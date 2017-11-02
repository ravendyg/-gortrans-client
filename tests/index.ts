import 'babel-polyfill';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter.default() });

require('tests/bus-search');
require('tests/main');