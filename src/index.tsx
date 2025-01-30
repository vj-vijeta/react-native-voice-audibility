import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import type { NativeModule, EmitterSubscription } from 'react-native'; // Type-only import
import React, { useState, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native'; // Removed unused `Text`

// Error message for linking issues
const LINKING_ERROR =
  `The package 'react-native-voice-audibility' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

// Options for configuring sensitivity or other parameters
type Options = {
  sensitivity?: number;
};

// Define the native module interface
type VoiceAudibilityNativeType = NativeModule & {
  startRecording(options: { sensitivity?: number }): Promise<boolean>;
  stopRecording(): Promise<boolean>;
  isRecording(): Promise<boolean>;
};

// Access the native module
const VoiceAudibilityNative = NativeModules.VoiceAudibility as
  | VoiceAudibilityNativeType
  | undefined;
const eventEmitter = new NativeEventEmitter(VoiceAudibilityNative);

// Throw an error if the module is not linked
if (!VoiceAudibilityNative) {
  throw new Error(LINKING_ERROR);
}

// Public API for the library
export async function startRecording(options: Options = {}): Promise<boolean> {
  return await VoiceAudibilityNative!.startRecording(options);
}

export async function stopRecording(): Promise<boolean> {
  return await VoiceAudibilityNative!.stopRecording();
}

export async function isRecording(): Promise<boolean> {
  return await VoiceAudibilityNative!.isRecording();
}

export function addAudioDataListener(
  callback: (amplitude: number) => void
): EmitterSubscription {
  return eventEmitter.addListener('onAudioData', callback);
}

export function removeAudioDataListener(subscription: EmitterSubscription) {
  subscription.remove();
}

// Floating microphone visualization component
export const FloatingMic = () => {
  const [, setAmplitude] = useState(0); // Removed unused `_amplitude`
  const [waveHeight] = useState(new Animated.Value(0));
  const [waveColor, setWaveColor] = useState('red'); // Default to red (silent)

  // Constants for visual appearance
  const LOW_THRESHOLD = 0.1;
  const HIGH_THRESHOLD = 1.0;

  useEffect(() => {
    const subscription = addAudioDataListener((amp) => {
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
};

// Styles for the FloatingMic component
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
