/**
-> :api  //crud api
-> :id  //item id
↓  :data //注入的数据
**/


import PromiseFactoryView from '../PromiseFactoryView';

module.exports =({api,id,ns="CRUDReader",children})=>
	<PromiseFactoryView promiseFactory={()=>api.get(id)} then="value" ns={ns}>
		{children}
	</PromiseFactoryView>
