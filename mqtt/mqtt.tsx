import mqtt from 'mqtt'

import {ToastAndroid} from 'react-native'

export const connect2Broker = (address: String) => {
  const client = mqtt.connect('mqtt://'+address, {
    port: 9001, // Porta do websocket q vai ta rodando no docker
  }).on('connect', () => {
		console.log('Connected')
    ToastAndroid.show("Connected", ToastAndroid.SHORT)
	})
	.on('error', (error) => {
		console.log('Error: ' + error)
    ToastAndroid.show("Error: " + error, ToastAndroid.SHORT)
	})
	.on('disconnect', (packet) => {
		console.log('Disconnected')
    ToastAndroid.show("Disconnected", ToastAndroid.SHORT)
	})
	.on('offline', () => {
		console.log('Offline')
    ToastAndroid.show("Offline", ToastAndroid.SHORT)
	})
	.on('reconnect', () => {
		console.log('Reconnecting')
    ToastAndroid.show("Reconnecting", ToastAndroid.SHORT)
	})
	.on('close', () => {
		console.log('Disconnected')
    ToastAndroid.show("Disconnected", ToastAndroid.SHORT)
	})
	.on('message', (topic, message, packet) => {
    console.log(topic, message)
	});

  return client;
};

export const publishMessage = (client: mqtt.MqttClient, topic: string, message: any) => {
  console.log("Publish Message")
  client.publish(topic, String(message), { qos: 1 }, (error) => {
    if (error) {
      console.error('Publish error: ', error);
    } else {
      console.log(`Message sent to topic "${topic}"`);
    }
  });
};

export const disconnectBroker = (client: mqtt.MqttClient) => {
  if (client) {
    client.end();
    console.log('Disconnected from MQTT broker');
  }
};
