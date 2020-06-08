'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

interface SceneProps {
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  getRef?: (ref: any) => void;
  placeholder?: React.ReactNode;
}

interface SceneState {
  visible?: boolean;
}

class Scene extends Component<SceneProps, SceneState> {
  static defaultProps = {
    visible: false,
    placeholder: null,
  };

  constructor(props: SceneProps) {
    super(props);
    const { visible, getRef } = props;
    this.state = {
      visible,
    };
    getRef && getRef(this);
  }

  onVisibilityLoad() {
    const { visible } = this.state;
    !visible &&
      this.setState({
        visible: true,
      });
  }

  render() {
    const { style, children, placeholder } = this.props;
    const { visible } = this.state;
    return <View style={[styles.scene, StyleSheet.flatten(style)]}>{visible ? children : placeholder}</View>;
  }
}

export default Scene;
