import React from 'react';
import { allowUsers } from './Data';

export default class AppBaseComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.data = {}
    this.state = {
      userId:null
    }
  }
}
  //validate user for static users, this should be performed by valid and secured service
  //If user id and password get matched will return true else false.
  export const validateUserAndPassword = (userName, password) => {
    const user = allowUsers.find((item) => item.userName === userName && item.password === password);
    if(user){
      return true;
    }
    return false;
  }

  //Add passed element at the end of target list
  export const addToList = (list, item) => {
    list.push(item);
    return list;
  }

  //Remove passed element by id from target list. If id get matched first element will be deleted.
  //ID shoud be unique.
  export const removeFromList = (list, item) => {
    let id = item.id;
    let indexToRemove = list.findIndex(x => x.id ===id);
    if (indexToRemove !== -1) {
      list.splice(indexToRemove, 1);
    }
    return list;
  }

