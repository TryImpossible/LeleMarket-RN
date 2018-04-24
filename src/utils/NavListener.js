
import React from "react";

import BaseComponent from "../containers/BaseComponent";

// export default NavListener = (willFocus) => WrappedComponent => class  extends BaseComponent {
// export default(willFocus) => WrappedComponent => class NavListener extends BaseComponent {
export default (WrappedComponent) => class NavListener extends BaseComponent {
    constructor(props) {
        super(props);
        this.initSubscriptions();
    }

    render() {
      return <WrappedComponent { ...this.props } { ...this.state} />
    }

    componentWillUnmount() {
      this.willFocusSubscription && this.willFocusSubscription.remove();
      this.didFocusSubscription && this.didFocusSubscription.remove();
      this.willBlurSubscription && this.willBlurSubscription.remove();
      this.didBlurSubscription && this.didBlurSubscription.remove();
    }
  
    initSubscriptions() {
      const { navigation } = this.props;
      this.willFocusSubscription = navigation.addListener( 'willFocus', payload => this.willFocus(payload));
      this.didFocusSubscription = navigation.addListener( 'didFocus', payload => this.didFocus(payload));
      this.willBlurSubscription = navigation.addListener( 'willBlur', payload => this.willBlur(payload));
      this.didBlurSubscription = navigation.addListener( 'didBlur', payload => this.didBlur(payload));
    }
  
    willFocus(payload) {
      this.__proto__.willFocus && this.__proto__.willFocus();
    }
  
    didFocus(payload) {
  
    }
  
    willBlur(payload) {
  
    }
  
    didBlur(payload) {
      
    }
}

export const Enhancer = Target => class Enhancer extends Target {
  constructor(props){
      super(props);//es6 继承父类的this对象，并对其修改，所以this上的属性也被继承过来，可以访问，如state
      this.initSubscriptions();
  }

  componentWillMount(){
    super.componentWilMount && super.componentWilMount();// 如果父类没有定义该方法，直接调用会出错
    this.willFocusSubscription && this.willFocusSubscription.remove();
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
    this.didBlurSubscription && this.didBlurSubscription.remove();
  }

  initSubscriptions() {
    const { navigation } = this.props;
    this.willFocusSubscription = navigation.addListener( 'willFocus', payload =>  this.willFocus(payload));
    this.didFocusSubscription = navigation.addListener( 'didFocus', payload => this.didFocus(payload));
    this.willBlurSubscription = navigation.addListener( 'willBlur', payload => this.willBlur(payload));
    this.didBlurSubscription = navigation.addListener( 'didBlur', payload => this.didBlur(payload));
  }

  willFocus(payload) {
    
  }

  didFocus(payload) {

  }

  willBlur(payload) {

  }

  didBlur(payload) {
    
  }

  render(){
      let ele = super.render();//调用父类的render方法
      return ele;//可以在这之前完成渲染劫持
  }
}
