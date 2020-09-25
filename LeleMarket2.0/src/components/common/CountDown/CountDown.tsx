/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  countDown: {
    fontSize: toSP(Dimens.textNormalSize),
    color: '#FF7946',
  },
});

export interface CountDownProps {
  format: { day?: string; hours?: string; minutes?: string; seconds?: string };
  day?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountDown: React.FC<CountDownProps> = ({
  format = { hours: ':', minutes: ':', seconds: ':' },
  hours: _hours = 5,
  minutes: _minutes = 5,
  seconds: _seconds = 0,
}) => {
  let _timerRef = useRef<number>(null);
  let _secondsRef = useRef<number>(_seconds);
  let _minutesRef = useRef<number>(_minutes);
  let _hoursRef = useRef<number>(_hours);
  let [seconds, setSeconds] = useState(_seconds);
  let [minutes, setMinutes] = useState(_minutes);
  let [hours, setHours] = useState(_hours);

  // 清除定时器
  const _clearTimer = () => {
    if (_timerRef.current) {
      clearInterval(_timerRef.current);
      _timerRef.current = null;
    }
  };

  // 设置定时器
  // const _setupTimer = useCallback(() => {
  //   _clearTimer();
  //   _timerRef.current = setInterval(() => {}, 1000);
  // }, []);

  useEffect(() => {
    _secondsRef.current = 5;
    setSeconds(_secondsRef.current);
    _clearTimer();
    _timerRef.current = setInterval(() => {
      if (_secondsRef.current === 0) {
        _secondsRef.current = 5;
        setSeconds(_secondsRef.current);
        if (_minutesRef.current > 0 && _hoursRef.current > 0) {
          // if (_minutesRef.current === 0) {
          //   _minutesRef.current = 5;
          //   setMinutes(_minutesRef.current);
          //   if (_hoursRef.current === 0) {
          //     _hoursRef.current = 5;
          //     setHours(_hoursRef.current);
          //   } else {
          //     _hoursRef.current--;
          //     setHours(_hoursRef.current);
          //   }
          // } else {
          //   _minutesRef.current--;
          //   setMinutes(_minutesRef.current);
          // }
        }
      } else {
        _secondsRef.current--;
        setSeconds(_secondsRef.current);
      }
    }, 1000);
    return _clearTimer;
  }, []);

  return (
    <Text style={styles.countDown}>
      {`${String(hours).padStart(2, '0')}${format.minutes}` +
        `${String(minutes).padStart(2, '0')}${format.seconds}` +
        `${String(seconds).padStart(2, '0')}`}
    </Text>
  );
};

export default CountDown;
