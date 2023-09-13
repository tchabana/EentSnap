import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import InputHeader from '../components/InputHeader';
import { COLORS, SPACING } from '../theme/theme';
import api from '../api/api';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
const {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation}: any) => {
  const [events, setEvents] = useState([]);
  const searchEventesFunction = (q:any) => {
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
        <View>
        <FlatList
          data={events}
          keyExtractor={(item: any) => item.id}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('EventDetails', {event: item});
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              // isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.title}
              imagePath={""}
              genre={["Match","Consert"]}
              vote_average={20}
              vote_count={145}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Grey,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
export default SearchScreen;
