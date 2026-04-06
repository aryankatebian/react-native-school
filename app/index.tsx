import { ScrollView, Text, StyleSheet, Pressable, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const lessons = [
  {
    href: '/bmi-calculator',
    emoji: '⚖️',
    title: 'BMI Calculator',
    description: 'The full example: useSharedValue, useDerivedValue, useAnimatedStyle, useAnimatedProps, interpolate, interpolateColor, withTiming',
  },
  {
    href: '/shared-values',
    emoji: '🔗',
    title: 'Shared Values & Worklets',
    description: 'Core concept: values shared between JS and UI threads, mutated via .value property',
  },
  {
    href: '/animation-functions',
    emoji: '🎯',
    title: 'Animation Functions',
    description: 'withTiming, withSpring, withDecay side-by-side — see how each shapes motion differently',
  },
  {
    href: '/entering-exiting',
    emoji: '🎭',
    title: 'Entering & Exiting',
    description: 'Predefined layout entering/exiting animations: FadeIn, SlideIn, BounceIn, FlipIn, ZoomIn',
  },
  {
    href: '/layout-animations',
    emoji: '📐',
    title: 'Layout Animations',
    description: 'Automatic layout transitions when items are added, removed, or reordered',
  },
  {
    href: '/gesture-ball',
    emoji: '👆',
    title: 'Gesture-Driven Animation',
    description: 'Drag a ball with Gesture Handler + Reanimated — withSpring snap-back & withDecay inertia',
  },
  {
    href: '/keyframes',
    emoji: '🎬',
    title: 'Keyframe Animations',
    description: 'Multi-step animation sequences using the Keyframe API — the CSS @keyframes equivalent',
  },
] as const;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.Text entering={FadeInUp.duration(600).delay(100)} style={styles.greeting}>
          React Native School
        </Animated.Text>
        <Animated.Text entering={FadeInUp.duration(600).delay(250)} style={styles.subtitle}>
          Unlocking Blazing-Fast Animations with Reanimated
        </Animated.Text>

        <View style={styles.divider} />

        {lessons.map((lesson, index) => (
          <Animated.View
            key={lesson.href}
            entering={FadeInDown.duration(500).delay(350 + index * 100)}
          >
            <Link href={lesson.href as any} asChild>
              <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
                <Text style={styles.cardEmoji}>{lesson.emoji}</Text>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{lesson.title}</Text>
                  <Text style={styles.cardDescription}>{lesson.description}</Text>
                </View>
              </Pressable>
            </Link>
          </Animated.View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#1e293b',
    marginVertical: 24,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardPressed: {
    backgroundColor: '#334155',
  },
  cardEmoji: {
    fontSize: 28,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: '#94a3b8',
  },
});
