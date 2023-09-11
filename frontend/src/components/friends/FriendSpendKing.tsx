import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("screen").width
const FriendSpendKing: React.FC = () => {
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 470,
        padding: 20,
        width: screenWidth - 40,
        borderRadius: 15,
        backgroundColor: "white",
        marginBottom: 20,
    },
})

export default FriendSpendKing




