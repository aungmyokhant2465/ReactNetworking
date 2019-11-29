import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Patients from './Screens/Patients';
import NewPatient from './Screens/NewPatient';
import Check from './Screens/CheckNetwork';
export default class App extends Component{
  render() {
    const StackContainer=createStackNavigator({
      Check: {
        screen: Check
      },
      Patients: {
        screen: Patients,
      },
      NewPatient: {
        screen: NewPatient
      }
    },{
      initialRouteName: 'Check',
      defaultNavigationOptions: {
        header: null
      }
    });
    const AppContainer=createAppContainer(StackContainer);
    return (
      <AppContainer></AppContainer>
    )
  };
}