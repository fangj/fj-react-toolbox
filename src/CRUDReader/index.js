/**
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


import PromiseFactoryView from '../PromiseFactoryView';

module.exports =({api,id,ns="CRUDReader",children,...others})=>
	<PromiseFactoryView promiseFactory={()=>api.get(id)} then="data" ns={ns} {...others}>
		{children}
	</PromiseFactoryView>
