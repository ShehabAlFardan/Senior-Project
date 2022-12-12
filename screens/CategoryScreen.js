import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, Firestore, getDocs , QuerySnapshot, query, where, collection, setDoc} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Settings, StyleSheet, Text, TouchableOpacity, ScrollView, Image, View } from 'react-native';
import { auth, firestore } from "../firebase";
import { db } from "../firebase";
import { Dimensions } from 'react-native';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getStorage, ref, getDownloadURL } from "firebase/storage";



const CategoryScreen = () => {
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation()
    const route = useRoute();
    var docs= []
    var [loading, setloading] = useState(false);
    var [docs, setdocs] = useState([]);

    useEffect(()=>{
        getDoc1();
        console.log(route.params.name)
    },[])

   const getDoc1 = async () => {
    const tDocs =[];
    const q = query(collection(db, "Offers"), where("category", "==", route.params.name));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
     const objectdata = {
        title: doc.data().title,
        Description: doc.data().Description,
        email: doc.data().email,
        imageRef: doc.data().imageRef,
        price: doc.data().price,
        duration: doc.data().duration,
        id: doc.id, 
        Requirements: doc.data().Requirements
      }
      tDocs.push(objectdata)
    });
    setdocs(tDocs);
    console.log(docs)
    setloading(true)
    }

    const navigate = (id , Description, category, duration, email, imageRef , price, title, Requirements) =>{
        navigation.navigate("Service", {
           ID : id,
           Description: Description,
           category: category,
           duration: duration,
           email: email,
           imageRef: imageRef,
           price: price,
           title: title,
           Requirements: Requirements
        })
        console.log(Requirements)
       }

    return (
    <View style={styles.container}>
        {docs.map(r => 
        <View key={r.id} style={styles.card}>
        <TouchableOpacity key={r.title} onPress={() => navigate(r.id , r.Description, r.category, r.duration, r.email, r.imageRef , r.price, r.title, r.Requirements)}>
        <Card sx={{ maxWidth: 345 , minWidth: 345 , marginLeft:0,marginRight:0 }}>
            <CardMedia
                component="img"
                height="140"
                image={r.imageRef}
                alt="green iguana"
            />
            <CardContent>
                <Typography align='left' gutterBottom variant="h5" component="div">
                {r.title}  - {r.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {r.Description}
                </Typography>
            </CardContent>
        </Card>
        </TouchableOpacity>
        </View>)}
    </View>
    )
    }


export default CategoryScreen

const styles = StyleSheet.create({

    container:{
        paddingTop: 10, 
        flex:1 ,
        alignItems: 'center'
    },
    card:{
        padding: 10,
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
    container2: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        height: '5000', 
      },
      paragraph: {
        margin: 24,
        marginTop: 0,
        fontSize: 14,
        textAlign: 'center',
      },
      logo: {
        height: 128,
        width: 128,
        alignContent: "center",
        alignSelf: "center"
      },
      title: {
        margin: 24,
        marginTop: 0,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      }
})