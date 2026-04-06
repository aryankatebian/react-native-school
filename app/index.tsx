import { ScrollView, Text, StyleSheet, Pressable, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4', '#ec4899', '#14b8a6'];

const lessons = [
  {
    href: '/bmi-calculator',
    title: 'Body Mass Index Visualizer',
    description: 'Real-time BMI calculator with animated color block — useSharedValue, useDerivedValue, interpolate, interpolateColor',
  },
  {
    href: '/shared-values',
    title: 'Shared Values & Worklets',
    description: 'Core concept: values shared between JS and UI threads, mutated via .value property',
  },
  {
    href: '/animation-functions',
    title: 'Animation Functions',
    description: 'withTiming, withSpring, withDecay side-by-side — see how each shapes motion differently',
  },
  {
    href: '/entering-exiting',
    title: 'Entering & Exiting',
    description: 'Predefined layout entering/exiting animations: FadeIn, SlideIn, BounceIn, FlipIn, ZoomIn',
  },
  {
    href: '/layout-animations',
    title: 'Layout Animations',
    description: 'Automatic layout transitions when items are added, removed, or reordered',
  },
  {
    href: '/gesture-ball',
    title: 'Gesture-Driven Animation',
    description: 'Drag a ball with Gesture Handler + Reanimated — withSpring snap-back & withDecay inertia',
  },
  {
    href: '/keyframes',
    title: 'Keyframe Animations',
    description: 'Multi-step animation sequences using the Keyframe API — the CSS @keyframes equivalent',
  },
  {
    href: '/css-vs-reanimated',
    title: 'CSS Animations in Reanimated',
    description: 'How CSS transitions, @keyframes, and animation loops map to Reanimated APIs',
  },
  {
    href: '/svg-animations',
    title: 'SVG Animations',
    description: 'Animated progress rings, bar charts, dot grids, and waves — useAnimatedProps on SVG components',
  },
  {
    href: '/blinking-characters',
    title: 'Blinking Characters',
    description: 'Production SVG illustration with 3 characters whose eyes blink independently — useAnimatedProps on SVG',
  },
] as const;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text entering={FadeInUp.duration(600).delay(100)} style={styles.greeting}>
          Reanimated School
        </Animated.Text>
        <Animated.Text entering={FadeInUp.duration(600).delay(250)} style={styles.subtitle}>
          Unlocking Blazing-Fast Animations with Reanimated
        </Animated.Text>

        <View style={styles.divider} />

        {lessons.map((lesson, index) => (
          <Animated.View
            key={lesson.href}
            entering={FadeInDown.duration(500).delay(350 + index * 80)}
          >
            <Link href={lesson.href as any} asChild>
              <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
                <View style={styles.cardRow}>
                  <View style={[styles.badge, { backgroundColor: COLORS[index % COLORS.length] }]}>
                    <Text style={styles.badgeText}>{index + 1}</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{lesson.title}</Text>
                    <Text style={styles.cardDescription}>{lesson.description}</Text>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </View>
              </Pressable>
            </Link>
          </Animated.View>
        ))}

        <View style={{ height: 70 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    backgroundColor: '#f8fafc',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: '#64748b',
    marginBottom: 20,
  },
  arrow: {
    fontSize: 22,
    color: '#cbd5e1',
    fontWeight: '600',
  },
});
