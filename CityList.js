import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

export default class CityList extends React.Component {
  static navigationOptions = {
    title: 'Cities',
  };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  componentDidMount() {
    //localhost에서 spring 서버를 실행할 때 다음 줄을 활성화하십시오.
    //fetch('http://localhost:8080/weather-crawler/available-cities')
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        this.setState({
          cities
        });
      });
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Text style={styles.text}>{city}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                data={this.state.cities}
      />
    );
  }
}
//배경색 수정하였습니다.
const styles = StyleSheet.create({
  navigation:{
    backgroundColor:'black',
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: Constants.statusBarHeight,
  },

  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'orange',
  },
  text: {
    color:'white',
    fontSize: 20,
    textAlign: 'center',
  }
});
