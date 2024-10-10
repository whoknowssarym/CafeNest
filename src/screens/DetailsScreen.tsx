import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
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

  const [price , setprice] = useState(ItemOfIndex.prices[0]);

  const [fullDesc,setFullDesc] = useState(false)
  

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
        ToggleFavourite = {ToggleFavourite}
      />
      <View style={styles.footerInfoArea}>
        <Text style={styles.InfoTitle}>Description</Text>
        {fullDesc ? (
          <TouchableWithoutFeedback onPress={() => {setFullDesc(prev => !prev)}} >
            <Text style={styles.descriptionText}>{ItemOfIndex.description}</Text>
          </TouchableWithoutFeedback>
         ) : ( 
         <TouchableWithoutFeedback 
           onPress={() => {
            setFullDesc(prev => !prev)
            }}>
          <Text numberOfLines={3} style={styles.descriptionText}>{ItemOfIndex.description}</Text>
         </TouchableWithoutFeedback>)}
         <Text style={styles.InfoTitle}>Size</Text>
         <View style={styles.SizeOuterContainer}>
          {ItemOfIndex.prices.map((data : any ) => (
            <TouchableOpacity  key={data.size} style={styles.sizeBox}>
              <Text 
                style={[
                  styles.sizeText,
                  {
                    fontSize:
                     ItemOfIndex.type=="bean" 
                     ? FONTSIZE.size_20 
                     : FONTSIZE.size_16,},]}>{data.size}</Text>
            </TouchableOpacity>
          ) )}
         </View>
      </View>
      
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
  },
  footerInfoArea:{
    padding:SPACING.space_20,

  },
  InfoTitle:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_10,
  },
  descriptionText:{
    letterSpacing:0.5,
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_30,
  },
  SizeOuterContainer:{

  },
  sizeText:{

  },
  sizeBox:{

  },
})

export default DetailsScreen