import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  ImageRequireSource,
  ImageStyle,
  Image,
  Text,
  TextStyle,
  StyleProp,
} from 'react-native';

const styles = StyleSheet.create({
  textField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: toDP(4),
    borderWidth: Dimens.dividerHeight,
    borderColor: Colors.dividerColor,
  },
  textInput: {
    flex: 1,
    paddingVertical: toDP(12),
    paddingHorizontal: toDP(10),
    fontSize: toSP(Dimens.textNormalSize),
    color: Colors.textNormalColor,
  },
  prefixText: {
    marginLeft: toDP(10),
    fontSize: toSP(Dimens.textNormalSize),
    color: Colors.textNormalColor,
  },
  prefixIcon: {},
  suffixText: {
    marginRight: toDP(10),
    fontSize: toSP(Dimens.textNormalSize),
    color: Colors.textNormalColor,
  },
  suffixIcon: {},
});

export interface TextFieldProps extends TextInputProps {
  inputStyle?: StyleProp<TextStyle>;
  prefix?: React.ReactNode;
  preifxIcon?: ImageRequireSource;
  prefixIconStyle?: StyleProp<ImageStyle>;
  prefixText?: string;
  prefixTextStyle?: StyleProp<TextStyle>;
  suffix?: React.ReactNode;
  suffixIcon?: ImageRequireSource;
  suffixIconStyle?: StyleProp<ImageStyle>;
  suffixText?: string;
  suffixTextStyle?: StyleProp<TextStyle>;
}

const TextField: React.FC<TextFieldProps> = ({
  style,
  inputStyle,
  placeholder,
  placeholderTextColor = Colors.textLightColor,
  prefix,
  preifxIcon,
  prefixIconStyle,
  prefixText,
  prefixTextStyle,
  suffix,
  suffixIcon,
  suffixIconStyle,
  suffixText,
  suffixTextStyle,
  ...restProps
}) => {
  return (
    <View style={[styles.textField, style]}>
      {prefix || (
        <React.Fragment>
          {preifxIcon && <Image source={preifxIcon} style={[styles.prefixIcon, prefixIconStyle]} />}
          {prefixText && <Text style={[styles.prefixText, prefixTextStyle]}>{prefixText}</Text>}
        </React.Fragment>
      )}
      <TextInput
        style={[styles.textInput, inputStyle]}
        {...restProps}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        {...restProps}
      />
      {suffix || (
        <React.Fragment>
          {suffixIcon && <Image source={suffixIcon} style={[styles.suffixIcon, suffixIconStyle]} />}
          {suffixText && <Text style={[styles.suffixText, suffixTextStyle]}>{suffixText}</Text>}
        </React.Fragment>
      )}
    </View>
  );
};

export default TextField;
