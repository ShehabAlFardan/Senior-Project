import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from "../firebase";
import { useRoute } from "@react-navigation/native";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import {v4 as uuid} from "uuid"; 




const CheckoutScreen = () => {
    const route = useRoute();

    const Checkout= async ()=>{
        const Attachment= await uploadImageAsync(route.params.Attachment)

        const docRef = await addDoc(collection(db, "Orders"), {
            ID : route.params.ID,
            Title: route.params.Title,
            Price: route.params.Price, 
            Requirements: route.params.Requirements,
            Requirement2: route.params.Requirement2,
            Attachment: Attachment,
            Description: route.params.Description,
            email: auth.currentUser?.email,
            ImageRef: route.params.ImageRef
          });
          console.log("Document written with ID: ", docRef.id);
    }

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

    return (
    <View style={styles.container}>
        <View style={styles.container}>
            <Card sx={{ maxWidth: 400 , minWidth: 400 , marginLeft:0,marginRight:0 }}>
                <CardMedia
                    component="img"
                    height="162"
                    image={route.params.ImageRef}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography align='left' gutterBottom variant="h5" component="div">
                    {route.params.Title} 
                    </Typography>
                </CardContent>
            </Card>
            <TouchableOpacity
                onPress={()=>{Checkout()}}
                style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Checkout</Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}

export default CheckoutScreen

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