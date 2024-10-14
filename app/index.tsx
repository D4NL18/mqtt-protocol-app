import { Text, View } from "react-native";
import { Button } from "../components/button";

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Index() {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "rgb(50, 50, 50)",
        height: "100%"
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
          }}
        >MQTT
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="bulb-outline"
          size={128}
          color="white"
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}>
        <Button title="Led 01" onPress={() => console.log("Oi")} />
        <Button title="Led 02" onPress={() => console.log("Oi")} />
        <Button title="Led 03" onPress={() => console.log("Oi")} />
        <Button title="Led 04" onPress={() => console.log("Oi")} />
        <Button title="Led 05" onPress={() => console.log("Oi")} />
        <Button title="Led 06" onPress={() => console.log("Oi")} />
        <Button title="Led 07" onPress={() => console.log("Oi")} />
        <Button title="Led 08" onPress={() => console.log("Oi")} />
      </View>
    </View>
  );
}
