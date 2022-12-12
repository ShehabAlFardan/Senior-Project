import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Settings, StyleSheet, Text, TouchableOpacity, View , TextInput} from 'react-native';
import { auth } from "../firebase";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-web";
import * as ImagePicker from 'expo-image-picker';


const ServiceProceedScreen = () => {
    const navigation = useNavigation()
    const route = useRoute();
    var [Description, setDescription] = useState("");
    var [Requirements, setRequirements] = useState([]);
    var [Requirement2, setRequirements3] = useState([]);
    const [image, setImage] = useState(null);
    const [attached, setAttached] = useState('Add Attachment')
    useEffect(()=>{
        console.log(route.params)
        var req =[]
        route.params.Requirements.map((numbers) =>
        req.push(numbers)
        );
        setRequirements(req)
        },[])

        const setRequirements2 = (text, counter) =>{
            Requirement2[counter] = text; 
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
            setAttached("Attached")
            }
          };
          
            const navigate = () =>{
                navigation.navigate("Checkout", {
                   ID : route.params.ID,
                   Title: route.params.Title,
                   Requirements: route.params.Requirements,
                   Price: route.params.Price, 
                   ImageRef: route.params.ImageRef,
                   Requirement2: Requirement2,
                   Description: Description,
                   Attachment: image
                })
               }
        


    return (
    <ScrollView>
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
        <br/>
        <View style={styles.inputContainer}>
        <TextInput
            multiline={true}
            numberOfLines={5}
            onChangeText={text => setDescription(text)}
            value={Description}
            placeholder="Description"
            style={styles.input}/>
        {Requirements.map((Req, index) =>
            <TextInput
            multiline={true}
            numberOfLines={2}
            onChangeText={text => setRequirements2(text, index)}
            value={Requirement2[index]}
            placeholder={Req}
            style={styles.input}/>)
        }
        </View>
        <TouchableOpacity 
        onPress={pickImage}
        style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>{attached}</Text>
        </TouchableOpacity>
        <TouchableOpacity
                onPress={()=>{navigate()}}
                style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Proceed</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
    )
}

export default ServiceProceedScreen

const styles = StyleSheet.create({
    input:{
        borderColor: 'black',
        backgroundColor: 'white',
        borderRaduis: 10,
        marginTop:5,
        width: '90%'
    },
    inputContainer:{
        maxWidth: 400 , minWidth: 400 , marginLeft:0,marginRight:0,  
        borderColor: 'black',
        alignItems: 'center'
    },
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