import React from 'react'
import { StyleSheet,Text,View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import Customicons from '../components/Customicons';


const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name= "Home"
        component={HomeScreen}>   
        </Tab.Screen>
        <Tab.Screen name= "Cart"
        component={HomeScreen}>   
        </Tab.Screen>
        <Tab.Screen name= "Favourites"
        component={HomeScreen}>   
        </Tab.Screen>
        <Tab.Screen name= "History"
        component={HomeScreen}>   
        </Tab.Screen>

    </Tab.Navigator>


  );
};



const styles = StyleSheet.create({})

export default TabNavigator