//src/index.d.ts
import type { EmitterSubscription } from 'react-native';
type Options = {
  sensitivity?: number;
};
export declare function startRecording(options?: Options): Promise<boolean>;
export declare function stopRecording(): Promise<boolean>;
export declare function addAudioDataListener(
  callback: (_amplitude: number) => void
): EmitterSubscription;
export declare function removeAudioDataListener(
  subscription: EmitterSubscription
): void;
export {};
