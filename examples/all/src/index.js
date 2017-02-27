import React from 'react';
import ReactDOM from 'react-dom';
var PubSub=require('pubsub-js');
var Mock = require('mockjs');
     
import CRUDReader from '../../../src/CRUDReader';
const getValue=(v)=>Promise.resolve("id:"+v+"/"+Math.random());
const api={get:getValue};
const ValueShower=({value})=><div>{JSON.stringify(value)}</div>;
const RandomValue=<CRUDReader api={api} id="42" ns="RandomValue"> <ValueShower/> </CRUDReader> 
//PubSub.publish("RandomValue") 刷新


Mock.mock("/mockemail", {
    'list|1-10': [{
        'id|+1': 1,
        'email': '@EMAIL'
    }]
})

import RestReader from '../../../src/RestReader';
const EmailReader=<RestReader url="/mockemail"  ns="EmailReader"> <ValueShower/> </RestReader> 


// ReactDOM.render(<ul>
// 	<li>{RandomValue}</li>
// 	<li>{EmailReader}</li>
// 	<li></li>	
// </ul> ,
//   document.getElementById('root')
// );

 ReactDOM.render(RandomValue ,
  document.getElementById('root')
);