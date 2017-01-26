'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (_ref) {
	var name = _ref.name,
	    component = _ref.component,
	    reducer = _ref.reducer,
	    saga = _ref.saga,
	    resolve = _ref.resolve,
	    queue = _ref.queue;

	var Hydrate = function (_React$Component) {
		_inherits(Hydrate, _React$Component);

		function Hydrate() {
			_classCallCheck(this, Hydrate);

			return _possibleConstructorReturn(this, (Hydrate.__proto__ || Object.getPrototypeOf(Hydrate)).apply(this, arguments));
		}

		_createClass(Hydrate, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _this2 = this;

				if (!this.props.hydrationReducer.ready && resolve) {
					resolve.forEach(function (types) {
						_this2.props.dispatch({ type: 'HYDRATE_RESOLVE_REGISTER', resolve: types });
					});
				}
				if (queue) {
					queue.forEach(function (action) {
						_this2.props.dispatch({ type: 'HYDRATE_QUEUE_REGISTER', action: action });
					});
				}
				if (component.then && name) {
					this.props.dispatch({ type: 'HYDRATE_COMPONENT_IMPORT', name: name });
					component.then(function (mod) {
						_this2.props.dispatch({ type: 'HYDRATE_COMPONENT_LOADED', name: name, component: mod.default });
					}).catch(function (err) {
						console.error(err);
					});
				}
				if (reducer && reducer.then && name) {
					this.props.dispatch({ type: 'HYDRATE_REDUCER_IMPORT', name: name });
					reducer.then(function (mod) {
						_this2.props.dispatch({ type: 'HYDRATE_REDUCER_LOADED', name: name, reducer: mod.default });
					}).catch(function (err) {
						console.error(err);
					});
				}
				if (saga && saga.then && name) {
					this.props.dispatch({ type: 'HYDRATE_SAGA_IMPORT', name: name });
					reducer.then(function (mod) {
						_this2.props.dispatch({ type: 'HYDRATE_SAGA_LOADED', name: name, saga: mod.default });
					}).catch(function (err) {
						console.error(err);
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				if (!component.then) {
					return _react2.default.createElement('component', this.props);
				}
				var hydrationReducer = this.props.hydrationReducer;

				var Async = hydrationReducer.components[name];
				if (Async) {
					return _react2.default.createElement(Async, this.props);
				}
				return false;
			}
		}]);

		return Hydrate;
	}(_react2.default.Component);

	var mapState = function mapState(state, ownProps) {
		var hydrationReducer = state.hydrationReducer;

		return {
			hydrationReducer: hydrationReducer
		};
	};

	var mapDispatch = function mapDispatch(dispatch) {
		return {
			dispatch: dispatch
		};
	};

	return (0, _reactRedux.connect)(mapState, mapDispatch)(Hydrate);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }