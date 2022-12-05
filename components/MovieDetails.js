
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import apiKey from '../apiKey';

const MovieDetails = props => {
  const [movieDetails, setMovieDetails] = useState({});

  const getMovieDetailsById = async () => {
    try {
      const url = encodeURI("https://data-imdb1.p.rapidapi.com/movie/id/" + props.movieId + "/")
      const response = await fetch(url, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
          "x-rapidapi-key": apiKey
        }
      })
      const json = await response.json();
      setMovieDetails(json.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovieDetailsById();
  }, []);

  return (
    <ScrollView>
      <Image
        style={styles.filmPoster}
        source={{
          uri: movieDetails.banner,
        }}
      />
      <Text style={styles.title}>{movieDetails.title}</Text>
      <View style={styles.details}>
        <Text>{movieDetails.plot}</Text>
        <Text style={styles.release}>release: {movieDetails.release}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 16,
    fontSize: 24,
    textAlign: 'center',
  },
  details: {
    borderWidth: 1,
    padding: 16,
    margin: 8,
  },
  filmPoster: {
    width: '100%',
    height: 450
  },
  release: {
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
  }
});
export default MovieDetails;