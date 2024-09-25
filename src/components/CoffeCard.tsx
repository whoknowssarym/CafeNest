import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Customicons from './Customicons';
import BGIcon from './BGIcon';

const Card_WIdth = Dimensions.get('window').width*0.32;

interface CoffeCardProps{
    id :string;
    index :number;
    type :string;
    rosted :string;
    imagelink_square: ImageProps;
    name :string ;
    special_ingredient:string;
    average_rating:number;
    price :any;
    buttonPressHandler :any;
}

const CoffeCard:React.FC<CoffeCardProps> = ({id,
    index,
    type,
    rosted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler
}) => {
  return (
    <LinearGradient
     start={{x:0,y:0}}
     end={{x:1,y:1}}
     style={styles.CardLinearGradientContainer}
     colors={[COLORS.primaryDarkGreyHex,COLORS.primaryDarkGreyHex]}>
     <ImageBackground 
       source={imagelink_square} 
       style={styles.CardImage} 
       resizeMode='cover'>
        <View style={styles.CardRatingContainer}>
            <Customicons 
            name={'star'} 
            color={COLORS.primaryOrangeHex} 
            size={FONTSIZE.size_14}/>
            <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}> 
            $ <Text style={styles.CardPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity onPress={() => {}}>
            <BGIcon color={COLORS.primaryWhiteHex}
                    name = {'add'}
                    BGColor={COLORS.primaryOrangeHex}
                    size={FONTSIZE.size_10}/>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  )
}



const styles = StyleSheet.create({
    CardLinearGradientContainer:{
      padding:SPACING.space_15,
      borderRadius:BORDERRADIUS.radius_25,
    },
    CardImage:{
        width:Card_WIdth,
        height:Card_WIdth,
        borderRadius:BORDERRADIUS.radius_20,
        marginBottom:SPACING.space_15,
        overflow:'hidden',
    },
    CardRatingContainer:{
      flexDirection:'row',
      backgroundColor:COLORS.primaryBlackRGBA,
      alignItems:'center',
      justifyContent:'center',
      gap:SPACING.space_10,
      paddingHorizontal:SPACING.space_15,
      position:'absolute',
      borderBottomLeftRadius:BORDERRADIUS.radius_20,
      borderBottomRightRadius:BORDERRADIUS.radius_20,
      top:0,
      right:0,
    },
    CardRatingText:{
      fontFamily:FONTFAMILY.poppins_medium,
      color:COLORS.primaryWhiteHex,
      lineHeight:22,
      fontSize:FONTSIZE.size_14,
    },
    CardFooterRow:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:SPACING.space_15,
    },
    CardTitle:{
      fontFamily:FONTFAMILY.poppins_medium,
      color:COLORS.primaryWhiteHex,
      fontSize:FONTSIZE.size_16,
    },
    CardSubTitle:{
      fontFamily:FONTFAMILY.poppins_light,
      color:COLORS.primaryWhiteHex,
      fontSize:FONTSIZE.size_10,
    },
    CardPriceCurrency:{
      fontFamily:FONTFAMILY.poppins_semibold,
      color:COLORS.primaryOrangeHex,
      fontSize:FONTSIZE.size_18,

    },
    CardPrice:{
      color:COLORS.primaryWhiteHex,

    },



})

export default CoffeCard