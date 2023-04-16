/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {io} from 'socket.io-client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoCall from './src/assets/components/VideoCall';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatData: [],
      videoCall: false,
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.127.189:3000');
    this.socket.on('chat message', msg => {
      this.setState({chatData: [...this.state.chatData, msg]});
    });
  }

  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.videoCall && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}>
            <VideoCall />
          </View>
        )}
        <View style={styles.topbarView}>
          <View style={styles.halfView}>
            <Ionicons name="arrow-back-outline" size={25} color="#fff" />
            <Image source={require('./src/assets/dp.png')} style={styles.img} />
            <Text style={styles.username}>User Name</Text>
          </View>
          <View style={styles.halfView}>
            <TouchableOpacity onPress={() => this.setState({videoCall: true})}>
              <Ionicons name="videocam-outline" size={25} color="#fff" />
            </TouchableOpacity>

            <Ionicons name="call-outline" size={25} color="#fff" />
            <Ionicons name="ellipsis-vertical-outline" size={25} color="#fff" />
          </View>
        </View>
        <View style={styles.flatlistView}>
          <FlatList
            data={this.state.chatData}
            key={item => item}
            renderItem={({item}) => {
              return (
                <View style={styles.itemView}>
                  <Text style={styles.itemTxt}>{item}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.typeView}>
          <TextInput
            placeholder="Type a message"
            placeholderTextColor="#D6D8D7"
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({chatMessage});
            }}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              this.submitChatMessage();
            }}>
            <Text style={styles.sendTxt}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7DED7',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topbarView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#03867E',
    width: Dimensions.get('window').width,
    padding: 10,
  },
  halfView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width / 3,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginLeft: 5,
  },
  username: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  typeView: {
    marginLeft: 5,
    padding: 10,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#fff',
    width: '75%',
    padding: 7,
    borderRadius: 20,
    color: '#D6D8D7',
  },
  sendBtn: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03867E',
    borderRadius: 20,
    marginLeft: 5,
  },
  sendTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  flatlistView: {
    flex: 17,
    padding: 15,
  },
  itemView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginVertical: 3,
  },
  itemTxt: {
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#E2FFC5',
    borderRadius: 5,
    borderTopRightRadius: 0,
    color: '#999',
    alignSelf: 'flex-end',
  },
});
