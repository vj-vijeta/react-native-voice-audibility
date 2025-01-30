import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { addAudioDataListener, removeAudioDataListener } from '../index'; // Adjust the path if necessary
// Constants for visual appearance
const LOW_THRESHOLD = 0.1;  // Low audio intensity threshold (silent)
const HIGH_THRESHOLD = 1.0; // High audio intensity threshold (clear voice)

export default function FloatingMic() {
  const [amplitude, setAmplitude] = useState<number>(0); // Explicitly typing amplitude as number
  const [waveHeight] = useState(new Animated.Value(0));
  const [waveColor, setWaveColor] = useState('red'); // Default to red (silent)

  useEffect(() => {
    const subscription = addAudioDataListener((amp: number) => { // Explicitly type 'amp' as number
      setAmplitude(amp);

      // Animate the wave height based on audio amplitude
      Animated.timing(waveHeight, {
        toValue: Math.min(amp * 100, 100), // Limit wave height for visual effect
        duration: 100,
        useNativeDriver: false,
      }).start();

      // Change the wave color based on intensity
      if (amp > HIGH_THRESHOLD) {
        setWaveColor('green'); // Clear voice
      } else if (amp > LOW_THRESHOLD) {
        setWaveColor('yellow'); // Low intensity voice
      } else {
        setWaveColor('red'); // Silent or very low audio
      }
    });

    return () => removeAudioDataListener(subscription);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wave, { height: waveHeight, backgroundColor: waveColor }]} />
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
    zIndex: 9999,  // Ensures it's on top of other UI elements
  },
  wave: {
    width: 10,
    borderRadius: 5,
  },
});