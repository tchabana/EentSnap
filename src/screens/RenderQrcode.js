import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import api from '../api/api';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

const  RenderQrcode = (props)=>{
    const navigation = props.navigation;
    const data = props.route.params;
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        allTiketForEvent();
    }, []);
    const allTiketForEvent = async () => {
        try {
            const response = await api.get(`/alltiketforevent/${data.ev.id}`);
            setTickets(response.data.data);
            if (tickets===[]) {
                navigation.goBack();
                return Alert.alert("info", "Aucun ticke pour ce evenement");
            }
        } catch (error) {
            console.log(error);
        }
    };
    onSuccess = e => {
        return Alert.alert("info", e.data)
    };
    return(
      <QRCodeScanner
        onRead={(e) => onSuccess(e)}
        showMarker={true}
        //reactivate={true}
        //flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
           <Text style={styles.textBold} >Evnte:{data.ev.title} </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.textBold}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    )
}
const styles = StyleSheet.create({
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    textTitle: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_24,
      color: COLORS.Orange,
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
  
export default RenderQrcode;
