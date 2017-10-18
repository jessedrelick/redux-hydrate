'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var init = {
  initialized: false,
  ready: false,
  timeout: false,
  register: {},
  log: [],
  unresolved: []
};

var diff = function diff(register, log) {
  return Object.keys(register).filter(function (k) {
    return !log.some(function (action) {
      return register[k].indexOf(action) >= 0;
    });
  });
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
        var unresolved = diff(state.register, state.log.slice());
        return Object.assign({}, state, { initialized: true, ready: unresolved.length < 1 });
      }
      break;
    case 'HYDRATE_TIMEOUT':
      {
        var _unresolved = diff(state.register, state.log.slice());
        return Object.assign({}, state, { timeout: true, unresolved: _unresolved });
      }
      break;
    default:
      {
        if (state.ready) {
          return state;
        }
        var log = state.log.slice();
        log.push(action.type);
        var _unresolved2 = diff(state.register, log.slice());
        return Object.assign({}, state, {
          log: log,
          ready: state.initialized === true && _unresolved2.length < 1
        });
      }
      break;
  }
};