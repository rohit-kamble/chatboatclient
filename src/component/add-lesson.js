import React,{Component} from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default class AddLesson extends Component {
  state = {
    value:'',
    data: []
  }


  componentDidMount(){
    this.allData();
  }

  async allData () {
   const data =  await fetch('http://localhost:5001/chatdetail')
   const mo  = await data.json();
   const newData = this.state.data;
   mo.map((item,i)=>{

    newData.push(item.name);
   });
   this.setState({data: newData})
  }

  addLesson = async (event) =>{
    event.preventDefault();
    const data = await fetch('http://localhost:5001/chatpost',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.value
      })
    });
    const mo  = await data.json();
    const newData = this.state.data;
   newData.push(mo.name);
   this.setState({data: newData})

  }

  redirect(name) {
    this.props.history.push({
      pathname: '/quetionandanswer',
      state: {name}
    })
  }

  render() {
    return (
      <div className="back2">
        <Container>
          <Row>
            <Col md={6}>
                <h1>Add new Lesson</h1>
                <Form onSubmit={this.addLesson}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      style={{textAlign: 'left'}}
                      type="text"
                      placeholder="enter lesson"
                      value={this.state.value}
                      onChange={(e)=>{this.setState({value: e.target.value})}}
                    />
                    <Form.Text className="text-muted">
                      Check lesson spelling.
                    </Form.Text>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </Col>
            <Col md={6}>
          <h2>click for Add Quetion & Answer</h2>
          <ol className="pl-4">
            {this.state.data.map((name,i)=>{
              return (
                <li style={{fontWeight: 'bold', marginBottom: '10px'}}>&nbsp;<Button variant="secondary" type="submit" onClick={()=>{this.redirect(name)}}>{name}</Button></li>
              )
            })}
          </ol>
        </Col>
          </Row>
        </Container>
      </div>
     )
  }
}
