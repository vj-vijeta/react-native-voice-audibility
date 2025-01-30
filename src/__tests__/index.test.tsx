// src/__tests__/index.test.tsx

import { startRecording, stopRecording, isRecording } from '../index';  // Adjust the import path to where your functions are

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

describe('VoiceAudibility Tests', () => {
  it('should start recording', async () => {
    const result = await startRecording();
    expect(result).toBe(true); // Ensure startRecording resolves to true
  });

  it('should stop recording', async () => {
    const result = await stopRecording();
    expect(result).toBe(true); // Ensure stopRecording resolves to true
  });

  it('should return recording status as true', async () => {
    const recordingStatus = await isRecording();
    expect(recordingStatus).toBe(true); // Ensure isRecording returns true
  });
});