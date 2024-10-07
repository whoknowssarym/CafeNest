import React from 'react'
import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import GradientBGicon from './GradientBGicon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
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
    ratings_count : string;
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
    ratings_count ,
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
                                <Text style={[styles.PropertyTextLast , {marginTop:type=="Bean" ? SPACING.space_4+SPACING.space_2 : 0,}]}>
                                    {type}
                                </Text>
                            </View>
                            <View style ={styles.PropertyFirst}>
                                <Customicons 
                                  name={type == 'Bean' ? 'location' : 'drop'}
                                  size={FONTSIZE.size_20}
                                  color={COLORS.primaryOrangeHex}
                                />
                                <Text style={styles.PropertyTextLast}>
                                    {ingredients}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoContainerRow}>
                        <View style={styles.RatingContainer}>
                            <Customicons 
                              name={'star'}
                              color={COLORS.primaryOrangeHex}
                              size={FONTSIZE.size_20}
                            />
                            <Text style={styles.ratingText}>{average_rating}</Text>
                            <Text style={styles.ratingCount}>{ratings_count}</Text>
                        </View>
                        <View style={styles.roastedContainer}>
                            <Text style={styles.roastedText}>{roasted}</Text>
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
        paddingVertical: SPACING.space_24,
        paddingHorizontal:SPACING.space_30,
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopLeftRadius:BORDERRADIUS.radius_20,
        borderTopRightRadius:BORDERRADIUS.radius_20,

    },
    ImageInfoInnerContainer:{
        justifyContent:'space-between',
        gap:SPACING.space_15,

    },
    InfoContainerRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    ItemTitleText:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_24,
        color:COLORS.primaryWhiteHex,

    },
    ItemSubTitleText:{
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_12,
        color:COLORS.primaryWhiteHex,

    },
    ItemPropertyContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:SPACING.space_20,

    },
    PropertyFirst:{
        height:55,
        width:55,
        borderRadius:BORDERRADIUS.radius_15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.primaryBlackHex,

    },
    PropertyTextFirst:{
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_10,
        color:COLORS.primaryWhiteHex,
    },
    RatingContainer:{
        flexDirection:'row',
        gap:SPACING.space_10,
        alignItems:'center',

    },
    ratingText:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_18,
        color:COLORS.primaryWhiteHex

    },
    ratingCount:{
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize:FONTSIZE.size_12,
        color:COLORS.primaryWhiteHex

    },
    roastedText:{
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize:FONTSIZE.size_10,
        color:COLORS.primaryWhiteHex
    },
    roastedContainer:{
        height:55,
        width:55*2 + SPACING.space_20,
        borderRadius:BORDERRADIUS.radius_15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.primaryBlackHex,
    },
    PropertyTextLast:{
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_10,
        color:COLORS.primaryWhiteHex,
        marginTop:SPACING.space_4,
        alignItems:'center',
    }


})

export default ImageBackgroundInfo