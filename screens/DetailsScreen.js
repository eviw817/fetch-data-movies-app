import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import MovieDetails from '../components/MovieDetails';

const DetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;


  return (
    <View style={styles.screen}>
      <MovieDetails movieId={movieId} />
      <Button
        title="Go to Movies"
        onPress={() => navigation.navigate('Movies')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  }
});
export default DetailsScreen;