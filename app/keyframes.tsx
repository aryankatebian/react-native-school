import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import Animated, { Keyframe } from 'react-native-reanimated';

const toastEntering = new Keyframe({
  0: { opacity: 0, transform: [{ translateY: -40 }, { scale: 0.8 }] },
  40: { opacity: 1, transform: [{ translateY: 8 }, { scale: 1.03 }] },
  70: { transform: [{ translateY: -4 }, { scale: 0.98 }] },
  100: { opacity: 1, transform: [{ translateY: 0 }, { scale: 1 }] },
}).duration(600);

const toastExiting = new Keyframe({
  0: { opacity: 1, transform: [{ translateY: 0 }, { scale: 1 }] },
  100: { opacity: 0, transform: [{ translateY: -30 }, { scale: 0.9 }] },
}).duration(300);

const pulseKeyframe = new Keyframe({
  0: { transform: [{ scale: 1 }, { rotateZ: '0deg' }] },
  25: { transform: [{ scale: 1.2 }, { rotateZ: '5deg' }] },
  50: { transform: [{ scale: 1 }, { rotateZ: '0deg' }] },
  75: { transform: [{ scale: 1.2 }, { rotateZ: '-5deg' }] },
  100: { transform: [{ scale: 1 }, { rotateZ: '0deg' }] },
}).duration(1200);

const dotKeyframe = (delay: number) =>
  new Keyframe({
    0: { transform: [{ translateY: 0 }] },
    30: { transform: [{ translateY: -16 }] },
    60: { transform: [{ translateY: 0 }] },
    100: { transform: [{ translateY: 0 }] },
  }).duration(800).delay(delay);

export default function KeyframesDemo() {
  const [showToast, setShowToast] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [dotsKey, setDotsKey] = useState(0);

  const replayPulse = useCallback(() => setPulseKey((k) => k + 1), []);
  const replayDots = useCallback(() => setDotsKey((k) => k + 1), []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Keyframe Animations</Text>
      <Text style={styles.sub}>
        Multi-step animation sequences — the Reanimated equivalent of CSS @keyframes.
      </Text>

      {/* Toast notification */}
      <Text style={styles.sectionTitle}>Notification Toast</Text>
      <View style={styles.toastArea}>
        {showToast && (
          <Animated.View entering={toastEntering} exiting={toastExiting} style={styles.toast}>
            <Text style={styles.toastEmoji}>🔔</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.toastTitle}>New Message</Text>
              <Text style={styles.toastBody}>Animated with a multi-step Keyframe!</Text>
            </View>
          </Animated.View>
        )}
      </View>
      <Pressable style={styles.btn} onPress={() => setShowToast((s) => !s)}>
        <Text style={styles.btnText}>{showToast ? 'Dismiss' : 'Show Toast'}</Text>
      </Pressable>

      <View style={styles.separator} />

      {/* Pulse animation */}
      <Text style={styles.sectionTitle}>Pulse & Wobble</Text>
      <View style={styles.pulseArea}>
        <Animated.View key={pulseKey} entering={pulseKeyframe} style={styles.pulseBox}>
          <Text style={{ fontSize: 40 }}>⚡</Text>
        </Animated.View>
      </View>
      <Pressable style={styles.btn} onPress={replayPulse}>
        <Text style={styles.btnText}>Replay</Text>
      </Pressable>

      <View style={styles.separator} />

      {/* Loading dots */}
      <Text style={styles.sectionTitle}>Loading Dots</Text>
      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <Animated.View key={`${dotsKey}-${i}`} entering={dotKeyframe(i * 150)} style={styles.dot} />
        ))}
      </View>
      <Pressable style={styles.btn} onPress={replayDots}>
        <Text style={styles.btnText}>Replay</Text>
      </Pressable>

      <View style={{ flex: 1 }} />

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>
          Keyframe · entering/exiting props · .duration() · .delay()
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
    marginBottom: 20,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  toastArea: {
    height: 80,
    justifyContent: 'center',
    marginBottom: 10,
  },
  toast: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  toastEmoji: {
    fontSize: 24,
  },
  toastTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  toastBody: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  pulseArea: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  pulseBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: 10,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3b82f6',
  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignSelf: 'flex-start',
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
    marginVertical: 16,
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
