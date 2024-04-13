import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const DashboardScreen = () => {
    const [image, setImageUri] = useState(null);
    const navigation = useNavigation();

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log('Image picker result:', result);

            if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
                setImageUri(result.assets[0].uri);
            } else {
                console.log('Image selection canceled or failed.');
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again later.');
        }

    };

    const handleSubmit = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log('Image picker result:', result);

            if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
                setImageUri(result.assets[0].uri);
            } else {
                console.log('Image selection canceled or failed.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Alert.alert('Error', 'Failed to submit form. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.toggleDrawer()}>
                <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Emphysema Detector</Text>
                </View>
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.input}>
                        <Text>Upload image 🖼️</Text>
                    </View>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enter</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const CustomDrawerContent = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImageUri] = useState(null);
    const navigation = useNavigation();

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log('Image picker result:', result);

            if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
                setImageUri(result.assets[0].uri);
            } else {
                console.log('Image selection canceled or failed.');
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again later.');
        }

    };

    const handleSubmit = async () => {
        try {
            if (!name || !age || !gender) {
                Alert.alert('All fields are required');
                return;
            }

            // Your submit logic here

        } catch (error) {
            console.error('Error submitting details:', error);
            Alert.alert('Error', 'Failed to submit details. Please try again later.');
        }
    };


    return (
        <DrawerContentScrollView>
            <View style={styles.container}>
                <View style={styles.drawerItem}>
                    <Text style={styles.drawerItemText}>Add Patient</Text>
                </View>
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
                        <Text>Upload image 🖼️</Text>
                    </View>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const AppDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        height:'100%',
        backgroundColor: '#FFC3A0', // Gradient background preferred
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC3A0',
        padding: 20,
    },
    titleContainer: {
        width: 250,
        height: 100,
        backgroundColor: '#FF5733',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopStartRadius: 25,
        display:'flex',
        marginBottom: 70,
        marginTop:40,
        // Shadow properties
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 7,
        shadowRadius: 3.84,
        elevation: 7, // for Android
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        // Add shadow for better visual effect
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    input: {
        height: 40,
        width: 250,
        color: '#333',
        fontWeight: 'regular',
        borderColor: '#E6E6E6',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 50,
        marginLeft: 15,
        paddingLeft: 10,
        backgroundColor: '#FFF',
        opacity: 0.9,
        // Shadow properties
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 8,
        shadowRadius: 3.84,
        elevation: 5, // for Android
    },
    button: {
        backgroundColor: '#FF5733', // Custom button color
        width: '40%',
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 70,
        marginLeft: 15,
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
    button1: {
        backgroundColor: '#FF5733', // Custom button color
        width: '40%',
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 300,
        marginLeft: 75,
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    menuButtonText: {
        fontSize: 24,
        color: '#000',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
    drawerItem: {
        backgroundColor: '#FF5733',
        marginLeft: 20,
        width: '80%',
        borderRadius: 25,
        padding: 10,
        marginTop: 20,
        marginBottom: 50,
        // Custom styling for cloud shape
        position: 'relative',
        overflow: 'hidden',
        // Shadow properties
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 5,
        shadowRadius: 3.84,
        elevation: 7, // for Android
        alignItems: 'center',
    },
    drawerItemText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        // Add shadow for better visual effect
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
});

export default AppDrawer;
