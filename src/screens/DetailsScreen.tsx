import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'

const DetailsScreen = ({navigation,route} : any ) => {
  const ItemOfIndex =  useStore((state : any ) => 
    route.params.type =='Coffee' ? state.CoffeeList : state.BeanList, 
  )[route.params.index];

  const addToFavouriteList = useStore((state : any) => 
    state.addToFavouriteList)

  const deleteFromFavouriteList = useStore((state : any) =>
    state.deleteFromFavouriteList)

  const ToggleFavourite = (favourite :boolean,
    type : string ,
    id : string
   ) =>{ favourite ? deleteFromFavouriteList(type,id) : addToFavouriteList(type,id)
  };
  

 const BackHandler = () =>{
  navigation.pop();
 };
 
  
  return (
    <View style = {styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      
      <ScrollView
      showsVerticalScrollIndicator = {false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo EnableBackHandler = {true}
        imageLink_portrait = {ItemOfIndex.imagelink_portrait}
        type = {ItemOfIndex.type}
        id = {ItemOfIndex.id}
        favourite = {ItemOfIndex.favourite}
        name = {ItemOfIndex.name}
        special_Ingredient = {ItemOfIndex.special_ingredient}
        ingredients = {ItemOfIndex.ingredients}
        average_rating = {ItemOfIndex.average_rating}
        ratings_count = {ItemOfIndex.ratings_count}
        roasted = {ItemOfIndex.roasted}
        BackHandler = {BackHandler}
        ToggleFavourite = {ToggleFavourite}/>
      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  ScreenContainer:{
    flex: 1,
    backgroundColor:COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow:1,
  }
})

export default DetailsScreen