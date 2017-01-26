'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../util');

var init = {
  loaded: false,
  ready: false,
  sagas: {}
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  var sagas = Object.assign({}, state.sagas);

  switch (action.type) {
    case 'HYDRATE_SAGA_IMPORT':
      sagas[action.name] = false;
      return Object.assign({}, state, { sagas: sagas });
      break;
    case 'HYDRATE_SAGA_LOADED':
      sagas[action.name] = action.saga;
      var loaded = (0, _util.Loaded)(sagas);
      return Object.assign({}, state, { loaded: loaded, sagas: sagas });
      break;
    case 'HYDRATE_SAGA_READY':
      return Object.assign({}, state, { ready: true });
      break;
    default:
      return state;
      break;
  }
};