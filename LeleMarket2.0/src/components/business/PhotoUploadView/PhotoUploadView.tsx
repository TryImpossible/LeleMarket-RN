import React, { useState, useEffect, useCallback, useImperativeHandle } from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  LayoutAnimation,
  LayoutAnimationConfig,
  UIManager,
} from 'react-native';
import Chat from 'chat-app-kit/src/Chat';

import PhotoBox, { StatusType } from './PhotoBox';
import AddBox from './AddBox';

const styles = StyleSheet.create({
  uploadView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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

interface PhotoProps {
  uri?: string;
  name?: string;
  url?: string;
  status?: StatusType;
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

const PhotoUploadView = React.forwardRef<PhotoUploadViewHandle, PhotoUploadViewProps>(
  ({ style, data, maxAddCount }, ref) => {
    const [photos, setPhotos] = useState<PhotoProps[]>(() =>
      data.filter((item) => typeof item === 'string').map((item) => ({ url: item, status: 'loading' })),
    );
    useEffect(() => {
      if (data.length > 0) {
        __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
        setPhotos(data.filter((item) => typeof item === 'string').map((item) => ({ url: item, status: 'loading' })));
      }
    }, [data]);

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
          if (maxAddCount > 0 && maxAddCount - photos.length > 0) {
            result = result.slice(0, maxAddCount - photos.length);
          }

          let newPhotos: PhotoProps[] = Object.assign([], photos);
          result.forEach((uri) => {
            newPhotos.push({ uri, name: uri.substr(uri.lastIndexOf('/') + 1), status: 'uploading' });
          });
          __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
          setPhotos(newPhotos);
        })
        .catch(() => {});
    }, [maxAddCount, photos]);

    // 删除
    const onDelPress = useCallback(
      (index) => {
        const newPhotos: PhotoProps[] = Object.assign([], photos);
        newPhotos.splice(index, 1);
        __IOS__ && LayoutAnimation.configureNext(DefaultAnimation);
        setPhotos(newPhotos);
      },
      [photos],
    );

    return (
      <View
        style={[styles.uploadView, style]}
        // onLayout={({
        //   nativeEvent: {
        //     layout: { width },
        //   },
        // }) => {
        //   console.warn(width);
        // }}
      >
        {photos.map((item, index) => {
          return (
            <PhotoBox
              key={String(index)}
              {...item}
              onCancelUploadCreate={(cancel) => {
                Object.assign(photos[index], { cancel });
              }}
              onCancelUploadDestroy={() => {
                Object.assign(photos[index], { cancel: null });
              }}
              onUploadSuccess={(url) => {
                Object.assign(photos[index], { url });
              }}
              onStatusChange={(status) => {
                Object.assign(photos[index], { status });
              }}
              onDelPress={() => onDelPress(index)}
            />
          );
        })}
        {(maxAddCount === -1 || (maxAddCount > 0 && photos.length < maxAddCount)) && <AddBox onPress={onAddPress} />}
      </View>
    );
  },
);

PhotoUploadView.defaultProps = {
  data: [],
  maxAddCount: -1,
};

export default PhotoUploadView;
