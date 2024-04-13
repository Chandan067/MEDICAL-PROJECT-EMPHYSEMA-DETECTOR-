import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [slideAnim] = useState(new Animated.Value(-200)); // Initial position outside the screen
  const [inputAnim] = useState(new Animated.Value(+200)); // Initial position outside the screen
  const [buttonAnim] = useState(new Animated.Value(200)); // Initial position outside the screen
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value

  useEffect(() => {
    // Slide in animation when component mounts
    Animated.timing(
      slideAnim,
      {
        toValue: 0,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }
    ).start();
    // Slide in animation for inputs when component mounts
    Animated.timing(
      inputAnim,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
    // Slide in animation for buttons when component mounts
    Animated.timing(
      buttonAnim,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
    // Fade in animation for title when component mounts
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, []);

  const handleLogin = () => {
    // Login logic
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <View style={styles.squareContainer}>
          <Image
            source={require('./image/lung52.png')}
            style={styles.profileImage}
          />
        </View>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>WELCOME!!</Animated.Text>
      <Animated.View style={{ transform: [{ translateX: inputAnim }] }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: buttonAnim }] }}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>Don't have an account? 
          <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignInScreen')}> Sign up</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC3A0', // Gradient background preferred
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 27,
    color: '#FF5733', // Custom font color
    fontFamily: 'Roboto', // Custom font family
  },
  input: {
    height: 40,
    width: 300,
    color: '#333', // Custom input text color
    fontWeight: 'regular',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#FFF', // Input background color
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    backgroundColor: '#FF5733', // Custom button color
    width: 125,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    marginLeft: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto', // Custom font family
  },
  signUpText: {
    color: '#333', // Custom color for sign-up text
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpLink: {
    textDecorationLine: 'underline',
    color: '#FF5733', // Custom color for sign-up link
  },
  squareContainer: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default LoginScreen;
