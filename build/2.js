webpackJsonp([2],{

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(8);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(77);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Async = function Async(_ref) {\n  var asyncData = _ref.asyncData;\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'div',\n      null,\n      'Async data: ',\n      asyncData\n    )\n  );\n};\n\nvar mapState = function mapState(state) {\n  return { asyncData: state.app.asyncData };\n};\n\nexports.default = (0, _reactRedux.connect)(mapState)(Async);\n\n//////////////////\n// WEBPACK FOOTER\n// ./example/components/async/index.js\n// module id = 577\n// module chunks = 2\n\n//# sourceURL=webpack:///./example/components/async/index.js?");

/***/ })

});