import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, Radius, Font } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Background orbs */}
      <View style={styles.orbTop} />
      <View style={styles.orbBottom} />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo mark */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoRing}>
            <View style={styles.logoDot} />
          </View>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>StablePay</Text>
        <Text style={styles.tagline}>Your money, stable & borderless.</Text>

        {/* Stablecoin badges */}
        <View style={styles.badges}>
          {['USDC', 'USDT', 'DAI'].map((coin) => (
            <View key={coin} style={styles.badge}>
              <Text style={styles.badgeText}>{coin}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom CTAs */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnPrimaryText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.7}
        >
          <Text style={styles.btnSecondaryText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
  },
  orbTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: Colors.accent,
    opacity: 0.08,
  },
  orbBottom: {
    position: 'absolute',
    bottom: 100,
    left: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.accentSecondary,
    opacity: 0.08,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    marginBottom: Spacing.xl,
  },
  logoRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
  },
  headline: {
    fontSize: 42,
    fontWeight: Font.black,
    color: Colors.textPrimary,
    letterSpacing: -1.5,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: 16,
    fontWeight: Font.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  badges: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.card,
  },
  badgeText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: Font.semibold,
    letterSpacing: 0.5,
  },
  actions: {
    paddingBottom: 48,
    gap: Spacing.md,
  },
  btnPrimary: {
    backgroundColor: Colors.accent,
    paddingVertical: 18,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: Font.bold,
    letterSpacing: 0.3,
  },
  btnSecondary: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  btnSecondaryText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: Font.medium,
  },
});
