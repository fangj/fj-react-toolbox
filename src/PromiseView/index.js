import React from 'react';
var mc=require('../make-cancelable');

export default class PromiseView extends React.Component {

  static propTypes = {
    promise: React.PropTypes.instanceOf(Promise), //promise
    then:React.PropTypes.string,
    _catch:React.PropTypes.string
  };

  static defaultProps = {
    promise:Promise.resolve,
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
      doPromise(nextProps);
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
