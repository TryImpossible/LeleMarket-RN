import React from 'react';
import { StyleSheet, View, TextInput, TextInputProps, StyleProp, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  textArea: {
    backgroundColor: '#EDEFF4',
    height: toDP(166),
  },
  textInput: {
    flex: 1,
    color: Colors.textNormalColor,
    fontSize: toSP(Dimens.textNormalSize),
    paddingHorizontal: toDP(12),
    paddingTop: toDP(10),
    paddingBottom: toDP(10),
    textAlignVertical: 'top',
  },
});

export interface TextAreaProps extends TextInputProps {
  inputStyle?: StyleProp<TextStyle>;
}

const TextArea: React.FC<TextAreaProps> = ({
  style,
  inputStyle,
  placeholderTextColor = Colors.hintColor,
  ...restProps
}) => {
  return (
    <View style={[styles.textArea, style]}>
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholderTextColor={placeholderTextColor}
        {...restProps}
        multiline
      />
    </View>
  );
};

export default TextArea;
