"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _parse = require("parse");

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse must be init before use
 * like:
 		Parse.initialize("APPLICATION_ID");
        Parse.serverURL = 'http://192.168.3.26:1337/parse'
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

/**
 * 把parse的then/fail风格promise转为then/catche风格的promise
 * @param  {ParsePromise} p 
 * @return {Promise}   
 * 代码来自https://github.com/ParsePlatform/Parse-SDK-JS/issues/183
 */
var p2p = function p2p(p) {
	return new Promise(function (resolve, reject) {
		p.then(resolve, reject);
	});
};

var toJSON = function toJSON(doc) {
	return doc.toJSON();
};
var toJSONList = function toJSONList(docs) {
	return docs.map(toJSON);
};

var parseApiFactory = function parseApiFactory(parseClassName) {
	var ParseObject = _parse2.default.Object.extend(parseClassName);
	var create = function create(obj) {
		var parseObject = new ParseObject();
		if (obj.hasOwnProperty("_id")) {
			delete obj["_id"];
		}
		if (obj.hasOwnProperty("objectId")) {
			delete obj["objectId"];
		}
		if (obj.hasOwnProperty("id")) {
			delete obj["id"];
		}
		var _promise = parseObject.save(obj).then(toJSON);
		return p2p(_promise);
	};
	var get = function get(id) {
		var query = new _parse2.default.Query(ParseObject);
		var _promise;
		if (id) {
			_promise = query.get(id).then(toJSON); //有id取一个
		} else {
			_promise = query.find().then(toJSONList); //没id取所有
		}
		return p2p(_promise);
	};
	var update = function update(obj) {
		var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : obj.objectId;

		var parseObject = new ParseObject();
		parseObject.id = id;
		Object.keys(obj).map(function (key) {
			return parseObject.set(key, obj[key]);
		});
		var _promise = parseObject.save();
		return p2p(_promise);
	};
	var destroy = function destroy(id) {
		var parseObject = new ParseObject();
		parseObject.id = id;
		var _promise = parseObject.destroy();
		return p2p(_promise);
	};
	return {
		create: create,
		get: get,
		update: update,
		destroy: destroy
	};
};

exports.default = parseApiFactory;