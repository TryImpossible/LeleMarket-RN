import React, { useCallback, useEffect } from 'react';
import { StyleSheet, StatusBar, ImageBackground, Image, View, SectionList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Screen, HeadLine, ListRow, Divider, Label } from '@components';
import IMAGES from '@resources/images';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@src/redux/actions';
import { State } from '@src/redux/types';
import { MineIndexState } from '@src/models/mineModel';

const styles = StyleSheet.create({
  mine: {},
  loginLabelBox: {
    position: 'absolute',
    left: toDP(Dimens.marginHorizontalMD),
    bottom: toDP(Dimens.marginVerticalLG),
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: Dimens.dividerHeight,
    height: toDP(60),
    backgroundColor: Colors.dividerColor,
  },
  orderBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: toDP(60),
  },
  listRow: {
    backgroundColor: Colors.white,
    paddingLeft: toDP(Dimens.marginHorizontalMD),
    paddingRight: toDP(8),
    minHeight: toDP(44),
  },
});

const Mine: React.FC<{}> = () => {
  useFocusEffect(
    useCallback(() => {
      __ANDROID__ && StatusBar.setBackgroundColor(Colors.transparent);
    }, []),
  );

  const indexData: MineIndexState = useSelector((state: State) => state.mine.indexData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.mineIndexData());
  }, [dispatch]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <ImageBackground style={{ width: __WIDTH__, height: __WIDTH__ / 1.8 }} source={IMAGES.bg_mine_header}>
        <View style={styles.loginLabelBox}>
          <Image
            style={{ width: toDP(56), height: toDP(56), borderRadius: toDP(28) }}
            source={IMAGES.ic_mine_user_default_header}
            resizeMode="contain"
          />
          <HeadLine level="h4" style={{ marginLeft: toDP(Dimens.marginHorizontalSM), color: Colors.white }}>
            请登录
          </HeadLine>
        </View>
      </ImageBackground>
    );
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <Divider style={{ marginLeft: toDP(Dimens.marginHorizontalMD) }} />;
  }, []);
  return (
    <Screen style={styles.mine}>
      <SectionList
        sections={indexData}
        keyExtractor={(_item, index) => String(index)}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item, section: { title } }) => {
          if (title === 'orders') {
            return (
              <View style={{ flexDirection: 'row', backgroundColor: Colors.white }}>
                {item.map(({ icon, text }, index) => {
                  return (
                    <React.Fragment key={String(index)}>
                      {index === item.length - 1 && <View style={styles.line} />}
                      <TouchableOpacity style={styles.orderBtn} activeOpacity={Dimens.activeOpacity}>
                        <Image style={{ width: toDP(20), height: toDP(20) }} source={icon} resizeMode="contain" />
                        <Label style={{ marginTop: toDP(Dimens.marginVerticalSM) }}>{text}</Label>
                      </TouchableOpacity>
                    </React.Fragment>
                  );
                })}
              </View>
            );
          } else {
            const { icon, text } = item;
            return (
              <ListRow
                style={styles.listRow}
                image={icon}
                imageStyle={{ width: toDP(22), height: toDP(22) }}
                text={text}
                textStyle={{ marginLeft: toDP(Dimens.marginVerticalSM), color: Colors.textNormalColor }}
                icon={IMAGES.ic_right_arrow}
                iconStyle={{ width: toDP(9), height: toDP(9), tintColor: Colors.textNormalColor }}
                disabled={false}
                onPress={() => {}}
              />
            );
          }
        }}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderSectionFooter={({ section: { title } }) => {
          if (title === 'more') {
            return null;
          }
          return <View style={{ height: toDP(Dimens.marginVerticalMD) }} />;
        }}
      />
    </Screen>
  );
};

export default Mine;
