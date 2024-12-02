import { Text, View, TextInput, Button, ToastAndroid, Image } from "react-native";
import { MButton } from "../components/button";
import { ButtonConnect } from "@/components/buttonConnect";
import { ButtonBlock } from "@/components/buttonBlock";
import { ButtonParty } from "@/components/buttonParty";

// import { connect2Broker, publishMessage, disconnectBroker } from "../mqtt/mqtt";
import { publishMessage } from "../opc/opc";


import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

import { MTextInput } from "../components/MTextInput";
import { MqttClient } from "mqtt/*";
import { SafeAreaView } from "react-native-safe-area-context";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Index() {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [address, onChangeAddress] = useState("");
  const [leds, setLeds] = useState(["0", "0", "0", "0", "0", "0", "0", "0"]);
  const [block, setBlock] = useState(1)

  // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  // useEffect(() => {
  //   sleep(5000).then(() => {
  //     // console.log(client?.options);
  //     if (client?.connected === false) {
  //       disconnectBroker(client);
  //       setClient(null);
  //     }
  //   });
  // }, [client]);

  // useEffect(() => {
  //   if (!client) return;

  //   const message = leds.join("");
  //   publishMessage(client, "Altus2/Q0", message);
  // }, [leds]);

  function handleChangeBlock() {
    if (block === 1) {
      setBlock(2)
    } else {
      setBlock(1)
    }
  }

  // async function handlePartyMode() {
  //   if (!client) return;
  //   for (let index = 0; index < 20; index++) {
  //     publishMessage(client, "Altus2/Q0", "00000000");
  //     await sleep(100)
  //     publishMessage(client, "Altus2/Q0", "11111111");
  //     await sleep(100)
  //   }
  //   publishMessage(client, "Altus2/Q0", leds.join(""));
  // }

  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "#04001C",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("../assets/images/Forninho.png")} alt="forninho"  style={{width: 128, height: 128}}/>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
          }}
        >
          Forninho 2
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {[...Array(4).keys()].map((i) => {
          let x = block == 2 ? i+4 : i
          return (
          <MButton
            key={x}
            isPressed={leds[x] === "1"}
            title={`Led 0${x+1}`}
            onPress={() => {
              if (!client) {
                ToastAndroid.show("ERR: no client", ToastAndroid.SHORT);
                return;
              }
              if (!client.connected) {
                ToastAndroid.show(
                  "ERR: client not connected",
                  ToastAndroid.SHORT
                );
                return;
              }
              if(leds[x] === "0") {
                leds[x] = "1"
                publishMessage(x, "true", address)
              }else {
                leds[x] = "0"
                publishMessage(x, "false", address)
              }
              setLeds([...leds]);
            }}
          />
        )})}
        <ButtonBlock
          title="Bloco"
          onPress={handleChangeBlock}
          block={block}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <MTextInput onChangeText={onChangeAddress} text={address} />
      </View>
    </SafeAreaView>
  );
}
