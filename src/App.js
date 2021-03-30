import React from "react";
import './App.css';
import { Header1 } from './component/Navbar';
import Contact from './component/contact';
import Home from './component/home';
import Login from './component/login';
import UserRegister from './component/ur';
import AdminRegister from './component/ar';
import AddLesson from './component/add-lesson';
import quetionandanswer from './component/quetionandanswer';
import Test from './component/test';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


function App() {
  return (
    <Router>
      <Header1/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/login" component={Login}/>
        <Route path="/userregister" component={UserRegister}/>
        <Route path="/adminregister" component={AdminRegister}/>
        <Route path="/addlesson" component={AddLesson}/>
        <Route path="/quetionandanswer" component={quetionandanswer}/>
        <Route path="/test" component={Test}/>
      </Switch>
    </Router>
  );
}

export default App;
