import React, { Component } from 'react'

export default class Quetion extends Component {
  state = {
    ans: false,
    newAns: [],
    subAns: '',
    data: [],
  }


  componentDidMount() {
    this.props.qes && setTimeout(() => {
      this.setState({ans: !this.state.ans})
    }, 500);

    this.showData();
    this.result();
  }

  showData () {
    fetch('http://localhost:5001/chatdetail')
    .then(res=>res.json())
    .then(res=> {
      const newAns = res.filter(item=> {
        const {name} = item;
        if(this.props.qes.includes(name)) {
          return item.name
        }
      })
      this.setState({newAns: newAns[0].data})
    })
  }

  showAnswer=(res)=>{
    const hh = this.state.newAns;
    const subAns = hh.find((item)=> {
      console.log("JSON.parse(item)**", JSON.parse(item));
      const {quetion, answer} = JSON.parse(item);
     if(res === quetion) return answer;
    }
    );
    this.setState({subAns : JSON.parse(subAns)})
  }

  result=()=>{
    const newAns=this.state.data.length > 0 &&  this.state.data.filter(item => {
      const {name} = item;
      if(this.props.qes.includes(name)) {
        return item.name
      }
    })
    this.setState({newAns})
  }
  render() {
    const {qes} = this.props;
    return (
    <>
     {qes &&
      <div className="quetiona">
        <div className="quetion">{qes}</div>
      </div>
      }
      {this.state.ans ?
        this.state.newAns.map((item, i)=>{
          console.log("**&&", JSON.parse(item));
          const {quetion} = JSON.parse(item);
          return (
            <div key={i} className="suggetiona" onClick={()=>{this.showAnswer(quetion)}}>
              <div className="quetion"><b>Quetions:</b>{quetion}</div>
            </div>
        )})
        :  <div className="suggetiona">
          Loading...
        </div>
      }
      {this.state.subAns &&
        <div className="suggetiona">
          <div className="quetion"><b>Answer:</b>{this.state.subAns.answer}</div>
        </div>
      }
   </>
    )
  }
}
