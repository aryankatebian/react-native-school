import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDecay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

function Ball({
  color,
  label,
  translateX,
}: {
  color: string;
  label: string;
  translateX: Animated.SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.track}>
      <Text style={styles.trackLabel}>{label}</Text>
      <View style={styles.trackBar}>
        <Animated.View style={[styles.ball, { backgroundColor: color }, style]} />
      </View>
    </View>
  );
}

export default function AnimationFunctions() {
  const timingX = useSharedValue(0);
  const springX = useSharedValue(0);
  const decayX = useSharedValue(0);
  const repeatX = useSharedValue(0);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const target = 220;
    timingX.value = 0;
    springX.value = 0;
    decayX.value = 0;

    timingX.value = withTiming(target, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    springX.value = withSpring(target, { damping: 8, stiffness: 100 });
    decayX.value = withDecay({ velocity: 600, clamp: [0, target] });
    setPlaying(true);
  };

  const reset = () => {
    timingX.value = withTiming(0, { duration: 400 });
    springX.value = withSpring(0);
    decayX.value = withTiming(0, { duration: 400 });
    setPlaying(false);
  };

  const repeatStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: repeatX.value }],
  }));

  const toggleRepeat = () => {
    if (repeatX.value === 0) {
      repeatX.value = withRepeat(
        withSequence(
          withTiming(220, { duration: 600 }),
          withTiming(0, { duration: 600 })
        ),
        -1,
        false
      );
    } else {
      repeatX.value = withTiming(0, { duration: 400 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Animation Functions</Text>
      <Text style={styles.sub}>
        Compare how withTiming, withSpring, and withDecay shape motion differently.
      </Text>

      <Ball color="#3b82f6" label="withTiming" translateX={timingX} />
      <Ball color="#22c55e" label="withSpring" translateX={springX} />
      <Ball color="#f59e0b" label="withDecay" translateX={decayX} />

      <View style={styles.btnRow}>
        <Pressable style={styles.btn} onPress={playing ? reset : play}>
          <Text style={styles.btnText}>{playing ? 'Reset' : 'Play All'}</Text>
        </Pressable>
      </View>

      <View style={styles.separator} />

      <Text style={[styles.trackLabel, { marginBottom: 8 }]}>withRepeat + withSequence</Text>
      <View style={styles.trackBar}>
        <Animated.View style={[styles.ball, { backgroundColor: '#a855f7' }, repeatStyle]} />
      </View>
      <Pressable style={[styles.btn, { marginTop: 12 }]} onPress={toggleRepeat}>
        <Text style={styles.btnText}>Toggle Loop</Text>
      </Pressable>

      <View style={{ flex: 1 }} />

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>
          withTiming · withSpring · withDecay · withRepeat · withSequence · Easing
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 20,
  },
  track: {
    marginBottom: 20,
  },
  trackLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
    fontFamily: 'SpaceMono',
  },
  trackBar: {
    height: 44,
    backgroundColor: '#e2e8f0',
    borderRadius: 22,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  ball: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  btnText: {
    color: '#1e293b',
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20,
  },
  apiBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  apiTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  apiText: {
    fontSize: 13,
    color: '#475569',
  },
});
