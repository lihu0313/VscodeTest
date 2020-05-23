import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {allList: []};
  }

  componentDidMount() {
    fetch('http://www.cjlly.com:3041/record')
      .then(res => res.json())
      .then(res => {
        this.setState({
          allList: res,
        });
      });
  }

  delItems = index => {
    //删除单个选项
    var pre = [...this.state.allList];
    pre.splice(index, 1);
    this.setState({
      allList: pre,
    });
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#000'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#000" />
        {this.state.allList.map((item, index) => {
          return (
            <View key={index} style={styles.content}>
              <View style={styles.leftPart}>
                <Text style={styles.name}>{item.name}</Text>

                <Image source={{uri: item.img}} style={styles.img} />
              </View>
              <View style={styles.textWraper}>
                <Text
                  onPress={() => {
                    this.delItems(index);
                  }}
                  style={styles.circle}>
                  删除
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    width: 120,
    textAlign: 'center',
    color: '#fff',
  },
  img: {
    height: 100,
    width: 150,
  },
  textWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },

  circle: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderColor: 'green',
    borderStyle: 'solid',
    borderRadius: 27,
    paddingBottom: 2,
    lineHeight: 50,
    textAlign: 'center',
    color: '#fff',
  },
});

module.exports = App;
