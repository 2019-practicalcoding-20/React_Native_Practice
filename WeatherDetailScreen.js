import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    //localhost에서 spring 서버를 실행할 때 다음 줄을 활성화하십시오.
    //const city = navigation.getParam('city', null);
    const city = 'Daejeon';

    //localhost에서 spring 서버를 실행할 때 다음 줄을 활성화하십시오.
    //fetch(`http://localhost:8080/weather-crawler/current-weathers/by-city-name`)
    fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    //기온
    let celsius = this.state.main.temp - 273.15;
    //습도
    let humidity = this.state.main.humidity;
    //기압
    let pressure = this.state.main.pressure;
    //바람
    let wind = this.state.wind.speed;
    //아이콘(이미지 표현 방식을 몰라서 동작하지 않습니다.)
    let icon = this.state.weather[0].icon;


    //온도, 습도, 기온 추가하였습니다.
    return (
      <View style={styles.container}>
        <Text style={styles.text}>온도: {celsius.toFixed(1)}</Text>
        <Text style={styles.text}>습도: {celsius.toFixed(1)}</Text>
        <Text style={styles.text}>풍속: {celsius.toFixed(1)}</Text>
        <Text style={styles.text}>기압: {celsius.toFixed(1)}</Text>
      </View>
    );
  }
}

//폰트 크기 조절, 색상 변경하였습니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: Constants.statusBarHeight,
  },
  text:{
    color:'white',
    fontSize: 80,
    textAlign: 'center',
},
});
