import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
const urlImage = 'https://pokeres.bastionbot.org/images/pokemon/';

export default class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getListPokemon();
  }

  getListPokemon = async () => {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
      console.log('RES:', res);
      if (res) {
        this.setState({
          data: res.data.results
        })
      }
    } catch (error) {
      console.log('error:', error);
    }
  }

  renderItem = ({ item, index }) => {
    let url = item.url;
    const idPokemon = url.split('https://pokeapi.co/api/v2/pokemon/');
    const link = urlImage + idPokemon[1].substring(0, idPokemon[1].length - 1) + ".png";
    console.log('link', link)
    return <View style={styles.item}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: link }}
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  }

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={2}
          style={styles.container}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => `key-${item.name}`}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding:4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 8,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 100,
    height: 100
  },
  text: {
    color: 'orange',
    fontWeight:'bold'
  }
})