import React from 'react';
import ReactDOM from 'react-dom';
var PubSub=require('pubsub-js');
var Mock = require('mockjs');
     
import CRUDReader from '../../../src/CRUDReader';
const getValue=(v)=>Promise.resolve("id:"+v+"/"+Math.random());
const api={get:getValue};
const ValueShower=({value})=><div>{JSON.stringify(value)}</div>;
const RandomValue=<CRUDReader api={api} id="42" ns="RandomValue">
						<ValueShower/>
					</CRUDReader> 
//PubSub.publish("RandomValue") 刷新


Mock.mock("/mockemail/", '@EMAIL') //假数据

import RestReader from '../../../src/RestReader';
const EmailReader=<RestReader url="/mockemail"  ns="EmailReader">
					<ValueShower/> 
				  </RestReader> 
//PubSub.publish("EmailReader") 刷新


ReactDOM.render(<ul>
	<li><button onClick={()=>PubSub.publish("RandomValue")}>PubSub.publish("RandomValue")</button></li>
	<li>{RandomValue}</li>
	<li><button onClick={()=>PubSub.publish("EmailReader")}>PubSub.publish("EmailReader")</button></li>
	<li>{EmailReader}</li>
	<li></li>	
</ul> ,
  document.getElementById('root')
);

