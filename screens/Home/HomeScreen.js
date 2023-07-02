// 5ae2e3f221c38a28845f05b6d5e98746c0872d8aa355d2b6398141a6
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
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
          <View style={styles.popularContainer}>
            <View style={styles.singlePopularContainer}>
              <Image
                style={styles.popularImageStyle}
                source={require("../../assets/4085561.png")}
              />
              <Text style={styles.popularImageText}>
                {" "}
                Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.{" "}
              </Text>
            </View>

            <View style={styles.singlePopularContainer}>
              <Image
                style={styles.popularImageStyle}
                source={require("../../assets/4085561.png")}
              />
              <Text style={styles.popularImageText}>
                {" "}
                Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.{" "}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Countries")}>
          <Text>Go To Countries</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  exploreContainer: {
    flexDirection: "row",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 15,
    marginStart: 5,
  },
  seeAll: {
    fontSize: 16,
    color: "#000",
    paddingTop: 5,
    marginVertical: 15,
    marginLeft: "auto",
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  singleImgContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "lightgray",
  },
  imageText: {
    fontSize: 16,
    padding: 5,
    color: "#000",
  },
  popularContainer: {
    flexDirection: "column",
    paddingVertical: 10,
  },
  singlePopularContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  popularImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: "lightgray",
    margin: 10,
  },
  popularImageText: {
    fontSize: 16,
    padding: 10,
    margin: 10,
    color: "#000",
  },
});
