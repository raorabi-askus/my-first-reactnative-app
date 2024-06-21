import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Text,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Switch,
} from 'react-native';

// import carsData from './Data/cars.json';
interface Car {
  id: string; // Assuming 'id' is a unique string identifier
  title: string;
  description: string;
}
const carsData: Car[] = require('../Data/cars.json');

function Details(): React.JSX.Element {
  // states
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // function to show activity indicator
  (function () {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  })();

  // function to open the modal
  const onPressButton = () => {
    setModalVisible(true);
  };

  // function to change properties of selected item
  const handleSelectedItem = (item: Car) => {
    setSelectedCar(item.id);
  };

  // functiont to refresh the list

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar animated={true} hidden={true} />
      {loading ? (
        <View style={styles?.container}>
          {/* <Text>Welcome to Details Page</Text> */}
          {/* indicator to display loading */}
          <ActivityIndicator size="large" color="#0000ff" />
          {/* <Text>Please wait a moment.</Text> */}
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView
            // to refresh site
            refreshControl={
              <RefreshControl
                tintColor="blue"
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            {/* <Text>Hello! This is my first app</Text> */}

            <Text>Click on button to view modal</Text>

            {/* switch button to open modal */}
            <Switch
              trackColor={{true: 'pink', false: 'orange'}}
              thumbColor={modalVisible ? 'blue' : 'red'}
              value={modalVisible}
              onValueChange={onPressButton}
            />

            {/* modal code */}
            <Modal
              visible={modalVisible}
              presentationStyle="fullScreen"
              animationType="slide">
              <View style={styles?.modal}>
                <Text>This is Modal on full screen</Text>
                <Pressable
                  style={styles?.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text>Close</Text>
                </Pressable>
              </View>
            </Modal>

            {/* button to open modal */}
            <Button
              color="green"
              title="Open Modal"
              nextFocusUp={23}
              onPress={onPressButton}
            />
          </ScrollView>
          {/* FlatList of car items along with image and background image, futrthermore we can also use section list here and virualizedlist also  */}
          <FlatList
            data={carsData}
            renderItem={({item}) => {
              const backgroundColor =
                item.id === selectedCar ? '#6e3b6e' : '#f9c23c';
              const color = item.id === selectedCar ? 'white' : 'black';
              return (
                <ImageBackground
                  source={require('../assets/beautiful-blurred-green-nature-background-ai-generated-photo.jpg')}>
                  {/* to remove opactiy effect here we can use TouchableHeighlight */}
                  <TouchableOpacity onPress={() => handleSelectedItem(item)}>
                    <View style={[styles?.items, {backgroundColor}]}>
                      <Image
                        style={styles?.itemImage}
                        alt="Car Image"
                        // source={require('../assets/0x0.jpg')}
                        source={{
                          uri: 'https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_1920%2Cc_limit/9.%2520DeLorean-Alpha-5%2520%255BDeLorean%255D.jpg',
                        }}
                      />
                      <View>
                        <Text style={[styles?.itemTitle, {color}]}>
                          {item?.title}
                        </Text>
                        <Text
                          numberOfLines={3}
                          ellipsizeMode="tail"
                          style={[styles?.itemDescription, {color}]}>
                          {item?.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              );
            }}
            keyExtractor={(item: Car) => item.id}
            extraData={selectedCar}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    padding: 35,
    margin: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    marginTop: 5,
    width: 250,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#f1c43c',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
