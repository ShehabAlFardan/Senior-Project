import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from "react-native-web";
import { auth } from "../firebase";

const LoginScreen = () => {
    const [email, setEmail]= useState('')
    const [Password, setPassword]= useState('')

    const navigation = useNavigation()

    const NavigateRegister = () =>{
        navigation.replace("Register")
    } 

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                console.log("Signed in")
                navigation.push("Main")
            }
        })
        return unsubscribe
    },[])

    const handleLogin = () =>{
        auth.signInWithEmailAndPassword(email, Password)
        .then(userCredentials =>{
            const user = userCredentials.user;
            console.log("Logged in with: ", user.email);

        })
        .catch(error => alert(error.message))
    }
    return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
        <View style={styles.inputContainer}>
            <TextInput 
            placeholder="Email" 
            value={email} 
            onChangeText={text => setEmail(text)}
            style={styles.input}
            />
            <TextInput 
            placeholder="Password" 
            value={Password} 
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View><Text> </Text></View>
            <TouchableOpacity
            onPress={NavigateRegister}
            style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>

)}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer:{
        width: '80%'
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRaduis: 10,
        marginTop:5,
    },
    buttonContainer:{
        width :'60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        backgroundColor: '#0782F9',
        width: '100%',
        padding:15,
        borderRadius: 10,
        alignItems: 'center'
        
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
    buttonOutlineText:{
        color: 'White',
        fontWeight: '500',
        fontSize: 16,
    },
})