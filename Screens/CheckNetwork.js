import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import {Header, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfo from '@react-native-community/netinfo';

export default class CheckNetwork extends Component{
    constructor(props){
        super(props);
        this.state=({
            isConnected: true
        })
      }
      componentDidMount=()=>{
          setTimeout(()=>{
            this.checkNet();
            
          },3000)
      }
      checkNet=()=>{
        NetInfo.fetch().then(state => {
            //console.log(state.isConnected)
            //state.isConnected=false;
          if(state.isConnected == true){
            this.props.navigation.navigate('Patients');
          }else{
              this.setState({isConnected: false});
          }
        });
      }
    render(){
        return(
            <View>
                <View  style={{ flex: 1, paddingTop: '60%',justifyContent: 'center',alignItems: 'center',}}>
                        <Avatar
                        rounded
                        size='large'
                        source={require('../images/network.png')}
                        >
                        </Avatar>
                        {
                            this.state.isConnected && (
                                <View>
                                    <Text style={{marginTop: 20}}>Connecting....</Text>
                                    <ActivityIndicator color="royalblue" size='small'></ActivityIndicator>
                                </View>
                            )
                        }
                        {
                            !this.state.isConnected && (
                                <View style={styles.errorBody}>
                                    <Text style={{color: 'red'}}>No neternet connection</Text>
                                </View>
                            )
                        }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    errorBody: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        marginTop: 20,
        padding: 5
    }
})