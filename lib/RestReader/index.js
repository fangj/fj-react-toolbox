'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _CRUDReader = require('../CRUDReader');

var _CRUDReader2 = _interopRequireDefault(_CRUDReader);

var _rest_api_factory = require('../utils/rest_api_factory');

var _rest_api_factory2 = _interopRequireDefault(_rest_api_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                             RestReader
                                                                                                                                                                                                                             -> :url  //restfyk url
                                                                                                                                                                                                                             -> :id  //item id
                                                                                                                                                                                                                             ↓  :data //注入的数据
                                                                                                                                                                                                                             **/

module.exports = function (_ref) {
												var url = _ref.url,
												    children = _ref.children,
												    props = _objectWithoutProperties(_ref, ['url', 'children']);

												return React.createElement(
																								_CRUDReader2.default,
																								_extends({ api: (0, _rest_api_factory2.default)(url) }, props),
																								children
												);
};