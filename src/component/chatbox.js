import React, { Component } from 'react';
import Suggestion from "./suggestion";
import { Link } from "react-router-dom";
import icon from './images/icon.png';
import closebutton from './images/closebutton.jpg';
import SpeechToText from './speech-to-text';
export default class Chatbox extends Component {
    state = {
      value: '',
      data: [],
      test: [],
      show: false,
      incr: 0,
      filters: [],
      testing: false
    };

    componentDidMount() {
      const data = localStorage.getItem("login");
      if(JSON.parse(data)){
        this.setState({testing: true})
      }
      this.showData();
      this.dad();
    }

    async showData() {
      const data = await fetch('http://localhost:5001/chatdetail')
      const test = await data.json();
      const uu = this.state.test;
      test.map(((item)=>{
       const {data} = item;
       data.map((item)=>{
        uu.push(JSON.parse(item));
       })
      }));
      this.setState({test: uu})
    }

    handleChange =(event)=> {
      this.filterData();
      this.setState({
        value: event.target.value,
        data: this.state.data,
        show: this.state.show
      });
    }

    handleSubmit=(event, text)=> {
      let newData = this.state.data;
      newData.push({value: text || this.state.value, incr: this.state.incr + this.state.data.length  });

      this.setState({
        value: '',
        data: newData,
        show: false,
        filters: [],
      })
      event.preventDefault();
    }

    testing =()=>{
      this.props.chat();
    }

    dad = (text, test)=>{
      const data =text && text.toLowerCase();
      this.filterData();
      this.setState({value: data});
    }

    filterData=()=>{
      let newdata = this.state.filters;
      newdata = this.state.test.filter((item)=>item.quetion.includes(this.state.value));
      this.setState({filters : newdata })
    }

    render() {
      const login = this.props.login;

      return (
        <>
          {!this.props.showChatboat ?
            <div  className="test1"><img src={icon} alt="test" onClick={this.testing}/></div>
            :
        <div className="test">
            <>
            <div className="closed-button" onClick={this.testing}><img src={closebutton} alt="closed button"/></div>
            <div className="chatbox" style={{position: 'relative'}}>

            {/* {!login ? <Link style={{position: 'absolute', top: '50%', left:'50%', transform: 'translate(-50%,-50%)', textAlign: 'center'}} className="quetion" to="/login">Log In</Link>: this.state.data.map((item,index)=> <Quetion qes={item.value} key={index} show={this.state.show} index={item.incr}/>)} */}
            {!login ?
              <Link
                style={{
                  position: 'absolute',
                  top: '50%',
                  left:'50%',
                  transform: 'translate(-50%,-50%)',
                  textAlign: 'center'}}
                className="login-button"
                to="/login"
              >Log In
              </Link>:
              this.state.data.map((item,index)=> <Suggestion qes={item.value} data={this.state.test} key={index} show={this.state.show} index={item.incr}/>)}
          </div>
          <div className="chatbox-container">
            <form onSubmit={(e)=>{this.handleSubmit(e)}} action="#">
              {this.state.filters.map((item,i)=>{
                return (
                  <div className="filter-text-container">
                     <span onClick={(e)=> this.handleSubmit(e, item.quetion)}>{item.quetion}</span>
                  </div>

                )
              })}
              <SpeechToText showSpeech={this.dad}/>
              <input type="text" placeholder="type here..." value={this.state.value} onChange={(e)=>{this.handleChange(e)}} />
            </form>
          </div>
          </>
        </div>
        }
       </>
      );
    }
  }
