import { View, Text, TextInput, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedProps,
  interpolate,
  interpolateColor,
  withTiming,
  clamp,
} from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const INITIAL_WEIGHT = 80;
const INITIAL_HEIGHT = 1.83;

const BMI_INPUT = [0, 15, 17.5, 18.5, 25, 27.5, 32.5];
const BMI_COLORS = [
  '#ef4444', '#ef4444', '#f59e0b', '#22c55e', '#22c55e', '#f59e0b', '#ef4444',
];

export default function BmiCalculator() {
  const weight = useSharedValue(INITIAL_WEIGHT);
  const height = useSharedValue(INITIAL_HEIGHT);

  const bmi = useDerivedValue(() => {
    return weight.value / (height.value * height.value);
  });

  const bmiText = useAnimatedProps(() => ({
    value: bmi.value.toFixed(1),
    text: bmi.value.toFixed(1),
  }));

  const vizStyle = useAnimatedStyle(() => ({
    width: clamp(interpolate(weight.value, [0, 120], [0, 250]), 0, 250),
    height: clamp(interpolate(height.value, [0, 2.3], [0, 350]), 0, 350),
    backgroundColor: interpolateColor(bmi.value, BMI_INPUT, BMI_COLORS),
  }));

  const labelStyle = useAnimatedStyle(() => {
    const val = bmi.value;
    const color =
      val < 18.5 ? '#f59e0b' : val < 25 ? '#22c55e' : val < 30 ? '#f59e0b' : '#ef4444';
    return { color };
  });

  const labelProps = useAnimatedProps(() => {
    const val = bmi.value;
    const label =
      val < 18.5 ? 'Underweight' : val < 25 ? 'Normal' : val < 30 ? 'Overweight' : 'Obese';
    return { value: label, text: label };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Body Mass Index Calculator</Text>
      <Text style={styles.sub}>Enter your weight and height to visualize your BMI</Text>

      <View style={styles.inputs}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            defaultValue={`${INITIAL_WEIGHT}`}
            placeholderTextColor="#64748b"
            onChange={(e) => {
              weight.value = withTiming(+e.nativeEvent.text || 0, { duration: 800 });
            }}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (m)</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            defaultValue={`${INITIAL_HEIGHT}`}
            placeholderTextColor="#64748b"
            onChange={(e) => {
              height.value = withTiming(+e.nativeEvent.text || 0.01, { duration: 800 });
            }}
          />
        </View>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Your BMI</Text>
        <AnimatedTextInput style={styles.resultValue} animatedProps={bmiText} readOnly />
        <AnimatedTextInput style={[styles.resultCategory]} animatedProps={labelProps} readOnly />
      </View>

      <View style={styles.vizContainer}>
        <Animated.View style={[styles.vizBlock, vizStyle]}>
          <AnimatedTextInput
            style={styles.vizText}
            animatedProps={bmiText}
            readOnly
          />
        </Animated.View>
      </View>

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>
          useSharedValue · useDerivedValue · useAnimatedStyle{'\n'}
          useAnimatedProps · interpolate · interpolateColor · withTiming
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
    color: '#64748b',
    marginBottom: 24,
  },
  inputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    color: '#0f172a',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  resultLabel: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  resultCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },
  vizContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vizBlock: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vizText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
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
