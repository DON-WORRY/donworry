import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const screenWidth = Dimensions.get("screen").width
const FriendMessage: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>친구 요청 및 수신 메시지</Text>
            <FontAwesome name="angle-right" size={40}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        paddingLeft: 20,
        width: screenWidth - 40,
        borderRadius: 15,
        backgroundColor: "white",
        marginBottom: 10,
    },
    text: {
        width: screenWidth - 100,
        fontSize: 24,
        fontWeight: "bold"
    }
})

export default FriendMessage




