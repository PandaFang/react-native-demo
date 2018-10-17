/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,
  Text,
  Button,
  ToastAndroid,
  Alert,
  View,
  PermissionsAndroid,
} from 'react-native';


import IntentModule from './src/nativecomp/IntentModule'

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    // this._readFilePerm =  this._readFilePerm.bind(this);
    // this._requestPermissions = this._requestPermissions.bind(this);  
  }

  show(message) {

    Alert.alert('', message);
  }

  toast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  _readFilePerm = () => {
      this._requestPermissions(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, '读写文件');
  } 


  _locatePerm() {
      IntentModule.goAppDetailSettingFromJS()
  }

  _openCameraPerm() {

  }


  async _requestPermissions(permission, humanReadableName) {
    try {
      //返回string类型
      const granted = await PermissionsAndroid.request(permission,
          {
              //第一次请求拒绝后提示用户你为什么要这个权限
              'title': '我要权限',
              'message': '没权限我不能工作，同意就好了'
          }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.show('已获取了权限');

          // 继续下一步
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          msg = '没有权限无法正常工作，前往设置打开' + humanReadableName + '权限';
          Alert.alert('', msg, [{text:'OK', onPress: () => IntentModule.goAppDetailSettingFromJS()}]);
      }
      else {
          this.show('获取权限失败');
          
          // 继续申请权限
      }
    } catch (err) {
        console.warn(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.control} title="文件权限" onPress={this._readFilePerm}/>
        <Button style={styles.control} title="定位权限" onPress={this._locatePerm}/>
        <Button style={styles.control} title="相机权限" onPress={this._openCameraPerm}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  control: {
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
