import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


interface ButtonProps {
    title: string;
    onPress: () => void;
}

export function MButton({ title, onPress }: ButtonProps) {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
        onPress();
    };

    return (
        <ThemedView style={styles.container}>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: !isPressed ? "#696969" : "#E8B038" }
                ]}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <View style={styles.mainBox}>
                    <Ionicons
                        name="power"
                        size={18}
                        color="white"
                    />
                    <ThemedText type="defaultSemiBold" lightColor='white'>{title}</ThemedText>
                </View>
                <Ionicons
                    name={!isPressed ? "bulb-outline" : "bulb"}
                    size={18}
                    color="white"
                />
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
    mainBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        
    },
    button: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 10,
    },
});
