import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './styles';
import Colors from '../../services/constants/colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../../services/constants/route-names';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from '@craftzdog/react-native-buffer';
const DealItems = ({data}) => {
  const navigation = useNavigation();
  // console.log(navigation);
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I5M2ZmOWJmYTBmNTlkZGM0ZTBjNjgiLCJpYXQiOjE2NzM1MDExMzd9.RShrwmDdUOqQA4nans4-3gWGZMvD0kRrXlf8IGVil_0',
  );
  const [deals, setDeals] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetch(
      'https://project-production-7b65.up.railway.app/Admin/getNearbyProducts',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          lattitude: 90.0715,
          longnitude: 29.951,
        }),
      },
    )
      .then(response => response.json())
      .then(json => setDeals(json))
      .finally(() => setIsLoading(false))
      .catch(errr => alert(errr.message));
  }, []);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@User_Token', value);
      console.log('added successfully');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleFavourite = async _id => {
    console.log('item id is', _id);
    try {
      const response = await fetch(
        `https://project-production-7b65.up.railway.app/User/addFavProduct`,
        {
          method: 'POST',
          body: JSON.stringify({
            userId: token,
            productId: _id,
          }),
          headers,
        },
      );

      const json = await response.json();
      alert(json.status);
      console.log(json);
      storeData(json);
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = ({item}) => {
    const imageData = item.image.data.data;
    const imageType = item.image.contentType;
    const base64String = Buffer.from(imageData).toString('base64');
    const imageUri = `data:${imageType};base64,${base64String}`;
    console.log(imageUri);
    return (
    

      <TouchableOpacity
        style={styles.container}
        // onPress={() => navigation.navigate(RouteNames.storeDetailScreen)}
        >
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => handleFavourite(item._id)}>
          <Icon
            type="entypo"
            name="heart"
            size={responsiveFontSize(2)}
            color={item?.selected == true ? Colors.red : Colors.grey}
            />
        </TouchableOpacity>
        <Image source={{uri:imageUri}} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.headerText}>{item.name}</Text>
          <Text style={styles.seeAllText}>Walmart</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPriceText}>$ {item.offerPrice}</Text>
            <Text style={styles.oldPriceText}>$ {item.orignalPrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
   
    );
  };

  return (
    <SafeAreaView style={styles.flatListContainer}>
      {!isloading ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={deals.products}
          renderItem={renderItem}
        />
      ) : (
        <ActivityIndicator />
      )}
      

      {/* <Text> {JSON.stringify(deals.products)}</Text> */}
    </SafeAreaView>
  );
};

export default DealItems;
