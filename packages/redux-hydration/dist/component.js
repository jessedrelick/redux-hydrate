'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (resolvers) {
	return function (Component) {

		var mapState = function mapState(state) {
			var hydrationReducer = state.hydrationReducer;

			return {
				hydrationReducer: hydrationReducer
			};
		};

		var Hydrate = function (_React$Component) {
			_inherits(Hydrate, _React$Component);

			function Hydrate() {
				_classCallCheck(this, Hydrate);

				return _possibleConstructorReturn(this, (Hydrate.__proto__ || Object.getPrototypeOf(Hydrate)).apply(this, arguments));
			}

			_createClass(Hydrate, [{
				key: 'componentWillMount',
				value: function componentWillMount() {
					var _props = this.props,
					    dispatch = _props.dispatch,
					    hydrationReducer = _props.hydrationReducer;

					if (!hydrationReducer.ready && resolvers) {
						resolvers.forEach(function (action) {
							dispatch(action);
						});
					}
				}
			}, {
				key: 'render',
				value: function render() {
					return _react2.default.createElement(Component, this.props);
				}
			}]);

			return Hydrate;
		}(_react2.default.Component);

		return (0, _reactRedux.connect)(mapState)(Hydrate);
	};
};