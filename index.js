'use strict';

exports.__esModule = true;

const hydrationReducer =  require('./dist/reducer');
const hydrationHelper = require('./dist/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.hydrationReducer = _interopRequireDefault(hydrationReducer).default;
exports.hydrationHelper = _interopRequireDefault(hydrationHelper).default;
