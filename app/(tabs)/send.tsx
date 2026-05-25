import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, SafeAreaView, ScrollView,
} from 'react-native';
import { useState } from 'react';
import { Colors, Spacing, Radius, Font } from '../../constants/theme';

const COINS = ['USDC', 'USDT', 'DAI'];

const RECENT = [
  { name: 'Ahmed R.', address: '0x3aF1...88bC', initials: 'AR' },
  { name: 'Sara K.', address: '0x91Dc...55aA', initials: 'SK' },
  { name: 'Bilal M.', address: '0xF3b2...12eD', initials: 'BM' },
];

export default function SendScreen() {
  const [selectedCoin, setSelectedCoin] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Send</Text>
        </View>

        {/* Coin Selector */}
        <Text style={styles.label}>Select Stablecoin</Text>
        <View style={styles.coinSelector}>
          {COINS.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.coinChip, selectedCoin === c && styles.coinChipActive]}
              onPress={() => setSelectedCoin(c)}
              activeOpacity={0.8}
            >
              <Text style={[styles.coinChipText, selectedCoin === c && styles.coinChipTextActive]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Amount */}
        <Text style={styles.label}>Amount</Text>
        <View style={styles.amountBox}>
          <Text style={styles.currencySign}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor={Colors.textMuted}
            keyboardType="decimal-pad"
            selectionColor={Colors.accent}
          />
          <Text style={styles.coinTag}>{selectedCoin}</Text>
        </View>
        <View style={styles.quickAmounts}>
          {['50', '100', '500', '1000'].map((v) => (
            <TouchableOpacity key={v} style={styles.quickBtn} onPress={() => setAmount(v)}>
              <Text style={styles.quickBtnText}>${v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recipient */}
        <Text style={styles.label}>Recipient</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={recipient}
            onChangeText={setRecipient}
            placeholder="Wallet address or username"
            placeholderTextColor={Colors.textMuted}
            selectionColor={Colors.accent}
            autoCapitalize="none"
          />
        </View>

        {/* Recent */}
        <Text style={styles.label}>Recent</Text>
        <View style={styles.recentList}>
          {RECENT.map((r) => (
            <TouchableOpacity
              key={r.name}
              style={styles.recentItem}
              onPress={() => setRecipient(r.address)}
              activeOpacity={0.8}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{r.initials}</Text>
              </View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentName}>{r.name}</Text>
                <Text style={styles.recentAddress}>{r.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note */}
        <Text style={styles.label}>Note (optional)</Text>
        <View style={[styles.inputBox, { height: 80 }]}>
          <TextInput
            style={[styles.input, { height: '100%' }]}
            placeholder="What's this for?"
            placeholderTextColor={Colors.textMuted}
            selectionColor={Colors.accent}
            multiline
          />
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.sendBtn, (!amount || !recipient) && styles.sendBtnDisabled]}
          disabled={!amount || !recipient}
          activeOpacity={0.85}
        >
          <Text style={styles.sendBtnText}>
            {amount && recipient ? `Send $${amount} ${selectedCoin}` : 'Enter amount & recipient'}
          </Text>
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
  label: { fontSize: 13, color: Colors.textSecondary, fontWeight: Font.medium, marginBottom: Spacing.sm, marginTop: Spacing.md },

  coinSelector: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
  coinChip: {
    flex: 1, paddingVertical: 12, borderRadius: Radius.md, alignItems: 'center',
    backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.cardBorder,
  },
  coinChipActive: { backgroundColor: Colors.accentDim, borderColor: Colors.accent },
  coinChipText: { fontSize: 14, color: Colors.textSecondary, fontWeight: Font.semibold },
  coinChipTextActive: { color: Colors.accent },

  amountBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.card, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, borderWidth: 1, borderColor: Colors.cardBorder,
    height: 64,
  },
  currencySign: { fontSize: 24, color: Colors.textSecondary, marginRight: 4, fontWeight: Font.light },
  amountInput: {
    flex: 1, fontSize: 32, color: Colors.textPrimary,
    fontWeight: Font.bold, letterSpacing: -1,
  },
  coinTag: { fontSize: 14, color: Colors.textMuted, fontWeight: Font.semibold },

  quickAmounts: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  quickBtn: {
    flex: 1, paddingVertical: 8, borderRadius: Radius.sm,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.cardBorder,
    alignItems: 'center',
  },
  quickBtnText: { fontSize: 13, color: Colors.textSecondary, fontWeight: Font.medium },

  inputBox: {
    backgroundColor: Colors.card, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, borderWidth: 1, borderColor: Colors.cardBorder,
    justifyContent: 'center', height: 52,
  },
  input: { fontSize: 15, color: Colors.textPrimary, fontWeight: Font.regular },

  recentList: { gap: Spacing.sm },
  recentItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.card, borderRadius: Radius.md,
    padding: Spacing.md, borderWidth: 1, borderColor: Colors.cardBorder,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.accentDim, justifyContent: 'center', alignItems: 'center',
    marginRight: Spacing.md, borderWidth: 1, borderColor: `${Colors.accent}33`,
  },
  avatarText: { fontSize: 13, fontWeight: Font.bold, color: Colors.accent },
  recentInfo: { flex: 1 },
  recentName: { fontSize: 14, color: Colors.textPrimary, fontWeight: Font.semibold },
  recentAddress: { fontSize: 12, color: Colors.textMuted, marginTop: 2, fontFamily: 'monospace' },

  sendBtn: {
    backgroundColor: Colors.accent, paddingVertical: 18,
    borderRadius: Radius.md, alignItems: 'center', marginTop: Spacing.xl,
  },
  sendBtnDisabled: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.cardBorder },
  sendBtnText: { fontSize: 16, fontWeight: Font.bold, color: Colors.background, letterSpacing: 0.2 },
});
