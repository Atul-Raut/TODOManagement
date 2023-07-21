import React from 'react';
import {SafeAreaView, StyleSheet, TextInput,
  View, Text,TouchableOpacity} from 'react-native';
import uuid from 'react-native-uuid';
import Dialog, { DialogContent, DialogTitle} from "react-native-popup-dialog";
import UserDetails from "./UserDetails";

const AddTopic = ({callbackFunction}) => {
  const [task, onChangeTask] = React.useState('');
  const [planedDate, onChangePlanedDate] = React.useState('');
  const [endDate, onChangeEndDate] = React.useState('');
  const [error, setError] = React.useState('');
  const [showValidatePanel, setShowValidatePanel] = React.useState('');
  const [newItem, setNewItem] = React.useState({});
  const [responsible, onChangeResponsibal] = React.useState('');

  const hideDialog = (action) => {
    if(action === '1'){
      if(!task || task === '' || task === null
      || !planedDate || planedDate === '' || planedDate === null
      || !endDate || endDate === '' || endDate === null
      || !responsible || responsible === '' || responsible === null
      )
      {
        setError("All fields are mandatory.");
        return;
      }
      else{
        setError("");
        setNewItem({
            "id":uuid.v4(),
            "task":task,
            "planedDate":planedDate,
            "endDate":endDate,
            "responsible":responsible,
          }
        );
        setShowValidatePanel(true);
      }
    }
    else{
      callbackFunction(action, {});
    }
  }

  const _validationcallback = async (action, callbackInfo) => {
    let callBackdata = callbackInfo;
    if('1' == action){
      newItem["createdBy"] = callBackdata["userName"];
      let callbackInfo = {
        "newItem" : newItem,
      };
      setShowValidatePanel(false);
      callbackFunction(action, callbackInfo);
    }
    else{
      setShowValidatePanel(false);
    }
  }


  return (
    <>
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTask}
        value={task}
        placeholder="Topic *"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePlanedDate}
        value={planedDate}
        placeholder="Planed Date *"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEndDate}
        value={endDate}
        placeholder="End Date *"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeResponsibal}
        value={responsible}
        placeholder="Responsible *"
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
    {/* Validation dialog */}
    <Dialog
      visible={showValidatePanel}
      dialogTitle={<DialogTitle title="User Authentication" />}
      width={500}
     >
        <DialogContent style={{paddingRight:0, paddingLeft:0,}} >
          <UserDetails
                callbackFunction={_validationcallback}
              >
          </UserDetails>
        </DialogContent>
      </Dialog>

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

export default AddTopic;
