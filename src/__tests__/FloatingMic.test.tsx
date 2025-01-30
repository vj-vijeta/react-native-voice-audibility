// src/__tests__/FloatingMic.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native'; // Use this for testing React Native components
import FloatingMic from '../components/FloatingMic';

jest.mock('react-native', () => {
  return {
    NativeModules: {
      VoiceAudibility: {
        startRecording: jest.fn().mockResolvedValue(true),
        stopRecording: jest.fn().mockResolvedValue(true),
        isRecording: jest.fn().mockResolvedValue(true),
      },
    },
    NativeEventEmitter: jest.fn(),
  };
});

describe('FloatingMic Component', () => {
  it('should render the floating mic', () => {
    const { getByTestId } = render(<FloatingMic />);
    const waveComponent = getByTestId('floating-mic-wave'); // Ensure test ID is set in the component
    expect(waveComponent).toBeTruthy(); // Check if the wave component is rendered
  });
});
