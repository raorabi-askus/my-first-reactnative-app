import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {NavigationProp} from '@react-navigation/native'; // Import NavigationProp type

const Home = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}): React.JSX.Element => {
  const handlePress = () => navigation.navigate('Details'); // Simplify navigation handler

  return (
    <ImageBackground
      source={require('../../assets/desktop-wallpaper-dslr-nature-background-dslr-blur.jpg')}
      resizeMode="cover"
      style={styles.container}
      blurRadius={5} // Added property to apply a blur effect
    >
      <Text style={styles.welcomeText}>Welcome To Home</Text>

      <Text onPress={handlePress} style={styles.link}>
        Go to Memes Page
      </Text>
    </ImageBackground>
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
