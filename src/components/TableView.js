import React from 'react';
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import {Appbar, Button, Portal} from 'react-native-paper';
import DBTransactions from './DBTransactions';

let dbTrans = new DBTransactions();
const initState = {
  empList: [],
  visible: false,
  selectedItem: null,
};
const stateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_EMPLIST':
      return {
        ...state,
        empList: action.payload,
      };
    case 'SET_VISIBLE':
      return {
        ...state,
        visible: action.payload,
      };
    case 'SET_SELECTED':
      return {
        ...state,
        selectedItem: action.payload,
      };

    default:
      break;
  }
};

const TableView = (props) => {
  const [redState, dispatch] = React.useReducer(stateReducer, initState);
  // const [empList, setEmpList] = React.useState([]);
  // const [visible, setVisible] = React.useState(false);
  // const [selectedItem, setSelected] = React.useState(null);

  const hideModal = () => dispatch({type: 'SET_VISIBLE', payload: false});
  React.useEffect(() => {
    resetList();
  }, []);

  //for reesetting the list
  const resetList = async () => {
    //In getEmployee() there is no WHERE clause hence am getting all the details from Employee Table
    const empArray = await dbTrans.getEmployee();
    // setEmpList(empArray);
    dispatch({
      type: 'SET_EMPLIST',
      payload: empArray,
    });
  };

  // for getting the list based on search input
  const getEmpList = async (data) => {
    if (data === '') {
      const empArray = await dbTrans.getEmployee();
      // setEmpList(empArray);
      dispatch({
        type: 'SET_EMPLIST',
        payload: empArray,
      });
    } else {
      //In dynamicEmpSearch am sending the input field data as parameter and using that as condition for LIKE clause and getting back the results.
      const empArray = await dbTrans.dynamicEmpSearch(data);
      // setEmpList(empArray);
      dispatch({
        type: 'SET_EMPLIST',
        payload: empArray,
      });
    }
  };
  const modalActivity = (data) => {
    // setSelected(data);
    // setVisible(true);
    dispatch({
      type: 'SET_SELECTED',
      payload: data,
    });
    dispatch({
      type: 'SET_VISIBLE',
      payload: true,
    });
  };
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onBackPress();
          }}
        />
        <Appbar.Content title="Employee List" />
      </Appbar.Header>
      <View style={{padding: 10}}>
        <TextInput
          style={{borderWidth: 1, margin: 10}}
          placeholder="Search Name"
          onChangeText={(text) => {
            getEmpList(text);
          }}
        />
      </View>

      <View style={{flex: 5.5}}>
        <Text style={{textAlign: 'center', fontSize: 25, borderBottomWidth: 3}}>
          : Employee List :
        </Text>

        <FlatList
          data={redState.empList}
          renderItem={({item}) => (
            <View
              style={{
                borderBottomWidth: 2,
                paddingVertical: 10,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  modalActivity(item);
                }}>
                <Text style={{textAlign: 'left', fontSize: 15}}>
                  EMP-ID : {item.empId}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text>First Name : {item.empFName}</Text>
                  <Text>Last Name : {item.empLName}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text>Age:{item.empAge}</Text>
                  <Text>Address:{item.empAddress}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.empId.toString()}
        />
      </View>
      {redState.visible ? (
        <EmployeeView
          item={redState.selectedItem}
          hideModal={() => {
            hideModal();
          }}
          visible={redState.visible}
        />
      ) : null}
    </View>
  );
};

export default TableView;

//Popup View Component
export const EmployeeView = (props) => {
  return (
    <Modal visible={props.visible} transparent={true}>
      <View
        style={{
          backgroundColor: '#00000088',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 50,
            borderRadius: 20,
            marginHorizontal: 50,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              borderBottomWidth: 2,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            ~Selected Employee~{' '}
          </Text>
          <Text style={{textAlign: 'left', fontSize: 15}}>
            EMP-ID : {props.item.empId}
          </Text>
          <Text>First Name : {props.item.empFName}</Text>
          <Text>Last Name : {props.item.empLName}</Text>
          <Text>Age:{props.item.empAge}</Text>
          <Text>Address:{props.item.empAddress}</Text>
          <Button
            mode="contained"
            style={{
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
            onPress={() => {
              props.hideModal();
            }}>
            OK
          </Button>
        </View>
      </View>
    </Modal>
  );
};
