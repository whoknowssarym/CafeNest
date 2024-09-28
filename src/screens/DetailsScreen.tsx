import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'

const DetailsScreen = () => {
  return (
    <View>
      <Text style={styles.textColor}>DetailsScreen</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  textColor:{
    color:COLORS.primaryBlackHex,
  }
})

export default DetailsScreen