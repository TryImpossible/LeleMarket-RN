import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

import BasePage from '../BasePage';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

import PropTypes from 'prop-types';

import KeyboardSpacer from '../../widgets/KeyboardSpacer';

import { AudioRecorder, AudioUtils } from 'react-native-audio';

export default class RichEditorPage extends BasePage {

  constructor(props) {
    super(props);
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  startAudioRecord() {
    let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
    console.log('audioPath', audioPath);
    console.log('AudioRecorder', AudioRecorder);

    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac"
    });

    AudioRecorder.startRecording();
    setTimeout(() => {
      AudioRecorder.stopRecording();
    }, 10000);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <NavBar leftText={'返回'} leftPress={() => this.pop()} title={'webview-bridge-rich-editor'} />
      </View>
    )
  }
}
