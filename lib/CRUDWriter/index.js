'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CRUDReader = require('../CRUDReader');

var _CRUDReader2 = _interopRequireDefault(_CRUDReader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                             CRUDWriter
                                                                                                                                                                                                                             如果有id,注入data,update(),remove()
                                                                                                                                                                                                                             如果无id,注入save()
                                                                                                                                                                                                                             * -> :api  //CRUD API
                                                                                                                                                                                                                             * -> :id  //item id
                                                                                                                                                                                                                             * ↓  :data //注入的数据
                                                                                                                                                                                                                             * ↓  :update //更新数据函数
                                                                                                                                                                                                                             * ↓  :remove //删除数据的函数
                                                                                                                                                                                                                             * ↓  :save //保存数据的函数
                                                                                                                                                                                                                             **/


module.exports = function (_ref) {
	var api = _ref.api,
	    id = _ref.id,
	    _ref$ns = _ref.ns,
	    ns = _ref$ns === undefined ? "CRUDWriter" : _ref$ns,
	    children = _ref.children,
	    others = _objectWithoutProperties(_ref, ['api', 'id', 'ns', 'children']);

	if (id === undefined) {
		//无id，注入save
		return _react2.default.cloneElement(children, _extends({
			save: api.create
		}, others));
	} else {
		//有id,注入data,update,remove
		return _react2.default.createElement(
			_CRUDReader2.default,
			_extends({ api: api, id: id, ns: ns, update: function update(data) {
					return api.update(data, id);
				}, remove: function remove() {
					return api.destory(id);
				} }, others),
			children
		);
	}
};