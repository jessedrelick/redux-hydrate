'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _components = require('./reducers/components');

var _components2 = _interopRequireDefault(_components);

var _reducers = require('./reducers/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _resolvers = require('./reducers/resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _sagas = require('./reducers/sagas');

var _sagas2 = _interopRequireDefault(_sagas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = {
  initialized: false,
  ready: false
};

var hydration = function hydration() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];


  switch (action.type) {
    case 'HYDRATE_START':
      return Object.assign({}, state, { initialized: true });
      break;
    case 'HYDRATE_COMPLETE':
      return Object.assign({}, state, { ready: true });
      break;
    default:
      return state;
      break;
  }
};

exports.default = (0, _redux.combineReducers)({
  hydration: hydration,
  components: _components2.default,
  reducers: _reducers2.default,
  resolvers: _resolvers2.default,
  sagas: _sagas2.default
});