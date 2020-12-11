import React, {useRef, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Appbar, Button, TextInput, Text} from 'react-native-paper';
import * as RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';

const CameraScreen = (props) => {
  const [count, setCount] = useState(0);
  var camreRef = useRef(null);
  var path = '';
  const takePicture = async (cropData) => {
    const options = {quality: 0.5, base64: true, mirrorImage: true, fixOrientation:true};
    let image = await camreRef.current.takePictureAsync(options);
    ToastAndroid.show(`Capturing Face`, ToastAndroid.SHORT);
    await savePicture(image.base64, cropData);
  };

  const savePicture = async (data, cropData) => {
    path = `${RNFS.ExternalDirectoryPath}/Face-${getTimeStamp()}.jpg`;
    RNFS.writeFile(path, data, 'base64');
    const facePath = await ImageEditor.cropImage(`file://${path}`, cropData);
    props.onBackPress(facePath);
  };
  const handleFace = async (facesArray) => {
    console.log(facesArray.faces);
    if (facesArray.faces.length === 1) {
      const xVal = await facesArray.faces[0].bounds.origin.x;
      const yVal = await facesArray.faces[0].bounds.origin.y;
      const fHeight = await facesArray.faces[0].bounds.size.height;
      const fWidth = await facesArray.faces[0].bounds.size.width;
      const cropData = {
        offset: {x: xVal * 6, y: yVal},
        size: {width: fWidth * 8, height: fHeight * 10},
        // displaySize: {width: 150, height: 150},
      };
      console.log(cropData);
      const leftEye = await facesArray.faces[0].leftEyeOpenProbability;
      const rightEye = await facesArray.faces[0].rightEyeOpenProbability;

      switch (count) {
        //eye open
        case 0:
          {
            if (leftEye >= 0.85 && rightEye >= 0.85) {
              setCount(1);
            }
          }

          break;
        //eye closed
        case 1:
          {
            if (leftEye <= 0.15 && rightEye <= 0.15) {
              setCount(2);
            }
          }
          break;
        //eye open
        case 2:
          {
            if (leftEye >= 0.85 && rightEye >= 0.85) {
              setCount(3);
              takePicture(cropData);
            }
          }
          break;
        default:
          break;
      }
    }
  };

  function getTimeStamp() {
    let date = new Date();
    let comps = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    return comps.join('');
  }
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onBackPress();
          }}
        />
        <Appbar.Content title="Smile" />
      </Appbar.Header>
      <RNCamera
        ref={camreRef}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.front}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        onFacesDetected={(facesArray) => {
          handleFace(facesArray);
        }}
        
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks.all
        }>
          {ToastAndroid.show(`Please keep your face at the center`, ToastAndroid.SHORT)}
        </RNCamera>
    </View>
  );
};
export default CameraScreen;
