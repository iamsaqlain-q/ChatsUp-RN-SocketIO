import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {io} from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatData: [],
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
        <View>
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
          <TouchableOpacity style={styles.sendBtn}>
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
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  typeView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
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
