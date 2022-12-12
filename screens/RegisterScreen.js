import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert  } from 'react-native';
import { KeyboardAvoidingView } from "react-native-web";
import { auth } from "../firebase";
import * as ImagePicker from 'expo-image-picker';
import firebase from "../firebase";
import { Stack, Avatar } from "@react-native-material/core";

const RegisterScreen = () => { 
    const db = firebase.firestore();


    const [email, setEmail]= useState('')
    const [Password, setPassword]= useState('')
    const [firstName, setFirstName] =useState('')
    const [LastName, setLastName] =useState('')
    const [image, setImage] = useState(null);
    const [Registered, setRegistered] = useState(false);
    const [ImagePicked , setImagePicked] = useState(false)
    const [error, setError] = useState("")
    const [isEmailValid,setisEmailValid ] = useState(false)


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
          setImagePicked(true)
        }
      };

    const navigation = useNavigation()

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                console.log("Signed in")
                navigation.replace("Main")
            }
        })
        return unsubscribe
    },[])


    const handleSignUp = async () =>{ 
        if(firstName.trim ==" ") {setError("Please enter your first name"); console.log(firstName)} 
        else if(LastName.trim ==" "){ setError("Please enter your last name"); console.log(firstName)} 
        else {setError(" ")
        auth.createUserWithEmailAndPassword(email, Password) 
        .then(userCredentials =>{
            const user = userCredentials.user;
            console.log("Logged in with: " , user.email);
            setRegistered(true);
        })
        .catch(error => alert(error.message))
        if (Registered){
        db.collection('Users') 
        .add({
        email: email,
        firstName: firstName,
        lastName : LastName,
        ImageRef: image,
        })
        .then(() => {
            console.log('User added!');
        });
    }
    }
    } 

    return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
    <View>
    
    {ImagePicked?
    <View></View>: 
    <TouchableOpacity 
    onPress={pickImage}
    style={[styles.button, styles.buttonOutline]}>
        <Text>Pick Image</Text>
    </TouchableOpacity> }
      {image &&  <Avatar image={{ uri: image }} size={150} />}
    </View>
        <View style={styles.inputContainer}>
            <TextInput 
            placeholder="First Name" 
            value={firstName} 
            onChangeText={text => setFirstName(text)}
            style={styles.input}
            />
            <TextInput 
            placeholder="Last Name" 
            value={LastName} 
            onChangeText={text => setLastName(text)}
            style={styles.input}
            />
        </View>
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
            <View><Text> </Text></View>
            <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
        <Text>{error}</Text>
    </KeyboardAvoidingView>

)}

export default RegisterScreen

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