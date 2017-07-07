'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { initialized: false, ready: false, timeout: false, register: [], log: [] };
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
        return Object.assign({}, state, { initialized: true, ready: state.register.length < 1 });
      }
      break;
    case 'HYDRATE_TIMEOUT':
      {
        return Object.assign({}, state, { timeout: true });
      }
      break;
    default:
      {
        if (state.ready) {
          return state;
        }
        var log = state.log.slice();
        log.push(action.type);
        var _register = state.register.filter(function (item) {
          return item.indexOf(action.type) > -1 ? false : true;
        });
        return Object.assign({}, state, {
          register: _register,
          log: log,
          ready: state.initialized === true && _register.length < 1
        });
      }
      break;
  }
};