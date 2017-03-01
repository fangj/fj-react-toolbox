"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
	GET     /       ->  list all
	GET     /:id    ->  read one
	POST    /       ->  insert
	PUT     /:id    ->  update
	DELETE  /:id    ->  remove
 */

/**
 * 输入:restful 的url和keyField
 * 输出:CRUD函数一套
 * api.create(obj)   => 创建 object
 * api.get(id)       => 读取 object
 * api.get()         => 读取 所有object
 * api.update(obj,id)=> 更新 object
 * api.destroy(id)   => 删除 object
 */

var restApiFactory = function restApiFactory(url, keyField) {
	// if(!url.endsWith("/")){ //url应该以"/"结尾
	// 	url=url+"/";
	// }
	var agent = _axios2.default.create({
		baseURL: url
	});
	var create = function create(obj) {
		return agent.post("", obj).then(function (resp) {
			return resp.data;
		});
	};
	var get = function get() {
		var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
		return agent.get(id).then(function (resp) {
			return resp.data;
		});
	};
	var update = function update(obj) {
		var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : obj[keyField];
		return agent.put(id, obj).then(function (resp) {
			return resp.data;
		});
	};
	var destroy = function destroy(id) {
		return agent.delete(id).then(function (resp) {
			return resp.data;
		});
	};
	return {
		create: create,
		get: get,
		update: update,
		destroy: destroy
	};
};

exports.default = restApiFactory;