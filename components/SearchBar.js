import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <Feather
        name="search"
        size={20}
        color={"rgb(40, 152, 188)"}
        style={styles.searchIcon}
      />
      <TextInput style={styles.textInput} placeholder="Search.." />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
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
});
