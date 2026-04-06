import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Animated.Text
          entering={FadeInUp.duration(800).delay(200)}
          style={styles.greeting}
        >
          Welcome to
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.duration(800).delay(400)}
          style={styles.title}
        >
          React Native School
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.duration(800).delay(600)}
          style={styles.subtitle}
        >
          Learn to build beautiful, animated mobile apps with React Native &
          Reanimated.
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.duration(800).delay(900)}
          style={styles.card}
        >
          <Text style={styles.cardEmoji}>🚀</Text>
          <Text style={styles.cardTitle}>Getting Started</Text>
          <Text style={styles.cardDescription}>
            Edit app/index.tsx to start building your first lesson.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(1100)}
          style={styles.card}
        >
          <Text style={styles.cardEmoji}>✨</Text>
          <Text style={styles.cardTitle}>Reanimated</Text>
          <Text style={styles.cardDescription}>
            Smooth 60fps animations powered by react-native-reanimated.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  greeting: {
    fontSize: 18,
    color: '#94a3b8',
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#f8fafc',
    marginTop: 4,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#64748b',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#94a3b8',
  },
});
