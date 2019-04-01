import React, { Component } from 'react';
import './App.css';
import { Router } from "@reach/router"
import Homepage from './components/Homepage';
import ProjectsContainer from './components/ProjectsContainer';
import BlogContainer from './components/BlogContainer'
class App extends Component {
  state  = {
    inital_url:''
  }
  render() {
    return (
      <div className='main-flexbox-row'>
        <Router className='left-side' primary={false}>  
          <Homepage url={this.state.inital_url} path='/*'></Homepage>
        </Router>
        <Router>
          <BlogContainer path='/blog'></BlogContainer>
          <ProjectsContainer path='/projects'></ProjectsContainer>
        </Router>
      </div>

    );
  }
  componentDidMount = () =>{
    this.setState({inital_url:window.location.href})
  }
}

export default App;
