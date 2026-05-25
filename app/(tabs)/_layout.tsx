import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Font } from '../../constants/theme';

type TabIconProps = {
  focused: boolean;
  label: string;
  icon: string;
};

function TabIcon({ focused, label, icon }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.icon, focused && styles.iconActive]}>{icon}</Text>
      <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Home" icon="⌂" />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Wallet" icon="◈" />
          ),
        }}
      />
      <Tabs.Screen
        name="send"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Send" icon="↑" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Profile" icon="○" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    height: 80,
    paddingBottom: 8,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
    paddingTop: 8,
  },
  icon: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  iconActive: {
    color: Colors.accent,
  },
  label: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: Font.medium,
    letterSpacing: 0.3,
  },
  labelActive: {
    color: Colors.accent,
  },
});
