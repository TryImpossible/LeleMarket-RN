import React, { useState, useRef, useImperativeHandle } from 'react';
import { ScrollView } from 'react-native';
import Overlay, { OverlayPopViewHandles } from '../Overlay';
import WebImage from '../WebImage';

export interface AlbumViewHandles {
  show: (images: string[], initialIndex: number) => void;
  dismiss: () => void;
}

export interface AlbumViewProps {}

const AlbumView: React.ForwardRefRenderFunction<AlbumViewHandles, AlbumViewProps> = (_props, ref) => {
  const overlayRef = useRef<OverlayPopViewHandles>(null);
  const scrollviewRef = useRef<ScrollView>(null);
  const initialIndexRef = useRef<number>(0);
  const [photos, setPhotos] = useState<string[]>([]);

  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(ref, () => {
    return {
      show: (images: string[], initialIndex: number = 0) => {
        setPhotos(images);
        overlayRef.current?.show();
        initialIndexRef.current = initialIndex;
      },
      dismiss: () => overlayRef.current?.dismiss(),
    };
  });

  return (
    <Overlay.PopView ref={overlayRef} style={{ backgroundColor: Colors.black }} type="zoomIn">
      <ScrollView
        ref={scrollviewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={() => {
          scrollviewRef.current?.scrollTo({ x: initialIndexRef.current * __WIDTH__, y: 0, animated: false });
        }}
        // onTouchEnd={() => overlayRef.current?.dismiss()}
        // onTouchEnd={() => console.warn('onTouchEnd')}
      >
        {photos.map((url, index) => (
          <WebImage key={String(index)} uri={url} style={{ width: __WIDTH__, aspectRatio: 1 }} />
        ))}
      </ScrollView>
    </Overlay.PopView>
  );
};

export default React.forwardRef(AlbumView);
