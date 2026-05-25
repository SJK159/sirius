import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Switch,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Colors, Spacing, Radius, Font } from '../../constants/theme';

export default function ProfileScreen() {
  const [biometrics, setBiometrics] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const sections = [
    {
      title: 'Account',
      items: [
        { label: 'Personal Info', icon: '👤', action: 'nav' },
        { label: 'KYC Verification', icon: '🪪', badge: 'Verified', action: 'nav' },
        { label: 'Linked Bank Account', icon: '🏦', action: 'nav' },
      ],
    },
    {
      title: 'Security',
      items: [
        { label: 'Biometric Login', icon: '👆', action: 'toggle', value: biometrics, onToggle: setBiometrics },
        { label: 'Change PIN', icon: '🔑', action: 'nav' },
        { label: 'Active Sessions', icon: '📱', action: 'nav' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Push Notifications', icon: '🔔', action: 'toggle', value: notifications, onToggle: setNotifications },
        { label: 'Dark Mode', icon: '🌙', action: 'toggle', value: darkMode, onToggle: setDarkMode },
        { label: 'Default Currency', icon: '💱', sub: 'USD', action: 'nav' },
      ],
    },
    {
      title: 'About',
      items: [
        { label: 'Terms of Service', icon: '📄', action: 'nav' },
        { label: 'Privacy Policy', icon: '🔒', action: 'nav' },
        { label: 'App Version', icon: 'ℹ️', sub: 'v0.1.0 (shell)', action: 'none' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Avatar Card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>Z</Text>
            <View style={styles.verifiedDot} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Zain Malik</Text>
            <Text style={styles.userHandle}>@zainmalik · zain@email.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Sent', value: '$4,820' },
            { label: 'Received', value: '$17,300' },
            { label: 'Txns', value: '42' },
          ].map((s, i) => (
            <View key={i} style={[styles.stat, i < 2 && styles.statBorder]}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings Sections */}
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item: any, i) => (
                <View key={item.label}>
                  <TouchableOpacity
                    style={styles.row}
                    activeOpacity={item.action === 'nav' ? 0.7 : 1}
                    disabled={item.action !== 'nav'}
                  >
                    <Text style={styles.rowIcon}>{item.icon}</Text>
                    <Text style={styles.rowLabel}>{item.label}</Text>
                    <View style={styles.rowRight}>
                      {item.badge && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>{item.badge}</Text>
                        </View>
                      )}
                      {item.sub && <Text style={styles.rowSub}>{item.sub}</Text>}
                      {item.action === 'toggle' && (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: Colors.cardBorder, true: Colors.accent }}
                          thumbColor={Colors.white}
                          ios_backgroundColor={Colors.cardBorder}
                        />
                      )}
                      {item.action === 'nav' && (
                        <Text style={styles.chevron}>›</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  {i < section.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out */}
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => router.replace('/(auth)')}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: Spacing.lg },
  header: { paddingTop: Spacing.lg, paddingBottom: Spacing.md },
  title: { fontSize: 28, color: Colors.textPrimary, fontWeight: Font.black, letterSpacing: -0.5 },

  avatarCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.card, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.cardBorder,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.accentDim, justifyContent: 'center', alignItems: 'center',
    marginRight: Spacing.md, borderWidth: 2, borderColor: Colors.accent,
  },
  avatarText: { fontSize: 22, fontWeight: Font.black, color: Colors.accent },
  verifiedDot: {
    position: 'absolute', bottom: 0, right: 0,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: Colors.accent, borderWidth: 2, borderColor: Colors.card,
  },
  userInfo: { flex: 1 },
  userName: { fontSize: 17, color: Colors.textPrimary, fontWeight: Font.bold },
  userHandle: { fontSize: 12, color: Colors.textSecondary, marginTop: 3 },
  editBtn: {
    paddingHorizontal: Spacing.md, paddingVertical: 6,
    borderRadius: Radius.sm, borderWidth: 1, borderColor: Colors.cardBorder,
  },
  editBtnText: { fontSize: 13, color: Colors.textSecondary, fontWeight: Font.medium },

  statsRow: {
    flexDirection: 'row', backgroundColor: Colors.card,
    borderRadius: Radius.lg, marginBottom: Spacing.lg,
    borderWidth: 1, borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  stat: { flex: 1, padding: Spacing.md, alignItems: 'center' },
  statBorder: { borderRightWidth: 1, borderRightColor: Colors.cardBorder },
  statValue: { fontSize: 17, color: Colors.textPrimary, fontWeight: Font.bold },
  statLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 3 },

  section: { marginBottom: Spacing.lg },
  sectionTitle: { fontSize: 12, color: Colors.textMuted, fontWeight: Font.semibold, letterSpacing: 0.8, marginBottom: Spacing.sm, textTransform: 'uppercase' },
  sectionCard: { backgroundColor: Colors.card, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.cardBorder, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
  rowIcon: { fontSize: 18, marginRight: Spacing.md, width: 26 },
  rowLabel: { flex: 1, fontSize: 15, color: Colors.textPrimary, fontWeight: Font.medium },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  rowSub: { fontSize: 13, color: Colors.textMuted },
  chevron: { fontSize: 22, color: Colors.textMuted, marginLeft: 4, marginTop: -1 },
  badge: {
    backgroundColor: `${Colors.positive}22`, paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.full, borderWidth: 1, borderColor: `${Colors.positive}44`,
  },
  badgeText: { fontSize: 11, color: Colors.positive, fontWeight: Font.semibold },
  divider: { height: 1, backgroundColor: Colors.cardBorder, marginLeft: 56 },

  signOutBtn: {
    backgroundColor: '#FF4D6D18', borderRadius: Radius.md,
    paddingVertical: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#FF4D6D33',
  },
  signOutText: { fontSize: 15, color: Colors.negative, fontWeight: Font.semibold },
});
