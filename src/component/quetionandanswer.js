import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Button, Table  } from "react-bootstrap";

class QuetionAndAnswer extends Component {
  state= {
    data: [],
    quetion: '',
    answer: '',
    editdata: '',
    edit: false,
  }

  componentDidMount(){
    this.showData();
  }

  async showData () {
    const s_d = await fetch('http://localhost:5001/chatdetail')
    const mo = await s_d.json();
    const test = mo.filter((item,i)=> item.name === this.props.location.state.name);
     this.setState({data: test[0].data})
  }

  addQuetionAndAnswer = (event)=> {
    event.preventDefault();
    this.state.edit ? this.editpush(): this.pushNewData();
    this.setState({edit: false})
  }

  async pushNewData() {
    const p_d = await fetch('http://localhost:5001/chatpost/pushquetionandanswer',{
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.props.location.state.name,
        quetion: this.state.quetion,
        answer: this.state.answer
      })
    })
    const mo = await p_d.json();
    if(mo) this.showData();
    this.setState({ quetion: "", answer: ""})
  }

  async delete(quetion) {
    const delete_data = await fetch(`http://localhost:5001/chatpost/data/delete/${quetion}`,{
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.props.location.state.name
      })
    })

    const test = await delete_data.json();
    if(test !== null) this.showData();
  }

  async edit(quetion, answer) {
    this.setState({quetion: quetion, answer: answer, edit: true, editdata: quetion});
  }

  async editpush() {
    const edit_data = await fetch(`http://localhost:5001/chatpost/data/edit/${this.state.editdata}`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.props.location.state.name,
        quetion: this.state.quetion,
        answer: this.state.answer
      })
    })
    const mo = await edit_data.json();
    if(mo !== null) this.showData();
    this.setState({quetion: "", answer: ""})
  }

  render() {
    return (
        <Container>
          <Row>
            <Col md={{span:6,offset:3}}>
              <h2>Lesson: {this.props.location.state.name}</h2>
                <Form onSubmit={this.addQuetionAndAnswer}>
                  <Form.Group controlId="formBasicEmail">
                  <Form.Label>Quetion </Form.Label>
                    <Form.Control
                      style={{textAlign: 'left'}}
                      type="text"
                      placeholder="enter quetion"
                      value={this.state.quetion}
                      onChange={(event)=>{this.setState({quetion:  event.target.value})}}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                  <Form.Label>Answer </Form.Label>
                    <Form.Control
                      style={{textAlign: 'left'}}
                      type="text"
                      placeholder="enter lesson"
                      value= {this.state.answer}
                      onChange= {(event)=>{this.setState({answer: event.target.value})}}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </Form>
            </Col>
          </Row>
          <Row>
            <Col>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Quetion</th>
                    <th>Answer</th>
                    <th>edit/delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((item,i)=>{
                    const {quetion, answer} = item !== null && JSON.parse(item);
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{quetion}</td>
                        <td>{answer}</td>
                        <td>
                          <div><button onClick={()=>{this.delete(quetion)}}>Delete</button></div>
                          <div><button onClick={()=>{this.edit(quetion, answer)}}>Edit</button></div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
      </Container>
    )
  }
}

export default withRouter(QuetionAndAnswer)