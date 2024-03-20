import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "../Layout/Layout";
import Header from "../Layout/Header";
import ProductsCard from "./ProductsCard";

const Home = () => {
  return (
    <Layout>
      <Header />
      <Text style={styles.name}>World Best Tourist Places</Text>
      <ProductsCard />
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
