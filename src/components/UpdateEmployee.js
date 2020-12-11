import React, {useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {Appbar, Button, Menu} from 'react-native-paper';
import DBTransactions from './DBTransactions';

const UpdateEmp = (props) => {
  const [empId, setEmpId] = useState(null);
  const [address, setAddress] = useState(null);
  const [course, setCourse] = useState(null);
  const [output, setOutput] = useState(null);
  const [comp, setComp] = useState(null);
  const [perod, setPeriood] = useState(null);
  const [fields, setFileds] = useState(false);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={{flex: 1,}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onBackPress();
          }}
        />
        <Appbar.Content title="Update Employee" />
        <Menu
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => {
                openMenu();
              }}
              color="white"
            />
          }
          visible={visible}
          onDismiss={() => closeMenu()}>
          <Menu.Item
            onPress={() => {
              new DBTransactions().searchEmployee(empId);
              closeMenu();
            }}
            title="DB Details"
            style={{backgroundColor: '#fff'}}
          />
        </Menu>
      </Appbar.Header>
      <View style={{flex: 5.5, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 10,
          }}>
          <TextInput
            placeholder="Enter ID"
            style={{
              borderBottomWidth: 3,
              alignSelf: 'stretch',
              backgroundColor: 'lightgrey',
              textAlign: 'center',
              marginHorizontal: 10,
            }}
            onChangeText={(id) => {
              setEmpId(id);
            }}
          />
          <Button
            mode="contained"
            onPress={async () => {
              Keyboard.dismiss();
              const res = await new DBTransactions().searchEmployee(empId);
              if (res == 1) {
                setFileds(true);
              } else {
                ToastAndroid.show(
                  `No Such Employee Exists`,
                  ToastAndroid.SHORT,
                );
              }
            }}>
            Search
          </Button>
        </View>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
          {fields ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="Address"
                  onChangeText={(text) => {
                    setAddress(text);
                  }}
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    margin: 10,
                    width: 100,
                  }}
                />
                <Button
                  mode="contained"
                  onPress={() => {
                    new DBTransactions().updateEmployeeBasic(empId, address);
                  }}>
                  Update Address
                </Button>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  placeholder="Course"
                  onChangeText={(text) => {
                    setCourse(text);
                  }}
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    margin: 10,
                    width: 100,
                  }}
                />
                <TextInput
                  placeholder="Output"
                  onChangeText={(text) => {
                    setOutput(text);
                  }}
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    margin: 10,
                    width: 100,
                  }}
                />
                <Button
                  mode="contained"
                  onPress={() => {
                    new DBTransactions().updateEmployeeEdu(
                      empId,
                      course,
                      output,
                    );
                  }}>
                  Update Course
                </Button>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TextInput
                  placeholder="Company"
                  onChangeText={(text) => {
                    setComp(text);
                  }}
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    margin: 10,
                    width: 100,
                  }}
                />
                <TextInput
                  placeholder="Period"
                  onChangeText={(text) => {
                    setPeriood(text);
                  }}
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    margin: 10,
                    width: 100,
                  }}
                />
                <Button
                  mode="contained"
                  onPress={() => {
                    new DBTransactions().updateEmployeeWork(empId, comp, perod);
                  }}>
                  Update Work
                </Button>
              </View>
            </>
          ) : null}
        </ScrollView>
      </View>
      <View style={{flex: 0.5}}>
        {/* <Button
          mode="contained"
          style={{marginHorizontal: 20}}
          onPress={() => {}}>
          update
        </Button> */}
      </View>
    </View>
  );
};

export default UpdateEmp;

const style = StyleSheet.create({
  TextIn: {
    borderBottomWidth: 2,
    marginBottom: 10,
    width: '40%',
  },
});
