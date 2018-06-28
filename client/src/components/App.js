import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../actions'

import Header from './Header';
import Body from './Body'

const Dashboard = ()=><h2>Dashboard</h2>
const SurveyNew = ()=><Header /> //<div><div><Header /></div><h2>SurveyNew</h2></div>

class App extends Component {
  componentWillUnmount() {
    alert("will unmount")
    window.removeEventListener('focus',this.handleFocus.bind(this));
  }
  componentDidMount() {
    this.props.fetchUser();
    window.addEventListener('focus',this.handleFocus.bind(this));
  }
  handleFocus() {
    console.log("--->Focus")
    if (this.props && this.props.fetchUser)
      this.props.fetchUser();
  }
  render() {
      switch (this.props.auth) {
      case false:
      case null:
        return (<div className='containter'><BrowserRouter><div><Header /><Body /></div></BrowserRouter></div>);
      default:
        return (<div className='containter'><BrowserRouter><div><Header /><Body /></div></BrowserRouter></div>);
      }
}
}


export default connect(null,actions)(App);
