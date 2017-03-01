'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * PromiseView用于向子view注入promise的结果
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 只能有一个子view
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 当promise成功时，向子view注入{then}属性，默认属性名为"value"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 向唯一的子view注入promise数据，如果失败默认不显示。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 如果有_catch属性，则失败时为子view注入{_catch}属性并显示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * -> :promise   //产生数据的promise 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * -> :then      //注入的属性名(成功时)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * -> :_catch    //注入的属性名(失败时),(如果有_catch)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ↓  :{then}    //promise成功时的数据 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ↓  :{_catch}  //promise失败时的数据 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var mc = require('../make-cancelable');

var PromiseView = function (_React$Component) {
  _inherits(PromiseView, _React$Component);

  function PromiseView(props) {
    _classCallCheck(this, PromiseView);

    var _this = _possibleConstructorReturn(this, (PromiseView.__proto__ || Object.getPrototypeOf(PromiseView)).call(this, props));

    _this.state = {};
    _this.doPromise = _this.doPromise.bind(_this);
    return _this;
  }

  _createClass(PromiseView, [{
    key: 'doPromise',
    value: function doPromise(props) {
      var _this2 = this;

      this.promise = mc(props.promise); //使用cancelable promise以避免数据到来时组件已经unmount
      this.promise.then(function (value) {
        return _this2.setState({ value: value });
      }).catch(function (reason) {
        !reason.isCanceled && _this2.setState({ reason: reason }); //如果被cancel可能是组件unmount,不能再setState
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.doPromise(this.props); //执行promise
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.promise && this.promise.cancel(); //视图消失时取消promise
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.promise != nextProps.promise) {
        this.doPromise(nextProps);
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

  return PromiseView;
}(_react2.default.Component);

PromiseView.propTypes = {
  promise: _react2.default.PropTypes.instanceOf(Promise), //promise
  then: _react2.default.PropTypes.string,
  _catch: _react2.default.PropTypes.string
};
PromiseView.defaultProps = {
  promise: Promise.resolve(),
  then: "value"
};
exports.default = PromiseView;