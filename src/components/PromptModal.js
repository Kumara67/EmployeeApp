import React, {useState} from 'react';
import {Button, Modal, Portal} from 'react-native-paper';
import {Text, TextInput, View,Keyboard} from 'react-native';

const Prompt = (props) => {
  const [empid, setEmpId] = useState(null);
  const [visible, setVisible] = useState(true);
  const hideModal = () => setVisible(false);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          hideModal();
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          margin: 20,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            width: '100%',
            marginVertical: 10,
            textAlign: 'center',
          }}>
          Enter Employee ID
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 2,
            borderColor: 'purple',
            width: '100%',
            fontSize: 30,
          }}
          placeholder="Employee ID"
          onChangeText={(id) => {
            setEmpId(id);
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button
            onPress={() => {
              Keyboard.dismiss();
            //   props.updateShowModal(false);
              props.saveHandler(empid);
              hideModal();
            }}
            style={{
              fontSize: 20,
              padding: 10,
              borderRadius: 15,
              marginVertical: 20,
            }}
            mode="contained">
            Go
          </Button>
          <Button
            onPress={() => {
              props.updateShowModal(false);
              hideModal();
            }}
            mode="contained"
            style={{
              fontSize: 20,
              color: 'white',
              padding: 10,
              borderRadius: 15,
              marginVertical: 20,
            }}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default Prompt;
