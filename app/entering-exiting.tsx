import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutRight,
  BounceIn,
  BounceOut,
  FlipInXUp,
  FlipOutXDown,
  ZoomIn,
  ZoomOut,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from 'react-native-reanimated';

const ANIMATIONS = [
  { name: 'Fade', entering: FadeIn, exiting: FadeOut },
  { name: 'Slide', entering: SlideInLeft, exiting: SlideOutRight },
  { name: 'Bounce', entering: BounceIn, exiting: BounceOut },
  { name: 'Flip', entering: FlipInXUp, exiting: FlipOutXDown },
  { name: 'Zoom', entering: ZoomIn, exiting: ZoomOut },
  { name: 'LightSpeed', entering: LightSpeedInLeft, exiting: LightSpeedOutRight },
];

const CARD_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'];

export default function EnteringExiting() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cards, setCards] = useState([0, 1, 2, 3]);
  const [counter, setCounter] = useState(4);

  const selected = ANIMATIONS[selectedIndex];

  const addCard = () => {
    setCards((prev) => [...prev, counter]);
    setCounter((c) => c + 1);
  };

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Entering & Exiting</Text>
      <Text style={styles.sub}>
        Tap a card to remove it. Tap "Add Card" to insert. Switch animation type below.
      </Text>

      <View style={styles.picker}>
        {ANIMATIONS.map((anim, i) => (
          <Pressable
            key={anim.name}
            style={[styles.chip, i === selectedIndex && styles.chipActive]}
            onPress={() => setSelectedIndex(i)}
          >
            <Text style={[styles.chipText, i === selectedIndex && styles.chipTextActive]}>
              {anim.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.cardGrid}>
        {cards.map((id) => (
          <Animated.View
            key={id}
            entering={selected.entering.duration(500)}
            exiting={selected.exiting.duration(400)}
          >
            <Pressable
              style={[styles.card, { backgroundColor: CARD_COLORS[id % CARD_COLORS.length] }]}
              onPress={() => removeCard(id)}
            >
              <Text style={styles.cardText}>Card {id + 1}</Text>
              <Text style={styles.cardHint}>tap to remove</Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>

      <Pressable style={styles.btn} onPress={addCard}>
        <Text style={styles.btnText}>+ Add Card</Text>
      </Pressable>

      <View style={{ flex: 1 }} />

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>
          FadeIn/Out · SlideInLeft/OutRight · BounceIn/Out{'\n'}
          FlipInXUp/OutXDown · ZoomIn/Out · LightSpeedIn/Out
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
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },
  chipTextActive: {
    color: '#fff',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  card: {
    width: 155,
    height: 90,
    borderRadius: 14,
    padding: 14,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  cardHint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  btn: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    alignSelf: 'flex-start',
  },
  btnText: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
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
