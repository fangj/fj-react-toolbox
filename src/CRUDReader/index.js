/**
-> :api  //crud api
↓  :data //注入的数据
**/


import PromiseFactoryView from '../PromiseFactoryView';

const CRUDReader=({api,id,ns="CRUDReader",children})=>
	<PromiseFactoryView promiseFactory={()=>api.get(id)} then="value" ns={ns}>
		{children}
	</PromiseFactoryView>


module.exports = CRUDReader;