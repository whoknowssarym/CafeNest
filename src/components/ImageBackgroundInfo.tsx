import React from 'react'
import { ImageBackground, ImageProps, StyleSheet, Text, View } from 'react-native'


interface ImageBackgroundInfoProps {
    EnableBackHandler :boolean;
    imageLink_portrait :ImageProps;
    type :string;
    id : string;
    favourite :boolean ;
    name :String;
    special_Ingredient : string;
    ingredients : string;
    average_rating : number ;
    rating_count : string;
    roasted: string ;
    BackHandler ? : any ;
    ToggleFavourite : any ;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({EnableBackHandler,
    imageLink_portrait,
    type ,
    id ,
    favourite,
    name ,
    special_Ingredient,
    ingredients,
    average_rating ,
    rating_count ,
    roasted ,
    BackHandler ,
    ToggleFavourite,}) => {
  return (
    <View>
        <ImageBackground source={imageLink_portrait}
        style={styles.ItemBackGroundImage}>   
        </ImageBackground>
    </View>
  );
};



const styles = StyleSheet.create({
    ItemBackGroundImage:{
        width: '100%',
        aspectRatio : 20/25,
        justifyContent:'space-between',
    }
})

export default ImageBackgroundInfo