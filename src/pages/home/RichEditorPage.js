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

import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';

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
        <RichTextEditor
          ref={(r) => this.richtext = r}
          customCSS={`
          body{ 
            padding: 10px;
          }
          #zss_editor_content {
            padding-left: 0px;
            padding-right: 0px;
          }
          #zss_editor_title{ 
            padding-left: 0px;
            padding-right: 0px;
          } `}
          enableOnChange={true}
          hiddenTitle={false}
          initialTitleHTML={'Title!!'}
          initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
          editorInitializedCallback={() => this.onEditorInitialized()}
        />
        <RichTextToolbar
          getEditor={() => this.richtext}
          onPressAddImage={() => {
            this.startAudioRecord();
          }}
        />
        <KeyboardSpacer />
      </View>
    )
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
    // this.richtext.prepareInsert();
    // this.richtext.blurTitleEditor();
    // this.richtext.focusContent();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    //alert(titleHtml + ' ' + contentHtml)
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }
}
