import React, {useCallback, useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {fetchMemes} from '../../Features/memesApi';

// import carsData from './Data/cars.json';
interface Car {
  id: string; // Assuming 'id' is a unique string identifier
  name: string;
  captions: string;
  url: string;
}
// const carsData: Car[] = require('../Data/cars.json');

function Details(): React.JSX.Element {
  // states
  // const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {memes, loading} = useSelector(state => state.memes);

  useEffect(() => {
    dispatch(fetchMemes() as any);
  }, [dispatch]);

  // function to show activity indicator
  // (() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // })();

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
          <ActivityIndicator size="large" color="#6e3b6e" />
          {/* <Text>Please wait a moment.</Text> */}
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView
            // to refresh site
            refreshControl={
              <RefreshControl
                tintColor="#6e3b6e"
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            {/* <Text>Hello! This is my first app</Text> */}

            <Text style={styles?.title}>Memes</Text>

            {/* switch button to open modal */}
            {/* <Switch
              trackColor={{true: 'pink', false: 'orange'}}
              thumbColor={modalVisible ? 'blue' : 'red'}
              value={modalVisible}
              onValueChange={onPressButton}
            /> */}

            {/* modal code */}
            {/* <Modal
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
            </Modal> */}

            {/* button to open modal */}
            {/* <Button
              color="green"
              title="Open Modal"
              nextFocusUp={23}
              onPress={onPressButton}
            /> */}
          </ScrollView>
          {/* FlatList of car items along with image and background image, futrthermore we can also use section list here and virualizedlist also  */}
          <FlatList
            style={styles?.list}
            data={memes}
            renderItem={({item}) => {
              const backgroundColor =
                item.id === selectedCar ? '#6e3b6e' : '#F6F5F2';
              const color = item.id === selectedCar ? 'white' : 'black';
              return (
                <View style={{backgroundColor: '#BC7FCD'}}>
                  {/* <ImageBackground
                   source={require('../../assets/beautiful-blurred-green-nature-background-ai-generated-photo.jpg')}> */}
                  {/* to remove opactiy effect here we can use TouchableHeighlight */}
                  <TouchableOpacity onPress={() => handleSelectedItem(item)}>
                    <View style={[styles?.items, {backgroundColor}]}>
                      <Image
                        style={styles?.itemImage}
                        alt="Car Image"
                        // source={require('../assets/0x0.jpg')}
                        source={{
                          uri: item?.url,
                        }}
                      />
                      <View>
                        <Text style={[styles?.itemTitle, {color}]}>
                          {item?.name}
                        </Text>
                        <Text
                          numberOfLines={3}
                          ellipsizeMode="tail"
                          style={[styles?.itemDescription, {color}]}>
                          Captions: {item?.captions}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* </ImageBackground> */}
                </View>
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
  list: {
    marginBottom: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    color: '#6e3b6e',
    textAlign: 'center',
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
    width: 250,
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
