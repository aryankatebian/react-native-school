import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import Animated, {
  LinearTransition,
  SequencedTransition,
  FadingTransition,
  JumpingTransition,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

const TRANSITION_TYPES = [
  { name: 'Linear', transition: LinearTransition.springify() },
  { name: 'Sequenced', transition: SequencedTransition },
  { name: 'Fading', transition: FadingTransition },
  { name: 'Jumping', transition: JumpingTransition },
];

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4', '#ec4899', '#14b8a6'];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function LayoutAnimations() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({ id: i, color: COLORS[i % COLORS.length], label: `Item ${i + 1}` }))
  );
  const [counter, setCounter] = useState(6);
  const [transIndex, setTransIndex] = useState(0);

  const selected = TRANSITION_TYPES[transIndex];

  const addItem = () => {
    const pos = Math.floor(Math.random() * (items.length + 1));
    const newItem = { id: counter, color: randomColor(), label: `Item ${counter}` };
    setItems((prev) => [...prev.slice(0, pos), newItem, ...prev.slice(pos)]);
    setCounter((c) => c + 1);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const shuffle = () => {
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Layout Animations</Text>
      <Text style={styles.sub}>
        Items smoothly rearrange when added, removed, or shuffled. Switch transition type to compare.
      </Text>

      <View style={styles.picker}>
        {TRANSITION_TYPES.map((t, i) => (
          <Pressable
            key={t.name}
            style={[styles.chip, i === transIndex && styles.chipActive]}
            onPress={() => setTransIndex(i)}
          >
            <Text style={[styles.chipText, i === transIndex && styles.chipTextActive]}>
              {t.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <Animated.View
            key={item.id}
            layout={selected.transition}
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
          >
            <Pressable
              style={[styles.item, { backgroundColor: item.color }]}
              onPress={() => removeItem(item.id)}
            >
              <Text style={styles.itemText}>{item.label}</Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>

      <View style={styles.btnRow}>
        <Pressable style={styles.btn} onPress={addItem}>
          <Text style={styles.btnText}>+ Add</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={shuffle}>
          <Text style={styles.btnText}>Shuffle</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>
          LinearTransition · SequencedTransition · FadingTransition{'\n'}
          JumpingTransition · layout prop · FadeIn/Out
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
    marginBottom: 16,
    lineHeight: 20,
  },
  picker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  chipTextActive: {
    color: '#fff',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  item: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  itemText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
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
