import React, {Component} from "react";
import Chatbox  from "./chatbox";
import Test from "./test";
export default class Home extends Component {
  state ={
    login: false,
    showChatboat: false,
  }


  openChat =()=> {
    this.setState({showChatboat : !this.state.showChatboat})
  }

  render() {
    let data = localStorage.getItem('login');
    let test = data !== null && JSON.parse(data);
    return(
        <>
          <Test/>
          <Chatbox login={test} chat={this.openChat} showChatboat={this.state.showChatboat}/>
        </>
  )}
}