import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  interpolate,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { Circle, Rect, Line, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedPath = Animated.createAnimatedComponent(Path);

// --- Progress Ring ---
function ProgressRing() {
  const progress = useSharedValue(0);
  const [percentage, setPercentage] = useState(0);

  const RADIUS = 50;
  const STROKE = 8;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  const animate = () => {
    const next = percentage >= 100 ? 0 : percentage + 25;
    setPercentage(next);
    progress.value = withTiming(next / 100, { duration: 800, easing: Easing.bezier(0.4, 0, 0.2, 1) });
  };

  return (
    <View style={styles.demoBlock}>
      <Text style={styles.demoTitle}>Animated Progress Ring</Text>
      <Pressable onPress={animate}>
        <View style={styles.ringContainer}>
          <Svg width={120} height={120} viewBox="0 0 120 120">
            <Circle
              cx={60} cy={60} r={RADIUS}
              stroke="#e2e8f0" strokeWidth={STROKE} fill="none"
            />
            <AnimatedCircle
              cx={60} cy={60} r={RADIUS}
              stroke="#3b82f6" strokeWidth={STROKE} fill="none"
              strokeDasharray={CIRCUMFERENCE}
              animatedProps={animatedProps}
              strokeLinecap="round"
              rotation={-90} origin="60,60"
            />
          </Svg>
          <Text style={styles.ringText}>{percentage}%</Text>
        </View>
      </Pressable>
      <Text style={styles.hint}>Tap to advance</Text>
    </View>
  );
}

// --- Pulsing Dots (like your DotsBackground pattern) ---
function PulsingDots() {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1, false
    );
  }, []);

  const dots = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 7; col++) {
      dots.push({ x: 18 + col * 28, y: 12 + row * 22, delay: (row + col) * 0.08 });
    }
  }

  return (
    <View style={styles.demoBlock}>
      <Text style={styles.demoTitle}>Pulsing Dot Grid</Text>
      <View style={styles.dotsContainer}>
        <Svg width="100%" height={120} viewBox="0 0 210 120">
          {dots.map((dot, i) => (
            <PulsingDot key={i} cx={dot.x} cy={dot.y} delay={dot.delay} pulse={pulse} />
          ))}
        </Svg>
      </View>
      <Text style={styles.codeHint}>useAnimatedProps on SVG Circle</Text>
    </View>
  );
}

function PulsingDot({ cx, cy, delay, pulse }: { cx: number; cy: number; delay: number; pulse: Animated.SharedValue<number> }) {
  const animatedProps = useAnimatedProps(() => {
    const scale = interpolate(
      pulse.value,
      [0, 1],
      [0.4, 1]
    );
    const adjustedScale = interpolate(
      Math.sin((pulse.value + delay) * Math.PI),
      [0, 1],
      [2, 5]
    );
    return {
      r: adjustedScale,
      opacity: interpolate(Math.sin((pulse.value + delay) * Math.PI), [0, 1], [0.2, 0.8]),
    };
  });

  return (
    <AnimatedCircle cx={cx} cy={cy} fill="#60a5fa" animatedProps={animatedProps} />
  );
}

// --- Animated Bar Chart ---
function AnimatedBarChart() {
  const values = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3];
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000, easing: Easing.bezier(0.4, 0, 0.2, 1) });
  }, []);

  const replay = () => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 1000, easing: Easing.bezier(0.4, 0, 0.2, 1) });
  };

  return (
    <View style={styles.demoBlock}>
      <Text style={styles.demoTitle}>Animated Bar Chart</Text>
      <Pressable onPress={replay}>
        <Svg width="100%" height={130} viewBox="0 0 280 130">
          {values.map((val, i) => (
            <AnimatedBar
              key={i}
              x={10 + i * 40}
              value={val}
              index={i}
              progress={progress}
            />
          ))}
          <Line x1={10} y1={125} x2={270} y2={125} stroke="#e2e8f0" strokeWidth={1} />
        </Svg>
      </Pressable>
      <Text style={styles.hint}>Tap to replay</Text>
    </View>
  );
}

function AnimatedBar({ x, value, index, progress }: { x: number; value: number; index: number; progress: Animated.SharedValue<number> }) {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4', '#ec4899'];
  const maxH = 110;

  const animatedProps = useAnimatedProps(() => {
    const staggered = interpolate(
      progress.value,
      [index * 0.08, index * 0.08 + 0.5],
      [0, 1],
      'clamp' as any
    );
    const h = maxH * value * Math.min(Math.max(staggered, 0), 1);
    return {
      height: h,
      y: 125 - h,
    };
  });

  return (
    <AnimatedRect
      x={x}
      width={28}
      rx={6}
      fill={colors[index % colors.length]}
      animatedProps={animatedProps}
    />
  );
}

// --- Animated Wave Path ---
function AnimatedWave() {
  const phase = useSharedValue(0);

  useEffect(() => {
    phase.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 3000, easing: Easing.linear }),
      -1, false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const p = phase.value;
    const points: string[] = [];
    for (let x = 0; x <= 280; x += 4) {
      const y = 40 + Math.sin((x / 40) + p) * 18 + Math.sin((x / 20) + p * 1.5) * 8;
      points.push(`${x === 0 ? 'M' : 'L'}${x},${y}`);
    }
    return { d: points.join(' ') };
  });

  return (
    <View style={styles.demoBlock}>
      <Text style={styles.demoTitle}>Animated Wave</Text>
      <View style={styles.waveContainer}>
        <Svg width="100%" height={80} viewBox="0 0 280 80">
          <AnimatedPath
            animatedProps={animatedProps}
            stroke="#3b82f6"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <Text style={styles.codeHint}>Animated SVG Path.d on UI thread</Text>
    </View>
  );
}

// --- Main ---
export default function SvgAnimations() {
  return (
    <Animated.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>SVG Animations</Text>
      <Text style={styles.sub}>
        Reanimated + react-native-svg — animate any SVG prop directly on the UI thread via useAnimatedProps.
      </Text>

      <ProgressRing />
      <AnimatedBarChart />
      <PulsingDots />
      <AnimatedWave />

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>
          Animated.createAnimatedComponent(Circle/Rect/Path){'\n'}
          useAnimatedProps · strokeDashoffset · SVG Path.d{'\n'}
          withTiming · withRepeat · interpolate
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  content: {
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
    color: '#475569',
    marginBottom: 24,
    lineHeight: 20,
  },
  demoBlock: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  demoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  dotsContainer: {
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    padding: 8,
  },
  waveContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    padding: 8,
  },
  hint: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  codeHint: {
    fontSize: 11,
    fontFamily: 'SpaceMono',
    color: '#1e40af',
    textAlign: 'center',
    marginTop: 10,
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
