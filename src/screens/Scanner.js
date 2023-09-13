import React, { Component, useEffect, useState } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import api from '../api/api';
import InputHeader from '../components/InputHeader';


const Scanner = (props)=> {
  const navigation = props.navigation;
  console.log(navigation);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTodayEvents();
  }, []);

  const fetchTodayEvents = async () => {
    try {
      const response = await api.get('/todayevent');
      setEvents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const searchEventesFunction = (q) => {
    console.log(q);
    
    api.get(`/searchevent/${q}`).then(
      (response)=>setEvents(response.data.data)
    ).catch((error) => console.log(error));
}
  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchEventesFunction} />
        </View>
      {events?.map(event => (<TouchableOpacity key={event.id} onPress={e => navigation.push("renderQrcode",{ev:event})}>
        <Text style={styles.textTitle} > {event.title} </Text>
      </TouchableOpacity>))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Grey,
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default Scanner;