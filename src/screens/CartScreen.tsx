import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store';

const CartScreen = () => {
  const CartList = useStore((state:any) => state.CartList);
  console.log("CartList = ",CartList.length)
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