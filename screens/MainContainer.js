import React, { useEffect, useState } from "react";
import { View, Text } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
//Screens
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import SearchScreen from "./SearchScreen";
import CategoryScreen from "./CategoryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchStackScreen from "./SearchScreenStack";
import OrdersStackScreen from "./OrdersScreenStack";
//Screen Names
const homeName= "Home"
const settingsName="Settings"
const SearchName = "Search"
const CategoryName = "Category"
const OrdersName= "Orders"
const Tab = createBottomTabNavigator();

export default function MainContainer(){

    const navigation = useNavigation()

    useEffect(()=>{
        console.log("here")
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(!user){
                navigation.push("Login")
            }
        })
        return unsubscribe
    },[])
    
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route})=>({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;
                  let rn= route.name;
                  
                  if(rn === homeName){
                    iconName = focused? 'home' : 'home-outline'
                  }else if(rn === settingsName){
                    iconName = focused?  'settings': 'settings-outline'
                  } 
                  else if(rn === SearchName){
                    iconName = focused?  'search': 'search-outline'
                  } 
                  else if(rn === OrdersName){
                    iconName = focused?  'list': 'list-outline'
                  } 

                  return <Ionicons name={iconName} size={size} color={color}></Ionicons>
                },
            })}>

                <Tab.Screen name={homeName} component={HomeScreen} options={{headerShown: false}}>
                </Tab.Screen>
                <Tab.Screen name={SearchName} component={SearchStackScreen} options={{headerShown: false}}></Tab.Screen>
                <Tab.Screen name={OrdersName} component={OrdersStackScreen} options={{headerShown: false}}></Tab.Screen>
                <Tab.Screen name={settingsName} component={SettingsScreen}options={{headerShown: false}}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        
    )
}