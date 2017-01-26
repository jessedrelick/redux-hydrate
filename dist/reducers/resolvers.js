'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var init = {
  resolvers: [],
  queue: []
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  var resolvers = state.resolvers.slice();
  var queue = state.queue.slice();

  switch (action.type) {
    case 'HYDRATE_RESOLVE_REGISTER':
      resolvers.push(action.resolve);
      return Object.assign({}, state, { resolvers: resolvers });
      break;
    case 'HYDRATE_QUEUE_REGISTER':
      queue.push(action.action);
      return Object.assign({}, state, { queue: queue });
      break;
    default:
      {
        if (state.resolvers.length < 1) {
          return state;
        }
        resolvers = resolvers.filter(function (item) {
          return item.indexOf(action.type) > -1 ? false : true;
        });
        return Object.assign({}, state, { resolvers: resolvers });
      }
      break;
  }
};