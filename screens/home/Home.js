import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { styles } from "./styles";
import SearchBar from "../../components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPopularPlaces } from "../../services/reducers/Places/placeSlice";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { popularPlaces, isLoading, isSuccess } = useSelector(
    (state) => state.places
  );

  useEffect(() => {
    dispatch(getPopularPlaces());
  }, [dispatch]);

  const handleButtonPress = (xid) => {
    navigation.navigate("PlaceInfo", { xid });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.container}>
          <SearchBar />

          <View style={styles.exploreContainer}>
            <Text style={styles.heading}>Explore</Text>
            {/* <Text style={styles.seeAll}>See All</Text> */}
          </View>

          <ScrollView horizontal={true} style={styles.container}>
            <View style={styles.imagesContainer}>
              <View style={styles.singleImgContainer}>
                <Image
                  style={styles.imageStyle}
                  source={require("../../assets/Home/hotel.png")}
                />
                <Text style={styles.imageText}> Hotel </Text>
              </View>
              <View style={styles.singleImgContainer}>
                <Image
                  style={styles.imageStyle}
                  source={require("../../assets/Home/country.png")}
                />
                <Text style={styles.imageText}> Countries </Text>
              </View>
              <View style={styles.singleImgContainer}>
                <Image
                  style={styles.imageStyle}
                  source={require("../../assets/Home/restaurant.png")}
                />
                <Text style={styles.imageText}> Restaurant </Text>
              </View>
              <View style={styles.singleImgContainer}>
                <Image
                  style={styles.imageStyle}
                  source={require("../../assets/Home/museum.png")}
                />
                <Text style={styles.imageText}> Museum </Text>
              </View>
            </View>
          </ScrollView>

          <Text style={styles.heading}>Most Popular Places</Text>

          {isLoading || !isSuccess ? (
            <Loader />
          ) : (
            // map through popular places
            <View style={styles.popularContainer}>
              {popularPlaces.map((place) => {
                return (
                  <TouchableWithoutFeedback
                    key={place.xid}
                    onPress={() => handleButtonPress(place.xid)}
                  >
                    <View style={styles.singlePopularContainer}>
                      <Image
                        style={styles.popularImageStyle}
                        source={place.preview.source}
                      />
                      <View style={styles.popularImageTextContainer}>
                        <Text style={styles.popularImageTitle}>
                          {place.name}
                        </Text>
                        <Text style={styles.popularImageText}>
                          {place.kinds.split(",").slice(0, 2).join(" - ")}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
