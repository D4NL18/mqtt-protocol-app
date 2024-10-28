import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ButtonProps {
  onPress: () => void;
}

export function ButtonParty({ onPress }: ButtonProps) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: 14000, // Duração total de 14 segundos
        useNativeDriver: false,
      }).start(() => startAnimation());
    };
    startAnimation();
  }, [animation]);

  const interpolateColor = animation.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.57, 0.71, 0.85, 1],
    outputRange: [
      "rgba(255, 0, 0, 1)",    // Vermelho
      "rgba(255, 127, 0, 1)",  // Laranja
      "rgba(255, 255, 0, 1)",  // Amarelo
      "rgba(0, 255, 0, 1)",    // Verde
      "rgba(0, 0, 255, 1)",    // Azul
      "rgba(75, 0, 130, 1)",    // Anil
      "rgba(148, 0, 211, 1)",   // Violeta
      "rgba(255, 0, 0, 1)",    // Volta ao Vermelho
    ],
  });

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.mainBox, { backgroundColor: interpolateColor }]}>
          <ThemedText type="defaultSemiBold" lightColor="white">
            Party Mode
          </ThemedText>
        </Animated.View>
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
    justifyContent: "center",
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%', // Alinha o botão ao tamanho do container
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent", // Mantém o fundo transparente para ver o gradiente
    alignItems: "center",
  },
});
