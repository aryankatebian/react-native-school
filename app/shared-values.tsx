import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function SharedValuesDemo() {
  const width = useSharedValue(100);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const boxStyle = useAnimatedStyle(() => ({
    width: width.value,
    transform: [{ rotateZ: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  const reset = () => {
    width.value = withTiming(100, { duration: 500 });
    rotation.value = withTiming(0, { duration: 500 });
    opacity.value = withTiming(1, { duration: 500 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shared Values</Text>
      <Text style={styles.sub}>
        Values live on both the JS and UI threads. Mutate via .value — changes
        propagate instantly to animated components.
      </Text>

      <View style={styles.demoArea}>
        <Animated.View style={[styles.box, boxStyle]} />
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            width.value = withTiming(width.value === 100 ? 250 : 100, { duration: 600 });
          }}
        >
          <Text style={styles.btnText}>Toggle Width</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => {
            rotation.value = withTiming(rotation.value + 90, { duration: 400 });
          }}
        >
          <Text style={styles.btnText}>Rotate +90°</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => {
            opacity.value = withTiming(opacity.value === 1 ? 0.2 : 1, { duration: 400 });
          }}
        >
          <Text style={styles.btnText}>Toggle Opacity</Text>
        </Pressable>

        <Pressable style={[styles.btn, styles.btnReset]} onPress={reset}>
          <Text style={styles.btnText}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.codeBox}>
        <Text style={styles.codeTitle}>How it works</Text>
        <Text style={styles.code}>
          {`const width = useSharedValue(100);\n\nconst style = useAnimatedStyle(() => ({\n  width: width.value,\n}));\n\n// Mutate from JS — animates on UI thread\nwidth.value = withTiming(250);`}
        </Text>
      </View>

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>useSharedValue · useAnimatedStyle · withTiming</Text>
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
  demoArea: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  box: {
    height: 80,
    backgroundColor: '#3b82f6',
    borderRadius: 14,
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
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
  btnReset: {
    borderColor: '#ef4444',
  },
  btnText: {
    color: '#1e293b',
    fontSize: 14,
    fontWeight: '600',
  },
  codeBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  codeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  code: {
    fontFamily: 'SpaceMono',
    fontSize: 12,
    color: '#1e40af',
    lineHeight: 18,
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
