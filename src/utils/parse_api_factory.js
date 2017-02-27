import Parse from 'parse';

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
const p2p=(p)=>{
  return new Promise((resolve, reject) => {
    p.then(resolve, reject);
  });
}

const toJSON=(doc)=>doc.toJSON();
const toJSONList=(docs)=>docs.map(toJSON);

const parseApiFactory=(parseClassName)=>{
	const ParseObject = Parse.Object.extend(parseClassName);
	const create=(obj)=>{
		var parseObject=new ParseObject();
		if(obj.hasOwnProperty("_id")){delete obj["_id"]}
		if(obj.hasOwnProperty("objectId")){delete obj["objectId"]}
		if(obj.hasOwnProperty("id")){delete obj["id"]}
		const _promise=parseObject.save(obj).then(toJSON);
		return p2p(_promise);
	};
	const get=(id)=>{
		var query = new Parse.Query(ParseObject);
		var _promise;
		if(id){
			_promise=query.get(id).then(toJSON); //有id取一个
		}else{
			_promise=query.find().then(toJSONList); //没id取所有
		}
		return p2p(_promise);
	};
	const update=(obj,id=obj.objectId)=>{
		var parseObject=new ParseObject();
		parseObject.id=id;
		Object.keys(obj).map(key=>parseObject.set(key,obj[key]));
		var _promise=parseObject.save();
		return p2p(_promise);
	}
	const destroy=(id)=>{
		var parseObject=new ParseObject();
		parseObject.id=id;
		var _promise=parseObject.destroy();
		return p2p(_promise);
	}
	return {
		create,
		get,
		update,
		destroy
	}
}

export default parseApiFactory;