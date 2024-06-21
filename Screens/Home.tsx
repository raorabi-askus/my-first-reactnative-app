import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const Home = ({navigation}): React.JSX.Element => {
  return (
    // <View style={styles?.container}>
    <ImageBackground
      source={require('../assets/desktop-wallpaper-dslr-nature-background-dslr-blur.jpg')}
      resizeMode="cover"
      style={styles?.container}>
      <Text style={styles?.welcomeText}>Welcome To Home</Text>
      <Text style={styles?.link} onPress={() => navigation.navigate('Details')}>
        Go to Details Page
      </Text>
    </ImageBackground>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
    textShadowColor: 'black',
    letterSpacing: 3,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 20,
  },
});

export default Home;
