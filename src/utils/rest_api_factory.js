import axios from 'axios';

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


const restApiFactory=(url,keyField)=>{
	// if(!url.endsWith("/")){ //url应该以"/"结尾
	// 	url=url+"/";
	// }
	const agent = axios.create({
	  baseURL: url
	});
	const create=(obj)=>agent.post("",obj).then(resp=>resp.data);
	const get=(id="")=>agent.get(id).then(resp=>resp.data);
	const update=(obj,id=obj[keyField])=>agent.put(id,obj).then(resp=>resp.data);
	const destroy=(id)=>agent.delete(id).then(resp=>resp.data);
	return {
		create,
		get,
		update,
		destroy
	}
}

export default restApiFactory;