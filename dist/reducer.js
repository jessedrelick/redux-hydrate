'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { register: [], components: {}, initialized: false, ready: false };
  var action = arguments[1];

  switch (action.type) {
    case 'HYDRATE_REGISTER':
      {
        var register = state.register.slice();
        var components = Object.assign({}, state.components);
        if (action.resolve) {
          register.push(action.resolve);
        } else if (action.name) {
          components[action.name] = false;
        }

        return Object.assign({}, state, { register: register, components: components });
      }
      break;
    case 'HYDRATE_START':
      {
        var _components = Object.keys(state.components).filter(function (item) {
          return state.components[item] === false;
        });
        return Object.assign({}, state, { initialized: true, ready: state.register.length < 1 && _components.length < 1 });
      }
      break;
    case 'HYDRATE_COMPONENT':
      {
        var _components2 = Object.assign({}, state.components);
        _components2[action.name] = action.component;
        return Object.assign({}, state, { components: _components2 });
      }
      break;
    default:
      {
        if (state.ready) {
          return state;
        }
        var _register = state.register.filter(function (item) {
          return item.indexOf(action.type) > -1 ? false : true;
        });
        var _components3 = Object.keys(state.components).filter(function (item) {
          return state.components[item] === false;
        });
        return Object.assign({}, state, {
          register: _register,
          ready: state.initialized === true && _register.length < 1 && _components3.length < 1
        });
      }
      break;
  }
};