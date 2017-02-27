import React from 'react';
import ReactDOM from 'react-dom';
import CRUDReader from '../../../src/CRUDReader';
var PubSub=require('pubsub-js');

     
const getValue=(v)=>Promise.resolve("id:"+v+"/"+Math.random());
const api={get:getValue};
const ValueShower=({value})=><div>{value}</div>;
const RandomValue=<CRUDReader api={api} id="42" ns="RandomValue"> <ValueShower/> </CRUDReader> 
//PubSub.publish("RandomValue") 刷新

ReactDOM.render(RandomValue ,
  document.getElementById('root')
);

