'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var init = {
  initialized: false,
  ready: false,
  timeout: false,
  register: {},
  log: [],
  unresolved: []
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  switch (action.type) {
    case 'HYDRATE_REGISTER':
      {
        var register = Object.assign({}, state.register, _defineProperty({}, action.initializer, action.resolvers)),
            out = Object.assign({}, state, { register: register });
        return out;
      }
      break;
    case 'HYDRATE_START':
      {
        var unresolved = (0, _util.diff)(state.register, state.log.slice());
        return Object.assign({}, state, { initialized: true, ready: unresolved.length < 1 });
      }
      break;
    case 'HYDRATE_TIMEOUT':
      {
        var _unresolved = (0, _util.diff)(state.register, state.log.slice());
        return Object.assign({}, state, { timeout: true, unresolved: _unresolved });
      }
      break;
    default:
      {
        if (state.ready) {
          return state;
        }
        var logObject = {},
            log = state.log.slice();
        log.push(action.type);
        if (typeof window === 'undefined') {
          logObject = {
            log: log
          };
        }
        var _unresolved2 = (0, _util.diff)(state.register, log.slice());
        return Object.assign({}, state, {
          unresolved: _unresolved2,
          ready: state.initialized === true && _unresolved2.length < 1
        }, logObject);
      }
      break;
  }
};