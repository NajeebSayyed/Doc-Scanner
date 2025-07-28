import { StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-camera-roll/camera-roll';


const SaveOptionsScreen = ({ route }) => {
  const { image } = route.params;

  const [checkedGallery, setCheckedGallery] = useState(false);
  const [checkedPdf, setCheckedPdf] = useState(false);

  const galleryCheckbox = () => setCheckedGallery(!checkedGallery);
  const pdfCheckbox = () => setCheckedPdf(!checkedPdf);



const handleSaveToGallery = async (imageUri) => {
  try {
    // Ask permission on Android
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Storage permission is required.');
        return;
      }
    }

    // Create a local file path
    const fileName = `scan_${Date.now()}.jpg`;
    const destPath = `${RNFS.PicturesDirectoryPath}/${fileName}`;

    // Copy file to gallery path
    await RNFS.copyFile(imageUri, destPath);

    // Register image in gallery
    await CameraRoll.save(destPath, { type: 'photo' });

    Alert.alert('Success', 'Image saved to gallery.');
  } catch (error) {
    console.log('Error saving to gallery:', error);
    Alert.alert('Error', 'Failed to save image.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Save To</Text>

      <View style={styles.optionRow}>
        <Icon name="photo-library" size={30} color="black" />
        <Text style={styles.optionLabel}>Gallery</Text>
        <TouchableOpacity style={styles.checkboxContainer} onPress={galleryCheckbox}>
          <View style={[styles.checkbox, checkedGallery && styles.checkedBox]}>
            {checkedGallery && <Icon name="check" size={20} color="white" />}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.optionRow}>
        <Icon name="description" size={30} color="black" />
        <Text style={styles.optionLabel}>PDF</Text>
        <TouchableOpacity style={styles.checkboxContainer} onPress={pdfCheckbox}>
          <View style={[styles.checkbox, checkedPdf && styles.checkedBox]}>
            {checkedPdf && <Icon name="check" size={20} color="white" />}
          </View>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={()=>{
        if(checkedGallery){
          handleSaveToGallery(image)
          
        }
      }}>
        <Text style={styles.save}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SaveOptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap:20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  image: {
    width: '70%',
    height: '50%',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'black',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  optionLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
    flex: 1,
  },
  checkboxContainer: {
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#555',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkedBox: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  saveBtn: {
    backgroundColor: '#000',
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
  },
  save: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
