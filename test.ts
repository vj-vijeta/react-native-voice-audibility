import {
  startRecording,
  stopRecording,
  addAudioDataListener,
  removeAudioDataListener,
} from './src'; // Replace with the path to your library

async function testLibrary() {
  console.log('Testing startRecording...');
  const result = await startRecording({ sensitivity: 1.5 });
  console.log('Start recording result:', result);

  console.log('Adding audio data listener...');
  const subscription = addAudioDataListener((_amplitude) => {
    console.log('Amplitude:', _amplitude);
  });

  setTimeout(async () => {
    console.log('Stopping recording...');
    await stopRecording();
    console.log('Removing audio data listener...');
    removeAudioDataListener(subscription);
  }, 5000);
}

testLibrary();
