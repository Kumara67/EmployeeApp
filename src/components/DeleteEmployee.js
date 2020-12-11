import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import App from '../App';
import DBTransactions from './DBTransactions';
import Prompt from './PromptModal';

const dbTrans = new DBTransactions();
const DeleteEmp = (props) => {
  const [empId, setEmpId] = useState(null);
  // const [modalVisi, setModal] = useState(true);
  // const hideModal = () => {
  //   setModal(false);
  // };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onBackPress();
          }}
        />
        <Appbar.Content title="Delete Employee" />
      </Appbar.Header>
      {/* {modalVisi ? (
        <Prompt
          saveHandler={(id) => {
            setEmpId(id);
          }}
        />
      ) : null} */}
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
          style={{marginHorizontal: 15}}
          mode="contained"
          onPress={() => {
            dbTrans.deleteEmployee(empId);
          }}>
          Delete
        </Button>
      </View>
    </View>
  );
};
export default DeleteEmp;
