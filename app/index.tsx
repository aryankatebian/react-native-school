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
] as const;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
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
                <View style={[styles.badge, { backgroundColor: COLORS[index % COLORS.length] }]}>
                  <Text style={styles.badgeText}>{index + 1}</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{lesson.title}</Text>
                  <Text style={styles.cardDescription}>{lesson.description}</Text>
                </View>
              </Pressable>
            </Link>
          </Animated.View>
        ))}

        <View style={{ height: 60 }} />
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
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
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
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardPressed: {
    backgroundColor: '#334155',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
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
    fontSize: 17,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 3,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#e2e8f0',
  },
});
