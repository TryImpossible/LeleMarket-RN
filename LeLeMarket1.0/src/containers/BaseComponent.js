import React, { Component, PureComponent } from 'react';

import { View, Dimensions } from 'react-native';

export default class BaseComponent extends (PureComponent || Component) {

  constructor(props){
    super(props);
  }
}
