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

  let searchTerm = search.replace(/\s+/g, " ").trim();

  const { popularPlaces, searchPlaces, isLoading, isSuccess, allPlaces } =
    useSelector((state) => state.homePlaces);

  useEffect(() => {
    dispatch(getPopularPlaces(cityName));
    setSearch("");
  }, [dispatch, cityName]);

  const handleButtonPress = (xid) => {
    navigation.navigate("PlaceInfo", { xid });
  };

  // send request to API after 2 seconds of user finished typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length) {
        dispatch(SearchPlaces({ city_name: cityName, name: searchTerm }));
      } else {
        dispatch(setAllPlaces());
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
              <TouchableWithoutFeedback onPress={() => setCityName("Paris")}>
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
                      source={{ uri: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQ1oS-DeKDIgvicoSyoD8KKoIAinTTDeC6VO7erBHEsAggFjaZYZ6YP1HkFahtlKTb_"}}
                    />
                  </View>
                  <Text style={styles.imageText}> Paris </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => setCityName("London")}>
                <View style={styles.singleImgContainer}>
                  <View
                    style={[
                      styles.innerImgContainer,
                      cityName === "London"
                        ? styles.clickedImg
                        : styles.unclickedImg,
                    ]}
                  >
                    <Image
                      style={styles.imageStyle}
                      source={{ uri: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTF9OtLxnbxSpLFzyhzXERKiAbnHlG25WfRzxRTNcRiTk0lHvsOXNKH9KNAOvTWi_sS"}}
                    />
                  </View>
                  <Text style={styles.imageText}> London </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => setCityName("Amsterdam")}
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
                      source={{ uri: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRSUt8r4QBplLPw0rG44f2yNQzwz0utUq5ty0lHJLWow-2SFhSIoV5KeEx_SdCPfgpc"}}
                    />
                  </View>
                  <Text style={styles.imageText}> Amsterdam </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => setCityName("Moscow")}>
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
                        source={{ uri: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSGLOr6Jtn3_cJTMBckutKDZpaxy7ZVLXwP5lQE0ZTHiBAqnmvEG6jotHmgHVuObRls" }}
                    />
                  </View>
                  <Text style={styles.imageText}> Moscow </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setCityName("Madrid")}>
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
                      source={{ uri: "https://cdn.britannica.com/72/132272-050-E4877C4C/Madrid-Spain.jpg"}}
                    />
                  </View>
                  <Text style={styles.imageText}> Madrid </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>

          <Text style={styles.heading}>Most Popular Places</Text>

          {isLoading || !isSuccess ? (
            <Loader />
          ) : (
            <View style={styles.popularContainer}>
              {(!allPlaces) && (
                <Text style={styles.noPlacesContainer}>No Places Found!</Text>
              )}

              {( allPlaces) &&
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
