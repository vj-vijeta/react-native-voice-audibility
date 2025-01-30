import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import type { NativeModule, EmitterSubscription } from 'react-native'; // Type-only import
import React, { useState, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

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
const VoiceAudibilityNative = NativeModules.VoiceAudibility as VoiceAudibilityNativeType | undefined;
const eventEmitter = new NativeEventEmitter(VoiceAudibilityNative);

// Throw an error if the module is not linked
if (!VoiceAudibilityNative) {
  throw new Error(LINKING_ERROR);
}

// Public API for the library

/**
 * Starts audio recording with optional configuration.
 * @param options Configuration options, like sensitivity
 * @returns A promise resolving to a boolean indicating success
 */
export async function startRecording(options: Options = {}): Promise<boolean> {
  return await VoiceAudibilityNative!.startRecording(options);
}

/**
 * Stops audio recording.
 * @returns A promise resolving to a boolean indicating success
 */
export async function stopRecording(): Promise<boolean> {
  return await VoiceAudibilityNative!.stopRecording();
}

/**
 * Checks if the library is currently recording.
 * @returns A promise resolving to a boolean
 */
export async function isRecording(): Promise<boolean> {
  return await VoiceAudibilityNative!.isRecording();
}

/**
 * Subscribes to audio data events, providing real-time amplitude values.
 * @param callback Function to handle amplitude data
 * @returns An EmitterSubscription for the event
 */
export function addAudioDataListener(callback: (amplitude: number) => void): EmitterSubscription {
  return eventEmitter.addListener('onAudioData', callback);
}

/**
 * Removes the subscription for audio data events.
 * @param subscription The EmitterSubscription to remove
 */
export function removeAudioDataListener(subscription: EmitterSubscription) {
  subscription.remove();
}

/**
 * Floating microphone visualization component.
 * Displays a wave whose height and color change based on audio amplitude.
 */
export const FloatingMic = () => {
  const [amplitude, setAmplitude] = useState(0);
  const [waveHeight] = useState(new Animated.Value(0));
  const [waveColor, setWaveColor] = useState('red'); // Default to red (silent)

  // Constants for visual appearance
  const LOW_THRESHOLD = 0.1;  // Low audio intensity threshold (silent)
  const HIGH_THRESHOLD = 1.0; // High audio intensity threshold (clear voice)

  // Effect for subscribing to audio data
  useEffect(() => {
    const subscription = addAudioDataListener((amp) => {
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

    // Cleanup on unmount
    return () => removeAudioDataListener(subscription);
  }, []);

  // Floating microphone visualizer component
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wave, { height: waveHeight, backgroundColor: waveColor }]} />
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
    zIndex: 9999,  // Ensures it's on top of other UI elements
  },
  wave: {
    width: 10,
    borderRadius: 5,
  },
});