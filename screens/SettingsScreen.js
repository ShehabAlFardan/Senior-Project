import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from "../firebase";

const SettingsScreen = () => {
    

    return (
    <View style={styles.container}>
        <Text>
            Settings
        </Text>
    </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer:{
        width :'60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        backgroundColor: '#0782F9',
        width: '60%',
        padding:15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
        
    },
    buttonOutline:{
        backgroundColor: 'white',
        margintop: 5,
        borderColor:'#0782F9',
        borderWidth: 2,
    },
    buttonText:{
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
})