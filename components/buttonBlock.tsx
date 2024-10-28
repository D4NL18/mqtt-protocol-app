import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface ButtonProps {
  title: string;
  block: number;
  onPress: () => void;
}

export function ButtonBlock({ title, onPress, block }: ButtonProps) {


  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.mainBox}>
          <ThemedText type="defaultSemiBold" lightColor="white">
            {`${title} 0${block}`}
          </ThemedText>
        </View>
        <Ionicons
          name="refresh"
          size={18}
          color="white"
        />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: "5%",
    borderRadius: 10,
  },
  mainBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#696969",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
