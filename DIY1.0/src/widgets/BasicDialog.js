
import React from 'react';

import { View, Animated, Easing, StyleSheet } from "react-native";

import BaseComponent from "../containers/BaseComponent";

export default WrappedComponent => class BasicDialog extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <Animated.View>
        <WrappedComponent {...this.props} {...this.state} />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  
});