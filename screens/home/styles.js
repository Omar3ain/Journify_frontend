import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
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
});
