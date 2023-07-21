import React from 'react';
import {SafeAreaView, StyleSheet, TextInput,
  View, Text,TouchableOpacity} from 'react-native';

import {validateUserAndPassword} from '../AppBaseComponent'

const UserDetails = ({callbackFunction}) => {
  const [userName, onChangeUserName] = React.useState('');
  const [password, onChangePasswoard] = React.useState('');
  const [error, setError] = React.useState('');
  
  const hideDialog = (action) => {
    if(action === '1'){
      if(!userName || userName === '' || userName === null
      || !password ||password === '' || password === null)
      {
        setError("All fields are mandatory.");
        return;
      }
      else{
        let result = validateUserAndPassword(userName, password);
        if(result === false){
          setError("User name or password not matched..");
          return;
        }
      }
    }

    let callbackInfo = {
      "userName":userName,
    }
    callbackFunction(action, callbackInfo);
  }


  return (
    <>
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUserName}
        value={userName}
        placeholder="User Name *"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePasswoard}
        value={password}
        placeholder="Password *"
        secureTextEntry={true}
      />
      <Text style={{color: 'red', paddingLeft:"20px"}}>
        {error}
      </Text>
    </SafeAreaView>
    <View 
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
      }}>
      <TouchableOpacity
        onPress={() => hideDialog('1')}
        style={styles.modalButton}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Submit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          hideDialog('2')
        }
        style={[styles.modalCancelButton,{backgroundColor:'#9e9e9e73', borderColor:'#9e9e9e73'}]}
      >
        <Text style={{ color: "#009387", fontWeight: "bold" }}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>


    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  modalButton: {
    height: 35,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#009387",
    borderWidth: 1,
    backgroundColor: "#009387",
    marginTop: 15,
    margin: 15,
    padding: 10,
    //width: 60,
  },
  modalCancelButton: {
    height: 35,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "indianred",
    borderWidth: 1,
    backgroundColor: "indianred",
    marginTop: 15,
    margin: 15,
    padding: 10,
    //width: 60,
  },
});

export default UserDetails;