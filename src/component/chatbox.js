import React, { Component } from 'react';
//import { Button, Input, Form } from 'reactstrap';
import Quetion  from "./quetion";
import Suggestion from "./suggestion";
import { Link } from "react-router-dom";
export default class Chatbox extends Component {
    state = {
      value: '',
      data: [],
      test: [],
      show: false,
      incr: 0,
      testing: false
    };

    componentDidMount() {
      const data = localStorage.getItem("login");
      if(JSON.parse(data)){
        this.setState({testing: true})
      }
      console.log("localstroge***", JSON.parse(data));
      this.showData();
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
      this.setState({
        value: event.target.value,
        data: this.state.data,
        show: this.state.show
      });
    }

    handleSubmit=(event)=> {
      let newData = this.state.data;
      newData.push({value: this.state.value, incr: this.state.incr + this.state.data.length  });

      this.setState({
        value: '',
        data: newData,
        show: false,
      })
      event.preventDefault();
    }


    render() {
      const login = this.props.login;
      console.log("data**", this.state);
      return (
        <>

        <div className="test">
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
                className="quetion"
                to="/login"
              >Log In
              </Link>:
              this.state.data.map((item,index)=> <Suggestion qes={item.value} data={this.state.test} key={index} show={this.state.show} index={item.incr}/>)}
          </div>
          <div className="chatbox-container">
            <form onSubmit={(e)=>{this.handleSubmit(e)}} action="#">
              <input type="text" placeholder="type here..." value={this.state.value} onChange={(e)=>{this.handleChange(e)}} />
            </form>
          </div>
        </div>
       </>
      );
    }
  }
