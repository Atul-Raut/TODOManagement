import React from "react";
import { View, Text,Platform,StyleSheet, ScrollView,StatusBar, FlatList,
  TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import AppBaseComponent, {addToList, removeFromList} from "./AppBaseComponent";
import { toDoList, doingList, doneList, deletedList } from "./Data";
import UserDetails from "./dialogbox/UserDetails";
import AddTopic from "./dialogbox/AddTopic"
import Dialog, { DialogContent, DialogTitle} from "react-native-popup-dialog";


export default class Assignment extends AppBaseComponent {
  constructor(props){
      super(props);
      this.moveOrDeleteElement = this.moveOrDeleteElement.bind(this);
      this.addTopic = this.addTopic.bind(this);
      this.moveToDoing = this.moveToDoing.bind(this);
      this.moveToDone = this.moveToDone.bind(this);
      this.moveToDelete = this.moveToDelete.bind(this);
      this.state = {
        toDoList : toDoList,
        doingList : doingList,
        doneList : doneList,
        deletedList : deletedList,
        validateList:[],
        showValidatePanel:false,
        showAddTopicPanel:false,
        showValidatePanelTitle:"",
        selectedItem:null,
        actionToDo:"",
      }
  }

  //function to move or delete item
  async moveOrDeleteElement(item, targetFunction){
    targetFunction(item)
  }

  //Call back Function To Add Topic
  callbackToAddTopic = async (action, callbackInfo) => {
    this.setState({
      showAddTopicPanel:false
    });
    if('1' == action){
      this.setState((prevState) => ({
        toDoList: [...prevState.toDoList, callbackInfo.newItem,]
      }));
    }
  }

  //Callback function after user validation
  validateUserCallback = async (action, callbackInfo) => {
    this.setState({
      showValidatePanel:false
    });
    if('1' == action){
      if(this.state.actionToDo === "moveToDoing"){
        this.setState({
          doingList:addToList(this.state.doingList, this.state.selectedItem),
          toDoList:removeFromList(this.state.toDoList, this.state.selectedItem),
        });
      }
      else if(this.state.actionToDo === "moveToDone"){
        this.setState({
          doneList:addToList(this.state.doneList, this.state.selectedItem),
          doingList:removeFromList(this.state.doingList, this.state.selectedItem),
        });
      }
      else if(this.state.actionToDo === "moveToDelete"){
        this.setState({
          deletedList:addToList(this.state.deletedList, this.state.selectedItem),
          doneList:removeFromList(this.state.doneList, this.state.selectedItem),
        });
      }
    }

    this.setState({
      selectedItem:null,
      actionToDo:"",
    });
  }

  //Add topic
  async addTopic() {
      this.setState({
        showAddTopicPanel:true,
        selectedItem:null,
        actionToDo:"addTopic",
      });
  }

  //Move topic to Doing
  async moveToDoing(item){
    this.setState({
      showValidatePanel:true,
      selectedItem:item,
      showValidatePanelTitle:"User Authentication",
      actionToDo:"moveToDoing",
    });
  }

  //Move topic to done
  async moveToDone(item){
    this.setState({
      showValidatePanel:true,
      selectedItem:item,
      showValidatePanelTitle:"User Authentication",
      actionToDo:"moveToDone",
    });
  }

  //Move topic to delete
  async moveToDelete(item){
    this.setState({
      showValidatePanel:true,
      selectedItem:item,
      showValidatePanelTitle:"User Authentication",
      actionToDo:"moveToDelete",
    });
  }

render() {
  const {toDoList} = this.state;

  const CardItem = ({item, targetFun, type, status}) => (
     //Card
    <View style={[ styles.card, styles.shadowProp, { width:"100%"}, ]}>
      {/* Card Boday */}
      <View style={[styles.cardBody]}>
        <View style={{ width:"100%", height:"100%" }}>
          <Text style={[styles.cardTitle]}>
            {item.task}
          </Text>
          <Text style={[styles.cardSubItem, {}]}>
            Expected start date : {item.planedDate}
          </Text>
          <Text style={styles.cardSubItem}>
            Expected start date : {item.endDate}
          </Text>
          <Text style={styles.cardSubItem}>Status : {status}</Text>
          <Text style={styles.cardSubItem}>
            Created By : {item.createdBy}
          </Text>
          { item.responsible ? 
            <Text style={styles.cardSubItem}>
              Responsible : {item.responsible}
            </Text>
            : ""
          }
          </View>
        {/* </ImageBackground> */}
      </View>
       {/* Card Footer */}
      <View style={[styles.cardFooter]}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent:"flex-end", paddingRight:10}}>
        <TouchableOpacity
          onPress={() => this.moveOrDeleteElement(item, targetFun)}>
            { type === 'done' ? 
              <AntDesign name="delete" size={24} color="red"/>
            : 
              <FontAwesome name="angle-double-right" color="#05375a" size={24}/>
            }
          
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
      </View>
      <Animatable.View style={styles.body}>
        <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent:"space-between" }}>
          <View
            style={[ styles.cardPanel, { flexBasis: 'auto', flexGrow: 0, flexShrink: 1, }, ]}
          >
            <View style={{ flex: 1, flexDirection: 'column', justifyContent:"space-between", }}>
              <Text style={styles.titleText}> TODO</Text>
                <FlatList
                  data={toDoList}
                  renderItem={({item}) => <CardItem item={item} targetFun={this.moveToDoing} type="todo" status="Not started yet."/>}
                  keyExtractor={item => item.id}
                  style={{
                    maxHeight: 500,
                  }}
                />
            </View>
            <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.addTopic()}>
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.titleTcardFooterItemext}> Add Topic </Text>
            </View>
              
            </View>
            <View
              style={[ styles.cardPanel, { flexBasis: 'auto', flexGrow: 0, flexShrink: 1, justifyContent:"space-between" }, ]}>
              <Text style={styles.titleText}> Doing</Text>
              <FlatList
                data={doingList}
                renderItem={({item}) => <CardItem item={item} targetFun={this.moveToDone} type="doing" status="In-Progress..."/>}
                keyExtractor={item => item.id}
                style={{
                  maxHeight: 500,
                }}
              />
            </View>
            <View style={[ styles.cardPanel, {flexBasis:'auto',flexGrow: 0,flexShrink: 1,justifyContent:"space-between",},]}>
             <Text style={styles.titleText}> Done</Text>
             <FlatList
                data={doneList}
                renderItem={({item}) => <CardItem item={item} targetFun={this.moveToDelete} type="done" status="Completed"/>}
                keyExtractor={item => item.id}
                style={{
                  maxHeight: 500,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
      {/* Validation dialog */}
      <Dialog
          visible={this.state.showValidatePanel}
          dialogTitle={<DialogTitle title={this.state.showValidatePanelTitle} />}
          width={500}

      >
        <DialogContent style={{paddingRight:0, paddingLeft:0,}} >
          <UserDetails
                children={this.state.showValidatePanel}
                item={this.state.selectedItem}
                callbackFunction={this.validateUserCallback}
                style={{paddingRight:0, paddingLeft:0,}}
              >
          </UserDetails>
        </DialogContent>
      </Dialog>

      {/* Add Topic */}
      <Dialog
          visible={this.state.showAddTopicPanel}
          dialogTitle={<DialogTitle title="Add New Topic" />}
          width={500}
      >
        <DialogContent style={{paddingRight:0, paddingLeft:0,}} >
          <AddTopic
                callbackFunction={this.callbackToAddTopic}
                style={{paddingRight:0, paddingLeft:0,}}
              >
          </AddTopic>
        </DialogContent>
      </Dialog>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 0.1,
  },
  body: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#d0d3ec",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  box: {
    flex: 1,
    height: "100%",
    width: "33%",
    backgroundColor:"#fff",
    borderColor:"#606278",
    borderWidth:0.5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:"Charlie Text',sans-serif",
  },
  cardTitle: {
    fontFamily:"Charlie Text',sans-serif",
   // color:"#ffffff",
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 10,
    paddingLeft:5,
  },
  cardSubItem:{
    fontSize: 14,
    paddingVertical: 5,
    paddingLeft:10,
    fontFamily:"Charlie Text',sans-serif",
   // color:"#ffffff",
    fontWeight: '600',
  },
  cardPanel: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '33%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 2,
    width: '100%',
    marginVertical: 5,
    borderColor:"#606278",
    borderWidth:0.5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardHeader: {
    backgroundColor: '#dfe1e51a',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderColor:"#606278",
    borderBottomWidth:0.1,
    width:"100%",
  },
  cardBody: {
    paddingVertical: 0.2,
    paddingHorizontal: 0.2,
    width:"100%",
    height:"180px",
    backgroundColor:"#d2e3fd"
  },
  cardFooter: {
    backgroundColor: '#dfe1e51a',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderColor:"#606278",
    borderTopWidth:0.1,
    width:"100%",
    height:"30px"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // You can use 'contain' if you want the image to fit inside the container
    brightness: 3,
    opacity: 0.6
  },
  cardFooterItem:{
    fontSize: 14,
    paddingVertical: 5,
    paddingLeft:10,
    fontFamily:"Charlie Text',sans-serif",
    fontWeight: '600',
  },
  titleTcardFooterItemext:{
    paddingVertical: 5,
  },
});
