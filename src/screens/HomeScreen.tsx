import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import InputHeader from '../components/InputHeader';
import api, { baseImagePath } from '../api/api';
import CategoryHeader from '../components/CategoryHeader';
import MovieCard from '../components/MovieCard';
import SubMovieCard from '../components/SubMovieCard';
import { TabGlobalVariable } from './LoginScreen';
const CATEGORIE = ["Les evenment d' aujourd'huit  ","Les evenement avenir  ","Les evenement passés  "];
const {width, height} = Dimensions.get('window');
const HomeScreen = ({navigation}: any) => {
  const [events, setEvents] = useState([]);
  const [futurevents, setFuturEvents] = useState([]);
  const [passevents, setPassEvents] = useState([]);
  const [todyevents, setTodyevents] = useState([]);

  const fetchTodayEvents = async () => {
    try {
      const response = await api.get('/todayevent');
      setTodyevents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {    
    api.get('/futurevent')       
        .then(response => setFuturEvents(response.data.data))
        .catch(error => console.error(error));
    api.get('/passevent')   
        .then(response => setPassEvents(response.data.data))    
        .catch(error => console.error(error));
    fetchTodayEvents();
  }, []);
  const changerAffichage = (e:any,i:number) => {
    //console.log(e.value);
    
    // if (todyevents[0]===undefined ) {
    //   Alert.alert("info",`Aucun évenement n'as lieu aujourd'huit`);
    //   return 0;
    // }
    // if (futurevents[0]===undefined ) {
    //   Alert.alert("info",`Aucun évenement n'est prevus dans les jours suivantes`);
    //   return 0;
    // }
    switch (i) {
      case 0:
        setEvents(todyevents);
        break;
      case 1:
        setEvents(futurevents);
        break;
      case 2:
          setEvents(passevents);
          break;
      default:
        break;
    }
    
  };
  return (
    <ScrollView style={styles.container}  bounces={false} >
      <View style={styles.headerContainer}>
        <Text style={styles.avatarText}>{TabGlobalVariable.user.name}</Text>
        <Image
          source={require('../assets/image/avatar.jpg')}
          style={styles.avatarImage}
        />
      </View>
      <FlatList
      data={CATEGORIE}
      keyExtractor={(item: any) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categorieStyle}
      renderItem={({item, index}) => {
        return (
          <View style={styles.categorieItemStyle}>
            <TouchableOpacity onPress={(e) => changerAffichage(e,index)}>
              <Text style={styles.categorieItemTextStyle}>{item}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
      />
      <CategoryHeader title={"Les evenment d' aujourd'huit"} />
      <FlatList
      data={todyevents}
      keyExtractor={(item: any) => item.id}
      bounces={false}
      snapToInterval={width * 0.7 + SPACING.space_36}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate={0}
      contentContainerStyle={styles.containerGap36}
      renderItem={({item, index}) => {
        if (todyevents[0]===undefined) {
          return (
            <View
              style={{
                width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
              }}>
              <Text>Aucun Evenement Aujourd'huit</Text>
            </View>
          );
        }
        return (
          <MovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('EventDetails', {event: item});
            }}
            cardWidth={width * 0.7}
            isFirst={index == 0 ? true : false}
            // isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.title}
            imagePath={`${baseImagePath}${item.image_path}`}
            genre={["Match","Consert"]}
            vote_average={20}
            vote_count={145}
          />
        );
      }}
      />
      <FlatList
        data={events}
        keyExtractor={(item: any) => item.id}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('EventDetails', {event: item});
            }}
            cardWidth={width * 0.7}
            isFirst={index == 0 ? true : false}
            // isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.title}
            imagePath={`${baseImagePath}${item.image_path}`}
            genre={["Match","Consert"]}
            vote_average={20}
            vote_count={145}
          />
        )}
      />
      <CategoryHeader title={'Les evenement passés'} />
      <FlatList
        data={passevents}
        keyExtractor={(item: any) => item.id}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('EventDetails', {event: item});
            }}
            cardWidth={width/1.5}
            isFirst={index == 0 ? true : false}
            //isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            imagePath={`${baseImagePath}${item.image_path}`}
            title={item.title}
            genre={["Match","Consert"]}
            vote_average={20}
            vote_count={145}
          />
        )}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Grey,
    //padding:'5%'
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
  categorieStyle:{
    paddingHorizontal: 0,
    paddingVertical:SPACING.space_32,
  },
  categorieItemStyle:{
    paddingHorizontal:15,
    paddingVertical:15,
    backgroundColor:COLORS.WhiteRGBA50,
    marginRight:15,
    elevation:1,
    borderRadius: 80,
    marginLeft:12
  },
  categorieItemTextStyle:{
    fontWeight:"bold",
    fontSize:18,
    color:COLORS.Black,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  headerContainer: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor:COLORS.WhiteRGBA50,
    width:"100%",
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    marginTop: SPACING.space_15,
    color: COLORS.Black,
    fontWeight:"bold",
    marginLeft:16,
  },
});

export default HomeScreen;
