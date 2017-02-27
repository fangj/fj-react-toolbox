/**
RestReader
-> :url  //restfyk url
-> :id  //item id
↓  :data //注入的数据
**/


import CRUDReader from '../CRUDReader';
import restApiFactory from'../utils/rest_api_factory';

module.exports =({url,children,...props})=> <CRUDReader api={restApiFactory(url)}  {...props}>
												{children}
											</CRUDReader>