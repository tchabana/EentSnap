import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTFAMILY } from '../theme/theme';

const RadioBtn = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onSelect}>
      <View style={styles.radio}>
        {selected && <View style={styles.innerRadio} />}
      </View>
      <Text style={styles.labelStyle} >{label}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  labelStyle:{
    fontWeight:"bold",
    fontSize:18,
    color:COLORS.WhiteRGBA50,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.Orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.Orange,
  },
});

export default RadioBtn;