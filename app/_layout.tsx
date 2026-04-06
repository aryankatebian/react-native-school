import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const HEADER_STYLE = {
  backgroundColor: '#f1f5f9',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: HEADER_STYLE,
          headerTintColor: '#0f172a',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#f1f5f9' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="bmi-calculator" options={{ title: 'Body Mass Index Visualizer' }} />
        <Stack.Screen name="shared-values" options={{ title: 'Shared Values' }} />
        <Stack.Screen name="animation-functions" options={{ title: 'Animation Functions' }} />
        <Stack.Screen name="entering-exiting" options={{ title: 'Entering & Exiting' }} />
        <Stack.Screen name="layout-animations" options={{ title: 'Layout Animations' }} />
        <Stack.Screen name="gesture-ball" options={{ title: 'Gesture Ball' }} />
        <Stack.Screen name="keyframes" options={{ title: 'Keyframes' }} />
        <Stack.Screen name="css-vs-reanimated" options={{ title: 'CSS Animations' }} />
        <Stack.Screen name="svg-animations" options={{ title: 'SVG Animations' }} />
        <Stack.Screen name="blinking-characters" options={{ title: 'Blinking Characters' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
