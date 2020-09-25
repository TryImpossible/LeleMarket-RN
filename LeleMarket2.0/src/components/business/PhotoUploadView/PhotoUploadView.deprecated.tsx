import React, { useState, useEffect, useCallback, useRef, useImperativeHandle } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  Image,
  ActivityIndicator,
  Text,
  LayoutAnimation,
  LayoutAnimationConfig,
  UIManager,
} from 'react-native';
import Chat from 'chat-app-kit/src/Chat';
import ServerApi from '@services/http';
import IMAGES from '@resources/images';
import axios from 'axios';

const styles = StyleSheet.create({
  fileUploadView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoBox: {
    width: toDP(56),
    height: toDP(56),
    marginRight: toDP(10),
    marginBottom: toDP(10),
  },
  photo: {
    // flex: 1,
    // aspectRatio: 1,
    width: toDP(56),
    height: toDP(56),
    backgroundColor: Colors.screenBackgroundColor,
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    color: Colors.accentColor,
    fontSize: toDP(Dimens.textNormalSize),
  },
  del: {
    position: 'absolute',
    right: toDP(-7),
    top: toDP(-7),
    width: toDP(18),
    height: toDP(18),
    borderRadius: toDP(9),
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnBox: {
    width: toDP(56),
    height: toDP(56),
    borderColor: '#A7B0B9',
    borderWidth: Dimens.dividerHeight,
    borderRadius: toDP(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnLine: {
    position: 'absolute',
    width: toDP(22),
    height: toDP(2),
    borderRadius: toDP(2),
    backgroundColor: '#A7B0B9',
  },
});

if (__ANDROID__ && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DefaultAnimation: LayoutAnimationConfig = {
  duration: 300,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
  delete: {
    duration: 300,
    type: LayoutAnimation.Types.easeOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

// 添加按钮
const AddButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity style={styles.addBtnBox} activeOpacity={Dimens.activeOpacity} onPress={onPress}>
      <View style={[styles.addBtnLine]} />
      <View style={[styles.addBtnLine, { transform: [{ rotate: '90deg' }] }]} />
    </TouchableOpacity>
  );
};

interface PhotoProps {
  uri?: string;
  name?: string;
  url?: string;
  status?: 'loading' | 'loading_finish' | 'uploading' | 'uploading_success' | 'uploading_fail';
  cancel?: () => void;
}

export interface PhotoUploadViewHandle {
  getAll: () => string[];
  getData: () => string[];
  checkFinish: () => boolean;
}

export interface PhotoUploadViewProps {
  style?: StyleProp<ViewStyle>;
  data?: string[];
  maxAddCount?: number; // -1代表不限制
}

/**
 * Deprecated
 * @param param0
 * @param ref
 */
const PhotoUploadView: React.ForwardRefRenderFunction<PhotoUploadViewHandle, PhotoUploadViewProps> = (
  { style, data = [], maxAddCount = -1 },
  ref,
) => {
  const [photos, setPhotos] = useState<PhotoProps[]>(() =>
    data.filter((item) => typeof item === 'string').map((item) => ({ url: item, status: 'loading' })),
  );
  useEffect(() => {
    if (data.length > 0) {
      __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
      setPhotos(data.filter((item) => typeof item === 'string').map((item) => ({ url: item, status: 'loading' })));
    }
  }, [data]);

  let timer = useRef<number>();

  const getAll = useCallback(() => {
    return photos.map(({ url }) => url);
  }, [photos]);

  const getData = useCallback(() => {
    return photos
      .filter(({ status, cancel }) => {
        if (['loading', 'loading_finish', 'uploading_success'].includes(status)) {
          return true;
        } else {
          cancel && cancel();
          return false;
        }
      })
      .map(({ url }) => url);
  }, [photos]);

  const checkFinish = useCallback(() => {
    return (
      photos.filter(({ status }) => ['loading', 'loading_finish', 'uploading_success'].includes(status)).length ===
      photos.length
    );
  }, [photos]);

  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(ref, () => ({ getAll, getData, checkFinish }), [checkFinish, getAll, getData]);

  // 选择并上传
  const onAddPress = useCallback(() => {
    Chat.requestPhoto(3, 2, 0)
      .then(async (result = []) => {
        let newPhotos: PhotoProps[] = Object.assign([], photos);

        if (maxAddCount > 0 && maxAddCount - photos.length > 0) {
          result = result.slice(0, maxAddCount - photos.length);
        }
        result.forEach((uri) => {
          newPhotos.push({ uri, name: uri.substr(uri.lastIndexOf('/') + 1), status: 'uploading' });
        });
        __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
        setPhotos(newPhotos);

        // 延迟，显示loading
        timer.current && clearInterval(timer.current);
        timer.current = setTimeout(() => {
          newPhotos.forEach(async ({ uri, name }, index) => {
            try {
              const res = await ServerApi.uploadImage(uri, name, {
                cancelToken: new axios.CancelToken((cancel) => {
                  Object.assign(newPhotos[index], { cancel });
                }),
              });
              newPhotos = Object.assign([], newPhotos);
              Object.assign(newPhotos[index], { url: res.data, status: 'uploading_success' });
            } catch (error) {
              newPhotos = Object.assign([], newPhotos);
              Object.assign(newPhotos[index], { status: 'uploading_fail' });
            } finally {
              newPhotos[index].cancel && delete newPhotos[index].cancel;
              newPhotos = Object.assign([], newPhotos);
              __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
              setPhotos(newPhotos);
            }
          });
        }, 200);
      })
      .catch(() => {});
  }, [maxAddCount, photos]);

  // 重试
  const onRetryPress = useCallback(
    async (index) => {
      let newPhotos: PhotoProps[] = Object.assign([], photos);
      Object.assign(newPhotos[index], { status: 'uploading' });
      __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
      setPhotos(newPhotos);

      const { uri, name } = newPhotos[index];
      try {
        await ServerApi.uploadImage(uri, name, {
          cancelToken: new axios.CancelToken((cancel) => {
            Object.assign(newPhotos[index], { cancel });
          }),
        });
        newPhotos = Object.assign([], newPhotos);
        Object.assign(newPhotos[index], { status: 'uploading_success' });
      } catch (error) {
        newPhotos = Object.assign([], newPhotos);
        Object.assign(newPhotos[index], { status: 'uploading_fail' });
      } finally {
        newPhotos[index].cancel && delete newPhotos[index].cancel;
        newPhotos = Object.assign([], newPhotos);
        __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
        setPhotos(photos);
      }
    },
    [photos],
  );

  // 删除
  const onDelPress = useCallback(
    (index) => {
      const newPhotos: PhotoProps[] = Object.assign([], photos);
      const { cancel } = newPhotos[index];
      cancel && cancel();
      newPhotos.splice(index, 1);
      __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
      setPhotos(newPhotos);
    },
    [photos],
  );

  return (
    <View
      style={[styles.fileUploadView, style]}
      // onLayout={({
      //   nativeEvent: {
      //     layout: { width },
      //   },
      // }) => {
      //   console.warn(width);
      // }}
    >
      {photos.map(({ uri, url, status }, index) => {
        return (
          <View key={String(index)} style={styles.photoBox}>
            <Image
              style={styles.photo}
              source={{ uri: uri || url }}
              onLoad={() => {
                if (status === 'loading') {
                  const newPhotos: PhotoProps[] = Object.assign([], photos);
                  Object.assign(newPhotos[index], { status: 'loading_finish' });
                  __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
                  setPhotos(newPhotos);
                }
              }}
            />
            {['loading', 'uploading'].includes(status) && (
              <View style={styles.mask}>
                <ActivityIndicator size="small" color={Colors.accentColor} />
              </View>
            )}
            {status === 'uploading_fail' && (
              <TouchableOpacity style={styles.mask} activeOpacity={0.7} onPress={() => onRetryPress(index)}>
                <Text style={styles.retryText}>重试</Text>
              </TouchableOpacity>
            )}
            {['loading_finish', 'uploading_success', 'uploading_fail'].includes(status) && (
              <TouchableOpacity style={styles.del} activeOpacity={0.7} onPress={() => onDelPress(index)}>
                <Image
                  style={{ width: toDP(10), height: toDP(10), tintColor: Colors.white }}
                  source={{ uri: IMAGES.ic_del }}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      })}
      {(maxAddCount === -1 || (maxAddCount > 0 && photos.length < maxAddCount)) && <AddButton onPress={onAddPress} />}
    </View>
  );
};

export default React.forwardRef(PhotoUploadView);
