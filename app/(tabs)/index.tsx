import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, Spacing, Radius, Font } from '../../constants/theme';

const MOCK_BALANCE = '12,480.50';

const MOCK_COINS = [
  { symbol: 'USDC', name: 'USD Coin', amount: '8,200.00', change: '+0.01%', color: '#2775CA' },
  { symbol: 'USDT', name: 'Tether', amount: '3,500.00', change: '0.00%', color: '#26A17B' },
  { symbol: 'DAI', name: 'Dai', amount: '780.50', change: '-0.02%', color: '#F5AC37' },
];

const MOCK_ACTIVITY = [
  { label: 'Received USDC', sub: 'From Ahmed R.', amount: '+500.00', time: '2m ago', positive: true },
  { label: 'Sent USDT', sub: 'To Sara K.', amount: '-120.00', time: '1h ago', positive: false },
  { label: 'On-ramp', sub: 'Bank transfer', amount: '+1,000.00', time: 'Yesterday', positive: true },
  { label: 'Sent DAI', sub: 'To Bilal M.', amount: '-250.00', time: 'Yesterday', positive: false },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.username}>Zain 👋</Text>
          </View>
          <View style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.cardGlow} />
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>${MOCK_BALANCE}</Text>
          <Text style={styles.balanceSub}>Stablecoins · USD equivalent</Text>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            {[
              { icon: '↑', label: 'Send' },
              { icon: '↓', label: 'Receive' },
              { icon: '+', label: 'Add' },
              { icon: '⇄', label: 'Swap' },
            ].map((action) => (
              <TouchableOpacity key={action.label} style={styles.actionBtn} activeOpacity={0.75}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>{action.icon}</Text>
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stablecoin Holdings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Holdings</Text>
          {MOCK_COINS.map((coin) => (
            <TouchableOpacity key={coin.symbol} style={styles.coinRow} activeOpacity={0.8}>
              <View style={[styles.coinDot, { backgroundColor: coin.color }]} />
              <View style={styles.coinInfo}>
                <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                <Text style={styles.coinName}>{coin.name}</Text>
              </View>
              <View style={styles.coinRight}>
                <Text style={styles.coinAmount}>${coin.amount}</Text>
                <Text style={[
                  styles.coinChange,
                  { color: coin.change.startsWith('+') ? Colors.positive : coin.change.startsWith('-') ? Colors.negative : Colors.textMuted }
                ]}>{coin.change}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {MOCK_ACTIVITY.map((tx, i) => (
            <View key={i} style={styles.txRow}>
              <View style={[styles.txIcon, { backgroundColor: tx.positive ? Colors.accentDim : '#FF4D6D18' }]}>
                <Text style={{ color: tx.positive ? Colors.positive : Colors.negative, fontSize: 16 }}>
                  {tx.positive ? '↓' : '↑'}
                </Text>
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txLabel}>{tx.label}</Text>
                <Text style={styles.txSub}>{tx.sub} · {tx.time}</Text>
              </View>
              <Text style={[styles.txAmount, { color: tx.positive ? Colors.positive : Colors.textPrimary }]}>
                {tx.positive ? tx.amount : tx.amount} USDC
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: Spacing.lg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  greeting: { fontSize: 13, color: Colors.textSecondary, fontWeight: Font.medium },
  username: { fontSize: 22, color: Colors.textPrimary, fontWeight: Font.bold, marginTop: 2 },
  notifBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: Colors.card,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.cardBorder,
  },
  notifIcon: { fontSize: 16 },

  balanceCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute', top: -60, right: -40,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: Colors.accent, opacity: 0.06,
  },
  balanceLabel: { fontSize: 13, color: Colors.textSecondary, fontWeight: Font.medium, marginBottom: 6 },
  balanceAmount: { fontSize: 38, color: Colors.textPrimary, fontWeight: Font.black, letterSpacing: -1, marginBottom: 4 },
  balanceSub: { fontSize: 12, color: Colors.textMuted, marginBottom: Spacing.lg },

  quickActions: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { alignItems: 'center', gap: 6 },
  actionIcon: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: Colors.accentDim,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: `${Colors.accent}33`,
  },
  actionIconText: { fontSize: 20, color: Colors.accent, fontWeight: Font.bold },
  actionLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: Font.medium },

  section: { marginBottom: Spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionTitle: { fontSize: 17, color: Colors.textPrimary, fontWeight: Font.semibold, marginBottom: Spacing.md },
  seeAll: { fontSize: 13, color: Colors.accent, fontWeight: Font.medium },

  coinRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md, padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.cardBorder,
  },
  coinDot: { width: 10, height: 10, borderRadius: 5, marginRight: Spacing.md },
  coinInfo: { flex: 1 },
  coinSymbol: { fontSize: 15, color: Colors.textPrimary, fontWeight: Font.semibold },
  coinName: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  coinRight: { alignItems: 'flex-end' },
  coinAmount: { fontSize: 15, color: Colors.textPrimary, fontWeight: Font.semibold },
  coinChange: { fontSize: 12, marginTop: 2 },

  txRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 1, borderBottomColor: Colors.cardBorder,
  },
  txIcon: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md,
  },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 14, color: Colors.textPrimary, fontWeight: Font.medium },
  txSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: Font.semibold },
});
