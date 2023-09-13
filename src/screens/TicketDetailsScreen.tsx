import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import api, { baseImagePath } from '../api/api';
import { TabGlobalVariable } from './LoginScreen';
import axios from 'axios';

const TicketDetailsScreen = ({navigation, route}: any) => {
  return (
    <View style={styles.container} >
      <View style={styles.ticketDateContainer}>
          <View style={styles.subtitleContainer}>
          </View>
          <View style={styles.subtitleContainer}>
            <CustomIcon name="clock" style={styles.clockIcon} />
          </View>
        </View>
        <View style={styles.ticketSeatContainer}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subheading}>Prix</Text>
            <Text style={styles.subtitle}>500</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subheading}>Event</Text>
            <Text style={styles.subtitle}>04</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subheading}>Used</Text>
            <Text style={styles.subheading}>No</Text>
          </View>
        </View>
        <QRCode
          value={`${route.params.ticket}`}
          size={300}
        />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop:25,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Grey,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop:200
  },
  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: COLORS.Black,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  subheading: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingBottom: SPACING.space_10,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
});
export default TicketDetailsScreen;
