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

  //laad search results wanneer je in textinput typt
  const getMoviesByTitleSearch = async (enteredText) => {//argument meegegeven door onChangeText
    try {
      if (enteredText.length > 3) {
        const url = encodeURI("https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/" + enteredText + "/");
        console.log(url);
        const response = await fetch(url, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
            "x-rapidapi-key": apiKey
          }
        })
        const json = await response.json();
        console.log(json);
        setMovies(json.results);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.screen}>
      <TextInput
        placeholder="search movie"
        style={styles.input}
        onChangeText={getMoviesByTitleSearch}//geeft argument enteredText mee, denk aan de taskInputHandler uit de todo app.
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.imdb_id}//gebruik imdb_id als key voor de flatlist
        renderItem={({ item }) => (
          <MovieItem
            id={item.imdb_id}
            title={item.title}
            navigation={navigation}
            onSelectMovie={(selectedId) => { navigation.navigate('Details', { movieId: selectedId }) }}
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