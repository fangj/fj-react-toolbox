"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _PromiseFactoryView = require("../PromiseFactoryView");

var _PromiseFactoryView2 = _interopRequireDefault(_PromiseFactoryView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                             CRUDReader
                                                                                                                                                                                                                             * -> :api  //CRUD api
                                                                                                                                                                                                                             * -> :id  //item id
                                                                                                                                                                                                                             * ↓  :data //注入的数据
                                                                                                                                                                                                                             *
                                                                                                                                                                                                                             * api
                                                                                                                                                                                                                              * api.create(obj)   => 创建 object
                                                                                                                                                                                                                              * api.get(id)       => 读取 object
                                                                                                                                                                                                                              * api.get()         => 读取 所有object
                                                                                                                                                                                                                              * api.update(obj,id)=> 更新 object
                                                                                                                                                                                                                              * api.destroy(id)   => 删除 object
                                                                                                                                                                                                                             **/

module.exports = function (_ref) {
  var api = _ref.api,
      id = _ref.id,
      _ref$ns = _ref.ns,
      ns = _ref$ns === undefined ? "CRUDReader" : _ref$ns,
      children = _ref.children,
      others = _objectWithoutProperties(_ref, ["api", "id", "ns", "children"]);

  return React.createElement(
    _PromiseFactoryView2.default,
    _extends({ promiseFactory: function promiseFactory() {
        return api.get(id);
      }, then: "data", ns: ns }, others),
    children
  );
};