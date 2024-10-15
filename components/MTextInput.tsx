import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


interface ButtonProps {
    title: string;
    onPress: () => void;
}

export function MTextInput({ text, onChangeText }: ButtonProps) {

    return (
        <ThemedView style={styles.container}>
          <TextInput placeholder="Broker's address" style={styles.button} text={text} onChangeText={onChangeText}/>
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
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12
    },
});
