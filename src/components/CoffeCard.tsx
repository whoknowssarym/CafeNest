import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import Customicons from './Customicons';

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
     colors={[COLORS.primaryGreyHex,COLORS.primaryWhiteHex]}>
     <ImageBackground 
       source={imagelink_square} 
       style={styles.CardImage} 
       resizeMode='cover'>
        <View style={styles.CardRatingContainer}>
            <Customicons 
            name={'star'} 
            color={COLORS.primaryOrangeHex} 
            size={FONTSIZE.size_18}/>
            <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text>{name}</Text>
      <Text>{special_ingredient}</Text>
      <View>
        <Text> 
            $ <Text>{price.price}</Text>
        </Text>
        <TouchableOpacity>
            {/* WIll COntinue From Here  */}
        </TouchableOpacity>
      </View>

    </LinearGradient>
  )
}



const styles = StyleSheet.create({
    CardLinearGradientContainer:{},
    CardImage:{
        width:Card_WIdth,
        height:Card_WIdth,
        borderRadius:BORDERRADIUS.radius_20,
        marginBottom:SPACING.space_15,
        overflow:'hidden',
    },
    CardRatingContainer:{},
    CardRatingText:{},

})

export default CoffeCard