import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signUp(phone, fullName, password);
      } else {
        await signIn(phone, password);
      }
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>StablePay</Text>
      <Text style={styles.subtitle}>
        {mode === "signin" ? "Sign in to your account" : "Create your account"}
      </Text>

      {mode === "signup" && (
        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Phone number"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoComplete="tel"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {mode === "signup" ? "Create Account" : "Sign In"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}>
        <Text style={styles.toggle}>
          {mode === "signin"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 24, backgroundColor: "#080810" },
  title: { fontSize: 32, fontWeight: "700", color: "#fff", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#888", marginBottom: 32 },
  input: {
    borderWidth: 1,
    borderColor: "#2A2A45",
    borderRadius: 8,
    padding: 14,
    color: "#fff",
    backgroundColor: "#1A1A2E",
    marginBottom: 12,
    fontSize: 16,
  },
  error: { color: "#ff4444", marginBottom: 12, fontSize: 14 },
  button: {
    backgroundColor: "#00D4AA",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#080810", fontWeight: "700", fontSize: 16 },
  toggle: { color: "#00D4AA", textAlign: "center", fontSize: 14 },
});
