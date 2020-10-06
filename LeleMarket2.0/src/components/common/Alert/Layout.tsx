import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import Button from '../Button';
import HeadLine from '../HeadLine';
import Divider from '../Divider';
import Label from '../Label';
import IMAGES from '@resources/images';

const styles = StyleSheet.create({
  alert: {
    alignSelf: 'stretch',
    backgroundColor: Colors.white,
    borderRadius: toDP(Dimens.borderRadiusXL),
    marginHorizontal: toDP(Dimens.marginHorizontalXL),
    overflow: 'hidden',
  },
  title: {
    marginVertical: toDP(Dimens.marginVerticalLG),
  },
  closeBox: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: toDP(8),
    width: toDP(30),
    height: toDP(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: toDP(14),
    height: toDP(14),
  },
  contentBox: {
    marginHorizontal: toDP(20),
    minHeight: toDP(110),
    justifyContent: 'center',
  },
  content: {
    alignSelf: 'center',
    fontSize: toSP(16),
    color: Colors.textNormalColor,
  },
  btnBox: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginHorizontal: toDP(24),
    marginBottom: toDP(24),
  },
});

export interface LayoutProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  onClosePress?: () => void;
  confirmText?: string;
  confirmTextStyle?: StyleProp<TextStyle>;
  onConfirmPress?: () => void;
  cancelText?: string;
  cancelTextStyle?: StyleProp<TextStyle>;
  onCancelPress?: () => void;
}

export interface HeaderLayoutProps extends LayoutProps {
  headerImage?: ImageSourcePropType;
  headerImageStyle?: StyleProp<ImageStyle>;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
}

/**
 * 头部自定义
 * @param param0
 */
const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  style,
  children,
  headerImage = { uri: 'IMAGES.bg_dialog_header' },
  headerImageStyle,
  title,
  titleStyle,
  icon,
  iconStyle,
  onClosePress,
  confirmText,
  confirmTextStyle,
  onConfirmPress,
  cancelText,
  cancelTextStyle,
  onCancelPress,
}) => {
  return (
    <View style={[styles.alert, style]}>
      <ImageBackground
        style={[{ alignSelf: 'stretch', height: toDP(120), alignItems: 'center' }, headerImageStyle]}
        source={headerImage}
      >
        <View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
          <HeadLine style={[styles.title, { color: Colors.white }, titleStyle]} level="h3">
            {title}
          </HeadLine>
          <Button
            style={styles.closeBox}
            icon={{ uri: IMAGES.ic_del }}
            iconStyle={styles.closeIcon}
            onPress={onClosePress}
          />
        </View>
        {icon && <Image source={icon} style={[{ width: toDP(45), height: toDP(45) }, iconStyle]} />}
      </ImageBackground>
      {children}
      {(cancelText || confirmText) && (
        <View style={styles.btnBox}>
          {cancelText && (
            <Button
              type="primary"
              style={{ flex: 1, marginRight: toDP(14), backgroundColor: Colors.disabledColor }}
              title={cancelText}
              titleStyle={[{ color: Colors.white, fontSize: toSP(Dimens.textTitleSize) }, cancelTextStyle]}
              onPress={onCancelPress}
            />
          )}
          {confirmText && (
            <Button
              type="primary"
              style={{ flex: 1 }}
              title={confirmText}
              titleStyle={[{ fontSize: toSP(Dimens.textTitleSize) }, confirmTextStyle]}
              onPress={onConfirmPress}
            />
          )}
        </View>
      )}
    </View>
  );
};

HeaderLayout.defaultProps = {
  title: '提示',
  icon: { uri: 'IMAGES.ic_service_charge_details' },
};

/**
 * 内容自定义
 * @param param0
 */
export interface BodyLayoutProps extends LayoutProps {
  contentStyle?: StyleProp<ViewStyle>;
}

const BodyLayout: React.FC<BodyLayoutProps> = ({
  children,
  style,
  title,
  titleStyle,
  onClosePress,
  contentStyle,
  confirmText,
  confirmTextStyle,
  onConfirmPress,
  cancelText,
  cancelTextStyle,
  onCancelPress,
}) => {
  return (
    <View style={[styles.alert, style]}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <HeadLine style={[styles.title, titleStyle]} level="h3">
          {title}
        </HeadLine>
        <Button
          style={styles.closeBox}
          icon={{ uri: IMAGES.ic_del }}
          iconStyle={styles.closeIcon}
          onPress={onClosePress}
        />
      </View>
      <Divider />
      <View style={[styles.contentBox, contentStyle]}>{children}</View>
      <View style={styles.btnBox}>
        {cancelText && (
          <Button
            type="primary"
            style={{ flex: 1, marginRight: toDP(14), backgroundColor: Colors.disabledColor }}
            title={cancelText}
            titleStyle={[{ color: Colors.white, fontSize: toSP(Dimens.textTitleSize) }, cancelTextStyle]}
            onPress={onCancelPress}
          />
        )}
        {confirmText && (
          <Button
            type="primary"
            style={{ flex: 1 }}
            title={confirmText}
            titleStyle={[{ fontSize: toSP(Dimens.textTitleSize) }, confirmTextStyle]}
            onPress={onConfirmPress}
          />
        )}
      </View>
    </View>
  );
};

BodyLayout.defaultProps = {
  title: '提示',
  confirmText: '是',
};

export interface NormalLayoutProps extends BodyLayoutProps {
  content?: string | React.ReactNode;
}

const NormalLayout: React.FC<NormalLayoutProps> = ({ content, ...restProps }) => {
  return (
    <BodyLayout {...restProps}>
      {typeof content === 'string' ? <Label style={styles.content}>{content}</Label> : content}
    </BodyLayout>
  );
};

NormalLayout.defaultProps = {
  title: '提示',
  content: '内容',
  confirmText: '是',
  cancelText: '否',
};

export default {
  Header: HeaderLayout,
  Body: BodyLayout,
  Normal: NormalLayout,
};
