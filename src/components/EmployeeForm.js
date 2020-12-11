import React, {useState} from 'react';
import {
  Keyboard,
  View,
  NativeModules,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import {Appbar, Button, Menu} from 'react-native-paper';
import DBTransactions from './DBTransactions';

const initstate = {
  fields: [
    {
      id: 'nameDetails',
      children: [
        {
          key: 'firstName',
          val: '',
          placeholder: 'First Name',
        },
        {
          key: 'lastName',
          val: '',
          placeholder: 'Last Name',
        },
      ],
    },
    {
      id: 'additionalDetails',
      children: [
        {
          key: 'age',
          val: '',
          placeholder: 'Age',
        },
        {
          key: 'address',
          val: '',
          placeholder: 'Address',
        },
      ],
    },
  ],
  educationFields: [],
  workExperienceFields: [],
};

const empReducer = (state = initstate, action) => {
  switch (action.type) {
    case 'UPDATE_BASIC_VAL':
      const {payload, parentId, childkey} = action;
      let nFields = state.fields;
      for (let i = 0; i < nFields.length; i++) {
        if (nFields[i].id === parentId) {
          for (let j = 0; j < nFields[i].children.length; j++) {
            let child = nFields[i].children[j];
            if (child.key === childkey) {
              nFields[i].children[j].val = payload;
              break;
            }
          }
        }
      }
      return {
        ...state,
        fields: nFields,
      };
    case 'UPDATE_EDU_VAL':
      const {ePayload, eParentId, eChildkey} = action;
      let eFields = state.educationFields;
      for (let i = 0; i < eFields.length; i++) {
        if (eFields[i].id === eParentId) {
          for (let j = 0; j < eFields[i].children.length; j++) {
            let child = eFields[i].children[j];
            if (child.key === eChildkey) {
              eFields[i].children[j].val = ePayload;
              break;
            }
          }
        }
      }

      return {
        ...state,
        educationFields: eFields,
      };
    case 'UPDATE_WORK_VAL':
      const {wPayload, wParentId, wChildkey} = action;
      let wFields = state.workExperienceFields;
      for (let i = 0; i < wFields.length; i++) {
        if (wFields[i].id === wParentId) {
          for (let j = 0; j < wFields[i].children.length; j++) {
            let child = wFields[i].children[j];
            if (child.key === wChildkey) {
              wFields[i].children[j].val = wPayload;
              break;
            }
          }
        }
      }
      return {
        ...state,
        workExperienceFields: wFields,
      };

    default:
      return state;
  }
};

const dbTrans = new DBTransactions();
const EmployeeForm = (props) => {
  const [eduFields, setEduFields] = useState(1);
  const [workFields, setWorkFileds] = useState(1);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const getEmpObj = (count) => {
    return {
      key: `empObj${count}`,
      placeholder: `Employee Object ${count}`,
    };
  };
  const [redState, dispatch] = React.useReducer(empReducer, initstate);

  const icon =
    props.facePath === ''
      ? require('../icons/user.png')
      : {uri: props.facePath};
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onBackPress(0);
          }}
        />
        <Appbar.Content title="Employee Application" />
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
            title="Drop Table"
            onPress={() => {
              dbTrans.dropTables();
              {
                ToastAndroid.show(
                  `Dropping Tables Succesful`,
                  ToastAndroid.SHORT,
                );
              }
              closeMenu();
            }}
            style={{backgroundColor: '#fff'}}
          />
          <Menu.Item
            onPress={() => {
              dbTrans.getAllDetails();
              closeMenu();
            }}
            title="DB Details"
            style={{backgroundColor: '#fff'}}
          />
        </Menu>
      </Appbar.Header>
      <View style={{flex: 5.5}}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              borderWidth: 7,
              // borderRadius: 60,
              height: 130,
              width: 130,
              borderColor: 'teal',
              alignSelf: 'center',
              alignItems: 'center',
              margin: 15,
            }}
            onPress={() => {
              props.onBackPress(3);
            }}>
            <Image
              source={icon}
              style={{
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'center',
                position: 'absolute',
              }}
            />
          </TouchableOpacity>
          {redState.fields.map((item) => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}
                key={item.id}>
                {item.children.map((subitem) => {
                  return (
                    <TextInput
                      style={{flex: 3, alignSelf: 'center'}}
                      key={subitem.key}
                      placeholder={subitem.placeholder}
                      style={style.TextIn}
                      value={subitem.val}
                      onChangeText={(text) =>
                        dispatch({
                          type: 'UPDATE_BASIC_VAL',
                          parentId: item.id,
                          payload: text,
                          childkey: subitem.key,
                        })
                      }
                    />
                  );
                })}
              </View>
            );
          })}
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}>
            Education Details
          </Text>
          {redState.educationFields.map((item) => {
            return (
              <View
                key={item.id}
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                {item.children.map((subitem) => {
                  return (
                    <TextInput
                      key={subitem.key}
                      style={[style.TextIn]}
                      placeholder={subitem.placeholder}
                      onChangeText={(text) => {
                        dispatch({
                          type: 'UPDATE_EDU_VAL',
                          ePayload: text,
                          eParentId: item.id,
                          eChildkey: subitem.key,
                        });
                      }}
                    />
                  );
                })}
              </View>
            );
          })}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button
              onPress={() => {
                initstate.educationFields.push({
                  id: `CourseDetails${eduFields}`,
                  children: [
                    {
                      key: 'Course',
                      val: '',
                      placeholder: 'Course Name',
                    },
                    {
                      key: 'Output',
                      val: '',
                      placeholder: 'Passout Year',
                    },
                  ],
                });
                setEduFields(eduFields + 1);
                console.log(initstate.educationFields);
              }}
              mode="contained"
              color="darkgreen">
              add
            </Button>
            <Button
              onPress={() => {
                initstate.educationFields.pop();
                setEduFields(eduFields - 1);
                console.log(initstate.educationFields);
              }}
              mode="contained"
              color="firebrick">
              delete
            </Button>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
            }}>
            Work Experience
          </Text>
          {redState.workExperienceFields.map((item) => {
            return (
              <View
                key={item.id}
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                {item.children.map((subitem) => {
                  return (
                    <TextInput
                      key={subitem.key}
                      style={[style.TextIn]}
                      placeholder={subitem.placeholder}
                      onChangeText={(text) =>
                        dispatch({
                          type: 'UPDATE_WORK_VAL',
                          wParentId: item.id,
                          wPayload: text,
                          wChildkey: subitem.key,
                        })
                      }
                    />
                  );
                })}
              </View>
            );
          })}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button
              onPress={() => {
                initstate.workExperienceFields.push({
                  id: `WorkDetails${workFields}`,
                  children: [
                    {
                      key: 'Company',
                      val: '',
                      placeholder: 'Company Name',
                    },
                    {
                      key: 'Experience',
                      val: '',
                      placeholder: 'Period(In Years)',
                    },
                  ],
                });
                setWorkFileds(workFields + 1);
                console.log(initstate.workExperienceFields);
              }}
              mode="contained"
              color="darkgreen">
              add
            </Button>
            <Button
              onPress={() => {
                initstate.workExperienceFields.pop();
                setWorkFileds(workFields - 1);
                console.log(initstate.workExperienceFields);
              }}
              mode="contained"
              color="firebrick">
              delete
            </Button>
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <Button
          mode="contained"
          style={{marginLeft: 20, marginRight: 20}}
          color="#098"
          onPress={() => {
            Keyboard.dismiss();
            dbTrans.insertEmployee(initstate);
            props.onBackPress(0);
          }}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default EmployeeForm;

const style = StyleSheet.create({
  TextIn: {
    borderBottomWidth: 2,
    marginBottom: 10,
    width: '40%',
  },
});
