import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js'
import Rank from './Components/Rank/Rank.js'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js'
import Signin from './Components/Signin/Signin.js'
import Register from './Components/Register/Register.js'
// import Clarifai from 'clarifai'

import './App.css';


const particlesOptions = {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  faces: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      faces: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {

    // console.log('loadUser',data)

    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (evt) => {
    this.setState({input: evt.target.value})
  }

  onButtonSubmit = async () => {

    this.setState({
      imageUrl: this.state.input
    });

    try {
      
      const imgUrlResponse = await fetch('http://localhost:3001/imageurl', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({
            input: this.state.input
          })
      })

      const response = await imgUrlResponse.json();

      if (response) {

        const imgRes = await fetch('http://localhost:3001/image', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.user.id
            })
        })

        const entries = await imgRes.json();
        this.setState(Object.assign(this.state.user, { entries: entries }))

        const faces = response.outputs[0].data.regions;
        this.setState({faces});
      }

    } catch (error) {
      console.error('onButtonSubmit error', error);
    }
    
  }

  onRouteChnage = (route) => {

    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }

    this.setState({route: route});
  }

  render() {

    const { isSignedIn, imageUrl, faces, route, user  } = this.state;

    return (
      <div className="App">
        <Particles params={particlesOptions} className='particles' />
        <Navigation onRouteChnage={this.onRouteChnage} isSignedIn={isSignedIn}/>
        
        {
          route === 'home'
          ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition imageUrl={imageUrl} faces={faces} />
            </div>
          : (
              this.state.route === 'signout'
              ? <Signin onRouteChnage={this.onRouteChnage} loadUser={this.loadUser} />
              : <Register onRouteChnage={this.onRouteChnage} loadUser={this.loadUser} />
            )
          }
      </div>
    );
  }

}

export default App;
