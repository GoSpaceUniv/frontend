import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require("고시생단.png")} // 로고 파일 경로
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff", // 흰 바탕
        justifyContent: "center",   // 세로 중앙
        alignItems: "center",       // 가로 중앙
    },
    logo: {
        width: 200,
        height: 200,
    },
});