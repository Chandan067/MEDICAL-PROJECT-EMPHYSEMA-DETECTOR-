import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phno, setPhno] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [slideAnim] = useState(new Animated.Value(-200)); // Initial position outside the screen
  const [buttonAnim] = useState(new Animated.Value(200)); // Initial position outside the screen
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value

  useEffect(() => {
    // Slide in animation for the image when component mounts
    Animated.timing(
      slideAnim,
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

  const handleSignUp = () => {
    if (!username.trim() || !email.trim() || !phno.trim() || !password.trim()) {
      Alert.alert('Status', 'Please enter all required information.');
      return;
    }

    const signUpApiUrl = 'http://172.18.21.14/php/signup.php';

    fetch(signUpApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, phno, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('SignUp Response:', data);
        if (data.success) {
          Alert.alert('Status', 'Sign Up successful!');
          // Optionally, navigate to a different screen after sign-up
          // navigation.navigate('Home');
        } else {
          Alert.alert('Status', 'Sign Up failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('SignUp Error:', error);
        Alert.alert('Status', 'Sign Up failed. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <View style={styles.circleContainer}>
          <Image
            source={{ uri: 'https://thumbs.dreamstime.com/z/male-female-doctors-wearing-white-coats-standing-hospital-corridor-looking-ct-mri-scan-266804150.jpg?w=992' }}
            style={styles.profileImage}
          />
        </View>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>SIGN UP</Animated.Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setPhno}
          value={phno}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <Animated.View style={{ transform: [{ translateY: buttonAnim }] }}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DashboardScreen')}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
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
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF5733', // Custom font color
    fontFamily: 'Roboto', // Custom font family
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    width: '100%',
    color: '#333', // Custom input text color
    fontWeight: 'regular',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 40,
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
    width: 150,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
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
  circleContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
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
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SignUpScreen;
