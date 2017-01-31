'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store) {

  var resolving = false;

  var unsubscribe = store.subscribe(function () {
    var state = store.getState().hydrationReducer;

    // Update Reducers
    if (state.reducers.loaded && !state.reducers.ready) {
      //store.replaceReducer(reducer, state.getState())
      store.dispatch({ type: 'HYDRATE_REDUCER_READY' });
    }

    // When both Reducers and Sagas are ready
    if (state.reducers.ready && state.sagas.ready) {

      // Dispatch actions queue
      if (!resolving) {
        resolving = true;
        var queue = state.resolvers.queue;

        queue.forEach(function (action) {
          store.dispatch(action);
        });
        resolving = false;

        // Hydration complete (dynamic reducers injected, dynamic sagas running,
        // dynamic components loaded, all resolvers resolved)
      } else if (state.resolvers.resolvers.length < 1) {

        // Set hydrationReducer.ready to true
        store.dispatch({ type: 'HYDRATE_CLIENT' });
      }
    }
  });

  // start using client behavior
  store.dispatch({ type: 'HYDRATE_CLIENT' });
};