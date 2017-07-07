'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var init = {
  initialized: false,
  ready: false,
  timeout: false,
  register: [],
  log: [],
  unresolved: []
};

var diff = function diff(register, log) {
  return register.filter(function (resolvers) {
    return !log.some(function (action) {
      return resolvers.indexOf(action) >= 0;
    });
  });
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  switch (action.type) {
    case 'HYDRATE_REGISTER':
      {
        var register = state.register.slice();
        register.push(action.resolve);
        return Object.assign({}, state, { register: register });
      }
      break;
    case 'HYDRATE_START':
      {
        var unresolved = diff(state.register.slice(), state.log.slice());
        return Object.assign({}, state, { initialized: true, ready: unresolved.length < 1 });
      }
      break;
    case 'HYDRATE_TIMEOUT':
      {
        var _unresolved = diff(state.register.slice(), state.log.slice());
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
        var _unresolved2 = diff(state.register.slice(), log.slice());
        return Object.assign({}, state, {
          log: log,
          ready: state.initialized === true && _unresolved2.length < 1
        });
      }
      break;
  }
};