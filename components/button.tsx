import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';


interface ButtonProps {
    title: string;
    onPress: () => void;
}

export function Button({ title, onPress }: ButtonProps) {
    const [isPressed, setIsPressed] = useState(false);
    const theme = useColorScheme() ?? 'dark';

    const handlePress = () => {
        setIsPressed(!isPressed);
        onPress();
    };

    return (
        <ThemedView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Ionicons
                    name="power"
                    size={18}
                />
                <ThemedText type="defaultSemiBold">{title}</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "40%",
        margin: "5%",
        borderRadius: 10,
    },
    button: {
        display: "flex",
        flexDirection: 'row',

        alignItems: 'center',
        gap: 8,
        padding: 10,
    },
});
