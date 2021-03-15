import React, {Component} from "react";
import { Carousel, Card, CardDeck } from "react-bootstrap";
import Chatbox  from "./chatbox";
import image1 from "./images/chat1.jpeg";
import image2 from "./images/chat2.jpeg";
import image3 from "./images/chat3.jpeg";
export default class Home extends Component {
  state ={
    login: false
  }


  render() {

    let data = localStorage.getItem('login');
    let test = data !== null && JSON.parse(data);
    console.log("test***",test);
    return(
      <div>
    <div className='container-fluid'>
      <Carousel>
        <Carousel.Item>
          <img className='d-block w-100' src={image1} alt='First slide' />
          <Carousel.Caption>
            <h3>Publish your passions, your way</h3>
            <p>These include bots that help people solve legal issues, get therapy, quit smoking and learn to meditate.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={image2} alt='Third slide' />

          <Carousel.Caption>
            <h3>Choose the perfect design</h3>
            <p>
            We’re also highlighting a bot that helps inform voters about voting locations.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={image3} alt='Third slide' />

          <Carousel.Caption>
            <h3>Hang onto your memories</h3>
            <p>
            The possibilities are endless. What type of chatbot will you build?
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
    <div className='container my-5'>
      <CardDeck>
        <Card>
          <Card.Img variant='top' src='holder.js/100px160' />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant='top' src='holder.js/100px160' />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant='top' src='holder.js/100px160' />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Chatbox login={test}/>
    </div>
  </div>
  )
  }

}