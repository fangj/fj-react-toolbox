/**
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
import React from 'react';
import CRUDReader from '../CRUDReader';

module.exports =({api,id,ns="CRUDWriter",children,...others})=>{
	if(id===undefined){ //无id，注入save
		return React.cloneElement(children, {
	    	save: api.create,
	    	...others  
	    });
	}else{//有id,注入data,update,remove
		return	<CRUDReader api={api} id={id} ns={ns} update={(data)=>api.update(data,id)} remove={()=>api.destory(id)} {...others}>{children}</CRUDReader>
	}
}
