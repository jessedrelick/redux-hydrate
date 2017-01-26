'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../util');

var init = {
  loaded: false,
  ready: false,
  reducers: {}
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  var reducers = Object.assign({}, state.reducers);

  switch (action.type) {
    case 'HYDRATE_REDUCER_IMPORT':
      reducers[action.name] = false;
      return Object.assign({}, state, { reducers: reducers });
      break;
    case 'HYDRATE_REDUCER_LOADED':
      reducers[action.name] = action.reducer;
      var loaded = (0, _util.Loaded)(reducers);
      return Object.assign({}, state, { loaded: loaded, reducers: reducers });
      break;
    case 'HYDRATE_REDUCER_READY':
      return Object.assign({}, state, { ready: true });
      break;
    default:
      return state;
      break;
  }
};