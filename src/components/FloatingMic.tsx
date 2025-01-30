import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { addAudioDataListener, removeAudioDataListener } from '../index';

const LOW_THRESHOLD = 0.1;
const HIGH_THRESHOLD = 1.0;

export default function FloatingMic() {
  const [, setAmplitude] = useState<number>(0); // Removed unused `_amplitude`
  const [waveHeight] = useState(new Animated.Value(0));
  const [waveColor, setWaveColor] = useState('red');

  useEffect(() => {
    const subscription = addAudioDataListener((amp: number) => {
      setAmplitude(amp);

      Animated.timing(waveHeight, {
        toValue: Math.min(amp * 100, 100),
        duration: 100,
        useNativeDriver: false,
      }).start();

      setWaveColor(
        amp > HIGH_THRESHOLD ? 'green' : amp > LOW_THRESHOLD ? 'yellow' : 'red'
      );
    });

    return () => removeAudioDataListener(subscription);
  }, [waveHeight]); // Added missing dependency

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.wave,
          { height: waveHeight, backgroundColor: waveColor },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'black',
    zIndex: 9999,
  },
  wave: {
    width: 10,
    borderRadius: 5,
  },
});
