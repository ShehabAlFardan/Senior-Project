import { useNavigation } from "@react-navigation/native";
import React from "react";
import { doc, Firestore, getDocs , QuerySnapshot, query, where, collection, setDoc} from "firebase/firestore";
import { Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from "../firebase";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ScrollView } from "react-native-gesture-handler";

const OrdersScreen = () => {

    const navigation = useNavigation()
    var [myServices, SetMyServices] = useState([]);
    var [Myorders, setMyOrders] = useState([]);
    var [orders, setOrders] = useState([]);
    var [servicesID, SetServicesID] = useState([])

    const navigate = () =>{
        navigation.navigate("newService")
    }

    useEffect(()=>{
        GetMyServices()
        GetMyOrders()
    },[])

    useEffect(()=>{
        if (!servicesID.length) return;
        GetOrders()
    },[servicesID])

    const GetOrders = async () =>{
        const tDocs =[];
        for(let i=0; i < servicesID.length; i++){
        const q = query(collection(db, "Orders"), where("ID", "==", servicesID[i]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
         const objectdata = {
            Title: doc.data().Title,
            Description: doc.data().Description,
            email: doc.data().email,
            imageRef: doc.data().ImageRef,
            price: doc.data().Price,
            duration: doc.data().duration,
            id: doc.id, 
            Requirements: doc.data().Requirements,
            Requirements2: doc.data().Requirements2
          }
          tDocs.push(objectdata)
        });
        }
        setOrders(tDocs);        
    }

    const GetMyOrders= async () =>{
        const tDocs =[];
        const q = query(collection(db, "Orders"), where("email", "==", auth.currentUser?.email));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
         const objectdata = {
            Title: doc.data().Title,
            Description: doc.data().Description,
            email: doc.data().email,
            imageRef: doc.data().ImageRef,
            price: doc.data().Price,
            duration: doc.data().duration,
            id: doc.id, 
            Requirements: doc.data().Requirements,
            Requirements2: doc.data().Requirements2
          }
          tDocs.push(objectdata)
        });
        setMyOrders(tDocs);
        console.log(myServices);
    }

    const GetMyServices = async ()=>{
        const IDdocs= []
        const tDocs =[];
        const q = query(collection(db, "Offers"), where("email", "==", auth.currentUser?.email));
    
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
          IDdocs.push(objectdata.id)
          tDocs.push(objectdata)
        });
        SetMyServices(tDocs);
        SetServicesID(IDdocs);
    }
    return (
    <ScrollView>
    <View style={styles.container}>
         <TouchableOpacity
            onPress={()=>navigate()}
            style={styles.button}>
                <Text style={styles.buttonText}>New Service</Text>
            </TouchableOpacity>
        {myServices.map((r , index) =>
        <View key={r.id} style={styles.card}>
        {index == 0? <Typography align='left' gutterBottom variant="h5" component="div">My Services</Typography>: null}
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
            </CardContent>
        </Card>
        </TouchableOpacity>
        </View>)}
        {Myorders.map((r , index) =>
        <View key={r.id} style={styles.card}>
        {index == 0? <Typography align='left' gutterBottom variant="h5" component="div">My Orders</Typography>: null}
        <TouchableOpacity key={r.Title} onPress={() => navigate(r.id , r.Description, r.category, r.duration, r.email, r.imageRef , r.price, r.title, r.Requirements)}>
        <Card sx={{ maxWidth: 345 , minWidth: 345 , marginLeft:0,marginRight:0 }}>
            <CardMedia
                component="img"
                height="140"
                image={r.imageRef}
                alt="green iguana"
            />
            <CardContent>
                <Typography align='left' gutterBottom variant="h5" component="div">
                {r.Title} 
                </Typography>
            </CardContent>
        </Card>
        </TouchableOpacity>
        </View>)}
        {orders.map((r , index) =>
        <View key={r.id} style={styles.card}>
        {index == 0? <Typography align='left' gutterBottom variant="h5" component="div">Orders</Typography>: null}
        <TouchableOpacity key={r.Title} onPress={() => navigate(r.id , r.Description, r.category, r.duration, r.email, r.imageRef , r.price, r.title, r.Requirements)}>
        <Card sx={{ maxWidth: 345 , minWidth: 345 , marginLeft:0,marginRight:0 }}>
            <CardMedia
                component="img"
                height="140"
                image={r.imageRef}
                alt="green iguana"
            />
            <CardContent>
                <Typography align='left' gutterBottom variant="h5" component="div">
                {r.Title} 
                </Typography>
            </CardContent>
        </Card>
        </TouchableOpacity>
        </View>)}

    </View>
    </ScrollView>
    )
}

export default OrdersScreen

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