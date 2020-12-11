import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import DBTransactions from './DBTransactions';

const SearchEmp = (props) => {
  const [empId, setEmpId] = useState(null);
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onBackPress();
          }}
        />
        <Appbar.Content title="Search Employee" />
      </Appbar.Header>
      <View style={{flex: 5.5, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          placeholder="Enter ID"
          style={{
            borderBottomWidth: 3,
            alignSelf: 'stretch',
            marginHorizontal: 20,
            backgroundColor: 'lightgrey',
          }}
          onChangeText={(id) => {
            setEmpId(id);
          }}
        />
      </View>
      <View style={{flex: 0.5}}>
        <Button
          mode="contained"
          style={{marginHorizontal: 20}}
          onPress={() => {
            new DBTransactions().searchEmployee(empId);
          }}>
          Search
        </Button>
      </View>
    </View>
  );
};

export default SearchEmp;
