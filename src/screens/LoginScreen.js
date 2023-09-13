import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,ContainerTitle, Alert} from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import api from '../api/api';
export const TabGlobalVariable = {
  user:{}
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  bottonContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    flexDirection:'row'
  },
  textInputWrapper: {
    width: '80%',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
    padding: 10,
    margin:5
  },
  button: {
    backgroundColor: '#FF5524',
    padding: 10,
    borderRadius: 5,
    margin:10
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

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const rep = api.post('/login', {
      email:email,
      password:password,
    })
    .then(function (response) {
      if (response.data.status===200) {
        TabGlobalVariable.user = response.data.data;
        props.navigation.push("Tab",{user:response.data.data});
      } else {
        Alert.alert("Error","Erreur de connexion")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleRegister = () => {
    props.navigation.push("Register");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Event Snap</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.50)"
          value={email}
          name="email"
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.50)"
          secureTextEntry
          name="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.bottonContainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;