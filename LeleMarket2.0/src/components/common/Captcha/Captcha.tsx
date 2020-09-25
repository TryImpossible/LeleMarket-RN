import React, { useState, useEffect, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Button from '../Button';

export interface CaptchaProps {
  style?: StyleProp<ViewStyle>;
  countDown?: number;
  text?: string;
  secondText?: string;
  enabled?: boolean;
  onGetCaptcha: () => Promise<boolean>;
}

const Captcha: React.FC<CaptchaProps> = ({
  style,
  countDown = 60,
  text = '获取验证码',
  secondText = '{d}秒',
  enabled = true,
  onGetCaptcha,
}) => {
  let _timerRef = useRef<NodeJS.Timeout>();
  let _countRef = useRef<number>(countDown);
  let [title, setTitle] = useState<string>(text);

  // 清除定时器
  const _clearTimer = () => {
    if (_timerRef.current) {
      clearInterval(_timerRef.current);
      _timerRef.current = undefined;
    }
  };

  // 设置定时器
  const _setupTimer = () => {
    setTitle(secondText.replace(/{d}/g, String(_countRef.current)));
    _clearTimer();
    _timerRef.current = setInterval(function () {
      if (_countRef.current === 0) {
        _clearTimer();
        _countRef.current = countDown;
        setTitle(text);
      } else {
        _countRef.current--;
        setTitle(secondText.replace(/{d}/g, String(_countRef.current)));
      }
    }, 1000);
  };

  // 获取验证码
  const _onPress = async () => {
    try {
      const isSuccess = await onGetCaptcha();
      isSuccess && _setupTimer();
    } catch (error) {}
  };

  useEffect(() => {
    // 移除定时器
    return _clearTimer;
  }, []);

  return (
    <Button
      style={[{ minWidth: toDP(95) }, style]}
      title={title}
      titleStyle={{ color: Colors.textNormalColor, fontSize: toSP(Dimens.textNormalSize) }}
      onPress={_onPress}
      disabled={!enabled || title !== text}
    />
  );
};

export default Captcha;
