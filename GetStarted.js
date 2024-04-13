import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
 const navigation = useNavigation();
 return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('./image/star.gif')}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('./image/logo33.png')}
          />
        </View>
        <View style={styles.imageText}>
          <Text style={styles.text1}>Lung</Text>
          <Text style={styles.text2}>Care</Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('LoginScreen')}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
 },
 contentContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 imageContainer: {
    width: 225,
    height: 225,
    overflow: 'hidden',
    marginBottom: 100,
    marginTop: 200,   
 },
 image: {
    width: '105%',
    height: '105%',
    resizeMode: 'cover',
 },
 imageText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 100,
 },
 buttonContainer: {
    backgroundColor: '#FF5733', // blue button color
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '50%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 170, // space at the bottom
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 25,
      height: 25,
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.84,
    elevation: 10, // for Android
 },
 buttonText: {
    color: '#FFFFFF', // white text color
    fontSize: 18,
    fontWeight: 'bold',
 },
 text1: {
    fontSize: 60,
    color: 'rgba(201,29,29,1)',
 },
 text2: {
    fontSize: 60,
    color: 'rgba(93,110,153,1)',
 },
});

export default App;
