import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


interface ButtonConnectProps {
    title: string;
    onPress: () => void;
}

export function ButtonConnect({ title, onPress }: ButtonConnectProps) {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
        onPress();
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
            ]}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>Connect Adress</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    },
    button: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: "#006FCA",
        width: "100%",
    },
});
