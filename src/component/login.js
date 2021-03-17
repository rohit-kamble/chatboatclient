import React,{Component} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Login extends Component {
    state={
        admin: [],
        user:[],
        email: '',
        password:'',
        loging: false,
    }
    componentDidMount (){
      fetch('http://localhost:5001/admin')
      .then(res=> res.json())
      .then(res=>{
        this.setState({user: this.state.user, admin: res})
      })

      fetch('http://localhost:5001/user')
      .then(res=>res.json())
      .then(res=>this.setState({user: res, admin: this.state.admin}))
    }

    componentDidUpdate(prevProps, prvState) {
      const adminData = prevProps.location.state && prevProps.location.state.admin;
      const userData = prevProps.location.state && prevProps.location.state.user;
      const testing = userData ? userData : this.state.user;
      const testing2 = adminData ? adminData : this.state.admin;
      if(this.state.admin.length != testing2.length) {
        this.setState({admin: adminData})
      }
      if(this.state.user.length != testing.length) {
        this.setState({user: userData})
      }
    }

    submitUserform = (e)=>{
      e.preventDefault();
     const test = this.state.user.length > 0 && this.state.user.find((item,i)=>{
        if(item.email === this.state.email && item.password === this.state.password) return true;
      })

      if(test) {
        this.props.history.push("/");
        localStorage.setItem("login", true)
      }
      else {
        alert("check your crenditail");
      }
    }

    submitAdminform = (e) =>{
      e.preventDefault();
      const test = this.state.admin.length > 0 && this.state.admin.find(item=>{
        if((item.email === this.state.email) && (item.password === this.state.password)) return true
      } );
      if(test) {
        this.props.history.push('/addlesson')
      }
      else {
        alert("check your credential")
      }
    }

    render() {

        return(
            <Container>
      <Row>
        <Col md={6}>
            <h1>User Log In</h1>
        <Form onSubmit={this.submitUserform}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e)=>{this.setState({email:e.target.value, password: this.state.password})}}
          value = {this.state.value}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e)=>{this.setState({email: this.state.email, password:e.target.value})}}
          value= {this.state.value}
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
          <Link to="/userregister">User Register</Link>

      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Col>

        <Col md={6}>
        <h1>Admin Log In</h1>
        <Form onSubmit={this.submitAdminform}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e)=>{this.setState({email:e.target.value, password: this.state.password})}}
          value = {this.state.value}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e)=>{this.setState({email: this.state.email, password:e.target.value})}}
          value= {this.state.value}
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
      <Link to="/adminregister">Admin Register</Link>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Col>
      </Row>
    </Container>
        )
    }
}

export default withRouter(Login)