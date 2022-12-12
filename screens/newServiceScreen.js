import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { auth } from "../firebase";
import * as ImagePicker from 'expo-image-picker';
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import SelectList from 'react-native-dropdown-select-list'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Dimensions} from 'react-native'
import {v4 as uuid} from "uuid"; 

const newServiceScreen = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [title, setTitle]= useState('')
    const [category, setCategory]= useState('')
    const [price, setPrice]= useState('')
    const [duration, setduration]= useState('')
    const [duration2, setduration2]= useState('')
    const [Description, setDescription]= useState('')
    const [image, setImage] = useState(null);
    const [requirements, setRequirements] = useState([])
    const [counter, setCounter] =useState(0)
    const data = [
        {key:'Graphics and Desgin', value:'Graphics and Desgin'},
        {key:'Digital Marketing', value:'Digital Marketing'},
        {key:'Writing and Translation', value:'Writing and Translation'},
        {key:'Video and Animation', value:'Video and Animation'},
        {key:'Music and Audio', value:'Music and Audio'},
        {key:'Programming and Tech', value:'Programming and Tech'},
        {key:'Data', value:'Data'},
      ]
      const data2 = [
        {key:'Hours', value:'Hours'},
        {key:'Days', value:'Days'},
        {key:'Weeks', value:'Weeks'},
        {key:'Months', value:'Months'},
      ]


      useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setCurrentDate(
          date.toString() + month.toString() + year.toString() + hours.toString() + min.toString() + sec.toString()
        );
      }, []);
    
     const onTextChanged =(value) => {
       if(value>=0 || value=="."){
        setPrice(value)
       }
      } 
      
      const onTextChanged2 =(value) => {
        if(value>=0 ){
         setduration(value)
        }
       } 

    const upload = async () =>{
        
        const storage = getStorage();
        const user = auth.currentUser.email;
        var time = currentDate;
        var refrence =  time + ".JPG";
        console.log(refrence)
        const uploadUrl = await uploadImageAsync(image)
        const storageRef = ref(storage, refrence);
        //uploadBytes(storageRef, image).then((snapshot) => {
        //    console.log('Uploaded a blob or file!');
        //    console.log(storageRef.fullPath)
        //  });
        const docRef = await addDoc(collection(db, "Offers"), {
            email: user,
            title: title, 
            category: category, 
            price: price,
            duration: duration + duration2,
            Description: Description,
            Requirements: requirements, 
            imageRef: uploadUrl
          });
          console.log("Document written with ID: ", docRef.id);
    }
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
        console.log(image)
        }
      };

      async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      
        const fileRef = ref(getStorage(), uuid());
        const result = await uploadBytes(fileRef, blob);
      
        // We're done with the blob, close and release it
       // blob.close();
      
        return await getDownloadURL(fileRef);
      }

      const setRequirements2 = (text, counter) =>{
        requirements[counter] = text; 
      }
      
      const addRequirement = () =>{
        setCounter(counter+1)
      }

    return (
        <View
        style={styles.container}
        behavior="padding"
        >
        <View>
        <TouchableOpacity 
        onPress={pickImage}>
            <Text>Pick Image</Text>
        </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
            <View style={styles.inputContainer}>
                <TextInput 
                placeholder="Title" 
                value={title} 
                onChangeText={text => setTitle(text)}
                style={styles.input}
                />
                 <SelectList 
                 placeholder="Category" 
                 setSelected={setCategory} 
                 data={data} 
                 style={styles.input}
                 boxStyles={{
                    borderRadius:0 , 
                    backgroundColor: 'white', 
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRaduis: 10,
                    marginTop:5,
                }}
                 />
                <TextInput 
                placeholder="Price in BD" 
                value={price} 
                keyboardType = 'number-pad'
                onChangeText={value => onTextChanged(value)}
                style={styles.input}
                />
                
                <View style={{flexDirection:'row'}}>
                <TextInput 
                placeholder="Duration" 
                value={duration} 
                onChangeText={value => onTextChanged2(value)}
                style={styles.input2}
                />
                <SelectList 
                 placeholder="Duration" 
                 setSelected={setduration2} 
                 data={data2} 
                 style={styles.input}
                 boxStyles={{
                    borderRadius:0 , 
                    backgroundColor: 'white', 
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRaduis: 10,
                    marginTop:5,
                }}
                 />
                </View>
                <TextInput 
                placeholder="Description" 
                value={Description} 
                onChangeText={text => setDescription(text)}
                style={styles.input3}
                />
                <TouchableOpacity
                onPress={()=>addRequirement()}
                style={[styles.button, styles.buttonOutline2, styles.boxStyles]}>
                    <Text style={styles.buttonOutlineText2}>Add Requirements</Text>
                </TouchableOpacity>
            {Array.from(Array(counter)).map((c, index) => {
                    var counter2= index+1;
                    return <TextInput 
                    key={index}
                    placeholder={"Requirement #" + counter2}
                    value={requirements[(index)]} 
                    onChangeText={text => setRequirements2(text, index)}
                    style={styles.input}
                    />
                })}
            </View>
            <View style={styles.buttonContainer}>
                <View><Text> </Text></View>
                <TouchableOpacity
                onPress={upload}
                style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default newServiceScreen

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
    input2:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRaduis: 10,
        marginTop:5,
        width: '70%'
    },
    input3:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRaduis: 10,
        marginTop:5,
        height: 100,
    },
    buttonContainer:{
        width :'60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    buttonContainer2:{
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
    button2:{
        backgroundColor: '#0782F9',
        width: '32%',
        padding:15,
        borderRadius: 10,
        alignItems: 'right'
        
    },
    buttonOutline:{
        backgroundColor: 'white',
        margintop: 5,
        borderColor:'#0782F9',
        borderWidth: 2,
    },
    buttonOutline2:{
        backgroundColor: 'white',
        margintop: 5,
        borderColor:'black',
        borderWidth: 1,
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
    buttonOutlineText2:{
        color: 'White',
        fontWeight: '250',
        fontSize: 16,
    },
    logo: {
        height: Dimensions.get("window").width * 0.65,
        width: Dimensions.get("window").width * 0.65,
        marginLeft: Dimensions.get("window").width * 0.2,
    },
    boxStyles:{
        borderRadius:0 , 
        backgroundColor: 'white', 
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRaduis: 10,
        marginTop:5,
    }
})