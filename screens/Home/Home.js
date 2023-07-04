import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { styles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getPopularPlaces,
  SearchPlaces,
  setAllPlaces,
} from "../../services/reducers/Places/placeSlice";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [cityName, setCityName] = useState("Paris");
  const [lat, setLat] = useState("48.8534951");
  const [lon, setLon] = useState("2.3483915");
  const [heading, setHeading] = useState("");

  let searchTerm = search.replace(/\s+/g, " ").trim();

  const { popularPlaces, searchPlaces, isLoading, isSuccess, allPlaces } =
    useSelector((state) => state.homePlaces);

  useEffect(() => {
    dispatch(getPopularPlaces({ city_name: cityName, lat, lon }));
    setHeading("Most Popular Places");
    setSearch("");
  }, [dispatch, cityName]);

  const handleButtonPress = (xid) => {
    navigation.navigate("PlaceInfo", { xid });
  };

  // send request to API after 2 seconds of user finished typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length) {
        dispatch(
          SearchPlaces({ city_name: cityName, lat, lon, name: searchTerm })
        );
        setHeading(`Search results for "${searchTerm}"`);
      } else {
        dispatch(setAllPlaces());
        setHeading("Most Popular Places");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={20}
              color={"rgb(40, 152, 188)"}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View style={styles.exploreContainer}>
            <Text style={styles.heading}>Explore</Text>
          </View>
          <ScrollView horizontal={true} style={styles.container}>
            <View style={styles.imagesContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCityName("Paris");
                  setLat("48.8534951");
                  setLon("2.3483915");
                }}
              >
                <View style={styles.singleImgContainer}>
                  <View
                    style={[
                      styles.innerImgContainer,
                      cityName === "Paris"
                        ? styles.clickedImg
                        : styles.unclickedImg,
                    ]}
                  >
                    <Image
                      style={styles.imageStyle}
                      source={{
                        uri: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQ1oS-DeKDIgvicoSyoD8KKoIAinTTDeC6VO7erBHEsAggFjaZYZ6YP1HkFahtlKTb_",
                      }}
                    />
                  </View>
                  <Text style={styles.imageText}> Paris </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  setCityName("Brussels");
                  setLat("50.8465573");
                  setLon("4.351697");
                }}
              >
                <View style={styles.singleImgContainer}>
                  <View
                    style={[
                      styles.innerImgContainer,
                      cityName === "Brussels"
                        ? styles.clickedImg
                        : styles.unclickedImg,
                    ]}
                  >
                    <Image
                      style={styles.imageStyle}
                      source={{
                        uri: "https://images.unsplash.com/photo-1581161424127-30b1f7eee75f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1414&q=80",
                      }}
                    />
                  </View>
                  <Text style={styles.imageText}> Brussels </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCityName("Amsterdam");
                  setLat("52.3730796");
                  setLon("4.8924534");
                }}
              >
                <View style={styles.singleImgContainer}>
                  <View
                    style={[
                      styles.innerImgContainer,
                      cityName === "Amsterdam"
                        ? styles.clickedImg
                        : styles.unclickedImg,
                    ]}
                  >
                    <Image
                      style={styles.imageStyle}
                      source={{
                        uri: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRSUt8r4QBplLPw0rG44f2yNQzwz0utUq5ty0lHJLWow-2SFhSIoV5KeEx_SdCPfgpc",
                      }}
                    />
                  </View>
                  <Text style={styles.imageText}> Amsterdam </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  setCityName("Luxor");
                  setLat("25.695292799999997");
                  setLon("32.68763493768114");
                }}
              >
                <View style={styles.singleImgContainer}>
                  <View
                    style={[
                      styles.innerImgContainer,
                      cityName === "Luxor"
                        ? styles.clickedImg
                        : styles.unclickedImg,
                    ]}
                  >
                    <Image
                      style={styles.imageStyle}
                      source={{
                        uri: "https://plus.unsplash.com/premium_photo-1661963854938-e69a4e65c1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
                      }}
                    />
                  </View>
                  <Text style={styles.imageText}> Luxor </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  setCityName("Moscow");
                  setLat("55.7504461");
                  setLon("37.6174943");
                }}
              >
                <View style={styles.singleImgContainer}>
                  <View
                    style={[
                      styles.innerImgContainer,
                      cityName === "Moscow"
                        ? styles.clickedImg
                        : styles.unclickedImg,
                    ]}
                  >
                    <Image
                      style={styles.imageStyle}
                      source={{
                        uri: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSGLOr6Jtn3_cJTMBckutKDZpaxy7ZVLXwP5lQE0ZTHiBAqnmvEG6jotHmgHVuObRls",
                      }}
                    />
                  </View>
                  <Text style={styles.imageText}> Moscow </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCityName("Madrid");
                  setLat("40.4167047");
                  setLon("-3.7035825");
                }}
              >
                <View style={styles.singleImgContainer}>
                  <View
                    style={[
                      styles.innerImgContainer,
                      cityName === "Madrid"
                        ? styles.clickedImg
                        : styles.unclickedImg,
                    ]}
                  >
                    <Image
                      style={styles.imageStyle}
                      source={{
                        uri: "https://cdn.britannica.com/72/132272-050-E4877C4C/Madrid-Spain.jpg",
                      }}
                    />
                  </View>
                  <Text style={styles.imageText}> Madrid </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
          <Text style={styles.heading}>{heading}</Text>
          {isLoading || !isSuccess ? (
            <Loader />
          ) : (
            <View style={styles.popularContainer}>
              {!allPlaces || !allPlaces?.length && (
                <Text style={styles.noPlacesContainer}>No Places Found!</Text>
              )}

              {allPlaces &&
                allPlaces.map((place) => {
                  return (
                    <TouchableWithoutFeedback
                      key={place.xid}
                      onPress={() => handleButtonPress(place.xid)}
                    >
                      <View style={styles.singlePopularContainer}>
                        <Image
                          style={styles.popularImageStyle}
                          source={{
                            uri: place.preview
                              ? place.preview.source
                              : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
                          }}
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
