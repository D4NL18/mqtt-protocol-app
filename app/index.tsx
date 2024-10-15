import { Text, View, TextInput, Button } from "react-native";
import { MButton } from "../components/button";

import {connect2Broker, publishMessage, disconnectBroker} from '../mqtt/mqtt'

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

import {MTextInput} from '../components/MTextInput'



export default function Index() {
  const [client, setClient] = useState(null)
  const [address, onChangeAddress] = useState("")
  const [leds, setLeds] = useState(Array(8).fill(false))

  const updatePosition = (index:number, value:any) => {
    const newArray = [...leds];
    newArray[index] = value;
    setLeds(newArray);
    console.log(newArray)
  };

const sendMessage = (index:number) => {
  let value = !Boolean(leds[index])
  console.log(value)
  publishMessage(client, "led/"+index, value)
  updatePosition(index, value)
}

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
        <MButton title="Led 01" onPress={() => sendMessage(0)} /> 
        <MButton title="Led 02" onPress={() => sendMessage(1)} />
        <MButton title="Led 03" onPress={() => sendMessage(2)} />
        <MButton title="Led 04" onPress={() => sendMessage(3)} />
        <MButton title="Led 05" onPress={() => sendMessage(4)} />
        <MButton title="Led 06" onPress={() => sendMessage(5)} />
        <MButton title="Led 07" onPress={() => sendMessage(6)} />
        <MButton title="Led 08" onPress={() => sendMessage(7)} />
      </View>
      <View style={{
        justifyContent:"space-around",
      }}>
        <MTextInput onChangeText={onChangeAddress} value={address} />
        <Button title="Connect" onPress={()=>setClient(connect2Broker(address!=null?"192.168.68.110":address))} />
      </View>
    </View>
  );
}
