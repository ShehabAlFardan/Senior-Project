import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from "../firebase";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { ScrollView } from "react-native-web";

const ServiceScreen = () => {
    const navigation = useNavigation()

    const navigate = (ID, Requirements , Price, ImageRef, Title) =>{
        navigation.navigate("ServiceProceed", {
           ID : ID,
           Title: Title,
           Requirements: Requirements,
           Price: Price, 
           ImageRef: ImageRef
        })
       }

    const route = useRoute();
    const [Requirements, setRequirements]= useState([])

    useEffect(()=>{
        const req =[]
        console.log(route.params.ID)
       route.params.Requirements.map((numbers) =>
        req.push(numbers)
        );
        setRequirements(req)
    },[])
    

    return (
    <ScrollView >
        <View style={styles.container}>
        <br/>
         <Card sx={{ maxWidth: 400 , minWidth: 400 , marginLeft:0,marginRight:0 }}>
            <CardMedia
                component="img"
                height="162"
                image={route.params.imageRef}
                alt="green iguana"
            />
            <CardContent>
                <Typography align='left' gutterBottom variant="h5" component="div">
                {route.params.title} 
                </Typography>
            </CardContent>
        </Card>
        <br/>
        <Card sx={{ maxWidth: 400 , minWidth: 400 , marginLeft:0,marginRight:0 }}>
            <CardContent>
            <Typography align='left' gutterBottom variant="h6" component="div">
            <b> Description:</b> {route.params.Description}<br/>
            <View style = {styles.lineStyle} />
            <b> Price:</b> {route.params.price} BHD <br/>
            <View style = {styles.lineStyle} />
            <b> Duration:</b> {route.params.duration}<br/>
            <View style = {styles.lineStyle} />
            <b> Requirements:</b> <br/>
            {Requirements.map((Req) =>
                <li>{Req}</li>)
            }
            </Typography>
            </CardContent>
        </Card>
        <TouchableOpacity
            onPress={()=>navigate(route.params.ID, Requirements, route.params.price, route.params.imageRef, route.params.title)}
            //onPress={()=>{}}
            style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Proceed</Text>
        </TouchableOpacity>
        <br/>
        </View>
    </ScrollView>
    )
}

export default ServiceScreen

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
    lineStyle:{
        borderWidth: 0.05,
        borderColor:'gray',
        margin:8,
   },
})