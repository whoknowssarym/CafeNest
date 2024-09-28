import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'

const CartScreen = () => {
  return (
    <View>
      <Text style={styles.textColor}>CartScreen</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  textColor:{
    color:COLORS.primaryBlackHex,
  }

})



export default CartScreen