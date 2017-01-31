webpackJsonp([0],{

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = init;\n\nvar _effects = __webpack_require__(158);\n\nvar _reduxSaga = __webpack_require__(98);\n\nvar _marked = [init].map(regeneratorRuntime.mark);\n\nfunction init() {\n  var data;\n  return regeneratorRuntime.wrap(function init$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          if (false) {\n            _context.next = 10;\n            break;\n          }\n\n          _context.next = 3;\n          return (0, _effects.take)('ASYNC_START');\n\n        case 3:\n          _context.next = 5;\n          return (0, _reduxSaga.delay)(2000);\n\n        case 5:\n          data = 'I am an async component';\n          _context.next = 8;\n          return (0, _effects.put)({ type: 'ASYNC_SUCCESS', data: data });\n\n        case 8:\n          _context.next = 0;\n          break;\n\n        case 10:\n        case 'end':\n          return _context.stop();\n      }\n    }\n  }, _marked[0], this);\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./example/components/async/saga.js\n// module id = 579\n// module chunks = 0\n\n//# sourceURL=webpack:///./example/components/async/saga.js?");

/***/ })

});