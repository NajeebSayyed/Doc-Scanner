import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import DocumentScanner from 'react-native-document-scanner-plugin'

const ScannerScreen = ({ navigation }) => {
  const [scannedImage, setScannedImage] = useState()

  const scanDocument = async () => {
    const { scannedImages } = await DocumentScanner.scanDocument()

    if (scannedImages.length > 0) {
      setScannedImage(scannedImages[0])
      navigation.navigate('SaveOptions', { image: scannedImages[0] }) // ✅ pass image
    }
  }

  useEffect(() => {
    scanDocument()
  }, [])

  return (
    <Image
      resizeMode="contain"
      style={{ width: '100%', height: '100%' }}
      source={{ uri: scannedImage }}
    />
  )
}

export default ScannerScreen
