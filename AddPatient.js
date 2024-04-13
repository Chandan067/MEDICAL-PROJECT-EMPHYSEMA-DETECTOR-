import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const AddPatient = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const navigation = useNavigation();   

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const uploadDataToServer = async () => {
        const formData = new FormData();
    
        formData.append('name', name);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('image', {
            uri: image,
            type: 'image/jpeg', // Change the type if necessary
            name: 'photo.jpg' // Change the file name if needed
        });
    
        const patientApiUrl = 'http://172.18.19.35/php/patient.php';
    
        // Send patient data to the server
        fetch(patientApiUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
            // Handle response from server if needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error if needed
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>PATIENT DETAILS</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                onChangeText={(text) => setAge(text)}
                value={age}
            />
            <TextInput
                style={styles.input}
                placeholder="Gender"
                onChangeText={(text) => setGender(text)}
                value={gender}
            />
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.input}>
                    <Text>Upload image     🖼️</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadDataToServer}>
                <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DashboardScreen')}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 20 }} />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFF',
        padding: 20,
    },
    title: {
        fontSize: 35,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        marginBottom: 70,
        color: '#C26F6F',
    },
    input: {
      height: 40,
      width: '90%',
      color: 'white',
      fontWeight: 'regular',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 40,
      paddingLeft: 10,
      backgroundColor: '#847878',
      opacity: 0.9,
      // Shadow properties
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
       },
      shadowOpacity: 5,
      shadowRadius: 3.84,
      elevation: 5, // for Android
    },
    button: {
     backgroundColor: '#903B3B',
     width: '40%',
     padding: 10,
     borderRadius: 50,
     marginBottom: 30,
      // Shadow properties
     shadowColor: '#000',
     shadowOffset: {
      width: 0,
      height: 2,
     },
     shadowOpacity: 1,
     shadowRadius: 3.84,
     elevation: 5, // for Android
     alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddPatient;
