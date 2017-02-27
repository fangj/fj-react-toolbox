/**
 * PromiseView用于向子view注入promise的结果
 * 只能有一个子view
 * 当promise成功时，向子view注入{then}属性，默认属性名为"value"
 * 向唯一的子view注入promise数据，如果失败默认不显示。
 * 如果有_catch属性，则失败时为子view注入{_catch}属性并显示
 * -> :promise   //产生数据的promise 
 * -> :then      //注入的属性名(成功时)
 * -> :_catch    //注入的属性名(失败时),(如果有_catch)
 * ↓  :{then}    //promise成功时的数据 
 * ↓  :{_catch}  //promise失败时的数据 
 */
import React from 'react';
var mc=require('../make-cancelable');

export default class PromiseView extends React.Component {

  static propTypes = {
    promise: React.PropTypes.instanceOf(Promise), //promise
    then:React.PropTypes.string,
    _catch:React.PropTypes.string
  };

  static defaultProps = {
    promise:Promise.resolve(),
    then:"value"
  };

  constructor(props) {
    super(props);
    this.state={};
    this.doPromise=this.doPromise.bind(this);
  }

  doPromise(props){
    this.promise=mc(props.promise);//使用cancelable promise以避免数据到来时组件已经unmount
    this.promise.then(value=>this.setState({value}))
      .catch(reason=>{
        !reason.isCanceled&&this.setState({reason}) //如果被cancel可能是组件unmount,不能再setState
    });
  }

  componentDidMount() {
    this.doPromise(this.props);//执行promise
  }

  componentWillUnmount() {
    this.promise && this.promise.cancel(); //视图消失时取消promise
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.promise!=nextProps.promise){
      this.doPromise(nextProps);
    }
  }

  render() {
    const {then,_catch,children}=this.props;
    const {value,reason}=this.state;
    const child=React.Children.only(children);//children只能有1个
    if(value!==undefined){
      let v=React.cloneElement(child, {
        [then]: value  //注入value
      });
      return v;
    }
    if(reason!==undefined&&_catch!==undefined){
      let v=React.cloneElement(child, {
        [_catch]: value  //注入value
      });
      return v;
    }
    return null;
  }
}
