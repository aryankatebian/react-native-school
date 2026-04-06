import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDecay,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const BALL_SIZE = 80;

export default function GestureBall() {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const [mode, setMode] = useState<'spring' | 'decay'>('spring');

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
      scale.value = withSpring(1.15);
    })
    .onUpdate((e) => {
      translateX.value = savedX.value + e.translationX;
      translateY.value = savedY.value + e.translationY;
    })
    .onEnd((e) => {
      scale.value = withSpring(1);
      if (mode === 'spring') {
        translateX.value = withSpring(0, { damping: 12, stiffness: 120 });
        translateY.value = withSpring(0, { damping: 12, stiffness: 120 });
      } else {
        const clampX = (screenW - BALL_SIZE) / 2 - 20;
        const clampY = (screenH - BALL_SIZE) / 2 - 150;
        translateX.value = withDecay({
          velocity: e.velocityX,
          clamp: [-clampX, clampX],
        });
        translateY.value = withDecay({
          velocity: e.velocityY,
          clamp: [-clampY, clampY],
        });
      }
    });

  const ballStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gesture-Driven Animation</Text>
      <Text style={styles.sub}>
        Drag the ball and release. Switch between spring snap-back and decay (inertia) modes.
      </Text>

      <View style={styles.modeRow}>
        <Pressable
          style={[styles.modeBtn, mode === 'spring' && styles.modeBtnActive]}
          onPress={() => setMode('spring')}
        >
          <Text style={[styles.modeText, mode === 'spring' && styles.modeTextActive]}>
            Spring
          </Text>
        </Pressable>
        <Pressable
          style={[styles.modeBtn, mode === 'decay' && styles.modeBtnActive]}
          onPress={() => setMode('decay')}
        >
          <Text style={[styles.modeText, mode === 'decay' && styles.modeTextActive]}>
            Decay
          </Text>
        </Pressable>
      </View>

      <View style={styles.arena}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.ball, ballStyle]}>
            <Text style={styles.ballText}>
              {mode === 'spring' ? '🔵' : '🟠'}
            </Text>
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>
          Gesture.Pan() · GestureDetector · useSharedValue{'\n'}
          useAnimatedStyle · withSpring · withDecay
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  modeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  modeBtnActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  modeTextActive: {
    color: '#fff',
  },
  arena: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  ballText: {
    fontSize: 32,
  },
  apiBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
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
    color: '#94a3b8',
    lineHeight: 20,
  },
});
