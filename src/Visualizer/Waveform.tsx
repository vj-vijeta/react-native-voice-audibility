import React from 'react';
import { StyleSheet } from 'react-native';
import { Svg, Polyline } from 'react-native-svg';

type WaveformProps = {
  amplitudeHistory: number[];
  width?: number;
  height?: number;
};

export default function Waveform({ amplitudeHistory, width = 300, height = 100 }: WaveformProps) {
  const points = amplitudeHistory
    .map((amp, index) => `${index * (width / amplitudeHistory.length)},${height - amp * height}`)
    .join(' ');

  return (
    <Svg height={height} width={width} style={styles.svg}>
      <Polyline points={points} fill="none" stroke="#4caf50" strokeWidth="2" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: {
    backgroundColor: '#f0f0f0',
  },
});