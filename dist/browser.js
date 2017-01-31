'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store) {

  // start using client behavior
  store.dispatch({ type: 'HYDRATE_CLIENT' });
};