/**
 * PromiseFactoryView用于向子view注入promise的结果
 * 只能有一个子view
 * 当promise成功时，向子view注入{then}属性，默认属性名为"value"
 * 向唯一的子view注入promise数据，如果失败默认不显示。
 * 如果有_catch属性，则失败时为子view注入{_catch}属性并显示
 * 通过PubSub向{ns}发送消息可以刷新数据
 * 发送"refresh",以默认参数defaultPromiseParameter生成promise刷新数据
 * 发送其他数据，则发送的数据作为promiseFactory的参数生成promise
 * -> :promise   //产生数据的promise 
 * -> :then      //注入的属性名(成功时)
 * -> :_catch    //注入的属性名(失败时),(如果有_catch)
 * => :ns,"refresh" //刷新数据
 * => :ns,{promiseParameter} //刷新数据
 * ↓  :{then}    //promise成功时的数据 
 * ↓  :{_catch}  //promise失败时的数据 
 */
import React from 'react';
var mc=require('../make-cancelable');

export default class PromiseFactoryView extends React.Component {

  static propTypes = {
    promiseFactory: React.PropTypes.func, //生成promise
    defaultPromiseParameter:React.PropTypes.string, //默认传给promise的参数
    then:React.PropTypes.string,
    _catch:React.PropTypes.string,
    ns:React.PropTypes.string, //名字空间
  };

  static defaultProps = {
    promiseFactory:Promise.resolve,
    defaultPromiseParameter:"refresh",
    then:"value",
    ns:"PromiseViewFactory",
  };

  constructor(props) {
    super(props);
    this.state={};
    this.doPromise=this.doPromise.bind(this);
    this.handleMsg=this.handleMsg.bind(this);
  }

  doPromise(props,parameter){
    const promiseParameter=(parameter===undefined)?props.defaultPromiseParameter:parameter
    this.promise=mc(props.promiseFactory(promiseParameter));//使用cancelable promise以避免数据到来时组件已经unmount
    this.promise.then(value=>this.setState({value}))
      .catch(reason=>{
        !reason.isCanceled&&this.setState({reason}) //如果被cancel可能是组件unmount,不能再setState
    });
  }

  handleMsg(ns,msg){
    this.doPromise(this.props,msg);
  }

  componentDidMount() {
    this.doPromise(this.props);//执行promise
    this.token=PubSub.subscribe(this.props.ns,this.handleMsg);
  }

  componentWillUnmount() {
    this.promise && this.promise.cancel(); //视图消失时取消promise
    PubSub.unsubscribe(this.token);
  }

  componentWillReceiveProps(nextProps) {
    this.doPromise(nextProps);
  }

  render() {
    const {then,_catch,children,...others}=this.props;
    const {value,reason}=this.state;
    const child=React.Children.only(children);//children只能有1个
    if(value!==undefined){
      let v=React.cloneElement(child, {
        [then]: value,  //注入value
        ...others //其余属性传给子view
      });
      return v;
    }
    if(reason!==undefined&&_catch!==undefined){
      let v=React.cloneElement(child, {
        [_catch]: value,  //注入value
        ...others
      });
      return v;
    }
    return null;
  }
}
