import React from 'react';
import ReactDOM from 'react-dom';
var PubSub=require('pubsub-js');
var Mock = require('mockjs');
     
import CRUDReader from '../../../src/CRUDReader';
const getValue=(v)=>Promise.resolve("id:"+v+"/"+Math.random());
const api={get:getValue};
const DataShower=({data})=><div>{JSON.stringify(data)}</div>;
const RandomValue=<CRUDReader api={api} id="42" ns="RandomValue">
						<DataShower/>
					</CRUDReader> 
//PubSub.publish("RandomValue") 刷新


Mock.mock("/mockemail/", '@EMAIL') //假数据
import RestReader from '../../../src/RestReader';
const EmailReader=<RestReader url="/mockemail"  ns="EmailReader">
					<DataShower/> 
				  </RestReader> 
//PubSub.publish("EmailReader") 刷新


/**
 * api.create(obj)   => 创建 object
 * api.get(id)       => 读取 object
 * api.get()         => 读取 所有object
 * api.update(obj,id)=> 更新 object
 * api.destroy(id)   => 删除 object
 */
const api2={
	get:(id)=>Promise.resolve(id),
	create:(obj)=>{console.log("create",obj);return Promise.resolve(obj)},
	update:(obj,id)=>{console.log("update",obj,id);return Promise.resolve(obj)},
	destory:(id)=>{console.log("destroy",id);return Promise.resolve(id)},
};
import CRUDWriter from '../../../src/CRUDWriter';
const Creater=({save})=><div><button onClick={()=>save("creater")}>save("creater")</button></div>
const Updater=({data,update,remove})=><div>{data}
			<button onClick={()=>update("update")}>update("update")</button>
			<button onClick={()=>remove()}>remove()</button>
	</div>
const WriterWithID=<CRUDWriter api={api2} id="20"><Updater/></CRUDWriter>
const WriterWithoutID=<CRUDWriter api={api2} ><Creater/></CRUDWriter> 


ReactDOM.render(<ul>
	<li><button onClick={()=>PubSub.publish("RandomValue")}>PubSub.publish("RandomValue")</button></li>
	<li>{RandomValue}</li>
	<li><button onClick={()=>PubSub.publish("EmailReader")}>PubSub.publish("EmailReader")</button></li>
	<li>{EmailReader}</li>
	<li>TestWriter</li>
	<li>{WriterWithID}</li>
	<li>{WriterWithoutID}</li>
	<li></li>	
</ul> ,
  document.getElementById('root')
);

