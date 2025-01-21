// Import necessary libraries
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Create a stack navigator for navigation between screens
const Stack = createStackNavigator();

// Welcome Screen: Introduces the app and allows the user to sign up
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WardrobeApp</Text>
      <Text style={styles.subtitle}>Your personal fashion assistant</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Continue with Social Media" onPress={() => navigation.navigate('Preferences')} />
    </View>
  );
};

// Sign Up Screen: Allows the user to sign up with an email
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Next" onPress={() => navigation.navigate('Preferences')} />
    </View>
  );
};

// Preferences Screen: Allows the user to set their preferences
const PreferencesScreen = ({ navigation }) => {
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Preferences</Text>
      <TextInput
        style={styles.input}
        placeholder="Preferred style (e.g., casual, formal)"
        value={style}
        onChangeText={setStyle}
      />
      <TextInput
        style={styles.input}
        placeholder="Budget (e.g., $100)"
        value={budget}
        onChangeText={setBudget}
      />
      <Button title="Next" onPress={() => navigation.navigate('WardrobeSetup')} />
    </View>
  );
};

// Wardrobe Setup Screen: Allows the user to upload images of their clothing items
const WardrobeSetupScreen = () => {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Wardrobe</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <ScrollView horizontal>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
      <Button title="Next" onPress={() => alert('Wardrobe uploaded!')} />
    </View>
  );
};

// Outfit Suggestion Screen: Suggests outfits based on user preferences
const OutfitSuggestionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outfit Suggestions</Text>
      <Text>Here are some outfits tailored just for you!</Text>
      {/* Placeholder for outfit suggestions */}
      <View style={styles.outfitContainer}>
        <Text>Outfit 1</Text>
        <Text>Outfit 2</Text>
        <Text>Outfit 3</Text>
      </View>
    </View>
  );
};

// Main App Component: Sets up navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
        <Stack.Screen name="WardrobeSetup" component={WardrobeSetupScreen} />
        <Stack.Screen name="OutfitSuggestion" component={OutfitSuggestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  outfitContainer: {
    marginTop: 20,
  },
});
