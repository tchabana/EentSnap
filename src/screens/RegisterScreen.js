import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import api from '../api/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  textInputWrapper: {
    width: '80%',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
    padding: 10,
  },
  button: {
    backgroundColor: '#FF5524',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20*2,
    color: COLORS.Orange,
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_28,
  },
});

const RegisterScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    // Logique de connexion
  };

  const handleRegister = () => {
    api.post('/user', {
      name: name,
      email:email,
      password:password,
      role:'client'
    })
    .then(function (response) {
      Alert.alert("info",`Iscription Valider`);
      props.navigation.push("Login");
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Event Snap</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="rgba(255, 255, 255, 0.50)"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.50)"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.50)"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="rgba(255, 255, 255, 0.50)"
          secureTextEntry
          value={cfPassword}
          onChangeText={(text) => setCfPassword(text)}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;