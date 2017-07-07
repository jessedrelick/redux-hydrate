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
        clearTimeout(to);
      }
    });
    render(jsx(store, props));
    store.dispatch({ type: 'HYDRATE_START' });
    var to = setTimeout(function () {
      store.dispatch({ type: 'HYDRATE_TIMEOUT' });
      unsubscribe();
      resolve(true);
    }, timeout);
  });
};