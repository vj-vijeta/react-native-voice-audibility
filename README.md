# react-native-voice-audibility

A React Native library that provides functionality to access the microphone and check voice audibility. This library allows you to record audio, stop recording, and check the recording status directly from your React Native application on both iOS and Android.

## Prerequisites

Before using the library, ensure that you have the following:

- **React Native 0.60+** (for auto-linking support)
- **Node.js 12+** (for dependency compatibility)
- **React Native CLI** or **Expo CLI**

## Features

- Start and stop audio recording
- Check microphone status
- Cross-platform support for **iOS** and **Android**
- Simple API for seamless integration with your React Native app

## Installation

You can install the library via npm:

```sh
npm install react-native-voice-audibility
```

## React Native Version Compatibility

Ensure that you are using React Native 0.65.0 or above for full compatibility.

## Usage

### 1. Importing the Library

To use the library, you first need to import the necessary functions:

```javascript
import {
  startRecording,
  stopRecording,
  isRecording,
} from 'react-native-voice-audibility';
```

### 2. Start Recording

Use the startRecording() function to begin audio recording:

```javascript
async function start() {
  try {
    const result = await startRecording();
    console.log('Recording started:', result);
  } catch (error) {
    console.error('Error starting the recording:', error);
  }
}
```

### 3. Stop Recording

Call the stopRecording() function to stop the ongoing recording:

```javascript
async function stop() {
  try {
    const result = await stopRecording();
    console.log('Recording stopped:', result);
  } catch (error) {
    console.error('Error stopping the recording:', error);
  }
}
```

### 4. Check Recording Status

To check if the device is currently recording audio:

```javascript
async function checkStatus() {
  const recordingStatus = await isRecording();
  console.log(recordingStatus ? 'Recording in progress' : 'Not recording');
}
```

### 5. Full Example

```javascript
import {
  startRecording,
  stopRecording,
  isRecording,
} from 'react-native-voice-audibility';

async function recordAudio() {
  try {
    // Start recording
    const startResult = await startRecording();
    console.log('Recording started:', startResult);

    // Check recording status
    const status = await isRecording();
    console.log('Is recording:', status);

    // Stop recording after 5 seconds
    setTimeout(async () => {
      const stopResult = await stopRecording();
      console.log('Recording stopped:', stopResult);
    }, 5000);
  } catch (error) {
    console.error('Error in recording:', error);
  }
}

recordAudio();
```

## API Reference

- **startRecording()**: Starts the audio recording and returns a Promise that resolves when recording is successfully started.
- **stopRecording()**: Stops the audio recording and returns a Promise that resolves when recording is successfully stopped.
- **isRecording()**: Checks if the microphone is currently recording. Returns a Promise that resolves to true if recording, false otherwise.

## Permissions

### iOS

Add the following to your Info.plist:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>We need access to your microphone for voice audibility detection.</string>
```

### Android

Add the following permissions to your AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

For Android 6.0 (API level 23) and above, request runtime permissions:

```javascript
import { PermissionsAndroid } from 'react-native';

async function requestPermission() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: 'Microphone Permission',
      message: 'We need access to your microphone for recording audio.',
    }
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Microphone permission granted');
  } else {
    console.log('Microphone permission denied');
  }
}
```

## How It Works

This library uses native modules to interface with the microphone on both Android and iOS:

- **Android**: Uses AudioRecord to capture audio
- **iOS**: Uses AVAudioRecorder for audio recording

## Performance Considerations

- Keep recording duration within reasonable limits to avoid memory overflow
- Always stop recording when no longer needed to release system resources
- Consider using background recording for long-duration use cases

## Troubleshooting

### Permissions Issues

- For iOS: Verify NSMicrophoneUsageDescription in Info.plist
- For Android: Check runtime permissions for RECORD_AUDIO

### React Native Linking

For React Native versions below 0.60, manually link the package:

```sh
react-native link react-native-voice-audibility
```

### Unresponsive API

If API methods are not responding as expected, check native module logs for errors.

## Testing

Run Jest tests to verify the library:

```sh
npm test
```

Make sure all tests pass before publishing or releasing updates.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Run the tests
5. Submit a pull request with a description of the changes

For detailed instructions, see the contributing guide.

## Changelog

### v0.1.0 (2025-01-30)

- Initial release with basic functionalities
- Added isRecording() method
- Set up basic permissions for iOS and Android
- Compatible with React Native 0.60+
- Added UI component for floating mic button
- Fixed Android permission handling issues
- basic error handling for recording methods

## License

This library is released under the MIT License. See the LICENSE file for more details.

## Acknowledgments

- Built with create-react-native-library

---

Made with ❤️ using create-react-native-library
