import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import ServerApi from '@services/http';
import IMAGES from '@resources/images';
import axios from 'axios';

const styles = StyleSheet.create({
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
});

export type StatusType = 'loading' | 'loading_finish' | 'uploading' | 'uploading_success' | 'uploading_fail';

export interface PhotoBoxProps {
  uri?: string;
  name?: string;
  url?: string;
  status?: StatusType;
  onCancelUploadCreate?: (cancel: Function) => void;
  onCancelUploadDestroy?: () => void;
  onUploadSuccess?: (url: string) => void;
  onStatusChange?: (status: StatusType) => void;
  onDelPress?: () => void;
}

const PhotoBox: React.FC<PhotoBoxProps> = ({
  uri,
  name,
  url,
  status,
  onCancelUploadCreate,
  onCancelUploadDestroy,
  onUploadSuccess,
  onStatusChange,
  onDelPress,
}) => {
  const [state, setState] = useState<StatusType>(status);
  const cancelRef = useRef(null);

  const _upload = useCallback(async () => {
    setState('uploading');

    try {
      const res = await ServerApi.uploadImage(uri, name, {
        cancelToken: new axios.CancelToken((cancel) => {
          cancelRef.current = cancel;
          onCancelUploadCreate && onCancelUploadCreate(cancel);
        }),
      });
      onUploadSuccess && onUploadSuccess(res.data);
      setState('uploading_success');
    } catch (error) {
      setState('uploading_fail');
    } finally {
      cancelRef.current = null;
      onCancelUploadDestroy && onCancelUploadDestroy();
    }
  }, [name, onCancelUploadCreate, onCancelUploadDestroy, onUploadSuccess, uri]);

  useEffect(() => {
    _upload();
  }, [_upload]);

  useEffect(() => {
    return () => {
      cancelRef.current && cancelRef.current();
      cancelRef.current = null;
    };
  }, []);

  useEffect(() => {
    onStatusChange && onStatusChange(state);
  }, [onStatusChange, state]);

  // 重试
  const _onRetryPress = useCallback(() => {
    _upload();
  }, [_upload]);
  // 删除
  const _onDelPress = useCallback(() => {
    cancelRef.current && cancelRef.current();
    cancelRef.current = null;
    onCancelUploadDestroy && onCancelUploadDestroy();
    onDelPress && onDelPress();
  }, [onCancelUploadDestroy, onDelPress]);

  return (
    <View style={styles.photoBox}>
      <Image
        style={styles.photo}
        source={{ uri: uri || url }}
        onLoad={() => {
          if (state === 'loading') {
            setState('loading_finish');
          }
        }}
      />
      {['loading', 'uploading'].includes(state) && (
        <View style={styles.mask}>
          <ActivityIndicator size="small" color={Colors.accentColor} />
        </View>
      )}
      {state === 'uploading_fail' && (
        <TouchableOpacity style={styles.mask} activeOpacity={0.7} onPress={_onRetryPress}>
          <Text style={styles.retryText}>重试</Text>
        </TouchableOpacity>
      )}
      {['loading_finish', 'uploading_success', 'uploading_fail'].includes(state) && (
        <TouchableOpacity style={styles.del} activeOpacity={0.7} onPress={_onDelPress}>
          <Image
            style={{ width: toDP(10), height: toDP(10), tintColor: Colors.white }}
            source={{ uri: IMAGES.ic_del }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

function isEqual(prevProps: PhotoBoxProps, nextProps: PhotoBoxProps) {
  return (
    prevProps.uri === nextProps.uri &&
    prevProps.name === nextProps.name &&
    prevProps.url === nextProps.url &&
    prevProps.status === nextProps.status
  );
}

export default React.memo(PhotoBox, isEqual);
