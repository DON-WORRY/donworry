import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const donWorryHeader = require("../../assets/logo/DonWorryHeader.png")
const screenWidth = Dimensions.get("screen").width

const FriendHeader: React.FC = () => {
    return (
        <View style={styles.header}>
        <Image source={donWorryHeader} style={styles.image} />
        <FontAwesome name="bars" size={30} color={"#808080"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: screenWidth - 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    image: {
        height: 40,
        width: 167,
    },
})

export default FriendHeader




