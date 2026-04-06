import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
  Keyframe,
} from 'react-native-reanimated';

const pulseKeyframe = new Keyframe({
  0: { transform: [{ scale: 1 }], opacity: 1 },
  50: { transform: [{ scale: 1.3 }], opacity: 0.7 },
  100: { transform: [{ scale: 1 }], opacity: 1 },
}).duration(1000);

const slideInKeyframe = new Keyframe({
  0: { transform: [{ translateX: -300 }], opacity: 0 },
  60: { transform: [{ translateX: 10 }], opacity: 1 },
  100: { transform: [{ translateX: 0 }], opacity: 1 },
}).duration(600);

const shakeKeyframe = new Keyframe({
  0: { transform: [{ translateX: 0 }] },
  20: { transform: [{ translateX: -12 }] },
  40: { transform: [{ translateX: 12 }] },
  60: { transform: [{ translateX: -8 }] },
  80: { transform: [{ translateX: 8 }] },
  100: { transform: [{ translateX: 0 }] },
}).duration(500);

export default function CSSvsReanimated() {
  // CSS Transition equivalent
  const bgProgress = useSharedValue(0);
  const [expanded, setExpanded] = useState(false);

  const transitionStyle = useAnimatedStyle(() => ({
    width: bgProgress.value === 1 ? 300 : 120,
    height: bgProgress.value === 1 ? 80 : 50,
    backgroundColor: bgProgress.value === 1 ? '#22c55e' : '#3b82f6',
    borderRadius: bgProgress.value === 1 ? 20 : 12,
  }));

  const toggleTransition = () => {
    bgProgress.value = withTiming(expanded ? 0 : 1, {
      duration: 400,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
    setExpanded(!expanded);
  };

  // Infinite animation equivalent
  const rotateVal = useSharedValue(0);
  const [spinning, setSpinning] = useState(false);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotateVal.value}deg` }],
  }));

  const toggleSpin = () => {
    if (spinning) {
      rotateVal.value = withTiming(0, { duration: 300 });
    } else {
      rotateVal.value = withRepeat(withTiming(360, { duration: 1200, easing: Easing.linear }), -1, false);
    }
    setSpinning(!spinning);
  };

  // Keyframe demos
  const [pulseKey, setPulseKey] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CSS Animations in Reanimated</Text>
      <Text style={styles.sub}>
        Reanimated 4.x introduces CSS-style APIs. Here's how CSS concepts map to Reanimated.
      </Text>

      {/* CSS transition equivalent */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CSS transition</Text>
        <Text style={styles.cssCode}>
          {'transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1)'}
        </Text>
        <View style={styles.demoRow}>
          <Pressable onPress={toggleTransition}>
            <Animated.View style={[styles.transitionBox, transitionStyle]}>
              <Text style={styles.boxText}>{expanded ? 'Expanded' : 'Tap me'}</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>

      {/* CSS animation: infinite spin */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>animation: spin infinite linear</Text>
        <Text style={styles.cssCode}>
          {'@keyframes spin { to { transform: rotate(360deg) } }'}
        </Text>
        <View style={styles.demoRow}>
          <Pressable onPress={toggleSpin}>
            <Animated.View style={[styles.spinBox, spinStyle]}>
              <Text style={styles.spinIcon}>+</Text>
            </Animated.View>
          </Pressable>
          <Text style={styles.hint}>Tap to {spinning ? 'stop' : 'spin'}</Text>
        </View>
      </View>

      {/* Keyframe animations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>@keyframes pulse / slideIn / shake</Text>
        <View style={styles.keyframeRow}>
          <View style={styles.keyframeDemo}>
            <Animated.View key={`p-${pulseKey}`} entering={pulseKeyframe} style={styles.kfBox}>
              <Text style={styles.kfLabel}>Pulse</Text>
            </Animated.View>
            <Pressable style={styles.replayBtn} onPress={() => setPulseKey((k) => k + 1)}>
              <Text style={styles.replayText}>Replay</Text>
            </Pressable>
          </View>

          <View style={styles.keyframeDemo}>
            <Animated.View key={`s-${slideKey}`} entering={slideInKeyframe} style={[styles.kfBox, { backgroundColor: '#22c55e' }]}>
              <Text style={styles.kfLabel}>Slide</Text>
            </Animated.View>
            <Pressable style={styles.replayBtn} onPress={() => setSlideKey((k) => k + 1)}>
              <Text style={styles.replayText}>Replay</Text>
            </Pressable>
          </View>

          <View style={styles.keyframeDemo}>
            <Animated.View key={`h-${shakeKey}`} entering={shakeKeyframe} style={[styles.kfBox, { backgroundColor: '#ef4444' }]}>
              <Text style={styles.kfLabel}>Shake</Text>
            </Animated.View>
            <Pressable style={styles.replayBtn} onPress={() => setShakeKey((k) => k + 1)}>
              <Text style={styles.replayText}>Replay</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>CSS Equivalents</Text>
        <Text style={styles.apiText}>
          transition → withTiming + useAnimatedStyle{'\n'}
          animation: infinite → withRepeat + withTiming{'\n'}
          @keyframes → Keyframe API{'\n'}
          cubic-bezier() → Easing.bezier()
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
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 20,
    lineHeight: 20,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cssCode: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    color: '#1e40af',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  transitionBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  spinBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#a855f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  hint: {
    color: '#475569',
    fontSize: 13,
  },
  keyframeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  keyframeDemo: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  kfBox: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kfLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  replayBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  replayText: {
    color: '#1e293b',
    fontSize: 12,
    fontWeight: '600',
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
    lineHeight: 20,
  },
});
