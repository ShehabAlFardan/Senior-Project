import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from "../firebase";
import { Avatar, Card, IconButton } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import CategoryScreen from "./CategoryScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const SearchScreen = () => {
    
    const navigation = useNavigation()

    const navigate = (name) =>{
     navigation.navigate("Category", {
        name : name,
     })
    }

    return (
    <View>
    <Card.Title
    title="Graphics & Desgin"
    left={(props) => <Avatar.Icon {...props} icon="brush" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={ () => navigate("Graphics and Desgin")} />} />
    <Card.Title
    title="Digital Marketing"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />} />
    <Card.Title
    title="Writing & Translation"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />} />
    <Card.Title
    title="Video & Animation"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />} />
    <Card.Title
    title="Music & Audio"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />} />
    <Card.Title
    title="Programming & Tech"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />} />
    <Card.Title
    title="Data"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />} />
    </View>
        
    )
}

export default SearchScreen

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