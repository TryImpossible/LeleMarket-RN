import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ImageRequireSource,
} from 'react-native';
import IMAGES from 'resources/images';
import NavigationService from 'src/navigators/NavigationService';

interface NavBarProps {
  style?: StyleProp<ViewStyle>;
  dividerVisible?: boolean;

  backContainerStyle?: StyleProp<ViewStyle>;
  backVisible?: boolean;
  back?: React.ReactNode;
  backStyle?: StyleProp<ViewStyle>;
  backIconStyle?: StyleProp<ImageStyle>;
  backIconVisible?: boolean;
  backTitleStyle?: StyleProp<ViewStyle>;
  backIcon?: ImageRequireSource;
  backTitle?: string;
  onBackPress?: () => void;

  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;

  menuContainerStyle?: StyleProp<ViewStyle>;
  menuVisible?: boolean;
  menu?: React.ReactNode;
  menuStyle?: StyleProp<ViewStyle>;
  menuTitleStyle?: StyleProp<TextStyle>;
  menuTitle?: StyleProp<TextStyle>;
  menuIconStyle?: StyleProp<ImageStyle>;
  menuIcon?: ImageRequireSource;
  onMenuPress?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  style,
  dividerVisible = true,

  backContainerStyle,
  backVisible = true,
  back,
  backStyle,
  backIconStyle,
  backIconVisible = true,
  backIcon = IMAGES.ic_nav_back_gray,
  backTitleStyle,
  backTitle = Lang.get('components.navBar.back'),
  onBackPress,

  titleContainerStyle,
  titleStyle,
  title = Lang.get('components.navBar.title'),

  menuContainerStyle,
  menuVisible,
  menu,
  menuStyle,
  menuTitleStyle,
  menuTitle = Lang.get('components.navBar.menu'),
  menuIconStyle,
  menuIcon = IMAGES.ic_nav_menu,
  onMenuPress,
}) => {
  return (
    <View
      style={[
        Styles.NavBar.style,
        style,
        { borderTopColor: Colors.dividerColor, borderTopWidth: dividerVisible ? Dimens.dividerHeight : 0 },
      ]}
    >
      <View style={[Styles.NavBar.backContainerStyle, backContainerStyle]}>
        {backVisible &&
          (back || (
            <TouchableOpacity
              style={[Styles.NavBar.backStyle, backStyle]}
              activeOpacity={Dimens.activeOpacity}
              onPress={() => {
                if (onBackPress) {
                  onBackPress();
                } else {
                  NavigationService.goBack();
                }
              }}
            >
              {backIconVisible && (
                <Image source={backIcon} style={[Styles.NavBar.backIconStyle, backIconStyle]} resizeMode="contain" />
              )}
              {backTitle && <Text style={[Styles.NavBar.backTitleStyle, backTitleStyle]}>{backTitle}</Text>}
            </TouchableOpacity>
          ))}
      </View>
      <View style={[Styles.NavBar.titleContainerStyle, titleContainerStyle]}>
        <Text style={[Styles.NavBar.titleStyle, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={[Styles.NavBar.menuContainerStyle, menuContainerStyle]}>
        {menuVisible &&
          (menu || (
            <TouchableOpacity
              style={[Styles.NavBar.menuStyle, menuStyle]}
              activeOpacity={Dimens.activeOpacity}
              onPress={onMenuPress}
            >
              <Image source={menuIcon} style={[Styles.NavBar.menuIconStyle, menuIconStyle]} resizeMode="contain" />
              {menuTitle && <Text style={[Styles.NavBar.menuTitleStyle, menuTitleStyle]}>{menuTitle}</Text>}
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default React.memo(NavBar);
