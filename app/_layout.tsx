import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const HEADER_STYLE = {
  backgroundColor: '#0f172a',
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
          headerTintColor: '#f8fafc',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#0f172a' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="bmi-calculator" options={{ title: 'BMI Calculator' }} />
        <Stack.Screen name="shared-values" options={{ title: 'Shared Values' }} />
        <Stack.Screen name="animation-functions" options={{ title: 'Animation Functions' }} />
        <Stack.Screen name="entering-exiting" options={{ title: 'Entering & Exiting' }} />
        <Stack.Screen name="layout-animations" options={{ title: 'Layout Animations' }} />
        <Stack.Screen name="gesture-ball" options={{ title: 'Gesture Ball' }} />
        <Stack.Screen name="keyframes" options={{ title: 'Keyframes' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
