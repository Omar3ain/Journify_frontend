import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "lightgray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    marginLeft: 1,
    marginRight: 5,
  },
  textInput: {
    fontSize: 15,
    width: "90%",
    height: "90%",
  },
  exploreContainer: {
    flexDirection: "row",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
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
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  innerImgContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // borderWidth: 5,
    overflow: "hidden",
    elevation: 7,
    shadowColor: "gray",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: -1,
      height: 1,
    },
  },
  clickedImg: {
    borderWidth: 5,
  },
  unclickedImg: {
    borderWidth: 0,
  },
  imageStyle: {
    height: 100,
    width: 100,
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
    alignItems: "center",
  },
  popularImageStyle: {
    height: 150,
    width: 150,
    borderRadius: 10,
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
  popularImageTextContainer: {
    flex: 1,
    flexDirection: "column",
    marginStart: 10,
  },
  popularImageTitle: {
    fontSize: 18,
    paddingVertical: 5,
    marginBottom: 10,
    color: "#000",
    fontWeight: "bold",
  },
  popularImageText: {
    fontSize: 17,
    paddingVertical: 5,
    color: "#000",
  },
  noPlacesContainer: {
    textAlign: "center",
    color: "#666",
    fontSize: 18,
    marginVertical: 20,
  },
});
