import React, { Component } from 'react'
import Quetion from "./component/quetion";

export default class Test extends Component {
  state = {
    value: '',
    data: [],
  };

  handleChange =(event)=> {
    this.setState({
      value: event.target.value,
      data: this.state.data
    });
  }

  handleSubmit=(event)=> {
    let newData = this.state.data;
    newData.push(this.state.value);
    this.setState({
      value: '',
      data: newData
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="chatbox">
        {this.state.data.map((item,index)=> <Quetion qes={item}/>)}
        <div className="chatbox-container">
          <form onSubmit={(e)=>{this.handleSubmit(e)}} action="#">
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={(e)=>{this.handleChange(e)}} />
            </label>
          </form>

        </div>
      </div>
    );
  }
}
