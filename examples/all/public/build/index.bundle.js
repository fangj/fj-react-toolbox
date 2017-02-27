webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _CRUDReader = __webpack_require__(3);

	var _CRUDReader2 = _interopRequireDefault(_CRUDReader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PubSub = __webpack_require__(6);

	var getValue = function getValue(v) {
	  return Promise.resolve("id:" + v + "/" + Math.random());
	};
	var api = { get: getValue };
	var ValueShower = function ValueShower(_ref) {
	  var value = _ref.value;
	  return _react2.default.createElement(
	    'div',
	    null,
	    value
	  );
	};
	var RandomValue = _react2.default.createElement(
	  _CRUDReader2.default,
	  { api: api, id: '42', ns: 'RandomValue' },
	  ' ',
	  _react2.default.createElement(ValueShower, null),
	  ' '
	);
	//PubSub.publish("RandomValue") 刷新

	_reactDom2.default.render(RandomValue, document.getElementById('root'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _PromiseFactoryView = __webpack_require__(4);

	var _PromiseFactoryView2 = _interopRequireDefault(_PromiseFactoryView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CRUDReader = function CRUDReader(_ref) {
		var api = _ref.api,
		    id = _ref.id,
		    _ref$ns = _ref.ns,
		    ns = _ref$ns === undefined ? "CRUDReader" : _ref$ns,
		    children = _ref.children;
		return React.createElement(
			_PromiseFactoryView2.default,
			{ promiseFactory: function promiseFactory() {
					return api.get(id);
				}, then: "value", ns: ns },
			children
		);
	}; /**
	   -> :api  //crud api
	   ↓  :data //注入的数据
	   **/

	module.exports = CRUDReader;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * PromiseFactoryView用于向子view注入promise的结果
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 只能有一个子view
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 当promise成功时，向子view注入{then}属性，默认属性名为"value"
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 向唯一的子view注入promise数据，如果失败默认不显示。
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 如果有_catch属性，则失败时为子view注入{_catch}属性并显示
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 通过PubSub向{ns}发送消息可以刷新数据
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 发送"refresh",以默认参数defaultPromiseParameter生成promise刷新数据
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 发送其他数据，则发送的数据作为promiseFactory的参数生成promise
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * -> :promise   //产生数据的promise 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * -> :then      //注入的属性名(成功时)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * -> :_catch    //注入的属性名(失败时),(如果有_catch)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * => :ns,"refresh" //刷新数据
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * => :ns,{promiseParameter} //刷新数据
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ↓  :{then}    //promise成功时的数据 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ↓  :{_catch}  //promise失败时的数据 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var mc = __webpack_require__(5);

	var PromiseFactoryView = function (_React$Component) {
	  _inherits(PromiseFactoryView, _React$Component);

	  function PromiseFactoryView(props) {
	    _classCallCheck(this, PromiseFactoryView);

	    var _this = _possibleConstructorReturn(this, (PromiseFactoryView.__proto__ || Object.getPrototypeOf(PromiseFactoryView)).call(this, props));

	    _this.state = {};
	    _this.doPromise = _this.doPromise.bind(_this);
	    _this.handleMsg = _this.handleMsg.bind(_this);
	    return _this;
	  }

	  _createClass(PromiseFactoryView, [{
	    key: 'doPromise',
	    value: function doPromise(props, parameter) {
	      var _this2 = this;

	      var promiseParameter = parameter === undefined ? props.defaultPromiseParameter : parameter;
	      this.promise = mc(props.promiseFactory(promiseParameter)); //使用cancelable promise以避免数据到来时组件已经unmount
	      this.promise.then(function (value) {
	        return _this2.setState({ value: value });
	      }).catch(function (reason) {
	        !reason.isCanceled && _this2.setState({ reason: reason }); //如果被cancel可能是组件unmount,不能再setState
	      });
	    }
	  }, {
	    key: 'handleMsg',
	    value: function handleMsg(ns, msg) {
	      this.doPromise(this.props, msg);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.doPromise(this.props); //执行promise
	      this.token = PubSub.subscribe(this.props.ns, this.handleMsg);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.promise && this.promise.cancel(); //视图消失时取消promise
	      PubSub.unsubscribe(this.token);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.promise != nextProps.promise) {
	        doPromise(nextProps);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          then = _props.then,
	          _catch = _props._catch,
	          children = _props.children;
	      var _state = this.state,
	          value = _state.value,
	          reason = _state.reason;

	      var child = _react2.default.Children.only(children); //children只能有1个
	      if (value !== undefined) {
	        var v = _react2.default.cloneElement(child, _defineProperty({}, then, value));
	        return v;
	      }
	      if (reason !== undefined && _catch !== undefined) {
	        var _v = _react2.default.cloneElement(child, _defineProperty({}, _catch, value));
	        return _v;
	      }
	      return null;
	    }
	  }]);

	  return PromiseFactoryView;
	}(_react2.default.Component);

	PromiseFactoryView.propTypes = {
	  promiseFactory: _react2.default.PropTypes.func, //生成promise
	  defaultPromiseParameter: _react2.default.PropTypes.string, //默认传给promise的参数
	  then: _react2.default.PropTypes.string,
	  _catch: _react2.default.PropTypes.string,
	  ns: _react2.default.PropTypes.string };
	PromiseFactoryView.defaultProps = {
	  promiseFactory: Promise.resolve,
	  defaultPromiseParameter: "refresh",
	  then: "value",
	  ns: "PromiseViewFactory"
	};
	exports.default = PromiseFactoryView;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var makeCancelable = function makeCancelable(promise) {
	  var hasCanceled_ = false;

	  var wrappedPromise = new Promise(function (resolve, reject) {
	    promise.then(function (val) {
	      return hasCanceled_ ? reject({ isCanceled: true }) : resolve(val);
	    }).catch(function (error) {
	      return hasCanceled_ ? reject({ isCanceled: true }) : reject(error);
	    });
	  });
	  wrappedPromise.cancel = wrappedPromise.cancel || function () {
	    hasCanceled_ = true;
	  };
	  return wrappedPromise;
	};

	module.exports = makeCancelable;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = PubSub;

/***/ }
]);