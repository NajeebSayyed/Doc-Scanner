import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'

const SaveOptionsScreen = ({route}) => {
  const {image } = route.params
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Save To</Text>
      
         <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
     
    </View>
  )
}

export default SaveOptionsScreen

const styles = StyleSheet.create({
    image: {
    width: '80%',
    height: '70%',
    marginBottom: 20,
  }
})