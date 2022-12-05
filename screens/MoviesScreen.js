import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';

import apiKey from '../apiKey';
import MovieItem from '../components/MovieItem';

const MoviesScreen = ({ navigation }) => {

  const [movies, setMovies] = useState([]);

  const getUpcommingMovies = async () => {
    try {
      const response = await fetch("https://moviesminidatabase.p.rapidapi.com/movie/order/byRating/", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
          "x-rapidapi-key": apiKey
        }
      })
      const json = await response.json();
      console.log(json);
      setMovies(json.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUpcommingMovies();//laad upcomming movies wanneer het scherm laadt
  }, []);


  return (
    <View style={styles.screen}>
      <FlatList
        data={movies}
        keyExtractor={item => item.imdb_id}//gebruik imdb_id als key voor de flatlist
        renderItem={({ item }) => (
          <MovieItem
            id={item.imdb_id}
            title={item.title}
          />
        )}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  }
});
export default MoviesScreen;