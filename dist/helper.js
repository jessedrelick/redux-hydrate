'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store, props, render, jsx, timeout) {
  return new Promise(function (resolve, reject) {
    var unsubscribe = store.subscribe(function () {
      var state = store.getState().hydrationReducer;
      if (state.reducers.loaded && !state.reducers.ready) {
        //store.replaceReducer(reducer, state.getState())
        store.dispatch({ type: 'HYDRATE_REDUCER_READY' });
      }
      if (state.reducers.ready && state.sagas.ready) {
        console.log('SAGAS + REDUCERS READY');
        var queue = state.resolvers.queue;

        console.log(queue);
      }
      if (state.ready) {
        resolve();
        unsubscribe();
      }
    });
    render(jsx(store, props));
    store.dispatch({ type: 'HYDRATE_START' });
    setTimeout(function () {
      resolve();
    }, timeout);
  });
};