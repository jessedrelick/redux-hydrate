'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store, props, render, jsx, timeout) {
  return new Promise(function (resolve, reject) {
    var unsubscribe = store.subscribe(function () {
      if (store.getState().hydrationReducer.ready) {
        resolve();
        unsubscribe();
      }
    });
    render(jsx(store, props));
    store.dispatch({ type: 'HYDRATE_START' });
    setTimeout(function () {
      unsubscribe();
      resolve(true);
    }, timeout);
  });
};