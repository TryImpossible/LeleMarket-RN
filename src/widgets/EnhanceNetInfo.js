
import React from 'react';

import { NetInfo } from "react-native";

import BaseComponent from "../containers/BaseComponent";

export default WrappedComponent => class EnhanceNetInfo extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  }

  render() {
    return <WrappedComponent {...this.props} {...this.state} />
  }
}