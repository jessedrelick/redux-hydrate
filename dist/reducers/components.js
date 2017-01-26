'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../util');

var init = {
  loaded: false,
  ready: false,
  components: {}
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  var components = Object.assign({}, state.components);

  switch (action.type) {
    case 'HYDRATE_COMPONENT_IMPORT':
      components[action.name] = false;
      return Object.assign({}, state, { components: components });
      break;
    case 'HYDRATE_COMPONENT_LOADED':
      components[action.name] = action.component;
      var loaded = (0, _util.Loaded)(components);
      return Object.assign({}, state, { loaded: loaded, components: components });
      break;
    case 'HYDRATE_COMPONENT_READY':
      return Object.assign({}, state, { ready: true });
      break;
    default:
      return state;
      break;
  }
};