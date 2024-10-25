import { StyleSheet, View, TextInput } from "react-native";
import { ThemedView } from "@/components/ThemedView";

interface ButtonProps {
  text: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

export function MTextInput({ text, onChangeText }: ButtonProps) {
  return (
    <ThemedView style={styles.container}>
      <TextInput
        placeholder="Broker's address"
        style={styles.button}
        value={text}
        onChangeText={onChangeText}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: "5%",
    borderRadius: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "white",
  },
});
