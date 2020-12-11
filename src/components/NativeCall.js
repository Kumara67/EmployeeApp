import React, {useState} from 'react';
import {Keyboard, View, NativeModules} from 'react-native';
import {Appbar, Button, TextInput, Text} from 'react-native-paper';

const NativeCall = (props) => {
  const nativeModule = NativeModules.DemoNativeModule;
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [res, setRes] = useState(0);
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onBackPress();
          }}
        />
        <Appbar.Content title="Calculation" />
      </Appbar.Header>
      <TextInput
        placeholder="Enter 1st nnumber"
        style={{
          margin: 10,
          width: 300,
          alignSelf: 'center',
          backgroundColor: 'lightgrey',
        }}
        onChangeText={(num) => {
          var int = parseInt(num);
          setNum1(int);
        }}
      />
      <TextInput
        placeholder="Enter 2nd number"
        style={{
          margin: 10,
          width: 300,
          alignSelf: 'center',
          backgroundColor: 'lightgrey',
        }}
        onChangeText={(num) => {
          var int = parseInt(num);
          setNum2(int);
        }}
      />
      <Button
        style={{margin: 10, width: 200, alignSelf: 'center'}}
        mode="contained"
        color="teal"
        onPress={() => {
          Keyboard.dismiss();
          nativeModule.calculateResult(
            num1,
            num2,
            (res) => {
              setRes(res);
            },
            (err) => console.log(err),
          );
        }}>
        multiply
      </Button>

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#098',
            fontSize: 30,
            marginVertical: 25,
            fontWeight: 'bold',
          }}>
          Result:
        </Text>
        <Text
          style={{
            borderBottomWidth: 2,
            textAlign: 'center',
            width: 200,
            fontSize: 55,
          }}>
          {res}
        </Text>
      </View>
    </View>
  );
};

export default NativeCall;
