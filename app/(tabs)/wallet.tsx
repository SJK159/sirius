import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Colors, Spacing, Radius, Font } from '../../constants/theme';

const COINS = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    amount: '8,200.00',
    usd: '8,200.00',
    color: '#2775CA',
    chain: 'Ethereum',
    pct: 66,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    amount: '3,500.00',
    usd: '3,500.00',
    color: '#26A17B',
    chain: 'Polygon',
    pct: 28,
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    amount: '780.50',
    usd: '780.50',
    color: '#F5AC37',
    chain: 'Ethereum',
    pct: 6,
  },
];

export default function WalletScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Wallet</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Allocation Bar */}
        <View style={styles.allocationCard}>
          <Text style={styles.cardLabel}>Allocation</Text>
          <View style={styles.bar}>
            {COINS.map((c) => (
              <View
                key={c.symbol}
                style={[styles.barSegment, { flex: c.pct, backgroundColor: c.color }]}
              />
            ))}
          </View>
          <View style={styles.legend}>
            {COINS.map((c) => (
              <View key={c.symbol} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: c.color }]} />
                <Text style={styles.legendText}>{c.symbol} {c.pct}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Coin Cards */}
        <Text style={styles.sectionTitle}>Your Stablecoins</Text>
        {COINS.map((coin) => (
          <TouchableOpacity key={coin.symbol} style={styles.coinCard} activeOpacity={0.8}>
            {/* Color accent strip */}
            <View style={[styles.coinStrip, { backgroundColor: coin.color }]} />

            <View style={styles.coinCardInner}>
              <View style={styles.coinCardTop}>
                <View>
                  <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                  <Text style={styles.coinName}>{coin.name}</Text>
                </View>
                <View style={styles.chainBadge}>
                  <Text style={styles.chainText}>{coin.chain}</Text>
                </View>
              </View>

              <View style={styles.coinCardBottom}>
                <View>
                  <Text style={styles.coinLabel}>Balance</Text>
                  <Text style={styles.coinAmount}>${coin.amount}</Text>
                </View>
                <View style={styles.coinActions}>
                  <TouchableOpacity style={styles.miniBtn}>
                    <Text style={styles.miniBtnText}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.miniBtn, styles.miniBtnOutline]}>
                    <Text style={styles.miniBtnOutlineText}>Receive</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Wallet Address */}
        <View style={styles.addressCard}>
          <Text style={styles.cardLabel}>Your Wallet Address</Text>
          <Text style={styles.address}>0x4f8A...3c9D</Text>
          <TouchableOpacity style={styles.copyBtn}>
            <Text style={styles.copyBtnText}>Copy Address</Text>
          </TouchableOpacity>
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
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: Spacing.lg, paddingBottom: Spacing.md,
  },
  title: { fontSize: 28, color: Colors.textPrimary, fontWeight: Font.black, letterSpacing: -0.5 },
  addBtn: {
    backgroundColor: Colors.accentDim, paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2, borderRadius: Radius.full,
    borderWidth: 1, borderColor: `${Colors.accent}44`,
  },
  addBtnText: { color: Colors.accent, fontWeight: Font.semibold, fontSize: 13 },

  allocationCard: {
    backgroundColor: Colors.card, borderRadius: Radius.lg,
    padding: Spacing.lg, marginBottom: Spacing.lg,
    borderWidth: 1, borderColor: Colors.cardBorder,
  },
  cardLabel: { fontSize: 13, color: Colors.textSecondary, fontWeight: Font.medium, marginBottom: Spacing.md },
  bar: {
    flexDirection: 'row', height: 8, borderRadius: 4,
    overflow: 'hidden', marginBottom: Spacing.md, gap: 2,
  },
  barSegment: { borderRadius: 4 },
  legend: { flexDirection: 'row', gap: Spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: Colors.textSecondary, fontWeight: Font.medium },

  sectionTitle: {
    fontSize: 17, color: Colors.textPrimary, fontWeight: Font.semibold, marginBottom: Spacing.md,
  },
  coinCard: {
    backgroundColor: Colors.card, borderRadius: Radius.lg,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.cardBorder,
    overflow: 'hidden', flexDirection: 'row',
  },
  coinStrip: { width: 4 },
  coinCardInner: { flex: 1, padding: Spacing.md },
  coinCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  coinSymbol: { fontSize: 18, color: Colors.textPrimary, fontWeight: Font.bold },
  coinName: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  chainBadge: {
    backgroundColor: Colors.surface, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.cardBorder,
  },
  chainText: { fontSize: 11, color: Colors.textMuted, fontWeight: Font.medium },
  coinCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  coinLabel: { fontSize: 11, color: Colors.textSecondary, marginBottom: 2 },
  coinAmount: { fontSize: 22, color: Colors.textPrimary, fontWeight: Font.black, letterSpacing: -0.5 },
  coinActions: { flexDirection: 'row', gap: Spacing.sm },
  miniBtn: {
    backgroundColor: Colors.accent, paddingHorizontal: Spacing.md,
    paddingVertical: 7, borderRadius: Radius.sm,
  },
  miniBtnText: { color: Colors.background, fontSize: 12, fontWeight: Font.bold },
  miniBtnOutline: {
    backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.cardBorder,
  },
  miniBtnOutlineText: { color: Colors.textSecondary, fontSize: 12, fontWeight: Font.medium },

  addressCard: {
    backgroundColor: Colors.card, borderRadius: Radius.lg,
    padding: Spacing.lg, borderWidth: 1, borderColor: Colors.cardBorder,
    alignItems: 'center', marginTop: Spacing.sm,
  },
  address: {
    fontSize: 18, color: Colors.textPrimary, fontWeight: Font.semibold,
    letterSpacing: 1, marginVertical: Spacing.md, fontFamily: 'monospace',
  },
  copyBtn: {
    backgroundColor: Colors.surface, paddingHorizontal: Spacing.xl,
    paddingVertical: 12, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.cardBorder,
  },
  copyBtnText: { color: Colors.accent, fontWeight: Font.semibold, fontSize: 14 },
});
