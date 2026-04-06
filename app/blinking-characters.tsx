import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useId } from 'react';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Circle, Defs, G, Mask, Path, Rect, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const BLINK_DURATION = 120;
const BLINK_INTERVAL_MIN = 2000;
const BLINK_INTERVAL_MAX = 5000;

function randomBlinkDelay() {
  return BLINK_INTERVAL_MIN + Math.random() * (BLINK_INTERVAL_MAX - BLINK_INTERVAL_MIN);
}

function WelcomeIllustration() {
  const id = useId().replace(/:/g, '');
  const blink1 = useSharedValue(1);
  const blink2 = useSharedValue(1);
  const blink3 = useSharedValue(1);

  useEffect(() => {
    blink1.value = withRepeat(
      withSequence(
        withDelay(randomBlinkDelay(), withSequence(
          withTiming(0, { duration: BLINK_DURATION }),
          withTiming(1, { duration: BLINK_DURATION }),
        )),
      ), -1,
    );
  }, [blink1]);

  useEffect(() => {
    blink2.value = withRepeat(
      withSequence(
        withDelay(randomBlinkDelay(), withSequence(
          withTiming(0, { duration: BLINK_DURATION }),
          withTiming(1, { duration: BLINK_DURATION }),
        )),
      ), -1,
    );
  }, [blink2]);

  useEffect(() => {
    blink3.value = withRepeat(
      withSequence(
        withDelay(randomBlinkDelay(), withSequence(
          withTiming(0, { duration: BLINK_DURATION }),
          withTiming(1, { duration: BLINK_DURATION }),
        )),
      ), -1,
    );
  }, [blink3]);

  const blinkProps1 = useAnimatedProps(() => ({ fillOpacity: blink1.value }));
  const blinkProps2 = useAnimatedProps(() => ({ fillOpacity: blink2.value }));
  const blinkProps3 = useAnimatedProps(() => ({ fillOpacity: blink3.value }));

  return (
    <Svg fill="none" height={212} viewBox="0 0 212 212" width={212}>
      <Defs>
        <Mask height={13} id={`mask0_${id}`} maskUnits="userSpaceOnUse" width={12} x={18} y={173}>
          <Rect fill="white" height={11.3615} rx={5.68075} transform="rotate(90 29.625 173.742)" width={11.3615} x={29.625} y={173.742} />
        </Mask>
        <Mask height={13} id={`mask1_${id}`} maskUnits="userSpaceOnUse" width={12} x={34} y={173}>
          <Rect fill="white" height={11.3615} rx={5.68075} transform="rotate(90 45.7305 173.742)" width={11.3615} x={45.7305} y={173.742} />
        </Mask>
        <Mask height={13} id={`mask2_${id}`} maskUnits="userSpaceOnUse" width={12} x={92} y={25}>
          <Rect fill="white" height={11.3613} rx={5.68066} transform="rotate(90 103.633 25.7422)" width={11.3613} x={103.633} y={25.7422} />
        </Mask>
        <Mask height={13} id={`mask3_${id}`} maskUnits="userSpaceOnUse" width={12} x={108} y={25}>
          <Rect fill="white" height={11.3613} rx={5.68066} transform="rotate(90 119.738 25.7422)" width={11.3613} x={119.738} y={25.7422} />
        </Mask>
        <Mask height={13} id={`mask4_${id}`} maskUnits="userSpaceOnUse" width={12} x={166} y={173}>
          <Rect fill="white" height={11.3618} rx={5.6809} transform="rotate(90 177.629 173.742)" width={11.3618} x={177.629} y={173.742} />
        </Mask>
        <Mask height={13} id={`mask5_${id}`} maskUnits="userSpaceOnUse" width={12} x={182} y={173}>
          <Rect fill="white" height={11.3618} rx={5.6809} transform="rotate(90 193.738 173.742)" width={11.3618} x={193.738} y={173.742} />
        </Mask>
      </Defs>

      <Path d="M64.0039 64.0039L48.7639 64.0039C40.347 64.0039 33.5238 57.1807 33.5238 48.7639C33.5238 40.347 40.347 33.5238 48.7639 33.5238C57.1807 33.5238 64.0039 40.347 64.0039 48.7639L64.0039 64.0039Z" fill="#235C59" />
      <Path d="M30.4805 48.7639C30.4805 57.1807 23.6573 64.0039 15.2404 64.0039L0.000400543 64.0039L0.000401876 48.7639C0.000402611 40.347 6.8236 33.5238 15.2404 33.5238C23.6573 33.5238 30.4805 40.347 30.4805 48.7639Z" fill="#235C59" />
      <Path d="M64.0039 15.2404C64.0039 23.6573 57.1807 30.4805 48.7639 30.4805C40.347 30.4805 33.5238 23.6573 33.5238 15.2404C33.5238 6.8236 40.347 0.000398475 48.7639 0.000399211L64.0039 0.000400543L64.0039 15.2404Z" fill="#235C59" />
      <Path d="M30.4805 15.2411C30.4805 23.6576 23.6569 30.4805 15.2404 30.4805C6.82322 30.4805 -0.000942827 23.657 -0.000943563 15.2398L-0.000944895 0.00174026L15.2411 0.00173893C23.6576 0.00173819 30.4805 6.82463 30.4805 15.2411Z" fill="#235C59" />
      <Path d="M32 58.9961L8.61731 45.4961L8.61732 18.4961L32 4.99609L55.3827 18.4961L55.3827 45.4961L32 58.9961Z" fill="#D7FA18" />
      <Rect fill="#B5D1D2" height={24} transform="rotate(135 49 31.9961)" width={24} x={49} y={31.9961} />
      <Path d="M27.332 32H36.6662" stroke="#02403D" strokeLinecap="square" strokeLinejoin="round" strokeWidth={1.33596} />
      <Path d="M30.4766 104.48L0.00127029 104.48L0.00126763 74.0052L22.4766 74.0052C26.8948 74.0052 30.4766 77.5869 30.4766 82.0052L30.4766 104.48Z" fill="#235C59" />
      <Path d="M30.4766 130C30.4766 134.418 26.8948 138 22.4766 138L0.00127029 138L0.00126763 107.525L30.4766 107.525L30.4766 130Z" fill="#235C59" />
      <Path d="M64 104.48L33.5247 104.48L33.5247 82.0052C33.5247 77.5869 37.1064 74.0052 41.5247 74.0052L64 74.0052L64 104.48Z" fill="#235C59" />
      <Path d="M64 138L41.5247 138C37.1064 138 33.5247 134.418 33.5247 130L33.5247 107.525L64 107.525L64 138Z" fill="#235C59" />
      <Rect fill="#D7FA18" height={40} transform="rotate(180 52 126.004)" width={40} x={52} y={126.004} />
      <Rect fill="#B5D1D2" height={30} rx={15} transform="rotate(90 47 91.0039)" width={30} x={47} y={91.0039} />
      <Path d="M27.332 106.004H36.6651" stroke="#02403D" strokeLinecap="square" strokeLinejoin="round" strokeWidth={1.33596} />
      <Path d="M32 101.336V110.669" stroke="#02403D" strokeLinecap="square" strokeLinejoin="round" strokeWidth={1.33596} />
      <Rect fill="#D0F814" height={63.9983} rx={12.7997} width={63.9983} y={148} />
      <Rect fill="#A9CACB" height={38.6866} rx={7.19082} transform="rotate(135 59.3945 180)" width={38.6866} x={59.3945} y={180} />

      {/* Character 1 eyes */}
      <AnimatedCircle animatedProps={blinkProps1} cx={23.9449} cy={179.402} fill="white" r={5.65971} />
      <G mask={`url(#mask0_${id})`}>
        <AnimatedPath animatedProps={blinkProps1} d="M26.1035 171.371C28.4863 171.371 30.418 173.303 30.418 175.686C30.418 178.068 28.4863 180 26.1035 180C23.7206 180 21.789 178.068 21.789 175.686C21.789 173.303 23.7206 171.371 26.1035 171.371Z" fill="#213A39" />
      </G>
      <AnimatedCircle animatedProps={blinkProps1} cx={40.0503} cy={179.402} fill="white" r={5.65971} />
      <G mask={`url(#mask1_${id})`}>
        <AnimatedRect animatedProps={blinkProps1} fill="#213A39" height={8.62898} rx={4.31449} transform="rotate(90 46.5234 171.371)" width={8.62899} x={46.5234} y={171.371} />
      </G>
      <Path d="M31.9981 193.732C29.6153 193.732 27.6836 191.801 27.6836 189.418" stroke="#213A39" strokeLinecap="round" strokeWidth={1.43816} />

      {/* Character 2 */}
      <Rect fill="#D0F814" height={63.9973} rx={12.7995} width={63.9973} x={74.0039} />
      <Path d="M128.582 54.6523L83.2805 54.6523L83.2805 32.0016C83.2805 19.4919 93.4216 9.35086 105.931 9.35086C118.441 9.35086 128.582 19.4919 128.582 32.0016L128.582 54.6523Z" fill="#A9CACB" />
      <AnimatedCircle animatedProps={blinkProps2} cx={97.9487} cy={31.4018} fill="white" r={5.65962} />
      <G mask={`url(#mask2_${id})`}>
        <AnimatedPath animatedProps={blinkProps2} d="M97.9512 30.7031C100.334 30.7031 102.266 32.6348 102.266 35.0176C102.266 37.4003 100.334 39.332 97.9512 39.332C95.5684 39.332 93.6368 37.4003 93.6368 35.0176C93.6368 32.6348 95.5684 30.7031 97.9512 30.7031Z" fill="#213A39" />
      </G>
      <AnimatedCircle animatedProps={blinkProps2} cx={114.054} cy={31.4018} fill="white" r={5.65962} />
      <G mask={`url(#mask3_${id})`}>
        <AnimatedRect animatedProps={blinkProps2} fill="#213A39" height={8.62885} rx={4.31443} transform="rotate(90 118.371 30.7031)" width={8.62886} x={118.371} y={30.7031} />
      </G>
      <Path d="M110.318 41.418C110.318 43.8008 108.387 45.7324 106.004 45.7324" stroke="#213A39" strokeLinecap="round" strokeWidth={1.43814} />
      <Circle cx={89.2634} cy={89.2478} fill="#235C59" r={15.24} />
      <Circle cx={122.763} cy={89.2478} fill="#235C59" r={15.24} />
      <Circle cx={89.2634} cy={122.748} fill="#235C59" r={15.24} />
      <Circle cx={122.763} cy={122.748} fill="#235C59" r={15.24} />
      <Rect fill="#D7FA18" height={40} transform="rotate(135 134.273 106.008)" width={40} x={134.273} y={106.008} />
      <Rect fill="#B5D1D2" height={30} rx={15} transform="rotate(90 121.023 91.0078)" width={30} x={121.023} y={91.0078} />
      <Path d="M106.074 99.3984V112.731" stroke="#02403D" strokeLinejoin="round" strokeWidth={1.34} />
      <Path d="M109.407 101.398H104.407C103.789 101.398 103.195 101.644 102.758 102.082C102.32 102.519 102.074 103.113 102.074 103.732C102.074 104.35 102.32 104.944 102.758 105.382C103.195 105.819 103.789 106.065 104.407 106.065H107.741C108.359 106.065 108.953 106.311 109.39 106.748C109.828 107.186 110.074 107.779 110.074 108.398C110.074 109.017 109.828 109.61 109.39 110.048C108.953 110.486 108.359 110.731 107.741 110.731H102.074" stroke="#02403D" strokeLinejoin="round" strokeWidth={1.34} />
      <Path d="M138.008 212L122.768 212C114.351 212 107.528 205.177 107.528 196.76C107.528 188.343 114.351 181.52 122.768 181.52C131.185 181.52 138.008 188.343 138.008 196.76L138.008 212Z" fill="#235C59" />
      <Path d="M104.484 196.76C104.484 205.177 97.6612 212 89.2443 212L74.0043 212L74.0043 196.76C74.0043 188.343 80.8275 181.52 89.2443 181.52C97.6612 181.52 104.484 188.343 104.484 196.76Z" fill="#235C59" />
      <Path d="M138.008 163.237C138.008 171.653 131.185 178.477 122.768 178.477C114.351 178.477 107.528 171.653 107.528 163.237C107.528 154.82 114.351 147.996 122.768 147.996L138.008 147.996L138.008 163.237Z" fill="#235C59" />
      <Path d="M104.484 163.237C104.484 171.654 97.6608 178.477 89.2443 178.477C80.8271 178.477 74.003 171.653 74.003 163.236L74.003 147.998L89.245 147.998C97.6615 147.998 104.484 154.821 104.484 163.237Z" fill="#235C59" />
      <Path d="M106.004 206.996L82.6212 193.496L82.6212 166.496L106.004 152.996L129.387 166.496L129.387 193.496L106.004 206.996Z" fill="#D7FA18" />
      <Rect fill="#B5D1D2" height={30} rx={15} transform="rotate(90 121.004 164.996)" width={30} x={121.004} y={164.996} />
      <Path d="M103.977 181.216L102.268 182.925H108.977C109.43 182.925 109.864 182.744 110.185 182.424C110.505 182.103 110.685 181.669 110.686 181.216V180.621H112.025V181.216C112.025 182.024 111.705 182.8 111.133 183.372C110.561 183.944 109.785 184.265 108.977 184.265H102.268L103.977 185.974L103.029 186.921L99.7031 183.595L103.029 180.269L103.977 181.216ZM112.303 176.458L109.45 179.311L108.503 178.363L109.738 177.128H103.029C102.576 177.128 102.142 177.308 101.821 177.629C101.501 177.949 101.32 178.384 101.32 178.837V179.432H99.9805V178.837C99.9805 178.028 100.301 177.252 100.873 176.681C101.445 176.109 102.221 175.788 103.029 175.788H109.738L108.503 174.553L109.45 173.605L112.303 176.458Z" fill="#02403D" />
      <Path d="M178.48 30.4766L148.005 30.4766L148.005 0.00126533L170.48 0.00126336C174.899 0.00126298 178.48 3.58298 178.48 8.00126L178.48 30.4766Z" fill="#235C59" />
      <Path d="M178.48 55.9961C178.48 60.4144 174.899 63.9961 170.48 63.9961L148.005 63.9961L148.005 33.5208L178.48 33.5208L178.48 55.9961Z" fill="#235C59" />
      <Path d="M212.004 30.4766L181.529 30.4766L181.529 8.00127C181.529 3.583 185.11 0.00127074 189.529 0.00127035L212.004 0.00126839L212.004 30.4766Z" fill="#235C59" />
      <Path d="M212.004 63.9961L189.529 63.9961C185.11 63.9961 181.529 60.4144 181.529 55.9961L181.529 33.5208L212.004 33.5208L212.004 63.9961Z" fill="#235C59" />
      <Path d="M180.004 59L156.621 45.5L156.621 18.5L180.004 5L203.387 18.5L203.387 45.5L180.004 59Z" fill="#D7FA18" />
      <Rect fill="#B5D1D2" height={30} rx={15} transform="rotate(90 195.004 17)" width={30} x={195.004} y={17} />
      <Path d="M183.752 29.1403L184.225 28.668L183.28 27.7233L182.808 28.1956L183.28 28.668L183.752 29.1403ZM176.141 34.8623C175.88 35.1232 175.88 35.5461 176.141 35.807C176.402 36.0679 176.825 36.0679 177.086 35.807L176.613 35.3346L176.141 34.8623ZM183.28 28.668L182.808 28.1956L176.141 34.8623L176.613 35.3346L177.086 35.807L183.752 29.1403L183.28 28.668Z" fill="#02403D" />
      <Path d="M183.28 35.3346H176.613V28.668" stroke="#02403D" strokeLinecap="square" strokeWidth={1.336} />
      <Path d="M212.004 138L196.765 138C188.349 138 181.527 131.177 181.527 122.762C181.527 114.346 188.349 107.523 196.765 107.523C205.181 107.523 212.004 114.346 212.004 122.762L212.004 138Z" fill="#235C59" />
      <Path d="M178.48 122.762C178.48 131.177 171.658 138 163.242 138L148.004 138L148.004 122.762C148.004 114.346 154.826 107.523 163.242 107.523C171.658 107.523 178.48 114.346 178.48 122.762Z" fill="#235C59" />
      <Path d="M212.004 89.2342C212.004 97.6501 205.181 104.473 196.765 104.473C188.349 104.473 181.527 97.6502 181.527 89.2342C181.527 80.8182 188.349 73.9957 196.765 73.9957L212.004 73.9957L212.004 89.2342Z" fill="#235C59" />
      <Path d="M178.48 89.2342C178.48 97.6502 171.658 104.473 163.242 104.473C154.826 104.473 148.004 97.6502 148.004 89.2342L148.004 73.9957L163.242 73.9957C171.658 73.9957 178.48 80.8182 178.48 89.2342Z" fill="#235C59" />
      <Rect fill="#D7FA18" height={40} transform="rotate(180 200.004 125.996)" width={40} x={200.004} y={125.996} />
      <Rect fill="#B5D1D2" height={30} rx={15} transform="rotate(90 195.004 90.9961)" width={30} x={195.004} y={90.9961} />
      <Path d="M183.339 102.668L176.672 109.335" stroke="#02403D" strokeLinejoin="round" strokeWidth={1.336} />
      <Path d="M183.339 109.335H176.672V102.668" stroke="#02403D" strokeWidth={1.336} />
      <Rect fill="#D0F814" height={64} rx={12.8} width={64} x={148.004} y={148} />
      <Path d="M202.656 180.001C202.656 192.511 192.515 202.652 180.005 202.652C167.494 202.652 157.353 192.511 157.353 180.001C157.353 167.49 167.494 157.349 180.005 157.349L202.656 157.349L202.656 180.001Z" fill="#A9CACB" />

      {/* Character 3 eyes */}
      <AnimatedCircle animatedProps={blinkProps3} cx={171.949} cy={179.402} fill="white" r={5.65986} />
      <G mask={`url(#mask4_${id})`}>
        <AnimatedPath animatedProps={blinkProps3} d="M167.635 175.109C170.018 175.109 171.949 177.041 171.949 179.424C171.949 181.807 170.018 183.739 167.635 183.739C165.252 183.739 163.32 181.807 163.32 179.424C163.32 177.041 165.252 175.109 167.635 175.109Z" fill="#213A39" />
      </G>
      <AnimatedCircle animatedProps={blinkProps3} cx={188.058} cy={179.402} fill="white" r={5.65986} />
      <G mask={`url(#mask5_${id})`}>
        <AnimatedRect animatedProps={blinkProps3} fill="#213A39" height={8.62921} rx={4.31461} transform="rotate(90 188.059 175.109)" width={8.62921} x={188.059} y={175.109} />
      </G>
      <Path d="M184.317 189.422C184.317 191.805 182.385 193.736 180.002 193.736C177.619 193.736 175.688 191.805 175.688 189.422" stroke="#213A39" strokeLinecap="round" strokeWidth={1.4382} />
    </Svg>
  );
}

export default function BlinkingCharacters() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Blinking Characters</Text>
      <Text style={styles.sub}>
        Three characters with independently animated blinking eyes — a real production SVG from our app.
      </Text>

      <View style={styles.illustrationCard}>
        <View style={styles.illustrationWrapper}>
          <WelcomeIllustration />
        </View>
        <Text style={styles.watchHint}>Watch their eyes — each character blinks independently</Text>
      </View>

      <View style={styles.codeBox}>
        <Text style={styles.codeTitle}>How it works</Text>
        <Text style={styles.code}>
{`// Each character has its own blink shared value
const blink = useSharedValue(1);

// Random delay between blinks (2-5s)
blink.value = withRepeat(
  withSequence(
    withDelay(randomDelay(),
      withSequence(
        withTiming(0, { duration: 80 }),  // close
        withTiming(1, { duration: 80 }),  // open
      )),
  ), -1  // infinite
);

// Animate fillOpacity on SVG Circle/Path
const blinkProps = useAnimatedProps(() => ({
  fillOpacity: blink.value,
}));`}
        </Text>
      </View>

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>APIs Used</Text>
        <Text style={styles.apiText}>
          useAnimatedProps · useSharedValue · withRepeat{'\n'}
          withSequence · withDelay · withTiming{'\n'}
          Animated SVG Circle/Path/Rect fillOpacity
        </Text>
      </View>
    </ScrollView>
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
  illustrationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  illustrationWrapper: {
    marginBottom: 16,
  },
  watchHint: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '600',
    textAlign: 'center',
  },
  codeBox: {
    backgroundColor: '#f8fafc',
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
    fontSize: 11,
    color: '#1e40af',
    lineHeight: 17,
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
