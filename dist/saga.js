'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = init;

var _effects = require('redux-saga/effects');

var _marked = [init].map(regeneratorRuntime.mark);

// optional file, only needed if sagas are used
function init() {
	var ready, reducersReady, sagasLoaded;
	return regeneratorRuntime.wrap(function init$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					ready = false;

				case 1:
					if (ready) {
						_context.next = 16;
						break;
					}

					_context.next = 4;
					return (0, _effects.take)('*');

				case 4:
					_context.next = 6;
					return (0, _effects.select)(function (state) {
						return state.hydrationReducer.reducers.ready;
					});

				case 6:
					reducersReady = _context.sent;
					_context.next = 9;
					return (0, _effects.select)(function (state) {
						return state.hydrationReducer.sagas.loaded;
					});

				case 9:
					sagasLoaded = _context.sent;

					if (!(reducersReady && sagasLoaded)) {
						_context.next = 14;
						break;
					}

					_context.next = 13;
					return (0, _effects.put)({ type: 'HYDRATE_SAGA_READY' });

				case 13:
					ready = true;

				case 14:
					_context.next = 1;
					break;

				case 16:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}