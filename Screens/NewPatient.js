import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Picker, Button} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FetchDoctors from './Fetch/fetchDoctors';
import FetchCategories from './Fetch/fetchCategory';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class NewPatients extends Component{
    constructor(props){
        super(props);
        this.state=({
            doctors: [],
            categories: [],
            patient_name: '',
            age: '',
            address: '',
            table_no: '',
            doctor_id: '',
            category_id: '',
                EName: false,
                SEName: '',
                EAge: false,
                SEAge: '',
                EAddress: false,
                SEAddress: '',
                ETable: false,
                SETable: '',
                EDoctor: false,
                SEDoctor: '',
                ECategory: false,
                SECategory: '',
                message: false,
                SMessage: '',
        })
    }
    componentDidMount=()=>{
        this.getCategories();
        this.getDoctors();
    }
    getDoctors=()=>{
        FetchDoctors()
        .then((res)=>{
            this.setState({doctors: res})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getCategories=()=>{
        FetchCategories()
        .then((res)=>{
            this.setState({categories: res})
        })
    }
    savePatient=()=>{
        if(this.state.patient_name.length <= 0){
            this.setState({EName: true, SEName: "The Patient's name field is required."});
            return true;
        }
        if(this.state.age.length <= 0){
            this.setState({EAge: true, SEAge: "The Age field is required."});
            return true;
        }
        if(this.state.address.length <= 0){
            this.setState({EAddress: true, SEAddress: "The Address field is required."});
            return true;
        }
        if(this.state.table_no.length <= 0){
            this.setState({ETable: true, SETable: "The Table No field is required."});
            return true;
        }
        if(!this.state.doctor_id){
            this.setState({EDoctor: true, SEDoctor: "The Doctor field is required."});
            return true;
        }
        if(!this.state.category_id){
            this.setState({ECategory: true, SECategory: "The Disease field is required."});
            return true;
        }
        let p={
            patient_name: this.state.patient_name,
            age: this.state.age,
            address: this.state.address,
            table_no: this.state.table_no,
            doctor_id: this.state.doctor_id,
            category_id: this.state.category_id
        }
        fetch('http://192.168.0.101:8000/api/patient/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(p),
        })
        .then(async(res)=>{
            let resJson= await res.json();
            console.log(res);
            this.setState({message: true, SMessage: resJson.message})
        })
        .catch((err)=>{
            console.log(err)
        })
        ;
    }
    render(){
        return(
            <View>
                <Header
                    leftComponent={<TouchableOpacity onPress={()=>this.props.navigation.navigate('Patients')}><Text><Icon name="arrow-alt-circle-left" size={14} color="#fff"></Icon></Text></TouchableOpacity>}
                    centerComponent={{ text: 'Add Patient', style: { color: '#fff' } }}
                />
                {
                        this.state.EName && (
                            <View style={styles.errContainer}><Text style={styles.errText}>{this.state.SEName}</Text></View>
                        )
                }
                {
                        this.state.EAge && (
                            <View style={styles.errContainer}><Text style={styles.errText}>{this.state.SEAge}</Text></View>
                        )
                }
                {
                        this.state.EAddress && (
                            <View style={styles.errContainer}><Text style={styles.errText}>{this.state.SEAddress}</Text></View>
                        )
                }
                {
                        this.state.ETable && (
                            <View style={styles.errContainer}><Text style={styles.errText}>{this.state.SETable}</Text></View>
                        )
                }
                {
                        this.state.EDoctor && (
                            <View style={styles.errContainer}><Text style={styles.errText}>{this.state.SEDoctor}</Text></View>
                        )
                }
                {
                        this.state.ECategory && (
                            <View style={styles.errContainer}><Text style={styles.errText}>{this.state.SECategory}</Text></View>
                        )
                }
                {
                        this.state.message && (
                            <View style={styles.errContainer}><Text style={{color: 'green'}}>{this.state.SMessage}</Text></View>
                        )
                }
                <KeyboardAwareScrollView enableOnAndroid={true}>
                <View style={styles.container}>
                    <View>
                        <View style={styles.formGroup}>
                            <TextInput returnKeyType="next" onChangeText={(t)=>this.setState({patient_name: t})} value={this.state.patient_name} style={styles.formControl} placeholder="Patient's name"></TextInput>
                        </View>
                        <View style={styles.formGroup}>
                            <TextInput returnKeyType="next" keyboardType="numeric" onChangeText={(t)=>this.setState({age: t})} value={this.state.age} style={styles.formControl} placeholder="Age"></TextInput>
                        </View>
                        <View style={styles.formGroup}>
                            <TextInput multiline={true} returnKeyType="next" onChangeText={(t)=>this.setState({address: t})} value={this.state.address} style={styles.formControl} placeholder="Address"></TextInput>
                        </View>
                        <View style={styles.formGroup}>
                            <Picker
                                onValueChange={(t)=>this.setState({doctor_id: t})}
                                selectedValue={this.state.doctor_id}
                            >
                                <Picker.Item label="Doctor"></Picker.Item>
                                {
                                    this.state.doctors.map((d)=>(
                                        <Picker.Item key={d.id.toString()} label={d.doctor_name} value={d.id}></Picker.Item>
                                    ))
                                }
                            </Picker>
                        </View>
                        <View style={styles.formGroup}>
                            <Picker
                                onValueChange={(t)=>this.setState({category_id: t})}
                                selectedValue={this.state.category_id}
                            >
                                <Picker.Item label="Disease"></Picker.Item>
                                {
                                    this.state.categories.map((c)=>(
                                        <Picker.Item key={c.id.toString()} label={c.category_name} value={c.id}></Picker.Item>
                                    ))
                                }
                            </Picker>
                        </View>
                        <View style={styles.formGroup}>
                            <TextInput returnKeyType="done" onChangeText={(t)=>this.setState({table_no: t})} value={this.state.table_no} style={styles.formControl} placeholder="Table No"></TextInput>
                        </View>
                        <View style={styles.formGroup}>
                            <Button title="Save" onPress={()=>this.savePatient()}></Button>
                        </View>
                    </View>
                </View>
                </KeyboardAwareScrollView>
            </View>

        )
    }
}
const styles=StyleSheet.create({
    container: {
        padding: 25,
        marginBottom: 100
    },
    formGroup: {
        marginBottom: 10
    },
    formControl: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
    },
    errContainer: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#000',
        position: 'absolute',
        top: 20,
        width: '100%',
        padding: 10
    },
    errText: {
        color: 'red',
        fontStyle: 'italic'
    }
})
//patient_name
//age
//address
//doctor_id
//category_id
//table_no