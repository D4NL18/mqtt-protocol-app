import { Text, View, TextInput, Button, ToastAndroid } from "react-native";
import { MButton } from "../components/button";
import { ButtonConnect } from "@/components/buttonConnect";
import { ButtonBlock } from "@/components/buttonBlock";
import { ButtonParty } from "@/components/buttonParty";

import { connect2Broker, publishMessage, disconnectBroker } from "../mqtt/mqtt";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

import { MTextInput } from "../components/MTextInput";
import { MqttClient } from "mqtt/*";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Index() {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [address, onChangeAddress] = useState("");
  const [leds, setLeds] = useState(["0", "0", "0", "0", "0", "0", "0", "0"]);
  const [block, setBlock] = useState(1)

  useEffect(() => {
    sleep(5000).then(() => {
      // console.log(client?.options);
      if (client?.connected === false) {
        disconnectBroker(client);
        setClient(null);
      }
    });
  }, [client]);

  useEffect(() => {
    if (!client) return;

    const message = leds.join("");
    publishMessage(client, "Altus2/Q0", message);
  }, [leds]);

  function handleChangeBlock() {
    if (block === 1) {
      setBlock(2)
    } else {
      setBlock(1)
    }
  }

  function handlePartyMode() {
    console.log("Party Mode On")
  }

  return (
    <View
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
        <Ionicons name="bulb-outline" size={128} color="white" />
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
          MQTT
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
        {[...Array(4).keys()].map((i) => (
          <MButton
            key={i}
            isPressed={leds[i] === "1"}
            title={`Led 0${i+1}`}
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

              leds[i] = leds[i] === "0" ? "1" : "0";
              setLeds([...leds]);
            }}
          />
        ))}
        <ButtonBlock
          title="Bloco"
          onPress={handleChangeBlock}
          block={block}
        />
        <ButtonParty
          onPress={handlePartyMode}
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
        <ButtonConnect
          title="Connect"
          onPress={() => {
            if (!address) {
              ToastAndroid.show("Invalid address", ToastAndroid.SHORT);
              return;
            }

            setClient(connect2Broker(address));
          }}
        />
      </View>
    </View>
  );
}
