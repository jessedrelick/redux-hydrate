'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = init;

var _effects = require('redux-saga/effects');

var _marked = [init].map(regeneratorRuntime.mark);

// optional file, only needed if sagas are used
function init() {
	var _this = this;

	var ready, reducersReady, sagasLoaded;
	return regeneratorRuntime.wrap(function init$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					ready = false;

				case 1:
					if (ready) {
						_context2.next = 14;
						break;
					}

					_context2.next = 4;
					return (0, _effects.take)('*');

				case 4:
					_context2.next = 6;
					return (0, _effects.select)(function (state) {
						return state.hydrationReducer.reducers.ready;
					});

				case 6:
					reducersReady = _context2.sent;
					_context2.next = 9;
					return (0, _effects.select)(function (state) {
						return state.hydrationReducer.sagas.loaded;
					});

				case 9:
					sagasLoaded = _context2.sent;

					if (!(reducersReady && sagasLoaded)) {
						_context2.next = 12;
						break;
					}

					return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
						var _ref, sagas;

						return regeneratorRuntime.wrap(function _callee$(_context) {
							while (1) {
								switch (_context.prev = _context.next) {
									case 0:
										_context.next = 2;
										return (0, _effects.select)(function (state) {
											return state.hydrationReducer.sagas;
										});

									case 2:
										_ref = _context.sent;
										sagas = _ref.sagas;

										Object.keys(sagas).map(function (key) {
											return (0, _effects.spawn)(sagas[key]);
										});
										_context.next = 7;
										return (0, _effects.put)({ type: 'HYDRATE_SAGA_READY' });

									case 7:
										ready = true;

									case 8:
									case 'end':
										return _context.stop();
								}
							}
						}, _callee, _this);
					})(), 't0', 12);

				case 12:
					_context2.next = 1;
					break;

				case 14:
				case 'end':
					return _context2.stop();
			}
		}
	}, _marked[0], this);
}