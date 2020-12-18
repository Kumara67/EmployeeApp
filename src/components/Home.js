import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import CameraScreen from './Camera';
import DBTransactions from './DBTransactions';
import DeleteEmp from './DeleteEmployee';
import EmployeeForm from './EmployeeForm';
import NativeCall from './NativeCall';
import SearchEmp from './SearchEmployee';
import TableView from './TableView';
import UpdateEmp from './UpdateEmployee';

const getComponents = () => {
  const buttons = [
    {
      key: 'Register',
      onPress: () => {
        setPage(2);
      },
    },
    {
      key: 'Search',
      onPress: () => {
        setPage(6);
      },
    },
    {
      key: 'Update',
      onPress: () => {
        setPage(4);
      },
    },
    {
      key: 'Delete',
      onPress: () => {
        setPage(5);
      },
    },
    {
      key: 'View',
      onPress: () => {
        setPage(7);
      },
    },
  ];
  const [page, setPage] = useState(0);
  const [photoPath, setPhotoPath] = useState('');

  switch (page) {
    case 0:
      return (
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                flex: 0.6,
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 50,
                textAlign: 'center',
                fontFamily: 'cochin',
              }}>
              Welcome To Employee Portal
            </Text>
            {buttons.map((item) => {
              return (
                <Button
                  key={item.key}
                  mode="contained"
                  style={{
                    width: 250,
                    margin: 15,
                  }}
                  onPress={item.onPress}>
                  {item.key}
                </Button>
              );
            })}
          </View>
        </View>
      );
    case 1:
      return (
        <NativeCall
          onBackPress={() => {
            setPage(0);
          }}
        />
      );

    case 2:
      return (
        <EmployeeForm
          onBackPress={(data) => {
            setPage(data);
          }}
          facePath={photoPath}
        />
      );

    case 3:
      return (
        <CameraScreen
          onBackPress={(data) => {
            setPage(2);
            setPhotoPath(data);
          }}
        />
      );

    case 4:
      return (
        <UpdateEmp
          onBackPress={() => {
            setPage(0);
          }}
        />
      );

    case 5:
      return (
        <DeleteEmp
          onBackPress={() => {
            setPage(0);
          }}
        />
      );
    case 6:
      return (
        <SearchEmp
          onBackPress={() => {
            setPage(0);
          }}
        />
      );

      case 7:
        return(
          <TableView 
          onBackPress={() => {
            setPage(0);
          }}/>
        )

    default:
      break;
  }
};
export default Home = () => {
  return <View style={{flex: 1}}>{getComponents()}</View>;
};
