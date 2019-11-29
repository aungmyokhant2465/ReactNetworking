import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList,StyleSheet} from 'react-native';
import {Header, Card, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfo from '@react-native-community/netinfo';
import fetchPatients from './Fetch/fetchPatients';

class ShowPatients extends Component {
  render(){
    return(
      <View>
        <Card title={this.props.p_name}>
          <View style={styles.pContainer}>
            <View style={styles.pSubContainer}>
              <Text style={styles.subTitle}>Age</Text>
              <Text style={styles.subText}>{this.props.p_age}</Text>
            </View>
            <View style={styles.pSubContainer}>
              <Text style={styles.subTitle}>Bed No</Text>
              <Text style={styles.subText}>{this.props.p_table_no}</Text>
            </View>
          </View>
          <Divider style={{ backgroundColor: 'gray' }} />
          <View style={styles.pContainer}>
            <View style={styles.pSubContainer}>
              <Text style={styles.subTitle}>Doctor Name</Text>
              <Text style={styles.subText}>{this.props.doctor_name}</Text>
            </View>
            <View style={styles.pSubContainer}>
              <Text style={styles.subTitle}>Disease</Text>
              <Text style={styles.subText}>{this.props.category_name}</Text>
            </View>
          </View>
        </Card>
      </View>
    )
  }
}

export default class Patients extends Component{
    constructor(props){
        super(props);
        this.state={
          isConnected: false,
          patiens: [],
          loading: false
        }
      }
      componentDidMount=()=>{
        this.checkNet();
        this.getPatients();
      }
      getPatients=()=>{
        fetchPatients()
        .then((res)=>{
          this.setState({patiens: res})
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
      }
      checkNet=()=>{
        NetInfo.fetch().then(state => {
          console.log('Connection type', state.type);
          console.log('Is connected?', state.isConnected);
          if(state.isConnected){
            this.setState({isConnected: true})
          }
        });
      }
    render(){
        return(
            <View>
                 <Header
                    centerComponent={{ text: (<Text style={{color: "#fff"}}><Icon name="user-injured" size={14} color="#fff"></Icon> Patients</Text>), style: { color: '#fff' } }}
                    rightComponent={<TouchableOpacity onPress= {()=>this.props.navigation.navigate("NewPatient")}><Text><Icon name="user-plus" size={14} color="#fff"></Icon></Text></TouchableOpacity>}
                />
                <View  style={{marginBottom: 170}}>
                  <FlatList
                  refreshing={this.state.loading}
                  onRefresh={()=>this.getPatients()}
                  keyExtractor={(p)=>p.id.toString()}
                  data={this.state.patiens}
                  renderItem={(p)=>{
                    return(
                      <ShowPatients 
                      p_id={p.item.id}
                      p_name={p.item.patient_name}
                      p_age={p.item.age}
                      p_table_no={p.item.table_no}
                      doctor_name={p.item.doctor.doctor_name}
                      category_name={p.item.category.category_name}
                      ></ShowPatients>
                    )
                  }}
                  >
                  </FlatList>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
  pContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pSubContainer: {
    flexDirection: 'row',
  },
  subTitle: {
    width: '50%',
    fontSize: 11,
    color: 'gray'
  },
  subText: {
    width: '50%',
    color: 'gray'
  }

})