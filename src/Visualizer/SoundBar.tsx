import React from 'react';
import { View, StyleSheet } from 'react-native';

type SoundBarProps = {
  amplitude: number; // Removed `_` prefix
  barCount?: number;
  maxHeight?: number;
};

export default function SoundBar({
  amplitude, // Removed `_` prefix
  barCount = 10,
  maxHeight = 100,
}: SoundBarProps) {
  const soundBars = Array.from({ length: barCount }, (_, index) => {
    const height = amplitude * maxHeight * (index + 1);
    return (
      <View
        key={index}
        style={[styles.bar, { height: Math.min(height, maxHeight) }]}
      />
    );
  });

  return <View style={styles.container}>{soundBars}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bar: {
    width: 10,
    backgroundColor: '#4caf50',
  },
});
