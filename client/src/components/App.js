import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../actions'

import Header from './Header';
import Body from './Body'

const Lander = ()=><h2>Lander....</h2>
const Dashboard = ()=><h2>Dashboard</h2>
const SurveyNew = ()=><h2>SurveyNew</h2>

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
    return (<div className='containter'><BrowserRouter><div><Header /><Body /></div></BrowserRouter></div>);
  }
  renderyyy() {
    return (
    <div className='container'>
    <BrowserRouter>
    <div>
    <Header />
    <Route path="/" exact component={Lander} />
    <Route path="/surveys" exact component={Dashboard} />
    <Route path="/surveys/new" component={SurveyNew} />
    </div>
    </BrowserRouter>
    </div>
    );
}
  renderxxx() {
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
