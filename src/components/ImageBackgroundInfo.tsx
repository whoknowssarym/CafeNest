import React from 'react'
import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import GradientBGicon from './GradientBGicon';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import Customicons from './Customicons';


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
                                                /* Upper Container Which contains Like Button and Back Button */
    <View>
        <ImageBackground source={imageLink_portrait}
        style={styles.ItemBackGroundImage}>
            {EnableBackHandler ? (
                <View style = {styles.ImageHeaderBarContainerWithBack}>
                    <TouchableOpacity onPress={BackHandler}>
                        <GradientBGicon name = 'left'
                        color={COLORS.primaryLightGreyHex} 
                        size={FONTSIZE.size_16}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{
                        ToggleFavourite(favourite , type , id);
                     }}>
                        <GradientBGicon name = 'like'
                          color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} 
                          size={FONTSIZE.size_16}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style = {styles.ImageHeaderBarContainerWithoutBack}>
                <TouchableOpacity onPress={() =>{
                        ToggleFavourite(favourite , type , id);
                    }}>
                    <GradientBGicon name = 'like'
                     color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} 
                     size={FONTSIZE.size_16}
                    />
                </TouchableOpacity>
            </View>
         )}
                                                                 {/* Second Half Which Will COontain Details OF Selected Item */}
         <View style = {styles.ImageInfoOuterContainer}>
                <View style = {styles.ImageInfoInnerContainer}>
                    <View style = {styles.InfoContainerRow}>
                        <View>
                            <Text style={styles.ItemTitleText}>{name}</Text>
                            <Text style = {styles.ItemSubTitleText}>{special_Ingredient}</Text>
                        </View>
                        <View style = {styles.ItemPropertyContainer}>
                            <View style ={styles.PropertyFirst}>
                                <Customicons 
                                  name={type == 'Bean' ? 'bean' : 'beans'}
                                  size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                                  color={COLORS.primaryOrangeHex}
                                />
                                <Text style={[styles.PropertyTextFirst , {marginTop:type=="Bean" ? SPACING.space_4+SPACING.space_2 : 0,}]}>
                                    {type}
                                </Text>
                            </View>
                            <View style ={styles.PropertyFirst}>
                                <Customicons 
                                  name={type == 'Bean' ? 'location' : 'drop'}
                                  size={FONTSIZE.size_16}
                                  color={COLORS.primaryOrangeHex}
                                />
                                <Text style={styles.PropertyTextFirst}>
                                    {ingredients}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
         </View>  
        </ImageBackground>
    </View>
  );
};



const styles = StyleSheet.create({
    ItemBackGroundImage:{
        width: '100%',
        aspectRatio : 20/25,
        justifyContent:'space-between',
    },
    ImageHeaderBarContainerWithBack:{
        padding:SPACING.space_30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    ImageHeaderBarContainerWithoutBack:{
        padding:SPACING.space_30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',

    },
    ImageInfoOuterContainer:{

    },
    ImageInfoInnerContainer:{

    },
    InfoContainerRow:{

    },
    ItemTitleText:{

    },
    ItemSubTitleText:{

    },
    ItemPropertyContainer:{

    },
    PropertyFirst:{

    },
    PropertyTextFirst:{

    },


})

export default ImageBackgroundInfo