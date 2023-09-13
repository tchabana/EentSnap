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
  TextInput,
} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import api, { baseImagePath } from '../api/api';
import { TabGlobalVariable } from './LoginScreen';
import axios from 'axios';
import RadioBtn from '../components/RadioExample';
import InputHeader from '../components/InputHeader';
const RadioButton = (props:any) => {
  return (
    <View style={styles.container}>
      {props.options.map((option:any, index:any) => (
        <RadioBtn
          key={index}
          label={option}
          selected={props.payementMode === option}
          onSelect={() => props.setPayementMode(option)}
        />
      ))}
    </View>
  );
};
const EventDetailsScreen = ({navigation, route}: any) => {
  const [payementMode, setPayementMode] = useState(null);
  const [montant, setMontant] = useState(null);
  const [allcomments, setAllComment] = useState([]);
  const [comment, setComment] = useState("");
  const [event, setEvent] = useState<any>(undefined);
  useEffect(() => {    
    setEvent(route.params.event);
    allCommentsForEvent();
  }, []);
  const allCommentsForEvent = async () => {
    try {
        const response = await api.get(`/allcommentforevent/${route.params.event.id}`);
        setAllComment(response.data.data);
    } catch (error) {
        console.log(error);
    }
};
  const sendComment = (comment:string) =>{
    const rep = api.post('/comment', {
      'user_id': TabGlobalVariable.user.id,
      'message': comment, 
      'event_id': route.params.event.id,
    })
    .then(function (response) {
      setAllComment([...allcomments,response.data.data]);
      console.log(response.data);
      return true;
      
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  }
  const tmoneyOrFlooz = (reseau:string,montant:number,phone_number:string) =>{
    const rep = axios.post('https://paygateglobal.com/api/v1/pay', {
      auth_token:"06b9d5c6-d5bc-4038-a3fb-119c7f16fd01",
      phone_number:"92193983",
      amount:0,
      identifier:"gfkgdurifvjqheriumqkv",
      network:reseau,
    })
    .then(function (response) {
      //Alert.alert("info",`Reponse de PAYGATE ${response.data}`);
      console.log(response.data);
      return true;
      
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  }
  const paypal = () =>{
    return true;
  }
  const fonctionDePayement = () => {
    if (payementMode==="PayPal") {
      return paypal();
    }if (payementMode==="TMoney") {
      return tmoneyOrFlooz("TMONEY",0,"92193983");
    }if (payementMode==="Flooz") {
      return tmoneyOrFlooz("FLOOZ",0,"92193983");
    }
    return true;
  };
  const achatDeTicket = (e:any) => {
    if (payementMode===null) {
      Alert.alert("info",`Coissisez un mode de payement`);
      return 0;
    }
    if (montant===null) {
      Alert.alert("info",`Coissisez un montant`);
      return 0;
    }
    const payer:Boolean = fonctionDePayement();
    if (payer) {
      const rep = api.post('/ticket', {
        price:500,
        event_id:event.id,
        user_id:TabGlobalVariable.user.id,
        etat:true,
      })
      .then(function (response) {
        Alert.alert("info",`Ticket acheter ${response.data}`);
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      Alert.alert("info",`Une erreur est survenu lors de l'achat`);
      navigation.goBack();
    }
  };
  return (
    <ScrollView style={styles.container} 
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{uri: `${baseImagePath}${route.params.event.image_path}`}}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{uri: `${baseImagePath}${route.params.event.image_path}`}}
          style={styles.cardImage}
        />
      </View>

      <View style={styles.timeContainer}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {event?.start_at}h{' '}
          {event?.end_at}m
        </Text>
      </View>

      <View>
        <Text style={styles.title}>{event?.title}</Text>
        <View style={styles.genreContainer}>
          <View style={styles.genreBox}>
            <Text style={styles.genreText}>Match</Text>
          </View>
        </View>
        <Text style={styles.tagline}>{event?.tagline}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <Text style={styles.runtimeText}>Evenement </Text>
          <CustomIcon name="star" style={styles.starIcon} />
          <CustomIcon name="star" style={styles.starIcon} />
          <CustomIcon name="star" style={styles.starIcon} />
          <CustomIcon name="star" style={styles.starIcon} />
        </View>
        <Text style={styles.runtimeText}>Nombre de Like {event?.nbr_likes+3}k</Text>
        <Text style={styles.runtimeText}>Nombre max de place {event?.nbr_participant}</Text>
        <Text style={styles.descriptionText}>{event?.description}</Text>
      </View>
        <View style={styles.buttonBG}>
          <Text style={styles.title} >Choisisez le moyen de Payement </Text>
          <RadioButton
            options = {['PayPal ', 'TMoney ', 'Flooz ']}
            payementMode={payementMode}
            setPayementMode={setPayementMode}
          />
        </View>
        <View style={styles.buttonBG}>
          <Text style={styles.title} >Choisisez le prix du ticket  </Text>
          <RadioButton
            options = {['300  ', '500  ', '1000  ']}
            payementMode={montant}
            setPayementMode={setMontant}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={(e) => {
              achatDeTicket(e)
            }}>
            <Text style={styles.buttonText}>Acheter le Ticket</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.InputHeaderContainer}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              onChangeText={textInput => {setComment(textInput);}}
              value={comment}
              placeholder="Ajouter un commentaire"
              placeholderTextColor={COLORS.WhiteRGBA32}
            />
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={(e) => sendComment(comment)}>
              <CustomIcon
                name="send"
                color={COLORS.Orange}
                size={FONTSIZE.size_20}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          allcomments===null||allcomments[0]===undefined ? 
          <View><Text style={styles.title}>Aucun commentaire</Text></View>:
          <View style={styles.InputHeaderContainer}>
            {allcomments.map((comment)=> 
              <View style={styles.messageBoxStyle} key={comment.id} >
                <Text style={styles.messageStyle}>{comment.message + "\n"} <Text style={styles.dateStyle}>{comment.created_at}</Text></Text>
                <Image
                  source={require('../assets/image/avatar.jpg')}
                  style={styles.avatarImage}
                />
              </View> 
            )}
          </View>
        }
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 80,
  },
  dateStyle:{
    color:COLORS.DarkGrey
  },
  messageStyle:{
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
    marginHorizontal: SPACING.space_10,
    marginVertical: SPACING.space_10,
    textAlign: 'justify',
  },
  messageBoxStyle: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor:COLORS.WhiteRGBA50,
    width:"100%",
    borderRadius: 30,
    marginBottom:20,
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_28,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28,
  },
  inputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Grey,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    height:'50%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  tagline: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});
export default EventDetailsScreen;
