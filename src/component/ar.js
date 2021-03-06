import React,{Component} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
class AdminRegster extends Component{
  state = {
    name:'',
    email:'',
    password:'',
    admin: [],
  };

    componentDidMount() {
      fetch('http://localhost:5001/admin')
      .then(res=> res.json())
      .then(res=> this.setState({admin: res}))
    }

  api = ()=>{
    fetch("http://localhost:5001/admin/post", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(res => {
      const newData = this.state.admin;
      newData.push(res)
      this.setState({admin: newData})
    }
    );
  }


  submit=(e)=>{
    e.preventDefault();
    this.api();
    // this.props.history.push('/login');
    this.props.history.push({
      pathname: '/login',
      state: {admin: this.state.admin}
    })
  }

  render(){
    return(
      <div className="back2">
        <Container >
      <Row>
        <Col md={{span:6,offset:3}}>
            <h1>Admin Register</h1>

        <Form onSubmit={this.submit}>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Name </Form.Label>
        <Form.Control type="text" style={{textAlign: "left"}} onChange={(e)=>{
          this.setState({name:e.target.value})
        }} value={this.state.name} placeholder="Enter your Name" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={(e)=>{
          this.setState({email:e.target.value})
        }} value={this.state.email} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(e)=>{
          this.setState({password:e.target.value})
        }} value={this.state.password} placeholder="Password" />
      </Form.Group>



      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Col>


        </Row>

    </Container>

      </div>
      )

}

}

export default withRouter(AdminRegster)